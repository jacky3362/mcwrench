# Changelog

All notable changes to **mcwrench** are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] — 2026-06-09

Theme: **invent, build, and keep it running.** A creative foundry turns an idea into a fun, buildable
server; whole gamemode stacks pre-load in one command; the docs engine reaches further; and a
read-only doctor diagnoses crashes, grades a server, and plans upgrades. Everything is local: no
live-server connectors (RCON, panel writes, console commands) — those stay a later operator mode.

### Added
- **`gamemode-designer` skill + `/mcwrench:create`** — the foundry. One command, three internal
  phases: **imagine** (generate + score original gamemode concepts by combining archetype mechanics
  with one twist and a theme), **design** (lock the loop, twist, plugin stack, and the Skript/config
  glue, with a feasibility verdict), and **create** (assemble a local build plan: stack →
  `gamemode-stacks` + `learn --stack`, setup → `new-server-bootstrap`, ranks → `permissions-helper`,
  MOTD → `server-branding`, then an `audit-config` pass). Plans only; writes nothing to a live server.
- **`server-doctor` skill + three read-only commands:**
  - **`/mcwrench:diagnose`** — paste a crash report / `latest.log` (or point at a server folder) and
    get a ranked root cause. `parse-log.mjs` names the **likely culprit plugin namespace** and matches
    signatures: `UnsupportedClassVersionError` (Java too old — class file version 69 = Java 25),
    `OutOfMemoryError`, Watchdog/single-tick overload, ticking entity/world crashes, port-bind, EULA,
    plugin load failures, `NoClassDefFoundError`/`NoSuchMethodError`. Each finding has a fix recipe.
  - **`/mcwrench:health`** — a graded scorecard composing `scan-server-tree` + `check-conflicts` +
    `check-plugin-versions` + `parse-log` (security, performance, durability, currency).
  - **`/mcwrench:upgrade`** — a 26.1 / Java-25 migration runbook (each plugin labelled has-a-build /
    none / unknown via `check-plugin-versions.mjs`; ordered back-up → bump-Java → update → test-on-a-
    copy → upgrade-world plan).
- **`learn --stack <gamemode>`** — `scripts/learn-stack.mjs` pins every plugin's docs in a gamemode's
  canonical stack in one go, from `library/stacks.json` (25 archetypes → registry plugins). Surfaced
  as **`/mcwrench:stack`**.
- **`/mcwrench:format`** — surfaces `server-branding/scripts/format.mjs` (MiniMessage to/from legacy
  `&#RRGGBB`) as its own command, for a single MOTD line, prefix, or hologram.
- **`/mcwrench:help`** — a capability map (the router, all skills, every command) with a link to
  mcwrench.teddy.bar and a soft, optional GitHub-star note.
- **github-wiki adapter** — resolves GitHub `/wiki` pages (`raw.githubusercontent.com/wiki/...`).
- **Ecosystem coverage:** registry entries for CraftEngine, Nexo, the NightExpress "Excellent" suite
  (Economy/Shop/Crates), AdvancedTeleport, and PvPManager; CraftEngine added to the custom-item
  conflict group.
- **plugin.json keywords** — `server-branding`, `motd`, `minimessage`, `gamemode-designer`,
  `server-profile`, `conflict-checker`, `plugin-docs`.
- **Counts:** **13 skills** and **19 commands** across all surfaces (Claude Code, Gemini CLI,
  Antigravity workflows).

### Notes
- Local-only by design. RCON execution, Pterodactyl/Pelican client-API writes, and live console
  testing are deferred to a future operator mode (v2). The crash/log parser is the engine that mode
  would later wrap.

[1.2.0]: https://github.com/Teddy563/mcwrench/releases/tag/v1.2.0

## [1.1.0] — 2026-06-08

Theme: **durable docs, branding, and double the gamemodes.** Popular plugins load instantly with
zero network, an 11th skill builds brand kits, and gamemode coverage more than doubles.

### Added
- **Committed plugin library** (`skills/learn-plugin-docs/library/`): **64 popular plugins
  pre-fetched** into condensed references (real sources, `source_url` + `fetched_at`) so common
  lookups need **zero network**. `registry.json` maps names + aliases (`lp`, `papi`, `ia`, `fawe`,
  `motd`, `buycraft`, …) to the canonical docs URL + library file (83 names: 64 pre-fetched +
  19 url-only for paid / no-public-docs plugins).
- **Library-first resolution** in `learn-docs.mjs`: library → `_cache/` → registry URL →
  Modrinth/Hangar search.
- **`--pin`** (permanently store docs into the library, surviving the cache TTL; for a registry name
  it fetches the canonical URL, fixing by-name mis-resolution) and **`--refresh`** flags.
- **Cache durability:** configurable TTL (`MCWRENCH_CACHE_TTL` days, default 7); **stale-while-
  revalidate** (serve the cache if a refetch fails); a `meta.json` sidecar with HTTP validators for
  conditional revalidation (304 → reuse); `scripts/refresh-library.mjs` + a `refresh-docs` CI that
  re-pins the library and opens a PR with the diffs.
- **`server-branding` skill (11th skill)** — builds a brand kit (identity, MOTD, rank ladder,
  store/Discord copy, in-game text) from a name + vibe, emitting each piece in the **format the
  target plugin actually parses** (MiniMessage vs legacy `&#RRGGBB`) via a verified format-target
  matrix + MiniMessage cheatsheet + six tone presets. `scripts/format.mjs` converts MiniMessage
  gradients ↔ legacy hex. Commands `/mcwrench:brand` across all surfaces.
- **Server-profile memory** — `scan-server-tree.mjs --write-profile` writes
  `skills/_cache/server-profile.json` (software, MC version, host, RAM, gamemode, proxy, online-mode,
  plugins, worlds, chat formatter); `server-profile.mjs` shows/sets/clears it; the router reads it
  first so answers stop re-asking known facts. Command `/mcwrench:profile`.
- **Plugin conflict checker** — `check-conflicts.mjs` + `conflict-rules.json` flag mutually
  exclusive plugins (two skyblock engines, two claim systems, ItemsAdder + Oraxen), missing deps
  (Vault without an economy, LibsDisguises without ProtocolLib), and proxy/Folia mismatches.
  Surfaced as its own command `/mcwrench:conflicts` (and inside `/mcwrench:audit`).
- **14 new gamemode references** → **25 archetypes**: OneBlock, GenPvP, BoxPvP, SkyPvP, The Pit,
  OP Prison, OP Skyblock, OP Factions, HCF, Practice PvP, BedWars, SkyWars, Survival Games, Earth SMP.

### Fixed
- By-name mis-resolution for paid / non-Modrinth plugins (resolved via the registry); corrected
  PlotSquared, CombatLogX, HuskSync, Triton, LibsDisguises.
- Stale "stub / v0.1" wording in `learn-docs.mjs`, `source-routing.md`, and `gitbook.mjs`.

[1.1.0]: https://github.com/Teddy563/mcwrench/releases/tag/v1.1.0

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

[1.0.0]: https://github.com/Teddy563/mcwrench/releases/tag/v1.0.0
