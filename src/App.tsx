import { useState } from 'react'
import { Nav } from './components/Nav'
import { HomePage } from './components/HomePage'
import { GalleryPage } from './components/GalleryPage'
import { Footer } from './components/Footer'
import type { Page } from './types'

export function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav page={page} onPage={setPage} />
      {page === 'home' ? <HomePage /> : <GalleryPage />}
      <Footer />
    </div>
  )
}
