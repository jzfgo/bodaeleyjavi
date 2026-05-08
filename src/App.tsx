import { useState, useEffect } from 'react'
import { Nav } from './components/Nav'
import { HomePage } from './components/HomePage'
import { GalleryPage } from './components/GalleryPage'
import { Footer } from './components/Footer'
import type { Page } from './types'

export function App() {
  const [page, setPage] = useState<Page>(() =>
    window.location.hash === '#galeria' ? 'galeria' : 'home'
  )

  function navigate(p: Page) {
    setPage(p)
    window.location.hash = p === 'galeria' ? 'galeria' : ''
  }

  useEffect(() => {
    function onHashChange() {
      setPage(window.location.hash === '#galeria' ? 'galeria' : 'home')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav page={page} onPage={navigate} />
      {page === 'home' ? <HomePage /> : <GalleryPage />}
      <Footer />
    </div>
  )
}
