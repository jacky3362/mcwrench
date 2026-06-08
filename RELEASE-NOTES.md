# mcwrench v1.1.0 — release notes

**mcwrench** turns Claude (or Codex / Antigravity / Gemini) into an expert Minecraft **server
administrator** — for any server type and any plugin, on Paper, Purpur, Folia, Vanilla, Velocity,
and Pterodactyl/Pelican. It audits configs, diagnoses lag, tunes performance, sets up proxies and
permissions, picks gamemode plugin stacks, bootstraps new servers, and **learns any plugin's docs
on demand**.

## New in 1.1.0 — durable docs, branding, double the gamemodes

- **64 popular plugins pre-loaded** into a committed library (zero-network lookups, by name or
  alias) + a name→docs registry; `--pin` stores any project's docs permanently, `--refresh`
  re-fetches.
- **Cache durability**: configurable TTL (`MCWRENCH_CACHE_TTL`), stale-while-revalidate, conditional
  revalidation, and a `refresh-docs` CI that re-pins the library via PR.
- **New `server-branding` skill (11th)** — builds a brand kit (identity, MOTD, ranks, store/Discord
  copy) in the right format per plugin (MiniMessage vs legacy hex), with tone presets and a
  MiniMessage↔legacy helper.
- **Server-profile memory** + **plugin conflict checker** — every answer tailors to your server, and
  conflicting plugins / missing deps get flagged (new `/mcwrench:conflicts` command, **12 commands** total).
- **25 gamemode stacks** (up from 11): OneBlock, GenPvP, BoxPvP, SkyPvP, Pit, OP variants, HCF,
  practice, BedWars, SkyWars, Survival Games, Earth SMP, plus the original 11.

## Highlights

- **11 skills**, including the always-on `minecraft-server-router` and specialists for auditing,
  performance, permissions, proxies, gamemode stacks (25 archetypes), branding, new-server bootstrap,
  Pterodactyl/Pelican ops, and Skript.
- **Docs-learner** that routes to the cheapest channel per host (Modrinth, Hangar, GitHub, Oraxen,
  SpigotMC, Skript Hub, PaperMC) and caches a condensed reference — every adapter live-tested.
- **Five runtimes, one source of truth**: Claude Code (plugin + `/mcwrench:*`), Claude.ai (zip
  upload), OpenAI Codex (`.agents/skills` + `AGENTS.md`), Google Antigravity (native `.agents/`
  skills + workflows), and Gemini CLI (`GEMINI.md` + TOML commands). No SKILL.md is duplicated.

## Current as of 2026-06-07

- Minecraft **26.1.x** (the `1.` prefix is gone); **Paper requires Java 25**.
- Paper downloads use the **Fill v3 API** (`fill.papermc.io`) — the old v2 API stopped builds
  2025-12-31; the bootstrap fetcher reads the embedded download URL.
- Aikar's flags remain PaperMC's documented G1GC default; the "ZGC on Java 25" caveat is
  community/hosting guidance — mcwrench never mixes flag sets.
- Pelican Panel is Pterodactyl-compatible but still **beta** (AGPLv3).

## Install

See the [README](README.md) for install steps on each of the five runtimes. In Claude Code:

```
/plugin marketplace add Teddy563/mcwrench
/plugin install mcwrench@mcwrench
```

## Known limitations

- GitBook `.md` export and the generic Readability fallback are best-effort (host-dependent /
  optional deps). Modrinth/Hangar/GitHub cover the large majority of plugins.
- Slash commands are Claude Code / Gemini CLI / Antigravity only; Claude.ai relies on
  auto-trigger from the (pushy) skill descriptions.
- Folia plugin support is still thin in 2026 — mcwrench defaults to recommending Paper.

Full detail in [CHANGELOG.md](CHANGELOG.md).
