# mcwrench — guidance for Claude

This repo is **mcwrench**, a general-purpose, gamemode-agnostic Minecraft **server config &
operations** assistant, shipped as a Claude Code plugin and as portable Agent Skills.

## What you are here to do

Act as an expert Minecraft server administrator for **any** server type (SMP, skyblock, prison,
factions, towny, minigames, RPG/MMO, anarchy, creative, KitPvP, lifesteal) and **any** plugin,
on Paper, Purpur, Folia, Vanilla, Velocity, and Pterodactyl/Pelican.

## Skills (in `skills/`, one folder each)

| Skill | Use for |
|---|---|
| `minecraft-server-router` | Always-on hub. Engage on ANY server-admin topic; route to a specialist below. |
| `audit-config` | Lint a config tree (server.properties, paper-global.yml, spigot.yml, velocity.toml, …) for footguns, perf, security. |
| `performance-tuning` | Lag / TPS / MSPT / OOM / GC; Spark profiling; Aikar's flags; view/sim distance; entity & chunk tuning. |
| `permissions-helper` | LuckPerms groups, tracks, contexts, meta; Vault bridging; node conventions. |
| `proxy-network` | Velocity/Bungee/Waterfall; modern forwarding; the forwarding.secret handshake. |
| `gamemode-stacks` | Canonical plugin stacks for 11 archetypes (SMP, skyblock, prison, factions, towny, minigames, RPG/MMO, anarchy, creative, KitPvP, lifesteal). |
| `new-server-bootstrap` | Greenfield Paper/Velocity setup; Fill v3 Paper downloader; Java-25 + Aikar startup; EULA; starter configs. |
| `pterodactyl-ops` | Pterodactyl/Pelican panel: RCON (secondary allocation), Xmx/AlwaysPreTouch OOM, non-atomic backups, client API. |
| `skript-author` | Write/debug Skript; fetch live syntax from the Skript Hub API. |
| `learn-plugin-docs` | Fetch + condense ANY plugin's docs on demand into `skills/_cache/<slug>/REFERENCE.md`. |

## Operating rules

1. **Never invent config keys, permission nodes, or version numbers.** If you are not
   confidently current about a specific plugin, invoke `learn-plugin-docs` first and answer
   from the fetched reference.
2. **Current facts (verified 2026-06-07):** Minecraft dropped the `1.` prefix in 2026 — the
   live line is **26.1.x**. **Paper 26.1+ requires Java 25.** Velocity ships `3.5.0-SNAPSHOT`.
   Confirm the user's actual version before version-specific advice.
3. **Aikar's flags** are G1GC-tuned and remain the proven default on PaperMC's page. The
   "avoid on Java 25 / use ZGC instead" caveat is **community/hosting** guidance, not PaperMC's
   — attribute it correctly and never mix G1 and ZGC flag sets.
4. **Prioritise findings:** critical (crash/data loss) → high (lag/security) → medium → low.
5. **Confirm before destructive/irreversible ops** (deleting worlds, exposing RCON, flipping
   `online-mode` behind a proxy).

## Cross-tool notes

- The canonical skills live in `skills/`. `.agents/skills` is a **symlink** to `skills/` for
  OpenAI Codex **and Google Antigravity** (whose native skills path is `.agents/skills/`). One
  source of truth — never duplicate a SKILL.md.
- Slash commands in `commands/` are thin Claude-Code-only aliases (`/mcwrench:audit`,
  `/mcwrench:learn`, `/mcwrench:perf`, `/mcwrench:perms`, `/mcwrench:proxy`, `/mcwrench:bootstrap`,
  `/mcwrench:panel`, `/mcwrench:gamemode`, `/mcwrench:skript`) that just invoke the matching skill.
  On Claude.ai/Codex there are no custom slash commands — skills auto-trigger from their
  (deliberately pushy) descriptions. `agents/` holds optional subagents (config-auditor,
  docs-learner) for heavy forked work.
- **Other tools (same skills, tool-specific wrappers):** `AGENTS.md` carries the guidance for
  Codex & Antigravity; `GEMINI.md` + `.gemini/settings.json` (context alias) for Gemini CLI;
  `.agents/workflows/*.md` are Antigravity slash commands; `.gemini/commands/mcwrench/*.toml` are
  Gemini CLI slash commands. These are thin wrappers that point back to `skills/<name>/SKILL.md`
  — keep them in sync but never copy SKILL.md content into them.
