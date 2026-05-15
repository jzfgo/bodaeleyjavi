import { useState, useEffect, useRef, useCallback } from 'react'
import rawPhotos from '../photos.js'
import { STORAGE_BASE, THUMB_BASE } from '../config'
import { PasswordGate } from './PasswordGate'
import { PhotoGrid } from './PhotoGrid'
import { Lightbox } from './Lightbox'
import { THEME, FONTS } from '../tokens'
import { trackSectionView, trackPhotoView } from '../analytics'

const photos = rawPhotos.map((p: { url: string; ratio: string; group?: string }) => ({
  ...p,
  url: `${STORAGE_BASE}${p.url}?alt=media`,
  thumb: `${THUMB_BASE}${p.url}?alt=media`,
}))

const groups: string[] = []
for (const p of photos) {
  if (p.group && !groups.includes(p.group)) groups.push(p.group)
}
const hasUngrouped = photos.some(p => !p.group)

const PAGE_SIZE = 18
const AUTH_KEY = 'boda_unlocked'

export function GalleryPage() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(AUTH_KEY) === '1')
  const [activeGroup, setActiveGroup] = useState<string | null>(groups[0] ?? null)
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const visibleCountRef = useRef(visibleCount)
  visibleCountRef.current = visibleCount

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (openIdx === null) return
    const photo = filtered[openIdx]
    const filename = decodeURIComponent(photo.url.match(/gallery%2F([^?&]+)/)?.[1] ?? '')
    trackPhotoView(filename, photo.group ?? '', openIdx)
  }, [openIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  function unlock() {
    localStorage.setItem(AUTH_KEY, '1')
    setUnlocked(true)
    window.scrollTo(0, 0)
  }

  function selectGroup(id: string | null) {
    setActiveGroup(id)
    setVisibleCount(PAGE_SIZE)
    setOpenIdx(null)
    window.scrollTo(0, 0)
    trackSectionView(id ?? 'Otras')
  }

  const filtered = activeGroup === null
    ? photos.filter(p => !p.group)
    : photos.filter(p => p.group === activeGroup)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCountRef.current < filtered.length) {
          setVisibleCount(v => Math.min(v + PAGE_SIZE, filtered.length))
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [filtered])

  function handleNav(idx: number) {
    if (idx >= visibleCountRef.current) {
      setVisibleCount(Math.min(idx + PAGE_SIZE, filtered.length))
    }
    setOpenIdx(idx)
  }

  if (!unlocked) return <PasswordGate onUnlock={unlock} />

  const visible = filtered.slice(0, visibleCount)

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
          color: THEME.inkSoft, maxWidth: 520, margin: '0 auto 40px',
        }}>
          Aquí están todas las fotos del día. Pulsa para ampliar.
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 24px 32px' }}>
        <div className="tabs-scroll">
          {groups.map(g => (
            <Tab key={g} label={g} active={activeGroup === g} onClick={() => selectGroup(g)} />
          ))}
          {hasUngrouped && (
            <Tab label="Otras" active={activeGroup === null} onClick={() => selectGroup(null)} />
          )}
        </div>
      </div>

      <PhotoGrid photos={visible} onPhotoClick={setOpenIdx} />

      <div ref={sentinelRef} style={{ height: 1 }} />

      <Lightbox
        photos={filtered}
        openIdx={openIdx}
        onClose={() => setOpenIdx(null)}
        onNav={handleNav}
      />
    </main>
  )
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const ref = useCallback((el: HTMLButtonElement | null) => {
    if (active && el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  return (
    <button
      ref={ref}
      onClick={onClick}
      style={{
        flexShrink: 0,
        padding: '7px 18px',
        borderRadius: 999,
        border: `1px solid ${active ? THEME.accent : THEME.rule}`,
        background: active ? THEME.accent : 'transparent',
        color: active ? THEME.bg : THEME.inkSoft,
        fontFamily: FONTS.body,
        fontSize: 11,
        letterSpacing: 3,
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'background 0.15s, color 0.15s, border-color 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}
