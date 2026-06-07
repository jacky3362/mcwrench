---
name: new-server-bootstrap
description: >-
  Bootstraps a brand-new Minecraft server from scratch (Paper, optionally with a
  Velocity proxy). Use whenever the user says "set up a new server", "start a
  Minecraft server from scratch", "how do I make a server", "fresh install",
  "download Paper", "what Java do I need", "first time server setup", "create a
  network", "eula.txt", "startup script", "set up Velocity", or is greenfielding
  any server. Knows the current Paper Fill v3 download API, the Java 25
  requirement, the EULA + first-run flow, a Java-25 + Aikar's-flags startup
  script, sane server.properties starter values, and Velocity modern-forwarding
  setup. Hand off the gamemode plugin stack to gamemode-stacks and the final
  review to audit-config.
argument-hint: "[gamemode / network details]"
allowed-tools: Read, Bash, Write, Glob, Skill
license: MIT
---

# New Server Bootstrap

Stand up a working base server, then layer the gamemode stack on top.

**Current facts (verified 2026-06-07):** Minecraft is **26.1.x**. Latest Paper is **26.1.2
build 69**. **Paper 26.1+ requires Java 25.** Velocity is **3.5.0-SNAPSHOT** (needs Java 21+).
Always re-query the API for the live latest build at setup time.

## Steps

1. **Scope.** Single server or a network? Gamemode? Host (self-hosted, Pterodactyl/Pelican,
   other)? Player count? → recommend **Paper** by default (see Folia note below).
2. **Download the latest Paper build — use the Fill v3 API (the old v2 API stopped builds
   2025-12-31).** Do NOT hand-construct download URLs; read the URL from the API response. Helper:
   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/skills/new-server-bootstrap/scripts/fetch-paper.mjs" 26.1.2
   #   prints the resolved STABLE build + download URL (and --download to fetch it)
   ```
   Manually: `GET https://fill.papermc.io/v3/projects/paper/versions/{MC}/builds`, pick the
   newest `channel: STABLE`, download `downloads."server:default".url`. A descriptive
   `User-Agent` is required by the API.
3. **Install Java 25** (Paper 26.1+ will not start on older Java). Verify `java -version`.
4. **EULA + first run.** Run once: `java -jar paper.jar --nogui` → it writes `eula.txt` and stops.
   Set `eula=true` (or pass `-Dcom.mojang.eula.agree=true`). Restart → it generates
   `server.properties` + the world and comes online.
5. **Startup script.** Use the template `assets/startup.sh.tmpl` (Java 25 + Aikar's/G1 flags +
   `--nogui`). Keep **`Xms == Xmx`** with host headroom (leave ~1–1.5 GB; on a panel keep `Xmx`
   below the container limit — see `pterodactyl-ops`). Aikar's flags are PaperMC's documented
   default; only consider Generational ZGC as a Java-25 alternative, never mixed.
6. **server.properties starter values** — see `assets`/the table below. Set `online-mode`,
   `view-distance`, `simulation-distance`, `max-players`, `motd`, `difficulty`, `gamemode`.
7. **Network?** If multiple servers, set up **Velocity** (`assets/velocity.example.toml`): first
   run generates `velocity.toml` + `forwarding.secret`; set `player-info-forwarding-mode = "modern"`,
   put the secret into each backend's `paper-global.yml` (`assets/paper-global.example.yml`), set
   each backend `online-mode=false`, and firewall backend ports. Full detail: `proxy-network`.
8. **Gamemode stack** → hand off to `gamemode-stacks` for the archetype's plugins.
9. **Review** → run `audit-config` on the finished tree; tune with `performance-tuning`.

## server.properties starter values

| Key | Default | Sane starter |
|---|---|---|
| `online-mode` | true | `true` standalone; `false` only behind a proxy (never expose such a backend) |
| `view-distance` | 10 | 8–10 (6–8 high-pop) |
| `simulation-distance` | 10 | 6–8 (biggest TPS lever; keep ≤ view-distance) |
| `max-players` | 20 | your real cap |
| `difficulty` | easy | `normal` for most SMP |
| `gamemode` | survival | per server type |
| `spawn-protection` | 16 | `0` if unneeded |
| `enable-rcon` | false | keep `false`; if enabled, strong password + firewall (confirm first) |

## Folia vs Paper

Default to **Paper**. Choose **Folia** only with **≥16 physical cores**, high concurrent players
**spread across regions** (skyblock/SMP-style), and a plugin list where every plugin declares
`folia-supported: true`. Most stacks are not Folia-ready.
