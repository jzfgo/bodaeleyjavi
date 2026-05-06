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
