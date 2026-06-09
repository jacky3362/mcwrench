---
description: Grade a Minecraft server folder: config, conflicts, plugin currency, and today's log.
argument-hint: "[path-to-server-root]"
allowed-tools: Read, Bash, Glob, Skill
---

Use the **server-doctor** skill to produce a health scorecard for `$ARGUMENTS` (default: the current
directory). Run the read-only scanners and roll them into one graded report:

- `node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/scan-server-tree.mjs" <root>` — software, version, plugins, footguns
- `node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/check-conflicts.mjs" <root>` — plugin conflicts + missing deps
- `node "${CLAUDE_PLUGIN_ROOT}/skills/server-doctor/scripts/check-plugin-versions.mjs" <root>` — outdated / no build for this MC
- `node "${CLAUDE_PLUGIN_ROOT}/skills/server-doctor/scripts/parse-log.mjs" <root>` — today's crash/log, if any

Grade **security, performance, durability, currency**; list the top fixes prioritised critical to
low. Read the server-profile so you do not re-ask known facts. Hand deep tuning to
`performance-tuning` and config lint to `audit-config`. Read-only; never run live commands.
