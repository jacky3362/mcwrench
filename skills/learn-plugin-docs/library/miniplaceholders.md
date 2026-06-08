---
name: MiniPlaceholders
slug: miniplaceholders
source_url: https://modrinth.com/mod/miniplaceholders
fetched_at: 2026-06-07T21:22:58.453Z
adapter: modrinth
---
# MiniPlaceholders — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/miniplaceholders>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Commands

## User Usage

Check our [user usage wiki](https://miniplaceholders.github.io/docs/user-guide/User-Getting-Started)

## Details

## MiniPlaceholders
MiniMessage Component-based Placeholders API for Minecraft Platforms

_client: unknown · server: unknown_

**Categories:** decoration, library, utility
**Game versions:** 1.21.5, 1.21.6, 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11, 26.1
**Source:** https://github.com/MiniPlaceholders/MiniPlaceholders/
**Wiki:** https://miniplaceholders.github.io/docs/category/user-guide

---

## MiniPlaceholders

MiniMessage Component-based Placeholders API for Minecraft Platforms

## Compatibility
- Paper 1.21+
- Velocity 3.4.0+
- Fabric 1.21.4+
- Sponge API 12+

## API

Check the available [Javadocs](https://javadoc.io/doc/io.github.miniplaceholders/miniplaceholders-api)

Or check the [Developer Wiki](https://miniplaceholders.github.io/docs/developer-guide/Developer-Getting-Started)

### Java
```java
class Main {
    public static void registerExpansion() {
        final Expansion expansion = Expansion.builder("my-expansion")
                .audiencePlaceholder(Player.class, "name", (player, ctx, queue) -> {
                    return Tag.selfClosingInserting(player.getName());
                })
                .globalPlaceholder("tps", (ctx, queue) ->
                    Tag.selfClosingInserting(Component.text(Bukkit.getTps()[0]))
                ).build;
        
        expansion.register();
        
        Player player;
        final TagResolver playerResolver = MiniPlaceholders.audiencePlaceholders();
        player.sendMessage(miniMessage().deserialize("Player Name: <my-expansion_name>", player, playerResolver));
    }
}
```

### Kotlin
```kotlin
fun register() {
    val expansion = expansion("my-expansion") {
        audience<Player>("name") { aud, _, _ -> aud.getName().asClosingTag() }
        global("tps") { _, _ -> Component.text(Bukkit.getTps()[0]).asInsertingTag() }
    }
    
    expansion.register()
    
    val player: Player
    val playerResolver = MiniPlaceholders.audiencePlaceholders()
    player.sendMessage(miniMessage().deserialize("Player Name: <my-expansion_name>", player, playerResolver))
}
```
