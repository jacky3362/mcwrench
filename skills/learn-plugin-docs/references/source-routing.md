# Source routing — cheapest doc channel per host

**Last verified: 2026-06-07.** The docs engine routes each plugin to the cheapest authoritative
channel rather than scraping generically. Always probe `<host>/llms.txt` and
`<host>/llms-full.txt` first for any docs site — cheap and increasingly standard.

**v1.0: all adapters below are wired and live-tested** (GitBook + Readability are best-effort —
see notes under the table). The "Status" column reflects the original build order.

| Source | Method | Endpoint / pattern | Status |
|---|---|---|---|
| **Modrinth** | REST v2, no auth | `GET https://api.modrinth.com/v2/project/{id\|slug}` → `body` is Markdown. Set a unique `User-Agent`. 300 req/min. | **Wired** |
| **Hangar (PaperMC)** | REST v1 | `GET https://hangar.papermc.io/api/v1/projects/{slug}` (metadata) + `GET https://hangar.papermc.io/api/v1/pages/main/{project}` (Markdown). **Slug-only** — the `/{author}/{slug}` forms are deprecated. OpenAPI: `/v3/api-docs`. | **Wired** |
| **GitBook docs** | `.md`-suffix trick (GA since 2025-06-24), then `llms-full.txt` | Append `.md` to a page URL; fall back to `<root>/llms-full.txt`. **Per-site toggleable** — may 404; then fall back further. | **Wired** |
| **GitHub README** | Raw markdown | `https://raw.githubusercontent.com/{owner}/{repo}/HEAD/README.md` | **Wired** |
| **GitHub wiki** | Raw markdown | `https://raw.githubusercontent.com/{owner}/{repo}.wiki/HEAD/Home.md` | TODO |
| **Oraxen** | Content negotiation (dropped standalone llms.txt) | `.md` suffix / `?format=md` / `Accept: text/markdown`; bulk `/api/docs/_index`, `/api/docs/_all` | TODO |
| **Skript Hub** | Undocumented JSON API | `GET https://skripthub.net/api/v1/addonsyntaxlist/` → filter by `addon` | TODO |
| **SpigotMC** | XenforoResourceManagerAPI | `https://api.spigotmc.org/simple/0.2/index.php?action=getResource&id={id}` → description is **BBCode**, convert to markdown (lossy; warn) | TODO |
| **PaperMC docs** | Starlight — `.md` trick does NOT work | Raw markdown from `github.com/PaperMC/docs` | TODO |
| **MythicMobs** | Self-hosted **GitLab** wiki (not GitBook) | `git.mythiccraft.io` — use GitLab raw, not the GitBook `.md` trick | TODO |
| **Unknown host** | Headless fetch → `@mozilla/readability` → `turndown` | Generic fallback; cache aggressively | TODO (stub) |

## Resolution order for a bare name

1. Modrinth search (`/v2/search?query=…&facets=[["project_type:plugin"]]`).
2. Hangar search (`/api/v1/projects?query=…`).
3. If the project links a GitHub source, also try the README.

## Doc-host hints for common plugins

- LuckPerms → `luckperms.net/wiki` (custom; source on `github.com/LuckPerms/wiki`).
- EssentialsX → `essentialsx.net/wiki`. WorldGuard → `worldguard.enginehub.org` (EngineHub/Sphinx).
- CoreProtect, PlaceholderAPI, ItemsAdder → GitBook (`.md` may be toggled off; use `llms-full.txt`).
- MythicMobs → GitLab wiki (`git.mythiccraft.io`). Citizens → `wiki.citizensnpcs.co`.
- DiscordSRV → `docs.discordsrv.com`. GrimAC → `grim.ac` (+ GitHub wiki). Skript → `docs.skriptlang.org`
  + Skript Hub syntax API. Oraxen → `docs.oraxen.com` (content negotiation).

## Cache layout

```
skills/_cache/<slug>/
  REFERENCE.md   # condensed, with: source_url, fetched_at frontmatter
  RAW.md         # full fetched markdown
```

`_cache/` is gitignored. Pin every reference with `source_url` + `fetched_at` so staleness shows.
