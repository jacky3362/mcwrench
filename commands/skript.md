---
description: Write, debug or explain a Skript (.sk) script; fetch live syntax from Skript Hub.
argument-hint: "[what the script should do / the error]"
allowed-tools: Read, Bash, Write, Grep, Skill
---

Use the **skript-author** skill for: `$ARGUMENTS`

Frame it as event → conditions → effects, identify required addons (SkBee, skript-reflect, …), and
fetch exact syntax with `fetch-skripthub.mjs` rather than guessing patterns. Tell the user to
`/sk reload` and check console for parse errors. For shops/economies, warn about the
reload/variable footgun first.
