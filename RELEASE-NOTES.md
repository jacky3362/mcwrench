# mcwrench v1.0.0 — release notes

**mcwrench** turns Claude (or Codex / Antigravity / Gemini) into an expert Minecraft **server
administrator** — for any server type and any plugin, on Paper, Purpur, Folia, Vanilla, Velocity,
and Pterodactyl/Pelican. It audits configs, diagnoses lag, tunes performance, sets up proxies and
permissions, picks gamemode plugin stacks, bootstraps new servers, and **learns any plugin's docs
on demand**.

## Highlights

- **10 skills**, including the always-on `minecraft-server-router` and specialists for auditing,
  performance, permissions, proxies, gamemode stacks (11 archetypes), new-server bootstrap,
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
