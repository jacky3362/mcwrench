# MiniMessage cheatsheet (validated 2026-06-08)

Build MiniMessage strings **only** from the tags below — do not invent tags. MiniMessage is parsed
by **Kyori Adventure** (bundled in Paper/Velocity); a **plugin must deserialize it**, so vanilla and
non-Adventure plugins never render these tags (they show literally). Source: the official Adventure
MiniMessage format docs.

## Colors
- 16 named colors: `<black> <dark_blue> <dark_green> <dark_aqua> <dark_red> <dark_purple> <gold>
  <gray> <dark_gray> <blue> <green> <aqua> <red> <light_purple> <yellow> <white>`.
- Hex: `<#RRGGBB>` or verbose `<color:#RRGGBB>` (and `<color:red>`).
- Shadow (1.21.4+ clients): `<shadow:#RRGGBB>` / `<shadow:#RRGGBB:alpha>`.

## Gradients & rainbow
- `<gradient:#a:#b>text</gradient>` — 2+ stops: `<gradient:#a:#b:#c>`; optional phase
  `<gradient:#a:#b:0.5>` (phase is the **last** numeric arg, range -1..1).
- `<rainbow>text</rainbow>`; reversed `<rainbow:!>`; with phase `<rainbow:0.5>` / `<rainbow:!0.5>`.
- `<transition:#a:#b:phase>` — a single solid color sampled along a:b at `phase`.

## Decorations
- `<bold>` (alias `<b>`), `<italic>` (`<i>`/`<em>`), `<underlined>` (`<u>`),
  `<strikethrough>` (`<st>`), `<obfuscated>` (`<obf>`).
- Negate: `<!bold>` or `<bold:false>`.

## Structure
- `<reset>` clears all formatting. Close any tag with `</tag>`; self-close with `<tag/>`.
- New line: `<newline>` or `<br>`.
- Escape a literal `<` as `\<`. Tag names are case-insensitive; `'` and `"` are interchangeable
  inside tag arguments.

## Interactivity (no legacy equivalent — lossy when converting to legacy)
- `<hover:show_text:'<red>tooltip'>text</hover>` (also `show_item`, `show_entity`).
- `<click:ACTION:'value'>text</click>` where ACTION is one of: `run_command`, `suggest_command`,
  `open_url`, `copy_to_clipboard`, `change_page`, `open_file`.

## Advanced (rarely needed for branding)
`<key:…>` `<lang:…>` (alias `<tr:…>`) `<insert:…>` `<font:…>` `<selector:…>` `<score:…>` `<nbt:…>`.

## Validated examples
```
# MOTD (MiniMOTD: two SEPARATE keys, not \n)
line1="<gradient:#FF6B6B:#FFD93D>✦ Aether Network ✦</gradient>"
line2="<gray>Now on <#5EE7DF>26.1.x</#5EE7DF> <dark_gray>•</dark_gray> <green>0/100 online"

# Rank prefix
<gradient:#FFD700:#FFA500><bold>MVP</bold></gradient> <gray>|</gray>

# Clickable + hover (chat broadcast)
<green>Welcome! <click:run_command:'/spawn'><hover:show_text:'<yellow>Teleport to spawn'><gold><underlined>[Spawn]</underlined></gold></hover></click>
```
