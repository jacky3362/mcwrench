#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// mcwrench — learn-docs.mjs
// Fetch and condense the docs for any Minecraft plugin/mod into a local markdown reference.
//
// Usage:  node learn-docs.mjs "<plugin-name-or-url>"
// Output: skills/_cache/<slug>/REFERENCE.md  (condensed)
//         skills/_cache/<slug>/RAW.md        (full)
//
// Adapters (all wired): Modrinth, Hangar (slug-only API), GitHub README, Oraxen, SpigotMC
// (BBCode->md), Skript Hub, PaperMC (tree-searches PaperMC/docs), GitBook (.md -> llms-full.txt).
// The generic Readability fallback for unknown hosts needs optional deps (jsdom/@mozilla/readability/
// turndown) and is lazy-imported, so nothing needs `npm install` for the common paths.

import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { mkdir, writeFile, stat, readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';

import * as modrinth from './adapters/modrinth.mjs';
import * as hangar from './adapters/hangar.mjs';
import * as gitbook from './adapters/gitbook.mjs';
import * as githubReadme from './adapters/github-readme.mjs';
import * as oraxen from './adapters/oraxen.mjs';
import * as spigot from './adapters/spigot.mjs';
import * as skripthub from './adapters/skripthub.mjs';
import * as papermc from './adapters/papermc.mjs';
import * as readability from './adapters/readability.mjs';
import { condense } from './condense.mjs';

export const USER_AGENT =
  'mcwrench/1.0 (+https://github.com/Teddy563/mcwrench) learn-plugin-docs';

const __dirname = dirname(fileURLToPath(import.meta.url));
// scripts/ -> learn-plugin-docs/ -> skills/ -> <pluginRoot>
const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT
  ? resolve(process.env.CLAUDE_PLUGIN_ROOT)
  : resolve(__dirname, '..', '..', '..');
const CACHE_DIR = join(PLUGIN_ROOT, 'skills', '_cache');
// Cache TTL is configurable via MCWRENCH_CACHE_TTL (days); default 7. The committed library/
// is permanent and never expires — this only governs the ad-hoc _cache/ path.
const TTL_DAYS = Number(process.env.MCWRENCH_CACHE_TTL) > 0 ? Number(process.env.MCWRENCH_CACHE_TTL) : 7;
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * TTL_DAYS;
const LIBRARY_DIR = join(PLUGIN_ROOT, 'skills', 'learn-plugin-docs', 'library');

// Cache metadata sidecar (skills/_cache/<slug>/meta.json) holds the source URL + HTTP validators
// so a stale entry can be revalidated with a conditional request instead of a full re-download.
async function readMeta(dir) {
  try { return JSON.parse(await readFile(join(dir, 'meta.json'), 'utf8')); } catch { return null; }
}
async function writeMeta(dir, meta) {
  try { await writeFile(join(dir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n', 'utf8'); } catch {}
}
// Conditional GET: ask the source if it changed since we cached it. 304 => reuse the cache.
async function notModified(meta) {
  if (!meta || !meta.sourceUrl || (!meta.etag && !meta.lastModified)) return false;
  const headers = { 'User-Agent': USER_AGENT };
  if (meta.etag) headers['If-None-Match'] = meta.etag;
  if (meta.lastModified) headers['If-Modified-Since'] = meta.lastModified;
  try {
    const res = await fetch(meta.sourceUrl, { headers, signal: AbortSignal.timeout(8000) });
    return res.status === 304;
  } catch {
    return false;
  }
}

// Popular plugins are pre-fetched into library/ (committed) and never need a network call.
function loadRegistry() {
  try {
    return JSON.parse(readFileSync(join(LIBRARY_DIR, 'registry.json'), 'utf8')).plugins || {};
  } catch {
    return {};
  }
}
function registryLookup(name) {
  const reg = loadRegistry();
  const k = String(name || '').toLowerCase().trim();
  if (reg[k]) return { slug: k, ...reg[k] };
  for (const [slug, e] of Object.entries(reg)) {
    if ((e.aliases || []).some((a) => String(a).toLowerCase() === k)) return { slug, ...e };
  }
  return null;
}
// Permanently store a fetched reference into library/ (survives the cache TTL) + upsert registry.
async function pinToLibrary(slug, reference, sourceUrl) {
  await mkdir(LIBRARY_DIR, { recursive: true });
  await writeFile(join(LIBRARY_DIR, `${slug}.md`), reference, 'utf8');
  const regPath = join(LIBRARY_DIR, 'registry.json');
  let data = { plugins: {} };
  try {
    data = JSON.parse(readFileSync(regPath, 'utf8'));
    if (!data.plugins) data.plugins = {};
  } catch {
    /* new registry */
  }
  const existing = data.plugins[slug] || {};
  data.plugins[slug] = {
    aliases: existing.aliases || [],
    file: `${slug}.md`,
    url: sourceUrl || existing.url || '',
  };
  await writeFile(regPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'plugin';
}

function parseTarget(arg) {
  const raw = String(arg || '').trim();
  if (!raw) return { kind: 'empty', raw };
  if (/^https?:\/\//i.test(raw)) {
    let url;
    try {
      url = new URL(raw);
    } catch {
      return { kind: 'name', name: raw, raw };
    }
    return { kind: 'url', url, host: url.hostname.toLowerCase(), raw };
  }
  // owner/repo shorthand -> GitHub
  if (/^[\w.-]+\/[\w.-]+$/.test(raw) && !raw.includes(' ')) {
    const [owner, repo] = raw.split('/');
    return { kind: 'github-slug', owner, repo, raw };
  }
  return { kind: 'name', name: raw, raw };
}

// Map a URL host to a wired/stub adapter.
function adapterForHost(host) {
  if (host.includes('modrinth.com')) return modrinth;
  if (host.includes('hangar.papermc.io')) return hangar;
  if (host.includes('github.com') || host.includes('raw.githubusercontent.com')) return githubReadme;
  if (host.includes('oraxen.com')) return oraxen;
  if (host.includes('spigotmc.org')) return spigot;
  if (host.includes('skripthub.net')) return skripthub;
  if (host.includes('docs.papermc.io') || host.includes('git.mythiccraft.io')) return papermc;
  // GitBook is host-agnostic; treat unknown docs hosts as GitBook-then-Readability.
  return gitbook;
}

async function isFresh(refPath) {
  try {
    const s = await stat(refPath);
    return Date.now() - s.mtimeMs < CACHE_TTL_MS;
  } catch {
    return false;
  }
}

async function resolveAndFetch(target) {
  // Returns { markdown, sourceUrl, meta:{name,slug,host,adapter}, warnings:[] } or throws.
  if (target.kind === 'url') {
    const adapter = adapterForHost(target.host);
    try {
      return await adapter.fetchFromUrl(target.url, { userAgent: USER_AGENT });
    } catch (e) {
      // Unknown hosts route to gitbook; if that fails, fall back to the generic Readability path.
      if (adapter === gitbook) {
        return readability.fetchFromUrl(target.url, { userAgent: USER_AGENT });
      }
      throw e;
    }
  }
  if (target.kind === 'github-slug') {
    return githubReadme.fetchFromRepo(target.owner, target.repo, { userAgent: USER_AGENT });
  }
  // Bare name: Modrinth search -> Hangar search.
  const name = target.name;
  const order = [
    () => modrinth.searchAndFetch(name, { userAgent: USER_AGENT }),
    () => hangar.searchAndFetch(name, { userAgent: USER_AGENT }),
  ];
  const errors = [];
  for (const attempt of order) {
    try {
      const res = await attempt();
      if (res && res.markdown) return res;
    } catch (e) {
      errors.push(e.message || String(e));
    }
  }
  throw new Error(
    `Could not resolve "${name}" via Modrinth or Hangar.\n` +
      errors.map((e) => `  - ${e}`).join('\n') +
      `\nManual fallback: paste the plugin's docs, or provide a direct docs URL / GitHub owner/repo.`,
  );
}

async function main() {
  const argv = process.argv.slice(2);
  const refresh = argv.includes('--refresh');
  const pin = argv.includes('--pin'); // permanently store into library/ (survives the cache TTL)
  const arg = argv.filter((a) => a !== '--refresh' && a !== '--pin').join(' ');
  let target = parseTarget(arg);

  if (target.kind === 'empty') {
    console.error('Usage: node learn-docs.mjs "<plugin-name-or-url>" [--refresh] [--pin]');
    process.exit(2);
  }

  console.error(`[learn-docs] target: ${target.raw} (${target.kind})`);

  // LIBRARY-FIRST: committed popular-plugin docs are zero-network. --refresh/--pin re-fetch.
  if (!refresh && !pin) {
    let libSlug = null;
    if (target.kind === 'name') {
      const hit = registryLookup(target.name);
      if (hit) {
        libSlug = hit.slug;
        // not pre-stored but we know the canonical docs URL -> fetch from there
        if (!existsSync(join(LIBRARY_DIR, `${hit.slug}.md`)) && hit.url) target = parseTarget(hit.url);
      }
    }
    if (!libSlug) {
      libSlug = slugify(target.name || target.repo || (target.url && target.url.pathname) || target.raw);
    }
    const libFile = join(LIBRARY_DIR, `${libSlug}.md`);
    if (existsSync(libFile)) {
      console.error(`[learn-docs] library hit (no fetch): ${libFile}`);
      console.log(readFileSync(libFile, 'utf8'));
      return;
    }
  }

  // For --refresh/--pin on a known name, fetch from the registry's canonical URL (not a bare
  // name search) and keep the registry key as the library filename. This prevents the by-name
  // mis-resolution that can pick the wrong Modrinth/Hangar project, and makes CI re-pins safe.
  let registrySlug = null;
  if (target.kind === 'name') {
    const hit = registryLookup(target.name);
    if (hit) {
      registrySlug = hit.slug;
      if (hit.url) target = parseTarget(hit.url);
    }
  }

  const provisionalSlug = slugify(
    target.name || target.repo || (target.url && target.url.pathname) || target.raw,
  );
  const outDir = join(CACHE_DIR, provisionalSlug);
  const refPath = join(outDir, 'REFERENCE.md');

  if (!refresh && !pin && await isFresh(refPath)) {
    console.error(`[learn-docs] cache hit (fresh): ${refPath}`);
    console.log(await readFile(refPath, 'utf8'));
    return;
  }

  // Stale but cached: revalidate with a conditional request before re-downloading.
  if (!refresh && !pin && existsSync(refPath)) {
    const meta = await readMeta(outDir);
    if (await notModified(meta)) {
      const cached = await readFile(refPath, 'utf8');
      await writeFile(refPath, cached, 'utf8'); // bump mtime: fresh for another TTL window
      await writeMeta(outDir, { ...meta, fetchedAt: new Date().toISOString() });
      console.error(`[learn-docs] 304 not modified — reused cache (TTL ${TTL_DAYS}d): ${refPath}`);
      console.log(cached);
      return;
    }
  }

  let result;
  try {
    result = await resolveAndFetch(target);
  } catch (e) {
    // stale-while-revalidate: if the refetch fails (host/network down) but we have a cached copy,
    // serve it rather than erroring — durable beyond the TTL when the source is unreachable.
    if (existsSync(refPath)) {
      console.error(`[learn-docs] refetch failed (${e.message}); serving stale cache: ${refPath}`);
      console.log(await readFile(refPath, 'utf8'));
      return;
    }
    console.error(`[learn-docs] FAILED: ${e.message}`);
    process.exit(1);
  }

  const slug = slugify(result.meta?.slug || provisionalSlug);
  const finalDir = join(CACHE_DIR, slug);
  await mkdir(finalDir, { recursive: true });

  const fetchedAt = new Date().toISOString();
  const rawPath = join(finalDir, 'RAW.md');
  await writeFile(rawPath, result.markdown, 'utf8');

  const reference = condense(result.markdown, {
    name: result.meta?.name || slug,
    slug,
    sourceUrl: result.sourceUrl,
    fetchedAt,
    adapter: result.meta?.adapter,
    warnings: result.warnings || [],
  });
  const finalRefPath = join(finalDir, 'REFERENCE.md');
  await writeFile(finalRefPath, reference, 'utf8');

  // Persist validators for next-time conditional revalidation (no-op if the adapter exposed none).
  await writeMeta(finalDir, {
    sourceUrl: result.sourceUrl || null,
    etag: result.meta?.etag || result.meta?.responseHeaders?.etag || null,
    lastModified: result.meta?.lastModified || result.meta?.responseHeaders?.['last-modified'] || null,
    adapter: result.meta?.adapter || null,
    fetchedAt,
  });

  console.error(`[learn-docs] wrote ${finalRefPath}`);
  console.error(`[learn-docs] wrote ${rawPath}`);

  if (pin) {
    const pinName = registrySlug || slug;
    await pinToLibrary(pinName, reference, result.sourceUrl);
    console.error(`[learn-docs] pinned permanently to library: ${join(LIBRARY_DIR, `${pinName}.md`)}`);
  }

  console.log(reference);
}

// Only run when executed directly (not when imported by tests).
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
