# Earth SMP — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
Geopolitical survival on a scaled real-world Earth map. Players found towns and join nations using a
Towny-style claim system, manage upkeep, and optionally wage organised wars or sieges over territory.
A live web map shows claims and nation borders in real time. The draw is emergent politics, alliances,
and territorial conflict on a recognisable Earth, rather than a scripted progression loop.

## Core stack
- Towny (+ TownyChat) — towns, nations, claims, upkeep, residents
- A Towny web-map integration — Dynmap-Towny or a BlueMap/Dynmap claim layer
- An Earth world (imported/scaled real-world map) loaded via a multi-world plugin
- EssentialsX — homes, warps, economy commands, moderation
- LuckPerms + Vault + an economy plugin
- Chunky — pre-generate the huge Earth world

## Supporting / optional
- SiegeWar — organised siege/war ruleset on top of Towny
- A holograms / dynmap-marker layer for resources or events
- A multiverse/world-management plugin if running multiple worlds
- PlaceholderAPI

## Config touchpoints
- Earth world import/scale and which world Towny claims apply to
- Town/nation upkeep costs and claim limits
- Siege/war rules (if SiegeWar is used) — siege cost, duration, immunity
- Web-map render area, resolution, and update interval
- Spawn, border, and travel/teleport rules

## Common pitfalls
- A full-scale Earth world is enormous — pre-generate with Chunky and cap view/sim distance or it will not hold TPS.
- Dynmap/BlueMap full renders are I/O and CPU heavy; render off-peak and throttle update rate.
- Large claim and resident datasets make Towny upkeep cycles costly — watch the daily new-day tick.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
