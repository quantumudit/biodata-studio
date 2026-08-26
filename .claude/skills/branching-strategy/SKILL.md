---
name: branching-strategy
description: Git branching conventions and branch naming rules for this project. Apply when creating, naming, or reviewing branches.
---

# Branching Strategy

## Core Rules

- **Never commit directly to `main`** -- all changes go through a branch and a pull request.
- **One branch per logical change** -- do not bundle unrelated work into a single branch.
- **Always branch from `main`** -- never branch off another feature branch unless explicitly required.
- **Delete the branch after merging** -- do not leave stale branches around.

---

## Branch Naming Format

```
<type>/<short-description-in-kebab-case>
```

- `<type>` matches the commit type tags (same vocabulary as the commit messages skill)
- `<short-description>` is lowercase, hyphen-separated, 2-5 words max
- No slashes, dots, or special characters beyond the single `/` separator

---

## Type Prefixes

```
| Prefix      | When to use                                           |
|-------------|-------------------------------------------------------|
| feat/       | New feature or capability                             |
| fix/        | Bug fix                                               |
| chore/      | Deps, build tooling, dev environment                  |
| refactor/   | Code restructure, no behavior change                  |
| docs/       | Documentation only                                    |
| style/      | Formatting, naming -- no logic change                 |
| test/       | Adding or updating tests                              |
| remove/     | Deleting files, dead code, unused deps                |
| perf/       | Performance improvement                               |
| security/   | Security fix or hardening                             |
| config/     | Settings, env files, CI/CD changes                    |
```

---

## Examples

```
feat/snapshot-layout
feat/christian-biodata-template
feat/muslim-biodata-template
fix/pdf-print-overflow
fix/photo-upload-size-guard
chore/upgrade-html-to-image
docs/future-scope-muslim-template
refactor/extract-theme-hook
remove/legacy-image-migration
config/nginx-spa-fallback
style/ornament-spacing-themes
```

---

## Branch Lifecycle

1. Branch from `main`:
   ```bash
   git checkout main
   git pull
   git checkout -b feat/your-feature-name
   ```
2. Make commits following the commit messages convention.
3. Open a pull request targeting `main`.
4. Merge and delete the branch.

---

## Rules

- **Never** use generic names like `fix`, `update`, `wip`, `test`, `temp`, `new-branch`
- **Never** include your name or a date in the branch name -- the git log has that context
- **Always** use kebab-case -- no `camelCase`, no `snake_case`, no spaces
- If a branch name needs more than 5 words to describe the change, the change is probably too broad
