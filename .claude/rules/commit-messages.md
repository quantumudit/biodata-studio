---
name: commit-messages
description: Git commit message conventions for this project. Apply these rules whenever writing or reviewing a git commit message.
---

# Skill -- Git Commit Messages

## Philosophy

- **Atomic commits** -- one logical change per commit. Never bundle unrelated changes.
- **Present tense** -- "add feature" not "added feature"
- **Clear and specific** -- the message should tell exactly what changed and why

---

## Format

```
<emoji> <type>: <short description>

[optional body -- explain WHY not WHAT, wrap at 72 chars]
```

---

## Type Tags + Emojis

```
| Emoji | Type     | When to use                                                   |
|-------|----------|---------------------------------------------------------------|
| 🌱    | feat     | New feature or capability added                               |
| 🐛    | fix      | Bug fix                                                       |
| 🧹    | chore    | Maintenance -- deps, build tooling, dev environment           |
| ♻️    | refactor | Code restructured, no behavior change                         |
| 📝    | docs     | Documentation only                                            |
| 🎨    | style    | Formatting, naming -- no logic change                         |
| ✅    | test     | Adding or updating tests                                      |
| 🗑️    | remove   | Deleting files, dead code, unused deps                        |
| 🚀    | perf     | Performance improvement                                       |
| 🔒    | security | Security fix or hardening                                     |
| 🔧    | config   | Config file changes -- settings, env files, CI/CD             |
```

`chore` vs `config`: use `chore` for things that affect the dev environment (deps, tooling,
build scripts); use `config` for files that affect how the project runs (settings, env vars, CI/CD pipelines).

---

## Examples

```
🌱 feat: add snapshot layout for square card export

700x700px card format for WhatsApp and social sharing,
mirrors the FullLayout token system via ThemeStyleTokens

🌱 feat: add Christian biodata template

New denomination/parish fields in formFields.json and
a new ChristianLayout component under components/preview/

🐛 fix: pdf print layout overflowing on A4

Print Tailwind variants were using px instead of mm units,
causing bottom content to clip on some printers

🧹 chore: upgrade html-to-image to latest

📝 docs: document future scope for Muslim biodata template

♻️ refactor: extract theme token lookup into shared hook

🎨 style: align ornament spacing across all four themes

🗑️ remove: delete legacy images.formal/casual migration path

🔧 config: add nginx try_files SPA fallback
```

---

## Rules

- **Never** write vague messages like `fix bug`, `update`, `wip`, `misc changes`
- **Never** commit multiple unrelated changes in one commit
- **Never** add a `Co-Authored-By` trailer or any AI attribution to commit messages
- **Always** check `git diff --staged` before writing the message
- If a commit needs more than 2 lines to describe -- it should be split
- Body is optional but encouraged for `feat` and `fix` commits

---

## How to Write a Good Message

1. Run `git diff --staged` -- read exactly what changed
2. Identify the single logical change
3. Pick the right emoji + type from the table
4. Write the subject line -- max 72 chars
5. If needed, add a blank line then a short body explaining WHY
