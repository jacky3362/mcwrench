---
description: Invent and score an original Minecraft gamemode, then turn it into a local build plan for a fun server.
argument-hint: "[a vibe, a concept, or 'a server where X happens'; blank to brainstorm]"
allowed-tools: Read, Bash, Glob, Skill
---

Use the **gamemode-designer** skill (the foundry) on `$ARGUMENTS` (blank = brainstorm fresh ideas).
One command, three internal phases:

1. **Imagine** (only when the input is vague or blank): generate 3 to 5 original concepts by combining
   archetype mechanics + one twist + a theme (`references/mechanic-taxonomy.md`), score each for fun
   and feasibility (`references/fun-feasibility-rubric.md`), and crown the best buildable-now one.
2. **Design** the chosen (or user-supplied) concept: lock the core loop, the single twist, the plugin
   stack (every mechanic mapped to a real plugin), and the Skript/config glue the twist needs. Give a
   verdict: config-only, Skript-glue, or needs a custom plugin.
3. **Create** the local build plan / starter pack: route the stack to `gamemode-stacks` +
   `learn-plugin-docs`, server setup to `new-server-bootstrap`, a themed rank ladder to
   `permissions-helper`, the MOTD and branding to `server-branding`, plus an `audit-config` pass.

**Write nothing to a live server** — plan and, only on explicit confirm, local starter files. No
RCON, no panel writes, no console commands (that is a future operator mode). Never invent config
keys; fetch them with `learn-plugin-docs`.
