# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run lint         # TypeScript type-check (tsc --noEmit) — no separate ESLint config
npm run clean        # Remove dist/
```

No test suite exists in this project.

## Git Workflow

### Rules (always active)

Two rules in `.claude/rules/` apply to every file in this repo:

- **ASCII only** (`.claude/rules/ascii-only.md`) -- all code, config, and markdown must
  use plain ASCII characters. No Unicode, smart quotes, em dashes, or special symbols
  outside of code blocks and ASCII art.
- **Commit messages** (`.claude/rules/commit-messages.md`) -- every commit must use the
  emoji + type prefix format (e.g. `🌱 feat: ...`, `🐛 fix: ...`). Never write vague
  messages like `fix`, `update`, or `wip`.

### Before creating a branch

Apply the `/branching-strategy` skill. All branches follow `<type>/<short-kebab-description>`
and are always cut from `main`. Never commit directly to `main`.

### Before committing

Apply the `/committing-changes` skill. It walks through the full pre-commit sequence:
staged diff review, sensitive file check, debug artifact scan (`console.log`, `debugger`),
and commit message draft -- in that order.

## Architecture

Fully client-side React 19 + TypeScript + Vite app with Tailwind CSS v4. No backend, no API calls, no secrets. All user data persists in `localStorage` under the key `matrimony_biodata_perfect_v2`.

User flow is a two-step wizard controlled by `currentStep` state in `App.tsx`:
1. **Form step** (`FormView`) — data entry across four tabs
2. **Preview step** (`PreviewView`) — theme/layout selection and export

## Data Layer (`src/data/`)

Three files drive all configurable behaviour — edit these before touching components:

- **`defaultBiodata.json`** — pre-loaded sample data (shape: `BiodiversityData` from `src/types.ts`). This is what the Reset button restores.
- **`formFields.json`** — field definitions (`label`, `type`, `section`, `colSpan`, `placeholder`) for all four form tabs. Adding or removing a field only requires changing this file and nothing else.
- **`themeConfig.ts`** — `THEME_CONFIG` map keyed by `DesignTheme`. Must be `.ts` (not `.json`) so Tailwind's scanner picks up the class strings and does not purge them in production builds. Contains Tailwind class tokens, swatch color, export background color, and display label per theme.

## Key Types (`src/types.ts`)

- `BiodiversityData` — the full state shape (personal, professional, family, contact, partnerPreferences, image)
- `LayoutOption` — `'full' | 'snapshot'`
- `DesignTheme` — `'natural' | 'royal' | 'minimalist' | 'sunset'`
- `ThemeStyleTokens` / `ThemeConfig` / `ThemeConfigMap` — theme token types consumed by layout components
- `FormFieldDef` / `FormFieldMap` — field definition types consumed by tab components

## Hooks (`src/hooks/`)

- **`useBiodataStorage`** — `localStorage` read/write + legacy `images.formal/casual → image` migration. Returns `[biodata, setBiodata]`. Used directly in `App.tsx` in place of a raw `useState`.
- **`usePhotoUpload`** — `FileReader` base64 conversion with 4 MB guard. Returns `{ handleFileChange, removePhoto }`. Used only in `PhotoTab`.

## Component Tree

```
App.tsx
├── AppHeader              (components/layout/)
├── StepIndicator          (components/layout/)
├── FormView               (views/)
│   ├── LayoutSelector     (components/studio/)
│   └── ControlPanel       (components/form/)
│       ├── PersonalTab
│       ├── ProfessionalFamilyTab
│       ├── PreferencesTab
│       └── PhotoTab        ← uses usePhotoUpload
│           └── FormField   (reusable labeled input/textarea)
└── PreviewView            (views/)
    ├── ThemeSelector      (components/studio/)
    ├── ExportPanel        (components/studio/)
    └── BiodataCard        (components/preview/)
        ├── FullLayout      — 760×1050px A4 (print: 210mm×297mm)
        └── SnapshotLayout  — 700×700px square card
            shared/
            ├── ThemeOrnament
            ├── ThemeAvatarPlaceholder
            └── DetailBlock
```

## Theming

`THEME_CONFIG[theme]` in `src/data/themeConfig.ts` is the single source of truth for all theme styling. `BiodataCard` reads it and passes a `styles: ThemeStyleTokens` prop down to `FullLayout` and `SnapshotLayout` — neither layout does its own theme lookup. Custom font names (`font-editorial`, `font-warm`, `font-royal`, `font-modern`) are loaded in `src/index.css`.

## Export

- **PNG**: `html-to-image` (`toPng`) targets `#biodata-print-section` at 2.2× pixel ratio. Background color comes from `THEME_CONFIG[theme].exportBgColor`.
- **PDF**: `window.print()` — layout components use `print:` Tailwind variants to swap pixel dimensions for `mm`-based print sizes.

## Deployment

- **GitHub Pages**: `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
  `vite.config.ts` sets `base: '/biodata-studio/'` when `GITHUB_ACTIONS=true` (injected
  automatically by the runner). Locally, `base` stays `/`. If the repo is ever renamed,
  update the base string in `vite.config.ts` to match.
- **Live URL**: https://quantumudit.github.io/biodata-studio/

## Docker

Multi-stage build: `node:22-alpine` compiles to `dist/`, then `nginx:alpine` serves it. `nginx.conf` includes a `try_files` SPA fallback. Runs on port 8080 via `docker compose up --build`.

## Path Alias

`@` resolves to `src/` (configured in `vite.config.ts`).

## Adding a New Religion Template (Future Work)

See `README.md` Future Scope section. The intended approach:
1. Add a new section key to `formFields.json` with the religion-specific fields
2. Add a new `DesignTheme` variant (or a separate `BiodataTemplate` type) in `types.ts`
3. Add a new entry to `THEME_CONFIG` in `themeConfig.ts`
4. Create a new layout component under `src/components/preview/` following the `FullLayout`/`SnapshotLayout` pattern
