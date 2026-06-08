---
description: Check a Minecraft plugin set for conflicts, missing dependencies, and proxy/Folia mismatches.
---

# Plugin conflict check

1. Engage the **audit-config** skill (`.agents/skills/audit-config/SKILL.md`). The target is the
   workflow argument (a server root), or the current workspace if none is given.
2. Run the conflict checker:
   `node skills/audit-config/scripts/check-conflicts.mjs <server-root>`
   (or `--list "LuckPerms,EssentialsX,Vault"`, or `--profile` to use the saved server profile; add
   `--json` for machine output).
3. Report findings prioritised **critical → high → medium → low**: mutually exclusive plugins (two
   skyblock engines, two claim systems, ItemsAdder + Oraxen), missing dependencies (Vault without an
   economy, LibsDisguises without ProtocolLib), and proxy or Folia mismatches.
4. The check is conservative; verify any hit with **learn-plugin-docs** before recommending a
   removal. Do not invent plugin behaviour.
