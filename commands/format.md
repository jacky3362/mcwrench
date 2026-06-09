---
description: Convert Minecraft text between MiniMessage and legacy ampersand color (MOTD, prefixes, holograms).
argument-hint: "--to-legacy | --to-mm | --preview \"<text>\""
allowed-tools: Bash, Read, Skill
---

Convert color formatting with the server-branding helper. Run:

`node "${CLAUDE_PLUGIN_ROOT}/skills/server-branding/scripts/format.mjs" $ARGUMENTS`

- `--to-legacy "<gradient:#a:#b>text</gradient>"` expands a MiniMessage gradient to per-character
  `&#RRGGBB` (for ServerListPlus, vanilla `server.properties`, DecentHolograms).
- `--to-mm "&aHello &#ff0000World"` does a naive legacy to MiniMessage conversion.
- `--preview "<...>"` prints the resolved colors as a sanity check.

Conversions are lossy for hover/click (no legacy equivalent). For which target wants which format,
see `skills/server-branding/references/format-target-matrix.md`.
