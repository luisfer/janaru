# Pre-Commit Checklist - auth-refactor - 2026-01-15

> Commands and conventions live in `journals/ecosystem.md`. This file is the per-session checklist.

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
- Example: `feat: add Google OAuth login`
- No co-author line, no "Generated with" footer.

## After Commit
- [ ] Re-run critical smoke check (if applicable)
- [ ] Push branch
- [ ] Open PR with summary + testing notes

---

*Tip: say `shipit` to run this whole checklist automatically.*
