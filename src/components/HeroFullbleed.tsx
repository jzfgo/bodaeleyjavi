import { THEME, FONTS } from '../tokens'
import { HERO_URL } from '../config'

export function HeroFullbleed() {
  return (
    <div style={{ position: 'relative', height: 600, overflow: 'hidden', background: THEME.bg2 }}>
      {HERO_URL && (
        <img
          src={HERO_URL}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
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
