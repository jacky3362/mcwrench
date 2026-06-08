---
description: Show or update mcwrench's per-server profile so answers stop re-asking version/host/stack.
---

# Server profile

1. The **server profile** lives at `skills/_cache/server-profile.json` and records software, MC
   version, host, RAM, gamemode, proxy, online-mode, plugins, worlds, and chat formatter.
2. If the argument is a path (or empty → current directory), scan and upsert it:
   `node skills/audit-config/scripts/scan-server-tree.mjs "<server-root>" --write-profile`
3. For single fields use:
   `node skills/audit-config/scripts/server-profile.mjs get|set|clear ...`
4. Show the resulting profile; flag fields still unknown (java, host, RAM are not auto-detected).
   Auto-detected MC version / chat formatter are best-effort — confirm with the user before relying
   on them.
