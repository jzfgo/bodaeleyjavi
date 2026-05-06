# Wedding Site — Production Design

**Boda Ele y Javi** · Post-wedding memory site for Elena & Javier (Pamplona, 15 November 2025)

## Overview

Port the existing high-fidelity design prototype (`site-b.jsx`, `Boda Ele y Javi.html`) into a production Vite + React 19 + TypeScript application deployed to Firebase Hosting, with photos served from Firebase Storage.

The design is **fully settled** — pixel-perfect recreation of the prototype is the goal. No design decisions remain; all changes from prototype → production are structural (module system, TypeScript, real photo URLs, responsive additions).

## Stack

| Concern | Choice |
|---|---|
| Framework | Vite + React 19 + TypeScript (`react-ts` template) |
| Hosting | Firebase Hosting (deploys `dist/`) |
| Photos | Firebase Storage — public read, manual upload via Firebase Console |
| Auth | Password in `.env` as `VITE_APP_KEY`, checked client-side |
| Database | None |
| Server functions | None |

## Project Structure

```
bodaeleyjavi/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types.ts
│   ├── tokens.ts
│   ├── photos.js
│   ├── env.d.ts
│   └── components/
│       ├── Nav.tsx
│       ├── Footer.tsx
│       ├── HeroFullbleed.tsx
│       ├── HomePage.tsx
│       ├── GalleryPage.tsx
│       ├── PasswordGate.tsx
│       ├── PhotoGrid.tsx
│       └── Lightbox.tsx
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── firebase.json
├── .firebaserc
└── .env                  # gitignored — VITE_APP_KEY=<password>
```

## Components

### `App.tsx`
Root component. Owns `page: Page` state. Renders `<Nav>` plus the active page component.

### `Nav.tsx`
Props: `page: Page`, `onPage: (p: Page) => void`

Centered, non-sticky header. Wordmark ("Elena & Javier"), date line, 80px accent rule, nav items. Active item is italic + accent color.

### `HeroFullbleed.tsx`
No props. Full-bleed photo, 600px tall, bottom-anchored gradient overlay (`rgba(45,50,33,0) → rgba(45,50,33,0.6)`), centered text: date caption, "Elena & Javier" at 100px display serif (desktop), location caption. Hero photo is a real `<img>` tag (not a placeholder).

### `HomePage.tsx`
Props: `onPage: (p: Page) => void`

Renders `<HeroFullbleed>` followed by the welcome message block (cream background, pull-quote, attribution). The Galería nav link uses `onPage`.

### `GalleryPage.tsx`
Owns: `unlocked: boolean`, `openIdx: number | null`, `visibleCount: number` (initial: 18, +18 per "Cargar más" click).

Renders `<PasswordGate>` when locked. When unlocked: gallery header (eyebrow, title, divider, intro paragraph) + `<PhotoGrid photos={visible}>` + "Cargar más" button (shown when `visibleCount < photos.length`) + `<Lightbox photos={visible}>`, where `visible = photos.slice(0, visibleCount)`. Both components receive the same sliced array so click indices are consistent.

### `PasswordGate.tsx`
Props: `onUnlock: () => void`

Owns: `pw: string`, `err: boolean`. Checks `pw.toLowerCase().trim() === import.meta.env.VITE_APP_KEY`. On match: calls `onUnlock()`. On mismatch: sets `err = true`. No network call.

### `PhotoGrid.tsx`
Props: `photos: Photo[]`, `onPhotoClick: (idx: number) => void`

CSS columns layout: `column-count: 3`, `column-gap: 12px`, `max-width: 980px`. Each photo is an `<img>` with `aspect-ratio`, `border-radius: 4px`, `cursor: zoom-in`. Aspect ratios cycle through `['4/5','4/5','1/1','4/5','4/5','4/5','1/1','4/5','4/5']` by index.

### `Lightbox.tsx`
Props: `photos: Photo[]`, `openIdx: number | null`, `onClose: () => void`, `onNav: (idx: number) => void`

Renders via `ReactDOM.createPortal(…, document.body)`. Locks `document.body` overflow while open. Backdrop `rgba(20,12,6,0.92)` + `backdrop-filter: blur(8px)`. Photo sized with `max-width: min(92vw, calc((92vh - 80px) * ratio))` and `max-height: calc(92vh - 80px)`. Wraps around (last → first, first → last).

Handles:
- Keyboard: `ArrowLeft` prev, `ArrowRight` next, `Escape` close
- Touch: horizontal swipe >50px (dx > dy) navigates prev/next
- Safe-area insets on all edge controls

### `Footer.tsx`
No props. Static: "Gracias", body line, bottom row with email + hashtag.

## Data Flow

```
App (page)
├── Nav (page, onPage)
├── HomePage (onPage)
│   └── HeroFullbleed
└── GalleryPage (unlocked, openIdx, visibleCount)
    ├── PasswordGate (onUnlock)
    ├── PhotoGrid (photos[0..visibleCount], onPhotoClick)
    └── Lightbox (photos, openIdx, onClose, onNav)
```

## Shared Types

```ts
// src/types.ts
export type Page = 'home' | 'galeria'
export type Photo = { url: string; ratio: string }
```

## Design Tokens

```ts
// src/tokens.ts
export const THEME = {
  bg: '#f5efe6',
  bg2: '#ede5d6',
  ink: '#2b1d12',
  inkSoft: '#5a4632',
  rule: '#d8cbb6',
  accent: '#b85a3a',
  accentSoft: '#e9c5b3',
} as const

export const FONTS = {
  display: '"Cormorant Garamond", Georgia, serif',
  body: '"Inter", system-ui, sans-serif',
} as const
```

## Photo Data

```js
// src/photos.js — plain JS, no TypeScript required
export default [
  { url: 'https://firebasestorage.googleapis.com/…', ratio: '4/5' },
  // 18 entries total; add more for the "Cargar más" flow
]
```

Photos are uploaded manually via Firebase Console. Storage rules: public read on the photos path.

## Environment

```
# .env (gitignored)
VITE_APP_KEY=<password>
```

```ts
// src/env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_KEY: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## Responsive Breakpoints

| Viewport | Change |
|---|---|
| ≤700px | Page padding 48px → 24px |
| ≤700px | Gallery: 3 columns → 2 columns |
| ≤700px | Hero headline: 100px → 60px |
| ≤480px | Gallery: 2 columns → 1 column |

## What Is Dropped from the Prototype

- `tweaks-panel.jsx` — removed entirely
- `BHeroCentered`, `BHeroSplit` — only fullbleed ships
- Alternate type pairings (Playfair+Nunito, DM Serif+Jost)
- `B_` prefix on `THEME` and `FONTS`
- `useTweaks` hook and `TWEAK_DEFAULTS`
- Demo password hint below the password input

## Deployment

```bash
npm run build          # outputs to dist/
firebase deploy        # deploys dist/ to Firebase Hosting
```

Firebase config files (`firebase.json`, `.firebaserc`) are committed. `.env` is gitignored.
