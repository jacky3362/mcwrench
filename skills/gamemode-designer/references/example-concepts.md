# Example concepts (combine + twist + feasible stack)

Worked examples of the method. Use them as a quality bar and as seeds, not as the only answers.
Always re-score for the user's audience and confirm plugin keys with `learn-plugin-docs`.

## Tidewell — cottagecore survival + extraction · fun 25/30 · Skript-glue
Cozy coastal SMP where every night the sea floods the lowlands and recedes by dawn, leaving rare loot
in tidepools you race to grab before the water returns.
- **Base:** survival-SMP + an extraction loop. **Twist:** nightly rising/receding water.
- **Loop:** build and farm by day → dawn tidepool rush → trade and upgrade. Escalates: better gear
  reaches deeper pools. **Social:** shared coast, light PvP over the best pools.
- **Stack:** EssentialsX, LuckPerms, Vault, CoreProtect, GriefPrevention (claims), WorldEdit/FAWE
  (flood and restore a region), **Skript** (tide timer + flood/recede + pool loot), ItemsAdder
  (optional themed loot). **Verdict:** Skript-glue.
- **Biggest risk:** flood griefing/loss → restrict flooding to a non-claim "tideline" region.

## Faultline — OneBlock + Factions raid · fun 26/30 · Skript-glue · top pick
Everyone starts on a personal expanding one-block island in a shared grid. Solo PvE grind through
phases; at phase N your island becomes **raidable** and you join the faction war.
- **Base:** OneBlock + Factions. **Twist:** a PvE island "graduates" into a raidable PvP base by phase.
- **Loop:** mine the block → phase up → (late) defend or raid. A solo grind that *becomes* high-stakes
  PvP. **Retention:** phases + a raid season + a leaderboard.
- **Stack:** BentoBox + AOneBlock addon, a claim/raid layer (Factions or Lands), LuckPerms, Vault,
  PlaceholderAPI, CombatLogX, **Skript** (gate raidability by phase). **Verdict:** Skript-glue.
- **Biggest risk:** early players get farmed → only flag islands raidable at/after the phase gate.

## Ageless — RPG + visible aging + reincarnation prestige · fun 24/30 · Skript-glue
You visibly age; abilities shift by life stage (youth = speed/jump, elder = better trades/XP). At
"death of old age" you **reincarnate**, keeping a fraction of your skills (a prestige lineage).
- **Base:** RPG/MMO + lifesteal-style stakes. **Twist:** an aging clock that reshapes your kit, then
  resets into prestige.
- **Loop:** live a life (skill up) → age changes your strengths → reincarnate stronger.
- **Stack:** AuraSkills/mcMMO, PlaceholderAPI + **Skript** (age timer + stage buffs), LuckPerms tracks
  (lineage prestige), MythicMobs/ItemsAdder (optional content). **Verdict:** Skript-glue.
- **Biggest risk:** aging feels like a punishment → make each stage *differently* strong, not weaker.

## Seed twists to riff on
- A skyblock where **islands drift** and occasionally collide, opening temporary trade or raid windows.
- A prison where **the mine is the arena** — mining and PvP share one shrinking pit.
- A survival where **night is a shared boss** the whole server fights for server-wide perks.
- A KitPvP where **your kit is crafted from your last death's loot** (roguelike runs).
- A towny where **seasons end in a siege** and the winning nation seeds the next map.
