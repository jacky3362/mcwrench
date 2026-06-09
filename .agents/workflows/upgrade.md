---
description: Plan a Minecraft version/Java upgrade (26.1 / Java 25) with a go/no-go runbook.
---

# Upgrade / migration planner

1. Engage the **server-doctor** skill and read `references/upgrade-checklist.md`. The target version
   is the argument; current state comes from the server-profile.
2. Check: Java 25 requirement for Paper 26.1+ (flag `UnsupportedClassVersionError` risk); the 26.1
   unobfuscated-jar break (label each plugin has-a-build / none / unknown via
   `node skills/server-doctor/scripts/check-plugin-versions.mjs <root>` + learn-plugin-docs); do not
   combine a version bump with a software switch; back up + trim before a world upgrade.
3. Emit the ordered runbook: back up -> bump Java -> update plugins -> test on a copy -> upgrade the
   world -> re-audit. Read-only; confirm before any irreversible step.
