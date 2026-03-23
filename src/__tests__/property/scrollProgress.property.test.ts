import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { computeScrollProgress } from '../../lib/gsap'

// Feature: personal-portfolio, Property 2: Scroll progress bar is proportional to scroll position
describe('Property 2: Scroll progress bar is proportional to scroll position', () => {
  it('returns 0 when scrollTop is 0', () => {
    expect(computeScrollProgress(0, 1000)).toBe(0)
  })

  it('returns 1 when scrollTop equals maxScroll', () => {
    expect(computeScrollProgress(1000, 1000)).toBe(1)
  })

  it('returns 0 when maxScroll is 0 or negative', () => {
    expect(computeScrollProgress(100, 0)).toBe(0)
    expect(computeScrollProgress(100, -1)).toBe(0)
  })

  it('is proportional to scroll position for any valid input', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 10000, noNaN: true }),
        fc.float({ min: 1, max: 10000, noNaN: true }),
        (scrollTop, maxScroll) => {
          const result = computeScrollProgress(scrollTop, maxScroll)
          const expected = Math.min(1, Math.max(0, scrollTop / maxScroll))
          expect(Math.abs(result - expected)).toBeLessThan(0.0001)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('result is always clamped to [0, 1]', () => {
    fc.assert(
      fc.property(
        fc.float({ min: -1000, max: 20000, noNaN: true }),
        fc.float({ min: -1000, max: 10000, noNaN: true }),
        (scrollTop, maxScroll) => {
          const result = computeScrollProgress(scrollTop, maxScroll)
          expect(result).toBeGreaterThanOrEqual(0)
          expect(result).toBeLessThanOrEqual(1)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
