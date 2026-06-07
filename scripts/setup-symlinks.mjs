#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// Ensures `.agents/skills` points at `skills/` so OpenAI Codex sees the skills.
//
// On Linux/macOS the repo's committed git symlink (mode 120000 -> ../skills) is already a real
// symlink after clone, so this script is a no-op. On Windows (where git materializes the symlink
// as a small text file containing "../skills" unless core.symlinks + privilege are enabled), run
// this to create a junction so `.agents/skills` resolves locally. A junction needs no admin.
//
// NOTE (Windows): the junction is a LOCAL convenience — do not commit it. The committed git
// symlink object is what makes Codex work on clone elsewhere. Use `git checkout -- .agents/skills`
// to restore the committed representation before committing.

import { existsSync, lstatSync, readFileSync, rmSync, symlinkSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const linkPath = join(ROOT, '.agents', 'skills');
const targetRel = '..' + '/skills'; // relative to .agents/
const targetAbs = join(ROOT, 'skills');

function isResolvingSymlink(p) {
  try {
    const st = lstatSync(p);
    if (!st.isSymbolicLink()) return false;
    return existsSync(join(p, 'minecraft-server-router', 'SKILL.md'));
  } catch {
    return false;
  }
}

if (!existsSync(targetAbs)) {
  console.error('ERROR: skills/ not found — run from the repo root.');
  process.exit(1);
}

if (isResolvingSymlink(linkPath)) {
  console.log('.agents/skills already resolves as a symlink — nothing to do.');
  process.exit(0);
}

mkdirSync(join(ROOT, '.agents'), { recursive: true });

// Remove the placeholder text-file (or stale entry) if present.
if (existsSync(linkPath)) {
  try { rmSync(linkPath, { recursive: true, force: true }); } catch {}
}

const attempts = [
  () => symlinkSync(targetRel, linkPath, 'dir'),       // real relative symlink (POSIX / Win+priv)
  () => symlinkSync(targetAbs, linkPath, 'junction'),  // NTFS junction (Windows, no admin)
];

let ok = false;
for (const attempt of attempts) {
  try {
    attempt();
    ok = true;
    break;
  } catch (e) {
    /* try next */
  }
}

if (ok && existsSync(join(linkPath, 'minecraft-server-router', 'SKILL.md'))) {
  console.log('Created .agents/skills -> skills/ (resolves OK).');
  if (process.platform === 'win32') {
    console.log('Windows note: this is a local junction. Do not commit it — run');
    console.log('  git checkout -- .agents/skills');
    console.log('to restore the committed symlink object before committing.');
  }
} else {
  console.error('Could not create .agents/skills automatically.');
  console.error('On Windows, enable Developer Mode (Settings > For developers) or run as admin,');
  console.error('then: git config core.symlinks true && git checkout -- .agents/skills');
  process.exit(1);
}
