# Backups on Pterodactyl / Pelican

**Last verified: 2026-06-07** · Sources: pterodactyl-wings backups docs,
pterodactyl.io/panel additional_configuration.

## How panel backups work

- **Wings-managed**, two adapters:
  - **Local** (`wings`): stored on the node, e.g. `/var/lib/pterodactyl/backups/{uuid}.tar.gz`.
  - **S3** (S3-compatible): presigned multipart upload; the local temp copy is then removed.
- Triggered from the panel **Backups** tab, the client API, or a panel schedule.

## The critical caveat: backups are NOT atomic

Wings archives the **live filesystem** while the server keeps running — there is no stop,
write-quiesce, or point-in-time snapshot. A backup taken during active world writes can capture an
**inconsistent world** (half-written region files).

**Before any hot backup of a running server, quiesce writes:**

```
save-off
save-all flush
```

(run via the console or the client API `POST /api/client/servers/{id}/command`). Take the backup,
then `save-on`. For full safety, **stop the server** and back up cold.

## Defense in depth

- Don't rely on a single mechanism. Combine **panel backups** (convenient, on-node or S3) with an
  **off-node copy** (e.g. restic/borg from the host against
  `/var/lib/pterodactyl/volumes`, or scheduled S3) so a node loss doesn't take the backups too.
- **Test restores** periodically — an untested backup is a guess.
- Keep a pre-upgrade backup before plugin/Paper version bumps; stage upgrades on a clone first.

## Restore

Restore from the Backups tab (this overwrites current files — confirm with the user first). For
S3, ensure credentials/bucket are still valid. After restore, verify world + plugin data load
before reopening to players.
