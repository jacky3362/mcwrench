#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// check-plugin-versions.mjs — report which installed plugins are outdated or have no build for the
// server's MC version + loader, reusing Modrinth (and the committed registry for slug resolution).
// Read-only: it NEVER downloads or installs. Stock Node >= 18, no deps.
//
// Usage:
//   node check-plugin-versions.mjs [server-root]      # uses the server profile, or <root>/plugins
//   node check-plugin-versions.mjs --list "LuckPerms,EssentialsX" --mc 26.1.2 --loader paper
//   node check-plugin-versions.mjs --offline          # no network: report only what the library knows
//   node check-plugin-versions.mjs [...] --json
//
// Verdicts: up-to-date | outdated | no-build-for-<mc> | not-on-modrinth (check manually) | unknown.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const UA = 'mcwrench/1.2 (+https://github.com/Teddy563/mcwrench) check-plugin-versions';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT ? resolve(process.env.CLAUDE_PLUGIN_ROOT) : resolve(__dirname, '..', '..', '..');
const REG_PATH = join(PLUGIN_ROOT, 'skills', 'learn-plugin-docs', 'library', 'registry.json');
const PROFILE = join(PLUGIN_ROOT, 'skills', '_cache', 'server-profile.json');

const argv = process.argv.slice(2);
const AS_JSON = argv.includes('--json');
const OFFLINE = argv.includes('--offline');
function flag(name) { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : null; }
const positional = argv.find((a, i) => !a.startsWith('--') && argv[i - 1] !== '--list' && argv[i - 1] !== '--mc' && argv[i - 1] !== '--loader');

function loadJson(p) { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; } }
const registry = (loadJson(REG_PATH) || {}).plugins || {};
const profile = loadJson(PROFILE) || {};

function cleanName(n) { return String(n).replace(/\.jar$/i, '').replace(/[-_ ]+v?\d+(?:\.\d+)*.*$/i, '').trim(); }
function collectPlugins() {
  if (flag('--list')) return flag('--list').split(/[,\s]+/).filter(Boolean);
  const root = positional;
  if (root && existsSync(join(root, 'plugins'))) {
    try { return readdirSync(join(root, 'plugins')).filter((f) => /\.jar$/i.test(f)).map(cleanName); } catch {}
  }
  return profile.plugins || [];
}
// map a display name to a registry slug (Modrinth slug guess) via name/alias
function toSlug(name) {
  const k = String(name).toLowerCase().trim();
  if (registry[k]) return k;
  for (const [slug, e] of Object.entries(registry)) {
    if (slug === k.replace(/[^a-z0-9]/g, '') || (e.aliases || []).some((a) => a.toLowerCase() === k)) return slug;
  }
  return k.replace(/[^a-z0-9-]/g, '');
}
const mc = flag('--mc') || profile.mcVersion || null;
const loader = (flag('--loader') || profile.proxy || profile.software || 'paper').toLowerCase()
  .replace(/purpur|spigot|bukkit|pufferfish/, 'paper').replace(/velocity.*/, 'velocity').replace(/folia/, 'folia');
const loaderSet = loader === 'velocity' ? ['velocity'] : loader === 'folia' ? ['folia', 'paper'] : ['paper', 'spigot', 'bukkit'];

function mcMatch(list) {
  if (!mc || !Array.isArray(list)) return null;
  if (list.includes(mc)) return true;
  const mm = mc.split('.').slice(0, 2).join('.');
  return list.some((v) => v === mm || v.startsWith(mm));
}

async function modrinthLatest(slug) {
  const url = `https://api.modrinth.com/v2/project/${encodeURIComponent(slug)}/version`;
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(10000) });
  if (res.status === 404) return { notFound: true };
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const versions = await res.json();
  if (!Array.isArray(versions) || !versions.length) return { notFound: true };
  const forLoader = versions.filter((v) => (v.loaders || []).some((l) => loaderSet.includes(l)));
  const pool = forLoader.length ? forLoader : versions;
  pool.sort((a, b) => new Date(b.date_published) - new Date(a.date_published));
  const latest = pool[0];
  const compatible = pool.find((v) => mcMatch(v.game_versions));
  return { latest: latest.version_number, gameVersions: latest.game_versions, hasMcBuild: !!compatible, compatibleVersion: compatible?.version_number };
}

const plugins = [...new Set(collectPlugins().map(cleanName))].filter(Boolean);
const rows = [];

for (const name of plugins) {
  const slug = toSlug(name);
  if (OFFLINE) {
    rows.push({ name, slug, verdict: registry[slug] ? 'in-library (run online to compare)' : 'unknown (not in library)', latest: null });
    continue;
  }
  try {
    const r = await modrinthLatest(slug);
    if (r.notFound) rows.push({ name, slug, verdict: 'not-on-modrinth (check manually)', latest: null });
    else if (mc && !r.hasMcBuild) rows.push({ name, slug, verdict: `no-build-for-${mc}`, latest: r.latest });
    else rows.push({ name, slug, verdict: 'has-compatible-build', latest: r.latest, compatible: r.compatibleVersion });
  } catch (e) {
    rows.push({ name, slug, verdict: `lookup-failed (${e.message})`, latest: null });
  }
}

const order = (v) => v.startsWith('no-build') ? 0 : v.startsWith('not-on-modrinth') || v.startsWith('lookup') || v.startsWith('unknown') ? 1 : 2;
rows.sort((a, b) => order(a.verdict) - order(b.verdict));

if (AS_JSON) {
  console.log(JSON.stringify({ mc, loader, count: rows.length, rows }, null, 2));
} else {
  const L = [];
  L.push(`# Plugin version check — ${rows.length} plugin(s)  (MC ${mc || '?'}, loader ${loader})`);
  if (OFFLINE) L.push('(offline mode: no version comparison; run online for latest/compat)');
  for (const r of rows) {
    L.push(`  ${r.verdict.padEnd(28)} ${r.name}${r.latest ? '  latest=' + r.latest : ''}${r.compatible ? '  compatible=' + r.compatible : ''}`);
  }
  L.push('\nReports only; it never downloads. Verify a "no-build" or "not-on-modrinth" against the plugin\'s own page (some are Hangar/SpigotMC/paid). Pair with check-conflicts.mjs.');
  console.log(L.join('\n'));
}
