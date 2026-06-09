---
description: Diagnose a Minecraft crash report or log and name the likely cause and fix.
argument-hint: "[path to a crash-report/latest.log or server root; or paste the log]"
allowed-tools: Read, Bash, Glob, Skill
---

Use the **server-doctor** skill to diagnose `$ARGUMENTS` (a `crash-reports/crash-*.txt` or
`logs/latest.log` file, a server root, or pasted log text).

Run:
`node "${CLAUDE_PLUGIN_ROOT}/skills/server-doctor/scripts/parse-log.mjs" $ARGUMENTS`
(or pipe the pasted log to it; add `--json` for machine output).

Report the ranked root cause: name the **likely culprit plugin namespace** and a fix per finding,
prioritised critical to low (Java/class-version, OOM, Watchdog/overload, ticking entity/world, port
bind, EULA, plugin load/dependency, NoClassDefFound). Route a named plugin to `learn-plugin-docs`
and lag findings to `performance-tuning`; cross-check the server-profile. Read-only; never run live
commands and never invent a fix.
