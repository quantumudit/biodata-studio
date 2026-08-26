---
name: committing-changes
description: Step-by-step pre-commit checklist and commit workflow. Apply whenever staging and committing changes to ensure nothing sensitive or broken is committed.
disable-model-invocation: true
---

# Committing Changes

## Workflow Overview

Never commit blindly. Always follow this sequence:

1. Review what is staged
2. Check for sensitive files
3. Check for leftover debug code
4. Draft the commit message using the `commit-messages` skill
5. Commit

---

## Step 1 -- Review Staged Changes

Always run these before writing a commit message:

```bash
git status
git diff --staged
```

- `git status` shows what is staged, unstaged, and untracked
- `git diff --staged` shows the exact line-level changes going into the commit
- If the diff is too large to describe in one commit message, split the commit

---

## Step 2 -- Check for Sensitive Files

**Never commit these files under any circumstances:**

```
.env
.env.local
.env.development
.env.production
.env.*.local
*.pem
*.key
*_rsa
*_rsa.pub
credentials.json
secrets.yaml
secrets.toml
```

Check if any of these are accidentally staged:

```bash
git diff --staged --name-only
```

If any appear, unstage them immediately:

```bash
git restore --staged <file>
```

Also verify they are covered in `.gitignore` so they are never staged again:

```bash
# .gitignore should include at minimum:
.env
.env.local
.env.*.local
*.pem
*.key
```

---

## Step 3 -- Check for Debug Leftovers

Scan staged files for common debug artifacts that should not be committed:

```bash
git diff --staged | grep -E "^\+(.*)(console\.log|debugger|TODO:|FIXME:|HACK:)"
```

- Remove or resolve any `TODO` / `FIXME` that was not intentionally left
- Remove debug `console.log()` and `debugger` statements
- Unintentional `HACK:` markers should be addressed before committing

---

## Step 4 -- Draft the Commit Message

Follow the `commit-messages` skill to write the message:

- Pick the right emoji + type prefix from the type table
- Subject line: imperative mood, max 72 chars, no period at the end
- Body (optional): explain WHY, not WHAT -- wrap at 72 chars
- If the staged diff covers more than one logical change, split into separate commits first

---

## Step 5 -- Commit

```bash
git commit -m "<emoji> <type>: <short description>"
```

For commits that need a body:

```bash
git commit -m "<emoji> <type>: <short description>

<body explaining why -- wrapped at 72 chars>"
```

---

## Quick Pre-commit Checklist

```
[ ] git diff --staged reviewed -- no surprises
[ ] No .env / .env.local / secrets files staged
[ ] No debug console.log / debugger statements left in
[ ] No unresolved TODO / FIXME staged unintentionally
[ ] Commit covers one logical change only
[ ] Commit message follows commit-messages skill
```
