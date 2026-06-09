# Crash / log signature catalogue

`parse-log.mjs` matches these; this is the human reference for reading a report by hand. Always name
the **culprit** = the first stack frame whose package is NOT engine code (not `net.minecraft`,
`com.mojang`, `java.`, `jdk.`, `io.netty`, `org.bukkit`, `org.spigotmc`, `io.papermc`, …). That
package usually IS the broken plugin.

| Signature in the log | Means | Fix |
|---|---|---|
| `UnsupportedClassVersionError` + `class file version N.0` | A jar needs a newer Java. N→Java: 65=21, 69=**25**, 70=26. | Install the required Java (Paper 26.1+ = Java 25); fix the startup `java`. |
| `OutOfMemoryError`, `GC overhead limit exceeded`, `unable to create new native thread` | Heap (or native) exhausted. | Raise `-Xmx` with container headroom (Xmx < allocated RAM, AlwaysPreTouch reserves it); profile with Spark for a leak. |
| `Watchdog`, `A single server tick took`, `server has stopped responding`, `can't keep up` | Main thread blocked too long. | Spark the hot path; suspect sync I/O in a plugin, runaway entities/redstone, oversized view/sim distance. |
| `Exception ticking world/entity/block entity`, `Exception in server tick loop` | A specific entity/chunk threw. | Named plugin → update/remove + read its docs; vanilla → remove the entity/block with a region editor (back up first). |
| `FAILED TO BIND TO PORT`, `Address already in use`, `Perhaps a server is already running` | Port held by another process/instance. | Stop the other instance or change the port; on a panel ensure one allocation per port. |
| `You need to agree to the EULA`, `eula.txt` | EULA not accepted. | Set `eula=true` (only if you accept it), restart. |
| `Unsupported API version`, `Could not load 'plugins/…'`, `depends on …` | Plugin won't load: API mismatch or missing dependency. | Get a build for this MC/loader; add the missing dependency; cross-check `check-plugin-versions.mjs` + `check-conflicts.mjs`. |
| `NoClassDefFoundError`, `NoSuchMethodError`, `NoSuchFieldError` | Version mismatch with a dependency (ProtocolLib, PacketEvents, an API jar) or a stale jar. | Update the plugin AND its dependency to matching versions; delete duplicate/old jars. |
| `Could not reserve enough space for object heap`, `Invalid maximum heap size` | Bad `-Xmx/-Xms` flags. | Fix heap flags to fit host RAM. |

## How to read a stack
1. The `Description:` line categorises it (tick loop, ticking entity/world, Watchdog).
2. The top exception type names the kind (OOM, ClassVersion, NoClassDef…).
3. Walk down to the **first non-engine `at …` frame** → the culprit plugin namespace.
4. Follow each `Caused by:` to the root cause.
5. Cross-reference the server-profile: Java/software/plugins often disambiguate (a ClassVersion error
   on a 26.1 server with Java 21 = "upgrade Java to 25", not "the plugin is broken").

Then confirm the plugin's real requirements with `learn-plugin-docs`; never assume.
