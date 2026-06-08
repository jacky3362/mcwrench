# Brand kit — {{SERVER_NAME}}

> Tone: {{TONE}} · Gamemode: {{GAMEMODE}} · Chat formatter: {{FORMATTER}} (→ {{FORMAT}})

## 1. Identity
- **Name ideas:** {{NAME_IDEAS}}
- **Tagline:** {{TAGLINE}}
- **One-line pitch:** {{PITCH}}
- **Palette:** {{HEX_SWATCHES}}
- **Signature gradient (MiniMessage):** `<gradient:{{A}}:{{B}}>{{SERVER_NAME}}</gradient>`

## 2. MOTD
- **MiniMessage (MiniMOTD / Velocity / TAB):**
  ```
  line1="{{MOTD_MM_1}}"
  line2="{{MOTD_MM_2}}"
  ```
- **Legacy `&#RRGGBB` (ServerListPlus / EssentialsX default):**
  ```
  {{MOTD_LEGACY_1}}
  {{MOTD_LEGACY_2}}
  ```
- **Vanilla `server.properties` (legacy `§`, ≤59 chars, 1 line reliable):** `{{MOTD_VANILLA}}`

## 3. Rank ladder  → hand to permissions-helper
| Rank | Prefix ({{FORMAT}}) | Suggested perks |
|---|---|---|
| {{RANK_1}} | `{{PREFIX_1}}` | {{PERKS_1}} |
| {{RANK_2}} | `{{PREFIX_2}}` | {{PERKS_2}} |
| {{RANK_3}} | `{{PREFIX_3}}` | {{PERKS_3}} |

## 4. Store copy (Tebex)
- **Tiers:** {{TIERS}}
- **Package names + blurbs:** {{PACKAGES}}
- _EULA note:_ {{EULA_NOTE}}

## 5. Discord
- **Categories/channels:** {{DISCORD_STRUCTURE}}
- **Roles:** {{DISCORD_ROLES}}
- **Welcome message:** {{WELCOME}}
- **Rules (short):** {{RULES}}

## 6. In-game text
- **Scoreboard/TAB sketch:** {{SCOREBOARD}}
- **Join / leave:** {{JOIN}} / {{LEAVE}}
- **Broadcast / vote / crate:** {{BROADCAST}}
- **Kit / crate names:** {{KIT_CRATE_NAMES}}

## 7. Logo / banner brief (opt-in)
- **Motif:** {{MOTIF}} · **Style:** {{STYLE}} · **Palette:** {{HEX_SWATCHES}}
- _Render only if asked and an image-gen tool is available._
