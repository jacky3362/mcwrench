#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// scan-server-tree.mjs — walk a Minecraft server directory and emit a manifest of detected
// server software, config files, plugins, and a few key settings, to seed an audit.
//
// Usage:
//   node scan-server-tree.mjs [server-root]            # human-readable summary (default: .)
//   node scan-server-tree.mjs [server-root] --json     # machine-readable JSON
//   node scan-server-tree.mjs [server-root] --write-profile   # upsert skills/_cache/server-profile.json
//
// Read-only on the scanned tree (only --write-profile writes, into mcwrench's own _cache).
// Runs on stock Node >= 18.

import { readdirSync, statSync, existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : '.';
const AS_JSON = process.argv.includes('--json');
const WRITE_PROFILE = process.argv.includes('--write-profile');

const __dirname = dirname(fileURLToPath(import.meta.url));
// scripts/ -> audit-config/ -> skills/ -> <pluginRoot>
const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT
  ? resolve(process.env.CLAUDE_PLUGIN_ROOT)
  : resolve(__dirname, '..', '..', '..');
const PROFILE_PATH = join(PLUGIN_ROOT, 'skills', '_cache', 'server-profile.json');

const CONFIG_FILES = [
  'server.properties', 'bukkit.yml', 'spigot.yml', 'paper-global.yml',
  'paper-world-defaults.yml', 'purpur.yml', 'pufferfish.yml', 'velocity.toml',
  'config.yml', 'eula.txt',
];

function safeRead(p) { try { return readFileSync(p, 'utf8'); } catch { return ''; } }
function exists(p) { return existsSync(join(ROOT, p)); }

function detectSoftware() {
  const hits = [];
  let jars = [];
  try { jars = readdirSync(ROOT).filter((f) => f.toLowerCase().endsWith('.jar')); } catch {}
  const j = jars.map((x) => x.toLowerCase()).join(' ');
  if (/folia/.test(j)) hits.push('Folia');
  if (/purpur/.test(j)) hits.push('Purpur');
  if (/pufferfish/.test(j)) hits.push('Pufferfish');
  if (/paper/.test(j)) hits.push('Paper');
  if (/velocity/.test(j)) hits.push('Velocity');
  if (/waterfall/.test(j)) hits.push('Waterfall');
  if (/bungee/.test(j)) hits.push('BungeeCord');
  if (/spigot/.test(j)) hits.push('Spigot');
  if (/(mohist|arclight)/.test(j)) hits.push('Hybrid (Mohist/Arclight)');
  // Config-based hints
  if (exists('velocity.toml') && !hits.includes('Velocity')) hits.push('Velocity (config present)');
  if (exists('purpur.yml') && !hits.includes('Purpur')) hits.push('Purpur (config present)');
  if (exists('paper-global.yml') && !hits.some((h) => /Paper|Purpur|Folia|Pufferfish/.test(h)))
    hits.push('Paper-family (paper-global.yml present)');
  return { jars, software: [...new Set(hits)] };
}

function listPlugins() {
  const dir = join(ROOT, 'plugins');
  if (!existsSync(dir)) return [];
  try {
    return readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith('.jar'))
      .map((f) => f.replace(/\.jar$/i, ''))
      .sort();
  } catch { return []; }
}

function prop(text, key) {
  const m = new RegExp(`^${key.replace(/[.]/g, '\\.')}\\s*=\\s*(.*)$`, 'm').exec(text);
  return m ? m[1].trim() : null;
}

function keySettings() {
  const out = {};
  const sp = safeRead(join(ROOT, 'server.properties'));
  if (sp) {
    for (const k of ['online-mode', 'view-distance', 'simulation-distance', 'max-players',
      'enable-rcon', 'rcon.port', 'level-name', 'difficulty', 'gamemode', 'pvp']) {
      const v = prop(sp, k);
      if (v !== null) out[k] = v;
    }
  }
  const spigot = safeRead(join(ROOT, 'spigot.yml'));
  if (/bungeecord:\s*true/i.test(spigot)) out['spigot.bungeecord'] = 'true';
  const pg = safeRead(join(ROOT, 'paper-global.yml'));
  if (/velocity:\s*[\s\S]*?enabled:\s*true/i.test(pg)) out['paper.proxies.velocity.enabled'] = 'true';
  // tab character check across yml files
  return out;
}

function tabWarnings() {
  const warns = [];
  for (const f of ['bukkit.yml', 'spigot.yml', 'paper-global.yml', 'paper-world-defaults.yml', 'purpur.yml']) {
    const t = safeRead(join(ROOT, f));
    if (t && /\t/.test(t)) warns.push(`${f}: contains a literal TAB character (YAML forbids tabs)`);
  }
  return warns;
}

const { jars, software } = detectSoftware();
const manifest = {
  root: ROOT,
  software,
  rootJars: jars,
  configFiles: CONFIG_FILES.filter(exists),
  worlds: (() => {
    try {
      return readdirSync(ROOT).filter((d) => {
        try { return statSync(join(ROOT, d)).isDirectory() && existsSync(join(ROOT, d, 'level.dat')); }
        catch { return false; }
      });
    } catch { return []; }
  })(),
  plugins: listPlugins(),
  keySettings: keySettings(),
  warnings: tabWarnings(),
};

// --- server-profile derivation (for --write-profile) ---------------------------------------
function cleanPluginName(n) {
  // strip a trailing version: LuckPerms-Bukkit-5.4.102 -> LuckPerms ; EssentialsX-2.21.0 -> EssentialsX
  return String(n).replace(/[-_ ]+v?\d+(?:\.\d+)*.*$/i, '').replace(/[-_]+(bukkit|paper|spigot|velocity|bungee)$/i, '').trim() || String(n);
}
function guessArchetype(plugins) {
  const j = plugins.join(' ').toLowerCase();
  if (/bentobox|superiorskyblock|iridiumskyblock|oneblock/.test(j)) return /oneblock/.test(j) ? 'oneblock' : 'skyblock';
  if (/lifesteal/.test(j)) return 'lifesteal';
  if (/factionsuuid|\bfactions\b|saberfactions/.test(j)) return 'factions';
  if (/\btowny\b/.test(j)) return 'towny';
  if (/mineresetlite|\bprison\b|jetsprisonmines/.test(j)) return 'prison';
  if (/mythicmobs/.test(j) && /mmocore|mmoitems|modelengine/.test(j)) return 'rpg';
  if (/bedwars|skywars|survivalgames|murdermystery/.test(j)) return 'minigames';
  return null;
}
function guessChatFormatter(plugins) {
  const j = plugins.join(' ').toLowerCase();
  if (/fancychat/.test(j)) return 'fancychat';            // MiniMessage-aware
  if (/huskchat/.test(j)) return 'huskchat';              // MiniMessage-aware
  if (/venturechat/.test(j)) return 'venturechat';
  if (/deluxechat/.test(j)) return 'deluxechat';
  if (/\bchatty\b/.test(j)) return 'chatty';
  if (/essentials/.test(j)) return 'essentialsx';
  return null;
}
function buildProfile(prev) {
  const plugins = manifest.plugins.map(cleanPluginName);
  const sw = manifest.software.map((s) => s.replace(/\s*\(.*\)$/, ''));
  const isProxy = /Velocity|Waterfall|BungeeCord/i;
  const software = sw.find((s) => !isProxy.test(s)) || sw[0] || null;
  let proxy = null;
  if (sw.some((s) => /Velocity/i.test(s)) || manifest.keySettings['paper.proxies.velocity.enabled'] === 'true') proxy = 'velocity';
  else if (sw.some((s) => /BungeeCord|Waterfall/i.test(s)) || manifest.keySettings['spigot.bungeecord'] === 'true') proxy = 'bungee';
  // MC version: pull a version-looking token off the server jar name
  let mcVersion = null;
  for (const jar of manifest.rootJars) {
    const m = /(?:paper|purpur|folia|pufferfish|spigot|velocity)[-_]?v?(\d+\.\d+(?:\.\d+)?)/i.exec(jar);
    if (m) { mcVersion = m[1]; break; }
  }
  const om = manifest.keySettings['online-mode'];
  const onlineMode = om === 'true' ? true : om === 'false' ? false : (prev.onlineMode ?? null);
  return {
    software: software || prev.software || null,
    mcVersion: mcVersion || prev.mcVersion || null,
    java: prev.java ?? null,
    host: prev.host ?? null,
    ramMB: prev.ramMB ?? null,
    gamemode: guessArchetype(plugins) || prev.gamemode || null,
    proxy: proxy || prev.proxy || null,
    onlineMode,
    plugins: plugins.length ? plugins : (prev.plugins || []),
    worlds: manifest.worlds.length ? manifest.worlds : (prev.worlds || []),
    chatFormatter: guessChatFormatter(plugins) || prev.chatFormatter || null,
    notes: prev.notes || '',
    updatedAt: new Date().toISOString(),
  };
}

if (WRITE_PROFILE) {
  let prev = {};
  try { prev = JSON.parse(readFileSync(PROFILE_PATH, 'utf8')); } catch {}
  const profile = buildProfile(prev);
  mkdirSync(dirname(PROFILE_PATH), { recursive: true });
  writeFileSync(PROFILE_PATH, JSON.stringify(profile, null, 2) + '\n', 'utf8');
  console.error(`[scan] wrote profile: ${PROFILE_PATH}`);
  console.log(JSON.stringify(profile, null, 2));
} else if (AS_JSON) {
  console.log(JSON.stringify(manifest, null, 2));
} else {
  const L = [];
  L.push(`# Server scan: ${ROOT}`);
  L.push(`Software:    ${manifest.software.join(', ') || 'unknown'}`);
  L.push(`Config files: ${manifest.configFiles.join(', ') || 'none found'}`);
  L.push(`Worlds:      ${manifest.worlds.join(', ') || 'none found'}`);
  L.push(`Plugins (${manifest.plugins.length}): ${manifest.plugins.join(', ') || 'none'}`);
  L.push('Key settings:');
  for (const [k, v] of Object.entries(manifest.keySettings)) L.push(`  ${k} = ${v}`);
  if (manifest.warnings.length) {
    L.push('Warnings:');
    for (const w of manifest.warnings) L.push(`  ! ${w}`);
  }
  L.push('\nNext: feed this to the audit-config skill; cross-check online-mode vs proxy forwarding,');
  L.push('RCON exposure, view/simulation distance, and unfamiliar plugins (learn-plugin-docs).');
  console.log(L.join('\n'));
}
