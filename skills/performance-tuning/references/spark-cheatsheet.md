# Spark profiler cheat-sheet

**Last verified: 2026-06-07** · Source: <https://spark.lucko.me/docs>

Spark is the modern Minecraft profiler (replaces the deprecated Timings). Paper bundles it;
on other platforms install the Spark plugin/mod. Reports upload to a web viewer with flame
graphs you can link to.

## Diagnostic commands

| Command | Use |
|---|---|
| `/spark tps` | Current TPS + MSPT (tick duration). First thing to check. |
| `/spark health` | CPU, memory, TPS, MSPT percentiles, GC summary in one view. |
| `/spark profiler start` | Start the sampler. Reproduce the lag, then stop. |
| `/spark profiler start --timeout 300` | Auto-stop after 300 s and upload. |
| `/spark profiler start --alloc` | Memory **allocation** profiler — find allocation churn / GC pressure. |
| `/spark profiler start --thread *` | Profile all threads (default profiles the server thread). |
| `/spark profiler stop` | Stop and upload the active profile. |
| `/spark gc` | GC stats since boot (collector, pause counts, durations). |
| `/spark gcmonitor` | Live GC pause notifications. |
| `/spark heapsummary` | Heap object histogram (what's holding memory). |
| `/spark activity` | Recent server activity / ticks. |

## How to read a profile

1. **TPS < 20 or MSPT > 50** = the server can't finish ticks in time. Profile the **server
   thread**; the flame graph's widest frames are the cost.
2. Common heavy frames and their fix:
   - `*Entity*` / `tickEntities` → too many mobs/items: `entity-activation-range`,
     `mob-spawn-range`, `entity-per-chunk-save-limit`, per-player mob spawns.
   - `Hopper*` / `tryMoveItems` → hopper chains: hopper tuning, `transfer-cooldown`.
   - `ChunkGenerate` / `ChunkLoad` → exploration/world-gen: cap `player-max-chunk-load-rate`,
     pre-generate the world (Chunky), lower view-distance.
   - Redstone (`updateNeighbors`, `RedstoneWire`) → a lag machine/clock; find and fix the build.
   - Plugin package frames → a specific plugin; profile, then check that plugin's config/docs.
3. **GC pauses** dominating? Re-check heap sizing (`Xms==Xmx`, headroom), reduce entity/chunk
   load (less garbage), and confirm the GC choice (see `aikars-flags.md`).
4. **I/O stalls** (`saveChunk`, storage frames) → autosave storms or plugin storage on slow disk;
   stagger saves, move storage to faster disk, or switch LuckPerms to a local/remote SQL backend.

Always attach the Spark report URL when asking for help or recommending changes — it is the
evidence behind every tuning decision.
