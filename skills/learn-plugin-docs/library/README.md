# Plugin library (committed, no re-fetch)

Pre-fetched, condensed references for ~55 popular Minecraft plugins, so common lookups need **zero
network**. `learn-docs.mjs` reads these first; it only fetches when a plugin is not here.

- **`registry.json`** maps plugin names + aliases (e.g. `lp`, `papi`, `ia`, `wg`) to the canonical
  docs URL and the library file. This also fixes by-name mis-resolution for paid / non-Modrinth
  plugins (ItemsAdder, etc.).
- Each `<slug>.md` carries `source_url` + `fetched_at` frontmatter.

Resolution order in `learn-docs.mjs`: **library → `skills/_cache/` (7-day) → registry URL → Modrinth/Hangar search**.

## Updating ("only when needed")

These are general, slow-changing references. Refresh one when a plugin's docs change materially:

```bash
node skills/learn-plugin-docs/scripts/learn-docs.mjs "<plugin>" --refresh
#   --refresh bypasses the library + cache and re-fetches from the source.
```

Then copy the printed reference over the matching `library/<slug>.md` (or, in v1.1+, a nightly CI
job refreshes these and opens a PR with the diffs). Verify against the live docs for anything
safety-critical; condensing is heuristic.
