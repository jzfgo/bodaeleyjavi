# Boda Elena & Javier

Post-wedding website for Elena & Javier — Pamplona, 15 November 2025.

**Live site:** https://bodaeleyjavi.es

## Stack

- React 19 + TypeScript + Vite
- Firebase Hosting (project `bodaeleyjavi`) + Firebase Storage (photos)
- No CSS framework — all styling via inline styles and design tokens

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc + vite build → dist/
npm run test      # vitest (passWithNoTests)
npm run deploy    # build + firebase deploy
```

## Project structure

```
src/
  App.tsx               — root; page state ('home' | 'galeria')
  tokens.ts             — THEME + FONTS design tokens (single source of truth)
  photos.js             — photo array [{url, ratio}] with Firebase Storage URLs
  types.ts              — Page, Photo types
  config.ts             — HERO_URL (Firebase Storage URL for hero image)
  components/
    Nav.tsx             — top navigation
    HomePage.tsx        — hero + welcome copy
    HeroFullbleed.tsx   — full-bleed hero image with gradient overlay
    GalleryPage.tsx     — orchestrates PasswordGate → PhotoGrid + Lightbox
    PasswordGate.tsx    — client-side password check
    PhotoGrid.tsx       — CSS columns masonry (no JS library)
    Lightbox.tsx        — React portal; keyboard (←→Esc), touch swipe >50px
    Footer.tsx
```

## Design tokens

All tokens live in `src/tokens.ts` (`THEME` and `FONTS`). Components use inline styles only.

| Token | Value | Use |
|---|---|---|
| `bg` | `#f5efe6` | Cream page background |
| `bg2` | `#ede5d6` | Slightly darker cream |
| `ink` | `#2b1d12` | Primary text |
| `inkSoft` | `#5a4632` | Secondary text |
| `rule` | `#d8cbb6` | Borders / dividers |
| `accent` | `#b85a3a` | Terracotta — eyebrows, active nav, rules |
| `accentSoft` | `#e9c5b3` | Light terracotta tint |

Type pairing: `"Cormorant Garamond"` (display) + `"Inter"` (body), loaded via Google Fonts in `index.html`.

## Known limitations

- **Password gate is client-side only.** The check is `pw.toLowerCase().trim() === '<password>'` in `PasswordGate.tsx`. Fine for a private family site; replace with Firebase Auth or a server-side gate before wider distribution.
- **No URL routing.** Navigation is state-based in `App.tsx`. Direct links to `/galeria` don't work — the Firebase rewrite sends everything to `index.html` and the app always opens on the home page.
- **"Cargar más" is a stub.** The button in `GalleryPage.tsx` is visual only; pagination is not wired up.

## Deployment

```bash
npm run deploy
```

Builds to `dist/` and deploys to Firebase Hosting. The `firebase.json` SPA rewrite (`**` → `/index.html`) is already configured.

To update photos, upload new images to Firebase Storage and update `src/photos.js` with the new URLs and aspect ratios. For the hero image, set `HERO_URL` in `src/config.ts`.
