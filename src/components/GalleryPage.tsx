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
