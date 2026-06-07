---
description: Diagnose and fix Minecraft server lag, low TPS, high MSPT, GC pauses, or OOM.
argument-hint: "[symptom or Spark report URL]"
allowed-tools: Read, Bash, Glob, Grep, Skill
---

Use the **performance-tuning** skill for: `$ARGUMENTS`

Measure first (Spark: `/spark tps`, `/spark health`, `/spark profiler start`), then tune heap/
JVM flags and config (view-distance, simulation-distance, entity-activation-range, mob spawn
limits, hopper and chunk settings). Tie every recommendation to evidence. Confirm Java 25 for
Paper 26.1+. Never hand over a wall of flags without a measured cause.
