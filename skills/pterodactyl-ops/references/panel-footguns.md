# Pterodactyl / Pelican footguns

**Last verified: 2026-06-07.**

## Memory / OOM (most common crash)

- The panel **memory limit is the container (cgroup) limit**, enforced by Docker. It must cover
  **JVM heap + native memory** (metaspace, thread stacks, GC structures, direct buffers, mmap).
- Aikar's flags set `Xms == Xmx` **and** `-XX:+AlwaysPreTouch`, which maps the whole heap at boot.
  If `Xmx` = the full container limit, RSS hits the limit immediately and the OOM killer fires
  ("Cannot allocate memory" / container restarts on start).
- **Fix:** set `Xmx`/`Xms` **below** the panel allocation — reserve ~1–1.5 GB or ~10–15% headroom.
  On very small containers, also consider dropping `AlwaysPreTouch`.

## Allocations / ports

- Primary allocation = game port. **RCON, query, Geyser/Bedrock, Dynmap each need a separate
  secondary allocation** (Network tab). Forgetting this breaks RCON and extra services.

## Editing files

- Edit configs while the server is **stopped** — a running server can rewrite some files on
  shutdown and clobber your changes. Start after saving.
- **Mounts** added to a server are usable by the process but **don't appear in the file manager or
  over SFTP** — admins lose track of where data lives.
- Use **SFTP** (per-server credentials, Wings port) for large/bulk transfers; the web file manager
  struggles with big or numerous files.

## Pelican vs Pterodactyl (differences to know)

- **Status:** Pelican is still **beta** (no stable 1.0 as of 2026-06); Pterodactyl is the
  battle-tested option for production today.
- **License:** Pelican relicensed **MIT → AGPLv3**.
- **Terminology/UI:** Nests/Locations → **Tags**; client area rebuilt in Filament; a **plugin
  system** for addons/themes; more DB drivers (Postgres, SQLite, MariaDB); Turnstile + OAuth auth.
- **Compatibility:** Pterodactyl **eggs import unmodified**, and the **client API is
  backward-compatible** (`ptlc_` keys, same endpoints). Pelican keeps the **Wings** daemon name
  (it maintains a fork; upstream Wings is stated compatible) — but mixing beta daemons in
  production is risky; keep panel and daemon versions matched.
