import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from '../../components/layout/Navbar'

// Mock useScrollSpy to return a controlled value
vi.mock('../../hooks/useScrollSpy', () => ({
  useScrollSpy: () => 'home',
}))

describe('Navbar', () => {
  it('renders all 7 nav links', () => {
    render(<Navbar lenis={null} />)
    const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Education', 'Contact']
    navLinks.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('highlights the active section link', () => {
    render(<Navbar lenis={null} />)
    // 'home' is the mocked active section — the Home button should have accent color class
    const homeButtons = screen.getAllByText('Home')
    const activeButton = homeButtons.find((el) =>
      el.className.includes('text-accent')
    )
    expect(activeButton).toBeDefined()
  })

  it('shows hamburger button on mobile (always rendered, hidden via CSS)', () => {
    render(<Navbar lenis={null} />)
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('opens mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar lenis={null} />)
    await user.click(screen.getByLabelText('Open menu'))
    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument()
  })
})
