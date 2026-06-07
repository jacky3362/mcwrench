---
name: proxy-network
description: >-
  Sets up and troubleshoots Minecraft proxy networks with Velocity (recommended),
  BungeeCord or Waterfall. Use whenever the user mentions a proxy, Velocity,
  BungeeCord, Waterfall, "the network", "lobby server", "hub", multiple servers,
  "connect servers", server switching, velocity.toml, forwarding.secret, modern
  forwarding, "player info forwarding", "offline mode behind proxy", broken skins
  or UUIDs behind a proxy, "Unable to connect you... invalid forwarding", forced
  hosts, or moving players between backend servers. Covers velocity.toml structure,
  modern vs legacy forwarding, the forwarding.secret handshake, backend online-mode,
  and the BungeeCord-vs-Velocity "won't start" conflict. Prefer this skill over guessing.
license: MIT
---

# Proxy / Network

Default proxy: **Velocity** (by the Paper team; TOML config, modern forwarding). Waterfall is in
maintenance mode; BungeeCord is legacy. See `references/velocity-modern-forwarding.md` for the
exact forwarding handshake — getting it wrong is the #1 network setup failure.

## The forwarding contract (must all line up)

For a Velocity network with modern forwarding:

1. **Proxy** `velocity.toml`: `player-info-forwarding-mode = "modern"` and
   `forwarding-secret-file = "forwarding.secret"`.
2. **Secret**: the proxy's `forwarding.secret` file contents must **exactly equal** each
   backend's `paper-global.yml: proxies.velocity.secret`.
3. **Backend** `paper-global.yml`: `proxies.velocity.enabled: true`, matching `secret`, and
   `proxies.velocity.online-mode` equal to the proxy's `online-mode`.
4. **Backend** `server.properties`: `online-mode=false` (the proxy handles authentication).
5. **Never** also set `spigot.yml: settings.bungeecord: true` — Velocity + BungeeCord forwarding
   enabled together stops the backend from starting.

## velocity.toml essentials

```toml
bind = "0.0.0.0:25565"
online-mode = true
player-info-forwarding-mode = "modern"
forwarding-secret-file = "forwarding.secret"

[servers]
lobby = "127.0.0.1:30066"
survival = "127.0.0.1:30067"
try = ["lobby"]

[forced-hosts]
"play.example.net" = ["lobby"]

[advanced]
compression-threshold = 256
login-ratelimit = 3000
```

- Backends bind to **internal/loopback** ports; only the proxy port is public. Firewall the
  backend ports so players can't bypass the proxy (which would hit `online-mode=false` directly —
  a security hole).
- `try` sets the initial-connect order; `forced-hosts` routes by hostname.

## Troubleshooting map

| Symptom | Cause → fix |
|---|---|
| "Unable to connect you… invalid forwarding" | secret mismatch or wrong forwarding mode → align secret + set `modern` both sides |
| Players join as offline UUID / skins broken | backend `online-mode=true`, or `proxies.velocity.online-mode` mismatch → set backend `online-mode=false`, match proxy |
| Backend won't start | BungeeCord and Velocity forwarding both enabled → disable one |
| Anyone can join backend directly as op | backend port exposed publicly with `online-mode=false` → firewall to proxy only |
| Legacy BungeeCord network | use `ip_forward: true` + `bungeecord: true`; do NOT also enable Velocity |

## Method

1. Confirm proxy software + version (Velocity 3.5.0-SNAPSHOT is current in 2026).
2. Walk the 5-point forwarding contract above and verify each side.
3. Lock down backend ports.
4. For proxy-level permissions, run LuckPerms on the proxy too (see `permissions-helper`).
