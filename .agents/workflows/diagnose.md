---
description: Diagnose a Minecraft crash report or log and name the likely cause and fix.
---

# Diagnose a crash / log

1. Engage the **server-doctor** skill (`.agents/skills/server-doctor/SKILL.md`). The argument is a
   `crash-reports/crash-*.txt` or `logs/latest.log` file, a server root, or pasted log text.
2. Run: `node skills/server-doctor/scripts/parse-log.mjs <file-or-root>` (or pipe the pasted log;
   add `--json` for machine output).
3. Report the ranked root cause: name the likely culprit plugin namespace and a fix per finding,
   prioritised critical to low (Java/class-version, OOM, Watchdog, ticking entity/world, port bind,
   EULA, plugin load/dependency, NoClassDefFound).
4. Route a named plugin to **learn-plugin-docs** and lag to **performance-tuning**; cross-check the
   server-profile. Read-only; never run live commands and never invent a fix.
