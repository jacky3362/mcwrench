---
name: learn-plugin-docs
description: >-
  Fetches and condenses the documentation for ANY Minecraft plugin or mod on
  demand into a local markdown reference. Use this skill whenever the user asks
  "how do I configure X", "what does X do", "where are X's docs", "set up X",
  "what are X's permission nodes/commands/config keys", or names any plugin you
  do not already have a confident, current reference for, even if they did not
  explicitly ask you to read docs. Knows the cheap channel per host: Modrinth and
  Hangar REST APIs, the GitBook .md-suffix trick plus llms.txt/llms-full.txt,
  raw GitHub READMEs and wikis, Skript Hub's syntax API, the SpigotMC JSON API,
  and a Readability fallback for unknown hosts. Writes a condensed REFERENCE.md
  under skills/_cache/[slug]/ and tells you to read that instead of re-fetching.
  Use before answering any uncertain plugin-specific question; do not guess keys.
argument-hint: "[plugin-name-or-url]"
allowed-tools: Bash, Read, Write, WebFetch
license: MIT
---

# Learn Plugin Docs

Turn a plugin name or URL into a local, condensed markdown reference, then answer from it.

## When to use

Any time you are not **confidently current** about a specific plugin's config keys, permission
nodes, commands, or placeholders. Fetch first, answer second. Never invent config keys.

## Procedure

Given an argument like `LuckPerms`, `MythicMobs`, `https://modrinth.com/plugin/dynmap`, or a
Hangar slug:

1. **Check the cache first.** If `skills/_cache/<slug>/REFERENCE.md` exists and is recent, read
   it instead of re-fetching.
2. **Resolve the target.** If `$ARGUMENTS` is a URL, infer the host. If it's a name, the script
   searches Modrinth, then Hangar.
3. **Run the fetcher:**

   ```bash
   node "${CLAUDE_PLUGIN_ROOT}/skills/learn-plugin-docs/scripts/learn-docs.mjs" "$ARGUMENTS"
   ```

   It picks the cheapest adapter for the host (see `references/source-routing.md`), fetches the
   authoritative markdown, condenses it, and writes:
   - `skills/_cache/<slug>/REFERENCE.md` — condensed (Overview, Install, Config keys, Permissions,
     Commands, Placeholders, Dependencies, Folia, Footguns), with `source_url` + `fetched_at`.
   - `skills/_cache/<slug>/RAW.md` — the full fetched markdown.
4. **Read `REFERENCE.md`** and answer the user's actual question from it. Summarise the key config
   keys, permissions, and commands, and cite the cache path + source URL.
5. If the fetch fails (host unknown, network blocked on enterprise installs), tell the user and
   offer the **manual fallback**: ask them to paste the relevant docs, or to upload the plugin
   `.jar` so you can read `plugin.yml` (commands/permissions) and bundled `config.yml`.

## Adapter status (v1.0 — all wired)

- **Modrinth** — `/v2/project/{slug}`, markdown `body`. ✓ live-tested
- **Hangar** — slug-only endpoints (`/api/v1/projects/{slug}` + `/api/v1/pages/main/{project}`;
  the older `/{author}/{slug}` forms are deprecated). ✓ live-tested
- **GitHub README** — `raw.githubusercontent.com/{owner}/{repo}/HEAD/README.md`. ✓ live-tested
- **Oraxen** — content negotiation (`.md` / `?format=md` / `Accept: text/markdown`) + `/api/docs/_all`. ✓ live-tested
- **SpigotMC** — XenforoResourceManagerAPI + BBCode→Markdown (lossy; warns). ✓ live-tested
- **Skript Hub** — `/api/v1/addonsyntaxlist/` (note: `addon` is a nested object — filter on `addon.name`). ✓ live-tested
- **PaperMC** — Starlight slug ≠ source path, so it tree-searches `github.com/PaperMC/docs`
  (`src/content/docs/**.mdx`) for the page. ✓ live-tested
- **GitBook** — `.md` suffix → `llms-full.txt`. **Best-effort**: the `.md`/llms export is
  per-site toggleable; on hosts that disable it the router falls through to Readability.
- **Readability** (generic fallback) — wired, but needs optional deps
  (`npm install jsdom @mozilla/readability turndown turndown-plugin-gfm`); without them it asks you
  to use WebFetch or paste the docs.

## Notes

- Modrinth requires a unique `User-Agent`; the script sets one. Rate limit is 300 req/min.
- Heavy deps (`jsdom`, `@mozilla/readability`, `turndown`) are only needed by the stubbed
  Readability fallback and are **lazy-imported** — the wired adapters run on stock Node ≥18 with
  no `npm install`.
- Cache writes live under `skills/_cache/` and are gitignored.
