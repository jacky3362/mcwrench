---
description: Audit a Minecraft server configuration tree for performance, security and footgun issues.
argument-hint: "[path-to-server-root]"
allowed-tools: Read, Bash, Glob, Grep, Skill
---

Use the **audit-config** skill on the path `$ARGUMENTS` (default: the current directory).

Report findings as a prioritised list: **critical** (will crash / data loss), **high**
(lag / security), **medium** (quality), **low** (style). Quote the exact file + key for each.
If a referenced plugin's keys are unfamiliar, use the **learn-plugin-docs** skill before judging.
