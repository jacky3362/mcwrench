<!-- Thanks for contributing to mcwrench! Keep one source of truth: skills live only in skills/. -->

## What & why

<!-- What does this change and why? -->

## Checklist

- [ ] `node scripts/validate.mjs` passes (and `claude plugin validate . --strict` if you have the CLI).
- [ ] No `SKILL.md` duplicated outside `skills/` (edit the real files, not `.agents/`).
- [ ] No invented config keys / permission nodes / versions — every factual claim is backed by an
      official source (link it), or fetched via `learn-plugin-docs`.
- [ ] Reference files I touched carry an updated `Last verified:` date.
- [ ] If I added a skill: folder name == frontmatter `name`, description ≤1024 chars, no XML tags,
      and (optionally) a matching `commands/`, `.agents/workflows/`, and `.gemini/commands/` wrapper.
- [ ] `CHANGELOG.md` updated.

## Sources

<!-- Official doc URLs backing any new MC facts. -->
