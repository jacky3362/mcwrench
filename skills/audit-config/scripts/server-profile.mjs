#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// server-profile.mjs — show / set / clear mcwrench's per-server profile.
// The profile (skills/_cache/server-profile.json) lets every skill tailor answers without
// re-asking version / host / stack. scan-server-tree.mjs --write-profile auto-fills it from a
// server tree; this script is for manual reads and edits.
//
// Usage:
//   node server-profile.mjs                       # show the current profile (or "none yet")
//   node server-profile.mjs get <key>             # print one key
//   node server-profile.mjs set <key> <value>     # set a key (value JSON-parsed if it can be)
//   node server-profile.mjs set plugins "A,B,C"   # comma list -> array for plugins/worlds
//   node server-profile.mjs clear                 # delete the profile
//
// Runs on stock Node >= 18. No deps.

import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT
  ? resolve(process.env.CLAUDE_PLUGIN_ROOT)
  : resolve(__dirname, '..', '..', '..');
const PATH = join(PLUGIN_ROOT, 'skills', '_cache', 'server-profile.json');

const KNOWN = [
  'software', 'mcVersion', 'java', 'host', 'ramMB', 'gamemode', 'proxy',
  'onlineMode', 'plugins', 'worlds', 'chatFormatter', 'notes',
];
const LIST_KEYS = new Set(['plugins', 'worlds']);

function load() {
  try { return JSON.parse(readFileSync(PATH, 'utf8')); } catch { return null; }
}
function save(p) {
  p.updatedAt = new Date().toISOString();
  mkdirSync(dirname(PATH), { recursive: true });
  writeFileSync(PATH, JSON.stringify(p, null, 2) + '\n', 'utf8');
}
function coerce(key, raw) {
  if (LIST_KEYS.has(key)) return raw.split(',').map((s) => s.trim()).filter(Boolean);
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  if (raw === 'null') return null;
  if (/^-?\d+$/.test(raw)) return Number(raw);
  return raw;
}

const [cmd, key, ...rest] = process.argv.slice(2);

if (!cmd) {
  const p = load();
  if (!p) { console.log('No server profile yet. Run: scan-server-tree.mjs <server-root> --write-profile'); process.exit(0); }
  console.log(JSON.stringify(p, null, 2));
} else if (cmd === 'get') {
  const p = load() || {};
  if (!key) { console.error('Usage: server-profile.mjs get <key>'); process.exit(2); }
  const v = p[key];
  console.log(typeof v === 'object' ? JSON.stringify(v) : String(v ?? ''));
} else if (cmd === 'set') {
  if (!key || rest.length === 0) { console.error('Usage: server-profile.mjs set <key> <value>'); process.exit(2); }
  if (!KNOWN.includes(key)) console.error(`[profile] note: "${key}" is not a standard key (${KNOWN.join(', ')}) — storing anyway.`);
  const p = load() || {};
  p[key] = coerce(key, rest.join(' '));
  save(p);
  console.log(`set ${key} = ${typeof p[key] === 'object' ? JSON.stringify(p[key]) : p[key]}`);
} else if (cmd === 'clear') {
  if (existsSync(PATH)) { rmSync(PATH); console.log(`cleared ${PATH}`); }
  else console.log('No profile to clear.');
} else {
  console.error(`Unknown command "${cmd}". Use: (none) | get <key> | set <key> <value> | clear`);
  process.exit(2);
}
