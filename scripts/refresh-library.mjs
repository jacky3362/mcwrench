#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// refresh-library.mjs — re-fetch the committed plugin library from each entry's canonical URL and
// re-pin it, so the pre-loaded docs stay current. Used by .github/workflows/refresh-docs.yml, which
// opens a PR with the diffs for human review (never auto-merged — keeps pinned docs honest).
//
// Usage:
//   node scripts/refresh-library.mjs              # refresh every registry entry that has a file
//   node scripts/refresh-library.mjs luckperms    # refresh one plugin (name or alias)
//
// Tolerant: a failed fetch is logged and skipped so the rest still refresh. Stock Node >= 18.

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const LEARN = join(ROOT, 'skills', 'learn-plugin-docs', 'scripts', 'learn-docs.mjs');
const REG = join(ROOT, 'skills', 'learn-plugin-docs', 'library', 'registry.json');

const only = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2].toLowerCase() : null;
const reg = JSON.parse(readFileSync(REG, 'utf8')).plugins || {};

let targets = Object.entries(reg).filter(([, e]) => e.file).map(([slug]) => slug);
if (only) {
  const match = targets.find((s) => s === only) ||
    Object.entries(reg).find(([, e]) => (e.aliases || []).some((a) => a.toLowerCase() === only))?.[0];
  if (!match) { console.error(`No library entry for "${only}".`); process.exit(2); }
  targets = [match];
}

console.log(`Refreshing ${targets.length} library entr${targets.length === 1 ? 'y' : 'ies'} (re-pin from canonical URL)…`);
const ok = [], failed = [];
for (const slug of targets) {
  const r = spawnSync(process.execPath, [LEARN, slug, '--pin'], { encoding: 'utf8', timeout: 60000 });
  if (r.status === 0) { ok.push(slug); console.log(`  ok    ${slug}`); }
  else { failed.push(slug); console.log(`  FAIL  ${slug}${r.stderr ? ' — ' + r.stderr.trim().split('\n').pop() : ''}`); }
}
console.log(`\nRefreshed ${ok.length}/${targets.length}. ${failed.length ? 'Failed: ' + failed.join(', ') : 'All succeeded.'}`);
// Exit 0 even with partial failures so CI can still open a PR with the successful diffs.
process.exit(0);
