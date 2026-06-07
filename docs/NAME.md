# Name decision

## Chosen: `mcwrench`

Used everywhere as the **plugin name**, **marketplace name**, **GitHub repo name**, and the
Claude Code **slash prefix**: `/mcwrench:audit-config`, `/mcwrench:audit`, etc.

### Why
- **Short** — 8 chars, clean as a slash prefix. `/mcwrench:audit-config` reads well.
- **Unmistakably Minecraft** — leads with `mc`.
- **Says "config / ops tooling"** — a *wrench* is the universal "configure / fix / tune" symbol,
  without the ambiguity of "ops" (DevOps/MCP) or the loaded Minecraft meaning of "op" (operator).
- **Gamemode- and plugin-agnostic** — nothing in the name ties it to Paper, a gamemode, or a
  single plugin, matching the project's general-purpose scope.
- **Available & uncontested** (checked 2026-06-07):
  - GitHub: **0 repositories** named `mcwrench` / `mc-wrench`.
  - npm: free (no published package).
  - Minecraft world: **no** existing plugin/tool/brand named `mcwrench` (generic "wrench"
    items like IC2 Wrench exist, but none own this name).
  - Claude marketplace directory (claudemarketplaces.com): no Minecraft or matching listings.
  - Does **not** impersonate Anthropic or any official marketplace.

### Candidates evaluated (5 proposed + 1 baseline + the synthesis winner)

| Name | GitHub | npm | Minecraft collision | Verdict |
|---|---|---|---|---|
| **mcwrench** ✅ | 0 repos | free | none | **CHOSEN** — MC-clear + tooling + unique + short |
| mc-ops | crowded (435, none famous) | free | none | Runner-up — MC-clear but ambiguous with MCP/DevOps; "op" = operator jargon |
| serverwrench | ~none | free | none | Runner-up — cleanest, but not obviously Minecraft |
| mcsmith | 12 personal repos | free | none directly | OK — "smith" theme crowded in adjacent AI tooling |
| craftadmin | 1 trivial | free | **DIRECT** — established MC control-panel plugin (craftadmin.net, SpigotMC 31990) | **DISQUALIFIED** |
| mineops | 57 repos, several MC | free | **YES** — multiple MC DevOps repos + 2 CurseForge modpacks | **DISQUALIFIED** |
| mc-server-config (baseline) | exact-name repos exist | free | none as brand | Mediocre — generic, confusable with `mcp-server-config` |

`mcwrench` is the synthesis of the two strongest finalists: it keeps `mc-ops`'s instant
Minecraft legibility and `serverwrench`'s collision-free uniqueness, while dropping the
ambiguity both carried.

### Sources (fetched 2026-06-07)
- GitHub repo search (`mcwrench`, `mc-wrench`) — 0 results.
- npm registry checks (all candidates) — free.
- CraftAdmin collision: <https://www.spigotmc.org/resources/craftadmin.31990/>, <https://craftadmin.net/>
- MineOps collision: <https://github.com/mine-ops/mineops>, <https://www.curseforge.com/minecraft/modpacks/mineops>
- Marketplace directory: <https://claudemarketplaces.com/>

### Open item (non-blocking)
The GitHub **owner handle** is not yet known. Repository/author URLs use the placeholder
`Teddy563` and must be find-replaced before the first push. See `docs/DECISIONS.md`.
