---
name: FastAsyncWorldEdit
slug: fastasyncworldedit
source_url: https://modrinth.com/mod/fastasyncworldedit
fetched_at: 2026-06-07T21:35:54.648Z
adapter: modrinth
---
# FastAsyncWorldEdit — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/fastasyncworldedit>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Overview

## What is FAWE and why should I use it?

FAWE is designed for efficient world editing.
* Simple to set up and use
* Extremely configurable
* Uses minimal CPU/Memory
* Safe for many players to use
* Insanely fast when using the slowest mode

FastAsyncWorldEdit is a fork of WorldEdit that has huge speed and memory improvements and considerably more features.  
If you use other plugins that depend on WorldEdit, simply having FAWE installed will boost their performance.

## Details

## FastAsyncWorldEdit
Blazingly fast world manipulation for artists, builders and everyone else

_client: unsupported · server: required_

**Categories:** management, utility
**Game versions:** 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11, 26.1, 26.1.1, 26.1.2
**Source:** https://github.com/IntellectualSites/FastAsyncWorldEdit
**Wiki:** https://intellectualsites.github.io/fastasyncworldedit-documentation/

---

## FastAsyncWorldEdit

## Support

If you have any questions, or need help with something, please join our Discord server:

## Downloads

Releases are available either on Modrinth or on CurseForge.
- [Modrinth](https://modrinth.com/plugin/fastasyncworldedit/)
- [CurseForge](https://dev.bukkit.org/projects/fawe)

### Experimental Builds
- [Jenkins](https://ci.athion.net/job/FastAsyncWorldEdit/)

## Features

* Over 200 Commands
* Style and translate messages and commands
* (No setup required) Clipboard web integration (Clipboard)
* Unlimited //undo per world history, instant lookups/rollback, and cross-server clipboards
* Advanced per-player limits (entity, tiles, memory, changes, iterations, regions, inventory)
* Visualization, targeting modes/masks, and scroll actions
* Adds lots of powerful new //brushes and //tools.
* Adds a lot more mask functionality. (new mask syntax, patterns, expressions, source masks)
* Adds a lot more pattern functionality. (a lot of new pattern syntax and patterns)
* Adds edit transforms (apply transforms to a source, e.g., on //paste)
* Adds support for new formats (e.g. Structure Blocks)
* Instant copying of arbitrary size with `//lazycopy`
* Auto repair partially corrupt schematic files
* Biome mixing, in-game world painting, dynamic view distance, vanilla CUI, off-axis rotation, image importing, cave generation,
  multi-clipboards, interactive messages, schematic visualization, lag prevention, persistent brushes, and A LOT MORE

### Performance

There are several placement modes, each supporting higher throughput than the previous. All editing is processed
asynchronously, with
certain tasks being broken up on the main thread. The default mode is chunk placement.
* Blocks (Bukkit-API) - Only used if chunk placement isn't supported. Still faster than any other plugin on Spigot.
* Chunks (NMS) - Places entire chunk sections
* World (CFI) - Used to generate new worlds/regions

### Protection Plugins

The following plugins are supported with Bukkit:
* [WorldGuard](https://dev.bukkit.org/projects/worldguard)
* [PlotSquared](https://www.spigotmc.org/resources/77506/)

### Logging and Rollback

By default you can use `//inspect` and `//history rollback` to search and restore changes. To reduce disk usage, increase the
compression level and buffer size. To bypass logging, use `//fast`.

### Developer API

FAWE maintains API compatibility with WorldEdit, so you can use the normal WorldEdit API asynchronously.
FAWE also has some asynchronous wrappers for the Bukkit API.
The wiki has examples for various things like reading NBT, modifying world files, pasting schematics, splitting up tasks, lighting, etc.
If you need help with anything, hop on [Discord](https://discord.gg/intellectualsites).

## Documentation

* [Wiki](https://intellectualsites.github.io/fastasyncworldedit-documentation/)
* [Javadocs](https://intellectualsites.github.io/fastasyncworldedit-javadocs/)

## Contributing

Want to add new features to FastAsyncWorldEdit or fix bugs yourself? You can get the game running, with FastAsyncWorldEdit, from the code here:

For additional information about compiling FastAsyncWorldEdit, read the [compiling documentation](https://github.com/IntellectualSites/FastAsyncWorldEdit/blob/main/COMPILING.adoc).

## Special thanks

<br>
The creators of IntelliJ IDEA support us with their Open Source Licenses.

<a href="https://yourkit.com/"><img src="https://www.yourkit.com/images/yklogo.png" width="200">
</a>

Thank you to YourKit for supporting our product by providing us with their innovative and intelligent tools
for monitoring and profiling Java and .NET applications.
YourKit is the creator of [YourKit Java Profiler](https://www.yourkit.com/java/profiler/), [YourKit .NET Profiler](https://www.yourkit.com/.net/profiler/), and [YourKit YouMonitor](https://www.yourkit.com/youmonitor/).
