# Skyblock — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- BentoBox — island engine framework
- A BentoBox gamemode addon — BSkyBlock or AcidIsland
- SuperiorSkyblock2 — standalone engine alternative (instead of BentoBox)
- LuckPerms — ranks & permissions
- PlaceholderAPI — placeholders for menus/scoreboards

## Supporting / optional
- IridiumSkyblock — alternative standalone island engine
- Vault — economy bridge
- An economy plugin — island balances & shop currency
- A generator/cobble plugin — custom ore generation on islands

## Config touchpoints
- Island distance & protection range (must not overlap)
- Starter schematic / blueprint for new islands
- Island level calculator block weights
- Cobblestone/ore generator tiers and unlock costs
- Island team/member size limits
- Island reset and inactivity expiry rules

## Common pitfalls
- SuperiorSkyblock2 and BentoBox are mutually exclusive engines — pick exactly one.
- Island distance set too low causes islands to overlap and grief each other.
- Island level recalculation is heavy on very large islands; throttle or schedule it.
- Mixing two generator plugins produces inconsistent ore output.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
