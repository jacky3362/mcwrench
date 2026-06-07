# Contributing to mcwrench

Thanks for helping make Minecraft server administration easier across Claude Code, Claude.ai,
and Codex.

## Ground rules

1. **One source of truth for skills.** Every skill is a folder under `skills/<name>/` with a
   `SKILL.md`. **Never** duplicate a `SKILL.md` elsewhere. `.agents/skills` is a *symlink* to
   `skills/` (for Codex) — edit the real files in `skills/`, not under `.agents/`.
2. **Don't invent config keys, permission nodes, or versions.** Fetch and condense real docs
   (use `learn-plugin-docs`), or mark a value clearly as unverified. Pin reference files with a
   `Last verified:` date.
3. **Keep descriptions portable.** A skill `description` must be ≤1024 chars, non-empty, and
   contain no `<`/`>` (XML) characters — Claude.ai and Codex enforce this. Keep `SKILL.md` bodies
   under 500 lines; spill detail into `references/*.md`.
4. **Be "pushy" in descriptions.** Skills undertrigger by default — pack the description with
   concrete trigger phrases.

## Local setup

```bash
git clone https://github.com/Teddy563/mcwrench
cd mcwrench
# Windows only, if .agents/skills doesn't resolve locally:
node scripts/setup-symlinks.mjs
```

The docs-learner runs on stock Node ≥18 (global `fetch`) — no `npm install` for the wired
adapters (Modrinth, Hangar, GitBook, GitHub README).

## Before opening a PR

```bash
node scripts/validate.mjs            # structural + portability checks
claude plugin validate . --strict    # official Claude Code validation (if the CLI is installed)
```

CI runs `scripts/validate.mjs`, asserts the `.agents/skills` symlink resolves, and checks the
manifests parse. Both must pass.

## Adding a skill

1. Create `skills/<name>/SKILL.md` (folder name **must equal** the frontmatter `name`).
2. Add `references/*.md` for detail; keep relative paths one level deep.
3. If it warrants a Claude-Code slash alias, add a thin `commands/<short>.md` that invokes it.
4. Update `CLAUDE.md` + `AGENTS.md` skill tables and `CHANGELOG.md`.
5. Run the validators.

## Adding a docs adapter

Adapters live in `skills/learn-plugin-docs/scripts/adapters/`. Export `fetchFromUrl(url, opts)`
(and `searchAndFetch`/`fetchFromRepo` where it makes sense) returning
`{ markdown, sourceUrl, meta:{name,slug,host,adapter}, warnings:[] }`. Lazy-import any heavy npm
deps so the wired adapters keep working without `npm install`. See `references/source-routing.md`.
