# GenPvP (Generators PvP) — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
Players place *generators* — blocks that spawn sellable items or blocks on a timer — then sell the
output for in-game money to buy better, faster generator tiers. The world is open PvP, so other
players raid generator setups; the loop is grind currency, upgrade gens, defend them, and PvP for
loot. Scheduled KoTH events and crates give bursts of high-value reward.

## Core stack
- A generators plugin (KGenerators, vGens, BucikGenerators, or AwesomeGenerators) — placeable gens with tiers
- EconomyShopGUI or ShopGUI+ — sell-shop / sellall pricing
- WildStacker — stack drops, items, and any spawner-based gens to cut entity load
- CombatLogX — combat tagging so players can't log out mid-fight
- A KoTH plugin (zKoth or UltimateKoth) — timed capture events
- A crates plugin (CrazyCrates or ExcellentCrates) — reward keys
- LuckPerms + Vault — ranks, permissions, economy bridge
- PlaceholderAPI + a holograms plugin — gen displays, scoreboards

## Supporting / optional
- A scoreboard plugin — balance/stats sidebar
- An anti-cheat — open-world PvP integrity
- ViaVersion + ViaBackwards — multi-client-version support

## Config touchpoints
- Generator tiers, drop tables, and per-player placement caps
- Sellall / sell-shop prices and rank-based sell multipliers
- PvP world flags and any safe-spawn region
- KoTH schedule, capture time, and loot
- Crate contents and key sources

## Common pitfalls
- Entity-based generators spawn item lag fast — stack drops and cap gens per player.
- Sell prices plus high multipliers cause runaway economy inflation; model the curve.
- Unbounded gen placement tanks chunk performance in busy regions.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
