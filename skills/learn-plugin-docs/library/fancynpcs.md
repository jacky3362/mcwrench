---
name: FancyNpcs
slug: fancynpcs
source_url: https://modrinth.com/mod/fancynpcs
fetched_at: 2026-06-07T21:23:03.632Z
adapter: modrinth
---
# FancyNpcs — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/fancynpcs>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Installation

## Installation

Paper **1.21.4** or newer with **Java 25** (or higher) is required. Plugin should also work on **Paper** forks.

**Spigot** is **not** supported.

<br />

## Details

## FancyNpcs
Simple, lightweight and fast NPC plugin using packets

_client: unsupported · server: required_

**Categories:** decoration, utility
**Game versions:** 1.21.11-pre4, 1.21.11-pre5, 1.21.11-rc2, 1.21.11-rc3, 1.21.11, 26.1, 26.1.1, 26.1.2
**Source:** https://github.com/FancyInnovations/FancyPlugins
**Wiki:** https://fancyinnovations.com/docs/minecraft-plugins/fancynpcs

---
<div align="center">

![FancyNpcs Banner](https://fancyinnovations.com/logos-and-banners/fancynpcs-banner.png)

<br />

Simple, lightweight and feature-rich NPC plugin for **[Paper](https://papermc.io/software/paper)** (and **[Folia](https://papermc.io/software/folia)**) servers using packets.

</div>

## Features

With this plugin you can create NPCs with customizable properties like:

- **Type** (Cow, Pig, Player, etc.)
- **Skin** (from username or texture URL)
- **Glowing** (in all colors)
- **Attributes** (pose, visibility, variant, etc.)
- **Equipment** (eg. holding a diamond sword and wearing leather armor)
- **Interactions** (player commands, console commands, messages)
- ...and much more!

Check out **[images section](#images)** down below.

<br />

## Documentation

Official documentation is hosted **[here](https://fancyinnovations.com/docs/minecraft-plugins/fancynpcs)**. Quick reference:

- **[Getting started](https://fancyinnovations.com/docs/minecraft-plugins/fancynpcs/getting-started)**
- **[Command Reference](https://fancyinnovations.com/docs/minecraft-plugins/fancynpcs/commands/npc)**
- **[Using API](https://fancyinnovations.com/docs/minecraft-plugins/fancynpcs/api/getting-started)**

**Have more questions?** Feel free to ask them on our **[Discord](https://discord.gg/ZUgYCEJUEx)** server.

<br />

## Developer API

More information can be found in **[Documentation](https://fancyinnovations.com/docs/minecraft-plugins/fancynpcs/api/getting-started)** and **[Javadocs](https://repo.fancyinnovations.com/javadoc/releases/de/oliver/FancyNpcs/latest)**.

### Maven

```xml
<repository>
    <id>fancyinnovations-releases</id>
    <name>FancyInnovations Repository</name>
    <url>https://repo.fancyinnovations.com/releases</url>
</repository>
```

```xml
<dependency>
    <groupId>de.oliver</groupId>
    <artifactId>FancyNpcs</artifactId>
    <version>[VERSION]</version>
    <scope>provided</scope>
</dependency>
```

### Gradle

```groovy
repositories {
    maven("https://repo.fancyinnovations.com/releases")
}

dependencies {
    compileOnly("de.oliver:FancyNpcs:[VERSION]")
}
```

<br />

## Images

Images showcasing the plugin, sent to us by our community.

![Screenshot 1](https://github.com/FancyMcPlugins/FancyNpcs/blob/main/images/screenshots/niceron1.jpeg?raw=true)  
<sup>Provided by [Explorer's Eden](https://explorerseden.eu/)</sup>

![Screenshot 2](https://github.com/FancyMcPlugins/FancyNpcs/blob/main/images/screenshots/niceron2.jpeg?raw=true)  
<sup>Provided by [Explorer's Eden](https://explorerseden.eu/)</sup>

![Screenshot 3](https://github.com/FancyMcPlugins/FancyNpcs/blob/main/images/screenshots/niceron3.jpeg?raw=true)  
<sup>Provided by [Explorer's Eden](https://explorerseden.eu/)</sup>

![Screenshot 4](https://github.com/FancyMcPlugins/FancyNpcs/blob/main/images/screenshots/dave1.jpeg?raw=true)  
<sup>Provided by [Beacon's Quest](https://www.beaconsquest.net/)</sup>

![Screenshot 5](https://github.com/FancyMcPlugins/FancyNpcs/blob/main/images/screenshots/oliver1.jpeg?raw=true)  
<sup>Provided by [@OliverSchlueter](https://github.com/OliverSchlueter)</sup>

![Screenshot 6](https://github.com/FancyMcPlugins/FancyNpcs/blob/main/images/screenshots/oliver2.jpeg?raw=true)  
<sup>Provided by [@OliverSchlueter](https://github.com/OliverSchlueter)</sup>

![Screenshot 7](https://github.com/FancyMcPlugins/FancyNpcs/blob/main/images/screenshots/grabsky1.jpeg?raw=true)  
<sup>Provided by [@Grabsky](https://github.com/Grabsky)</sup>

## Data collection

This plugin collects anonymous usage data to help us understand how the plugin is being used and to improve it. All collected data by all servers is aggregated, we don't store any IP addresses, server names, or any other information that could be used to identify a specific server or user.
Read more about that topic (used platforms, how to opt-out, list of metrics ...) in the [documentation](https://fancyinnovations.com/docs/minecraft-plugins/data-collection).
