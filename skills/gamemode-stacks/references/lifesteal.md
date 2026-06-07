# Lifesteal — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- A lifesteal plugin — LifeStealCore or LifeStealZ
- LuckPerms — ranks & permissions
- GriefPrevention or Lands — land claims (pick one)
- EssentialsX — core commands & economy
- CombatLogX — combat tagging (CRITICAL for this mode)
- DiscordSRV — Discord integration

## Supporting / optional
- Vault — economy bridge
- PlaceholderAPI — heart-count placeholders

## Config touchpoints
- Heart drop percentage/amount on kill
- Maximum and minimum heart caps
- Ban duration when a player hits zero hearts
- Revive item recipe and revive rules
- Withdraw/heart item behavior

## Common pitfalls
- CombatLogX is critical — without it players combat-log to avoid losing hearts.
- Heart farming via alt accounts — enforce IP/account limits.
- Use a claim plugin to limit grief between the harsh PvP encounters.
- Loose revive-item recipes trivialize the death penalty; gate the recipe carefully.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
