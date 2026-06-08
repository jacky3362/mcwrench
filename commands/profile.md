---
description: Show or update mcwrench's per-server profile (software, version, host, stack) so answers stop re-asking.
argument-hint: "[path-to-server-root] | get <key> | set <key> <value> | clear"
allowed-tools: Read, Bash, Glob, Skill
---

Manage the **server profile** at `skills/_cache/server-profile.json` — the small record every
mcwrench skill reads first to tailor answers (software, MC version, host, RAM, gamemode, proxy,
online-mode, plugins, worlds, chat formatter).

Argument `$ARGUMENTS`:

- A **path** (or empty for the current directory) → scan and upsert the profile:
  `node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/scan-server-tree.mjs" "$ARGUMENTS" --write-profile`
- `get <key>` / `set <key> <value>` / `clear` → manage individual fields:
  `node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/server-profile.mjs" $ARGUMENTS`

After writing, show the resulting profile and note which fields are still unknown (java, host, RAM
are not auto-detected — set them with `set`). Auto-detection is best-effort: confirm the MC version
and chat formatter with the user before relying on them for version- or format-specific advice.
