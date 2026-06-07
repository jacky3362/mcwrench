# RCON on Pterodactyl / Pelican

**Last verified: 2026-06-07** · Sources: pterodactyl.io/community/games/minecraft.html,
shockbyte/xgamingserver RCON guides.

RCON lets tools/automation send console commands over TCP. On a panel it needs **its own port**
(a secondary allocation) because the primary allocation is the game port.

> **Confirm with the user before enabling RCON.** RCON is unencrypted and a remote-control
> channel — only enable it with a strong password and the port firewalled. Never expose it
> publicly.

## Steps

1. **Add a secondary allocation.** Panel → your server → **Network** tab → **New Allocation**
   (label it `RCON`). Note the assigned port. (The stock Paper egg does **not** auto-create this —
   it's a manual step, and forgetting it is the #1 RCON setup failure.)
2. **Edit `server.properties`** (File Manager, server stopped):
   ```properties
   enable-rcon=true
   rcon.port=<the secondary allocation's port>
   rcon.password=<strong random string>
   broadcast-rcon-to-ops=false
   ```
3. **Save and start.** Confirm the server binds the RCON port (console shows RCON running).
4. **Lock it down.** Firewall the RCON port to known admin IPs only. Rotate the password if it
   ever leaks. Some panels offer an "RCON Manager" addon that adds/removes the allocation when you
   toggle RCON.

## Common failures

- Port already in use / not allocated → you skipped step 1, or pointed `rcon.port` at the game port.
- "Connection refused" from an RCON client → wrong port, server not started, or firewall blocking.
- Weak/blank `rcon.password` on a reachable port → treat as a **critical** security finding.
