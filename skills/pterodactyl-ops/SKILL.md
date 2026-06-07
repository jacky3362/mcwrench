---
name: pterodactyl-ops
description: >-
  Operates Minecraft servers on the Pterodactyl Panel and its fork Pelican Panel.
  Use whenever the user mentions Pterodactyl, Pelican, "the panel", Wings, a game
  panel, eggs, allocations, "secondary port", RCON on a panel, SFTP to my server,
  "/home/container", egg variables, startup command, panel backups, "container
  out of memory", "Cannot allocate memory", or running Minecraft in Docker on a
  host panel. Covers RCON setup (secondary allocation), egg variables & the
  startup command, the AlwaysPreTouch/Xmx container-OOM footgun, panel backups
  (non-atomic), the client API (files/command/power), and Pelican-vs-Pterodactyl
  differences. Confirm before exposing RCON or deleting server files.
argument-hint: "[task or symptom]"
allowed-tools: Read, Bash, Glob, Grep, Skill
license: MIT
---

# Pterodactyl / Pelican Ops

Run and configure Minecraft servers on Pterodactyl Panel and **Pelican Panel** (a fork by the
former Pterodactyl team, mid-2024; still **beta** as of 2026-06, relicensed **AGPLv3**). Pelican
imports Pterodactyl **eggs unmodified** and keeps the **API backward-compatible**, so this skill
applies to both — note the few differences in `references/panel-footguns.md`.

## Architecture (one-screen model)

- **Panel** (web UI) + **Wings** (daemon, one per node). Each server is an isolated **Docker
  container**; files live at **`/home/container`** (host bind-mount under
  `/var/lib/pterodactyl/volumes/<uuid>`).
- The **STARTUP** command substitutes egg variables (`{{SERVER_JARFILE}}`, `{{SERVER_MEMORY}}`, …)
  from environment variables at boot. Console/stats stream to the panel.
- **Allocations**: the *primary* allocation is the game port. Anything else (RCON, query, Geyser,
  Dynmap) needs a **secondary allocation** added in the **Network** tab.

## Tasks

- **RCON** → `references/rcon-setup.md`. Key point: add a **secondary allocation** first, then set
  `enable-rcon=true` / `rcon.port=<that port>` / a strong `rcon.password` in `server.properties`.
  **Confirm with the user before enabling RCON**, and never expose the port publicly.
- **Memory / OOM** → if the container dies with "Cannot allocate memory" or the cgroup OOM-kills
  it: the JVM heap + `-XX:+AlwaysPreTouch` is claiming the full container limit at boot. **Set
  `Xmx` below the panel's allocated memory** (leave ~1–1.5 GB / 10–15% headroom for JVM native
  memory) and/or drop `AlwaysPreTouch`. The panel `{{SERVER_MEMORY}}` value is the *container*
  limit, not a safe heap size. (See `performance-tuning` for the full flag discussion.)
- **Backups** → `references/backup-strategies.md`. Panel/Wings backups archive the **live
  filesystem and are NOT atomic** — quiesce writes (`/save-off` then `/save-all flush` via console
  or the `/command` API) before taking one, or stop the server.
- **Editing config** → edit while **stopped** (a running server can overwrite files on shutdown),
  then start. Use **SFTP** for large/bulk file transfers the web file manager handles poorly.
- **Automation** → the client API (below) for scripted file edits, commands, and power actions.

## Client API (Pterodactyl + Pelican, backward-compatible)

Auth: `Authorization: Bearer ptlc_<key>` (Account → API Credentials), `Accept: application/json`.
Rate limit ~240 req/min per key.

| Action | Endpoint |
|---|---|
| Read file | `GET /api/client/servers/{id}/files/contents?file=/path` |
| Write file | `POST /api/client/servers/{id}/files/write?file=/path` |
| List files | `GET /api/client/servers/{id}/files/list` |
| Send command | `POST /api/client/servers/{id}/command` — body `{"command":"save-all flush"}` |
| Power signal | `POST /api/client/servers/{id}/power` — body `{"signal":"start|stop|restart|kill"}` |

## Output

Give exact panel steps (which tab, which field) and exact file/`server.properties` edits. For any
destructive action (deleting server files, wiping a world, exposing RCON), state the risk and
confirm first.
