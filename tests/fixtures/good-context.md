# auth-refactor — 2026-01-15
Updated: 14:00

## State
Google OAuth and email/password both work. Redirect to `/dashboard` done. Edge case: existing email user signing in with Google (account linking).

## Next
Handle account linking — if email exists when Google user signs in, link accounts; else create user.

## Blockers
- None
