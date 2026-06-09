---
description: Pre-pin every plugin's docs for a gamemode's canonical stack in one command.
---

# Learn a whole gamemode stack

1. Pre-load the docs for an entire gamemode stack. Run:
   `node scripts/learn-stack.mjs <gamemode>`
   (reads `skills/learn-plugin-docs/library/stacks.json`; pins each plugin via `learn-docs --pin`;
   tolerant of per-plugin failures; `--list` shows the gamemodes).
2. Summarise which plugins are now local and flag any stack plugins not yet in the library.
3. Hand off to the **gamemode-stacks** skill for that archetype. Do not invent config keys.
