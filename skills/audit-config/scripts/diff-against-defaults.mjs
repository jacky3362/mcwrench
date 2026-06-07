#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// diff-against-defaults.mjs — show which keys a config file OVERRIDES vs a defaults file.
// Especially useful for paper-world.yml vs paper-world-defaults.yml: per Paper's design you
// should only override the keys you mean to; this surfaces exactly those.
//
// Usage:
//   node diff-against-defaults.mjs <config.yml> <defaults.yml>
//   node diff-against-defaults.mjs paper-world.yml paper-world-defaults.yml
//
// Read-only. Minimal indentation-based flattener for simple `key: value` YAML maps (the shape
// Paper/Spigot configs use). It does NOT fully parse YAML (no anchors, flow maps, multiline
// scalars) — treat the output as a guide, and confirm against the real files.

import { readFileSync } from 'node:fs';

const [a, b] = process.argv.slice(2);
if (!a || !b) {
  console.error('Usage: node diff-against-defaults.mjs <config.yml> <defaults.yml>');
  process.exit(2);
}

// Flatten a simple YAML map into dotted key -> value. Tracks indentation depth as the path.
function flatten(text) {
  const out = {};
  const stack = []; // [{indent, key}]
  for (const raw of text.split('\n')) {
    if (!raw.trim() || /^\s*#/.test(raw)) continue;
    const indent = raw.match(/^\s*/)[0].replace(/\t/g, '  ').length;
    const m = /^(\s*)([^:#]+):\s*(.*?)\s*$/.exec(raw);
    if (!m) continue;
    const key = m[2].trim();
    const val = m[3].replace(/\s+#.*$/, '').trim(); // strip trailing comment
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
    stack.push({ indent, key });
    const path = stack.map((s) => s.key).join('.');
    if (val !== '') out[path] = val.replace(/^["']|["']$/g, '');
  }
  return out;
}

function read(p) {
  try { return flatten(readFileSync(p, 'utf8')); }
  catch (e) { console.error(`Cannot read ${p}: ${e.message}`); process.exit(1); }
}

const cfg = read(a);
const def = read(b);

const overrides = [];
const novel = [];
for (const [k, v] of Object.entries(cfg)) {
  if (!(k in def)) novel.push([k, v]);
  else if (def[k] !== v) overrides.push([k, v, def[k]]);
}

console.log(`# diff ${a} vs ${b}\n`);
console.log(`Overridden (differ from default): ${overrides.length}`);
for (const [k, v, d] of overrides) console.log(`  ~ ${k}: ${v}   (default: ${d})`);
console.log(`\nNot in defaults (new/unknown keys — typo or newer version?): ${novel.length}`);
for (const [k, v] of novel) console.log(`  + ${k}: ${v}`);
const same = Object.keys(cfg).length - overrides.length - novel.length;
console.log(`\nIdentical to default (could be removed to inherit): ${same}`);
console.log('\nNote: minimal YAML flattener — verify against the real files before acting.');
