---
name: permissions-helper
description: >-
  Helps configure Minecraft permissions with LuckPerms (and Vault bridging). Use
  whenever the user mentions LuckPerms, "lp" commands, permissions, permission
  nodes, groups, tracks, prefixes/suffixes, weight, inheritance, contexts,
  per-world or per-server permissions, "promote/demote", ranks, ladders,
  "permission denied" for a command, wildcard nodes, or asks how to give a rank
  access to something. Covers groups vs tracks vs contexts vs meta, the
  permission.feature.action node convention, context keys (server, world,
  gamemode, dimension-type), static server contexts for networks, and prefix/
  weight resolution. Prefer this skill over guessing node names.
license: MIT
---

# Permissions Helper

Default permission engine: **LuckPerms** (`luckperms.net/wiki`). Vault bridges economy/perms
for plugins that read through it. Get the model right before writing nodes.

## The four concepts (do not conflate them)

- **Groups** carry permissions; users inherit groups. `/lp creategroup vip`,
  `/lp group vip permission set essentials.fly true`, `/lp user Steve parent add vip`.
- **Tracks** are ordered ladders of groups for promotion/demotion only —
  `/lp track staff append helper`, `…append mod`. Per the wiki: *"tracks act only as a means for
  easy promotion and demotion… and do not influence inheritance."* `/lp user Steve promote staff`.
- **Contexts** (`key=value`) restrict **where** a permission/parent/meta applies. Built-in keys:
  `server`, `world`, `gamemode`, `dimension-type`. See `references/luckperms-contexts.md`.
- **Meta** — prefix, suffix, weight, and custom meta keys (read elsewhere via PlaceholderAPI
  `%luckperms_meta_key%`). `/lp group vip meta setprefix 10 "&a[VIP] "`.

## Node convention

`plugin.feature.action`, e.g. `essentials.home.multiple.vip`, `worldguard.region.bypass`.
Wildcards (`essentials.home.*`) work but were historically discouraged in Bukkit; LuckPerms can
apply child permissions with `apply-bukkit-child-permissions: true`. Prefer explicit nodes for
auditability; use wildcards knowingly.

## Inheritance & prefix resolution

- Primary-group calculation defaults to `parents-by-weight`. Give groups a **weight**
  (`/lp group admin meta setweight 100`) so the highest-weight group wins prefix/suffix.
- Negated nodes (`-some.node`) override positives by specificity/weight — use to carve exceptions.
- Temporary perms/parents: `/lp user Steve permission settemp … 7d`.

## Networks (multiple servers, one DB)

- Point every backend at the **same** LuckPerms SQL database for a shared identity.
- Use **static server contexts** (per-server `contexts.yml`, e.g. `server-type=skyblock`) or the
  server's `server` context so one DB grants per-server perks without leaking them network-wide.
- Run LuckPerms on the **Velocity proxy too** (LuckPerms-Velocity) for proxy-level perms; keep
  the API jar versions aligned across proxy and backends, or contexts break on update.

## Working method

1. Establish the rank ladder (groups + a track) before assigning individual nodes.
2. Scope with contexts when a perk is per-world/per-server/per-gamemode.
3. Set weights for clean prefix resolution.
4. When unsure of a plugin's exact node names, call `learn-plugin-docs` for that plugin and read
   its permissions section — do not invent nodes.
5. Give the user the exact `/lp …` commands to run, in order.
