# OP Skyblock — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
Skyblock with the numbers cranked up: players start on a void island and build money farms around
overpowered stacked spawners, sell-wands, and custom enchants. Island levels, sell multipliers, and
crate rewards are boosted so islands grow far faster than classic skyblock. The loop is grow the
island, stack spawners, sell-wand the drops for money, upgrade boosters, and climb the island-value
leaderboard.

## Core stack
- An island engine — SuperiorSkyblock2, IridiumSkyblock, or BentoBox (BSkyBlock)
- WildStacker — stacked spawners and stacked mob drops (the core OP mechanic)
- A sell-wand or sell-shop — EconomyShopGUI or ShopGUI+
- A custom-enchants plugin (CrazyEnchantments or similar)
- A crates plugin (CrazyCrates or ExcellentCrates)
- LuckPerms + Vault + an economy plugin
- PlaceholderAPI — placeholders for menus/scoreboards

## Supporting / optional
- A holograms plugin — island value / leaderboard displays
- A boosters plugin — temporary sell/spawn multipliers
- A scoreboard plugin

## Config touchpoints
- Spawner stack limits and mob spawn caps per island
- Sell-wand / sell-shop prices and rank multipliers
- Island level block/spawner weights
- Crate and booster contents
- Island distance vs protection range

## Common pitfalls
- Stacked-spawner lag is the single biggest performance killer — cap stack size and limit spawners per island.
- Uncapped sell multipliers plus stacked drops inflate the economy almost immediately.
- Heavy island-level recalculation on huge islands spikes MSPT — throttle or schedule it.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
