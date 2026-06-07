---
description: Audit a Minecraft server configuration tree for performance, security and footgun issues.
---

# Audit server config

1. Engage the **audit-config** skill (`.agents/skills/audit-config/SKILL.md`). Target path is the
   workflow argument, or the current workspace if none is given.
2. Locate config files: `server.properties`, `bukkit.yml`, `spigot.yml`, `paper-global.yml`,
   `paper-world-defaults.yml`, per-world `paper-world.yml`, `purpur.yml`, `velocity.toml`.
3. Check each against the skill's reference checklists (`paper-global-checklist.md`,
   `common-footguns.md`) and do the cross-file consistency + security + performance passes.
4. Report findings prioritised: **critical** (crash / data loss) → **high** (lag / security) →
   **medium** (quality) → **low** (style). Quote the exact file + key for each.
5. If a referenced plugin's keys are unfamiliar, run the **learn-plugin-docs** skill first —
   do not invent keys.
