#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// learn-stack.mjs — pre-pin the docs for every plugin in a gamemode's canonical stack, in one go,
// so a whole server type's references go local instantly. Reads the mapping in
// skills/learn-plugin-docs/library/stacks.json and calls learn-docs <slug> --pin per plugin.
//
// Usage:
//   node scripts/learn-stack.mjs <gamemode>     # e.g. skyblock, prison, survival-smp, rpg-mmo
//   node scripts/learn-stack.mjs --list         # list the known gamemodes
//
// Tolerant: a failed fetch is logged and skipped so the rest still pin. Stock Node >= 18.

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const LEARN = join(ROOT, 'skills', 'learn-plugin-docs', 'scripts', 'learn-docs.mjs');
const STACKS = join(ROOT, 'skills', 'learn-plugin-docs', 'library', 'stacks.json');

const stacks = JSON.parse(readFileSync(STACKS, 'utf8')).stacks || {};
const arg = (process.argv[2] || '').toLowerCase();

if (!arg || arg === '--list') {
  console.log('Known gamemodes:\n  ' + Object.keys(stacks).sort().join(', '));
  process.exit(arg === '--list' ? 0 : 2);
}

const plugins = stacks[arg];
if (!plugins) {
  // tolerant alias: allow "survival" -> "survival-smp", etc.
  const hit = Object.keys(stacks).find((k) => k.startsWith(arg) || k.replace(/-/g, '').includes(arg));
  if (hit) { console.error(`[learn-stack] "${arg}" -> "${hit}"`); }
  else { console.error(`No stack "${arg}". Run --list to see the gamemodes.`); process.exit(2); }
}
const mode = stacks[arg] ? arg : Object.keys(stacks).find((k) => k.startsWith(arg) || k.replace(/-/g, '').includes(arg));
const list = stacks[mode];

console.log(`Pinning ${list.length} plugin(s) for "${mode}"…`);
const ok = [], failed = [];
for (const slug of list) {
  const r = spawnSync(process.execPath, [LEARN, slug, '--pin'], { encoding: 'utf8', timeout: 60000 });
  if (r.status === 0) { ok.push(slug); console.log(`  ok    ${slug}`); }
  else { failed.push(slug); console.log(`  FAIL  ${slug}${r.stderr ? ' — ' + r.stderr.trim().split('\n').pop() : ''}`); }
}
console.log(`\nPinned ${ok.length}/${list.length} for "${mode}".${failed.length ? ' Failed: ' + failed.join(', ') : ''}`);
console.log('Tip: stack plugins not in the library yet (some skyblock/prison engines) are added over time.');
process.exit(0);
