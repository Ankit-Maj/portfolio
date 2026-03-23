import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '../../components/sections/Hero'

describe('Hero', () => {
  it('renders the heading "Ankit Majumdar"', () => {
    render(<Hero lenis={null} />)
    expect(screen.getByText('Ankit')).toBeInTheDocument()
    expect(screen.getByText('Majumdar')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Hero lenis={null} />)
    expect(
      screen.getByText('Full Stack Developer • Agentic AI • ML Engineer')
    ).toBeInTheDocument()
  })

  it('"Download Resume" anchor has download attribute and correct href', () => {
    render(<Hero lenis={null} />)
    const link = screen.getByTestId('download-resume') as HTMLAnchorElement
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('download')).not.toBeNull()
    expect(link.getAttribute('href')).toBe('/resume.pdf')
  })

  it('"View Projects" button is present', () => {
    render(<Hero lenis={null} />)
    expect(screen.getByText(/View Projects/i)).toBeInTheDocument()
  })

  it('profile image has alt text', () => {
    render(<Hero lenis={null} />)
    const img = screen.getByAltText('Ankit Majumdar profile photo')
    expect(img).toBeInTheDocument()
  })

  it('profile image has loading="lazy"', () => {
    render(<Hero lenis={null} />)
    const img = screen.getByAltText('Ankit Majumdar profile photo') as HTMLImageElement
    expect(img.getAttribute('loading')).toBe('lazy')
  })
})
