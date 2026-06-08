# mcwrench — usage guide

How mcwrench works, and how to use every command with examples.

mcwrench is a set of **skills** (playbooks) that make your AI assistant act as an expert Minecraft
**server administrator** — config audits, lag fixes, proxies, permissions, plugin stacks, new-server
setup, panel ops, Skript, and on-demand plugin-docs learning. It is **read-and-advise first**: it
quotes real config keys (fetching the plugin's docs when unsure), prioritises findings, and asks
before anything destructive.

---

## How it works

- **A router + specialists.** The always-on `minecraft-server-router` skill engages on any
  server-admin topic and hands off to the right specialist (audit, performance, permissions, …).
  You don't have to name the specialist — describe the problem and the right one triggers.
- **It never invents config keys or versions.** If it isn't confident about a specific plugin, it
  runs `learn-plugin-docs` to fetch and condense that plugin's real docs, then answers from them.
- **Findings are prioritised:** critical (crash / data loss) → high (lag / security) → medium
  (quality) → low (style).
- **Destructive/irreversible actions are confirmed first** (deleting worlds, exposing RCON, flipping
  `online-mode` behind a proxy).
- **Current facts baked in (2026):** Minecraft is `26.1.x` (the `1.` prefix is gone), **Paper 26.1+
  requires Java 25**, Velocity is `3.5.0-SNAPSHOT`, Paper downloads come from the **Fill v3** API.

### Two ways to invoke, per platform

| Platform | Slash commands | Natural language |
|---|---|---|
| **Claude Code** | `/mcwrench:<cmd>` | ✅ just describe the task |
| **Gemini CLI** | `/mcwrench:<cmd>` | ✅ |
| **Google Antigravity** | `/<workflow>` (e.g. `/audit`) | ✅ |
| **Claude.ai** | ❌ (no custom slash commands) | ✅ describe the task |
| **OpenAI Codex** | `$skill-name` (e.g. `$audit-config`) | ✅ |

On the platforms without slash commands, **just say what you want** — the skills are written to
trigger from plain phrasing like *"audit my paper config"* or *"my SMP is laggy"*.

The node helper scripts referenced below run on **stock Node ≥18** (no `npm install` for the
common paths). In Claude Code/Antigravity, `${CLAUDE_PLUGIN_ROOT}` resolves to the plugin root; from
a clone, paths are relative to the repo root.

---

## Commands

Each command maps to a skill. The slash form is shown for Claude Code (`/mcwrench:*`); the same
intent works as plain language everywhere.

### `/mcwrench:audit` — audit a server config
Lints a server's config tree for footguns, performance, and security; reports critical→low.

- **Slash:** `/mcwrench:audit ./myserver`
- **Natural:** *"audit my paper server config"* · *"is this server.properties safe?"*
- **Seed it with the scanner (optional):**
  ```bash
  node skills/audit-config/scripts/scan-server-tree.mjs ./myserver
  ```
- **You get:** a prioritised list, e.g.
  > CRITICAL — `spigot.yml: bungeecord:true` **and** `paper-global.yml: proxies.velocity.enabled:true` → won't start; pick one.
  > HIGH — RCON enabled on a public port with a weak password → firewall it / strong password.

### `/mcwrench:learn` — learn any plugin's docs
Fetches and condenses a plugin's real documentation into `skills/_cache/<slug>/REFERENCE.md`, then
summarises its config keys, permissions, and commands.

- **Slash:** `/mcwrench:learn LuckPerms` · `/mcwrench:learn https://modrinth.com/plugin/dynmap`
- **Natural:** *"how do I configure MythicMobs spawners?"* (it learns MythicMobs first)
- **Script:**
  ```bash
  node skills/learn-plugin-docs/scripts/learn-docs.mjs "EssentialsX"
  node skills/learn-plugin-docs/scripts/learn-docs.mjs "Multiverse/Multiverse-Core"   # owner/repo
  ```
- **You get:** the cache path + a structured summary (Overview, Config keys, Permissions, Commands).

### `/mcwrench:perf` — fix lag / TPS / OOM
Diagnoses lag with Spark first, then tunes heap/JVM flags and config.

- **Slash:** `/mcwrench:perf TPS drops to 12 in the evenings`
- **Natural:** *"my SMP is laggy, low TPS"* · *"server keeps running out of memory"*
- **You get:** a measured plan — e.g. lower `simulation-distance`, cap entity counts, fix a hopper
  chain — tied to what `/spark profiler` shows, plus correct JVM flags for Java 25.

### `/mcwrench:perms` — LuckPerms permissions
Groups, tracks, contexts, prefixes, and exact `/lp` commands.

- **Slash:** `/mcwrench:perms give the VIP rank flight in the creative world only`
- **Natural:** *"set up a staff rank ladder helper → mod → admin"*
- **You get:** the ordered `/lp …` commands, e.g.
  ```
  /lp creategroup vip
  /lp group vip permission set essentials.fly true world=creative_world
  /lp user Steve parent add vip
  ```

### `/mcwrench:proxy` — Velocity/Bungee network
Sets up or troubleshoots modern forwarding and the `forwarding.secret` handshake.

- **Slash:** `/mcwrench:proxy players get "Unable to connect you... invalid forwarding"`
- **Natural:** *"set up Velocity modern forwarding"* · *"skins broken behind my proxy"*
- **You get:** the 5-point forwarding contract checked end-to-end with the exact `velocity.toml` /
  `paper-global.yml` / `server.properties` changes.

### `/mcwrench:bootstrap` — start a new server
Greenfield Paper (optionally + Velocity): download, Java 25, EULA, startup flags, starter config.

- **Slash:** `/mcwrench:bootstrap a survival SMP on Pterodactyl`
- **Natural:** *"set up a new Paper server from scratch"* · *"what Java do I need for Paper now?"*
- **Download the latest Paper (Fill v3):**
  ```bash
  node skills/new-server-bootstrap/scripts/fetch-paper.mjs 26.1.2            # prints build + URL
  node skills/new-server-bootstrap/scripts/fetch-paper.mjs 26.1.2 --download # fetch the jar
  ```
- **You get:** the download, a Java-25 + Aikar's-flags `start.sh`, sane `server.properties`, and (for
  a network) Velocity wiring — then a hand-off to `gamemode-stacks` for the plugins.

### `/mcwrench:panel` — Pterodactyl / Pelican ops
Panel-specific: RCON, the memory/OOM footgun, backups, the client API.

- **Slash:** `/mcwrench:panel set up RCON` · `/mcwrench:panel container keeps OOMing on boot`
- **Natural:** *"how do I add RCON on Pterodactyl?"* · *"Cannot allocate memory on start"*
- **You get:** exact panel steps (which tab/field) — e.g. add a **secondary allocation** for RCON,
  or set `Xmx` below the container limit and drop `-XX:+AlwaysPreTouch`.

### `/mcwrench:gamemode` — pick a plugin stack
Canonical plugin stacks + config touchpoints + pitfalls for 25 archetypes.

- **Slash:** `/mcwrench:gamemode skyblock` · `/mcwrench:gamemode prison`
- **Natural:** *"what plugins do I need for a factions server?"*
- **You get:** the core + supporting plugins for that archetype, what to configure, and the common
  footguns (e.g. *one* claims plugin, *one* skyblock engine), then a hand-off to `learn-plugin-docs`
  for exact keys.

### `/mcwrench:conflicts` — check plugin conflicts
Flags clashing plugins, missing dependencies, and proxy or Folia mismatches in a plugin set.

- **Slash:** `/mcwrench:conflicts ./myserver` · `/mcwrench:conflicts --list "BentoBox,SuperiorSkyblock2,Vault"`
- **Natural:** *"do any of my plugins conflict?"*
- **You get:** a prioritised list (two skyblock engines, two claim systems, ItemsAdder + Oraxen,
  Vault without an economy, LibsDisguises without ProtocolLib, Folia-unsupported plugins). Reads
  `<root>/plugins/`, a `--list`, or `--profile`. Conservative by design, so verify a hit with
  `learn-plugin-docs` before removing anything.

### `/mcwrench:brand` — build a brand kit
Turns a server **name + vibe** into a cohesive brand kit, emitting each piece in the format the
target plugin actually parses (MiniMessage vs legacy `&#RRGGBB`).

- **Slash:** `/mcwrench:brand a cozy skyblock called Willow Hollow`
- **Natural:** *"help me name my hardcore anarchy server and write a MOTD"*
- **You get:** identity (names, tagline, palette + gradient), a 2-line MOTD in both MiniMessage and
  legacy hex, a themed rank ladder (handed to `permissions-helper` for LuckPerms), and optional
  store/Discord/in-game copy. Expand a gradient to legacy hex with
  `node skills/server-branding/scripts/format.mjs --to-legacy "<gradient:#a:#b>text</gradient>"`.

### `/mcwrench:profile` — remember the server
Writes a small **server profile** (`skills/_cache/server-profile.json`) so later answers stop
re-asking the version, host, and stack.

- **Slash:** `/mcwrench:profile ./myserver` · `/mcwrench:profile set java 25` · `/mcwrench:profile clear`
- **Natural:** *"scan my server and remember the setup"*
- **You get:** auto-detected software, MC version, gamemode, proxy, online-mode, plugins, worlds, and
  chat formatter — read first by every skill. Set `java`/`host`/`ramMB` manually; confirm the
  auto-detected MC version and formatter before relying on them.

### `/mcwrench:skript` — write/debug Skript
Event→effect modelling, reload-safety, and live syntax from Skript Hub.

- **Slash:** `/mcwrench:skript a /kit command that gives a starter kit once per day`
- **Natural:** *"my .sk script throws a parse error on reload"*
- **Fetch exact addon syntax:**
  ```bash
  node skills/skript-author/scripts/fetch-skripthub.mjs --addon SkBee
  node skills/skript-author/scripts/fetch-skripthub.mjs --search "give"
  ```
- **You get:** the `.sk` written against the installed addon's real syntax, plus the
  `/sk reload` + back-up-`variables.csv` safety steps.

### `minecraft-server-router` — always on (no command)
The hub. It engages automatically on any Minecraft server-admin topic and routes to the right
command/skill above. You never call it directly — it's why plain phrasing "just works".

---

## The docs-learner in depth (`learn-plugin-docs`)

It routes each plugin to the **cheapest authoritative source** and caches the result:

| Source | What |
|---|---|
| Modrinth / Hangar | Official REST APIs (markdown body) |
| GitHub README | `raw.githubusercontent.com/<owner>/<repo>/HEAD/README.md` |
| Oraxen | content negotiation (`.md` / `?format=md`) + `/api/docs/_all` |
| SpigotMC | XenforoResourceManagerAPI (BBCode → Markdown, lossy) |
| Skript Hub | `/api/v1/addonsyntaxlist/` |
| PaperMC | tree-searches `github.com/PaperMC/docs` |
| GitBook / unknown | `.md` → `llms-full.txt` → Readability fallback (optional deps) |

Output lands in `skills/_cache/<slug>/REFERENCE.md` (condensed, with `source_url` + `fetched_at`)
and `RAW.md` (full). The cache is git-ignored. Re-running within the TTL reuses the cache.

**Library + durability.** **64 popular plugins ship pre-fetched** in the committed
`skills/learn-plugin-docs/library/` (with a name/alias `registry.json`), so common lookups need
**zero network**. Resolution order: **library → `_cache/` → registry URL → Modrinth/Hangar search**.

- `--pin` — re-fetch from the canonical source and store **permanently** into the library (survives
  the cache TTL). For a registry name it fetches the registry's URL, avoiding by-name mis-resolution.
- `--refresh` — bypass library + cache and re-fetch.
- `MCWRENCH_CACHE_TTL=<days>` — change the cache TTL (default 7).
- **stale-while-revalidate** — if a refetch fails (host/network down) but a cache exists, the cached
  copy is served instead of erroring. A `meta.json` sidecar stores HTTP validators for conditional
  revalidation (304 → reuse). `scripts/refresh-library.mjs` (+ the `refresh-docs` CI) re-pins the
  whole library and opens a PR with the diffs.

---

## Script reference

| Script | Does |
|---|---|
| `skills/learn-plugin-docs/scripts/learn-docs.mjs "<name-or-url>"` | Fetch + condense plugin docs. |
| `skills/new-server-bootstrap/scripts/fetch-paper.mjs <mcver> [--download]` | Resolve latest Paper via Fill v3. |
| `skills/skript-author/scripts/fetch-skripthub.mjs --addon <X> \| --search <t>` | Pull Skript syntax. |
| `skills/audit-config/scripts/scan-server-tree.mjs <root> [--json\|--write-profile]` | Manifest a tree; `--write-profile` saves the server profile. |
| `skills/audit-config/scripts/server-profile.mjs [get\|set\|clear …]` | Show / edit the server profile. |
| `skills/audit-config/scripts/check-conflicts.mjs <root>\|--list "A,B"\|--profile` | Flag plugin conflicts + missing deps. |
| `skills/audit-config/scripts/diff-against-defaults.mjs <cfg> <defaults>` | Show overridden keys. |
| `skills/server-branding/scripts/format.mjs --to-legacy\|--to-mm\|--preview "<text>"` | Convert MiniMessage ↔ legacy color. |
| `scripts/refresh-library.mjs [plugin]` | Re-pin the committed plugin library from canonical sources. |
| `scripts/validate.mjs [--strict]` | Validate the repo structure + portability. |
| `scripts/pack-skill.mjs <name> \| --all` | Zip a skill folder for Claude.ai. |
| `scripts/setup-symlinks.mjs` | Recreate `.agents/skills` locally on Windows. |

---

## Tips

- **Tell it your version + software.** "Paper 26.1.2 on Pterodactyl, 8 GB" gets sharper answers than
  "my server".
- **Share a Spark report URL** for lag questions — it's the evidence the perf advice is built on.
- **For an unfamiliar plugin, ask anyway** — it learns the docs before answering, so it won't guess.
- **It will refuse to recommend** mixing G1 + ZGC flags, two claims plugins, or two skyblock engines —
  those are known footguns, not preferences.
