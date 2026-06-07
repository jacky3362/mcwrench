# Aikar's flags & heap sizing

**Last verified: 2026-06-07** · Source: <https://docs.papermc.io/paper/aikars-flags/>

## The flags (verbatim from the official PaperMC page, unchanged as of 2026-06-07)

```
java -Xms10G -Xmx10G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 \
  -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 \
  -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true \
  -jar paper.jar --nogui
```

Set `Xms` and `Xmx` to the **same** value (here `10G`). These flags are G1GC-tuned.

## Heap sizing rules

- **`Xms == Xmx`** always. Pre-committing the heap avoids resize pauses.
- Leave **1–1.5 GB** for the OS + JVM native memory (threads, metaspace, direct buffers, mmap)
  *beyond* the heap. On a 12 GB box, give the heap ~10 GB.
- **Shared/host caveat (official):** *"Do not allocate all of your available memory on a shared
  host!"* Reduce `Xmx`/`Xms` by ~1000–1500 MB for overhead.
- For heaps **≥12 GB**, bump: `G1NewSizePercent=40`, `G1MaxNewSizePercent=50`,
  `G1HeapRegionSize=16M`, `G1ReservePercent=15`, `InitiatingHeapOccupancyPercent=20`.

## Java version — important (2026)

- **Paper 26.1+ requires Java 25.** Earlier Java will not launch it.
- The official PaperMC Aikar's-flags page contains **no** Java-25 warning. The "don't use Aikar's
  flags on Java 25 / MC 26.1+" advice comes from **hosting providers / community** (e.g.
  WinterNode), not PaperMC. Rationale: Aikar's flags are G1GC-specific, while Java 25 ships
  **Generational ZGC** as a strong option; the `G1*` flags do nothing for ZGC.
- **Practical stance:** Aikar's/G1 is the proven default and works on Java 25. If you choose to
  try **Generational ZGC** instead (`-XX:+UseZGC -XX:+ZGenerational` plus basic flags like
  `-Xms`/`-Xmx`, `-XX:+AlwaysPreTouch`, `-XX:+DisableExplicitGC`), use a **clean ZGC flag set** —
  do **not** append the `G1*` flags. Benchmark with Spark before committing. Attribute the caveat
  to community sources, not PaperMC.

## Container footgun

- `-XX:+AlwaysPreTouch` touches every heap page at boot. On a memory-limited container
  (Pterodactyl/Pelican) this can fail with **"Cannot allocate memory"**. Remove it on
  constrained hosts, or lower `Xmx`.

## What to recommend in an audit

1. Confirm Java 25 for Paper 26.1+.
2. `Xms == Xmx`, with host headroom left.
3. Aikar's/G1 set as default; only suggest ZGC if the user wants to benchmark it, and then a
   clean ZGC set — never mixed.
4. Strip `AlwaysPreTouch` if the host OOMs at boot.
