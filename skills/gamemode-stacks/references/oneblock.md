# OneBlock — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
Each player starts on a single block floating in the void. Breaking that block immediately
regenerates a new one, and the block cycles through scripted *phases* — themed sequences that
change which blocks, mobs, and loot appear as the player progresses. Players bank resources,
expand an island around the magic block, and chase island level and challenge milestones; the
phase list loops once the final phase is reached.

## Core stack
- BentoBox — island engine framework
- AOneBlock — the OneBlock gamemode addon (the magic block + phase engine)
- Level — island level calculation
- Bank — per-island deposit/withdraw balance
- Challenges — collect/have/stat-based progression goals
- Warps + Warps sign support — player warp network
- LuckPerms — ranks & permissions
- Vault + an economy plugin — currency backend
- PlaceholderAPI — placeholders for menus/scoreboards

## Supporting / optional
- Biomes addon — let players buy/unlock biomes for their island
- InvSwitcher — per-world inventories so OneBlock and other worlds stay separate
- A holograms plugin — phase/level displays
- A custom-GUI or menu plugin — shop and warp menus

## Config touchpoints
- Phase progression (which phase file triggers at which block count; phase loop behaviour)
- Island distance and protection range (must not overlap)
- Island level calculator block weights
- Challenge tiers and rewards
- Starting/holes settings for the magic block placement

## Common pitfalls
- AOneBlock and BSkyBlock/AcidIsland are separate gamemodes on the same BentoBox install —
  give each its own world and inventory or items leak between them.
- Very large or numerous custom phase files inflate memory and load time; keep them lean.
- Island level recalculation is heavy on big islands — throttle or schedule it.
- Distance set too low lets islands overlap and grief each other.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
