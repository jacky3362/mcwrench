#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// check-conflicts.mjs — flag plugin conflicts, missing deps, and proxy/Folia mismatches in a
// Minecraft plugin set, using skills/audit-config/references/conflict-rules.json + the server
// profile (skills/_cache/server-profile.json) when present.
//
// Usage:
//   node check-conflicts.mjs [server-root]          # reads <root>/plugins/*.jar (default: .)
//   node check-conflicts.mjs --list "A,B,C"         # check an explicit comma/space list
//   node check-conflicts.mjs --profile              # use the plugins recorded in the server profile
//   node check-conflicts.mjs [server-root] --json   # machine-readable findings
//
// Conservative by design — only well-established overlaps/deps. Verify with learn-plugin-docs
// before removing anything. Read-only. Stock Node >= 18.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT
  ? resolve(process.env.CLAUDE_PLUGIN_ROOT)
  : resolve(__dirname, '..', '..', '..');
const RULES_PATH = join(__dirname, '..', 'references', 'conflict-rules.json');
const PROFILE_PATH = join(PLUGIN_ROOT, 'skills', '_cache', 'server-profile.json');

const argv = process.argv.slice(2);
const AS_JSON = argv.includes('--json');
const USE_PROFILE = argv.includes('--profile');
const listIdx = argv.indexOf('--list');
const positional = argv.find((a, i) => !a.startsWith('--') && argv[i - 1] !== '--list');

function norm(n) {
  return String(n)
    .replace(/\.jar$/i, '')
    .replace(/[-_ ]+v?\d+(?:\.\d+)*.*$/i, '') // strip trailing version
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function loadProfile() {
  try { return JSON.parse(readFileSync(PROFILE_PATH, 'utf8')); } catch { return {}; }
}

function collectPlugins() {
  if (listIdx >= 0 && argv[listIdx + 1]) {
    return argv[listIdx + 1].split(/[,\s]+/).filter(Boolean);
  }
  if (USE_PROFILE) return loadProfile().plugins || [];
  const root = positional || '.';
  const dir = join(root, 'plugins');
  if (existsSync(dir)) {
    try { return readdirSync(dir).filter((f) => /\.jar$/i.test(f)).map((f) => f.replace(/\.jar$/i, '')); } catch {}
  }
  // fall back to the profile if no plugins dir
  return loadProfile().plugins || [];
}

const rules = JSON.parse(readFileSync(RULES_PATH, 'utf8'));
const profile = loadProfile();
const rawNames = collectPlugins();
const present = rawNames.map((n) => ({ raw: n, norm: norm(n) })).filter((p) => p.norm);

// match a normalized rule member against the present set (inclusion both ways, min length 4)
function matches(member) {
  const m = norm(member);
  return present.filter((p) => p.norm === m || (m.length >= 4 && (p.norm.includes(m) || m.includes(p.norm))));
}

const findings = [];
const SEV_RANK = { critical: 0, high: 1, medium: 2, low: 3 };

// mutually exclusive groups
for (const g of rules.mutuallyExclusive || []) {
  const hit = [...new Set(g.members.flatMap((m) => matches(m).map((p) => p.raw)))];
  if (hit.length >= 2) {
    findings.push({ severity: g.severity, kind: 'conflict', id: g.id, plugins: hit, note: g.note });
  }
}
// pairs: one present without its partner
for (const pr of rules.pairs || []) {
  const found = pr.members.map((m) => ({ m, hit: matches(m).map((p) => p.raw) }));
  const have = found.filter((f) => f.hit.length);
  const missing = found.filter((f) => !f.hit.length);
  if (have.length && missing.length) {
    findings.push({
      severity: pr.severity, kind: 'missing-pair', id: pr.id,
      plugins: have.flatMap((f) => f.hit), missing: missing.map((f) => f.m), note: pr.note,
    });
  }
}
// requires: plugin present but none of its deps
for (const rq of rules.requires || []) {
  const hasPlugin = matches(rq.plugin).map((p) => p.raw);
  if (hasPlugin.length) {
    const depMet = (rq.needs || []).some((d) => matches(d).length);
    if (!depMet) {
      findings.push({
        severity: rq.severity, kind: 'missing-dep', id: rq.plugin,
        plugins: hasPlugin, needsOneOf: rq.needs, note: rq.note,
      });
    }
  }
}
// proxy double-forwarding (from profile + scanned config flags, if any)
const sw = String(profile.software || '').toLowerCase();
if (profile.proxy === 'bungee' && /paper|purpur|spigot/.test(sw) && profile.onlineMode === true) {
  findings.push({
    severity: 'high', kind: 'proxy', id: 'online-mode-behind-proxy',
    plugins: [], note: 'Profile shows a proxy but online-mode=true on the backend — behind a proxy the backend must be online-mode=false with proper forwarding, or logins break / are spoofable.',
  });
}
// Folia advisory
if (/folia/.test(sw) && (rules.foliaAdvisory)) {
  findings.push({ severity: 'medium', kind: 'folia', id: 'folia-support', plugins: present.map((p) => p.raw), note: rules.foliaAdvisory });
}

findings.sort((a, b) => SEV_RANK[a.severity] - SEV_RANK[b.severity]);

if (AS_JSON) {
  console.log(JSON.stringify({ pluginsChecked: present.length, findings }, null, 2));
} else {
  const L = [];
  L.push(`# Plugin conflict check — ${present.length} plugin(s)`);
  if (!present.length) {
    L.push('No plugins found. Pass a server root with a plugins/ dir, --list "A,B,C", or --profile.');
  } else if (!findings.length) {
    L.push('No conflicts, missing deps, or mismatches detected in the known rule set.');
    L.push('(Conservative check — still verify unfamiliar plugins with learn-plugin-docs.)');
  } else {
    for (const f of findings) {
      const tag = f.severity.toUpperCase().padEnd(8);
      let line = `${tag} [${f.kind}] ${f.id}`;
      if (f.plugins && f.plugins.length) line += `: ${f.plugins.join(', ')}`;
      if (f.missing) line += ` — missing: ${f.missing.join(', ')}`;
      if (f.needsOneOf) line += ` — needs one of: ${f.needsOneOf.join(', ')}`;
      L.push(line);
      L.push(`         ${f.note}`);
    }
    L.push('');
    L.push('Prioritised critical -> high -> medium -> low. Verify with learn-plugin-docs before removing anything.');
  }
  console.log(L.join('\n'));
}
