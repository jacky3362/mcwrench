# Practice PvP — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
A dedicated dueling server. Players queue for ranked or unranked 1v1s (and party/team modes) in a
chosen *ladder* — kit type such as NoDebuff, Sumo, Boxing, BuildUP, or SkyWars-style. The plugin
copies players into a fresh arena instance, hands them the ladder kit, runs the duel, and restores
their inventory after. Ranked matches adjust an ELO rating; players edit kit layouts and grind
ranking with no map progression beyond the ELO ladder.

## Core stack
- A practice plugin (StrikePractice, Duels, or ZonePracticePro) — queues, ladders, arenas, ELO, kit editor
- ProtocolLib — packet support for combat handling
- ViaVersion + ViaBackwards — 1.8-style PvP for legacy clients
- A scoreboard plugin — queue/match/ELO sidebar
- LuckPerms + PlaceholderAPI

## Supporting / optional
- An anti-cheat
- A party/event plugin if not built into the practice core
- A cosmetics plugin — kill effects / trails
- A duel-stats / leaderboard plugin if not bundled
- A Discord integration for ranked results, if the core supports it

## Config touchpoints
- Kit editor: which ladders exist and their default kit contents
- Arena schematics and per-arena copy/regen behaviour
- Ranked vs unranked queues and the ELO/division formula
- Ping or region routing for matchmaking
- Arena instance count / pool size for concurrent duels

## Common pitfalls
- 1.8 vs modern knockback differs sharply; pick a knockback profile and serve legacy clients via ViaVersion.
- Arena regeneration on every match is I/O heavy — async copy/paste and a healthy arena pool keep MSPT (and thus knockback) stable.
- ProtocolLib must match the server version or the practice core fails to load.
- Ranked queues with too few arena instances starve matchmaking at peak — size the pool to concurrent players.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
