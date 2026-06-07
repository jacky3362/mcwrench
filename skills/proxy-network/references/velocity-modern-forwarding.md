# Velocity modern forwarding

**Last verified: 2026-06-07** · Sources:
<https://docs.papermc.io/velocity/player-information-forwarding/>,
<https://docs.papermc.io/velocity/configuration/>

Modern forwarding is Velocity's secure way to pass a player's real identity (UUID, profile,
properties/skin, IP) to backend servers. It uses an efficient binary format with an HMAC so a
backend can verify the data came from *your* proxy and not a spoofer. Requires Minecraft 1.13+
on the backend (Paper). Use it for all modern Velocity networks.

## Step-by-step

### 1. Proxy — `velocity.toml`

```toml
online-mode = true                              # proxy authenticates with Mojang
player-info-forwarding-mode = "modern"          # not "legacy", not "none", not "bungeeguard"
forwarding-secret-file = "forwarding.secret"     # path to the secret file
```

Velocity generates a `forwarding.secret` on first run. Treat it like a password — do not commit
it to a public repo.

### 2. Each backend — `paper-global.yml`

```yaml
proxies:
  velocity:
    enabled: true
    online-mode: true        # must equal the proxy's online-mode
    secret: 'PASTE_THE_SAME_SECRET_HERE'
```

### 3. Each backend — `server.properties`

```properties
online-mode=false
```

The proxy already authenticated the player; the backend must trust the forwarded identity. With
`online-mode=true` on a backend behind a proxy, logins fail or players get offline UUIDs.

### 4. Lock down the backends

Backends should bind to loopback/internal IPs and have their ports firewalled so only the proxy
can reach them. A publicly reachable `online-mode=false` backend lets anyone connect directly as
any username — including op accounts.

## Forwarding modes compared

| Mode | When | Notes |
|---|---|---|
| `modern` | Velocity + MC 1.13+ | Secure (HMAC), recommended. The default choice. |
| `legacy` | BungeeCord-style chains, very old clients | Spoofable if backend ports are exposed. |
| `bungeeguard` | Bungee/Waterfall with the BungeeGuard plugin | Token-based; secure variant of legacy. |
| `none` | Single server, no proxy | No identity forwarding. |

## Failure signatures

- **"Unable to connect you to … invalid forwarding"** → secret mismatch, or one side isn't
  `modern`. Re-copy the secret; set `modern` on both sides.
- **Offline UUIDs / broken skins** → backend still `online-mode=true`, or
  `proxies.velocity.online-mode` doesn't match the proxy. Fix and restart the backend.
- **Backend refuses to start** → both Velocity forwarding and `spigot.yml: bungeecord: true` are
  enabled. Disable BungeeCord forwarding.
- **Players bypass the proxy** → backend port is public. Firewall it to the proxy host only.
