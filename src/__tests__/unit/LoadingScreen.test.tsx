import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { LoadingScreen } from '../../components/ui/LoadingScreen'

describe('LoadingScreen', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('is visible on initial render', () => {
    const onComplete = vi.fn()
    render(<LoadingScreen onComplete={onComplete} />)
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument()
  })

  it('is still visible at 1799ms', async () => {
    const onComplete = vi.fn()
    render(<LoadingScreen onComplete={onComplete} />)
    await act(async () => {
      vi.advanceTimersByTime(1799)
    })
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument()
  })

  it('calls onComplete after the animation completes (1800ms + 600ms exit)', async () => {
    const onComplete = vi.fn()
    render(<LoadingScreen onComplete={onComplete} />)
    await act(async () => {
      vi.advanceTimersByTime(2500)
    })
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('renders the name letters', () => {
    const onComplete = vi.fn()
    render(<LoadingScreen onComplete={onComplete} />)
    // "Ankit Majumdar" letters should be present
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('M')).toBeInTheDocument()
  })
})
