# Pre-Commit Checklist - auth-refactor - 2026-01-15

## Repo Setup (fill once per repo)
- Repo root: `~/projects/my-app`
- Test: `npm test`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Typecheck: `npm run typecheck`

---

## Before Commit
- [ ] Pull latest main/master (if required)
- [ ] Ensure working tree is clean except intended changes
- [ ] Update changelog or docs if needed
- [ ] Run formatter: `npm run format`
- [ ] Run lint: `npm run lint`
- [ ] Run typecheck: `npm run typecheck`
- [ ] Run tests: `npm test`
- [ ] Run build: `npm run build`

## Commit Message Style
- Format: `{TYPE}: {SHORT_SUMMARY}`
- Types: feat | fix | chore | refactor | docs | test | perf | build | ci
- Example: `feat: add Google OAuth login`

## After Commit
- [ ] Re-run critical smoke check (if applicable)
- [ ] Push branch
- [ ] Open PR with summary + testing notes

---

## Hook Setup (optional)
Use a hook manager (e.g., Husky / pre-commit) to enforce checks.
Suggested default hook command:
- `"npm run format && npm run lint && npm run typecheck && npm test"`
