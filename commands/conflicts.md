---
description: Check a Minecraft plugin set for conflicts, missing dependencies, and proxy/Folia mismatches.
argument-hint: "[path-to-server-root] | --list \"A,B,C\" | --profile"
allowed-tools: Read, Bash, Glob, Skill
---

Use the **audit-config** skill's conflict checker on `$ARGUMENTS` (default: the current directory).

Run:
`node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/check-conflicts.mjs" $ARGUMENTS`

It reads `<root>/plugins/*.jar`, or an explicit `--list "LuckPerms,EssentialsX,Vault"`, or `--profile`
to use the saved server profile; add `--json` for machine output.

Report the findings prioritised **critical → high → medium → low**: mutually exclusive plugins (two
skyblock engines, two claim systems, ItemsAdder + Oraxen), missing dependencies (Vault without an
economy, LibsDisguises without ProtocolLib), and proxy or Folia mismatches. The check is conservative
by design, so verify any hit with **learn-plugin-docs** before recommending a removal. Never invent
plugin behaviour.
