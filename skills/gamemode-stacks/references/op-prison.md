# OP Prison — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
A prison server tuned for extreme scale: players mine reset-able mines, autosell the output for
money, and rank up through tiers, then *prestige* (reset rank for a multiplier) in loops. Custom
mining enchants with huge multipliers, very high sell prices, gangs, and token economies make
progression far faster than vanilla prison. The loop is mine → autosell → enchant pickaxe →
rank up → prestige → repeat at higher multipliers.

## Core stack
- A mines/prison plugin (the Prison plugin, JetsPrisonMines, or MineResetLite) — mines, ranks, prestige
- A custom-enchants plugin (TokenEnchant or CrazyEnchantments) — pickaxe enchants
- Autosell / sellall — auto-sell mined blocks with multipliers
- LuckPerms — rank and prestige tracks
- Vault + an economy plugin
- PlaceholderAPI — placeholders for menus/scoreboards

## Supporting / optional
- JobsReborn — extra income jobs
- A gangs plugin — team progression and gang vaults
- A crates plugin — key rewards
- A holograms plugin — mine/leaderboard displays

## Config touchpoints
- Custom-enchant costs, levels, and per-enchant multipliers
- Sellall prices and rank/prestige sell multipliers
- Prestige reset rules and reward curve
- Mine reset interval and reset percentage
- Rank-up costs along the LuckPerms track

## Common pitfalls
- Autosell plus stacked-spawner or high-yield enchants generates immense item/economy load — cap it.
- Multipliers stack multiplicatively across rank, prestige, and enchants; the economy inflates if uncapped.
- Frequent full-mine resets on large mines spike MSPT — stagger reset timing.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
