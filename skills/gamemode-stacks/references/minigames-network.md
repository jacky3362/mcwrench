# Minigames Network — plugin stack & config touchpoints

**Last verified: 2026-06-07.** Gamemode-agnostic admin reference. Names of plugins are canonical
stacks; for exact config keys, permission nodes, and commands, run the `learn-plugin-docs` skill
for the specific plugin — do not guess keys.

## Core stack
- Velocity proxy — front door for the network
- A lobby/hub server + per-game subservers — backend topology
- A bedwars plugin — BedWars1058 or MBedwars
- MurderMystery — additional game mode
- TAB — tablist & header/footer
- Citizens — NPCs for selectors and queues

## Supporting / optional
- LuckPerms-Velocity — network-wide permissions at the proxy
- A queue/party plugin — matchmaking & friend grouping
- MultiverseCore — multiple arena worlds on game servers

## Config touchpoints
- Proxy server list (backend registrations)
- Per-server MOTD and branding
- Modern forwarding handshake (the shared forwarding secret)
- Lobby selector NPCs (which NPC sends players to which game)
- Per-game arena configurations

## Common pitfalls
- Forwarding must be consistent across all backends — see the `proxy-network` skill.
- Backends must run with online-mode disabled and only be reachable via the proxy.
- Client/version mismatches need ViaVersion on backends; otherwise players can't join.
- Direct backend exposure to the internet bypasses the proxy and breaks auth.

## When configuring a specific plugin here
Run `learn-plugin-docs <plugin>` first, then audit with `audit-config`. Tie performance concerns
to the `performance-tuning` skill.
