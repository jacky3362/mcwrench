# Upgrade / migration checklist (read-only planner)

Produce a **go/no-go runbook** from the server-profile + a target version. Never download or write.

## The 2026 facts that break upgrades
- **Paper 26.1+ requires Java 25.** On older Java the server won't start (`UnsupportedClassVersionError`).
  Confirm the target's Java requirement first.
- **26.1 ships an unobfuscated jar.** Mojang dropped the obfuscation map, so Spigot-mapped plugins
  must be **re-released** for 26.1 and the old reobfuscation tooling is dead. Many plugins silently
  break or no-op until updated. Treat "it loaded" as not enough — verify behaviour.
- **The `1.` prefix is gone.** The live line is `26.1.x` (what older docs call 1.26.1).
- **World upgrades are one-way.** There have been failed `1.21.x → 26.1` world-upgrade reports. Back up
  and trim first; upgrade a COPY before the live world.

## Pre-flight checklist (grade each)
1. **Java.** Is the host Java ≥ the target's requirement (25 for 26.1+)? If not → bump Java is step one.
2. **Plugins.** For each installed plugin, label **has-a-target-build / none / unknown** using
   `check-plugin-versions.mjs` + `learn-plugin-docs`. Any "none" on a critical plugin is a blocker.
3. **One change at a time.** Do NOT bump the MC version AND switch software/server-type (e.g. Spigot→
   Paper, Paper→Folia) in the same step. Sequence them.
4. **Backups.** A current, restorable backup exists before anything (3-2-1: live + local + off-site).
5. **World size.** Trim/pre-generate sanely; a bloated world makes the upgrade slow and risky.
6. **Config drift.** New version may add/rename keys; plan to re-audit with `audit-config` after.

## Ordered runbook (emit this)
1. **Back up** the whole server (world + configs + plugins), verify the backup is restorable.
2. **Bump Java** to the required version; confirm with `java -version` in the real startup.
3. **Update plugins** to builds for the target MC + loader; resolve missing deps; remove ones with no
   target build (or find replacements) — never leave a known-incompatible jar in.
4. **Test on a copy:** start a duplicate server on the new version, watch `latest.log` (run
   `parse-log.mjs`), smoke-test the key features.
5. **Upgrade the live world** only after the copy is clean; keep the pre-upgrade backup.
6. **Re-audit** with `audit-config` + `check-conflicts.mjs` and re-run a `health` pass.

Stop and confirm before any irreversible step (world upgrade, deleting old jars/worlds).
