import type { Photo } from '../types'

interface Props {
  photos: Photo[]
  onPhotoClick: (idx: number) => void
}


export function PhotoGrid({ photos, onPhotoClick }: Props) {
  return (
    <div className="photo-grid">
      {photos.map((photo, i) => (
        <div key={`${photo.url}-${i}`}>
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
