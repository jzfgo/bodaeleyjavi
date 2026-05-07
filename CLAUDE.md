# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A post-wedding website for Elena & Javier (Pamplona, 15 November 2025).
React 19 + TypeScript + Vite, deployed to Firebase Hosting (`bodaeleyjavi` project).

## Commands

```bash
npm run dev       # dev server → http://localhost:5173
npm run build     # tsc + vite build → dist/
npm run test      # vitest run (passWithNoTests)
npm run deploy    # vite build && firebase deploy
```

## Architecture

```
src/
  App.tsx             — root; page state ('home' | 'galeria')
  tokens.ts           — THEME + FONTS design tokens (source of truth)
  photos.js           — photo stub array [{url, ratio}]; fill with real URLs
  types.ts            — Page, Photo types
  config.ts           — app-level config
  index.css           — minimal global resets
  test-setup.ts       — Vitest + @testing-library/jest-dom setup
  components/
    Nav.tsx           — top navigation
    HomePage.tsx      — hero + intro copy
    HeroFullbleed.tsx — full-bleed hero image
    GalleryPage.tsx   — orchestrates PasswordGate → PhotoGrid + Lightbox
    PasswordGate.tsx  — client-side password check (see below)
    PhotoGrid.tsx     — CSS columns masonry, no JS library
    Lightbox.tsx      — React portal; keyboard (←→Esc), touch swipe >50px
    Footer.tsx
    Lightbox.test.tsx
    PasswordGate.test.tsx
```

## Design tokens

All tokens are in `src/tokens.ts`, exported as `THEME` and `FONTS`. All component styling is inline — no CSS classes.

| Token | Value | Use |
|---|---|---|
| `bg` | `#f5efe6` | Cream page background |
| `bg2` | `#ede5d6` | Slightly darker cream (cards, etc.) |
| `ink` | `#2b1d12` | Primary text (espresso) |
| `inkSoft` | `#5a4632` | Secondary text |
| `rule` | `#d8cbb6` | Borders / dividers |
| `accent` | `#b85a3a` | Terracotta — eyebrows, active nav, rules |
| `accentSoft` | `#e9c5b3` | Light terracotta tint |

Type pairing: `"Cormorant Garamond"` (display) + `"Inter"` (body), loaded via Google Fonts in `public/index.html`.

## Key implementation details

- **Photo grid**: CSS columns (`column-count: 3`, `column-gap: 12px`) for masonry. No JS masonry library.
- **Lightbox**: Renders into a React portal on `document.body`. Handles keyboard (`←→Esc`), touch swipe (>50px horizontal), and safe-area insets for notched phones. Photo sizing uses `max-width: min(92vw, calc((92vh - 80px) * ratio))`.
- **Password gate**: Still client-side only. Replace with server-side auth (signed cookie, Cloudflare Access, Firebase Auth, etc.) before sharing publicly.
- **Navigation**: State-based (`page` in `App.tsx`), no URL routing. Upgrade to React Router or file-based routing if deep links are needed.
- **Photos**: `src/photos.js` contains `url` and `ratio` fields. Add `srcset` + `loading="lazy"`.
- **Deploy target**: Firebase Hosting, project `bodaeleyjavi`, public dir `dist/`, SPA rewrite (`**` → `/index.html`).

## Open items

1. Add `srcset` + lazy loading to `src/photos.js`
2. Replace client-side password check with real auth
3. Wire up "Cargar más" button to paginate beyond 18 photos
4. Responsive polish: reduce hero padding on mobile, drop gallery to 2-col <700px / 1-col <480px
