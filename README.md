# Biodata Studio

A client-side matrimonial biodata generator built with React 19, TypeScript, Vite, and Tailwind CSS v4. Fill in your details, pick a theme, and export a print-ready A4 PDF or a square image card — no server, no sign-up, no data leaving your browser.

---

## Features

- **Two layout formats** — A4 full-page biodata (print/PDF) and a 1:1 square card (WhatsApp/social sharing)
- **Four design themes** — Natural Tones, Royal Gold, Minimalist, Sunset Rose
- **Portrait photo upload** — stored locally as base64, max 4 MB; falls back to a theme-matched SVG silhouette
- **PNG export** — high-resolution 2.2× pixel ratio via `html-to-image`
- **PDF export** — browser print dialog, A4 portrait with background graphics
- **100% client-side** — all data stays in your browser via `localStorage`; nothing is sent to any server

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

## Project Structure

```
src/
├── data/
│   ├── defaultBiodata.json     # Pre-loaded sample biodata
│   ├── formFields.json         # Field definitions (label, type, section)
│   └── themeConfig.ts          # Theme color tokens + UI metadata
├── hooks/
│   ├── useBiodataStorage.ts    # localStorage persistence
│   └── usePhotoUpload.ts       # FileReader base64 conversion
├── components/
│   ├── layout/                 # AppHeader, StepIndicator
│   ├── form/                   # ControlPanel + FormField + 4 tab components
│   ├── preview/                # BiodataCard, FullLayout, SnapshotLayout, shared primitives
│   └── studio/                 # LayoutSelector, ThemeSelector, ExportPanel
├── views/
│   ├── FormView.tsx            # Step 1 — data entry
│   └── PreviewView.tsx         # Step 2 — preview and export
└── App.tsx                     # Root orchestrator (~88 lines)
```

---

## How It Works

1. **Step 1 — Customize Details**: Fill in personal, professional, family, and contact fields across four tabs. Upload a portrait photo or use the auto-generated avatar.
2. **Step 2 — Preview & Export**: Choose a color theme, toggle between A4 and square formats, then download as PNG or send to the printer.

All field data is auto-saved to `localStorage` on every keystroke and restored on page load. The Reset button restores the pre-loaded sample data.

---

## Future Scope

The current implementation is tailored for Hindu matrimonial conventions (gotra, rashi, nakshatra, caste). The architecture is designed to accommodate additional religion-specific templates without touching existing code — each template would be a new entry in `formFields.json` and a new layout variant.

### Planned: Muslim / Islamic Biodata

Islamic matrimonial biodatas have a distinct set of fields and conventions:

| Field | Notes |
|---|---|
| Sect | Sunni / Shia / Ahmadiyya etc. |
| Maslak | Hanafi, Shafi'i, Maliki, Hanbali etc. |
| Religiosity | Practising level (e.g. Namazi, Hafiz-e-Quran) |
| Wali / Guardian | Contact through family guardian |
| Mehr preference | Expected token amount |
| Languages spoken | Urdu, Arabic, regional |

The horoscope section (gotra, rashi, nakshatra) would be replaced entirely. The layout ornament and typography would be updated to reflect the aesthetic conventions of Islamic wedding culture.

### Planned: Christian Biodata

Christian matrimonial biodatas vary by denomination but commonly include:

| Field | Notes |
|---|---|
| Denomination | Catholic, Protestant, Orthodox, Pentecostal etc. |
| Diocese / Parish | Home church affiliation |
| Baptism status | Baptised / Confirmed |
| Languages | Home and liturgical languages |
| Complexion / Height / Weight | Common in South Indian Christian biodata |

The caste/gotra section would be replaced with church affiliation fields. A separate clean, serif-forward design theme suited to Christian conventions would be introduced.

### Longer-term

- **Template selector** at startup — choose religion/community before filling fields
- **Bilingual support** — render field labels in a second language (e.g. Urdu + English, Tamil + English)
- **Custom field builder** — let users add or remove fields without touching code
- **QR code** — embed a contact QR in the exported card

---

## Privacy

No analytics, no cookies, no external API calls. The app runs entirely in your browser. Your data never leaves your device.
