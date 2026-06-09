---
description: Convert Minecraft text between MiniMessage and legacy ampersand color (MOTD, prefixes, holograms).
---

# Convert MiniMessage and legacy color

1. Convert with the server-branding helper. Run:
   `node skills/server-branding/scripts/format.mjs --to-legacy | --to-mm | --preview "<text>"`
   - `--to-legacy "<gradient:#a:#b>text</gradient>"` expands a gradient to per-character `&#RRGGBB`
     (for ServerListPlus, vanilla `server.properties`, DecentHolograms).
   - `--to-mm "&aHello &#ff0000World"` does a naive legacy to MiniMessage conversion.
   - `--preview "<...>"` prints the resolved colors as a sanity check.
2. Note that hover/click have no legacy equivalent (lossy). For which target wants which format, see
   `skills/server-branding/references/format-target-matrix.md`.
