# Research Notes — verification of research.md's volatile facts

All facts below were re-verified live on **2026-06-07** against the cited sources.
This file records what changed or was confirmed since `research.md` was written, so the
build uses current truth rather than stale assumptions.

---

## 1. Claude Code plugin + marketplace spec — CONFIRMED, with refinements

Source: <https://code.claude.com/docs/en/plugins-reference>,
<https://code.claude.com/docs/en/plugin-marketplaces>,
<https://code.claude.com/docs/en/plugins>,
<https://code.claude.com/docs/en/discover-plugins>,
<https://code.claude.com/docs/en/skills> (all fetched 2026-06-07).

- `.claude-plugin/plugin.json`: **only `name` is required.** `version`, `description`,
  `author`, `repository`, `license`, `keywords`, `homepage` are all optional.
  - `author` is an **object** `{name (required), email?, url?}` — NOT a string.
  - `repository` is a **string URL** — NOT an object.
  - `keywords` must be an **array** (a string value is a load error).
  - `$schema` works as an editor hint and is ignored at load time. Canonical value:
    `https://json.schemastore.org/claude-code-plugin-manifest.json`.
  - If `version` is omitted, the git commit SHA is used as the version.
- `.claude-plugin/marketplace.json`: required root fields are **`name`, `owner`, `plugins`**.
  - `owner` is an object, `name` required.
  - Each `plugins[]` entry requires **`name` + `source`** minimum. Relative-path `source`
    **must start with `./`** and resolves from the marketplace root; `../` is rejected.
  - `metadata.pluginRoot` is real (base dir prepended to relative sources).
  - `metadata.version` is accepted "for backward compatibility"; prefer top-level `version`.
  - **Do not set `version` in both** `plugin.json` and the marketplace entry — `plugin.json`
    wins silently. (We set it only in `plugin.json` + `marketplace.metadata`.)
- **Component dirs live at the plugin ROOT** (`skills/`, `commands/`, `agents/`, `hooks/`,
  `.mcp.json`). Only `plugin.json` goes inside `.claude-plugin/`. Official warning quotes
  this as the most common mistake.
- Install (end users):
  - In session: `/plugin marketplace add owner/repo` then
    `/plugin install <plugin>@<marketplace>`.
  - Shell: `claude plugin marketplace add owner/repo` and `claude plugin install name@marketplace`.
- Local dev/test: **`claude --plugin-dir ./` is current and correct** (repeatable; also accepts
  a `.zip` on v2.1.128+). `/reload-plugins` picks up edits. `/plugin marketplace add ./path`
  also works for a local marketplace.
- Validation: **`claude plugin validate <dir> --strict` exists.** `--strict` treats warnings
  as errors (use in CI). Validate the marketplace with `claude plugin validate .` and each
  plugin with `claude plugin validate ./<plugin> --strict`.
- Namespacing: plugin-bundled skills are **always** `/<plugin-name>:<skill-name>`. Commands
  merged into skills are namespaced the same way inside a plugin. Standalone `.claude/` skills
  stay bare. → Our plugin name `mcwrench` becomes the slash prefix: `/mcwrench:audit-config`.
- Both SchemaStore URLs resolve live:
  `https://www.schemastore.org/claude-code-plugin-manifest.json` (required: `name`) and
  `https://www.schemastore.org/claude-code-marketplace.json` (required: `name`,`owner`,`plugins`).
- Listing budget knobs still real: env `SLASH_COMMAND_TOOL_CHAR_BUDGET`, setting
  `skillListingBudgetFraction` (default `0.01`), per-entry cap `maxSkillDescriptionChars`
  (default 1536). `/doctor` shows overflow.

## 2. Portable SKILL.md + OpenAI Codex — CONFIRMED

Source: <https://agentskills.io/specification>,
<https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview>,
<https://code.claude.com/docs/en/skills>,
<https://support.claude.com/en/articles/12512198-how-to-create-custom-skills>,
<https://developers.openai.com/codex/skills>,
<https://developers.openai.com/codex/guides/agents-md> (fetched 2026-06-07).

- Required frontmatter: `name` (≤64 chars, regex `^[a-z0-9]+(-[a-z0-9]+)*$`, **must match the
  folder name**, may not contain reserved words `anthropic`/`claude`) and `description`
  (≤1024 chars, non-empty, **no XML tags**).
- Portable optional standard fields: `license`, `compatibility`, `metadata`, and
  (experimental) `allowed-tools`. **Everything else** (`context`, `agent`, `model`, `effort`,
  `disable-model-invocation`, `argument-hint`, `user-invocable`, `hooks`, `when_to_use`,
  `paths`, `shell`) is **Claude-Code-specific** — valid YAML, ignored by other agents. We keep
  the cross-tool skills' frontmatter minimal so they load everywhere.
- Body: keep `SKILL.md` **under 500 lines / ~5000 tokens**; spill detail into `references/*.md`
  (relative paths, one level deep).
- Claude.ai upload: **Customize → Skills**, zip with the **skill folder as the zip root**, code
  execution must be enabled. (Exact upload button labels not quoted by the primary source —
  UNVERIFIED, immaterial.)
- **Codex: confirmed.** Discovers skills from `.agents/skills/` (scans CWD up to repo root, then
  `~/.agents/skills`, `/etc/codex/skills`). `AGENTS.md` is the project guidance/memory file
  (functional analog of `CLAUDE.md`; concatenated, default 32 KiB cap). Skills invoked
  explicitly via `$skill-name` or auto by description. **Codex follows symlinked skill folders**
  → our single-source-of-truth plan (`.agents/skills` → `skills/`) is officially supported.
  Config in `~/.codex/config.toml`.

## 3. Minecraft software + plugin facts — SIGNIFICANT UPDATES

Source: papermc.io/downloads, docs.papermc.io/*, purpurmc.org, modrinth/hangar APIs, plugin
sites (fetched 2026-06-07).

- **Minecraft dropped the `1.` version prefix in 2026.** Current Minecraft is **26.1.2**
  (what older docs would call "1.26.1"). Update all version language accordingly.
- **Paper 26.1.2 requires Java 25** ("Paper requires at least Java 25 to run"). Java 17/21 will
  not run current Paper. Bake Java 25 into any startup-script generator.
- Purpur 26.1.2 (drop-in Paper replacement). Velocity ships rolling **3.5.0-SNAPSHOT** builds —
  there is no separate non-snapshot "stable" tag; latest snapshot is the recommended build.
- Folia FAQ confirmed: best on **≥16 cores**, skyblock/SMP spread benefits most, plugins must
  declare `folia-supported: true`. Default recommendation remains **Paper, not Folia**.
- **Aikar's flags:** unchanged on the official page
  (<https://docs.papermc.io/paper/aikars-flags/>) — still the G1GC set; the only official
  callout is "don't allocate all memory on a shared host."
  - **The "not recommended on Java 25 / MC 26.1+" warning is NOT on PaperMC's official page.**
    It originates from hosting providers / community (e.g. WinterNode). Rationale: the flags are
    G1GC-specific while Java 25 makes **Generational ZGC** a strong default; the `G1*` flags do
    not help ZGC. Guidance we encode: present Aikar's (G1) as the proven default, and note ZGC
    as a Java-25 alternative — **do not mix the two sets.** Attribute the caveat to
    community/hosting, not PaperMC.
- **Hangar API: author/slug endpoints are DEPRECATED.** Use slug-only forms:
  `GET /api/v1/projects/{slug}` and `GET /api/v1/pages/main/{project}`. OpenAPI at
  `https://hangar.papermc.io/v3/api-docs`. (research.md's `/{author}/{slug}` forms are stale —
  the adapter uses slug-only.)
- **Modrinth API live:** `GET https://api.modrinth.com/v2/project/{slug}` returns a markdown
  `body`; rate limit **300 req/min**; requires a unique `User-Agent`.
- **Oraxen dropped the standalone `llms.txt`** — now content-negotiation (`.md`, `?format=md`,
  `Accept: text/markdown`) + `/api/docs/_index` and `/api/docs/_all`.
- **MythicMobs docs are a self-hosted GitLab wiki** (`git.mythiccraft.io`), **not GitBook** —
  the GitBook `.md` trick does not apply there.
- **GitBook `.md`-suffix trick is per-site toggleable** (it 404'd on CoreProtect's space).
  Always fall back to `/llms-full.txt`, then Readability. GitBook now auto-generates
  `llms.txt` + `llms-full.txt`.
- Skript Hub JSON API live: `https://skripthub.net/api/v1/addonsyntaxlist/`.
- Doc-host corrections vs research.md: GrimAC docs are on `grim.ac` (not confirmed `docs.grim.ac`);
  active community forks worth noting — GriefPrevention (Folia-capable fork) and VaultUnlocked.

---

## Net effect on the build

1. Manifests use only verified keys; `author` object + `repository` string; `version` only in
   `plugin.json` (+ marketplace `metadata`).
2. Cross-tool skills keep minimal portable frontmatter; Claude-Code extras only where they add value.
3. Knowledge content states **Minecraft 26.1.x / Java 25**, and frames the Aikar's-flags Java-25
   caveat as community-sourced with ZGC as the alternative.
4. `learn-docs.mjs` Hangar adapter uses **slug-only** endpoints; Modrinth sends a unique UA;
   GitBook adapter probes `.md` then `/llms-full.txt`; Oraxen uses content negotiation.
