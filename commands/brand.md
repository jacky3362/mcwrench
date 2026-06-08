---
description: Build a Minecraft server brand kit: name, MOTD, ranks, store/Discord copy, in the right format per plugin.
argument-hint: "<server name + vibe, e.g. 'cozy skyblock called Willow Hollow'>"
allowed-tools: Read, Bash, Glob, Skill
---

Use the **server-branding** skill to build a brand kit for: `$ARGUMENTS`

1. Read `skills/_cache/server-profile.json` if present (use `gamemode` for tone, `chatFormatter`
   to pick MiniMessage vs legacy). Otherwise ask only for: name (or brainstorm), vibe/tone,
   gamemode, and which MOTD/chat plugins are in use.
2. Follow `references/format-target-matrix.md` to emit each piece in the format its target parses,
   and build MiniMessage only from `references/minimessage-cheatsheet.md`. Pick a tone from
   `references/tone-presets.md`.
3. Produce identity + MOTD (both MiniMessage and legacy `&#RRGGBB`) + rank ladder; add store,
   Discord, and in-game text if asked. To expand a gradient to legacy hex, run
   `node "${CLAUDE_PLUGIN_ROOT}/skills/server-branding/scripts/format.mjs" --to-legacy "<gradient:#a:#b>text</gradient>"`.
4. Hand the rank ladder to **permissions-helper** for LuckPerms tracks; fetch any unfamiliar plugin
   keys with **learn-plugin-docs**. Never invent config keys. Keep store/EULA copy compliant.
