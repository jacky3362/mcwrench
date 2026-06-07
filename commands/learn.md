---
description: Fetch and condense docs for any Minecraft plugin into a local markdown reference.
argument-hint: "<plugin-name-or-url>"
allowed-tools: Bash, Read, Write, WebFetch, Skill
---

Invoke the **learn-plugin-docs** skill with argument: `$ARGUMENTS`

Resolve the plugin (Modrinth → Hangar, or the given URL), run
`node "${CLAUDE_PLUGIN_ROOT}/skills/learn-plugin-docs/scripts/learn-docs.mjs" "$ARGUMENTS"`,
then read `skills/_cache/<slug>/REFERENCE.md` and summarise the key config keys, permission
nodes, and commands. Cite the cache path and source URL. Do not invent config keys.
