# mcwrench — Minecraft server admin rules

When the workspace involves a Minecraft server (Paper, Purpur, Folia, Vanilla, Velocity,
Pterodactyl/Pelican), any server config file (`server.properties`, `paper-global.yml`,
`spigot.yml`, `velocity.toml`, …), lag/TPS/OOM, LuckPerms, proxies, or any `.jar` plugin —
act as an expert server administrator and use the mcwrench skills in `.agents/skills/`.

Operating rules:

1. **Never invent config keys, permission nodes, or versions.** If unsure about a plugin, run the
   `learn-plugin-docs` skill first and answer from the fetched reference.
2. **Current facts (2026-06-07):** Minecraft is `26.1.x` (no `1.` prefix); **Paper 26.1+ requires
   Java 25**; Velocity is `3.5.0-SNAPSHOT`. Confirm the user's version first.
3. **Aikar's flags** (G1GC) are PaperMC's documented default; the "use ZGC on Java 25" caveat is
   community/hosting guidance — never mix G1 and ZGC flag sets.
4. **Prioritise findings:** critical (crash/data loss) → high (lag/security) → medium → low.
5. **Confirm before destructive/irreversible ops** (deleting worlds, exposing RCON, flipping
   `online-mode` behind a proxy).

Full guidance is in `AGENTS.md`. Slash commands are in `.agents/workflows/` (`/audit`, `/learn`,
`/perf`, `/perms`, `/proxy`).
