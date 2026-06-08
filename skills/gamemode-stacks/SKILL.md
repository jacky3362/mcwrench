---
name: gamemode-stacks
description: >-
  Recommends and configures the canonical plugin stack for any Minecraft server
  gamemode/archetype. Use whenever the user mentions an SMP, survival server,
  skyblock, prison, factions, towny, minigames, a network or BedWars, RPG, MMO,
  MMORPG, anarchy, creative or build server, KitPvP, lifesteal, OneBlock, GenPvP,
  BoxPvP, SkyPvP, the Pit, OP prison/skyblock/factions, HCF, practice or duels,
  SkyWars, survival games, earth or geopolitical, or asks "what plugins do I need
  for a [gamemode] server", "how do I set up a [gamemode]", "what's a good stack
  for", "best plugins for my SMP/skyblock/prison/etc", or "I'm starting a
  [gamemode] server". Knows the core + supporting
  plugins, the config touchpoints, and the common pitfalls for each archetype,
  and defers exact config keys to the learn-plugin-docs skill. Pair with
  new-server-bootstrap for greenfield setups and audit-config to review the result.
license: MIT
---

# Gamemode Stacks

Pick and configure the right plugin stack for the server's archetype. Each archetype has a
dense reference under `references/`. **Read the matching reference, then fetch exact config keys
with `learn-plugin-docs` — never invent keys or version numbers.**

## Routing

| Archetype | Reference | Trigger words |
|---|---|---|
| Survival / SMP | `references/survival-smp.md` | smp, survival, vanilla+ |
| Skyblock | `references/skyblock.md` | skyblock, island, BentoBox |
| Prison | `references/prison.md` | prison, mines, rankup, prestige |
| Factions | `references/factions.md` | factions, raid, TNT, power |
| Towny | `references/towny.md` | towny, town, nation, siege |
| Minigames / network | `references/minigames-network.md` | network, lobby, hub, bedwars, minigames |
| RPG / MMO | `references/rpg-mmo.md` | rpg, mmo, mmorpg, MythicMobs, custom items |
| Anarchy | `references/anarchy.md` | anarchy, no rules, dupe, lag machine |
| Creative / build | `references/creative-build.md` | creative, build, plots, WorldEdit |
| KitPvP | `references/kitpvp.md` | kitpvp, kits, arena pvp |
| Lifesteal | `references/lifesteal.md` | lifesteal, hearts, revive |
| OneBlock | `references/oneblock.md` | oneblock, one block, AOneBlock |
| GenPvP | `references/genpvp.md` | genpvp, generators, gens pvp |
| BoxPvP | `references/boxpvp.md` | boxpvp, box pvp, island pvp |
| SkyPvP | `references/skypvp.md` | skypvp, sky pvp, ender pearl, soup |
| The Pit | `references/the-pit.md` | the pit, pit, ffa arena |
| OP Prison | `references/op-prison.md` | op prison, opprison, autosell, tokenenchant |
| OP Skyblock | `references/op-skyblock.md` | op skyblock, opskyblock, sellwand, spawners |
| OP Factions | `references/op-factions.md` | op factions, opfactions, printer, koth |
| HCF | `references/hcf.md` | hcf, hardcore factions, deathban, sotw, classes |
| Practice PvP | `references/practice-pvp.md` | practice, duels, ranked, elo, 1v1 |
| BedWars | `references/bedwars.md` | bedwars, beds, generators, MBedwars |
| SkyWars | `references/skywars.md` | skywars, sky wars, floating islands |
| Survival Games | `references/survival-games.md` | survival games, hunger games, sg |
| Earth SMP | `references/earth-smp.md` | earth, earthmc, geopolitical, towny earth |

## Method

1. Identify the archetype (ask if ambiguous — e.g. "SMP with claims" vs "anarchy").
2. Read the matching reference for the canonical stack + touchpoints + pitfalls.
3. Confirm server software/version and whether it's behind a proxy (networks → `proxy-network`).
4. For any plugin whose exact config keys/permissions you need, run `learn-plugin-docs <plugin>`.
5. For a brand-new server, hand off the base setup to `new-server-bootstrap`, then return here for
   the gamemode stack. Review the final config with `audit-config` and tune via `performance-tuning`.

## Cross-cutting truths

- **One claims plugin per server** (GriefPrevention *or* Lands, not both). One skyblock engine
  (BentoBox *or* SuperiorSkyblock2). One custom-items engine (ItemsAdder *or* Oraxen).
- **Networks need consistent modern forwarding** across every backend (`proxy-network`).
- **Heavy content = TPS cost** (MythicMobs AI, big mob farms, FAWE edits) — profile with Spark
  (`performance-tuning`) before blaming the host.
- **Ranks/ladders** (prison A→Z→Prestige, staff tiers) live in **LuckPerms tracks**
  (`permissions-helper`), not raw inheritance.
