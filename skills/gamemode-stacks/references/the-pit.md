# The Pit — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
A single endless free-for-all arena where players fight continuously, earning XP and a gold
currency per kill. XP raises a persistent level; gold buys upgrades, perks, and gear that change
how a player fights. Killstreaks add bonus gold and place bounties on high-streak players, and
higher-tier mystic/enchanted gear gives long-term progression. Death is cheap and respawn is
instant — the draw is the leveling and perk economy, not winning a round.

## Core stack
- A Pit-style plugin (a dedicated ThePit plugin) or custom Skript logic — levels, gold, perks, killstreaks, bounties
- CombatLogX — combat tagging
- A scoreboard plugin — level/gold/streak sidebar
- PlaceholderAPI — placeholders for menus/scoreboards
- LuckPerms — ranks & permissions
- A kit/perk menu plugin — perk and upgrade selection

## Supporting / optional
- An economy plugin — if gold is bridged to a server economy
- ProtocolLib + ViaVersion — packet support and multi-version clients
- An anti-cheat
- A holograms plugin — leaderboards / bounty displays
- NametagEdit — rank/level nametag styling

## Config touchpoints
- Level/XP curve and per-level unlocks
- Gold drop amounts from kills, pickups, and bounties
- Perk effects and upgrade costs
- Killstreak thresholds and rewards
- Mystic/enchanted gear tiers and drop rates

## Common pitfalls
- Gold and perk balance drift fast; model the earn vs spend curve or the economy inflates.
- If implemented in Skript, guard variables against reload wipes and persist player progress safely.
- Instant respawn plus FFA concentrates entities and packets — watch MSPT in the single arena.
- Dropped gold/loot from constant deaths accumulates as item entities — keep despawn timers tight.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
