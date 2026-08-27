# Biodata Studio

A client-side matrimonial biodata generator built with React 19, TypeScript, Vite, and Tailwind CSS v4. Fill in your details, pick a theme, and export a print-ready A4 PDF or a square image card -- no server, no sign-up, no data leaving your browser.

**Live demo:** https://quantumudit.github.io/biodata-studio/

---

## Features

- **Three religion templates** -- Hindu, Muslim, and Christian; each has its own Personal section fields and isolated `localStorage` slot
- **Two layout formats** -- A4 full-page biodata (print/PDF) and a 1:1 square card (WhatsApp/social sharing)
- **Six design themes** -- Natural Tones, Royal Gold, Minimalist, Sunset Rose (all religions); Emerald Dusk and Sapphire Night (Muslim only)
- **Portrait photo upload** -- stored locally as base64, max 4 MB; falls back to a theme-matched SVG silhouette
- **PNG export** -- high-resolution 2.2x pixel ratio via `html-to-image`
- **PDF export** -- browser print dialog, A4 portrait with background graphics
- **100% client-side** -- all data stays in your browser via `localStorage`; nothing is sent to any server

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Language | TypeScript 5.8 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Image Export | html-to-image |
| Icons | lucide-react |
| Container | Docker (nginx:alpine) |

---

## Getting Started

**Prerequisites:** Node.js 20+

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Type-check
npm run lint

# Production build
npm run build
```

---

## Docker

```bash
# Build and run (serves on http://localhost:8080)
docker compose up --build

# Or build the image directly
docker build -t biodata-studio .
docker run -p 8080:80 biodata-studio
```

---

## GitHub Pages Deployment

The app deploys automatically to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`.

To enable it on a new repo:
1. Push the repo to GitHub
2. Go to **Settings > Pages > Source** and select **GitHub Actions**
3. The next push to `main` will build and deploy automatically

The live URL will be: `https://<your-username>.github.io/biodata-studio/`

> If you rename the repo, update the `base` path in `vite.config.ts` to match.

---

## Project Structure

```
src/
+-- data/
|   +-- defaultBiodata.json          # Hindu sample data
|   +-- defaultMuslimBiodata.json    # Muslim sample data
|   +-- defaultChristianBiodata.json # Christian sample data
|   +-- formFields.json              # Hindu personal field definitions
|   +-- muslimFormFields.json        # Muslim personal field definitions
|   +-- christianFormFields.json     # Christian personal field definitions
|   +-- themeConfig.ts               # Theme color tokens + AVAILABLE_THEMES map
+-- hooks/
|   +-- useBiodataStorage.ts         # Hindu localStorage persistence
|   +-- useMuslimBiodataStorage.ts   # Muslim localStorage persistence
|   +-- useChristianBiodataStorage.ts# Christian localStorage persistence
|   +-- usePhotoUpload.ts            # FileReader base64 conversion
+-- components/
|   +-- layout/                      # AppHeader, StepIndicator
|   +-- form/                        # ControlPanel + FormField + 5 tab components
|   +-- preview/                     # BiodataCard, FullLayout, SnapshotLayout, shared blocks
|   +-- studio/                      # LayoutSelector, ThemeSelector, ExportPanel
+-- views/
|   +-- FormView.tsx                 # Step 1 -- data entry
|   +-- PreviewView.tsx              # Step 2 -- preview and export
+-- App.tsx                          # Root orchestrator
```

---

## Religion Templates

The app uses a "render only the diff" architecture: only the Personal section differs
per religion. Professional, Family, Preferences, and Photo tabs are fully shared.

| Template  | Personal Fields (preview)                                     | Themes available                              |
|-----------|---------------------------------------------------------------|-----------------------------------------------|
| Hindu     | DOB/Age, Height/Weight, Religion & Caste, Gotra, Rashi, Nakshatra | Natural, Royal Gold, Minimalist, Sunset Rose  |
| Muslim    | DOB/Age, Height/Weight, Sect, Maslak, Religious Practice, Mehr Preference | Natural, Minimalist, Emerald Dusk, Sapphire Night |
| Christian | DOB/Age, Height/Weight, Denomination, Parish/Church, Baptism, Confirmation | Natural, Royal Gold, Minimalist, Sunset Rose  |

Each template stores its data under a separate `localStorage` key so switching religion
never overwrites another template's data.

---

## How It Works

1. **Step 1 -- Customize Details**: Select a religion template, then fill in personal,
   professional, family, and contact fields across four tabs. Upload a portrait photo
   or use the auto-generated avatar.
2. **Step 2 -- Preview and Export**: Choose a color theme, toggle between A4 and square
   formats, then download as PNG or send to the printer.

All field data is auto-saved to `localStorage` on every keystroke and restored on page
load. The Reset button restores the pre-loaded sample data for the active religion.

---

## Why This App?

Arranged marriages are common in India. Even with matchmaking platforms around, the search often starts locally -- and the first thing you need is a "biodata."

What typically happens: someone texts the candidate's details, then sends a separate message with photos. Those messages have typos, leave out key information, or include irrelevant details. At best the candidate puts together something like a resume themselves; more often a friend, relative, or colleague does it -- which is a task in itself.

This app removes that friction. Fill in your details once and get a compact square snapshot (ideal for WhatsApp) or a full A4 layout when you want to share more. Both export as an image or PDF and can be shared immediately on any messaging app.

Hobbies, habits, and lifestyle details all matter -- but this app is deliberately focused: quick, simple, and covering only the essentials. You can always follow up with extra photos or a fuller profile. Think of this as your first-impression card, enough to get shortlisted. If there is mutual interest you can share a more detailed profile from a matrimony platform later.

The goal is to get you started -- cleanly and quickly.

---

## Inspiration

I built this after watching my dad and a friend's parent make the same mistakes -- sending haphazard text messages with typos alongside a couple of photos. My dad would ask me whenever he needed a biodata prepared; so did a friend with a non-tech background. A few years earlier my elder brother had asked me to make one, and that time I turned to Canva.

The biodatas others sent to my dad or my friend's father followed the same pattern: a flawed WhatsApp message or, at best, a bland and uninspiring document.

So I decided to build something better.

---

## Future Scope

### Planned features

- **Bilingual support** -- render field labels in a second language (e.g. Urdu + English, Tamil + English)
- **Custom field builder** -- let users add or remove fields without touching code
- **QR code** -- embed a contact QR in the exported card

### Adding more religion / community templates

The architecture makes this straightforward. See `CLAUDE.md` for the full pattern.
In brief: add form fields JSON, a default data JSON, a storage hook, a Personal preview
block, and wire them into the three-way conditionals in ControlPanel, FullLayout,
SnapshotLayout, and App.

---

## Privacy and Security

No analytics, no cookies, no external API calls. The app runs entirely in your browser
and your data never leaves your device. Unlike many websites,
[the live app](https://quantumudit.github.io/biodata-studio/) shows no ads and requires
no sign-up. If you would rather keep everything fully offline, clone the repository and
run it locally via Docker.

**Feature requests:** if you would like a template for another religion or community, or
have any other idea that fits the app's goal, open an issue on
[GitHub Issues](https://github.com/quantumudit/biodata-studio/issues). If it aligns with
the app's purpose it will be considered.
