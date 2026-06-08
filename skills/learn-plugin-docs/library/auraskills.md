---
name: AuraSkills
slug: auraskills
source_url: https://modrinth.com/mod/auraskills
fetched_at: 2026-06-07T21:35:54.941Z
adapter: modrinth
---
# AuraSkills — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/auraskills>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Installation

## Installation
How to install the plugin:
- Place the jar you downloaded into your plugins folder
- Restart the server (Do not reload)

## Dependencies

## Dependencies

- AuraSkills has no required plugin dependencies, but Java 17 is required.
- ProtocolLib is an optional dependency.

## Details

## AuraSkills
The ultra-versatile RPG skills plugin. Formerly known as Aurelium Skills.

_client: unsupported · server: required_

**Categories:** adventure, game-mechanics
**Game versions:** 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11, 26.1, 26.1.1, 26.1.2
**Source:** https://github.com/Archy-X/AuraSkills
**Wiki:** https://wiki.aurelium.dev/auraskills/

---
![AuraSkills title banner](https://i.imgur.com/6fX2V2P.png)

<p align="center">
  <a href="https://wiki.aurelium.dev/auraskills">
  </a>
  <a href="https://discord.gg/Bh2EZfB">
  </a>
  <a href="https://github.com/Archy-X/AuraSkills">
  </a>
</p>

**Dev builds are available [here](https://aurelium.dev/auraskills/download?channel=dev)**

![Plugin info](https://i.imgur.com/SVXK0kV.png)
![Gameplay info](https://i.imgur.com/hlWT5Tg.png)

![Feature list](https://i.imgur.com/zfDJa3c.png)

- [**Rewards**](https://wiki.aurelium.dev/auraskills/rewards) - Add fully custom rewards, like executing commands and giving items on level up.
- [**Menus**](https://wiki.aurelium.dev/auraskills/menus) - Intuitive and fully configurable menus show players everything they need to know about skills - accessed using /skills.
- [**Sources**](https://wiki.aurelium.dev/auraskills/sources) - Customize XP sources for each skill, with support for custom blocks and items.
- [**Loot**](https://wiki.aurelium.dev/auraskills/loot) - Customize loot from any specific block and mob XP source, with support for any item and commands.
- [**Stat Modifiers**](https://wiki.aurelium.dev/auraskills/stats/stat-modifiers) - Modify any stat value with commands or while using custom items or armor.
- [**XP Multipliers**](https://wiki.aurelium.dev/auraskills/skills/xp-multipliers) - Multiply skill XP with the power of permissions or link multipliers to items.
- [**Messages**](https://wiki.aurelium.dev/auraskills/messages) - Pre-translated messages for 15+ languages that are fully configurable and user-selectable.
- [**Item Requirements**](https://wiki.aurelium.dev/auraskills/skills/item-requirements) - Add skill level requirements to use a specific item or all items of a type.
- [**Placeholders**](https://wiki.aurelium.dev/auraskills/placeholders) - Numerous provided PlaceholderAPI placeholders, plus widespread placeholder support within the plugin.
- [**XP Requirements**](https://wiki.aurelium.dev/auraskills/skills/xp-requirements) - Configure XP required to level up for each skill with full equation support.
- [**Developer API**](https://wiki.aurelium.dev/auraskills/api) - A comprehensive developer API with support for adding custom skills, stats, and abilities.
- [**SQL**](https://wiki.aurelium.dev/auraskills/main-config/sql) - Support for database storage with MySQL for higher performance and cross-server syncing.
- Mana - A mana system used by mana abilities and interactable with commands and placeholders.
- Action/Boss Bar - Configurable action and boss bars for displaying health, mana, and when XP is gained.
- Leaderboards - Skill leaderboards and rankings, including power level and skill average.
- Backups - Automatic backups to protect your user data in case of an emergency.

## Supported plugins

- PlaceholderAPI - View the [list of placeholders](https://wiki.aurelium.dev/auraskills/placeholders), no e-cloud download needed
- Vault - Money level up rewards
- WorldGuard (1.13+) - Disable XP gain in certain regions, use the aureliumskills-xp-- gain flag
- Holographic Displays and DecentHolograms - Damage indicators with critical hit colors
- LuckPerms - Permission rewards
- Eco series

## Incompatibilities
AuraSkills does not support or is not compatible with the following server software:
- CraftBukkit - Action bar will not work
- Modded hybrid servers (Mohist, Magma, CatServer) - Modded environments do not work well with Bukkit plugins in general

## Support Discord
Click [here](https://discord.gg/Bh2EZfB) to join the Discord server for support, suggestions, announcements, and to join the community!

## Wiki and Documentation
Click [here](https://wiki.aurelium.dev/auraskills) to view the Wiki and Documentation

You can find info about Configuration, Messages, Stats, Commands, Permissions, Rewards, and Placeholders on the Wiki.

## Messages and language
Change your personal language using /skills lang [language]. Change the default language using the default_language option in config.yml and restarting the server.

Help translate the plugin on [Crowdin](https://crowdin.com/project/aureliumskills), if you don't see your language ask on the [Discord](https://discord.gg/Bh2EZfB) server for it to be added.
