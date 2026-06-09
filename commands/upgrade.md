---
description: Plan a Minecraft version/Java upgrade (26.1 / Java 25) with a go/no-go runbook.
argument-hint: "[target version, e.g. 26.1.2]"
allowed-tools: Read, Bash, Glob, Skill
---

Use the **server-doctor** skill to plan an upgrade to `$ARGUMENTS` from the server-profile, following
`references/upgrade-checklist.md`.

Check: **Java 25** requirement for Paper 26.1+ (flag `UnsupportedClassVersionError` risk); the **26.1
unobfuscated-jar break** — label each installed plugin **has-a-build / none / unknown** via
`node "${CLAUDE_PLUGIN_ROOT}/skills/server-doctor/scripts/check-plugin-versions.mjs" <root>` +
`learn-plugin-docs`; do not combine a version bump with a software/server-type switch; back up and
trim before a world upgrade.

Emit the ordered runbook: **back up → bump Java → update plugins (verify builds) → test on a copy →
upgrade the world → re-audit**. Read-only; confirm before any irreversible step and tell the user to
back up first.
