---
description: Pre-pin every plugin's docs for a gamemode's canonical stack in one command.
argument-hint: "<gamemode> (e.g. skyblock, prison, survival-smp, rpg-mmo)"
allowed-tools: Bash, Read, Skill
---

Pre-load the docs for a whole gamemode stack at once. Run:

`node "${CLAUDE_PLUGIN_ROOT}/scripts/learn-stack.mjs" $ARGUMENTS`

It reads `skills/learn-plugin-docs/library/stacks.json`, pins each plugin via
`learn-docs <slug> --pin` (tolerant of per-plugin failures), and `--list` shows the known gamemodes.

After it runs, summarise which plugins are now local, note any stack plugins not in the library yet,
then hand off to the **gamemode-stacks** skill for that archetype. Do not invent config keys.
