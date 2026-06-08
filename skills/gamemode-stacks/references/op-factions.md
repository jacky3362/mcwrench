# OP Factions — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
Factions tuned for high-intensity raiding: teams claim land, build cannon-defended bases around
stacked spawners and money farms, and raid each other with TNT cannons. Overpowered custom enchants,
boosted spawner economies, scheduled KoTH, and crates accelerate everything. The loop is grind a
spawner economy, fortify a base, raid rivals with TNT, and climb the faction-value (FTop)
leaderboard over a map that resets each season.

## Core stack
- A factions plugin — SaberFactions or FactionsUUID — claims, power, FTop, raiding
- A custom-enchants plugin (CrazyEnchantments or similar)
- WildStacker — stacked spawners and stacked drops
- CombatLogX — combat tagging
- An anti-cheat — raid/PvP integrity
- A KoTH plugin (zKoth or UltimateKoth)
- A crates plugin (CrazyCrates or ExcellentCrates)
- LuckPerms + Vault + an economy plugin + PlaceholderAPI

## Supporting / optional
- A sell-shop — EconomyShopGUI or ShopGUI+
- A holograms plugin — FTop / KoTH displays
- A printer/schematic build aid if the server allows it

## Config touchpoints
- TNT bank / explosion regen and raid (PvP-on) time windows
- Spawner caps and stack limits per chunk/faction
- Faction power, claim limits, and FTop value weights
- KoTH schedule and crate contents
- Custom-enchant costs and multipliers

## Common pitfalls
- TNT cannons plus falling-block and item entities during raids spike MSPT — limit explosion entities.
- Stacked spawners are the standing lag baseline; cap them before raids even start.
- Watch for dupe exploits in stackers, sell-shops, and faction vaults.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
