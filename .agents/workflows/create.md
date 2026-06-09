---
description: Invent and score an original Minecraft gamemode, then turn it into a local build plan for a fun server.
---

# Create a server / gamemode (the foundry)

1. Engage the **gamemode-designer** skill (`.agents/skills/gamemode-designer/SKILL.md`). The vibe,
   concept, or "a server where X happens" is the workflow argument (blank = brainstorm).
2. **Imagine** (only when vague): generate 3 to 5 original concepts by combining archetype mechanics +
   one twist + a theme (`references/mechanic-taxonomy.md`); score fun + feasibility
   (`references/fun-feasibility-rubric.md`); crown the best buildable-now one.
3. **Design** the chosen concept: core loop, the single twist, the plugin stack (each mechanic mapped
   to a real plugin), and the Skript/config glue. Verdict: config-only, Skript-glue, or custom plugin.
4. **Create** the local build plan: route to `gamemode-stacks` + `learn-plugin-docs` (stack + docs),
   `new-server-bootstrap` (setup), `permissions-helper` (themed ranks), `server-branding` (MOTD), and
   an `audit-config` pass.
5. Write nothing to a live server (no RCON, no panel writes, no console commands; that is v2). Plan,
   and local files only on explicit confirm. Never invent config keys.
