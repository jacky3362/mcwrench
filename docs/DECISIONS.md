# Decisions log

Reasonable calls made during the v0.1 build, per the "don't block on reversible choices" rule.
Each is reversible before the first GitHub push.

## D1 — Name: `mcwrench`
See `docs/NAME.md`. Single name for plugin + marketplace + repo + slash prefix.

## D2 — GitHub owner handle is a placeholder
The user's GitHub handle is unknown. All `repository`, `author.url`, and install commands use
the literal placeholder **`Teddy563`**. README has a "Before you push" section listing every
file to find-replace. Reversible: one find-replace of `Teddy563`.

## D3 — v0.1 ships 6 skills, not 2
`goal.md` named "minecraft-server-router + audit-config + the 5 reference files". The five
reference files in `research.md` (`paper-global-checklist`, `aikars-flags`, `spark-cheatsheet`,
`luckperms-contexts`, `velocity-modern-forwarding`) naturally belong to four different skills.
Rather than orphan them under `audit-config`, v0.1 ships the skills that own them:
- `minecraft-server-router` (pushy auto-trigger hub)
- `audit-config` (+ `paper-global-checklist.md`, `common-footguns.md`)
- `performance-tuning` (+ `aikars-flags.md`, `spark-cheatsheet.md`)
- `permissions-helper` (+ `luckperms-contexts.md`)
- `proxy-network` (+ `velocity-modern-forwarding.md`)
- `learn-plugin-docs` (hosts `scripts/learn-docs.mjs` + adapters; goal step 3 requires it)

This still satisfies the goal (router + audit-config + the 5 reference files all present) and
gives every reference a correct home. Cost: 4 extra lean SKILL.md files.

## D4 — Single source of truth via symlink (git mode-120000 object)
`.agents/skills` is a **symlink → `../skills`** so Codex sees the skills with zero duplication
(Codex follows symlinked skill folders — verified). Claude Code reads `skills/` directly via the
plugin manifest and ignores `.agents/`.

**Mechanism (important):** this build host is privilege-less Windows — `New-Item -SymbolicLink`,
`mklink`, and MSYS `ln -s` all fail (the last silently makes a *copy*, which we rejected). So the
symlink is committed as a **git symlink object (mode 120000)** whose blob content is the literal
`../skills`. Verified: `git ls-files -s .agents/skills` → `120000 … .agents/skills`. On
Linux/macOS clones (where Codex runs) git materialises a real symlink that resolves to `skills/`;
on Windows it appears as a 9-byte text file (`../skills`) and `git status` stays clean. CI on
Ubuntu asserts `readlink .agents/skills == ../skills` and that the target resolves.

## D5 — Local Windows convenience
`scripts/setup-symlinks.mjs` recreates `.agents/skills` as an NTFS **junction** (no admin needed)
for contributors who want it to resolve locally on Windows; it warns that the junction is local-
only and to `git checkout -- .agents/skills` before committing (restoring the committed symlink
object). This keeps the committed repo's single-source-of-truth invariant intact regardless of OS.

## D6 — Commands are thin, namespaced aliases
Custom commands are merged into skills and get the plugin prefix, so command files are named
without the `mc-` stutter: `commands/audit.md` → `/mcwrench:audit`. Each is a one-liner that
invokes the matching skill. Claude Code only; Claude.ai/Codex rely on auto-trigger.

## D7 — Docs engine: 3 adapters wired, rest stubbed
Per goal: Modrinth, Hangar (slug-only endpoints, per updated API), and GitBook (`.md` → `llms`)
are fully wired in `learn-docs.mjs`. github-readme is also wired (cheap + high value). Oraxen,
SpigotMC (BBCode), Skript Hub, PaperMC-raw, and the Readability fallback are stubbed with TODOs.
Heavy npm deps (`jsdom`, `@mozilla/readability`, `turndown`) are **lazy-imported** so the wired
adapters run on a stock Node ≥18 with zero `npm install`.

## D8 — License: MIT
Matches Anthropic's own skills repo and most marketplace plugins. `LICENSE` at root.

## D9 — Knowledge content is dated and version-accurate
Reference files state Minecraft **26.1.x** and **Java 25**, and attribute the Aikar's-flags
Java-25 caveat to community/hosting sources (not PaperMC). Each reference carries a
`Last verified: 2026-06-07` line so staleness is visible.

## D10 — Repo pre-initialised with git
The build host already had to use git plumbing for the symlink object (D4), so the repo is left
**`git init`'d with one initial commit** rather than as loose files. This is strictly more
useful for "ready to push" and is fully reversible (`rm -rf .git && git init`). README's "Before
you push" documents both replacing `Teddy563` and resetting history if the user prefers their
own initial commit. No remote is added and nothing is pushed.

## D12 — Gemini CLI + Google Antigravity support (no skill duplication)
Verified the two tools' conventions against live sources (2026-06-07):
- **Antigravity** uses the open Agent Skills standard and its **native skills path is
  `.agents/skills/`** — mcwrench's existing symlink already loads the skills there. It reads root
  `AGENTS.md` for rules and treats `.agents/workflows/*.md` as slash commands. Added:
  `.agents/workflows/{audit,learn,perf,perms,proxy}.md` (thin, point back to the skills) and a
  small always-on `.agents/rules/mcwrench.md`. No new skills, no SKILL.md duplication.
- **Gemini CLI** default memory is `GEMINI.md`; `.gemini/settings.json` `context.fileName`
  aliases additional files. It has **no native SKILL.md loader**, so `GEMINI.md` surfaces the
  skills and instructs the agent to read `skills/<name>/SKILL.md`. `.gemini/settings.json` aliases
  `[GEMINI.md, AGENTS.md, CLAUDE.md]` (GEMINI.md is also shipped because a known Gemini bug,
  issue #19872, can ignore the alias on some versions — the default GEMINI.md always loads).
  Slash commands added as TOML in `.gemini/commands/mcwrench/*.toml` (`prompt` required) →
  `/mcwrench:audit` etc.

All new files are tool-specific **command/pointer wrappers** (same pattern as `commands/` for
Claude Code), validated by `scripts/validate.mjs`. The one source of truth remains `skills/`.

## D11 — Local install test instead of unavailable scenarios
`claude plugin validate . --strict` passed (marketplace). The official CLI was found at
`~/.local/bin/claude.exe`; a headless `claude --plugin-dir ./ -p …` run confirmed all 6 skills +
5 commands load as `mcwrench:*`, and natural phrasings triggered the right skills ("laggy/low TPS"
→ `performance-tuning`; "audit my paper config" → `audit-config`). The CLI validates only the
marketplace manifest, so `scripts/validate.mjs` covers SKILL.md frontmatter + portability and
runs in CI.
