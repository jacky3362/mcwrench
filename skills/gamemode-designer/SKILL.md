---
name: gamemode-designer
description: >-
  Invents, scores, and plans original Minecraft server gamemodes, then turns the
  chosen idea into a concrete local build plan. Use whenever the user wants to
  start, create, or set up a server, brainstorm or invent a gamemode, asks for an
  original, unique, new, custom, or hybrid gamemode, wants to combine or fuse
  existing gamemodes, says "a server where X happens", "make me a server", "what
  gamemode should I make", "give me a fun server idea", or wants help taking an
  idea into an actual fun, re-engaging server. Generates concepts by combining
  archetype mechanics with one twist and a theme, scores each for fun and
  feasibility against real plugin stacks, then routes the build to
  new-server-bootstrap, gamemode-stacks, permissions-helper, and server-branding.
  Plans and writes locally only; never runs live server commands.
license: MIT
---

# Gamemode Designer (the foundry)

Take an idea all the way to a fun, re-engaging server. One command, `/mcwrench:create`, runs three
internal phases. **Plan and write locally only. Never run live server commands, RCON, or panel
writes — that is a future operator mode, out of scope here.** Never invent plugin config keys; map
every mechanic to a real plugin or flag it as custom, and fetch exact keys with `learn-plugin-docs`.

## How fun works (bake this in)
A gamemode is fun when it has a clear **Challenge → Action → Reward** core loop, a **nested or
escalating** loop for retention (prestige, seasons, a ladder to climb), and a **twist on a familiar
base** rather than a clone. Originality comes from **combining existing archetypes + exactly one
bending twist + a theme** — evolve, do not copy.

## Phase 1 — IMAGINE (only when the input is vague)
If the user gives nothing, a vibe, or "something fun", generate **3 to 5 original concepts**. For
each, fill: name, one-line pitch, base archetype(s) fused, the one twist, core loop, progression,
conflict + stakes, target audience, **fun score**, **feasibility verdict + the plugin stack**, and a
novelty note. Build concepts from `references/mechanic-taxonomy.md` (the 9 axes + twist bank). Score
with `references/fun-feasibility-rubric.md`. Propose the top 1 to 3 and let the user pick, or crown
the highest fun among the buildable-now options.

If the user already has a concrete idea ("a server where you age and die of old age", or a concept
from a previous IMAGINE), skip to DESIGN.

## Phase 2 — DESIGN the chosen concept
Lock it down: the core loop in one sentence, the single twist, the full plugin stack (each mechanic
mapped to a real plugin), and the **glue the twist needs** (a config setting, a Skript, or a custom
plugin). Sanity-check feasibility: stack exists, performance risk, abuse surface (alt-farming, grief,
combat-logging, dupes), EULA pressure. Give a verdict: **Config-only**, **Skript-glue**, or **Needs a
custom plugin** (park the last for later). Prefer the highest-fun idea that is Config-only or
Skript-glue — that is one that "could actually work".

## Phase 3 — CREATE the local build plan / starter pack
Route to the existing skills and assemble one plan:
- **Stack + docs** → `gamemode-stacks` for the closest base archetype, then pre-pull every plugin's
  docs with `learn --stack <closest>` / `learn-plugin-docs`.
- **Server setup** → `new-server-bootstrap` (software, Java, startup, EULA, starter configs).
- **Ranks** → a themed ladder handed to `permissions-helper` for LuckPerms tracks.
- **Brand** → `server-branding` for the MOTD, rank prefixes, and store/Discord copy in the right
  format per plugin.
- **The twist** → a concrete spec (which plugin/Skript, what it does, the config or event hooks).
- **Audit** → an `audit-config` pass over the proposed config.

Emit it as a single readable starter pack: concept, plugin list, the twist spec, ranks, MOTD, and a
build order. **Write nothing to a live server.** Local starter files only if the user explicitly
confirms (and only once config generators exist).

## Guardrails
- Local only. No RCON, no panel API writes, no console commands, no live testing. Those are v2.
- Never invent config keys, permission nodes, or plugin behaviour. Fetch with `learn-plugin-docs`.
- Keep the economy/store EULA-safe; flag pay-to-win pressure a twist might create.
- One twist per concept. Two twists usually means two muddy gamemodes.

## References
- `references/mechanic-taxonomy.md` — the 9 combination axes + the twist bank.
- `references/fun-feasibility-rubric.md` — the fun rubric, the feasibility check, the verdict ladder.
- `references/example-concepts.md` — worked hybrid examples (Tidewell, Faultline, Ageless) + seeds.
