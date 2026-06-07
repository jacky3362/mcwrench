# LuckPerms contexts, tracks & meta

**Last verified: 2026-06-07** · Source: <https://luckperms.net/wiki/Context>,
<https://luckperms.net/wiki/Tracks>

## Contexts

A **context** is a `key=value` condition that scopes a permission, parent (group), or meta entry
to **where/when** it applies. The whole permission lookup is filtered by the player's current
contexts.

Built-in keys:

| Key | Meaning |
|---|---|
| `server` | The server name (LuckPerms' `server` setting in `config.yml`, not the hostname). |
| `world` | The world the player is currently in. |
| `gamemode` | `survival` / `creative` / `adventure` / `spectator`. |
| `dimension-type` | `overworld` / `the_nether` / `the_end`. |

Apply a context when setting:

```
/lp group vip permission set essentials.fly true world=creative_world
/lp group builder parent add buildtools server=creative
/lp user Steve meta setprefix 50 "&b[Build] " server=creative world=plots
```

### Static (per-server) contexts

Define server-scoped contexts in each backend's `contexts.yml` so a single shared LuckPerms
database can serve a whole network with per-server perks:

```yaml
# contexts.yml on the skyblock backend
server-type:
  - skyblock
```

Then grant `…server-type=skyblock`. A player only satisfies it on that backend. This is how one
LP database powers a network without perks leaking across servers.

## Tracks

Ordered ladders of groups for promotion/demotion. **They do not affect inheritance** — they only
make `promote`/`demote` move a user along the ladder.

```
/lp createtrack staff
/lp track staff append helper
/lp track staff append mod
/lp track staff append admin
/lp user Steve promote staff      # default -> helper -> mod -> admin
/lp user Steve demote staff
```

Use tracks for rank ladders (prison A→Z→Prestige, staff helper→admin). Inheritance still comes
from `parent add`.

## Meta (prefix / suffix / weight)

```
/lp group admin meta setweight 100
/lp group admin meta setprefix 100 "&c[Admin] "
/lp group admin meta setsuffix 100 " &7✦"
/lp group vip meta set discord-role VIP        # custom meta, read via PlaceholderAPI
```

- **Weight** drives primary-group selection (`parents-by-weight`) and which prefix/suffix wins
  when a user is in several groups. Higher weight wins unless a stacking `meta-formatter` is set.
- Read custom meta elsewhere with `%luckperms_meta_<key>%` (needs PlaceholderAPI + the LuckPerms
  expansion).

## Quick audit checks

- Prefixes overlapping? Set explicit **weights** instead of relying on insertion order.
- Per-server perks leaking network-wide? They were set without a `server=`/static context.
- "Promotion does nothing"? Track exists but the user's actual perms come from `parent add`,
  not the track — verify with `/lp user Steve info` and `/lp user Steve parent info`.
