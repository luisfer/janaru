# auth-refactor — 2026-01-15
Updated: 14:00

## State
Google OAuth and email/password both work. Redirect to `/dashboard` done. Edge case: existing email user signing in with Google for the first time (account linking).

## Next
Handle account linking — if email exists in DB when Google user signs in, link accounts; else create user.

## Blockers
- None

## Key Files
- `app/api/auth/[...nextauth]/route.ts` — Auth configuration
- `lib/auth.ts` — Session callback logic
