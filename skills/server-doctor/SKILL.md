---
name: server-doctor
description: >-
  Diagnoses and maintains a running Minecraft server from local files and pasted
  output, read-only. Use whenever the user shares or points at a crash report,
  latest.log, or an error and asks why the server crashed, won't start, keeps
  crashing, freezes, or stopped responding; wants a health check or scorecard for
  a server folder; asks whether plugins are outdated or have a build for their
  version; or is planning a version upgrade or migration (to 26.1, Java 25, a new
  Paper build) and wants a go/no-go plan. Reads crash-reports, logs, the server
  profile, and the plugin set; names the likely culprit plugin and a fix; flags
  stale or incompatible plugins; and produces an ordered upgrade runbook. Plans
  and reports only; it never runs server commands or writes to a live server.
license: MIT
---

# Server Doctor (day-2 operations)

Keep a running server healthy. Three jobs, all **local and read-only** — paste a log or point at a
server folder; **never run live commands or write to a panel** (that is a future operator mode).
Never invent config keys or plugin behaviour; confirm specifics with `learn-plugin-docs`.

## 1. Diagnose a crash or error  (`/mcwrench:diagnose`)
The headline. Read a `crash-reports/crash-*.txt`, `logs/latest.log`, or pasted text and return a
ranked root cause.
```bash
node "${CLAUDE_PLUGIN_ROOT}/skills/server-doctor/scripts/parse-log.mjs" <file-or-server-root>
#   or pipe:  cat latest.log | node .../parse-log.mjs
#   add --json for machine output
```
It names the **likely culprit namespace** (the first non-engine stack frame), and matches signatures
in `references/log-signatures.md`: UnsupportedClassVersionError (Java too old — class file version 69
= Java 25), OutOfMemoryError, Watchdog / single-tick overload, ticking entity/world crashes, port
already in use, EULA not accepted, plugin load failures (Unsupported API version / missing
dependency), NoClassDefFoundError/NoSuchMethodError. Each finding has a fix recipe; route a named
plugin to `learn-plugin-docs` and lag findings to `performance-tuning`. Cross-reference the
**server-profile** (Java/software/plugins) to disambiguate (e.g. `UnsupportedClassVersionError` on a
26.1 jar = Java < 25).

## 2. Health scorecard  (`/mcwrench:health`)
A one-shot graded report for a server folder. Run the existing read-only scanners and roll them up:
```bash
node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/scan-server-tree.mjs" <root>          # software, version, plugins, footguns
node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/check-conflicts.mjs" <root>           # plugin conflicts + missing deps
node "${CLAUDE_PLUGIN_ROOT}/skills/server-doctor/scripts/check-plugin-versions.mjs" <root>    # outdated / no-build-for-this-MC
node "${CLAUDE_PLUGIN_ROOT}/skills/server-doctor/scripts/parse-log.mjs" <root>                # today's crash/log, if any
```
Grade four areas — **security, performance, durability, currency** — list the top fixes prioritised
critical to low, and hand deep tuning to `performance-tuning` and config lint to `audit-config`. Use
the server-profile so you do not re-ask known facts.

## 3. Upgrade / migration planner  (`/mcwrench:upgrade`)
Given the server-profile and a target version, produce a go/no-go runbook. Use
`references/upgrade-checklist.md`. The big 2026 facts:
- **Paper 26.1+ requires Java 25** — flag `UnsupportedClassVersionError` risk if Java is older.
- **26.1 dropped the obfuscated jar**: Spigot-mapped plugins must be re-released for 26.1, so many
  silently break. For each installed plugin, label **has a 26.1 build / none / unknown** using
  `check-plugin-versions.mjs` + `learn-plugin-docs`.
- Do **not** combine a version bump with a software/server-type switch in one step.
- World-upgrade caveats: back up and trim first; test on a copy before upgrading the live world.
Emit an ordered runbook: **back up → bump Java → update plugins (verify builds) → test on a copy →
upgrade the world**. Read-only: it never downloads or writes.

## Guardrails
- Local + read-only. No RCON, no panel writes, no console commands (that is v2).
- Never invent config keys or claim a plugin behaviour you have not read; fetch with `learn-plugin-docs`.
- Always confirm a destructive step (world upgrade, deleting regions) and tell the user to back up first.

## References + scripts
- `references/log-signatures.md` — the crash/log signature catalogue + fix recipes.
- `references/upgrade-checklist.md` — the 26.1 / Java 25 / cross-version migration runbook.
- `scripts/parse-log.mjs` — crash/log analyzer (read-only, no deps).
- `scripts/check-plugin-versions.mjs` — staleness + MC/loader-compat report (Modrinth; `--offline` ok).
