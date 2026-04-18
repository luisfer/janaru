# Janaru / ジャーナル

A save-game system for AI coding sessions.

*Janaru (ジャーナル) means "journal" in Japanese.*

## Why

AI sessions crash. Token limits hit. Conversations die. Without checkpoints, you re-explain everything from scratch. Janaru gives you a resume point.

## Quick Start

### Option A — One-line install via any AI agent (recommended)

Paste this into Cursor, Claude Code, Codex, ChatGPT, or any AI tool inside your project:

> Read `https://raw.githubusercontent.com/luisfer/janaru/main/install.md` and follow it. Use `https://raw.githubusercontent.com/luisfer/janaru/main/llms.txt` as the file index.

The agent will:
1. Detect which AI tool your project uses (Cursor rules, `CLAUDE.md`, `AGENTS.md`, Copilot instructions, or a Claude skill).
2. Fetch only the Janaru files it needs from this repo.
3. Wire them into the correct location automatically.
4. Ask you which optional modules to install (e.g. the [voice guide](./voice.md)).

No clone, no copy-paste, no manual config.

### Option B — Manual copy

```bash
cp -r Janaru/ your-project/journals/$(date +%Y-%m-%d)/
```

### Machine-readable index

[`llms.txt`](./llms.txt) lists every Janaru file with its raw URL — the same convention used by Anthropic, Stripe, Cloudinary, and others. Point any LLM at it and it will know what to fetch.

## Structure

```
Janaru/                  # This repo (template source)

your-project/
  journals/
    dictionary.md        # Trigger words (shared across sessions)
    ecosystem.md         # Project profile: stack, commands, conventions
    2026-01-26/
      tasks.md           # Requirements (immutable)
      janaru.md          # Append-only log
      context.md         # Current state (rewritten)
      pre-commit.md      # Release checklist
```

## Files

| File | Scope | Purpose | Updates |
|------|-------|---------|---------|
| `dictionary.md` | project | Trigger words | Once per project |
| `ecosystem.md` | project | Stack, commands, conventions | When stack changes |
| `tasks.md` | session | Original requirements | Once |
| `janaru.md` | session | Work history | Append |
| `context.md` | session | Resume point | Rewrite |
| `pre-commit.md` | session | Release checklist | Reuse |

## Dictionary

[`dictionary.md`](./dictionary.md) defines six short, distinctive words you can say in any session — `shipit`, `auditthor`, `savegame`, `loadgame`, `newgame`, `freshstart` — to trigger predictable behavior without re-prompting. Tool-agnostic: works in Cursor, Claude Code, ChatGPT, anywhere.

The names are deliberately uncommon (`savegame` instead of "checkpoint", `loadgame` instead of "resume") so they don't collide with words you'd use in normal conversation or with other tools.

## Ecosystem

[`ecosystem.md`](./ecosystem.md) is a one-page project profile: language, framework, package manager, deploy target, commands, commit conventions, constraints. Fill it once and the AI stops asking *"is this Node or Python?"* every session. Works for non-code projects too (content, research, design).

## Voice (optional)

[`voice.md`](./voice.md) is a plain, declarative copy guide for any user-facing text — UI strings, landing pages, READMEs, error messages, marketing pages. It bans the standard AI-slop tropes ("not just X, it's Y", hype verbs like *unlock* and *supercharge*, staccato closers, decorative adjectives, fake empathy) and gives concrete rewrites. Install it alongside Janaru, or skip it.

## Save Protocol

**Triggers:** Say `savegame`, or auto every 2–3 completed tasks, or before stepping away.

**What happens:**
1. Append ~3–5 lines to `janaru.md`.
2. Rewrite `context.md` with current state, next action, blockers.
3. Use real timestamps (run `date +%H:%M`) — don't estimate.
4. Keep `context.md` under ~300 tokens. A new session should `loadgame` in <30 seconds.
5. Don't dump file contents or chat history into `context.md`.

## Recovery

If a session dies:

1. Start a new AI session.
2. Say: `loadgame` (or: "Read `journals/2026-01-26/context.md` and continue").
3. Done.

## Placeholders

Replace in templates:

| Placeholder | Meaning |
|-------------|---------|
| `{PROJECT}` | Project name |
| `{DATE}` | YYYY-MM-DD |
| `{TIME}` | HH:MM |
| `{ONE_LINE_DESCRIPTION}` | What the project is |
| `{CURRENT_STATE}` | Where you're at |
| `{NEXT_ACTION}` | Immediate next step |
| `{TEST_CMD}` / `{BUILD_CMD}` / `{LINT_CMD}` / `{FORMAT_CMD}` / `{TYPECHECK_CMD}` / `{DEV_CMD}` | Commands for this repo |

## Language Agnostic

| Stack | Test | Build |
|-------|------|-------|
| Node | `npm test` | `npm run build` |
| Rust | `cargo test` | `cargo build --release` |
| Python | `pytest` | `python -m build` |
| Go | `go test ./...` | `go build` |

## Example

See [`example/`](./example) for a filled-in session.

## License

MIT

## Author

[Luis Fernando Romero Calero](https://lfrc.me)
