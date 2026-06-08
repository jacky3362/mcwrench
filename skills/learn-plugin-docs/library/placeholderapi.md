---
name: PlaceholderAPI
slug: placeholderapi
source_url: https://modrinth.com/mod/placeholderapi
fetched_at: 2026-06-07T21:12:55.225Z
adapter: modrinth
---
# PlaceholderAPI — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/placeholderapi>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Installation

## Download placeholders: /papi ecloud
check_updates: true
cloud_enabled: true
cloud_sorting: "name"
cloud_allow_unverified_expansions: false
boolean:
  'true': 'yes'
  'false': 'no'
date_format: MM/dd/yy HH:mm:ss
debug: false

```

![Permissions](https://raw.githubusercontent.com/PlaceholderAPI/PlaceholderAPI/refs/heads/assets/dark_mode/PERMISSIONS.png)
```yaml

permissions:
  placeholderapi.*:
    description: "Ability to use all PAPI commands"
    children:
      placeholderapi.admin: true
      placeholderapi.ecloud.*: true
  placeholderapi.admin:
    description: "Ability to use all PAPI commands"
    children:
      placeholderapi.help: true
      placeholderapi.info: true
      placeholderapi.list: true
      placeholderapi.parse: true
      placeholderapi.reload: true
      placeholderapi.version: true
      placeholderapi.register: true
      placeholderapi.unregister: true
      placeholderapi.updatenotify: true
  placeholderapi.ecloud.*:
    description: "Ability to use all PAPI ecloud commands"
    children:
      placeholderapi.ecloud: true
      placeholderapi.ecloud.info: true
      placeholderapi.ecloud.list: true
      placeholderapi.ecloud.clear: true
      placeholderapi.ecloud.status: true
      placeholderapi.ecloud.update: true
      placeholderapi.ecloud.refresh: true
      placeholderapi.ecloud.download: true
      placeholderapi.ecloud.placeholders: true
  placeholderapi.help:
    default: "op"
    description: "Allows you to view the list of PAPI commands"
  placeholderapi.info:
    default: "op"
    description: "Allows you to view expansion information"
  placeholderapi.list:
    default: "op"
    description: "Allows you to list active expansions"
  placeholderapi.ecloud:
    default: "op"
    description: "Allows you to access PAPI eCloud"
  placeholderapi.parse:
    default: "op"
    description: "Allows you to parse placeholders"
  placeholderapi.reload:
    default: "op"
    description: "Allows you to reload PAPI and its configuration"
  placeholderapi.version:
    default: "op"
    description: "Allows you to view the version of PAPI installed"
  placeholderapi.register:
    default: "op"
    description: "Allows you to register expansions"
  placeholderapi.unregister:
    default: "op"
    description: "Allows you to unregister expansions"
  placeholderapi.updatenotify:
    default: "op"
    description: "Notifies you when there is a PAPI update"
  placeholderapi.ecloud.info:
    default: "op"
    description: "Allows you to view cloud expansion information"
  placeholderapi.ecloud.list:
    default: "op"
    description: "Allows you to list eCloud expansions"
  placeholderapi.ecloud.clear:
    default: "op"
    description: "Allows you to clear the local eCloud expansion cache"
  placeholderapi.ecloud.status:
    default: "op"
    description: "Allows you to view the status of eCloud expansions"
  placeholderapi.ecloud.update:
    default: "op"
    description: "Allows you to update registered eCloud expansions"
  placeholderapi.ecloud.refresh:
    default: "op"
    description: "Allows you to refresh the local eCloud expansion cache"
  placeholderapi.ecloud.download:
    default: "op"
    description: "Allows you to download an expansion from the eCloud"
  placeholderapi.ecloud.placeholders:
    default: "op"
    description: "Allows you to view the placeholders of a eCloud expansion"
```

![Commands](https://raw.githubusercontent.com/PlaceholderAPI/PlaceholderAPI/refs/heads/assets/dark_mode/COMMANDS.png)

**Parse Commands**

`/papi bcparse <player|--null|me> <string>`

`/papi cmdparse <player|me> <string>`

`/papi parse <player|--null|me> <string>`

`/papi parserel <player> <player> <string>`

**eCloud Commands**

`/papi ecloud status`

`/papi ecloud clear`

`/papi ecloud download <expansion> [version]`

`/papi ecloud update <expansion/all>`

`/papi ecloud info <expansion> [version]`

`/papi ecloud list <all|<author>|installed> [page]`

`/papi ecloud placeholders <expansion>`

`/papi ecloud refresh`

**Expansion Commands**

`/papi info <expansion>`

`/papi list`

`/papi register <jar file>`

`/papi unregister <jar file>`

**Utility Commands**

`/papi dump`

`/papi reload`

`/papi version`
<center>
  
  **Some Useful Links**
  
[Plugins using PAPI](https://wiki.placeholderapi.com/users/plugins-using-placeholderapi/) - [API Usage](https://wiki.placeholderapi.com/developers/using-placeholderapi/) - [Placeholder List](https://wiki.placeholderapi.com/users/placeholder-list/) - [Wiki](https://wiki.placeholderapi.com/)

If you enjoy this **completely free** and **powerful** resource,
please be kind enough to leave a like and review!

This plugin utilizes bStats to collect anonymous statistics
![https://bstats.org/signatures/bukkit/PlaceholderAPI.svg](https://bstats.org/signatures/bukkit/PlaceholderAPI.svg)
[https://bstats.org/plugin/bukkit/PlaceholderAPI](https://bstats.org/plugin/bukkit/PlaceholderAPI)</center>

## Placeholders

## No placeholders are provided with this plugin by default.

## Details

## PlaceholderAPI
A resource that allows information from your favourite plugins be shown practically anywhere!

_client: unsupported · server: required_

**Categories:** utility
**Game versions:** 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11, 26.1, 26.1.1, 26.1.2
**Source:** https://github.com/PlaceholderAPI/PlaceholderAPI
**Wiki:** https://wiki.placeholderapi.com/developers/creating-a-placeholderexpansion/

---
<center>
  
  
![Header](https://raw.githubusercontent.com/PlaceholderAPI/PlaceholderAPI/refs/heads/assets/dark_mode/HEADER.png)
  
![Introduction](https://raw.githubusercontent.com/PlaceholderAPI/PlaceholderAPI/refs/heads/assets/dark_mode/ABOUT.png)

**PlaceholderAPI** is a plugin for Spigot servers that allows server owners to display information from various plugins with a uniform format.

Support for specific plugins are provided either by the plugin itself or through expansions. The expansions may be downloaded in-game through the PAPI Expansion Cloud. There are currently over 230+ expansions that support a wide variety of plugins, such as Essentials, Factions, LuckPerms, and Vault. If you're a developer and you want to add support for PlaceholderAPI in your plugin please head to our [API Usage](https://github.com/placeholderapi/placeholderapi/wiki/hook-into-placeholderapi) page for more information.

**PlaceholderAPI** has been downloaded over 2,000,000 times and is currently used concurrently on over 50,000 servers, which makes it a must-have for a server of any type or scale.

![Getting Started](https://raw.githubusercontent.com/PlaceholderAPI/PlaceholderAPI/refs/heads/assets/dark_mode/GETTING_STARTED.png)
<center>
  
  ![Steps to install](https://raw.githubusercontent.com/PlaceholderAPI/PlaceholderAPI/refs/heads/assets/dark_mode/STEPS.png)
</center>

![Configuration](https://raw.githubusercontent.com/PlaceholderAPI/PlaceholderAPI/refs/heads/assets/dark_mode/CONFIG.png)

The `config.yml` contains the core plugin customization settings as well as a section specifically for expansions that wish to add configurable options too.

Any settings an expansion may allow you to change will be added to the `config.yml` when that specific expansion is loaded.

```yaml

## PlaceholderAPI

## Version: 2.11.4

## Created by: extended_clip

## Contributors: https://github.com/PlaceholderAPI/PlaceholderAPI/graphs/contributors

## Issues: https://github.com/PlaceholderAPI/PlaceholderAPI/issues

## Expansions: https://ecloud.placeholderapi.com/expansions/all/

## Wiki: https://github.com/PlaceholderAPI/PlaceholderAPI/wiki

## Discord: https://helpch.at/discord
