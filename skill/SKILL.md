---
name: janaru
description: >-
  Save-game system for AI coding sessions. Use when the user says savegame,
  loadgame, newgame, shipit, auditthor, or freshstart; when resuming work after
  a crashed or closed session; when installing Janaru; or when asked about
  session continuity, journals, or checkpoints.
---

# Janaru

Session continuity for AI coding. Read project `journals/ecosystem.md` before asking about stack. On `loadgame`, continue from the newest `journals/*/context.md` **Next** section without re-asking.

**Canonical layout:** `journals/YYYY-MM-DD/{context,janaru}.md` + `journals/ecosystem.md`.

**Core:** `savegame` · `loadgame` · `newgame`  
**Toolkit:** `shipit` · `auditthor` · `freshstart`

If `journals/dictionary.md` exists, follow it (it may pin a version). Otherwise follow this skill.

---

## savegame

1. Append ~3–5 lines to `journals/<date>/janaru.md`.
2. Rewrite `journals/<date>/context.md` with **State**, **Next**, **Blockers**.
3. Real timestamp via `date +%H:%M`. Do not estimate.
4. Keep `context.md` under ~300 tokens. No file dumps, no chat history, no Progress checkboxes.
5. Auto-save every 2–3 completed tasks, or before stepping away.

Lean shape:

```markdown
# {PROJECT} — {DATE}
Updated: {TIME}

## State
…

## Next
…

## Blockers
- None
```

Optional `## Proof` / `## Key Files` only when they shorten resume time. Link extensions (`backlog.md`, etc.) from `ecosystem.md` — never paste them into `context.md`.

---

## loadgame

1. Read `journals/ecosystem.md` if present.
2. Newest `journals/YYYY-MM-DD/context.md` (date folder descending; then `Updated:`).
3. Continue from **Next** without re-asking.
4. If none exists, say so and ask for a goal.

---

## newgame

Fetch and follow `https://raw.githubusercontent.com/luisfer/janaru/main/install.md`. Index: `https://raw.githubusercontent.com/luisfer/janaru/main/llms.txt`. Idempotent. Fill `ecosystem.md` from the project; ask only what cannot be inferred.

---

## shipit

1. Test → build (from `ecosystem.md` or auto-detect). Stop on failure.
2. Stage: already-staged files, or files touched this session. Do **not** `git add -A` unless asked. If unclear, list and ask.
3. Conventional Commits (or project convention). No co-author, no "Generated with", no emoji.
4. Push feature branches; **ask** before pushing `main` / `master` / `trunk`.

---

## auditthor

Report only — do not auto-fix. Prioritize refactors, bugs, dead code, junk dirs, TODO debt, dependency smells. Effort S/M/L × impact low/med/high. End with suggested next 3 actions.

---

## freshstart

Delete only ephemeral build artifacts (`.next/`, `dist/`, `.turbo/`, caches, etc.). Never source, lockfiles, `.env*`, `node_modules/`, `.git/`. List, ask once, then delete.

---

## Efficiency

- `context.md` ≤ ~300 tokens; resume < 30 seconds.
- Validate a journals tree: `node scripts/validate.mjs path/to/journals`
- Score efficiency: `node scripts/score.mjs path/to/journals`

Spec: https://github.com/luisfer/janaru
