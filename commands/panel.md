---
description: Pterodactyl/Pelican panel ops — RCON, memory/OOM, backups, the client API.
argument-hint: "[task or symptom]"
allowed-tools: Read, Bash, Glob, Grep, Skill
---

Use the **pterodactyl-ops** skill for: `$ARGUMENTS`

Cover RCON setup (secondary allocation + confirm before enabling), the AlwaysPreTouch/Xmx
container-OOM footgun (set Xmx below the panel allocation), non-atomic panel backups (quiesce with
`save-off`/`save-all flush` first), and the client API for scripted file/command/power actions.
Works for both Pterodactyl and Pelican (eggs + API are backward-compatible). Confirm before any
destructive panel action.
