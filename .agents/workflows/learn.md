---
description: Fetch and condense docs for any Minecraft plugin into a local markdown reference.
---

# Learn plugin docs

1. Engage the **learn-plugin-docs** skill (`.agents/skills/learn-plugin-docs/SKILL.md`). The
   plugin name or URL is the workflow argument.
2. Check `skills/_cache/<slug>/REFERENCE.md` first; if fresh, read it instead of re-fetching.
3. Otherwise run:
   `node skills/learn-plugin-docs/scripts/learn-docs.mjs "<plugin-name-or-url>"`
   (resolves Modrinth → Hangar, or the given URL; writes `REFERENCE.md` + `RAW.md`).
4. Read the generated `REFERENCE.md` and summarise the key config keys, permission nodes, and
   commands. Cite the cache path + source URL. Do not invent config keys.
