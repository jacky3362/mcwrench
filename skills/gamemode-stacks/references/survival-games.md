# Survival Games (Hunger Games) — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
A large map seeded with loot chests. Players spawn around a central cornucopia, get a brief *grace
period* with PvP disabled, then scramble for gear. A world border slowly shrinks to force players
together, supply drops refill loot mid-game, and a deathmatch trigger ends the round when few remain.
Last player standing wins; the whole map resets between games.

## Core stack
- A Survival Games plugin (a maintained SurvivalGames or HungerGames plugin) — arenas, grace, border, chests, deathmatch
- Chest loot-table configuration — tiered loot and refills
- Map regen / arena reset — restore the map between rounds
- Chunky — pre-generate the large map so it loads instantly
- LuckPerms + PlaceholderAPI
- A scoreboard (usually built in)

## Supporting / optional
- A holograms plugin — leaderboards / join signs
- A spectator / lobby plugin if not bundled
- ViaVersion — multi-client-version support
- A party plugin if teams/duos are allowed
- An anti-cheat for the PvP phase

## Config touchpoints
- Loot tables for tiered/cornucopia chests and refill timing
- Grace-period length (PvP disabled window)
- World-border start size and shrink rate
- Deathmatch trigger (player count or timer) and arena
- Full-map reset method between games

## Common pitfalls
- Full-map regeneration is expensive on big maps — pre-generate with Chunky and reset from a clean copy, not by re-worldgen.
- Chest loot balance (how strong cornucopia loot is) decides whether early rushes dominate.
- The shrinking border plus end-game crowding concentrates entities; cap view/sim distance.
- If grace-period PvP isn't fully blocked, players exploit the window to pre-tag opponents.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
