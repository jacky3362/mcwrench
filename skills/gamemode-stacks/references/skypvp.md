# SkyPvP — how it works, plugin stack & config touchpoints

**Last verified: 2026-06-08.** Gamemode-agnostic admin reference. Plugin names are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## How it works
Players fight free-for-all on floating islands suspended over the void at spawn. They pick a kit,
use ender pearls to traverse gaps, and refill on soup or gapples between fights; knocking opponents
into the void is the main kill method. There is no map progression — it is continuous arena PvP with
kit cooldowns and a protected spawn pad.

## Core stack
- A kit plugin (or a KitPvP/DeluxeCombat core) — kits, cooldowns, scoring
- CombatLogX — combat tagging
- ProtocolLib — packet support for combat/cosmetic plugins
- ViaVersion + ViaBackwards — support 1.8 PvP clients alongside modern
- A scoreboard plugin — sidebar stats
- NametagEdit — nametag/prefix styling
- LuckPerms + PlaceholderAPI

## Supporting / optional
- An anti-cheat — reach/velocity/fly detection
- A cosmetics plugin — trails/effects
- An economy / kit-shop plugin — purchasable kits

## Config touchpoints
- Kit contents and per-kit cooldowns
- Ender-pearl cooldown
- Void / anti-void teleport-back behaviour and the kill credit it grants
- Spawn protection region and its PvP flag
- Knockback profile (1.8-style vs modern)

## Common pitfalls
- Players void-farm deaths/credit if void teleport gives kill rewards — gate it carefully.
- 1.8 vs modern knockback feels wildly different; pick one profile and document it for ViaVersion clients.
- ProtocolLib version must match the server version or combat plugins fail to load.
- An unset spawn PvP flag lets players be killed on the safe pad.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`; tie lag to `performance-tuning`.
