import { useState, useRef, useLayoutEffect } from 'react'
import type { Photo } from '../types'

interface Props {
  photos: Photo[]
  onPhotoClick: (idx: number) => void
}

const GAP = 12

function parseRatio(ratio: string | number): number {
  if (typeof ratio === 'number') return ratio
  const [w, h] = (ratio as string).split('/').map(Number)
  return w / h
}

export function PhotoGrid({ photos, onPhotoClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(() => Math.max(0, Math.min(window.innerWidth, 980) - 48))

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cols = width < 480 ? 1 : width < 700 ? 2 : 3
  const colWidth = width > 0 ? (width - (cols - 1) * GAP) / cols : 0

  const colHeights = Array<number>(cols).fill(0)
  const positions = photos.map((photo, i) => {
    const col = i % cols
    const x = col * (colWidth + GAP)
    const y = colHeights[col]
    const h = colWidth > 0 ? colWidth / parseRatio(photo.ratio) : 0
    colHeights[col] += h + GAP
    return { x, y, w: colWidth, h }
  })

  const totalHeight = colHeights.length > 0 ? Math.max(...colHeights) - GAP : 0

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 24px' }}>
      <div ref={containerRef} style={{ position: 'relative', height: totalHeight }}>
        {photos.map((photo, i) => {
          const { x, y, w, h } = positions[i]
          return (
            <div
              key={`${photo.url}-${i}`}
              style={{ position: 'absolute', left: x, top: y, width: w }}
            >
              <img
                src={photo.thumb}
                alt=""
                onClick={() => onPhotoClick(i)}
                style={{
                  width: '100%',
                  height: h,
                  objectFit: 'cover',
                  borderRadius: 4,
                  cursor: 'zoom-in',
                  display: 'block',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
