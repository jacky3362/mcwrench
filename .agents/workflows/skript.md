---
description: Write, debug or explain a Skript (.sk) script; fetch live syntax from Skript Hub.
---

# Skript

1. Engage the **skript-author** skill (`.agents/skills/skript-author/SKILL.md`).
2. Frame the goal as event → conditions → effects.
3. Identify required addons (SkBee, skript-reflect, SkQuery, skript-yaml, SkRayFall). Fetch exact
   syntax instead of guessing:
   `node skills/skript-author/scripts/fetch-skripthub.mjs --addon <Addon>`.
4. Write the `.sk`, then have the user `/sk reload` it and check console for parse errors.
5. For shops/economies, warn about the reload/variable footgun and back up `variables.csv` first.
