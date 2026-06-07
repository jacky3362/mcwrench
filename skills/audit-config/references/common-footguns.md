# Common Minecraft server footguns

**Last verified: 2026-06-07.** The high-frequency mistakes that crash, lag, or compromise a
server. Check every audit against this list.

## Will not start / crashes

- **Both proxy modes on at once** — `spigot.yml: settings.bungeecord: true` AND
  `paper-global.yml: proxies.velocity.enabled: true`. Pick one.
- **YAML tab characters** — a literal tab anywhere in a `.yml` file is a parse error. Editors
  that insert tabs silently break configs. Always use spaces.
- **Wrong Java version** — Paper **26.1+ requires Java 25**. Running on Java 17/21 fails to
  launch. Check the JVM the startup script invokes.
- **Duplicate YAML keys** — the last wins silently; often the cause of "my setting does nothing."

## Security

- **Exposed RCON** — `enable-rcon=true` with the port reachable from the internet, or a weak/
  default `rcon.password`. Bind to loopback or firewall the port. Treat public RCON as critical.
- **`online-mode=false` with no proxy** — anyone can log in as any username (including ops).
  Only acceptable behind a proxy that enforces auth, or an intentional cracked server.
- **Op via console left enabled on a shared panel** without password — anyone with console = op.

## Proxy / forwarding

- Backend not `online-mode=false` behind Velocity → offline-UUID players, broken skins, auth loops.
- `forwarding.secret` mismatch between proxy and backend → "Unable to connect you… invalid
  forwarding" on join.
- Forgetting `player-info-forwarding-mode = "modern"` in `velocity.toml` (legacy/none leaks the
  real player IP model and breaks modern UUID forwarding).

## Performance

- **`view-distance` too high** for the player count — the single most common lag cause. 6–10 is
  sane for most; 4–6 for big/anarchy servers.
- `simulation-distance` left at `view-distance` when it could be lower (it governs the expensive
  ticking radius; often 4–6 is plenty).
- Uncapped mob farms — no `entity-activation-range` / `mob-spawn-range` / per-player spawn tuning.
- Hopper chains — no `transfer-cooldown` / `disable-move-event` tuning on hopper-heavy servers.
- Entity bloat — no `entity-per-chunk-save-limit` caps on `experience_orb`, `arrow`, `ender_pearl`.
- **`-XX:+AlwaysPreTouch` on a memory-capped container** (Pterodactyl/Pelican) can OOM at boot
  with "Cannot allocate memory" — drop it on constrained hosts.

## Ops / data safety

- **Hot-copying a running world** — saves aren't atomic. Run `/save-off` then `/save-all flush`
  before snapshotting, or use ZFS/btrfs copy-on-write.
- **Single backup mechanism** — panel snapshots OR restic, never just one, and test restores.
- Editing a live Skript shop without `/sk reload` (then losing variables on the next restart).
- Plugin update pulls a new API jar that breaks LuckPerms-Velocity context — stage upgrades first.

## Version / naming gotchas (2026)

- Minecraft dropped the `1.` prefix — "1.26.1" is now written **26.1.1**. Match the user's actual
  string; don't "correct" their version to the old format.
- Pterodactyl is community-forked as **Pelican** (Apr 2024). Treat Pelican as Pterodactyl-
  compatible but verify API differences (RCON often needs a secondary allocation on both).
