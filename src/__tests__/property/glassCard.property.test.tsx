import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import { GlassCard } from '../../components/ui/GlassCard'

// Feature: personal-portfolio, Property 1: GlassCard always carries glassmorphism classes
describe('Property 1: GlassCard always carries glassmorphism classes', () => {
  it('renders with backdrop-blur class on the inner div', () => {
    const { container } = render(<GlassCard>content</GlassCard>)
    const inner = container.querySelector('.backdrop-blur-glass')
    expect(inner).not.toBeNull()
  })

  it('renders with semi-transparent background class', () => {
    const { container } = render(<GlassCard>content</GlassCard>)
    const inner = container.querySelector('.bg-white\\/5')
    expect(inner).not.toBeNull()
  })

  it('renders with border class', () => {
    const { container } = render(<GlassCard>content</GlassCard>)
    const inner = container.querySelector('.border')
    expect(inner).not.toBeNull()
  })

  it('always carries glassmorphism classes regardless of children or className', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string(),
        (childText, extraClass) => {
          const { container } = render(
            <GlassCard className={extraClass}>{childText}</GlassCard>
          )
          expect(container.querySelector('.backdrop-blur-glass')).not.toBeNull()
          expect(container.querySelector('.bg-white\\/5')).not.toBeNull()
          expect(container.querySelector('.border')).not.toBeNull()
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
