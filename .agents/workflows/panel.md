---
description: Pterodactyl/Pelican panel ops — RCON, memory/OOM, backups, the client API.
---

# Panel ops (Pterodactyl / Pelican)

1. Engage the **pterodactyl-ops** skill (`.agents/skills/pterodactyl-ops/SKILL.md`).
2. RCON → add a **secondary allocation** first, then set `enable-rcon`/`rcon.port`/`rcon.password`
   in `server.properties`. Confirm before enabling; never expose the port.
3. Container OOM ("Cannot allocate memory") → set `Xmx` **below** the panel allocation (leave
   ~1–1.5 GB headroom) and/or drop `-XX:+AlwaysPreTouch`.
4. Backups are **not atomic** → `save-off` + `save-all flush` before a hot backup, or stop first.
5. For automation, use the client API (`/files/contents`, `/files/write`, `/command`, `/power`)
   with a `ptlc_` bearer key. Confirm before destructive actions.
