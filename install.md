# Install Janaru

Instructions for an AI agent to install Janaru into a project. Detect the AI ecosystem in use, then wire the right files into the right places.

> **For the user:** Paste this one line into any AI chat inside your project:
>
> > Read `https://raw.githubusercontent.com/luisfer/janaru/main/install.md` and follow it. Use `https://raw.githubusercontent.com/luisfer/janaru/main/llms.txt` as the file index.
>
> The agent will detect your stack, fetch only the files it needs, and install them.
>
> **Already have Janaru installed in another project on this machine?** Just say `newgame` — the dictionary will trigger this same install protocol.

---

## Step 1 — Detect the AI ecosystem

Check the project root (and parent directories, up to the user's home) for these markers, **in this order of priority**:

| Priority | Marker(s) | Ecosystem | Install target |
|---|---|---|---|
| 1 | `.cursor/rules/` exists, OR `.cursorrules` file | **Cursor** | `.cursor/rules/janaru.mdc` |
| 2 | `CLAUDE.md` exists at project root | **Claude Code (project)** | Append to `CLAUDE.md` |
| 3 | `.claude/` directory exists | **Claude Code (project, dir form)** | `.claude/CLAUDE.md` |
| 4 | `~/.claude/skills/` exists (user home) | **Claude Code (skills)** | `~/.claude/skills/janaru/SKILL.md` |
| 5 | `AGENTS.md` exists at project root | **Generic AGENTS.md** (Codex, Aider, Cline, etc.) | Append to `AGENTS.md` |
| 6 | `.github/copilot-instructions.md` exists | **GitHub Copilot** | Append to `.github/copilot-instructions.md` |
| 7 | None of the above | **Unknown** | Ask the user (see Step 2) |

**Multiple matches:** if more than one is present (e.g. both `.cursor/` and `CLAUDE.md`), install into **all** of them. Janaru is small and ecosystem-agnostic; redundancy is harmless.

**Detection commands:**

```bash
# Run these from the project root
ls .cursor/rules/ 2>/dev/null
test -f CLAUDE.md && echo "claude-md"
test -d .claude && echo "claude-dir"
test -d ~/.claude/skills && echo "claude-skills"
test -f AGENTS.md && echo "agents-md"
test -f .github/copilot-instructions.md && echo "copilot"
```

---

## Step 2 — If no ecosystem is detected

Ask the user this exact question, single-select:

> **Which AI tool do you use most in this project?**
> 1. Cursor → I'll create `.cursor/rules/janaru.mdc`
> 2. Claude Code → I'll create `CLAUDE.md`
> 3. Codex / Aider / Cline / generic → I'll create `AGENTS.md`
> 4. GitHub Copilot → I'll create `.github/copilot-instructions.md`
> 5. All of them → I'll create one of each.

Wait for an answer. Do not guess.

---

## Step 3 — Decide what to install

Janaru has two independent modules. Ask the user which they want, or install both by default.

| Module | Files | Purpose |
|---|---|---|
| **Core (always)** | `dictionary.md`, `ecosystem.md`, `context.md`, `janaru.md`, `tasks.md`, `pre-commit.md` | Save/load/audit/ship trigger words and journaling system |
| **Voice (optional)** | `voice.md` | Plain, declarative copy guide for user-facing text |

Fetch only the modules the user wants. URLs are listed in `llms.txt` at the repo root.

---

## Step 4 — Install the core (journaling system)

1. Create the journals folder structure in the **project root**:

   ```
   journals/
     dictionary.md      ← copy from janaru
     ecosystem.md       ← copy template from janaru, then help the user fill it in
     <today>/           ← e.g. 2026-04-18/
       tasks.md         ← copy template
       janaru.md        ← copy template
       context.md       ← copy template
       pre-commit.md    ← copy template
   ```

   Use today's date from `date +%Y-%m-%d`. Do not estimate.

2. Fetch each file from the URLs in `llms.txt` and write it to the path above.

3. Fill in `ecosystem.md` placeholders by inspecting the project (read `package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`, etc.). Ask the user for anything you can't infer.

4. Leave `tasks.md` empty for now (the user fills it at session start) or seed it with the first request.

---

## Step 5 — Install the voice guide (if requested)

Copy `voice.md` to one of:

- `docs/voice.md` (preferred if `docs/` exists)
- `journals/voice.md` (next to dictionary)
- Project root as `VOICE.md`

Pick the first applicable.

---

## Step 6 — Wire it into the AI's instruction file

For **each ecosystem detected in Step 1**, append the following block to the install target. Replace `{TARGETS}` with the actual files installed.

### Block to append

```markdown
## Janaru

This project uses Janaru for session continuity and (optionally) a plain-copy voice guide.

- **Trigger words** are defined in `journals/dictionary.md`. When the user says one of them (`shipit`, `auditthor`, `savegame`, `loadgame`, `freshstart`), follow that word's protocol exactly.
- **Project profile** is in `journals/ecosystem.md`. Read it at the start of every session before asking about stack, commands, or conventions.
- **Session state** lives in `journals/<date>/context.md`. On `loadgame`, read the most recent one and continue from its "Next" section without re-asking.
- **Voice guide** (if installed): all user-facing copy follows `{VOICE_PATH}`. Read it before writing UI strings, landing pages, READMEs, or any text humans will read.

Spec source: <https://github.com/luisfer/janaru>
```

### Per-ecosystem notes

- **Cursor (`.cursor/rules/janaru.mdc`):** wrap the block with the standard Cursor rule frontmatter:

  ```mdc
  ---
  description: Janaru session-continuity and voice protocol
  alwaysApply: true
  ---

  <block here>
  ```

- **Claude Code (`CLAUDE.md`):** append the block to the end of the file under a `## Janaru` heading. If `CLAUDE.md` doesn't exist, create it with just this block.

- **Claude Code skill (`~/.claude/skills/janaru/SKILL.md`):** wrap with skill frontmatter:

  ```markdown
  ---
  name: janaru
  description: Session continuity (savegame/loadgame) and plain-copy voice guide. Use when the user says shipit, auditthor, savegame, loadgame, or freshstart, or when writing user-facing copy.
  ---

  <block here>
  ```

- **AGENTS.md:** append under a `## Janaru` heading.

- **`.github/copilot-instructions.md`:** append under a `## Janaru` heading.

---

## Step 7 — Confirm and report

After install, print a summary:

```
Janaru installed.

Files created:
  journals/dictionary.md
  journals/ecosystem.md
  journals/2026-04-18/{tasks,janaru,context,pre-commit}.md
  docs/voice.md           (if voice module installed)

Wired into:
  .cursor/rules/janaru.mdc
  CLAUDE.md
  AGENTS.md

Try it: say "savegame" to test, or "loadgame" in a fresh session.
```

If anything failed (network error, write permission, etc.), list the failures and stop. Do not attempt repairs without asking.

---

## Idempotency

If Janaru is already installed (any of the wire-in blocks already exist), do **not** duplicate. Compare and update only what changed. If the dictionary or voice file already exists with local edits, ask before overwriting.

---

## Uninstall (for reference)

To remove Janaru, delete the `journals/` folder and remove the `## Janaru` block from each AI instruction file. Lockfiles, source code, and `.git/` are never touched.
