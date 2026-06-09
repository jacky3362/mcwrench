#!/usr/bin/env node
// SPDX-License-Identifier: MIT
//
// parse-log.mjs — read a Minecraft server crash report or log and return a ranked root-cause report.
// Pure text analysis, fully local/read-only. No network, no deps, stock Node >= 18.
//
// Usage:
//   node parse-log.mjs <file>            # a crash-reports/crash-*.txt or logs/latest.log
//   node parse-log.mjs <server-root>     # auto-picks the newest crash report, else logs/latest.log
//   cat latest.log | node parse-log.mjs  # read from stdin
//   node parse-log.mjs <input> --json    # machine-readable findings
//
// It NEVER fixes anything; it names the likely culprit + a fix recipe, prioritised critical -> low.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const AS_JSON = args.includes('--json');
const target = args.find((a) => !a.startsWith('--'));

function readStdin() {
  try { return readFileSync(0, 'utf8'); } catch { return ''; }
}
function newestCrash(root) {
  const dir = join(root, 'crash-reports');
  if (!existsSync(dir)) return null;
  try {
    const files = readdirSync(dir).filter((f) => /\.txt$/i.test(f)).map((f) => join(dir, f));
    if (!files.length) return null;
    return files.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)[0];
  } catch { return null; }
}
function loadInput() {
  if (!target || target === '-') return { text: readStdin(), source: 'stdin' };
  try {
    const st = statSync(target);
    if (st.isDirectory()) {
      const crash = newestCrash(target);
      if (crash) return { text: readFileSync(crash, 'utf8'), source: crash };
      const latest = join(target, 'logs', 'latest.log');
      if (existsSync(latest)) return { text: readFileSync(latest, 'utf8'), source: latest };
      return { text: '', source: target + ' (no crash-reports/ or logs/latest.log found)' };
    }
    return { text: readFileSync(target, 'utf8'), source: target };
  } catch (e) {
    return { text: '', source: `${target} (${e.message})` };
  }
}

// class-file major version -> Java feature version (for UnsupportedClassVersionError)
const CLASS_TO_JAVA = { 52: 8, 53: 9, 54: 10, 55: 11, 56: 12, 57: 13, 58: 14, 59: 15, 60: 16, 61: 17, 62: 18, 63: 19, 64: 20, 65: 21, 66: 22, 67: 23, 68: 24, 69: 25, 70: 26 };

// stack frames we treat as "engine" rather than a plugin culprit
const ENGINE_PKG = /^(net\.minecraft|com\.mojang|java\.|javax\.|jdk\.|sun\.|io\.netty|org\.bukkit|org\.spigotmc|io\.papermc|com\.destroystokyo|org\.yaml|com\.google|it\.unimi|org\.slf4j|org\.apache\.logging|gnu\.trove|joptsimple)/;

function firstPluginFrame(text) {
  // find the first "at <pkg>.<Class>" whose package is not engine code -> likely the culprit plugin
  const re = /^\s*at\s+([a-zA-Z_][\w.]*)\.[A-Za-z_$][\w$]*\.[A-Za-z_$<][\w$]*\(/gm;
  let m;
  while ((m = re.exec(text))) {
    const pkg = m[1];
    if (!ENGINE_PKG.test(pkg)) {
      // collapse to a short namespace (top 2-3 segments) for readability
      const parts = pkg.split('.');
      return parts.slice(0, Math.min(3, parts.length)).join('.');
    }
  }
  return null;
}

const SEV = { critical: 0, high: 1, medium: 2, low: 3 };
const findings = [];
function add(severity, title, detail, fix) { findings.push({ severity, title, detail, fix }); }

const { text, source } = loadInput();

if (!text.trim()) {
  console.error(`[parse-log] no input. Pass a crash-report / latest.log file, a server root, or pipe text.\n  source: ${source}`);
  process.exit(2);
}

const culprit = firstPluginFrame(text);

// --- signature checks (each maps to a fix recipe) ---
if (/UnsupportedClassVersionError/.test(text)) {
  const cv = /class file version (\d+)\.\d+/.exec(text);
  const needs = cv ? CLASS_TO_JAVA[Number(cv[1])] : null;
  add('critical', 'Java is too old for a jar (UnsupportedClassVersionError)',
    cv ? `A jar was compiled for class file version ${cv[1]} (Java ${needs ?? '?'}).` : 'A jar needs a newer Java than is installed.',
    `Install/point to Java ${needs ?? '25'}+ (Paper 26.1+ requires Java 25) and relaunch. Check the startup java -version.`);
}
if (/A problem occurred running the server.*EULA|You need to agree to the EULA|eula\.txt/i.test(text) || /agree to the EULA/i.test(text)) {
  add('critical', 'EULA not accepted', 'The server refuses to start until the EULA is accepted.',
    'Set eula=true in eula.txt (only if you accept Mojang\'s EULA), then restart.');
}
if (/FAILED TO BIND TO PORT|Perhaps a server is already running|Address already in use/i.test(text)) {
  add('critical', 'Port already in use / failed to bind',
    'Another process holds the server port, or a previous instance did not exit.',
    'Stop the other process (or change server-port). On a panel, ensure only one instance/allocation uses the port.');
}
if (/OutOfMemoryError|GC overhead limit exceeded|unable to create new native thread/i.test(text)) {
  add('critical', 'Out of memory (OutOfMemoryError)',
    'The JVM ran out of heap (or native) memory.',
    'Raise -Xmx (but leave headroom on a container: Xmx < allocated RAM, and AlwaysPreTouch reserves it up front). Profile with Spark; check for an entity/chunk leak. See performance-tuning.');
}
if (/Watchdog|server has stopped responding|A single server tick took|can't keep up|Did the system time change/i.test(text)) {
  add('high', 'Server overloaded / Watchdog (single tick too long)',
    'The main thread blocked long enough for the Watchdog to dump or kill it.' + (culprit ? ` The dump points at ${culprit}.` : ''),
    'Find the hot path with Spark (/spark profiler). Common causes: a plugin doing sync I/O, a runaway entity/redstone, or oversized view/sim distance. Route plugin-named traces to learn-plugin-docs + performance-tuning.');
}
if (/Exception ticking|Ticking entity|Ticking block entity|Ticking world|Exception in server tick loop/i.test(text)) {
  add('high', 'Crash while ticking a world/entity/block-entity',
    'A specific entity/block-entity/chunk threw during a tick.' + (culprit ? ` Culprit namespace: ${culprit}.` : ''),
    'If a plugin namespace is named, update/remove it and check its docs (learn-plugin-docs). If vanilla, the offending entity/block can be removed with a region editor; back up first.');
}
if (/Unsupported API version|plugin .* is not compatible|Could not load '?plugins|Invalid plugin\.yml|because it depends on/i.test(text)) {
  add('high', 'A plugin failed to load (API mismatch or missing dependency)',
    'A plugin\'s api-version is too new/old for this server, or a required dependency is missing.' + (culprit ? ` Likely: ${culprit}.` : ''),
    'Check the plugin\'s required MC/loader + dependencies with learn-plugin-docs; update it to a build for this version, or add the missing dependency. Cross-check with check-plugin-versions.mjs and check-conflicts.mjs.');
}
if (/NoClassDefFoundError|ClassNotFoundException|NoSuchMethodError|NoSuchFieldError/i.test(text)) {
  add('high', 'Missing/incompatible class (NoClassDefFoundError / NoSuchMethodError)',
    'A plugin called code that is not present, usually a version mismatch with a dependency (ProtocolLib, PacketEvents, an API jar) or a stale jar.' + (culprit ? ` From: ${culprit}.` : ''),
    'Update the plugin AND its dependency to matching versions for this MC version. Delete duplicate/old jars.');
}
if (/Could not reserve enough space for .* object heap|Invalid maximum heap size|Could not create the Java Virtual Machine/i.test(text)) {
  add('critical', 'Bad JVM heap flags',
    'The -Xmx/-Xms values are invalid or larger than available RAM.',
    'Fix the heap flags to fit the host RAM (leave headroom). On a panel, match Xmx to the allocation minus overhead.');
}

// generic: a Caused by chain with a plugin namespace but no signature above
if (!findings.length && culprit) {
  add('medium', `Unhandled exception from ${culprit}`,
    'No known signature matched, but the first non-engine stack frame names this namespace.',
    `Update or remove ${culprit}; fetch its docs with learn-plugin-docs and check for a known issue. Share the full stack if it persists.`);
}

findings.sort((a, b) => SEV[a.severity] - SEV[b.severity]);

if (AS_JSON) {
  console.log(JSON.stringify({ source, culprit, findings }, null, 2));
} else {
  const L = [];
  L.push(`# Log diagnosis — ${source}`);
  if (culprit) L.push(`Likely culprit namespace: ${culprit}`);
  if (!findings.length) {
    L.push('\nNo known crash signature matched. This may be a clean log, or a novel error.');
    L.push('Paste the lines around the first "Exception"/"Caused by", or share the full crash report.');
  } else {
    L.push('');
    for (const f of findings) {
      L.push(`${f.severity.toUpperCase().padEnd(8)} ${f.title}`);
      L.push(`         ${f.detail}`);
      L.push(`         fix: ${f.fix}`);
    }
    L.push('\nPrioritised critical -> low. Confirm plugin specifics with learn-plugin-docs; never assume a fix without reading the plugin\'s docs.');
  }
  console.log(L.join('\n'));
}
