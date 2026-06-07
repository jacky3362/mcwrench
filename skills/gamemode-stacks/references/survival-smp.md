# Survival SMP — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- EssentialsX — homes, warps, kits, economy, basic commands
- EssentialsXChat — chat formatting/channels
- EssentialsXSpawn — spawn point & first-join handling
- EssentialsXDiscord — Discord relay bridge
- LuckPerms — groups, ranks, permission management
- Vault — economy/permission bridge for other plugins
- CoreProtect — block logging & rollback for grief recovery
- GriefPrevention OR Lands — land claims (pick exactly one)

## Supporting / optional
- PlaceholderAPI — placeholders shared across plugins
- DiscordSRV — fuller Discord integration (alt to EssentialsXDiscord)
- Dynmap or BlueMap — live web map
- Multiverse — multiple worlds (nether/end/creative/resource)

## Config touchpoints
- Claim sizes & claim-blocks granted per rank
- Homes-per-rank and `/sethome` limits
- Sleep-vote percentage to skip night
- Random-teleport (rtp) cooldown and range
- Spawn protection radius
- Economy starting balance and command costs
- Kits and their permissions, surfaced through LuckPerms

## Common pitfalls
- Running two claim plugins at once causes overlapping protection conflicts — pick one.
- CoreProtect database on a slow disk introduces tick lag; keep its DB on fast storage.
- EssentialsX kits/features are gated by LuckPerms nodes; missing nodes silently disable them.
- Back-on-death is a permission-gated convenience; decide per rank intentionally.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
