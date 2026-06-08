# HCF (Hardcore Factions) — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
Hardcore factions: dying gives a timed *deathban* that locks the player out, so every fight has real
stakes. Players claim land, equip PvP *classes* (Diamond, Bard, Archer, Rogue, Miner) that grant
distinct abilities, and fight over scheduled KoTH events. A season runs from SOTW (Start of the
World, PvP/claims enabling) to EOTW (End of the World, the deciding endgame), then the map resets.
Combat-tag and logout timers stop players escaping fights by quitting.

## Core stack
- An HCF core plugin (a dedicated Hardcore Factions core, or custom Skript) — claims, deathban, power, FTop, timers
- A classes plugin (or the core's built-in classes) — Diamond/Bard/Archer/Rogue/Miner abilities
- CombatLogX — combat tagging
- A KoTH plugin (zKoth or UltimateKoth)
- ProtocolLib — packet support
- ViaVersion + ViaBackwards — 1.8-style PvP clients
- LuckPerms + PlaceholderAPI + a scoreboard plugin

## Supporting / optional
- An anti-cheat — critical for competitive PvP integrity
- A crates plugin
- An economy plugin — claim pricing / shop

## Config touchpoints
- Deathban duration (and any rank-based reduction)
- Class abilities, effects, and energy/cooldown values
- KoTH / SOTW / EOTW event schedule
- Claim pricing, power loss/regen, and the logout/combat-tag timers
- Border size and per-season reset rules

## Common pitfalls
- Combat-logging is the defining exploit — the logout timer and a logout NPC must punish quitting.
- Class balance (especially Bard energy and Archer tag damage) makes or breaks the meta.
- Without a strong anti-cheat, hacked clients dominate; pair it with ProtocolLib version matching.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
