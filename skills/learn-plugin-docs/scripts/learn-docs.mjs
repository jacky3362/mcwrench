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
// Wired adapters: Modrinth, Hangar (slug-only API), GitBook (.md -> llms-full.txt), GitHub README.
// Stubbed adapters (print a TODO + manual fallback): Oraxen, SpigotMC, Skript Hub, PaperMC, Readability.
// Runs on stock Node >= 18 (global fetch). Heavy deps are only used by the Readability stub and
// are lazy-imported, so nothing needs `npm install` for the wired paths.

import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { mkdir, writeFile, stat, readFile } from 'node:fs/promises';

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
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

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
  const arg = process.argv.slice(2).join(' ');
  const target = parseTarget(arg);

  if (target.kind === 'empty') {
    console.error('Usage: node learn-docs.mjs "<plugin-name-or-url>"');
    process.exit(2);
  }

  console.error(`[learn-docs] target: ${target.raw} (${target.kind})`);

  const provisionalSlug = slugify(
    target.name || target.repo || (target.url && target.url.pathname) || target.raw,
  );
  const outDir = join(CACHE_DIR, provisionalSlug);
  const refPath = join(outDir, 'REFERENCE.md');

  if (await isFresh(refPath)) {
    console.error(`[learn-docs] cache hit (fresh): ${refPath}`);
    console.log(await readFile(refPath, 'utf8'));
    return;
  }

  let result;
  try {
    result = await resolveAndFetch(target);
  } catch (e) {
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

  console.error(`[learn-docs] wrote ${finalRefPath}`);
  console.error(`[learn-docs] wrote ${rawPath}`);
  console.log(reference);
}

// Only run when executed directly (not when imported by tests).
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
