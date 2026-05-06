# Wedding Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the design prototype into a production Vite + React 19 + TypeScript app deployed to Firebase Hosting, with photos served from Firebase Storage.

**Architecture:** Single-page React 19 app with state-based navigation between Inicio and Galería. The gallery is password-gated via a `.env` variable. Photos are public Firebase Storage CDN URLs listed in a plain JS data file. No backend, no SDK, no database.

**Tech Stack:** Vite, React 19, TypeScript 5, Vitest + React Testing Library, Firebase Hosting (CLI only — no Firebase SDK in the app).

---

## File Map

| File | Responsibility |
|---|---|
| `src/main.tsx` | Entry point — mounts App |
| `src/App.tsx` | Root component, owns `page` state |
| `src/types.ts` | Shared types: `Page`, `Photo` |
| `src/tokens.ts` | Design tokens: `THEME`, `FONTS` |
| `src/config.ts` | Hero photo URL constant |
| `src/env.d.ts` | Vite env type declaration for `VITE_APP_KEY` |
| `src/photos.js` | Photo data array (plain JS) |
| `src/photos.d.ts` | TypeScript declaration for `photos.js` |
| `src/test-setup.ts` | Vitest + jest-dom global setup |
| `src/index.css` | Global reset + responsive CSS classes |
| `src/components/Nav.tsx` | Header: wordmark, date, divider, nav buttons |
| `src/components/Footer.tsx` | Footer: "Gracias", body, email + hashtag |
| `src/components/HeroFullbleed.tsx` | Full-bleed hero section |
| `src/components/HomePage.tsx` | Inicio page: hero + welcome block |
| `src/components/PasswordGate.tsx` | Gallery password form |
| `src/components/PasswordGate.test.tsx` | Unit tests for password logic |
| `src/components/PhotoGrid.tsx` | CSS-columns masonry photo grid |
| `src/components/Lightbox.tsx` | Full-screen photo viewer (React portal) |
| `src/components/Lightbox.test.tsx` | Unit tests for navigation + wrap-around |
| `src/components/GalleryPage.tsx` | Galería page: gate → grid + lightbox |
| `index.html` | Entry HTML + Google Fonts link |
| `vite.config.ts` | Vite + Vitest config |
| `tsconfig.json` | TypeScript config |
| `firebase.json` | Firebase Hosting config |
| `.firebaserc` | Firebase project ID |
| `.env` | `VITE_APP_KEY=pamplona2025` (gitignored) |

---

### Task 1: Scaffold project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/test-setup.ts`

- [ ] **Step 1: Scaffold Vite**

```bash
npm create vite@latest . -- --template react-ts
```

When prompted about the non-empty directory, select **"Ignore files and continue"**. This preserves `site-b.jsx`, `README.md`, etc.

- [ ] **Step 2: Upgrade to React 19**

```bash
npm install react@19 react-dom@19
npm install -D @types/react@19 @types/react-dom@19
```

- [ ] **Step 3: Install Vitest + React Testing Library**

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

- [ ] **Step 4: Install Firebase CLI**

```bash
npm install -D firebase-tools
```

- [ ] **Step 5: Update `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
})
```

- [ ] **Step 6: Replace `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

- [ ] **Step 7: Create `src/test-setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 8: Replace `index.html`**

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Boda Ele y Javi</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 9: Replace `src/index.css`**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { -webkit-font-smoothing: antialiased; background: #f5efe6; }

/* Responsive helpers used by components via className */
.photo-grid { columns: 3; column-gap: 12px; max-width: 980px; margin: 0 auto; padding: 0 24px; }
.hero-headline { font-size: 100px; }
.page-section { padding-left: 48px; padding-right: 48px; }

@media (max-width: 700px) {
  .photo-grid { columns: 2; }
  .hero-headline { font-size: 60px; }
  .page-section { padding-left: 24px; padding-right: 24px; }
}
@media (max-width: 480px) {
  .photo-grid { columns: 1; }
}
```

- [ ] **Step 10: Write stub `src/App.tsx`**

```tsx
export function App() {
  return <div>Boda Ele y Javi</div>
}
```

- [ ] **Step 11: Replace `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 12: Add deploy script to `package.json`**

In the `"scripts"` object, add:
```json
"deploy": "vite build && firebase deploy"
```

- [ ] **Step 13: Verify dev server starts**

```bash
npm run dev
```
Expected: server at `http://localhost:5173`, browser shows "Boda Ele y Javi".

- [ ] **Step 14: Verify test runner works**

```bash
npm test
```
Expected: no test files found, exits cleanly.

- [ ] **Step 15: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json index.html src/
git commit -m "feat: scaffold Vite + React 19 + TypeScript project"
```

---

### Task 2: Foundation — types, tokens, config, photos

**Files:**
- Create: `src/types.ts`, `src/tokens.ts`, `src/env.d.ts`, `src/config.ts`, `src/photos.js`, `src/photos.d.ts`, `.env`

- [ ] **Step 1: Create `src/types.ts`**

```ts
export type Page = 'home' | 'galeria'
export type Photo = { url: string; ratio: string }
```

- [ ] **Step 2: Create `src/tokens.ts`**

```ts
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

- [ ] **Step 3: Create `src/env.d.ts`**

```ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_KEY: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

- [ ] **Step 4: Create `src/config.ts`**

```ts
// Replace with the Firebase Storage download URL of the hero photo after uploading.
export const HERO_URL = ''
```

- [ ] **Step 5: Create `src/photos.js`**

18 placeholder entries matching the masonry ratio cycle `['4/5','4/5','1/1','4/5','4/5','4/5','1/1','4/5','4/5']`. Replace `url` strings with Firebase Storage download URLs in Task 13.

```js
export default [
  { url: '', ratio: '4/5' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '1/1' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '1/1' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '1/1' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '1/1' },
  { url: '', ratio: '4/5' },
  { url: '', ratio: '4/5' },
]
```

- [ ] **Step 6: Create `src/photos.d.ts`**

Tells TypeScript the shape of the JS module without requiring `allowJs`.

```ts
import type { Photo } from './types'
declare const photos: Photo[]
export default photos
```

- [ ] **Step 7: Create `.env`**

```
VITE_APP_KEY=pamplona2025
```

- [ ] **Step 8: Confirm `.env` is in `.gitignore`**

Open `.gitignore`. If `.env` is not listed, add it. The file `src/photos.js` should NOT be gitignored — it's source.

- [ ] **Step 9: Verify TypeScript is happy**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 10: Commit**

```bash
git add src/types.ts src/tokens.ts src/env.d.ts src/config.ts src/photos.js src/photos.d.ts
git commit -m "feat: add types, tokens, config, and photo data"
```

---

### Task 3: Nav component

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Create `src/components/Nav.tsx`**

```tsx
import { THEME, FONTS } from '../tokens'
import type { Page } from '../types'

interface Props {
  page: Page
  onPage: (p: Page) => void
}

export function Nav({ page, onPage }: Props) {
  return (
    <header
      className="page-section"
      style={{ paddingTop: 24, paddingBottom: 24, background: THEME.bg, textAlign: 'center' }}
    >
      <div style={{ fontFamily: FONTS.display, fontSize: 26, color: THEME.ink, lineHeight: 1, marginBottom: 4 }}>
        Elena{' '}
        <span style={{ fontFamily: FONTS.body, fontSize: 14, fontStyle: 'italic', color: THEME.accent }}>&amp;</span>
        {' '}Javier
      </div>
      <div style={{
        fontFamily: FONTS.body, fontSize: 10, letterSpacing: 5,
        textTransform: 'uppercase', color: THEME.inkSoft, marginBottom: 18,
      }}>
        15 noviembre 2025
      </div>
      <div style={{ height: 1, width: 80, background: THEME.accent, margin: '0 auto 18px' }} />
      <nav style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
        {(['home', 'galeria'] as const).map((id) => (
          <button
            key={id}
            onClick={() => onPage(id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: FONTS.body, fontSize: 13, fontWeight: 400,
              padding: '4px 0',
              color: page === id ? THEME.accent : THEME.ink,
              fontStyle: page === id ? 'italic' : 'normal',
            }}
          >
            {id === 'home' ? 'Inicio' : 'Galería'}
          </button>
        ))}
      </nav>
    </header>
  )
}
```

Note: `className="page-section"` handles responsive left/right padding (48px → 24px at ≤700px). The inline style uses `paddingTop`/`paddingBottom` only, which does not conflict with the class.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add Nav component"
```

---

### Task 4: Footer component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create `src/components/Footer.tsx`**

```tsx
import { THEME, FONTS } from '../tokens'

export function Footer() {
  return (
    <footer
      className="page-section"
      style={{
        background: THEME.bg,
        borderTop: `1px solid ${THEME.rule}`,
        paddingTop: 56, paddingBottom: 40,
        textAlign: 'center',
      }}
    >
      <div style={{ fontFamily: FONTS.display, fontSize: 24, color: THEME.ink, marginBottom: 8 }}>
        Gracias
      </div>
      <div style={{ fontFamily: FONTS.body, fontSize: 13, color: THEME.inkSoft, marginBottom: 24 }}>
        Por compartir con nosotros un día tan especial.
      </div>
      <div style={{
        fontFamily: FONTS.body, fontSize: 10, letterSpacing: 3,
        textTransform: 'uppercase', color: THEME.accent,
      }}>
        elenica@gmail.com · #bodaeleyjavi2025
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

### Task 5: HeroFullbleed component

**Files:**
- Create: `src/components/HeroFullbleed.tsx`

- [ ] **Step 1: Create `src/components/HeroFullbleed.tsx`**

```tsx
import { THEME, FONTS } from '../tokens'
import { HERO_URL } from '../config'

export function HeroFullbleed() {
  return (
    <div style={{ position: 'relative', height: 600, overflow: 'hidden', background: THEME.bg2 }}>
      {HERO_URL && (
        <img
          src={HERO_URL}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(45,50,33,0.6) 0%, rgba(45,50,33,0) 60%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 48,
      }}>
        <div style={{
          fontFamily: FONTS.body, fontSize: 10, letterSpacing: 5,
          textTransform: 'uppercase', color: 'rgba(245,239,230,0.8)', marginBottom: 16,
        }}>
          15 · 11 · 2025
        </div>
        <div
          className="hero-headline"
          style={{ fontFamily: FONTS.display, color: '#f5efe6', lineHeight: 0.9, textAlign: 'center' }}
        >
          Elena{' '}
          <span style={{ fontStyle: 'italic', fontSize: '64%' }}>&amp;</span>
          {' '}Javier
        </div>
        <div style={{
          fontFamily: FONTS.body, fontSize: 13, letterSpacing: 3,
          textTransform: 'uppercase', color: 'rgba(245,239,230,0.8)', marginTop: 20,
        }}>
          Pamplona · Navarra
        </div>
      </div>
    </div>
  )
}
```

Note: `className="hero-headline"` applies responsive font-size (100px → 60px at ≤700px) from `index.css`. The `& ` uses `fontSize: '64%'` (relative to parent) to match the prototype's 64px-within-100px relationship.

When `HERO_URL` is empty the hero renders the cream stripe background — replace it after uploading the photo in Task 13.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroFullbleed.tsx
git commit -m "feat: add HeroFullbleed component"
```

---

### Task 6: PasswordGate component (TDD)

**Files:**
- Create: `src/components/PasswordGate.tsx`, `src/components/PasswordGate.test.tsx`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/PasswordGate.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { PasswordGate } from './PasswordGate'

beforeEach(() => {
  vi.stubEnv('VITE_APP_KEY', 'secret')
})

describe('PasswordGate', () => {
  it('calls onUnlock with correct password', async () => {
    const onUnlock = vi.fn()
    render(<PasswordGate onUnlock={onUnlock} />)
    await userEvent.type(screen.getByTestId('password-input'), 'secret')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(onUnlock).toHaveBeenCalledOnce()
  })

  it('does not call onUnlock with wrong password', async () => {
    const onUnlock = vi.fn()
    render(<PasswordGate onUnlock={onUnlock} />)
    await userEvent.type(screen.getByTestId('password-input'), 'wrong')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(onUnlock).not.toHaveBeenCalled()
  })

  it('shows error message with wrong password', async () => {
    render(<PasswordGate onUnlock={vi.fn()} />)
    await userEvent.type(screen.getByTestId('password-input'), 'wrong')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(screen.getByText(/no es correcta/i)).toBeInTheDocument()
  })

  it('trims and lowercases before comparing', async () => {
    const onUnlock = vi.fn()
    render(<PasswordGate onUnlock={onUnlock} />)
    await userEvent.type(screen.getByTestId('password-input'), '  SECRET  ')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(onUnlock).toHaveBeenCalledOnce()
  })

  it('submits on Enter key', async () => {
    const onUnlock = vi.fn()
    render(<PasswordGate onUnlock={onUnlock} />)
    await userEvent.type(screen.getByTestId('password-input'), 'secret{Enter}')
    expect(onUnlock).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run — verify they fail**

```bash
npm test -- PasswordGate
```
Expected: FAIL — "Cannot find module './PasswordGate'".

- [ ] **Step 3: Create `src/components/PasswordGate.tsx`**

```tsx
import { useState } from 'react'
import { THEME, FONTS } from '../tokens'

interface Props {
  onUnlock: () => void
}

function LockIcon() {
  return (
    <div style={{
      width: 56, height: 56, borderRadius: '50%',
      border: `1.5px solid ${THEME.accent}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: 24,
    }}>
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none"
        stroke={THEME.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="12" width="18" height="13" rx="2" />
        <path d="M6 12V8a5 5 0 0 1 10 0v4" />
      </svg>
    </div>
  )
}

export function PasswordGate({ onUnlock }: Props) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  function handleSubmit() {
    if (pw.toLowerCase().trim() === import.meta.env.VITE_APP_KEY) {
      onUnlock()
    } else {
      setErr(true)
    }
  }

  return (
    <div style={{
      background: THEME.bg, minHeight: '80vh',
      display: 'flex', justifyContent: 'center', paddingTop: 120,
    }}>
      <div style={{ maxWidth: 380, width: '100%', padding: '0 24px', textAlign: 'center' }}>
        <LockIcon />
        <div style={{
          fontFamily: FONTS.body, fontSize: 11, letterSpacing: 5,
          textTransform: 'uppercase', color: THEME.accent, marginBottom: 12,
        }}>
          Galería privada
        </div>
        <h1 style={{
          fontFamily: FONTS.display, fontSize: 40, lineHeight: 1.1,
          color: THEME.ink, margin: '0 0 12px',
        }}>
          Las fotos del día
        </h1>
        <p style={{
          fontFamily: FONTS.body, fontSize: 13, fontStyle: 'italic',
          color: THEME.inkSoft, margin: '0 0 32px',
        }}>
          Para invitados. Introduce la contraseña que te enviamos.
        </p>
        <input
          data-testid="password-input"
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setErr(false) }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          style={{
            width: '100%', boxSizing: 'border-box',
            background: 'transparent', border: 'none',
            borderBottom: `1px solid ${err ? THEME.accent : THEME.rule}`,
            padding: '8px 0', marginBottom: 24,
            fontFamily: FONTS.body, fontSize: 14, letterSpacing: 2,
            textAlign: 'center', color: THEME.ink, outline: 'none',
          }}
        />
        {err && (
          <p style={{
            fontFamily: FONTS.body, fontSize: 13, fontStyle: 'italic',
            color: THEME.accent, margin: '0 0 16px',
          }}>
            No es correcta. Pista: ciudad · año.
          </p>
        )}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '14px 0',
            background: THEME.ink, color: THEME.bg,
            border: 'none', borderRadius: 999, cursor: 'pointer',
            fontFamily: FONTS.body, fontSize: 11, letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run — verify they pass**

```bash
npm test -- PasswordGate
```
Expected: 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/PasswordGate.tsx src/components/PasswordGate.test.tsx
git commit -m "feat: add PasswordGate with password validation"
```

---

### Task 7: PhotoGrid component

**Files:**
- Create: `src/components/PhotoGrid.tsx`

- [ ] **Step 1: Create `src/components/PhotoGrid.tsx`**

```tsx
import type { Photo } from '../types'

interface Props {
  photos: Photo[]
  onPhotoClick: (idx: number) => void
}

export function PhotoGrid({ photos, onPhotoClick }: Props) {
  return (
    <div className="photo-grid">
      {photos.map((photo, i) => (
        <div key={`${photo.url}-${i}`} style={{ breakInside: 'avoid', marginBottom: 12 }}>
          <img
            src={photo.url}
            alt=""
            onClick={() => onPhotoClick(i)}
            style={{
              width: '100%',
              aspectRatio: photo.ratio,
              objectFit: 'cover',
              borderRadius: 4,
              cursor: 'zoom-in',
              display: 'block',
            }}
          />
        </div>
      ))}
    </div>
  )
}
```

Note: `className="photo-grid"` applies column count + responsive breakpoints from `index.css`. The `photo.ratio` from `photos.js` controls each image's display aspect ratio.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/PhotoGrid.tsx
git commit -m "feat: add PhotoGrid component"
```

---

### Task 8: Lightbox component (TDD)

**Files:**
- Create: `src/components/Lightbox.tsx`, `src/components/Lightbox.test.tsx`

- [ ] **Step 1: Write failing tests**

```tsx
// src/components/Lightbox.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import { Lightbox } from './Lightbox'
import type { Photo } from '../types'

const photos: Photo[] = [
  { url: 'a.jpg', ratio: '4/5' },
  { url: 'b.jpg', ratio: '1/1' },
  { url: 'c.jpg', ratio: '4/5' },
]

describe('Lightbox', () => {
  it('renders nothing when openIdx is null', () => {
    const { container } = render(
      <Lightbox photos={photos} openIdx={null} onClose={vi.fn()} onNav={vi.fn()} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('shows photo counter', () => {
    render(<Lightbox photos={photos} openIdx={1} onClose={vi.fn()} onNav={vi.fn()} />)
    expect(screen.getByText('02 / 03')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    render(<Lightbox photos={photos} openIdx={1} onClose={onClose} onNav={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: /cerrar/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('navigates to previous photo', async () => {
    const onNav = vi.fn()
    render(<Lightbox photos={photos} openIdx={1} onClose={vi.fn()} onNav={onNav} />)
    await userEvent.click(screen.getByRole('button', { name: /anterior/i }))
    expect(onNav).toHaveBeenCalledWith(0)
  })

  it('navigates to next photo', async () => {
    const onNav = vi.fn()
    render(<Lightbox photos={photos} openIdx={1} onClose={vi.fn()} onNav={onNav} />)
    await userEvent.click(screen.getByRole('button', { name: /siguiente/i }))
    expect(onNav).toHaveBeenCalledWith(2)
  })

  it('wraps from first to last on prev', async () => {
    const onNav = vi.fn()
    render(<Lightbox photos={photos} openIdx={0} onClose={vi.fn()} onNav={onNav} />)
    await userEvent.click(screen.getByRole('button', { name: /anterior/i }))
    expect(onNav).toHaveBeenCalledWith(2)
  })

  it('wraps from last to first on next', async () => {
    const onNav = vi.fn()
    render(<Lightbox photos={photos} openIdx={2} onClose={vi.fn()} onNav={onNav} />)
    await userEvent.click(screen.getByRole('button', { name: /siguiente/i }))
    expect(onNav).toHaveBeenCalledWith(0)
  })
})
```

- [ ] **Step 2: Run — verify they fail**

```bash
npm test -- Lightbox
```
Expected: FAIL — "Cannot find module './Lightbox'".

- [ ] **Step 3: Create `src/components/Lightbox.tsx`**

```tsx
import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { FONTS } from '../tokens'
import type { Photo } from '../types'

interface Props {
  photos: Photo[]
  openIdx: number | null
  onClose: () => void
  onNav: (idx: number) => void
}

function parseRatio(ratio: string): number {
  const [w, h] = ratio.split('/').map(Number)
  return h ? w / h : w
}

const CIRCLE_BTN: CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 48, height: 48, borderRadius: '50%',
  background: 'rgba(255,255,255,0.1)', border: 'none',
  cursor: 'pointer', flexShrink: 0,
}

export function Lightbox({ photos, openIdx, onClose, onNav }: Props) {
  const touchX = useRef<number | null>(null)
  const touchY = useRef<number | null>(null)
  const count = photos.length
  const isOpen = openIdx !== null

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || openIdx === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') onNav((openIdx! - 1 + count) % count)
      if (e.key === 'ArrowRight') onNav((openIdx! + 1) % count)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, openIdx, count, onClose, onNav])

  if (!isOpen || openIdx === null) return null

  const photo = photos[openIdx]
  const ratio = parseRatio(photo.ratio)
  const counter = `${String(openIdx + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(20,12,6,0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <button
        aria-label="Cerrar"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        style={{
          ...CIRCLE_BTN, position: 'absolute',
          top: 'max(16px, env(safe-area-inset-top))',
          right: 'max(16px, env(safe-area-inset-right))',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
          stroke="white" strokeWidth="2" strokeLinecap="round">
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </svg>
      </button>

      <button
        aria-label="Anterior"
        onClick={(e) => { e.stopPropagation(); onNav((openIdx - 1 + count) % count) }}
        style={{
          ...CIRCLE_BTN, position: 'absolute',
          left: 'max(16px, env(safe-area-inset-left))',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 16 7 10 13 4" />
        </svg>
      </button>

      <img
        src={photo.url}
        alt=""
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
          touchY.current = e.touches[0].clientY
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null || touchY.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          const dy = e.changedTouches[0].clientY - touchY.current
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            onNav(dx > 0 ? (openIdx - 1 + count) % count : (openIdx + 1) % count)
          }
          touchX.current = null
          touchY.current = null
        }}
        style={{
          aspectRatio: photo.ratio,
          maxWidth: `min(92vw, calc((92vh - 80px) * ${ratio}))`,
          maxHeight: 'calc(92vh - 80px)',
          objectFit: 'cover',
          borderRadius: 4,
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          display: 'block',
        }}
      />

      <button
        aria-label="Siguiente"
        onClick={(e) => { e.stopPropagation(); onNav((openIdx + 1) % count) }}
        style={{
          ...CIRCLE_BTN, position: 'absolute',
          right: 'max(16px, env(safe-area-inset-right))',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="7 4 13 10 7 16" />
        </svg>
      </button>

      <div style={{
        position: 'absolute',
        bottom: 'max(20px, env(safe-area-inset-bottom))',
        left: 0, right: 0, textAlign: 'center',
        fontFamily: FONTS.body, fontSize: 12, letterSpacing: 3,
        textTransform: 'uppercase', color: 'rgba(245,239,230,0.8)',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {counter}
      </div>
    </div>,
    document.body,
  )
}
```

- [ ] **Step 4: Run — verify they pass**

```bash
npm test -- Lightbox
```
Expected: 7 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Lightbox.tsx src/components/Lightbox.test.tsx
git commit -m "feat: add Lightbox with keyboard, touch, and wrap-around navigation"
```

---

### Task 9: HomePage component

**Files:**
- Create: `src/components/HomePage.tsx`

- [ ] **Step 1: Create `src/components/HomePage.tsx`**

```tsx
import { HeroFullbleed } from './HeroFullbleed'
import { THEME, FONTS } from '../tokens'

export function HomePage() {
  return (
    <main style={{ flex: 1 }}>
      <HeroFullbleed />
      <div
        className="page-section"
        style={{ background: THEME.bg, paddingTop: 88, paddingBottom: 64, textAlign: 'center' }}
      >
        <blockquote style={{
          fontFamily: FONTS.display, fontSize: 26, lineHeight: 1.5,
          color: THEME.ink, maxWidth: 600, margin: '0 auto 16px',
        }}>
          "Aún seguimos flotando. Aquí están los recuerdos de un día que, gracias a todos, fue inolvidable."
        </blockquote>
        <p style={{ fontFamily: FONTS.body, fontSize: 13, fontStyle: 'italic', color: THEME.accent, margin: 0 }}>
          — Elena &amp; Javi
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HomePage.tsx
git commit -m "feat: add HomePage component"
```

---

### Task 10: GalleryPage component

**Files:**
- Create: `src/components/GalleryPage.tsx`

- [ ] **Step 1: Create `src/components/GalleryPage.tsx`**

```tsx
import { useState } from 'react'
import photos from '../photos.js'
import { PasswordGate } from './PasswordGate'
import { PhotoGrid } from './PhotoGrid'
import { Lightbox } from './Lightbox'
import { THEME, FONTS } from '../tokens'

const PAGE_SIZE = 18

export function GalleryPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />

  const visible = photos.slice(0, visibleCount)

  return (
    <main style={{ flex: 1, background: THEME.bg }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '64px 24px 0', textAlign: 'center' }}>
        <div style={{
          fontFamily: FONTS.body, fontSize: 11, letterSpacing: 5,
          textTransform: 'uppercase', color: THEME.accent, marginBottom: 12,
        }}>
          Recuerdos del día
        </div>
        <h1 style={{
          fontFamily: FONTS.display, fontSize: 60, lineHeight: 1.1,
          color: THEME.ink, margin: '0 0 12px',
        }}>
          Galería
        </h1>
        <div style={{ height: 1, width: 60, background: THEME.accent, margin: '0 auto 24px' }} />
        <p style={{
          fontFamily: FONTS.body, fontSize: 14, fontStyle: 'italic',
          color: THEME.inkSoft, maxWidth: 520, margin: '0 auto 48px',
        }}>
          Aquí están todas las fotos del día. Pulsa para ampliar.
        </p>
      </div>

      <PhotoGrid photos={visible} onPhotoClick={setOpenIdx} />

      {visibleCount < photos.length && (
        <div style={{ textAlign: 'center', padding: '40px 0 64px' }}>
          <button
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            style={{
              fontFamily: FONTS.body, fontSize: 11, letterSpacing: 4,
              textTransform: 'uppercase', color: THEME.ink, background: 'none',
              border: `1px solid ${THEME.rule}`, borderRadius: 999,
              padding: '12px 32px', cursor: 'pointer',
            }}
          >
            Cargar más
          </button>
        </div>
      )}

      <Lightbox
        photos={visible}
        openIdx={openIdx}
        onClose={() => setOpenIdx(null)}
        onNav={setOpenIdx}
      />
    </main>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/GalleryPage.tsx
git commit -m "feat: add GalleryPage with password gate, grid, and lightbox"
```

---

### Task 11: Wire up App and verify in browser

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace `src/App.tsx`**

```tsx
import { useState } from 'react'
import { Nav } from './components/Nav'
import { HomePage } from './components/HomePage'
import { GalleryPage } from './components/GalleryPage'
import { Footer } from './components/Footer'
import type { Page } from './types'

export function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav page={page} onPage={setPage} />
      {page === 'home' ? <HomePage /> : <GalleryPage />}
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Run full test suite**

```bash
npm test
```
Expected: all 12 tests pass (5 PasswordGate + 7 Lightbox).

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Check at `http://localhost:5173`:
- Home page: header, hero (cream stripe if HERO_URL is empty), welcome block, footer
- Nav "Galería" → password gate
- Enter `pamplona2025` → gallery unlocks (empty img elements — fine until Task 13)
- Open any image → lightbox opens (blank — fine)
- Lightbox: `←`/`→` keys navigate, `Escape` closes, prev/next buttons wrap correctly
- Resize to ≤700px: hero headline shrinks, gallery drops to 2 columns
- Resize to ≤480px: gallery drops to 1 column

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire up App routing and verify full site"
```

---

### Task 12: Firebase Hosting configuration

**Files:**
- Create: `firebase.json`, `.firebaserc`

- [ ] **Step 1: Log in to Firebase**

```bash
npx firebase login
```

- [ ] **Step 2: Initialize Hosting**

```bash
npx firebase init hosting
```

Answers:
- "Use an existing project" → select your project (or create one at [console.firebase.google.com](https://console.firebase.google.com))
- Public directory: `dist`
- Single-page app: `Yes`
- GitHub deploys: `No`
- Overwrite `dist/index.html`: `No`

- [ ] **Step 3: Verify `firebase.json` content**

Confirm it reads:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

- [ ] **Step 4: Test build**

```bash
npm run build
```
Expected: `dist/` created with hashed assets. No TypeScript or Vite errors.

- [ ] **Step 5: Commit**

```bash
git add firebase.json .firebaserc
git commit -m "feat: add Firebase Hosting configuration"
```

---

### Task 13: Add real photos and deploy

**Files:**
- Modify: `src/photos.js`, `src/config.ts`

This task is done once you have the actual wedding photos.

- [ ] **Step 1: Upload photos to Firebase Storage**

In [Firebase Console](https://console.firebase.google.com) → your project → Storage → create a folder `photos/` and upload all gallery images. Upload the hero landscape photo separately as `hero.jpg`.

- [ ] **Step 2: Set Storage security rules**

In Firebase Console → Storage → Rules, confirm or set:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if false;
    }
  }
}
```

- [ ] **Step 3: Get download URLs**

For each file: click it → copy **Download URL** (looks like `https://firebasestorage.googleapis.com/v0/b/<project>/o/<path>?alt=media&token=...`).

- [ ] **Step 4: Update `src/config.ts`**

```ts
export const HERO_URL = 'https://firebasestorage.googleapis.com/v0/b/<project>/o/hero.jpg?alt=media&token=<token>'
```

- [ ] **Step 5: Update `src/photos.js`**

Replace each empty `url: ''` with the corresponding download URL. Adjust `ratio` values per photo if needed — the value controls how the image is cropped in the grid (`'4/5'` = portrait, `'1/1'` = square).

- [ ] **Step 6: Preview locally**

```bash
npm run build && npx firebase serve
```
Open `http://localhost:5000`. Check:
- Hero photo loads
- All gallery photos load
- Lightbox opens and shows real photos
- Password gate works with `pamplona2025`
- "Cargar más" only appears if you add more than 18 photos to `photos.js`

- [ ] **Step 7: Deploy**

```bash
npm run deploy
```
Expected output: `Deploy complete! Hosting URL: https://<project>.web.app`

- [ ] **Step 8: Commit**

```bash
git add src/photos.js src/config.ts
git commit -m "feat: add real photo URLs and deploy to Firebase Hosting"
```
