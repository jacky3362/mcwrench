<div align="center">

<img src="assets/banner.jpg" alt="mcwrench — configure and tune any Minecraft server" width="100%">

Audit configs, kill lag, wire proxies and permissions, pick plugin stacks, bootstrap servers, and
learn **any** plugin's docs on demand — for **any** server type and **any** plugin.

[![validate](https://github.com/Teddy563/mcwrench/actions/workflows/validate.yml/badge.svg)](https://github.com/Teddy563/mcwrench/actions/workflows/validate.yml)
&nbsp;![version](https://img.shields.io/badge/version-1.1.0-blue)
&nbsp;![license](https://img.shields.io/badge/license-MIT-green)
&nbsp;![Minecraft](https://img.shields.io/badge/Minecraft-26.1.x-brightgreen)
&nbsp;![Java](https://img.shields.io/badge/Java-25-orange)

**Claude Code · Claude.ai · OpenAI Codex · Google Antigravity · Gemini CLI**

</div>

mcwrench turns your AI assistant into an expert Minecraft **server administrator** — for *any*
server type (SMP, skyblock, prison, factions, towny, minigames, RPG/MMO, anarchy, creative,
KitPvP, lifesteal) and *any* plugin. It audits config files, diagnoses lag, tunes performance,
sets up proxies and permissions, recommends gamemode plugin stacks, bootstraps new servers, and
**learns any plugin's docs on demand**.

> Not a mod/plugin *development* tool — mcwrench is for **running and configuring** a server.

Verified for **2026**: Minecraft `26.1.x` (the `1.` prefix is gone), **Paper requires Java 25**,
Velocity `3.5.0-SNAPSHOT`. Knowledge files are dated and cite sources.

**📖 New here?** The **[usage guide](docs/USAGE.md)** explains how it works and every command with examples.

---

## What's inside

| Skill | Triggers on | Does |
|---|---|---|
| `minecraft-server-router` | any server-admin topic | Always-on hub; routes to a specialist below. |
| `audit-config` | "audit my config", a shared `paper-global.yml`/`server.properties`/… | Lints the config tree for footguns, performance, security. |
| `performance-tuning` | "my server is laggy", low TPS, OOM, "Aikar's flags" | Spark profiling, JVM/heap, view/sim distance, entity & chunk tuning. |
| `permissions-helper` | LuckPerms, ranks, contexts, prefixes | Groups, tracks, contexts, meta, node conventions. |
| `proxy-network` | Velocity, BungeeCord, "modern forwarding", broken UUIDs behind a proxy | The forwarding contract, `velocity.toml`, troubleshooting. |
| `gamemode-stacks` | "what plugins for a [skyblock/prison/SMP…] server" | Canonical stacks + touchpoints + pitfalls for 25 archetypes. |
| `server-branding` | "brand my server", server name, MOTD, ranks, store/Discord copy, tone | Brand kit in the right format per plugin; tone presets; MiniMessage↔legacy helper. |
| `new-server-bootstrap` | "set up a new server", "download Paper", "what Java" | Fill v3 Paper download, Java 25, EULA, Aikar startup, starter configs. |
| `pterodactyl-ops` | Pterodactyl, Pelican, "the panel", RCON on a panel, container OOM | RCON allocation, the Xmx/OOM footgun, backups, the client API. |
| `skript-author` | Skript, `.sk`, "my script doesn't work", `/sk reload` | Event→effect model, reload-safety, live Skript Hub syntax. |
| `learn-plugin-docs` | "how do I configure X", any unfamiliar plugin | Fetches + condenses real docs; **64 popular plugins pre-loaded** in `library/`; `--pin` keeps any permanently. |

The **docs-learner** routes to the cheapest channel per host — Modrinth & Hangar REST APIs, the
GitBook `.md` trick + `llms.txt`, raw GitHub READMEs — and caches results under `skills/_cache/`
(configurable TTL, stale-while-revalidate). **64 popular plugins ship pre-fetched** in the committed
`library/` for zero-network lookups. A **server profile** (`scan-server-tree.mjs --write-profile`)
lets every skill tailor answers without re-asking version/host/stack.

---

## Install

> Skills are filesystem-based and **do not sync** across Claude Code, Claude.ai, Codex,
> Antigravity, and Gemini CLI. Install in each surface you use.

### 1. Claude Code (plugin + marketplace)

From inside a `claude` session:

```
/plugin marketplace add Teddy563/mcwrench
/plugin install mcwrench@mcwrench
```

Or from the shell:

```bash
claude plugin marketplace add Teddy563/mcwrench
claude plugin install mcwrench@mcwrench
```

Skills then auto-trigger, and you get slash aliases: `/mcwrench:audit`, `/mcwrench:learn`,
`/mcwrench:perf`, `/mcwrench:perms`, `/mcwrench:proxy`, `/mcwrench:bootstrap`, `/mcwrench:panel`,
`/mcwrench:gamemode`, `/mcwrench:conflicts`, `/mcwrench:brand`, `/mcwrench:profile`, `/mcwrench:skript`.

**Local dev (no install):**

```bash
git clone https://github.com/Teddy563/mcwrench && cd mcwrench
claude --plugin-dir ./
```

### 2. Claude.ai (web / desktop)

Claude.ai has no custom slash commands — skills **auto-trigger** from their descriptions. Upload
the skill(s) you want:

```bash
node scripts/pack-skill.mjs --all      # writes dist/<skill>.skill.zip (skill folder = zip root)
```

Then in Claude.ai: **Customize → Skills → Create skill → Upload** the zip. Requires **code
execution enabled** (Pro/Max/Team/Enterprise). To invoke, just describe the task — e.g.
*"audit my paper server config"* or *"my SMP is laggy, low TPS"*.

### 3. OpenAI Codex

```bash
git clone https://github.com/Teddy563/mcwrench && cd mcwrench
# Linux/macOS: the .agents/skills symlink already resolves after clone.
# Windows: node scripts/setup-symlinks.mjs   # if it doesn't resolve locally
```

Codex discovers skills from **`.agents/skills/`** (a symlink to `skills/`) and reads project
guidance from **`AGENTS.md`**. Invoke a skill with `$skill-name` (e.g. `$audit-config`) or let
Codex auto-select by description.

### 4. Google Antigravity

Antigravity uses the same **Agent Skills** standard and its native skills path **is**
`.agents/skills/` — so opening this repo as a workspace already loads the skills (on Linux/macOS
the symlink resolves; on Windows run `node scripts/setup-symlinks.mjs` first). Antigravity also
reads the root **`AGENTS.md`** (and `.agents/rules/mcwrench.md`) for rules, and exposes the
**workflows** in `.agents/workflows/` as slash commands: `/audit`, `/learn`, `/perf`, `/perms`,
`/proxy`, `/bootstrap`, `/panel`, `/gamemode`, `/conflicts`, `/brand`, `/profile`, `/skript`. Just describe the task to auto-trigger a skill.

### 5. Gemini CLI

Gemini CLI loads memory from **`GEMINI.md`** automatically; `.gemini/settings.json` also aliases
`AGENTS.md`/`CLAUDE.md` into context (`context.fileName`). Gemini has no built-in skills loader, so
`GEMINI.md` points it at the `skills/<name>/SKILL.md` playbooks. Slash commands live in
`.gemini/commands/mcwrench/`: `/mcwrench:audit`, `/mcwrench:learn`, `/mcwrench:perf`,
`/mcwrench:perms`, `/mcwrench:proxy`, `/mcwrench:bootstrap`, `/mcwrench:panel`, `/mcwrench:gamemode`,
`/mcwrench:conflicts`, `/mcwrench:brand`, `/mcwrench:profile`, `/mcwrench:skript`. From the repo root:

```bash
gemini        # GEMINI.md + AGENTS.md load as context; then ask "audit my paper config"
```

---

## Trigger phrases (for Claude.ai / Codex auto-invoke)

Say things like: *"my server is laggy / low TPS"*, *"audit my paper config"*, *"out of memory on
my Paper server"*, *"set up Velocity modern forwarding"*, *"give VIP rank fly in the creative
world"*, *"how do I configure MythicMobs spawners"*, *"find me an anti-cheat plugin"*. mcwrench's
descriptions are deliberately pushy so the right skill engages.

---

## Project layout

```
.claude-plugin/          plugin.json + marketplace.json (Claude Code)
skills/                  canonical SKILL.md folders (THE source of truth)
.agents/skills           symlink -> ../skills (Codex + Antigravity)
.agents/workflows/       Antigravity slash-command workflows
.agents/rules/           Antigravity always-on rule
commands/                thin /mcwrench:* slash aliases (Claude Code)
agents/                  optional subagents (config-auditor, docs-learner)
.gemini/settings.json    Gemini CLI context alias (reads AGENTS.md/CLAUDE.md)
.gemini/commands/        Gemini CLI slash commands (TOML)
CLAUDE.md / AGENTS.md / GEMINI.md   matching guidance per tool
scripts/                 validate.mjs, setup-symlinks.mjs, pack-skill.mjs
docs/                    USAGE.md (guide) + CONTRIBUTING.md
.github/workflows/        validate.yml + release.yml (CI + tagged releases)
```

## Caveats

- **Slash commands** work in Claude Code, Gemini CLI, and Antigravity; on Claude.ai and Codex,
  rely on auto-trigger from the (pushy) skill descriptions.
- **Folia** support across plugins is still poor in 2026 — mcwrench defaults to recommending
  **Paper**, and checks `folia-supported: true` before suggesting plugins for Folia.
- **Aikar's flags** are G1GC and remain PaperMC's documented default; the "use ZGC on Java 25"
  guidance is community/hosting, not PaperMC. mcwrench never mixes G1 and ZGC flag sets.
- The docs-learner sends WebFetch/HTTP to third-party hosts; on locked-down enterprise installs
  it falls back to asking you to paste docs or upload the plugin `.jar`.

## Releases

Versioned with [SemVer](https://semver.org); see [CHANGELOG.md](CHANGELOG.md) and
[RELEASE-NOTES.md](RELEASE-NOTES.md). Releasing is automated: pushing a `vX.Y.Z` tag runs
`.github/workflows/release.yml`, which validates, builds a clean source archive, and creates the
GitHub Release (with the matching CHANGELOG section as the notes).

## License

[MIT](LICENSE). New here? Read the **[usage guide](docs/USAGE.md)**. Want to contribute? See
[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).
