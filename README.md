<p align="center">
  <img src="./assets/banner.png" alt="Janaru — ジャーナル" width="100%" />
</p>

# Janaru / ジャーナル

A save-game system for AI coding sessions. *Janaru (ジャーナル) means "journal" in Japanese.*

When an AI session ends (crash, token limit, closed tab) the next session reads a small set of journal files and resumes without re-explanation.

## Install

Paste this into Cursor, Claude Code, Codex, Aider, Cline, ChatGPT, or any AI tool that can fetch a URL:

> Read `https://raw.githubusercontent.com/luisfer/janaru/main/install.md` and follow it. Use `https://raw.githubusercontent.com/luisfer/janaru/main/llms.txt` as the file index.

The agent reads `install.md`, detects which AI tool the project uses (Cursor rules, `CLAUDE.md`, `.claude/`, `~/.claude/skills/`, `AGENTS.md`, or `.github/copilot-instructions.md`), fetches only the files it needs, and wires them into the correct location. Idempotent.

Manual alternative:

```bash
cp -r Janaru/ your-project/journals/$(date +%Y-%m-%d)/
```

## Trigger words

Six short words defined in [`dictionary.md`](./dictionary.md). Say one in any AI session and the agent follows that word's protocol.

| Word | Action |
|---|---|
| `savegame` | Append to the session log; rewrite the resume point. |
| `loadgame` | Read the most recent resume point and continue. |
| `newgame` | Install Janaru into the current project. |
| `shipit` | Run tests, build, commit, push. |
| `auditthor` | Audit the codebase. Report only, no auto-fix. |
| `freshstart` | Delete ephemeral build artifacts. Source files are not touched. |

The names are uncommon on purpose so they do not collide with normal conversation or with other tools.

## Files

| File | Scope | Purpose | Updates |
|---|---|---|---|
| `dictionary.md` | project | Trigger words | Once per project |
| `ecosystem.md` | project | Stack, commands, conventions | When stack changes |
| `voice.md` | project (optional) | Copy guide for user-facing text | Once |
| `tasks.md` | session | Original requirements | Once per session |
| `janaru.md` | session | Append-only work history | Append |
| `context.md` | session | Resume point | Rewrite per `savegame` |
| `pre-commit.md` | session | Release checklist | Reuse |

## Layout

```
your-project/
  journals/
    dictionary.md
    ecosystem.md
    voice.md            # if installed
    2026-04-18/
      tasks.md
      janaru.md
      context.md
      pre-commit.md
```

## ecosystem.md

A one-page project profile: language, framework, package manager, deploy target, commands, commit convention, constraints. Filled once. Read by `loadgame` and any new session, so the AI stops re-asking about stack on every restart. Works for non-code projects too.

## voice.md (optional)

A copy guide for user-facing text — UI strings, landing pages, READMEs, error messages, marketing pages. States the rules of a plain, declarative voice and lists banned patterns: "not just X, it's Y" constructions, hype verbs (*unlock*, *supercharge*, *transform*, *level up*), staccato closers, decorative adjectives (*seamless*, *powerful*, *intuitive*), fake empathy, AI-slop transitions.

## Save protocol

Triggers: say `savegame`, or auto-save every 2–3 completed tasks, or save before stepping away.

What happens:

1. Append 3–5 lines to `janaru.md`.
2. Rewrite `context.md` with current state, next action, blockers.
3. Use real timestamps from `date +%H:%M`. Do not estimate.
4. Keep `context.md` under ~300 tokens. A new session should `loadgame` in under 30 seconds.
5. Do not dump file contents or chat history into `context.md`.

## Recovery without trigger words

If the project does not have Janaru's dictionary loaded:

1. Start a new AI session.
2. Say: "Read `journals/<date>/context.md` and continue."
3. The session resumes from the "Next" section.

## llms.txt

[`llms.txt`](./llms.txt) is the machine-readable index at the repo root. It lists every Janaru file with its raw URL. AI agents fetch it to see what is available without cloning. Same convention used by Anthropic, Stripe, and Cloudinary.

## Placeholders in templates

| Placeholder | Meaning |
|---|---|
| `{PROJECT}` | Project name |
| `{DATE}` | YYYY-MM-DD |
| `{TIME}` | HH:MM |
| `{ONE_LINE_DESCRIPTION}` | What the project is |
| `{CURRENT_STATE}` | Where the work is |
| `{NEXT_ACTION}` | Immediate next step |
| `{TEST_CMD}`, `{BUILD_CMD}`, `{LINT_CMD}`, `{FORMAT_CMD}`, `{TYPECHECK_CMD}`, `{DEV_CMD}` | Commands for this repo |

## Language coverage

| Stack | Test | Build |
|---|---|---|
| Node | `npm test` | `npm run build` |
| Rust | `cargo test` | `cargo build --release` |
| Python | `pytest` | `python -m build` |
| Go | `go test ./...` | `go build` |

Other stacks work the same way: fill the commands in `ecosystem.md`.

## Example

See [`example/`](./example) for a filled-in session.

## License

MIT. See [`LICENSE`](./LICENSE).

## Author

[Luis Fernando Romero Calero](https://lfrc.me)
