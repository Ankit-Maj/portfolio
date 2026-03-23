import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

// Feature: personal-portfolio, Property 11: Scroll-to-top button visibility is determined by scroll threshold
function shouldShowScrollToTop(scrollY: number, threshold = 400): boolean {
  return scrollY > threshold
}

describe('Property 11: Scroll-to-top button visibility is determined by scroll threshold', () => {
  it('is hidden when scrollY is 0', () => {
    expect(shouldShowScrollToTop(0)).toBe(false)
  })

  it('is hidden when scrollY equals threshold', () => {
    expect(shouldShowScrollToTop(400)).toBe(false)
  })

  it('is visible when scrollY is 401', () => {
    expect(shouldShowScrollToTop(401)).toBe(true)
  })

  it('for any scrollY > 400, button should be visible', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 401, max: 100000 }),
        (scrollY) => {
          expect(shouldShowScrollToTop(scrollY)).toBe(true)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('for any scrollY <= 400, button should be hidden', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 400 }),
        (scrollY) => {
          expect(shouldShowScrollToTop(scrollY)).toBe(false)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
