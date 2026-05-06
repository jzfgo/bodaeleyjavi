# Handoff: Boda Ele y Javi — Wedding Website

## Overview
A post-wedding site for Elena & Javier (Pamplona, 15 November 2025). The wedding has already taken place; the site exists to share the day's memories. It has two pages — **Inicio** (home, with a hero image and a welcome note) and **Galería** (a password-protected photo gallery with a lightbox viewer). The tone is warm, intimate, and Spanish-language.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behavior. They are **not production code to copy directly**. Recreate these designs in your target codebase using its established framework, component library, and patterns (React, Vue, Astro, plain HTML/CSS, etc.). If you're starting fresh, pick whatever framework is appropriate for a small static-ish site (Astro, Next.js, plain HTML+CSS, 11ty all fit). The photo gallery needs a real authentication mechanism in production — the password gate in the prototype is client-side only and is for demo purposes.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and interactions are settled. Recreate pixel-perfectly. Photos are currently striped placeholders — replace them with real photos. The "load more" button on the gallery is a visual stub (no functionality wired).

## Pages

### 1. Inicio (Home)
- **Purpose**: Welcome guests, set the tone, link to the gallery.
- **Layout (top to bottom)**:
  1. **Header** — centered, non-sticky, scrolls with the page.
     - "Elena & Javier" wordmark (display serif, 26px). The `&` is rendered in the body italic at 14px in the accent color.
     - Date line below: "15 NOVIEMBRE 2025", 10px, letter-spacing 5, uppercase, soft ink.
     - Horizontal divider, 1px × 80px, accent color, centered.
     - Nav row: "Inicio" / "Galería" (13px body). Active item is italic + accent color.
     - Padding: 24px 48px.
  2. **Hero** — three variants are available; default is **fullbleed**.
     - **Fullbleed (default)**: Full-bleed photo, 600px tall, with a bottom-anchored linear-gradient overlay (`rgba(45,50,33,0) → rgba(45,50,33,0.6)`) and centered text on top: tiny "15 . 11 . 2025" caption, then "Elena & Javier" at 100px display serif (the `&` is italic and 64px), then "Pamplona · Navarra" caption.
     - **Centered** variant: Square-ish photo (320px max-width) on top, centered. Below it: "RECUERDOS DEL DÍA" eyebrow, then "Elena", italic body `&`, "Javier" stacked vertically, each at 84px display serif. Date caption at the bottom.
     - **Split** variant: 50/50 grid. Left half is a vertical photo flush to edges. Right half has a left-aligned column with the eyebrow, "Elena / & / Javier" stacked at 64px, a 60×1px accent rule, and the date + venue.
  3. **Welcome message block** (`background: #f5efe6; padding: 88px 48px 64px`):
     - Centered pull-quote in display serif at 26px, line-height 1.5, max-width 600px:
       > "Aún seguimos flotando. Aquí están los recuerdos de un día que, gracias a todos, fue inolvidable."
     - Attribution underneath in italic body at 13px, accent color: "— Elena & Javi"
  4. **Footer** — see Footer section below.

### 2. Galería (Gallery, password-gated)

#### Password gate
- Centered card on the cream background, ~120px top padding, 380px max-width.
- Lock icon: 56×56px circle outlined in accent color, with a centered SVG padlock (1.5 stroke). Margin-bottom 24px.
- "GALERÍA PRIVADA" eyebrow (11px, letter-spacing 5, uppercase, accent color).
- Heading "Las fotos del día" (40px display serif, line-height 1.1).
- Italic body subtitle: "Para invitados. Introduce la contraseña que te enviamos."
- Password input: full-width, transparent background, **bottom-border only** (1px rule color; turns accent if error), centered text, letter-spacing 2, no outline. Submits on Enter.
- Submit button: pill (border-radius 999), full-width, ink background, cream text, 11px letter-spacing-4 uppercase "ENTRAR".
- On wrong password: italic accent-color message "No es correcta. Pista: ciudad · año."
- Demo password: `pamplona2025` (replace with real auth in production).

#### Unlocked gallery
- Same eyebrow + 60px display-serif heading "Galería" + 60×1px accent divider.
- Italic intro paragraph (max-width 520px).
- Photo grid: **CSS columns**, `column-count: 3`, `column-gap: 12px`, `max-width: 980px`, photos use `break-inside: avoid` with `margin-bottom: 12px`. A masonry effect for free.
- Each photo: 4px border-radius, `cursor: zoom-in`. Aspect ratios alternate through `['4/5','4/5','1/1','4/5','4/5','4/5','1/1','4/5','4/5']` cycling on index.
- "Cargar más" button at the bottom — pill outline button, currently a visual stub. Wire it up to paginate when there are >18 photos.

#### Lightbox (when a photo is clicked)
- Renders to a React portal on `document.body`. Locks `body` overflow while open.
- Backdrop: `rgba(20,12,6,0.92)` with `backdrop-filter: blur(8px)`. Click backdrop to close.
- Close button: top-right, 44×44px circle, `rgba(255,255,255,0.1)` background, "×" 20px.
- Prev / Next buttons: vertically centered on left/right edges, 48×48px circles, same translucent background. SVG chevrons.
- All edge controls use `max(N px, env(safe-area-inset-*))` padding so they sit clear of notches in landscape.
- Photo: sized via `aspect-ratio: <ratio>`, with both `max-width: min(92vw, calc((92vh - 80px) * <numeric ratio>))` and `max-height: calc(92vh - 80px)`. This is what makes it fit landscape and portrait viewports correctly without overflow.
- Drop shadow on the photo: `0 30px 80px rgba(0,0,0,0.5)`.
- Counter at the bottom: "01 / 18" style, tabular nums, letter-spacing 3, uppercase, 12px, opacity 0.8.
- **Keyboard**: `ArrowLeft` → prev, `ArrowRight` → next, `Escape` → close.
- **Touch**: horizontal swipe (>50px, dx > dy) navigates prev/next.
- Wraps around (last → first, first → last).

### Footer (both pages)
- `background: #f5efe6` (page background), `border-top: 1px solid #d8cbb6`, padding 56px 48px 40px, centered.
- "Gracias" in 24px display serif.
- Body line: "Por compartir con nosotros un día tan especial."
- Bottom row in accent color, 10px, letter-spacing 3, uppercase: "elenica@gmail.com · #bodaeleyjavi2025"

## Interactions & Behavior
- **Page navigation**: Single-page React app with state-based routing (no real URLs). For production prefer real routes (`/`, `/galeria`).
- **Password gate**: Currently `pw.toLowerCase().trim() === 'pamplona2025'`. **Replace with real auth** — server-side check, signed cookie, or a static-site-host gate (Netlify password protection, Cloudflare Access, etc.).
- **Lightbox**: open on photo click, close on backdrop click, close button, or Escape. Navigate with on-screen arrows, keyboard arrows, or touch swipe. Wraps.
- **No animations** beyond default transitions (this is intentional — calm tone).
- **Header is non-sticky** (deliberately — gives mobile-landscape more real estate).

## State Management
- `page`: 'home' | 'galeria'
- `unlocked`: boolean (gallery)
- `pw`: string, `err`: boolean (password input)
- `openIdx`: number | null (lightbox; null = closed)

For production, replace `unlocked` with a real session/auth state.

## Design Tokens

### Colors
| Token | Value | Use |
|---|---|---|
| `bg` | `#f5efe6` | Page background, cream |
| `bg2` | `#ede5d6` | Photo placeholder stripe, slightly darker cream |
| `ink` | `#2b1d12` | Primary text, deep espresso |
| `inkSoft` | `#5a4632` | Secondary text |
| `rule` | `#d8cbb6` | Borders, dividers |
| `accent` | `#b85a3a` | Terracotta — eyebrows, accent rules, links, active nav |
| `accentSoft` | `#e9c5b3` | (Defined, not heavily used — reserved) |

### Typography
- **Display**: `"Cormorant Garamond", Georgia, serif` (Google Fonts, weights 400/500/600 + italic 400/500). Used for the wordmark, headings, pull quotes.
- **Body**: `"Inter", system-ui, sans-serif` (Google Fonts, weights 300/400/500/600).
- **Mono**: `"JetBrains Mono"` — used only for placeholder labels. Unlikely to ship.
- The prototype also exposes alternate pairings (Playfair + Nunito Sans, DM Serif + Jost) via a tweaks panel — pick the one you ship and drop the others.

### Spacing
- Page horizontal padding: 48px desktop. Reduce to 24px on small screens (the prototype doesn't currently adapt — add this).
- Section vertical padding: 64–88px.
- Standard letter-spacing for eyebrows: 4–5, uppercase, 10–11px.

### Other
- Border radius: 4px on photos, 999 on pill buttons, 22–24px on circular lightbox controls, 0 on most surfaces.
- Photo placeholder treatment: `repeating-linear-gradient(135deg, bg2 0 14px, bg 14px 28px)` with a 1px rule border.

## Assets
- **Photos**: Replace the 18 placeholders in the gallery with real ones. Source from `https://images.squarespace-cdn.com/...` (current Squarespace site) or a fresh upload. Use responsive `<img srcset>` or a CDN like Cloudinary; lazy-load below-the-fold.
- **Hero photo**: One landscape (panoramic) for fullbleed, one vertical for split, one ~4/5 for centered.
- **Icons**: All SVGs are inline in the prototype (lock icon, lightbox chevrons, close ×).
- **Fonts**: Loaded from Google Fonts via `<link>` in `Boda Ele y Javi.html`.

## Responsive notes
- The prototype renders at desktop widths. For production:
  - Reduce page padding to ~20–24px below ~700px wide.
  - Reduce heading sizes (`100px` hero → ~`56–64px` on phone).
  - Drop gallery to 2 columns below ~700px and 1 column below ~480px.
  - Lightbox already handles small viewports correctly via `vw`/`vh` caps and safe-area insets.

## Files
- `Boda Ele y Javi.html` — entry HTML, mounts the React app, declares Tweaks defaults, wires fonts.
- `site-b.jsx` — all components: nav, hero variants, home page, gallery + password gate + lightbox, footer.
- `tweaks-panel.jsx` — the in-page Tweaks panel (used during design exploration; **not needed in production** — strip it).

## What to drop when shipping
- The Tweaks panel and `tweaks-panel.jsx`.
- Any unused hero variants (pick one — fullbleed is the current default).
- Any unused type pairings.
- The "(demo: pamplona2025)" hint under the password input.
- The `useTweaks` hook + its imports in the entry HTML.
