# Fun + feasibility rubric

Score every concept on both. A fun idea that cannot be built is a daydream; a buildable idea that is
not fun is a chore. The sweet spot is **high fun, Config-only or Skript-glue**.

## Fun estimate (0 to 5 each, sum / 30)
| Criterion | Ask |
|---|---|
| **Loop clarity** | Can you state Challenge → Action → Reward in one sentence? |
| **Retention hook** | Is there a nested or escalating loop (prestige, seasons, a ladder)? |
| **Social pull** | A real reason to play *with or against* others (rivalry, trade, teams)? |
| **Novelty** | Does the one twist make it feel fresh versus the nearest clone? |
| **Onboarding** | Can a newcomer "get it" in about 60 seconds? |
| **Risk/reward tension** | Meaningful stakes that stay in the flow band (not too soft, not punishing)? |

Below ~18/30 it is a clone or a grind — change the twist, do not add a second one.

## Feasibility check
- **Stack exists?** Map each required mechanic (every axis) to a real plugin from the library/registry
  or `gamemode-stacks`. Any unmapped mechanic needs Skript glue or a custom plugin.
- **Performance risk** — does the twist imply heavy entities, redstone, worldgen, or frequent timers?
  Tie concerns to `performance-tuning`.
- **Abuse surface** — alt-farming, grief, combat-logging, dupes. Name the counter (e.g. lifesteal
  NEEDS CombatLogX + IP/account limits).
- **EULA** — does the economy create pay-to-win pressure? Keep store perks cosmetic/convenience.

## Verdict ladder (the "could it actually work" answer)
- **Config-only** — known plugins + settings. Ship it.
- **Skript-glue** — config + a small Skript for the twist. Still very buildable; most good hybrids
  land here.
- **Needs a custom plugin** — the twist has no plugin or Skript path. Park it (idea is fine, effort
  is v2-scale).

**Crown** the highest-fun concept that is Config-only or Skript-glue. Present its score breakdown,
the stack, the twist's glue spec, and the one biggest risk with its mitigation.
