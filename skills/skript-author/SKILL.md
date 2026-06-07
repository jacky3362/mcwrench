---
name: skript-author
description: >-
  Writes, debugs and explains Skript scripts (.sk) for Minecraft servers. Use
  whenever the user mentions Skript, a .sk file, "sk reload", SkBee, skript-reflect,
  SkQuery, skript-yaml, SkRayFall, a custom command/event written in Skript, "my
  script doesn't work", Skript variables, "on right click", "every X seconds", or
  asks to make a shop/GUI/event in Skript. Knows Skript's event/condition/effect/
  expression model, the reload-without-losing-variables workflow, common addon
  needs, and can fetch live syntax from the Skript Hub API. Defer exact addon
  syntax to the fetched reference; do not guess syntax patterns.
argument-hint: "[what the script should do / the error]"
allowed-tools: Read, Bash, Write, Grep, Skill
license: MIT
---

# Skript Author

Help with **Skript** — the plain-English scripting plugin (`docs.skriptlang.org`) and its addons.

## Model (orient before writing)

- A script is **events** containing **conditions**, **effects**, and **expressions**:
  ```
  on right click on a sign:
      if player has permission "shop.use":
          give player 1 diamond
  ```
- **Addons** add syntax: **SkBee** (NBT, bound, recipes), **skript-reflect** (Java reflection),
  **SkQuery**, **skript-yaml** (config files), **SkRayFall** (citizens/holograms). Identify which
  addon a needed syntax belongs to before using it.
- **Variables**: `{var}` (per-server), `{var::%player's uuid%}` (list/per-player). Persisted to
  `variables.csv`/DB. **Reload carefully** (below) or you lose in-flight variables.

## Reload-safely workflow (critical on live shops/economies)

- After editing a `.sk`, run **`/sk reload <script>`** (or `/sk reload all`). Editing the file on
  disk does nothing until reloaded.
- A bad reload can drop variables defined this session. On production: back up `variables.csv`/the
  variable DB first, reload a single script (not `all`), and watch the console for parse errors.
- Parse errors leave the script **unloaded** — the whole `.sk` stops working, not just the bad line.

## Fetch live syntax (don't guess)

Skript Hub exposes a JSON syntax API. To pull exact syntax for core Skript or an addon:

```bash
node "${CLAUDE_PLUGIN_ROOT}/skills/skript-author/scripts/fetch-skripthub.mjs" --addon SkBee
node "${CLAUDE_PLUGIN_ROOT}/skills/skript-author/scripts/fetch-skripthub.mjs" --search "give"
```

It queries `https://skripthub.net/api/v1/addonsyntaxlist/`, filters by addon or search term, and
writes a condensed reference to `skills/_cache/skripthub/<slug>.md`. Read that, then write syntax
that matches the installed addon/version — **do not invent syntax patterns**. (The API is
undocumented and may rate-limit; the script caches aggressively.)

## Method

1. Restate the goal as event → conditions → effects.
2. Identify required addons; fetch their syntax via the script above if unsure.
3. Write the `.sk`, then tell the user to `/sk reload` it and check console for parse errors.
4. For shops/economies touching money or items, warn about the reload/variable footgun first.
