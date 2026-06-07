# Towny — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- Towny Advanced — towns, nations, plots, claims
- TownyChat — town/nation/local chat channels
- TownyFlight — flight within owned/claimed land
- Dynmap-Towny — town/nation overlay on the live map

## Supporting / optional
- SiegeWar — optional war/siege mechanics
- EssentialsX — core commands & economy
- LuckPerms — ranks & permissions
- PlaceholderAPI — town/nation placeholders

## Config touchpoints
- Town & nation creation and daily upkeep costs
- Claim radius and maximum plots per town
- War / PvP toggles per town and per plot
- Plot permissions (build/destroy/switch/item-use) for residents vs outsiders
- Embassy and outpost rules

## Common pitfalls
- Daily upkeep must be balanced against income or towns fold or hoard indefinitely.
- Dynmap-Towny requires Dynmap to be loaded first or its overlay silently fails.
- Town PvP flag interacts with world PvP — both must agree to get intended behavior.
- Over-permissive plot defaults let outsiders interact with town blocks.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
