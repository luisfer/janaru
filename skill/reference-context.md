# Context shapes

## Good (passes validate)

```markdown
# auth-refactor — 2026-01-15
Updated: 14:00

## State
Google OAuth works. Account linking still open.

## Next
Handle account linking when existing email user signs in with Google.

## Blockers
- None
```

## Bloated (fails validate)

Dumps implementation detail, commit lists, and multi-paragraph "what changed" blocks into `context.md`. That belongs in `janaru.md` or a PR — not the resume point. Keep State/Next/Blockers lean.
