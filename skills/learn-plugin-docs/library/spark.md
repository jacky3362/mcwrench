---
name: spark
slug: spark
source_url: https://modrinth.com/mod/spark
fetched_at: 2026-06-07T21:17:12.641Z
adapter: modrinth
---
# spark — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/spark>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Commands

## Usage
To install, just add the **.jar** file to your mods directory.

Information about [how to use commands](https://spark.lucko.me/docs/Command-Usage) can be found in the docs.

If you’d like help analysing a profiling report, or just want to chat, feel free to join us on [Discord](https://discord.gg/PAGT2fu).

## Details

## spark
spark is a performance profiler for Minecraft clients, servers and proxies.

_client: optional · server: optional_

**Categories:** utility
**Game versions:** 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11, 26.1, 26.1.1, 26.1.2
**Source:** https://github.com/lucko/spark
**Wiki:** https://spark.lucko.me/docs

---
![spark](https://spark.lucko.me/assets/banner.png)

#### spark is a performance profiler for Minecraft clients, servers and proxies.

#### Useful Links
* [**Website**](https://spark.lucko.me/) - browse the project homepage
* [**Documentation**](https://spark.lucko.me/docs) - read documentation and usage guides
* [**Downloads**](https://spark.lucko.me/download) - latest plugin/mod downloads

___

spark is proudly sponsored by [BisectHosting](https://bisecthosting.com/spark).​

BisectHosting are Minecraft server hosting experts, ready to help you create and host your very own server! They are a trusted and well-established hosting provider in the community, and provide an outstanding level of service that we are happy to recommend. There is a special 25% off discount available for spark users - click the link above to create your server today.

## What does spark do?

spark is made up of three separate components:

* **CPU Profiler**: Diagnose performance issues.
* **Memory Inspection**: Diagnose memory issues.
* **Server Health Reporting**: Keep track of overall server health.

### ⚡ CPU Profiler

spark's profiler can be used to diagnose performance issues: "lag", low tick rate, high CPU usage, etc.

It is:

* **Lightweight** - can be ran in production with minimal impact.
* **Easy to use** - no configuration or setup necessary, just install the plugin.
* **Quick to produce results** - running for just ~30 seconds is enough to produce useful insights into problematic areas for performance.
* **Customisable** - can be tuned to target specific threads, sample at a specific interval, record only "laggy" periods, etc
* **Highly readable** - simple tree structure lends itself to easy analysis and interpretation. The viewer can also apply deobfuscation mappings.

It works by sampling statistical data about the systems activity, and constructing a call graph based on this data. The call graph is then displayed in an online viewer for further analysis by the user.

There are two different profiler engines:
* Native `AsyncGetCallTrace` + `perf_events` - uses [async-profiler](https://github.com/jvm-profiling-tools/async-profiler) (*only available on Linux x86_64 systems*)
* Built-in Java `ThreadMXBean` - an improved version of the popular [WarmRoast profiler](https://github.com/sk89q/WarmRoast) by sk89q.

### ⚡ Memory Inspection

spark includes a number of tools which are useful for diagnosing memory issues with a server.

* **Heap Summary** - take & analyse a basic snapshot of the servers memory
  * A simple view of the JVM's heap, see memory usage and instance counts for each class
  * Not intended to be a full replacement of proper memory analysis tools. (see below)
* **Heap Dump** - take a full (HPROF) snapshot of the servers memory
  * Dumps (& optionally compresses) a full snapshot of JVM's heap.
  * This snapshot can then be inspected using conventional analysis tools.
* **GC Monitoring** - monitor garbage collection activity on the server
  * Allows the user to relate GC activity to game server hangs, and easily see how long they are taking & how much memory is being free'd.
  * Observe frequency/duration of young/old generation garbage collections to inform which GC tuning flags to use

### ⚡ Server Health Reporting

spark can report a number of metrics summarising the servers overall health.

These metrics include:

* **TPS** - ticks per second, to a more accurate degree indicated by the /tps command
* **Tick Durations** - how long each tick is taking (min, max and average)
* **CPU Usage** - how much of the CPU is being used by the server process, and by the overall system
* **Memory Usage** - how much memory is being used by the process
* **Disk Usage** - how much disk space is free/being used by the system

As well as providing tick rate averages, spark can also **monitor individual ticks** - sending a report whenever a single tick's duration exceeds a certain threshold. This can be used to identify trends and the nature of performance issues, relative to other system or game events.

## Guides
There are a few small "guides" available in the docs, covering the following topics.
* [The tick loop](https://spark.lucko.me/docs/guides/The-tick-loop)
* [Finding the cause of lag spikes](https://spark.lucko.me/docs/guides/Finding-lag-spikes)
