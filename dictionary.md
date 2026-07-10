# Janaru Dictionary

version: 3.0.0

Six short, distinctive words you can say in any AI coding session to trigger predictable, opinionated behavior — so you don't have to re-prompt long instructions.

**Core** (session continuity): `savegame`, `loadgame`, `newgame`  
**Toolkit** (adjacent ops): `shipit`, `auditthor`, `freshstart`

**How to use:** Reference this file (or the Janaru skill) in your project's AI instructions:

> Treat the words defined in Janaru as triggers. When the user says one, follow that word's protocol exactly.

Then just say the word.

**Layout (canonical):** `journals/YYYY-MM-DD/{context,janaru}.md` plus project-level `journals/ecosystem.md`. No project-name subfolder.

---

## savegame

**Save the session state.** (Core — formerly "checkpoint".)

1. Append ~3–5 lines to `journals/<date>/janaru.md` describing what just happened.
2. Rewrite `journals/<date>/context.md` with current **State**, **Next**, and **Blockers**.
3. Use real timestamps — run `date +%H:%M` (or equivalent). Do not estimate.
4. Keep `context.md` under ~300 tokens. A new session should `loadgame` in under 30 seconds.
5. Total overhead: ~200 tokens. Do not dump file contents or chat history.
6. Auto-save every 2–3 completed tasks, or before stepping away.

---

## loadgame

**Pick up where the last session died.** (Core — formerly "resume".)

1. Read `journals/ecosystem.md` if present (project profile, stack, conventions).
2. Find the most recent `journals/*/context.md` (sort by date folder `YYYY-MM-DD`, descending).
3. Read it.
4. Continue from the **Next** section without asking the user to re-explain.
5. If multiple journals exist for the same date, read the one with the most recent `Updated:` timestamp.
6. If no journal exists, say so and ask for a goal.
7. Project extensions (`backlog.md`, `tracker.md`, etc.) may be linked from `ecosystem.md` or the thin rule — read them when linked. Never paste their contents into `context.md`.

---

## newgame

**Install Janaru into the current project (first-time setup).** (Core)

1. Fetch `https://raw.githubusercontent.com/luisfer/janaru/main/install.md` and follow it end-to-end.
2. Use `https://raw.githubusercontent.com/luisfer/janaru/main/llms.txt` as the file index.
3. Detect the AI ecosystem in use (Cursor skills/rules, `CLAUDE.md`, `.claude/`, `~/.claude/skills/`, `AGENTS.md`, `.github/copilot-instructions.md`) and install into all that apply.
4. Ask the user which optional modules to install (currently: the `voice.md` copy guide).
5. Fill in `ecosystem.md` by inspecting the project (`package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`, etc.). Ask only for what can't be inferred.
6. Idempotent: if Janaru is already installed, do not duplicate. Compare and update only what changed; ask before overwriting locally edited files.
7. Confirm with a summary of files created and instruction files wired.

---

## shipit

**Ship the current work.** (Toolkit)

1. Run tests (auto-detect from `ecosystem.md`, else `npm test`, `pnpm test`, `cargo test`, `pytest`, `go test ./...`, etc.).
2. Run the build (`npm run build`, `cargo build --release`, `python -m build`, `go build`, etc.).
3. If tests or build fail: stop and report. Do not commit.
4. Stage changes: prefer already-staged files, or files touched this session. Do **not** `git add -A` unless the user asked for a full-tree ship. If scope is unclear, list candidates and ask.
5. Commit using the project's agreed convention if one exists (check `CONTRIBUTING.md`, `AGENTS.md`, recent `git log`). Otherwise use Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`, `perf:`, `build:`, `ci:`).
6. **No co-author line. No "Generated with" footer. No emoji.** Plain professional commit message.
7. Push to the current branch if it's a feature branch. If the current branch is `main` / `master` / `trunk`, **ask before pushing.**

---

## auditthor

**Thorough code audit. Report only — do not auto-fix.** (Toolkit)

Surface and prioritize:

- High-value refactors (duplicated logic, oversized files/functions, leaky abstractions).
- Likely bugs (off-by-one, missing null checks, unhandled promise rejections, race conditions).
- Dead code (unused exports, unreachable branches, orphaned files, commented-out blocks).
- Junk folders safe to delete: stale `.next/`, `dist/`, `build/`, `.turbo/`, `.cache/`, `coverage/`, `.parcel-cache/`, `node_modules/.cache/`, old `.DS_Store`, `*.log`.
- TODO / FIXME / HACK debt.
- Dependency smells (unused deps, outdated majors, security advisories if `npm audit` / `cargo audit` available).

Output as a prioritized markdown list grouped by category. Mark each item with effort (S/M/L) and impact (low/med/high). End with a "suggested next 3 actions" line.

---

## freshstart

**Wipe ephemeral build artifacts. Safely.** (Toolkit)

Delete only these, and only if present:

- `.next/`, `dist/`, `build/`, `out/`
- `.turbo/`, `.cache/`, `.parcel-cache/`, `.vite/`
- `coverage/`, `.nyc_output/`
- `node_modules/.cache/`
- `target/debug/` (Rust — leave `target/release/` unless asked)
- `__pycache__/`, `.pytest_cache/`, `.mypy_cache/`, `.ruff_cache/`

**Never touch:** source files, `node_modules/` itself, lockfiles (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `Cargo.lock`, `poetry.lock`, `uv.lock`), `.env*`, `.git/`, anything tracked by git that isn't in `.gitignore`.

List what will be deleted, ask once for confirmation, then delete.
