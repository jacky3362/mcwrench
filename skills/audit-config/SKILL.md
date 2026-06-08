---
name: audit-config
description: >-
  Audits a Minecraft server's configuration tree for performance, security and
  footgun issues and reports a prioritised fix list. Use whenever the user asks
  to "audit my config", "check my server config", "review paper-global.yml",
  "why is my server set up wrong", "is this config safe", "lint my server", or
  points at a folder containing server.properties, paper-global.yml,
  paper-world-defaults.yml, paper-world.yml, spigot.yml, bukkit.yml, purpur.yml
  or velocity.toml. Also use proactively after the user shares any of those files
  or pastes their contents. Flags online-mode/forwarding mismatches, exposed RCON,
  YAML tab characters, view-distance/simulation-distance mismatches, missing
  entity limits, and unsafe unsupported-settings. Reports findings as critical,
  high, medium and low.
license: MIT
---

# Audit Config

Scan a Minecraft server's config files and produce a **prioritised, actionable** report.

## Procedure

1. **Locate the config tree.** Look for, at the server root and per-world folders:
   `server.properties`, `bukkit.yml`, `spigot.yml`, `paper-global.yml`,
   `paper-world-defaults.yml`, `*/paper-world.yml`, `purpur.yml`, `velocity.toml`,
   `config/` plugin folders. Use Glob/Grep/Read. If only pasted text is available, audit that.
2. **Read each present file** and check against the reference checklists:
   - `references/paper-global-checklist.md` — server-wide Paper settings + proxy forwarding.
   - `references/common-footguns.md` — the high-frequency mistakes that crash or lag servers.
3. **Cross-file consistency** (the part single-file linters miss):
   - `online-mode` vs proxy forwarding: behind Velocity/Bungee the backend must run
     `online-mode=false` AND have modern forwarding configured, or skins/UUIDs break.
   - **Never** both `spigot.yml: bungeecord: true` and `paper-global.yml: proxies.velocity.enabled: true` — the server won't start.
   - `view-distance` in `server.properties` vs `spigot.yml`/`paper-world.yml` — the lower wins per-world; flag silent mismatches.
   - `proxies.velocity.secret` present and not the literal default/empty; `forwarding.secret` matches the proxy.
4. **Security pass:**
   - RCON: if `enable-rcon=true`, confirm a strong `rcon.password` and that the port is
     firewalled / loopback-bound — never publicly exposed. (Critical if exposed.)
   - `online-mode=false` without a proxy in front = crackable server (high, unless intended).
5. **Performance pass:** view-distance/simulation-distance sanity for the player count,
   entity-activation-range present, mob spawn limits set, `entity-per-chunk-save-limit`
   caps for `experience_orb`/`arrow`/`ender_pearl`, hopper tuning. Defer deep tuning to
   the `performance-tuning` skill but flag obvious wins here.
6. **YAML hygiene:** detect literal tab characters (YAML forbids tabs — a common silent
   breakage), duplicate keys, and values that should be quoted.
7. **Plugin conflict pass:** run `check-conflicts.mjs` to flag mutually exclusive plugins (two
   skyblock engines, two claim systems, ItemsAdder + Oraxen), missing deps (Vault without an
   economy, LibsDisguises without ProtocolLib), and proxy/Folia mismatches. Verify any hit with
   `learn-plugin-docs` before recommending a removal.

## Reporting format

Group findings by severity and give each a one-line fix:

```
CRITICAL — will crash or lose data
  - [file:key] problem → fix
HIGH — lag or security
  - …
MEDIUM — quality / maintainability
LOW — style / nitpick
```

End with a short "Looks good" list of things that are already correct, so the user trusts
the audit. If a referenced plugin's keys are unfamiliar, call the `learn-plugin-docs`
skill before judging them — do not invent keys.

## Helper scripts

- **Seed the audit** by scanning the tree:
  ```bash
  node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/scan-server-tree.mjs" <server-root>
  #   detects software, config files, worlds, plugins, key settings, and tab-character warnings
  #   add --json for machine-readable output
  ```
- **Find paper-world.yml overrides** (you should only override keys you mean to):
  ```bash
  node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/diff-against-defaults.mjs" \
       <world>/paper-world.yml paper-world-defaults.yml
  ```
- **Check plugin conflicts / missing deps** (uses `references/conflict-rules.json` + the profile):
  ```bash
  node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/check-conflicts.mjs" <server-root>
  #   or --list "LuckPerms,EssentialsX,Vault"   or --profile   (add --json for machine output)
  ```
- **Write the server profile** so later answers stop re-asking version/host/stack:
  ```bash
  node "${CLAUDE_PLUGIN_ROOT}/skills/audit-config/scripts/scan-server-tree.mjs" <server-root> --write-profile
  ```
All are read-only on the scanned tree (only `--write-profile` writes, into mcwrench's `_cache/`) and
run on stock Node ≥18. Use them to orient, then read the flagged files.
