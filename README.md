<p align="center">
  <img src="./assets/banner.png" alt="Janaru — ジャーナル" width="100%" />
</p>

# Janaru / ジャーナル

A save-game system for AI coding sessions. *Janaru (ジャーナル) means "journal" in Japanese.*

When an AI session ends (crash, token limit, closed tab) the next session reads a small set of journal files and resumes without re-explanation.

**v3:** Cursor + Claude skill, lean `context.md`, path canon `journals/YYYY-MM-DD/`, validators that fail bloated handoffs.

## Install

Paste this into Cursor, Claude Code, Codex, Aider, Cline, ChatGPT, or any AI tool that can fetch a URL:

> Read `https://raw.githubusercontent.com/luisfer/janaru/main/install.md` and follow it. Use `https://raw.githubusercontent.com/luisfer/janaru/main/llms.txt` as the file index.

The agent installs a **skill** (full protocols), a **thin always-on rule** (discovery), and project `journals/`. Idempotent.

Or say `newgame` in a project that already has the dictionary/skill.

## Trigger words

Defined in [`dictionary.md`](./dictionary.md) and [`skill/SKILL.md`](./skill/SKILL.md).

| Word | Layer | Action |
|---|---|---|
| `savegame` | Core | Append to the session log; rewrite the resume point. |
| `loadgame` | Core | Read the most recent resume point and continue. |
| `newgame` | Core | Install Janaru into the current project. |
| `shipit` | Toolkit | Run tests, build, commit, push (scoped staging). |
| `auditthor` | Toolkit | Audit the codebase. Report only, no auto-fix. |
| `freshstart` | Toolkit | Delete ephemeral build artifacts. Source files are not touched. |

## Layout

```
your-project/
  journals/
    dictionary.md       # optional local copy (version-pinned)
    ecosystem.md        # stack, commands, conventions
    2026-07-10/
      context.md        # lean resume point (≤ ~300 tokens)
      janaru.md         # append-only log
      tasks.md          # optional
      pre-commit.md     # optional
  .cursor/
    rules/janaru.mdc    # thin always-on hook
    skills/janaru/      # optional project skill
```

Personal skill (cross-project): `~/.cursor/skills/janaru/SKILL.md`.

## Files

| File | Scope | Purpose |
|---|---|---|
| `dictionary.md` | project / skill | Trigger protocols (`version: 3.0.0`) |
| `ecosystem.md` | project | Stack, commands, conventions |
| `context.md` | session | Resume point — State / Next / Blockers |
| `janaru.md` | session | Append-only work history |
| `tasks.md` | session | Original requirements (optional) |
| `pre-commit.md` | session | Release checklist (optional) |
| `voice.md` | project (optional) | Copy guide for user-facing text |
| `skill/SKILL.md` | Cursor / Claude | Full protocols, auto-invocable |

## Save protocol

1. Append 3–5 lines to `janaru.md`.
2. Rewrite `context.md` with State, Next, Blockers.
3. Real timestamps from `date +%H:%M`.
4. Keep `context.md` under ~300 tokens.
5. Do not dump file contents or chat history.

## Validate / score

```bash
node scripts/validate.mjs path/to/journals
node scripts/score.mjs path/to/journals
node --test tests/validate.test.mjs
```

`validate` fails contexts over budget or missing Next. `score` reports median tokens, % under budget, dictionary version, days since last save.

## Recovery without trigger words

Say: "Read `journals/<date>/context.md` and continue." Resume from **Next**.

## llms.txt

[`llms.txt`](./llms.txt) is the machine-readable index. Agents fetch it without cloning.

## Example

See [`example/`](./example) for a filled-in session.

## License

MIT. See [`LICENSE`](./LICENSE).

## Author

[Luis Fernando Romero Calero](https://lfrc.me)
