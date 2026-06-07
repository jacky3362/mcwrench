# paper-global.yml audit checklist

**Last verified: 2026-06-07** · Source: <https://docs.papermc.io/paper/reference/global-configuration>

`paper-global.yml` is the **server-wide** Paper config (one per server, not per-world).
Per Paper's own docs: *"there's a lot to configure… some options may impact gameplay, so use
with caution, and make sure you know what each option does before configuring."* Only change
what you understand.

## Proxy / forwarding (the most common breakage)

```yaml
proxies:
  velocity:
    enabled: false          # true ONLY if behind a Velocity proxy
    online-mode: true        # MUST match the proxy's online-mode
    secret: ''               # MUST equal the proxy's forwarding.secret (never blank when enabled)
  bungee-cord:
    online-mode: true
```

- Behind Velocity: `proxies.velocity.enabled: true`, a non-empty `secret` matching the
  proxy's `forwarding.secret`, **and** `server.properties: online-mode=false`.
- **Do not** also enable BungeeCord forwarding (`spigot.yml: settings.bungeecord: true`) at the
  same time — enabling both stops the server from starting. Pick one proxy mode.
- `proxies.velocity.online-mode` must equal the proxy's `online-mode`, or you get ghost/offline
  UUID inconsistencies and broken skins.

## Chunk loading

```yaml
chunk-loading-advanced:
  auto-config-send-distance: true
  player-max-concurrent-chunk-loads: 0.0   # 0 = auto; raise cautiously on big servers
  player-max-chunk-load-rate: -1.0         # -1 = unlimited; cap ~100.0 to tame exploration storms
chunk-loading-basic:
  player-max-chunk-send-rate: -1.0
```

- Leave the advanced auto values (`-1.0` / `0.0`) unless you have a measured reason. On busy
  servers with exploration lag, capping `player-max-chunk-load-rate` to ~`100.0` helps.

## Misc safety

```yaml
misc:
  max-joins-per-tick: 5
  region-file-cache-size: 256
unsupported-settings:
  allow-headless-pistons: false
  allow-permanent-block-break-exploits: false
  allow-piston-duplication: false
```

- `unsupported-settings`: leave the exploit/dupe toggles **false** unless the server is an
  anarchy server that explicitly wants them. Flag any that are `true` on a normal SMP.
- `spam-limiter` — tune `tab-spam-increment` / `incoming-packet-threshold` only if players hit
  "kicked for spamming"; loosening too far enables packet abuse.

## What to flag in an audit

| Severity | Finding |
|---|---|
| Critical | Both Velocity and BungeeCord forwarding enabled (won't start) |
| Critical | `proxies.velocity.enabled: true` with empty/`''` `secret` |
| High | Velocity enabled but backend `online-mode=true` (UUID/skin breakage) |
| High | `unsupported-settings` dupe/exploit toggles `true` on a non-anarchy server |
| Medium | `player-max-chunk-load-rate` unlimited on a server reporting exploration lag |
| Low | Defaults left verbatim with a TODO comment never resolved |
