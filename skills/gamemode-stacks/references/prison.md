# Prison — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- A mines plugin — MineResetLite or the Prison plugin ("MRL+") for resettable mines
- JobsReborn — job-based income
- LuckPerms tracks — rank ladder A→B→…→Z→Prestige via promotion/demotion
- A shop — ShopGUIPlus or EconomyShopGUI for sellall/buy menus
- CombatLogX — combat tagging

## Supporting / optional
- Vault — economy bridge
- PlaceholderAPI — rank/balance placeholders
- An enchants/tokens plugin — custom pickaxe enchants & token economy

## Config touchpoints
- Mine reset interval & reset percentage threshold
- Per-mine rank requirement (which rank can enter which mine)
- Sellall price multipliers per item
- Prestige reset behavior (what carries over, what resets)
- Rankup cost curve across the ladder

## Common pitfalls
- The rankup ladder belongs in a LuckPerms track (promotion/demotion), not group inheritance.
- Mine reset interval set too short repeatedly re-pastes blocks and tanks TPS.
- Unchecked sellall multipliers cause runaway price inflation; review the curve.
- Generous enchant/token tiers compound income and break the economy balance.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
