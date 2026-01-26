# Janaru / ジャーナル

A save-game system for AI coding sessions.

*Janaru (ジャーナル) means "journal" in Japanese.*

## Why

AI sessions crash. Token limits hit. Conversations die. Without checkpoints, you re-explain everything from scratch. Janaru gives you a resume point.

## What This Is

Think of a "save game" for AI. If a conversation dies (Cursor crash, token limit, etc.), you don't have to re-explain where you were. You resume from `context.md`.

## Quick Start

```bash
# Copy template into your project
cp -r Janaru/ your-project/journals/$(date +%Y-%m-%d)/
```

## Structure

```
Janaru/                  # This repo (template source)

your-project/
  journals/
    2026-01-26/          # Copied from Janaru/
      tasks.md           # Requirements (immutable)
      janaru.md          # Append-only log
      context.md         # Current state (rewritten)
      pre-commit.md      # Release checklist
```

## Files

| File | Purpose | Updates |
|------|---------|---------|
| tasks.md | Original requirements | Once |
| janaru.md | Work history | Append |
| context.md | Resume point | Rewrite |
| pre-commit.md | Release checklist | Reuse |

## Checkpoint Protocol

**Triggers:**
- Manual: Say "checkpoint"
- Auto: Every 2-3 tasks

**What happens:**
1. Append to janaru.md (~3-5 lines)
2. Rewrite context.md with current state
3. ~200 token overhead
4. Use actual timestamps (run `date` or equivalent), don't estimate

## Recovery

If session dies:
1. Start new AI session
2. Say: "Read `journals/2026-01-26/context.md` and continue"
3. Done

## Placeholders

Replace in templates:
- `{PROJECT}` - Project name
- `{DATE}` - YYYY-MM-DD
- `{TIME}` - HH:MM
- `{ONE_LINE_DESCRIPTION}` - What the project is
- `{CURRENT_STATE}` - Where you're at
- `{NEXT_ACTION}` - Immediate next step
- `{REPO_ROOT}` - Repo root folder name or path
- `{TEST_CMD}` - Test command for the repo
- `{BUILD_CMD}` - Build command for the repo
- `{FORMAT_CMD}` - Format command for the repo
- `{LINT_CMD}` - Lint command for the repo
- `{TYPECHECK_CMD}` - Typecheck command for the repo

## Example

See the `example/` folder for a filled-in session showing what these files look like in practice.

## Language Agnostic

Janaru works with any language or framework. The placeholders (`{TEST_CMD}`, `{BUILD_CMD}`, etc.) accept any commands:

| Stack | Test | Build |
|-------|------|-------|
| Node | `npm test` | `npm run build` |
| Rust | `cargo test` | `cargo build --release` |
| Python | `pytest` | `python -m build` |
| Go | `go test ./...` | `go build` |

## Best Practices

**What makes a good `context.md`:**
- Fits in ~200-300 tokens
- A new session can resume in <30 seconds
- Includes: current state, blockers, immediate next action
- Excludes: full code snippets, long conversation history, commentary

**Anti-patterns:**
- Dumping entire file contents into `context.md`
- Vague status like "working on it"
- Forgetting to checkpoint after completing a task

**When to checkpoint:**
- After any task that took >5 minutes
- Before stepping away (lunch, EOD)
- Any time you think: "I'd hate to re-explain this"

## License

MIT

## Author

[Luis Fernando Romero Calero](https://lfrc.me)
