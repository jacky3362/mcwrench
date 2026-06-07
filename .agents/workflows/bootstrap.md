---
description: Bootstrap a brand-new Minecraft server (Paper, optionally with a Velocity proxy).
---

# Bootstrap a new server

1. Engage the **new-server-bootstrap** skill (`.agents/skills/new-server-bootstrap/SKILL.md`).
2. Scope: single server or network, gamemode, host, player count → recommend Paper.
3. Download the latest Paper via Fill v3:
   `node skills/new-server-bootstrap/scripts/fetch-paper.mjs 26.1.2` (read the URL from the API;
   never hand-construct). Install Java 25.
4. Accept the EULA, apply `assets/startup.sh.tmpl` (Java 25 + Aikar's flags, Xms==Xmx with
   headroom), and set sane `server.properties`.
5. For a network, set up Velocity modern forwarding (`assets/velocity.example.toml` +
   `assets/paper-global.example.yml`).
6. Hand the gamemode stack to **gamemode-stacks**; review with **audit-config**.
