# Anarchy — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- Hardened Paper — no claims, aggressive exploit/lag patching
- An anti-cheat — Vulcan, GrimAC, or Matrix
- CoreProtect — audit only (no rollback; anarchy keeps grief)
- A login queue plugin — handle full-server demand
- Aggressive chunk/entity limits — protect TPS under load

## Supporting / optional
- ViaVersion — multi-client-version support
- A chat filter — minimal moderation only

## Config touchpoints
- Low view-distance and simulation-distance
- Lavacast / dupe / lag-machine patches in Paper config
- Entity-per-chunk caps
- Player max chunk-load rate
- Queue plugin behavior when the server is full

## Common pitfalls
- Dupes and lag machines are the main threat — keep Paper's exploit toggles correct
  (the `unsupported-settings` exploit flags in particular).
- Do NOT add GriefPrevention or claims — it is anarchy by definition.
- Anti-cheat must be tuned loose to avoid mass false bans on legit movement/combat.
- CoreProtect here is for staff auditing, not for reversing player grief.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
