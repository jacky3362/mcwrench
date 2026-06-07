---
description: Diagnose and fix Minecraft server lag, low TPS, high MSPT, GC pauses or OOM.
---

# Performance tuning

1. Engage the **performance-tuning** skill (`.agents/skills/performance-tuning/SKILL.md`).
2. Measure first with Spark: `/spark tps`, `/spark health`, then `/spark profiler start` during
   the lag (`--alloc` for memory pressure). Read the flame graph.
3. Check heap & JVM flags against `aikars-flags.md` (`Xms==Xmx`, host headroom; Aikar's/G1 is the
   default; ZGC only as a clean Java-25 alternative — never mix flag sets).
4. Tune config, biggest wins first: view-distance / simulation-distance, entity-activation-range,
   mob spawn limits, `entity-per-chunk-save-limit`, hoppers, chunk load rate.
5. Give a concrete diff (current → recommended values) tied to what the profile showed. Confirm
   Java 25 for Paper 26.1+.
