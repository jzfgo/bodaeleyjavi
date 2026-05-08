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

function downloadPhoto(url: string) {
  const filename = decodeURIComponent(url.match(/gallery%2F([^?&]+)/)?.[1] ?? 'photo.jpg')
  fetch(url)
    .then(r => r.blob())
    .then(blob => {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(a.href)
    })
    .catch(() => {
      // Fallback when CORS isn't configured on the bucket
      window.open(url, '_blank')
    })
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
      <div style={{
        position: 'absolute', display: 'flex', gap: 8,
        top: 'max(16px, env(safe-area-inset-top))',
        right: 'max(16px, env(safe-area-inset-right))',
      }}>
        <button
          aria-label="Descargar"
          onClick={(e) => { e.stopPropagation(); downloadPhoto(photo.url) }}
          style={CIRCLE_BTN}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3v9M5 8l4 4 4-4" />
            <path d="M3 15h12" />
          </svg>
        </button>
        <button
          aria-label="Cerrar"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          style={CIRCLE_BTN}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>
      </div>

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
