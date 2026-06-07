# KitPvP — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- A KitPvP plugin (or DeluxeCombat) — arenas, kits, scoring
- CombatLogX — combat tagging
- ProtocolLib — packet-level support for combat/cosmetic plugins
- ViaVersion + ViaBackwards — multi-client-version support
- NameTagEdit — nametag/prefix styling
- A scoreboard plugin — sidebar stats

## Supporting / optional
- LuckPerms — ranks & permissions
- An economy / kit-shop plugin — purchasable kits
- A cosmetics plugin — trails/effects

## Config touchpoints
- Spawn invincibility duration
- Kit contents and per-kit cooldowns
- Anti-camping / spawn-kill rules
- Kill rewards
- Combat-tag timer length

## Common pitfalls
- ProtocolLib version must match the server version or combat plugins fail to load.
- Combat-log punishment must be defined or players escape death by quitting.
- The spawn region PvP flag must be set so players can't be killed in spawn.
- Kit refill/cooldown abuse — verify cooldowns actually enforce between uses.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
