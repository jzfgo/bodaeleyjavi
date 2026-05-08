import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect } from 'vitest'
import { Lightbox } from './Lightbox'
import type { Photo } from '../types'

const photos: Photo[] = [
  { url: 'a.jpg', thumb: 'a-t.jpg', ratio: '4/5' },
  { url: 'b.jpg', thumb: 'b-t.jpg', ratio: '1/1' },
  { url: 'c.jpg', thumb: 'c-t.jpg', ratio: '4/5' },
]

describe('Lightbox', () => {
  it('renders nothing when openIdx is null', () => {
    const { container } = render(
      <Lightbox photos={photos} openIdx={null} onClose={vi.fn()} onNav={vi.fn()} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('shows photo counter', () => {
    render(<Lightbox photos={photos} openIdx={1} onClose={vi.fn()} onNav={vi.fn()} />)
    expect(screen.getByText('02 / 03')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    render(<Lightbox photos={photos} openIdx={1} onClose={onClose} onNav={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: /cerrar/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('navigates to previous photo', async () => {
    const onNav = vi.fn()
    render(<Lightbox photos={photos} openIdx={1} onClose={vi.fn()} onNav={onNav} />)
    await userEvent.click(screen.getByRole('button', { name: /anterior/i }))
    expect(onNav).toHaveBeenCalledWith(0)
  })

  it('navigates to next photo', async () => {
    const onNav = vi.fn()
    render(<Lightbox photos={photos} openIdx={1} onClose={vi.fn()} onNav={onNav} />)
    await userEvent.click(screen.getByRole('button', { name: /siguiente/i }))
    expect(onNav).toHaveBeenCalledWith(2)
  })

  it('wraps from first to last on prev', async () => {
    const onNav = vi.fn()
    render(<Lightbox photos={photos} openIdx={0} onClose={vi.fn()} onNav={onNav} />)
    await userEvent.click(screen.getByRole('button', { name: /anterior/i }))
    expect(onNav).toHaveBeenCalledWith(2)
  })

  it('wraps from last to first on next', async () => {
    const onNav = vi.fn()
    render(<Lightbox photos={photos} openIdx={2} onClose={vi.fn()} onNav={onNav} />)
    await userEvent.click(screen.getByRole('button', { name: /siguiente/i }))
    expect(onNav).toHaveBeenCalledWith(0)
  })
})
