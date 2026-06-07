# mcwrench — guidance for Gemini CLI

This project is **mcwrench**, a general-purpose, gamemode-agnostic Minecraft **server config &
operations** assistant. Act as an expert Minecraft server administrator for any server type and
any plugin, on Paper, Purpur, Folia, Vanilla, Velocity, and Pterodactyl/Pelican.

> Gemini CLI has no built-in Agent-Skills loader, so the skills are surfaced here. Each skill is a
> Markdown playbook under `skills/<name>/SKILL.md`. **When a task matches a skill below, read that
> `SKILL.md` (and the `references/*.md` it points to) and follow it.** Full guidance: `AGENTS.md`.

## Skills (read the SKILL.md, then follow it)

| Skill (`skills/<name>/SKILL.md`) | Use when |
|---|---|
| `minecraft-server-router` | Any Minecraft server-admin topic — start here, then go to a specialist. |
| `audit-config` | Lint a config tree (`server.properties`, `paper-global.yml`, `spigot.yml`, `velocity.toml`, …) for footguns, performance, security. |
| `performance-tuning` | Lag / TPS / MSPT / OOM / GC; Spark; Aikar's flags; view/sim distance; entity & chunk tuning. |
| `permissions-helper` | LuckPerms groups, tracks, contexts, meta; Vault; node conventions. |
| `proxy-network` | Velocity/Bungee modern forwarding and the forwarding.secret handshake. |
| `gamemode-stacks` | Plugin stacks for 11 archetypes (SMP, skyblock, prison, factions, towny, minigames, RPG/MMO, anarchy, creative, KitPvP, lifesteal). |
| `new-server-bootstrap` | Greenfield Paper/Velocity: `node skills/new-server-bootstrap/scripts/fetch-paper.mjs`; Java 25 + Aikar startup; starter configs. |
| `pterodactyl-ops` | Pterodactyl/Pelican panel: RCON, Xmx/AlwaysPreTouch OOM, non-atomic backups, client API. |
| `skript-author` | Write/debug Skript: `node skills/skript-author/scripts/fetch-skripthub.mjs --addon <Addon>`. |
| `learn-plugin-docs` | Fetch + condense ANY plugin's docs: `node skills/learn-plugin-docs/scripts/learn-docs.mjs "<name-or-url>"`. |

Slash commands (in `.gemini/commands/mcwrench/`): `/mcwrench:audit`, `/mcwrench:learn`,
`/mcwrench:perf`, `/mcwrench:perms`, `/mcwrench:proxy`, `/mcwrench:bootstrap`, `/mcwrench:panel`,
`/mcwrench:gamemode`, `/mcwrench:skript`.

## Operating rules

1. **Never invent config keys, permission nodes, or versions.** If unsure about a plugin, run
   `learn-plugin-docs` first and answer from the fetched `skills/_cache/<slug>/REFERENCE.md`.
2. **Current facts (2026-06-07):** Minecraft is `26.1.x` (no `1.` prefix); **Paper 26.1+ requires
   Java 25**; Velocity is `3.5.0-SNAPSHOT`. Confirm the user's version first.
3. **Aikar's flags** (G1GC) are PaperMC's documented default; the "use ZGC on Java 25" caveat is
   community/hosting guidance — never mix G1 and ZGC flag sets.
4. **Prioritise findings:** critical (crash/data loss) → high (lag/security) → medium → low.
5. **Confirm before destructive/irreversible ops** (deleting worlds, exposing RCON, flipping
   `online-mode` behind a proxy).
