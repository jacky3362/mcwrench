---
description: Grade a Minecraft server folder: config, conflicts, plugin currency, and today's log.
---

# Server health scorecard

1. Engage the **server-doctor** skill. Target is the argument, or the current workspace.
2. Run the read-only scanners and roll them into one graded report:
   - `node skills/audit-config/scripts/scan-server-tree.mjs <root>`
   - `node skills/audit-config/scripts/check-conflicts.mjs <root>`
   - `node skills/server-doctor/scripts/check-plugin-versions.mjs <root>`
   - `node skills/server-doctor/scripts/parse-log.mjs <root>`
3. Grade security, performance, durability, currency; list the top fixes critical to low. Read the
   server-profile so you do not re-ask. Hand deep tuning to performance-tuning, config lint to
   audit-config. Read-only; never run live commands.
