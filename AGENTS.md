# mcwrench — guidance for Codex & Antigravity (and other AGENTS.md-aware agents)

This repo is **mcwrench**, a general-purpose, gamemode-agnostic Minecraft **server config &
operations** assistant. The same skills work in OpenAI Codex, Google Antigravity, Claude Code,
Claude.ai, and Gemini CLI.

## Skills discovery (Codex & Antigravity)

Skills live in **`.agents/skills/`**, which is a **symlink to `skills/`** (the single source of
truth — both Codex and Antigravity follow symlinked skill folders, and `.agents/skills/` is
Antigravity's native skills path). Each folder has a `SKILL.md` with `name` + `description`.
Invoke a skill explicitly (Codex `$skill-name`, e.g. `$audit-config`) or let the agent auto-select
by description. **Antigravity** also exposes the `.agents/workflows/` files as slash commands
(`/audit`, `/learn`, `/perf`, `/perms`, `/proxy`, `/bootstrap`, `/panel`, `/gamemode`, `/skript`)
and reads `.agents/rules/mcwrench.md`.

| Skill | Use for |
|---|---|
| `minecraft-server-router` | Always-on hub for ANY Minecraft server-admin topic; routes to a specialist. |
| `audit-config` | Lint a config tree for footguns, performance, and security issues. |
| `performance-tuning` | Lag / TPS / MSPT / OOM; Spark profiling; Aikar's flags; view/sim distance; entity & chunk tuning. |
| `permissions-helper` | LuckPerms groups, tracks, contexts, meta; Vault; node conventions. |
| `proxy-network` | Velocity/Bungee modern forwarding and the forwarding.secret handshake. |
| `gamemode-stacks` | Canonical plugin stacks for 11 archetypes (SMP, skyblock, prison, factions, towny, minigames, RPG/MMO, anarchy, creative, KitPvP, lifesteal). |
| `new-server-bootstrap` | Greenfield Paper/Velocity setup; Fill v3 Paper downloader; Java-25 + Aikar startup; starter configs. |
| `pterodactyl-ops` | Pterodactyl/Pelican panel: RCON, Xmx/AlwaysPreTouch OOM, non-atomic backups, client API. |
| `skript-author` | Write/debug Skript; fetch live syntax from Skript Hub. |
| `learn-plugin-docs` | Fetch + condense ANY plugin's docs into `skills/_cache/<slug>/REFERENCE.md`. |

## Operating rules (same as CLAUDE.md)

1. **Never invent config keys, permission nodes, or version numbers.** If unsure about a plugin,
   run `learn-plugin-docs` first (`node skills/learn-plugin-docs/scripts/learn-docs.mjs "<name>"`)
   and answer from the fetched reference.
2. **Verified 2026-06-07:** Minecraft dropped the `1.` prefix — current line is **26.1.x**;
   **Paper 26.1+ requires Java 25**; Velocity is `3.5.0-SNAPSHOT`. Confirm the user's version first.
3. **Aikar's flags** (G1GC) are the proven default per PaperMC; the "avoid on Java 25 / prefer
   Generational ZGC" caveat is community/hosting guidance — never mix G1 and ZGC flag sets.
4. **Prioritise findings:** critical (crash/data loss) → high (lag/security) → medium → low.
5. **Confirm before destructive/irreversible ops** (deleting worlds, exposing RCON, flipping
   `online-mode` behind a proxy).

## Notes

- The docs engine runs on stock Node ≥18 (global `fetch`); the wired adapters (Modrinth, Hangar,
  GitBook, GitHub README) need no `npm install`.
- Do not edit anything under `.agents/` directly — edit the real files in `skills/`.
