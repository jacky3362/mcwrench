# SkyWars — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
Each player (or small team) spawns on a tiny floating island ringed by other islands over the void.
They loot chests on their island and at a central island for gear, then bridge or pearl across to
fight — last player or team standing wins. Matches are short, run in per-arena instances that reset
between rounds, and offer solo and team modes plus optional purchasable kits.

## Core stack
- A SkyWars plugin (SkyWarsReloaded, CookieSkyWars, or RealSkywars) — arenas, chests, teams, scoring
- Per-arena setup (schematic + island/chest/spawn points) via the plugin's setup mode
- Chest loot-table configuration — tiered loot
- LuckPerms + PlaceholderAPI
- A scoreboard (usually built in)

## Supporting / optional
- A kit/cage cosmetic shop plugin if not bundled
- A holograms plugin — leaderboards / arena join signs
- ViaVersion — multi-client-version support
- An anti-cheat
- A party plugin for queuing teams together, if not built in
- An economy plugin if kits/cosmetics are purchasable with currency

## Config touchpoints
- Chest tiers and per-tier loot tables (basic vs central/OP chests)
- Arena schematics and the per-match reset/regen
- Team modes and players-per-island
- Kit shop contents and unlock costs
- Lobby, countdown, grace, and border/void timings

## Common pitfalls
- Arena regeneration must restore every island reliably each round or loot/blocks leak between matches.
- Loot-table balance (how much OP gear the center holds) decides whether games are skill or RNG.
- Many small arenas loaded at once add up — pre-generate worlds and cap concurrent matches.
- Void-kill detection must credit the last attacker or players dodge stats by self-voiding.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
