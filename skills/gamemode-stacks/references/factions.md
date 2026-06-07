# Factions — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- FactionsUUID (Drtshock) OR SaberFactions — the factions engine (pick one)
- MassiveCore — dependency for some factions forks
- mcMMO — RPG-style combat/skill progression
- FactionsTop — leaderboard for faction value
- An anti-cheat — combat/movement enforcement
- CoreProtect — audit logging for staff investigations

## Supporting / optional
- Vault — economy bridge
- EssentialsX — core commands & economy
- A combat/logout plugin — punish combat logging during raids

## Config touchpoints
- TNT / raid bank rules (what can be blown, what is protected)
- Claim cooldowns and overclaiming rules
- Power per player (gain/loss, raidability threshold)
- Raid windows / protection timers
- Faction warps and `/f map` behavior

## Common pitfalls
- TNT lag during raids — cap entity and explosion processing to protect TPS.
- Offline-raid rules must be deliberate; ambiguous settings cause player disputes.
- Anti-cheat false positives on knockback/combat; tune for the PvP playstyle.
- Two factions engines or stale MassiveCore versions cause hard conflicts.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
