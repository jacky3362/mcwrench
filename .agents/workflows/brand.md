---
description: Build a Minecraft server brand kit (name, MOTD, ranks, store/Discord) in the right format per plugin.
---

# Server brand kit

1. Engage the **server-branding** skill (`.agents/skills/server-branding/SKILL.md`). The server
   name + vibe is the workflow argument.
2. Read `skills/_cache/server-profile.json` if present: use `gamemode` for tone and `chatFormatter`
   to choose MiniMessage vs legacy. Otherwise ask for name, vibe, gamemode, and MOTD/chat plugins.
3. Emit each piece in the format its target parses (`references/format-target-matrix.md`); build
   MiniMessage only from `references/minimessage-cheatsheet.md`; pick a tone from
   `references/tone-presets.md`.
4. Output identity + MOTD (MiniMessage **and** legacy `&#RRGGBB`) + rank ladder; add store, Discord,
   and in-game text on request. Expand gradients to legacy with
   `node skills/server-branding/scripts/format.mjs --to-legacy "<...>"`.
5. Hand the rank ladder to **permissions-helper**; fetch unfamiliar plugin keys with
   **learn-plugin-docs**. Never invent config keys; keep store/EULA copy compliant.
