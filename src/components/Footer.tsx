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
