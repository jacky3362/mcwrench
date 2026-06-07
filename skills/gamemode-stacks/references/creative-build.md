# Creative / Build — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- WorldEdit — region editing
- WorldGuard — region protection & flags
- FastAsyncWorldEdit (FAWE) — async, high-performance edits
- PlotSquared — plot worlds & per-plot ownership
- VoxelSniper or GoBrush/GoPaint — terrain/detail brushes
- HeadDatabase — decorative custom heads

## Supporting / optional
- AxiomPaper — server companion for the Axiom build mod
- Multiverse — separate build/flat/showcase worlds
- A schematic manager — store & share builds

## Config touchpoints
- Plot size and road width
- Build/region permission flags via WorldGuard
- Per-plot member permissions
- FAWE edit limits per rank
- World border

## Common pitfalls
- FAWE edit limits must scale with rank, or large edits lag the whole server.
- WorldGuard build/interact flags must be set deliberately on protected regions.
- PlotSquared's world generator must be chosen at world creation; changing later is painful.
- Mixing WorldEdit and FAWE inconsistently causes confusing edit behavior — standardize on FAWE.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
