# Pre-Commit Checklist - {PROJECT} - {DATE}

## Repo Setup (fill once per repo)
- Repo root: `{REPO_ROOT}`
- Test: `{TEST_CMD}` (or "N/A")
- Build: `{BUILD_CMD}` (or "N/A")
- Lint: `{LINT_CMD}` (or "N/A")
- Format: `{FORMAT_CMD}` (or "N/A")
- Typecheck: `{TYPECHECK_CMD}` (or "N/A")

---

## Before Commit
- [ ] Pull latest main/master (if required)
- [ ] Ensure working tree is clean except intended changes
- [ ] Update changelog or docs if needed
- [ ] Run formatter: `{FORMAT_CMD}`
- [ ] Run lint: `{LINT_CMD}`
- [ ] Run typecheck: `{TYPECHECK_CMD}`
- [ ] Run tests: `{TEST_CMD}`
- [ ] Run build: `{BUILD_CMD}`

## Commit Message Style
- Format: `{TYPE}: {SHORT_SUMMARY}`
- Types: feat | fix | chore | refactor | docs | test | perf | build | ci
- Example: `fix: handle empty search filters`

## After Commit
- [ ] Re-run critical smoke check (if applicable)
- [ ] Push branch
- [ ] Open PR with summary + testing notes

---

## Hook Setup (optional)
Use a hook manager (e.g., Husky / pre-commit) to enforce checks.
Suggested default hook command:
- `"{FORMAT_CMD} && {LINT_CMD} && {TYPECHECK_CMD} && {TEST_CMD}"`

