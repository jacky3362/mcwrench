#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// Structural validator for the mcwrench repo. Checks the things `claude plugin validate`
// also checks, plus portability rules that matter for Claude.ai and Codex:
//   - plugin.json / marketplace.json required fields + correct types
//   - every skills/<name>/SKILL.md: folder == frontmatter name, name regex, description
//     non-empty, <= 1024 chars, no XML tags, no reserved words (anthropic/claude)
//   - no SKILL.md is duplicated outside skills/ (one source of truth)
// Exit code 1 on any error. Warnings do not fail unless --strict.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STRICT = process.argv.includes('--strict');
const errors = [];
const warnings = [];
const ok = [];

const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function fail(m) { errors.push(m); }
function warn(m) { warnings.push(m); }
function pass(m) { ok.push(m); }

function readJson(p) {
  try { return JSON.parse(readFileSync(p, 'utf8')); }
  catch (e) { fail(`${p}: invalid JSON — ${e.message}`); return null; }
}

// --- plugin.json ---
const pluginPath = join(ROOT, '.claude-plugin', 'plugin.json');
if (!existsSync(pluginPath)) fail('.claude-plugin/plugin.json missing');
else {
  const p = readJson(pluginPath);
  if (p) {
    if (!p.name) fail('plugin.json: "name" is required');
    else if (!NAME_RE.test(p.name)) fail(`plugin.json: name "${p.name}" must be kebab-case ${NAME_RE}`);
    else pass(`plugin.json name = ${p.name}`);
    if (p.author && typeof p.author !== 'object') fail('plugin.json: author must be an object {name,url}');
    if (p.repository && typeof p.repository !== 'string') fail('plugin.json: repository must be a string URL');
    if (p.keywords && !Array.isArray(p.keywords)) fail('plugin.json: keywords must be an array');
    if (p.version && !/^\d+\.\d+\.\d+/.test(p.version)) warn(`plugin.json: version "${p.version}" is not semver`);
    if (!p.description) warn('plugin.json: description recommended for the plugin manager UI');
  }
}

// --- marketplace.json ---
const mktPath = join(ROOT, '.claude-plugin', 'marketplace.json');
if (!existsSync(mktPath)) fail('.claude-plugin/marketplace.json missing');
else {
  const m = readJson(mktPath);
  if (m) {
    if (!m.name) fail('marketplace.json: "name" is required');
    if (!m.owner || typeof m.owner !== 'object') fail('marketplace.json: "owner" object is required');
    else if (!m.owner.name) fail('marketplace.json: owner.name is required');
    if (!Array.isArray(m.plugins) || m.plugins.length === 0) fail('marketplace.json: "plugins" array is required');
    else {
      for (const [i, pl] of m.plugins.entries()) {
        if (!pl.name) fail(`marketplace.json: plugins[${i}].name required`);
        if (!pl.source) fail(`marketplace.json: plugins[${i}].source required`);
        else if (typeof pl.source === 'string' && !pl.source.startsWith('./'))
          fail(`marketplace.json: plugins[${i}].source relative path must start with "./" (got "${pl.source}")`);
      }
      pass(`marketplace.json lists ${m.plugins.length} plugin(s)`);
    }
  }
}

// --- skills ---
function parseFrontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!m) return null;
  const body = m[1];
  // description may be a folded block (">-" or "|") spanning indented lines.
  const out = {};
  const lines = body.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(lines[i]);
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2];
    if (val === '>-' || val === '>' || val === '|' || val === '|-') {
      const collected = [];
      for (let j = i + 1; j < lines.length; j++) {
        if (/^\s+/.test(lines[j]) || lines[j].trim() === '') collected.push(lines[j].trim());
        else { i = j - 1; break; }
      }
      val = collected.join(' ').replace(/\s+/g, ' ').trim();
    } else {
      val = val.replace(/^["']|["']$/g, '');
    }
    out[key] = val;
  }
  return out;
}

const skillsDir = join(ROOT, 'skills');
let skillCount = 0;
if (!existsSync(skillsDir)) fail('skills/ directory missing');
else {
  for (const entry of readdirSync(skillsDir)) {
    if (entry.startsWith('_')) continue; // _cache
    const dir = join(skillsDir, entry);
    if (!statSync(dir).isDirectory()) continue;
    const skillFile = join(dir, 'SKILL.md');
    if (!existsSync(skillFile)) { warn(`skills/${entry}: no SKILL.md`); continue; }
    skillCount++;
    const text = readFileSync(skillFile, 'utf8');
    const fm = parseFrontmatter(text);
    if (!fm) { fail(`skills/${entry}/SKILL.md: missing or malformed frontmatter`); continue; }
    if (!fm.name) fail(`skills/${entry}/SKILL.md: name required`);
    else {
      if (fm.name !== entry) fail(`skills/${entry}/SKILL.md: name "${fm.name}" must match folder "${entry}"`);
      if (!NAME_RE.test(fm.name)) fail(`skills/${entry}/SKILL.md: name "${fm.name}" must match ${NAME_RE}`);
      if (/\b(anthropic|claude)\b/i.test(fm.name)) fail(`skills/${entry}/SKILL.md: name may not contain reserved word anthropic/claude`);
    }
    if (!fm.description) fail(`skills/${entry}/SKILL.md: description required`);
    else {
      if (fm.description.length > 1024)
        fail(`skills/${entry}/SKILL.md: description ${fm.description.length} > 1024 chars (breaks Claude.ai/Codex portability)`);
      if (/[<>]/.test(fm.description))
        fail(`skills/${entry}/SKILL.md: description must not contain XML/angle-bracket tags`);
      pass(`skills/${entry} (description ${fm.description.length} chars)`);
    }
    // body length advisory
    const bodyLines = text.split('\n').length;
    if (bodyLines > 500) warn(`skills/${entry}/SKILL.md: ${bodyLines} lines (keep under 500)`);
  }
  if (skillCount === 0) fail('skills/: no skill folders found');
}

// --- one source of truth: no stray SKILL.md outside skills/ (ignore .agents symlink + _cache) ---
function walk(d, hits) {
  for (const e of readdirSync(d)) {
    if (e === 'node_modules' || e === '.git' || e === '_cache' || e === '.agents') continue;
    const p = join(d, e);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) walk(p, hits);
    else if (e === 'SKILL.md') hits.push(p);
  }
}
const hits = [];
walk(ROOT, hits);
const outside = hits.filter((h) => !h.replace(/\\/g, '/').includes('/skills/'));
if (outside.length) fail(`SKILL.md found outside skills/ (would duplicate source of truth): ${outside.join(', ')}`);

// --- cross-tool: Gemini CLI + Antigravity surfaces ---
// GEMINI.md memory file
if (!existsSync(join(ROOT, 'GEMINI.md'))) warn('GEMINI.md missing (Gemini CLI memory file)');
else pass('GEMINI.md present');

// .gemini/settings.json must parse and alias the context filenames
const gsettings = join(ROOT, '.gemini', 'settings.json');
if (!existsSync(gsettings)) warn('.gemini/settings.json missing (Gemini CLI context alias)');
else {
  const s = readJson(gsettings);
  if (s) {
    const names = s.context && Array.isArray(s.context.fileName) ? s.context.fileName : null;
    if (!names) fail('.gemini/settings.json: context.fileName must be an array');
    else if (!names.includes('AGENTS.md') && !names.includes('GEMINI.md'))
      warn('.gemini/settings.json: context.fileName should include AGENTS.md and/or GEMINI.md');
    else pass(`.gemini/settings.json context.fileName = [${names.join(', ')}]`);
  }
}

// .gemini/commands/**/*.toml must each have a prompt
const gcmdDir = join(ROOT, '.gemini', 'commands');
if (existsSync(gcmdDir)) {
  const tomls = [];
  (function walkToml(d) {
    for (const e of readdirSync(d)) {
      const p = join(d, e);
      if (statSync(p).isDirectory()) walkToml(p);
      else if (e.endsWith('.toml')) tomls.push(p);
    }
  })(gcmdDir);
  for (const t of tomls) {
    const txt = readFileSync(t, 'utf8');
    if (!/^\s*prompt\s*=/m.test(txt)) fail(`${t.replace(ROOT, '.')}: Gemini command missing required "prompt"`);
  }
  if (tomls.length) pass(`${tomls.length} Gemini command(s) have a prompt`);
}

// .agents/workflows/*.md must each have a description in frontmatter (Antigravity)
const wfDir = join(ROOT, '.agents', 'workflows');
if (existsSync(wfDir)) {
  let wf = 0;
  for (const e of readdirSync(wfDir)) {
    if (!e.endsWith('.md')) continue;
    wf++;
    const fm = parseFrontmatter(readFileSync(join(wfDir, e), 'utf8'));
    if (!fm || !fm.description) fail(`.agents/workflows/${e}: Antigravity workflow missing description frontmatter`);
  }
  if (wf) pass(`${wf} Antigravity workflow(s) have a description`);
}

// agents/*.md must each have name + description frontmatter (Claude Code subagents)
const agentsDir = join(ROOT, 'agents');
if (existsSync(agentsDir)) {
  let ag = 0;
  for (const e of readdirSync(agentsDir)) {
    if (!e.endsWith('.md')) continue;
    ag++;
    const fm = parseFrontmatter(readFileSync(join(agentsDir, e), 'utf8'));
    if (!fm || !fm.name || !fm.description) fail(`agents/${e}: subagent needs name + description frontmatter`);
  }
  if (ag) pass(`${ag} subagent(s) have name + description`);
}

// Cross-tool wrapper parity: every commands/*.md should have a matching Gemini command + workflow.
const cmdDir = join(ROOT, 'commands');
if (existsSync(cmdDir)) {
  const cmds = readdirSync(cmdDir).filter((e) => e.endsWith('.md')).map((e) => e.replace(/\.md$/, ''));
  for (const c of cmds) {
    if (!existsSync(join(ROOT, '.gemini', 'commands', 'mcwrench', `${c}.toml`)))
      warn(`commands/${c}.md has no .gemini/commands/mcwrench/${c}.toml counterpart`);
    if (!existsSync(join(ROOT, '.agents', 'workflows', `${c}.md`)))
      warn(`commands/${c}.md has no .agents/workflows/${c}.md counterpart`);
  }
  pass(`${cmds.length} Claude Code command(s)`);
}

// --- report ---
console.log(`\nmcwrench validate — ${skillCount} skills checked\n`);
for (const m of ok) console.log(`  ok    ${m}`);
for (const m of warnings) console.log(`  warn  ${m}`);
for (const m of errors) console.log(`  ERROR ${m}`);
console.log('');
if (errors.length) { console.error(`FAILED: ${errors.length} error(s), ${warnings.length} warning(s)`); process.exit(1); }
if (STRICT && warnings.length) { console.error(`FAILED (--strict): ${warnings.length} warning(s)`); process.exit(1); }
console.log(`PASSED${warnings.length ? ` with ${warnings.length} warning(s)` : ''}.`);
