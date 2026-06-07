# Changelog

All notable changes to **mcwrench** are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-06-07

First public release. A general-purpose, gamemode-agnostic Minecraft **server config &
operations** assistant, packaged for **Claude Code, Claude.ai, OpenAI Codex, Google Antigravity,
and Gemini CLI** from a single source of truth (`skills/`).

### Skills (10)
- `minecraft-server-router` — always-on, pushy auto-triggering hub that routes to a specialist.
- `audit-config` — config-tree linter (footguns / performance / security) with `scan-server-tree.mjs`
  and `diff-against-defaults.mjs` helpers.
- `performance-tuning` — lag/TPS/MSPT/OOM, Spark, Aikar's flags vs Java-25 ZGC, view/sim distance,
  entities, chunks.
- `permissions-helper` — LuckPerms groups, tracks, contexts, meta.
- `proxy-network` — Velocity/Bungee modern forwarding + the `forwarding.secret` handshake.
- `learn-plugin-docs` — fetch + condense ANY plugin's docs on demand.
- `gamemode-stacks` — canonical plugin stacks for **11 archetypes** (SMP, skyblock, prison,
  factions, towny, minigames/network, RPG/MMO, anarchy, creative, KitPvP, lifesteal).
- `new-server-bootstrap` — greenfield Paper/Velocity setup, with a **Fill v3** Paper downloader
  (`fetch-paper.mjs`) and `startup.sh` / `velocity.toml` / `paper-global.yml` templates.
- `pterodactyl-ops` — Pterodactyl **and Pelican** panel ops: RCON (secondary allocation), the
  AlwaysPreTouch/Xmx container-OOM footgun, non-atomic backups, the client API.
- `skript-author` — write/debug Skript, with a wired **Skript Hub** syntax fetcher (`fetch-skripthub.mjs`).

### Docs-learner engine (all adapters wired + live-tested)
- Modrinth, Hangar (slug-only API), GitHub README, Oraxen (content negotiation), SpigotMC
  (BBCode→Markdown), Skript Hub, PaperMC (tree-searches `PaperMC/docs`). GitBook (`.md`→`llms`)
  and a generic Readability fallback are best-effort. Wired adapters run on stock Node ≥18; the
  Readability path uses optional deps.

### Cross-tool packaging (one source of truth — no duplicated SKILL.md)
- **Claude Code**: `.claude-plugin/` plugin + marketplace; `commands/*.md` → `/mcwrench:*`.
- **Claude.ai**: `scripts/pack-skill.mjs` zips a skill folder for upload.
- **Codex + Antigravity**: `.agents/skills` symlink (git mode-120000); `AGENTS.md`;
  `.agents/workflows/*.md`; `.agents/rules/mcwrench.md`.
- **Gemini CLI**: `GEMINI.md`; `.gemini/settings.json` context alias; `.gemini/commands/mcwrench/*.toml`.

### Tooling & release
- `scripts/validate.mjs` (structural + portability + cross-tool checks), `setup-symlinks.mjs`,
  `pack-skill.mjs`; `agents/` subagents (config-auditor, docs-learner).
- CI `validate.yml`; `release.yml` cuts a GitHub Release (source archive, export-ignore aware) on
  a `v*` tag. Issue/PR templates.

### Notes
- Knowledge dated **2026-06-07**: Minecraft `26.1.x`, **Paper requires Java 25**, Velocity
  `3.5.0-SNAPSHOT`, Paper downloads via **Fill v3** (`fill.papermc.io`), Pelican still beta/AGPLv3.
  The Aikar's-flags Java-25 caveat is attributed to community/hosting (not PaperMC).
- Repo/author URLs use the placeholder `Teddy563` — replace before publishing
  (see `docs/PUBLISHING.md`, kept local-only).

[1.0.0]: https://github.com/Teddy563/mcwrench/releases/tag/v1.0.0
