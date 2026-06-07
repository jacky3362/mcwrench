#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// Pack a single skill folder into a zip whose ROOT is the skill folder, ready to upload to
// Claude.ai (Customize > Skills > Create skill > Upload). Claude.ai requires the skill folder to
// be the top-level entry of the zip and the folder name to match the SKILL.md `name`.
//
// Usage:
//   node scripts/pack-skill.mjs <skill-name>        # e.g. audit-config
//   node scripts/pack-skill.mjs --all               # pack every skill
//
// Output: dist/<skill-name>.skill.zip
// Uses the OS archiver (PowerShell Compress-Archive on Windows; `zip` then `tar` on POSIX) so no
// npm dependency is required.

import { existsSync, mkdirSync, readdirSync, statSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS = join(ROOT, 'skills');
const DIST = join(ROOT, 'dist');

function listSkills() {
  return readdirSync(SKILLS).filter(
    (e) => !e.startsWith('_') && statSync(join(SKILLS, e)).isDirectory() && existsSync(join(SKILLS, e, 'SKILL.md')),
  );
}

function packWindows(name, outZip) {
  // Compress-Archive places the named folder as the archive root.
  const ps = `Compress-Archive -Path '${join(SKILLS, name)}' -DestinationPath '${outZip}' -Force`;
  execFileSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', ps], { stdio: 'inherit' });
}

function packPosix(name, outZip) {
  try {
    // `cd skills && zip -r ../dist/<name>.skill.zip <name>` -> root is <name>/
    execFileSync('zip', ['-r', outZip, name], { cwd: SKILLS, stdio: 'inherit' });
  } catch {
    // Fall back to bsdtar, which can emit a zip by extension.
    execFileSync('tar', ['-a', '-c', '-f', outZip, name], { cwd: SKILLS, stdio: 'inherit' });
  }
}

function pack(name) {
  const dir = join(SKILLS, name);
  if (!existsSync(join(dir, 'SKILL.md'))) {
    console.error(`skills/${name}/SKILL.md not found — is "${name}" a valid skill?`);
    process.exit(1);
  }
  mkdirSync(DIST, { recursive: true });
  const outZip = join(DIST, `${name}.skill.zip`);
  if (existsSync(outZip)) rmSync(outZip, { force: true });
  if (process.platform === 'win32') packWindows(name, outZip);
  else packPosix(name, outZip);
  console.log(`Packed -> ${outZip}`);
}

const arg = process.argv[2];
if (!arg) {
  console.error('Usage: node scripts/pack-skill.mjs <skill-name> | --all');
  console.error('Skills: ' + listSkills().join(', '));
  process.exit(2);
}
if (arg === '--all') listSkills().forEach(pack);
else pack(arg);
