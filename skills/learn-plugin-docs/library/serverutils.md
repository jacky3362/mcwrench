---
name: ServerUtils
slug: serverutils
source_url: https://modrinth.com/mod/serverutils
fetched_at: 2026-06-07T21:22:57.743Z
adapter: modrinth
---
# ServerUtils — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/serverutils>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Permissions

## Commands and Permissions
Please refer to the [Wiki][wiki] page for an updated overview of the commands and permissions.

## Details

## ServerUtils
Reload plugins - Unload unused commands - PluginWatcher - Command/PluginInfo - Automatic Updater

_client: unsupported · server: required_

**Categories:** utility
**Game versions:** 1.17.1, 1.18, 1.18.1, 1.18.2, 1.19, 1.19.1, 1.19.2, 1.19.3
**Source:** https://github.com/FrankHeijden/ServerUtils
**Wiki:** https://github.com/FrankHeijden/ServerUtils/wiki

---
<!-- Variables (this block will not be visible in the readme -->
[spigot]: https://www.spigotmc.org/resources/79599/
[issues]: https://github.com/FrankHeijden/ServerUtils/issues
[wiki]: https://github.com/FrankHeijden/ServerUtils/wiki
[release]: https://github.com/FrankHeijden/ServerUtils/releases/latest
[license]: https://github.com/FrankHeijden/ServerUtils/blob/master/LICENSE
[bugReports]: https://github.com/FrankHeijden/ServerUtils/issues?q=is%3Aissue+is%3Aopen+label%3Abug
[reportBug]: https://github.com/FrankHeijden/ServerUtils/issues/new?labels=bug&template=bug.md
[featureRequests]: https://github.com/FrankHeijden/ServerUtils/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement
[requestFeature]: https://github.com/FrankHeijden/ServerUtils/issues/new?labels=enhancement&template=feature.md
[gradleInstall]: https://gradle.org/install/
[bStatsImg]: https://bstats.org/signatures/bukkit/ServerUtils.svg
[bStats]: https://bstats.org/plugin/bukkit/ServerUtils/7790
<!-- End of variables block -->

## ServerUtils
ServerUtils allows you to manage your plugins in-game.
Featuring reloading, unloading and loading of plugins from your plugins folder at runtime.
ServerUtils also has handy methods to lookup commands and plugins,
and provides you with handy information about them.

## Features
- Spigot/Paper, BungeeCord/Waterfall and Velocity compatible!
- Replaces (you can disable this) the /pl and /plugins (bukkit) commands with a customisable message plugins version. Adding the -v tag will add all versions to the output! Please note: the commands [plain]/bukkit:pl[/plain] and [plain]/bukkit:plugins[/plain] are not replaced, so you can still use those!
- A neat configurable /bpl plugins command for bungeecord! Use the -v flag to output the versions of the plugin and -m flag to also include modules in the plugin list (e.g. cmd_send.jar, cmd_server.jar etc.)
- Reload plugins on the fly with /su (load/reload/unload)plugin <plugin>! (BungeeCord: the main command is /bsu) Supports tabcomplete to quickly load new plugins from a jar in your plugins folder :)
- Watch plugin files for changes and automatically reload them! /su watchplugin!
- Unloading unused commands (spigot/paper): You can define in the config commands which will be unloaded by ServerUtils at boot. These commands will not be accessible anymore to any in-game player, nor the console.
- Reloading plugins and cleaning things up, like their PluginClassLoader and their recipes, recipe cleanup only works 1.12+, as below those versions a plugin is not associated with a recipe, so there's no way ServerUtils can know a recipe belongs to a plugin.
- ServerUtils can also restart / update itself, as a gimmick (:
- Reload commands.yml on the fly without performing a whole reload or restart on the server! Useful to quickly make aliases :) Please note: currently, this only works on 1.8 - 1.16.
- Reload the bukkit configuration on the fly without performing a whole reload or restart on the server! Please note: some configuration options may not be reloaded, please contact me if you think this is an error. Spigot/Paper configs are not reloaded, you can reload those with /paper reload or /spigot reload. Please note: currently, this only works on 1.8 - 1.16.
- Automatic updater. The plugin can be configured to automatically download & install new updates of the plugin on server boot or when updates are checked. This feature is disabled by default, but can be precisely configured per config.
Plugins can listen for changes! ServerUtils offers an event API which can notify plugins precisely what component has been loaded, enabled, disabled or unloaded -- all with a Pre and Post stage. Please take a look at the Bukkit and Bungee events!

## Load stages of a plugin (Spigot/Paper):
To understand the difference between loading / enabling / disabling / unloading of plugins, I will describe the load stages below:

### Fully loading a plugin (like at startup):
1. First, the plugin is loaded from a .jar file from the plugins directory. This is called loading of a plugin. The plugin is now "red" in the /plugin list, because it is not yet enabled.
2. At the second step, a plugin is enabled. This causes the plugin to spit all sorts of things in the console (which the developer found important to notify you about at startup), like database connections being setup etc.

### Fully disabling a plugin (like closing the server)
1. First the plugin is disabled. This causes the plugin to lose all of it's features, like commands, event listeners, etc. After disabling, the plugin is still loaded in memory, but it is seen "red" in the /plugin list.
2. Then the plugin will be unloaded from the memory, so the plugin won't appear at all anymore in the /plugin list.

## Disclaimer ‼️
Please note that reloading may not be compatible with each and every plugin! Plugins which depend on a reloaded plugin, are likely to be error-prone for reloading. Improper cleanup, or improper startup practises may break plugin (re/un)loading as well. Please be careful!

## Statistics

## Compiling ServerUtils
There are two ways to compile ServerUtils:

### 1. Installing gradle (recommended)
1. Make sure you have [gradle][gradleInstall] installed.
2. Run the project with `gradle build` to compile it with dependencies.

### 2. Using the wrapper
**Windows**: `gradlew.bat build`
<br>
**Linux/macOS**: `./gradlew build`

## Developer API

### Repository / Dependency
If you wish to use snapshot versions of ServerUtils, you can use the following repo:
```
https://repo.fvdh.dev/snapshots
```

#### Gradle:
```kotlin
repositories {
  compileOnly("net.frankheijden.serverutils:ServerUtils:VERSION")
}

dependencies {
  maven("https://repo.fvdh.dev/releases")
}
```

#### Maven:
```xml
<project>
  <repositories>
    <!-- ServerUtils repo -->
    <repository>
      <id>fvdh</id>
      <url>https://repo.fvdh.dev/releases</url>
    </repository>
  </repositories>
  
  <dependencies>
    <!-- ServerUtils dependency -->
    <dependency>
      <groupId>net.frankheijden.serverutils</groupId>
      <artifactId>ServerUtils</artifactId>
      <version>VERSION</version>
      <scope>provided</scope>
    </dependency>
  </dependencies>
</project>
```
