# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build -> dist/
npm run preview      # Preview production build locally
npm run lint         # TypeScript type-check (tsc --noEmit) -- no separate ESLint config
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

Fully client-side React 19 + TypeScript + Vite app with Tailwind CSS v4. No backend, no API
calls, no secrets. Each religion template stores data in a separate `localStorage` key:

- Hindu:    `matrimony_biodata_perfect_v2`
- Muslim:   `matrimony_muslim_biodata_v1`
- Christian:`matrimony_christian_biodata_v1`

User flow is a two-step wizard controlled by `currentStep` state in `App.tsx`:
1. **Form step** (`FormView`) -- data entry across four tabs
2. **Preview step** (`PreviewView`) -- theme/layout selection and export

The active religion is tracked in `religionTemplate: ReligionTemplate` state in `App.tsx`.
Only the Personal section differs per religion (the "render only the diff" pattern);
Professional, Family, Preferences, and Photo tabs are fully shared across all templates.

## Data Layer (`src/data/`)

These files drive configurable behaviour -- edit them before touching components:

- **`defaultBiodata.json`** -- Hindu sample data (shape: `BiodiversityData`). Reset restores this.
- **`defaultMuslimBiodata.json`** -- Muslim sample data (shape: `MuslimBiodataData`).
- **`defaultChristianBiodata.json`** -- Christian sample data (shape: `ChristianBiodataData`).
- **`formFields.json`** -- Hindu Personal field definitions (`label`, `type`, `section`, `colSpan`, `placeholder`).
- **`muslimFormFields.json`** -- Muslim Personal field definitions (sect, maslak, religiosity, mehrPreference).
- **`christianFormFields.json`** -- Christian Personal field definitions (denomination, diocese, parish, baptism, confirmation).
- **`themeConfig.ts`** -- `THEME_CONFIG` map keyed by `DesignTheme` and `AVAILABLE_THEMES` map keyed by
  `ReligionTemplate`. Must be `.ts` (not `.json`) so Tailwind's scanner picks up class strings and does
  not purge them in production builds.

## Key Types (`src/types.ts`)

- `BasePersonalInfo` -- shared personal fields across all religions (name, dob, age, height, weight, complexion)
- `HinduPersonalInfo extends BasePersonalInfo` -- adds religion, caste, gotra, moonSign, nakshatra
- `MuslimPersonalInfo extends BasePersonalInfo` -- adds sect, maslak, religiosity, mehrPreference
- `ChristianPersonalInfo extends BasePersonalInfo` -- adds denomination, diocese, parish, baptism, confirmation
- `BiodiversityData` -- Hindu full state shape
- `MuslimBiodataData` -- Muslim full state shape
- `ChristianBiodataData` -- Christian full state shape
- `AnyBiodataData` -- `BiodiversityData | MuslimBiodataData | ChristianBiodataData` union used in App/FormView/PreviewView
- `ReligionTemplate` -- `'hindu' | 'muslim' | 'christian'`
- `LayoutOption` -- `'full' | 'snapshot'`
- `DesignTheme` -- `'natural' | 'royal' | 'minimalist' | 'sunset' | 'emerald' | 'sapphire'`
- `ThemeStyleTokens` / `ThemeConfig` / `ThemeConfigMap` -- theme token types consumed by layout components
- `FormFieldDef` / `FormFieldMap` -- field definition types consumed by tab components

## Hooks (`src/hooks/`)

- **`useBiodataStorage`** -- Hindu `localStorage` read/write + legacy image migration. Returns `[biodata, setBiodata]`.
- **`useMuslimBiodataStorage`** -- Muslim `localStorage` read/write. Returns `[biodata, setBiodata]`.
- **`useChristianBiodataStorage`** -- Christian `localStorage` read/write. Returns `[biodata, setBiodata]`.
- **`usePhotoUpload`** -- `FileReader` base64 conversion with 4 MB guard. Returns `{ handleFileChange, removePhoto }`. Used only in `PhotoTab`.

All three storage hooks are instantiated in `App.tsx`; the active one is selected via `religionTemplate` state.

## Component Tree

```
App.tsx
+-- AppHeader              (components/layout/)
+-- StepIndicator          (components/layout/)
+-- FormView               (views/)
|   +-- LayoutSelector     (components/studio/) -- layout toggle + religion dropdown
|   +-- ControlPanel       (components/form/)
|       +-- PersonalTab          (Hindu only)
|       +-- MuslimPersonalTab    (Muslim only)
|       +-- ChristianPersonalTab (Christian only)
|       +-- ProfessionalFamilyTab (shared)
|       +-- PreferencesTab        (shared)
|       +-- PhotoTab              (shared) <- uses usePhotoUpload
|           +-- FormField         (reusable labeled input/textarea)
+-- PreviewView            (views/)
    +-- ThemeSelector      (components/studio/) -- filters to AVAILABLE_THEMES[religionTemplate]
    +-- ExportPanel        (components/studio/)
    +-- BiodataCard        (components/preview/)
        +-- FullLayout      -- 760x1050px A4 (print: 210mm x 297mm)
        +-- SnapshotLayout  -- 700x700px square card
            shared/
            +-- HinduPersonalBlock
            +-- MuslimPersonalBlock
            +-- ChristianPersonalBlock
            +-- ThemeOrnament
            +-- ThemeAvatarPlaceholder
            +-- DetailBlock
```

## Theming

`THEME_CONFIG[theme]` in `src/data/themeConfig.ts` is the single source of truth for all theme
styling. `BiodataCard` reads it and passes a `styles: ThemeStyleTokens` prop down to `FullLayout`
and `SnapshotLayout` -- neither layout does its own theme lookup.

`AVAILABLE_THEMES[religionTemplate]` controls which themes appear in `ThemeSelector`. When the
active religion changes, `App.tsx` auto-switches to the first allowed theme if the current one
is not in the new religion's allowed set.

Custom font names (`font-editorial`, `font-warm`, `font-royal`, `font-modern`) are loaded in
`src/index.css`. Do NOT use `font-royal` (Cinzel -- all-caps display font with large vertical
metrics) in the 700x700 SnapshotLayout `DetailBlock` value slots -- it overflows the fixed card
height. Use `font-editorial` (Cormorant Garamond) there instead.

## Export

- **PNG**: `html-to-image` (`toPng`) targets `#biodata-print-section` at 2.2x pixel ratio. Background color comes from `THEME_CONFIG[theme].exportBgColor`.
- **PDF**: `window.print()` -- layout components use `print:` Tailwind variants to swap pixel dimensions for `mm`-based print sizes.

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

## Adding a New Religion Template

The pattern is established -- follow these steps to add a new religion:

1. **Types** (`src/types.ts`) -- add a `<Religion>PersonalInfo extends BasePersonalInfo` interface
   with religion-specific fields, a `<Religion>BiodataData` shape, and widen `AnyBiodataData`.
2. **Data files** -- add `src/data/default<Religion>Biodata.json` and `src/data/<religion>FormFields.json`.
3. **Storage hook** -- add `src/hooks/use<Religion>BiodataStorage.ts` (mirror `useMuslimBiodataStorage.ts`,
   change the storage key and default import).
4. **Preview block** -- add `src/components/preview/shared/<Religion>PersonalBlock.tsx` (6-item grid,
   mirror the Hindu/Muslim/Christian pattern).
5. **Layouts** -- extend the three-way conditionals in `FullLayout.tsx` and `SnapshotLayout.tsx`
   to mount the new Personal block and show the appropriate footer text.
6. **Form tab** -- add `src/components/form/tabs/<Religion>PersonalTab.tsx` and extend the
   three-way conditional in `ControlPanel.tsx`.
7. **Wire up** -- add the storage hook call in `App.tsx`, extend `activeBiodata`/`activeSetBiodata`
   derivation, add the reset key, add to `AVAILABLE_THEMES` in `themeConfig.ts`, and add the
   option to `RELIGION_OPTIONS` in `LayoutSelector.tsx`.

No changes to `BiodataCard.tsx`, `FormView.tsx`, `PreviewView.tsx`, or `ThemeSelector.tsx` are
needed -- they already accept `religionTemplate` as a prop and pass it through correctly.
