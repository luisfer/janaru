# Context Checkpoint
Updated: 2026-06-10 00:56 +07 — #56(a) shipped + consolidation audit → MK-OPS-04

## Project
mekong-dashboard — options paper-trade discipline desk + Console CLI.

## Status
- **On `main`**, pushed through `ebd276a` (discovery probe). **`9d8c5f5` (#56a catalyst gate fix) committed locally, NOT pushed.**
- **Cadence:** `savegame` after every commit / sub-step — keep this current.

## Progress (this session)
- [x] Simulacra cleanup — sim list honesty, Glance resize, ledger type pass (Pieces 1–3)
- [x] CBOE validated as primary marks source (no paid data)
- [x] Operator-map consolidation verdict table
- [x] Prod-book + CI diagnosis → `findings.md`
- [x] Janaru revival + AGENTS.md wiring (`ebed632`)
- [x] **MK-SIM-04** — close-not-delete cohort guard (pending commit)

## MK-SIM-04 — what changed (close-not-delete)
- `lib/simulacra.ts`: new `removeSimulacraEntry(id)` → contract-bearing entries **close** (cohort preserved); only hollow (no-contract) entries hard-delete.
- `lib/cli/exec.ts`: `sim delete` routes through it, honest messaging per outcome.
- `app/api/simulacra/route.ts`: single-id DELETE branch uses the same guard.
- `components/simulacra/SimulacraRowActions.tsx`: declutter — Research · Review · Close/Reopen; danger **Remove** only on hollow rows. Close/Reopen now use entry id (no ticker ambiguity).
- Proven (temp data dir): contract → closed (stays), hollow → deleted, missing → not_found. `build` + `check:vocab` + `test:gates` all green.

## MK-CI-01 — what changed (#52)
- `package.json`: `yahoo-finance2 ^3.13.0`→`^3.15.2`.
- `lib/yahoo-bulk.ts`: scanner hot path `historical()`→`chart()` (the river-scan timeout cause). Remaining 14 `historical()` callsites **auto-map to chart()** in 3.15.2 (still work, emit a one-time deprecation notice) — clean-up follow-up, not blocking.
- `lib/vault-scanner.ts` + `lib/types.ts`: `VaultScanOptions.deadlineMs` → scan loop breaks at budget, `VaultReport.partial=true` (no throw).
- `app/api/river/scan/route.ts`: passes `deadlineMs = now + 230s` (under the 300s cap, headroom for enrichment); surfaces `partial` in the 200 response.
- Proven (real Yahoo): chart() → AAPL/MSFT 252 bars + live price/vol; deadline-in-past → `partial=true, scanned=0`, no throw. build + check:vocab + test:gates green.

## Next
1. **Push `9d8c5f5`** (awaiting operator OK).
2. **MK-OPS-04** — consolidation fusion train (4 scoped pieces: drop newspaper-capture from marks cron · retire `/api/confluence/*` + retarget 3 callers · delete `scan-hourly.yml` · add legacy nouns to vocab guard).
3. **Operator calls pending:** (a) #55 — recover 7 orphans? (lean leave-as-is); (b) set `MEKONG_RIVER_AUTO_SIMULACRA=1`? (strict pass now possible but adds nothing until set); (c) confirm Vercel deploys green.
4. **#53 / MK-UX-21** — daily workflow legibility (big fuzzy one).
5. Follow-up: 14 residual `historical()` callsites (low pri — auto-mapped in 3.15.2).

## Key commits (today)
`baa81d4` sim list honesty · `91eb039` glance resize · `936ac92` type pass · `6ec00b5` cboe check · `d0ab19a` prod-health probe · `5c5e509` consolidation table · `ebed632` janaru revival

## Resume
> `loadgame`: read `ecosystem.md` + this file + `backlog.md`; continue from **Next** without re-asking. Findings in `findings.md`. Verify with `npm run build` + `npm run check:vocab`; Conventional Commits, **no co-author footer**; ask before pushing to `main`.
