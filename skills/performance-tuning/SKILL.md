---
name: performance-tuning
description: >-
  Diagnoses and fixes Minecraft server lag, low TPS, high MSPT, GC pauses and
  out-of-memory crashes. Use whenever the user says "my server is laggy", "low
  TPS", "TPS drops", "high MSPT", "stuttering", "freezing", "out of memory",
  "OOM", "GC pause", "what JVM flags", "Aikar's flags", "how much RAM", "Xmx",
  "view-distance", "simulation-distance", "entity activation range", "mob
  farms lagging", "hopper lag", "chunk lag", "spark profiler", or asks how to
  make their Paper/Purpur/Folia server run faster. Covers Spark profiling,
  Aikar's flags vs Generational ZGC on Java 25, heap sizing, view/simulation
  distance, entity activation ranges, mob spawn limits, hopper and chunk tuning.
  Prefer this skill over guessing; quote real flag and config values.
license: MIT
---

# Performance Tuning

Diagnose first, tune second. Never hand someone a wall of flags without measuring.

## Step 1 — Measure with Spark

Spark (`spark.lucko.me`) is the modern profiler (replaces Timings; Paper bundles it). See
`references/spark-cheatsheet.md`. The minimum diagnostic loop:

1. `/spark tps` and `/spark health` — is it a TPS problem, an MSPT spike problem, or memory?
2. `/spark profiler start --timeout 300` during the lag, then read the uploaded flame graph.
3. For memory pressure / GC churn: `/spark profiler start --alloc`, `/spark gc`, `/spark heapsummary`.

Identify whether the cost is the main thread (ticking: entities, hoppers, redstone, chunk gen),
GC, or I/O (world saves, plugin storage on slow disk).

## Step 2 — Heap & JVM flags

See `references/aikars-flags.md` for the full verified flag set and sizing rules. Key points:

- **`Xms == Xmx`.** Leave 1–1.5 GB headroom for the OS + JVM native memory beyond the heap.
- **Aikar's flags are G1GC-tuned and remain the proven default** on the official PaperMC page.
- **Java 25 nuance:** Paper 26.1+ requires Java 25. Hosting/community guidance (e.g. WinterNode —
  NOT PaperMC's own docs) recommends **not** pairing Aikar's G1 flags with Java 25's Generational
  ZGC; choose one GC. Present Aikar's/G1 as the safe default and ZGC as an alternative to
  benchmark, and **never mix the two flag sets**.
- On memory-capped containers (Pterodactyl/Pelican), `-XX:+AlwaysPreTouch` can cause
  "Cannot allocate memory" at boot — drop it there.

## Step 3 — Config tuning (biggest wins first)

In observed frequency order:

1. **`view-distance` / `simulation-distance`** (`server.properties`, `spigot.yml`,
   per-world `paper-world.yml`). The lower of the configured values wins per world.
   Typical sane values: view 6–10, simulation 4–6. Anarchy/huge servers go lower.
2. **Mob farms / entity load** — `spigot.yml: entity-activation-range`,
   `mob-spawn-range`, Paper per-player mob spawns; cap with
   `entity-per-chunk-save-limit` for `experience_orb`, `arrow`, `ender_pearl`, `item`.
3. **Hoppers** — `paper-world.yml` hopper tuning / `transfer-cooldown`; reduce
   move-event overhead on hopper-heavy economies.
4. **Chunk storms** — cap `player-max-chunk-load-rate` (~100.0) for exploration-heavy servers.
5. **Redstone clocks / lag machines** — find them in the Spark profile and address the build.
6. **Sync I/O** — move LuckPerms/world storage off slow disks; stagger autosaves.

## Output

Give a concrete diff: the exact keys to change, their current vs recommended values, and the
expected effect. Tie every recommendation back to what the Spark profile showed — if you have no
profile, ask for one (or list the top 3 likely causes and how to confirm each).
