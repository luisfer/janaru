# Janaru - auth-refactor - 2026-01-15

---

## 09:30 - Session Start
- Goal: Add Google OAuth alongside existing auth
- Status: IN PROGRESS

---

## 10:15 - Checkpoint
- Installed next-auth, configured Google provider
- Created [...nextauth]/route.ts with credentials + google
- Hit issue: session callback not returning user role

---

## 11:45 - Checkpoint
- Fixed session callback - needed to fetch role from DB
- Google OAuth working in dev
- Email/password still works
- Ready for redirect logic

---

## 14:00 - Checkpoint
- Added redirect to /dashboard after login
- Tested both flows: Google and email/password
- Found edge case: existing user signing in with Google for first time
- Need to handle account linking

---
