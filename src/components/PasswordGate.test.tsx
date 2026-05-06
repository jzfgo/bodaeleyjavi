import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { PasswordGate } from './PasswordGate'

beforeEach(() => {
  vi.stubEnv('VITE_APP_KEY', 'secret')
})

describe('PasswordGate', () => {
  it('calls onUnlock with correct password', async () => {
    const onUnlock = vi.fn()
    render(<PasswordGate onUnlock={onUnlock} />)
    await userEvent.type(screen.getByTestId('password-input'), 'secret')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(onUnlock).toHaveBeenCalledOnce()
  })

  it('does not call onUnlock with wrong password', async () => {
    const onUnlock = vi.fn()
    render(<PasswordGate onUnlock={onUnlock} />)
    await userEvent.type(screen.getByTestId('password-input'), 'wrong')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(onUnlock).not.toHaveBeenCalled()
  })

  it('shows error message with wrong password', async () => {
    render(<PasswordGate onUnlock={vi.fn()} />)
    await userEvent.type(screen.getByTestId('password-input'), 'wrong')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(screen.getByText(/no es correcta/i)).toBeInTheDocument()
  })

  it('trims and lowercases before comparing', async () => {
    const onUnlock = vi.fn()
    render(<PasswordGate onUnlock={onUnlock} />)
    await userEvent.type(screen.getByTestId('password-input'), '  SECRET  ')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(onUnlock).toHaveBeenCalledOnce()
  })

  it('submits on Enter key', async () => {
    const onUnlock = vi.fn()
    render(<PasswordGate onUnlock={onUnlock} />)
    await userEvent.type(screen.getByTestId('password-input'), 'secret{Enter}')
    expect(onUnlock).toHaveBeenCalledOnce()
  })
})
