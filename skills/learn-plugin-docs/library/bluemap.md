---
name: BlueMap
slug: bluemap
source_url: https://modrinth.com/mod/bluemap
fetched_at: 2026-06-07T21:17:14.923Z
adapter: modrinth
---
# BlueMap — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/bluemap>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Overview

## What is BlueMap
BlueMap is a program that reads your Minecraft world files and generates not only a map, but also 3D-models of the whole surface.
With the web-app you then can look at those in your browser and basically view the world as if you were ingame! 
Or just look at it from far away to get an overview.

BlueMap comes as a Spigot/Paper or Sponge Plugin, as a Fabric or Forge-Mod and you can also use BlueMap without any Server
from the Command-Line as a standalone tool.

If installed as a Plugin/Mod, BlueMap **renders asynchronously** to your MinecraftServer-Thread. 
This means at no time will it block your server-thread directly. 
So as long as your CPU is not fully utilized, your server should not be slowed down while BlueMap is rendering.

## Details

## BlueMap
A Minecraft mapping tool that creates 3D models of your Minecraft worlds and displays them in a web viewer.

_client: unsupported · server: required_

**Categories:** utility
**Game versions:** 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11, 26.1, 26.1.1, 26.1.2
**Source:** https://github.com/BlueMap-Minecraft/BlueMap
**Wiki:** https://bluemap.bluecolored.de/wiki/

---

<center>

create **3D**-maps of your Minecraft worlds and display them in your browser  
**>> [DEMO MAP](https://bluecolored.de/bluemap) <<**

</center>

<br>
<br>

## Using BlueMap
You can download BlueMap from [here](https://github.com/BlueMap-Minecraft/BlueMap/releases).  
Read the [installation instructions](https://bluemap.bluecolored.de/wiki/getting-started/Installation.html) to get started!  
And [here](https://bluemap.bluecolored.de/3rdPartySupport.html) is a list of addons and tools that work with bluemap.

Here you can see how many servers are using BlueMap:

If you need help with the setup, feel free to join the [Discord-server](https://discord.gg/zmkyJa3), we'll be happy to help you there!

### Metrics and Webserver
**BlueMap uses [bStats](https://bstats.org/) and an own metrics-system and is hosting a web-server!**

Metrics are really useful to keep track of how the plugin is used and helps me stay motivated! Please turn them on :)

**bStats:** All data collected by bStats can be viewed here: https://bstats.org/plugin/bukkit/BlueMap/5912.

**own metrics:** Additionally to bStats, BlueMap is sending a super small report, containing only the implementation-name and the version of the BlueMap-plugin to my server. I do this, because there are some other implementations for BlueMap (Fabric, Forge, CLI) that are not supported by bStats. Here is an example report:
```json
{
    "implementation": "sponge",
    "version": "0.0.0"
}
```

All metrics can be disabled in the plugins config.

**web-server:** The web-server is a core-functionality of this plugin. So it is enabled by default but can be disabled in the plugin-config. By default the web-server is bound to all network-interfaces ('0.0.0.0') on port `8100` and is hosting the content of the `./bluemap/web/`-folder.

### Todo / planned features
[Here is a todo-list](https://github.com/orgs/BlueMap-Minecraft/projects/2) ordered by what i right now think is the priority, but might always change or be reordered at my discretion. *(I develop BlueMap in my free-time, so nothing here is a promise and there are no ETA's)*

### Issues / Suggestions
You found a bug, have another issue or a suggestion?
You are very welcome to to join the [Discord-server](https://discord.gg/zmkyJa3) and the [reddit](https://www.reddit.com/r/BlueMap) and share your thoughts!
