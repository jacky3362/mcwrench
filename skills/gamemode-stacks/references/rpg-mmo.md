# RPG / MMO — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- MythicMobs (+ MythicCrucible) — custom mobs and custom items
- ModelEngine — custom mob models/animations
- MMOCore + MMOItems (OR Heroes) — classes, stats, skills, custom gear
- MMOInventory — extra equipment slots
- Citizens + Denizen OR BetonQuest — NPCs and quest scripting
- ItemsAdder OR Oraxen — custom items/blocks (pick one)
- A world generator — TerraformGenerator or Iris
- Vault — economy bridge
- LuckPerms — ranks & permissions

## Supporting / optional
- PlaceholderAPI — stats/quest placeholders
- A resource-pack host — serves the forced custom pack

## Config touchpoints
- Resource-pack hosting and forced-pack enforcement
- Class and skill definitions
- Mob spawners and spawn regions
- Quest flow definitions and stage logic
- Custom item/model registration

## Common pitfalls
- ModelEngine version must match the MythicMobs version or models break.
- ItemsAdder and Oraxen overlap — pick one to avoid namespace/pack conflicts.
- Resource-pack size and host reliability gate the player's first-join experience.
- Heavy MythicMobs AI costs TPS; profile with Spark via the `performance-tuning` skill.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
