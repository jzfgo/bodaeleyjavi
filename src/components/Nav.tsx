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
