---
name: ProtectionStones
slug: protectionstones
source_url: https://modrinth.com/mod/protectionstones
fetched_at: 2026-06-07T21:35:56.724Z
adapter: modrinth
---
# ProtectionStones — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/protectionstones>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Installation

### Requirements:

- WorldGuard 7+
- WorldEdit 7+
- Vault (Optional)
- PlaceholderAPI (Optional)
- Spigot or Paper 1.21.10+

## Installation

Make sure you first have the requirements listed above.

Simply add the plugin to the plugins folder, and it will generate the default configuration.

By default, no permissions are given to players, so you have to add them explicitly.

## Configuration

### Default Config Files

View the default configuration [here](https://espidev.gitbook.io/protectionstones/configuration).

## Permissions

### Permissions

View the permission list [here](https://espidev.gitbook.io/protectionstones/permissions).

## Commands

## Usage

Get a protection block with the /ps get command. Simply placing it down will create a protection region centered around the block. Breaking the block will remove the region.

### Commands

View the list of commands [here](https://espidev.gitbook.io/protectionstones/commands).

## Placeholders

### Placeholders

ProtectionStones has support for PlaceholderAPI! View them [here](https://espidev.gitbook.io/protectionstones/placeholders).

## Details

## ProtectionStones
A user friendly server plugin for protecting regions!

_client: unsupported · server: required_

**Categories:** game-mechanics, utility
**Game versions:** 1.20.6, 1.21, 1.21.10
**Source:** https://github.com/espidev/ProtectionStones
**Wiki:** https://espidev.gitbook.io/protectionstones

---
_Ever needed an easy, yet powerful way to prevent grief, and protect a certain area?_

This plugin allows players to protect land using a block that they place down. It creates a WorldGuard region at a set radius (configurable) around where the block is placed. The plugin also allows players to add and remove people to the region, as well as set flags (defined in the config).

### Adding new blocks

To add new protection blocks, go into `plugins/ProtectionStones/blocks`, and copy and paste the default block1.toml file and rename it (ex. block2.toml). Then, you have to change the "type" and "alias" fields in the new block config, since there cannot be duplicates.

### Configuring flags

Flags allow for customization of region behaviour. ProtectionStones uses WorldGuard flags, meaning that WorldGuard is actually doing the protecting, not ProtectionStones. You can view the list of WorldGuard flags here.

It is also possible to use other plugins that add flags to WorldGuard, such as WorldGuard Extra Flags and use them in ProtectionStones.

### Other Recommendations

WorldGuard by default prevents hoppers from going between regions, and prevents hopper minecarts from working. I recommend setting `ignore-hopper-item-move-events` in WorldGuard's config to `true` to fix this.

If you want to protect against water and lava flow into regions, you can set `high-frequency-flags` and `protect-against-liquid-flow` to true in WorldGuard's config.

View the WorldGuard config [here](https://worldguard.enginehub.org/en/latest/config/).

### Translations

View user contributed translations [here](https://espidev.gitbook.io/protectionstones/translations).

Contact me on the Discord, or file a GitHub issue if you would like to contribute your translation to the page! Thank you!

### FAQ

View the FAQ [here](https://espidev.gitbook.io/protectionstones/faq).
