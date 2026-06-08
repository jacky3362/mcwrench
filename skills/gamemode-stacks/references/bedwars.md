# BedWars — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
Teams each defend a bed on a small island. Resource *generators* spit out iron and gold (on the
island) plus diamond and emerald (at mid map); players spend those at shop villagers on blocks,
gear, and team upgrades. Bridging to an enemy island and breaking their bed stops their respawns;
the last team with players standing wins. Each match runs in a per-arena instance that resets
between games.

## Core stack
- A BedWars plugin (BedWars1058 or MBedwars/Marcely's Bedwars) — arenas, beds, generators, shop, teams
- Per-arena setup (schematic + spawn/generator/bed locations) via the plugin's setup mode
- A shop + upgrade configuration — item prices and team upgrade trees
- LuckPerms + PlaceholderAPI
- A scoreboard (usually built into the BedWars plugin)

## Supporting / optional
- An add-on/extension for the BedWars core (cosmetics, parties, extra modes)
- A holograms plugin — leaderboards / per-generator tier displays
- A cosmetics/shopkeepers plugin if not bundled
- ViaVersion — multi-client-version support
- A party plugin for queuing teams together, if not built in
- An economy/levels plugin if progression is bridged server-wide

## Config touchpoints
- Generator tiers and upgrade timers (iron/gold vs diamond/emerald)
- Shop item lists and prices; team upgrade costs
- Team count and players-per-team (solo/doubles/3s/4s)
- Arena schematics and the per-match reset/regen
- Lobby, countdown, and respawn timings

## Common pitfalls
- Arena reset reliability is everything — a failed paste leaves a broken arena; verify async reset works under load.
- Generator timing balance (diamond/emerald spawn rate) defines match pace; mistune it and games drag or rush.
- Many concurrent arenas multiply entity/chunk load — pre-generate and cap simultaneous matches.
- Uncollected generator drops pile into item-entity lag — keep auto-merge/despawn tuned.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
