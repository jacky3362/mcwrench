#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// fetch-skripthub.mjs — pull Skript / addon syntax from the Skript Hub JSON API and write a
// condensed reference. The API is undocumented and may rate-limit or change — cache aggressively.
//
// Usage:
//   node fetch-skripthub.mjs --addon SkBee          # all syntax for an addon
//   node fetch-skripthub.mjs --search "give"        # syntax whose title/pattern matches a term
//   node fetch-skripthub.mjs --addon Skript --search "loop"
//
// Output: skills/_cache/skripthub/<slug>.md  (+ caches the raw list 24h)
// Runs on stock Node >= 18 (global fetch).

import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';

const UA = 'mcwrench/1.0 (+https://github.com/Teddy563/mcwrench) skript-author';
const ENDPOINT = 'https://skripthub.net/api/v1/addonsyntaxlist/';
const TTL_MS = 1000 * 60 * 60 * 24; // 24h

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT
  ? resolve(process.env.CLAUDE_PLUGIN_ROOT)
  : resolve(__dirname, '..', '..', '..');
const CACHE_DIR = join(PLUGIN_ROOT, 'skills', '_cache', 'skripthub');
const RAW_CACHE = join(CACHE_DIR, '_addonsyntaxlist.json');

function parseArgs(argv) {
  const out = { addon: null, search: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--addon') out.addon = argv[++i];
    else if (argv[i] === '--search') out.search = argv[++i];
  }
  return out;
}

function slug(s) {
  return String(s || 'skript').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'skript';
}

async function loadList() {
  try {
    const s = await stat(RAW_CACHE);
    if (Date.now() - s.mtimeMs < TTL_MS) return JSON.parse(await readFile(RAW_CACHE, 'utf8'));
  } catch {
    /* fall through to fetch */
  }
  const res = await fetch(ENDPOINT, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Skript Hub ${res.status} for ${ENDPOINT}`);
  const data = await res.json();
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(RAW_CACHE, JSON.stringify(data), 'utf8');
  return data;
}

function render(items, meta) {
  const lines = [
    `# Skript Hub syntax — ${meta.label}`,
    `**Fetched: ${new Date().toISOString()}** · source: ${ENDPOINT}`,
    `> ${items.length} entries. Match syntax to the installed addon/version; do not invent patterns.`,
    '',
  ];
  const addonName = (it) => (it.addon && typeof it.addon === 'object' ? it.addon.name : it.addon) || '';
  const asText = (v) => (Array.isArray(v) ? v.map((x) => x?.name || x).join(', ') : v && typeof v === 'object' ? v.name || JSON.stringify(v) : v);
  for (const it of items.slice(0, 200)) {
    lines.push(`## ${it.title || it.id} ${addonName(it) ? `(${addonName(it)})` : ''}`.trim());
    if (it.syntax_type) lines.push(`_type: ${it.syntax_type}${it.return_type ? ` · returns: ${asText(it.return_type)}` : ''}_`);
    if (it.syntax_pattern) lines.push('```\n' + String(it.syntax_pattern).trim() + '\n```');
    if (it.description) lines.push(String(it.description).trim());
    if (it.required_plugins) lines.push(`_requires: ${asText(it.required_plugins)}_`);
    if (it.compatible_addon_version) lines.push(`_since: ${asText(it.compatible_addon_version)}_`);
    lines.push('');
  }
  if (items.length > 200) lines.push(`…[${items.length - 200} more entries truncated]`);
  return lines.join('\n') + '\n';
}

async function main() {
  const { addon, search } = parseArgs(process.argv.slice(2));
  if (!addon && !search) {
    console.error('Usage: node fetch-skripthub.mjs --addon <Addon> | --search <term>');
    process.exit(2);
  }
  const list = await loadList();
  const arr = Array.isArray(list) ? list : list.results || [];
  const term = search ? search.toLowerCase() : null;
  const addonName = (it) => (it.addon && typeof it.addon === 'object' ? it.addon.name : it.addon) || '';
  const items = arr.filter((it) => {
    if (addon && String(addonName(it)).toLowerCase() !== addon.toLowerCase()) return false;
    if (term) {
      const hay = `${it.title || ''} ${it.syntax_pattern || ''} ${it.description || ''}`.toLowerCase();
      if (!hay.includes(term)) return false;
    }
    return true;
  });
  if (!items.length) {
    console.error(`No Skript Hub syntax matched (addon=${addon ?? '*'}, search=${search ?? '*'}).`);
    process.exit(1);
  }
  const label = [addon, search].filter(Boolean).join(' / ');
  const outPath = join(CACHE_DIR, `${slug(label)}.md`);
  const md = render(items, { label });
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(outPath, md, 'utf8');
  console.error(`[fetch-skripthub] wrote ${outPath} (${items.length} entries)`);
  console.log(md);
}

main().catch((e) => {
  console.error(`[fetch-skripthub] FAILED: ${e.message}`);
  process.exit(1);
});
