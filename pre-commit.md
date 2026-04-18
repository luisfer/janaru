# Pre-Commit Checklist - {PROJECT} - {DATE}

> Commands and conventions live in [`ecosystem.md`](./ecosystem.md). This file is the per-session checklist.

---

## Before Commit
- [ ] Pull latest main/master (if required)
- [ ] Working tree is clean except intended changes
- [ ] Updated changelog or docs if needed
- [ ] Ran formatter
- [ ] Ran lint
- [ ] Ran typecheck
- [ ] Ran tests
- [ ] Ran build

## Commit Message
- Use the convention defined in `ecosystem.md` (default: Conventional Commits).
- Format: `{TYPE}: {SHORT_SUMMARY}`
- Types: feat | fix | chore | refactor | docs | test | perf | build | ci
- Example: `fix: handle empty search filters`
- No co-author line, no "Generated with" footer.

## After Commit
- [ ] Re-run critical smoke check (if applicable)
- [ ] Push branch
- [ ] Open PR with summary + testing notes

---

## Hook Setup (optional)
Use a hook manager (Husky, pre-commit, lefthook). Suggested default:
`format && lint && typecheck && test` — pull the actual commands from `ecosystem.md`.

---

*Tip: say `shipit` to run this whole checklist automatically.*
