import { useState, useEffect, useRef } from 'react'
import rawPhotos from '../photos.js'
import { STORAGE_BASE, THUMB_BASE } from '../config'
import { PasswordGate } from './PasswordGate'
import { PhotoGrid } from './PhotoGrid'
import { Lightbox } from './Lightbox'
import { THEME, FONTS } from '../tokens'

const photos = rawPhotos.map((p: { url: string; ratio: string }) => ({
  ...p,
  url: `${STORAGE_BASE}${p.url}?alt=media`,
  thumb: `${THUMB_BASE}${p.url}?alt=media`,
}))

const PAGE_SIZE = 18
const AUTH_KEY = 'boda_unlocked'

export function GalleryPage() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(AUTH_KEY) === '1')
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const visibleCountRef = useRef(visibleCount)
  visibleCountRef.current = visibleCount

  useEffect(() => { window.scrollTo(0, 0) }, [])

  function unlock() {
    localStorage.setItem(AUTH_KEY, '1')
    setUnlocked(true)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCountRef.current < photos.length) {
          setVisibleCount(v => Math.min(v + PAGE_SIZE, photos.length))
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  function handleNav(idx: number) {
    if (idx >= visibleCountRef.current) {
      setVisibleCount(Math.min(idx + PAGE_SIZE, photos.length))
    }
    setOpenIdx(idx)
  }

  if (!unlocked) return <PasswordGate onUnlock={unlock} />

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

      <div ref={sentinelRef} style={{ height: 1 }} />

      <Lightbox
        photos={photos}
        openIdx={openIdx}
        onClose={() => setOpenIdx(null)}
        onNav={handleNav}
      />
    </main>
  )
}
