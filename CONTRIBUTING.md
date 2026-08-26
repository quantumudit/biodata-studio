# Contributing to Biodata Studio

This is a solo project, but if you find an issue or have a suggestion,
feel free to open an issue or pull request.

## Local Development Setup

1. Fork and clone the repo
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev` (http://localhost:3000)
4. Create a branch: `git checkout -b feat/your-feature-name`
5. Make your changes
6. Type-check: `npm run lint`
7. Commit following the commit message conventions below
8. Open a pull request targeting `main`

No test suite exists. No environment variables or secrets are required --
this app is fully client-side and stores all data in localStorage.

## Branch Naming

Branches follow `<type>/<short-kebab-description>`:

```
feat/christian-biodata-template
fix/pdf-print-overflow
chore/upgrade-html-to-image
docs/update-future-scope
```

Never commit directly to `main`.

## Commit Message Guidelines

Every commit uses an emoji + type prefix:

```
<emoji> <type>: <short description>
```

| Emoji | Type     | When to use                              |
|-------|----------|------------------------------------------|
| 🌱    | feat     | New feature or capability                |
| 🐛    | fix      | Bug fix                                  |
| 🧹    | chore    | Deps, build tooling, dev environment     |
| ♻️    | refactor | Code restructure, no behavior change     |
| 📝    | docs     | Documentation only                       |
| 🎨    | style    | Formatting or naming, no logic change    |
| 🗑️    | remove   | Deleting files, dead code, unused deps   |
| 🚀    | perf     | Performance improvement                  |
| 🔧    | config   | Config file changes                      |

Examples:

```
🌱 feat: add snapshot layout for square card export
🐛 fix: pdf print layout overflowing on A4
📝 docs: document future scope for Muslim biodata template
🔧 config: add nginx try_files SPA fallback
```

Thanks for checking out the project!
