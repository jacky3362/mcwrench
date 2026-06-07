---
description: Bootstrap a brand-new Minecraft server (Paper, optionally with a Velocity proxy).
argument-hint: "[gamemode / network details]"
allowed-tools: Read, Bash, Write, Glob, Skill
---

Use the **new-server-bootstrap** skill for: `$ARGUMENTS`

Download the latest Paper via the Fill v3 API (`fetch-paper.mjs` — never hand-construct URLs),
install Java 25, accept the EULA, apply the Java-25 + Aikar's-flags startup template, and set sane
`server.properties`. For a network, set up Velocity modern forwarding. Then hand the gamemode
plugin stack to **gamemode-stacks** and review with **audit-config**.
