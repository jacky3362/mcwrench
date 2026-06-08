# Format-target matrix (verified 2026-06-08)

The single most common branding mistake is assuming MiniMessage works everywhere. It does not.
**Emit the format the target actually parses.** When unsure which plugin the user runs, give both a
MiniMessage and a legacy `&`/`&#RRGGBB` version.

| Target | Format to emit | Notes |
|---|---|---|
| **Velocity** `motd` (velocity.toml) | **MiniMessage** | also accepts `§`/JSON; gradients OK |
| **MiniMOTD** (`main.conf`) | **MiniMessage** | two lines = separate `line1` / `line2` keys, **not** `\n` |
| **ServerListPlus** | **legacy `&` + `&#RRGGBB`** | NOT MiniMessage |
| vanilla `server.properties motd` | **legacy `§` only** | no `&`, no MiniMessage, no native gradient; **≤59 chars/line**; 2 lines unreliable → use MiniMOTD or a proxy |
| **TAB** (tablist / scoreboard / nametag) | **MiniMessage** | also `&`/hex; can mix MM + legacy |
| **EssentialsX** chat | **legacy `&`/`§` + `&#RRGGBB`** by default | MiniMessage only if the string is prefixed `MM\|\|` (EssentialsX 2.21.0+) |
| **VentureChat** | legacy + hex (`&x…` / `&#RRGGBB`) | treat as legacy; native MiniMessage UNVERIFIED |
| **DeluxeChat / Chatty** | legacy-only | MiniMessage UNVERIFIED |
| **LuckPerms** prefix / suffix | **match the chat formatter** | LP stores raw text and renders nothing itself; MiniMessage only with a MM-aware formatter (FancyChat, LPC-MiniMessage, HuskChat), else store legacy `&` |
| **DecentHolograms** | **legacy-only** + its own `&#RRGGBB` | no MiniMessage |
| **DeluxeMenus** (name/lore/title) | legacy + hex by default | MiniMessage only with per-item `modern_use_minimessage: true` |

## Decision rule (bake this in)
1. Read `chatFormatter` from the server profile (`skills/_cache/server-profile.json`).
2. If the formatter is **MiniMessage-aware** (FancyChat, HuskChat, LPC-MiniMessage, TAB, MiniMOTD,
   Velocity) → emit MiniMessage.
3. Otherwise → emit **legacy `&` + `&#RRGGBB`**.
4. For MOTD and rank prefix, **always** also provide the other format so it works regardless.

## Legacy hex reminder
- Legacy color/format codes use `§` (or `&` where the plugin translates): `§0`–`§9`/`§a`–`§f`,
  `§l` bold, `§o` italic, `§n` underline, `§m` strike, `§k` obfuscated, `§r` reset.
- Hex (1.16+): `&#RRGGBB` (plugin shorthand) expands to the vanilla `§x§R§R§G§G§B§B` form.
- **Gradients are not native to legacy** — emulate them by emitting a `&#RRGGBB` run per character
  (use `scripts/format.mjs --to-legacy`). Source: minecraft.wiki Formatting_codes.
