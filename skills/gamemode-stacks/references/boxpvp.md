# BoxPvP — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
Every player or team gets a small private island ("box") generated from a schematic. Inside the
box they build sell-farms — stacked spawners, gens, or crop/mob setups — and sell output for money
to upgrade. PvP and raiding are enabled, so other players break into boxes for loot while owners
defend; scheduled KoTH and crates supplement the grind. It blends a skyblock-style island engine
with open-PvP faction economics.

## Core stack
- A box/island engine — SuperiorSkyblock2, IridiumSkyblock, or BentoBox — schematic-based boxes
- A sell-shop — EconomyShopGUI or ShopGUI+ (sellall and sell-wands)
- WildStacker — stacked spawners and stacked drops/items
- CombatLogX — combat tagging
- A crates plugin (CrazyCrates or ExcellentCrates)
- A KoTH plugin (zKoth or UltimateKoth)
- LuckPerms + Vault + an economy plugin
- PlaceholderAPI — placeholders for menus/scoreboards

## Supporting / optional
- A holograms plugin — island value / sell displays
- An anti-cheat — raid/PvP integrity
- A scoreboard plugin

## Config touchpoints
- Box schematic / starter blueprint and island distance vs protection range
- Spawner and stacker stack limits per box
- Sell prices and rank sell multipliers
- PvP toggle / raid windows and box border behaviour
- KoTH schedule and crate contents

## Common pitfalls
- Stacked spawners plus auto-collect hoppers are the #1 lag source — cap stacks and limit hoppers.
- Raiding must be balanced against box defenses or new players quit after losing everything.
- Island distance set too low lets boxes overlap and grief each other.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
