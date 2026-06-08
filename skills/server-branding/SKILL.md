---
name: server-branding
description: >-
  Builds a cohesive brand and copy kit for a Minecraft server from a name + vibe.
  Use whenever the user wants help with branding, a brand kit, a server name or
  naming ideas, a tagline or slogan, a color palette, a MOTD or "message of the
  day" or server-list text, rank names and prefixes, a rank ladder, store or
  Tebex package copy, a Discord category/channel/role layout, a welcome message
  or rules, scoreboard/TAB layout, join/leave/broadcast/vote/crate messages, kit
  or crate names, or wants any server text written in a particular tone or vibe
  (cozy SMP, hardcore anarchy, competitive PvP, kid-friendly, premium, meme).
  Emits MOTD and prefixes in the RIGHT format per plugin (MiniMessage vs legacy
  ampersand hex) using the format-target matrix. Hands rank tracks to
  permissions-helper and fetches real plugin keys with learn-plugin-docs; never
  invents config keys.
license: MIT
---

# Server Branding

Turn a server **name + vibe** into a cohesive **brand kit**: identity, MOTD, rank ladder, store
copy, Discord layout, and in-game text — each piece emitted in the **format the target plugin
actually parses**. This skill is pure knowledge: it writes copy and color, but defers exact plugin
config keys to `learn-plugin-docs` and rank tracks to `permissions-helper`.

## How to engage

1. **Read the server profile** (`skills/_cache/server-profile.json`) if it exists. Use `gamemode`
   for tone defaults and `chatFormatter` to choose MiniMessage vs legacy (see the matrix). If there
   is no profile, ask only for: server name (or ask to brainstorm one), the vibe/tone, the gamemode,
   and which MOTD/chat plugins are in use.
2. **Pick a tone** from `references/tone-presets.md` (or the user's own). The tone governs naming,
   punctuation, emoji use, rank-name style, and palette leaning — keep it consistent across every
   piece of text you produce.
3. **Choose the format per target** with `references/format-target-matrix.md`. Do **not** assume
   MiniMessage everywhere — ServerListPlus, vanilla `server.properties`, DecentHolograms, and
   EssentialsX (default) want legacy `&`/`§` + `&#RRGGBB`. Build the tag set only from
   `references/minimessage-cheatsheet.md` so you never invent a tag.
4. **Always offer both** a MiniMessage and a legacy `&#RRGGBB` version of the MOTD and rank prefix,
   so the result works regardless of which plugin the user runs. The `scripts/format.mjs` helper can
   expand a MiniMessage gradient to per-character legacy hex (and naively back).
5. **Hand off.** Rank ladder → `permissions-helper` for the LuckPerms tracks/meta. Unfamiliar plugin
   keys (a specific MOTD/scoreboard/menu plugin) → `learn-plugin-docs` first, then cite real keys.

## Brand kit output sections

Produce as many of these as the user wants; default to identity + MOTD + ranks.

1. **Identity** — 3 to 5 name ideas (skip if named), a tagline, a one-line pitch, and a color
   palette: 4 to 6 hex swatches + one MiniMessage gradient that uses them.
2. **MOTD** — a 2-line server-list message, emitted in the right format per the matrix. For
   MiniMOTD give separate `line1`/`line2` (no `\n`); for vanilla `server.properties` keep it legacy
   `§` and ≤59 chars/line and note 2 lines are unreliable without MiniMOTD/a proxy.
3. **Rank ladder** — themed rank names + prefixes (format matched to `chatFormatter`) + a suggested
   per-rank perk line. Mark it ready for `permissions-helper` tracks.
4. **Store copy** — Tebex/store package names, short descriptions, and a tier structure. Keep
   claims honest (no pay-to-win wording the user didn't ask for); note EULA-risky perks if relevant.
5. **Discord** — category/channel/role structure, a welcome message, and a short rules template.
6. **In-game text** — scoreboard/TAB layout sketch, and join/leave/broadcast/vote/crate lines; kit
   and crate names that match the tone.
7. **Logo/banner brief** — a short visual brief (palette, motif, style). Only render an actual image
   if the user asks and an image-gen tool is available — keep it opt-in, never automatic.

## Guardrails

- **Never invent plugin config keys, permission nodes, or version numbers.** Emit color/copy here;
  fetch real keys with `learn-plugin-docs` and build LuckPerms with `permissions-helper`.
- **Match the format to the plugin.** A MiniMessage MOTD pasted into `server.properties` shows raw
  tags; legacy `&` in a vanilla MOTD shows literally. Use the matrix every time.
- **Keep store/EULA copy compliant** — flag pay-to-win or gameplay-affecting perks; don't write them
  unprompted.
- Confirm before writing files or calling any outward/image-gen service.

## References

- `references/minimessage-cheatsheet.md` — the validated MiniMessage tag set (colors, gradients,
  decorations, hover/click). Build tags only from here.
- `references/format-target-matrix.md` — which format each MOTD/chat/hologram/menu target consumes.
- `references/tone-presets.md` — six tone presets (naming, wording, palette, example MOTD line).
- `scripts/format.mjs` — convert a MiniMessage gradient to legacy `&#RRGGBB` (and naive reverse).
- `assets/brand-kit.template.md` — the output skeleton to fill in.
