# mcwrench 🔧

**A general-purpose, gamemode-agnostic Minecraft server config & operations assistant** for
Claude Code, Claude.ai, OpenAI Codex, Google Antigravity, and Gemini CLI.

mcwrench turns Claude (or Codex) into an expert Minecraft **server administrator** — for *any*
server type (SMP, skyblock, prison, factions, towny, minigames, RPG/MMO, anarchy, creative,
KitPvP, lifesteal) and *any* plugin. It audits your config files, diagnoses lag, tunes
performance, sets up proxies and permissions, and **learns any plugin's docs on demand**.

> Not a mod/plugin *development* tool — mcwrench is for **running and configuring** a server.

Verified for **2026**: Minecraft `26.1.x` (the `1.` prefix is gone), **Paper requires Java 25**,
Velocity `3.5.0-SNAPSHOT`. Knowledge files are dated and cite sources.

---

## What's inside

| Skill | Triggers on | Does |
|---|---|---|
| `minecraft-server-router` | any server-admin topic | Always-on hub; routes to a specialist below. |
| `audit-config` | "audit my config", a shared `paper-global.yml`/`server.properties`/… | Lints the config tree for footguns, performance, security. |
| `performance-tuning` | "my server is laggy", low TPS, OOM, "Aikar's flags" | Spark profiling, JVM/heap, view/sim distance, entity & chunk tuning. |
| `permissions-helper` | LuckPerms, ranks, contexts, prefixes | Groups, tracks, contexts, meta, node conventions. |
| `proxy-network` | Velocity, BungeeCord, "modern forwarding", broken UUIDs behind a proxy | The forwarding contract, `velocity.toml`, troubleshooting. |
| `gamemode-stacks` | "what plugins for a [skyblock/prison/SMP…] server" | Canonical stacks + touchpoints + pitfalls for 11 archetypes. |
| `new-server-bootstrap` | "set up a new server", "download Paper", "what Java" | Fill v3 Paper download, Java 25, EULA, Aikar startup, starter configs. |
| `pterodactyl-ops` | Pterodactyl, Pelican, "the panel", RCON on a panel, container OOM | RCON allocation, the Xmx/OOM footgun, backups, the client API. |
| `skript-author` | Skript, `.sk`, "my script doesn't work", `/sk reload` | Event→effect model, reload-safety, live Skript Hub syntax. |
| `learn-plugin-docs` | "how do I configure X", any unfamiliar plugin | Fetches + condenses the plugin's real docs into a local reference. |

The **docs-learner** routes to the cheapest channel per host — Modrinth & Hangar REST APIs, the
GitBook `.md` trick + `llms.txt`, raw GitHub READMEs — and caches results under `skills/_cache/`.

---

## Install

> Skills are filesystem-based and **do not sync** between Claude Code, Claude.ai, and Codex.
> Install in each surface you use.

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
`/mcwrench:gamemode`, `/mcwrench:skript`.

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
`/proxy`. Just describe the task to auto-trigger a skill.

### 5. Gemini CLI

Gemini CLI loads memory from **`GEMINI.md`** automatically; `.gemini/settings.json` also aliases
`AGENTS.md`/`CLAUDE.md` into context (`context.fileName`). Gemini has no built-in skills loader, so
`GEMINI.md` points it at the `skills/<name>/SKILL.md` playbooks. Slash commands live in
`.gemini/commands/mcwrench/`: `/mcwrench:audit`, `/mcwrench:learn`, `/mcwrench:perf`,
`/mcwrench:perms`, `/mcwrench:proxy`. From the repo root:

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

## Before you push (template checklist)

This repo ships with the placeholder **`Teddy563`**. Replace it everywhere before publishing:

```bash
# from the repo root, replace Teddy563 with your GitHub username
grep -rl 'Teddy563' . --exclude-dir=.git | xargs sed -i 's/Teddy563/<YOUR_GH>/g'
```

Files affected: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `README.md`,
`CHANGELOG.md`, `LICENSE`, `docs/CONTRIBUTING.md`, and the docs-learner `User-Agent`.

This repo is already `git init`'d with the `.agents/skills` symlink committed as a proper git
symlink object (so it materialises correctly on Linux/macOS clones). To start history fresh:
`rm -rf .git && git init`. Then add your remote and push.

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
docs/                    RESEARCH-NOTES, NAME, DECISIONS, CONTRIBUTING
.github/workflows/        validate.yml (CI)
```

## Caveats

- **Slash commands are Claude Code only.** On Claude.ai/Codex, rely on auto-trigger.
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

[MIT](LICENSE). See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) to contribute and
[docs/RESEARCH-NOTES.md](docs/RESEARCH-NOTES.md) for sourced, dated facts behind the knowledge base.
