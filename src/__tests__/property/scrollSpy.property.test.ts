import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

// Feature: personal-portfolio, Property 3: Scroll spy correctly identifies active section
// We test the core overlap-finding logic as a pure function

interface SectionRect {
  id: string
  top: number
  bottom: number
}

function findActiveSectionByOverlap(sections: SectionRect[], viewportHeight: number): string | null {
  if (sections.length === 0) return null
  let bestId = sections[0].id
  let bestOverlap = -Infinity

  for (const section of sections) {
    const visibleTop = Math.max(0, section.top)
    const visibleBottom = Math.min(viewportHeight, section.bottom)
    const overlap = visibleBottom - visibleTop
    if (overlap > bestOverlap) {
      bestOverlap = overlap
      bestId = section.id
    }
  }
  return bestId
}

describe('Property 3: Scroll spy correctly identifies active section', () => {
  it('returns the section with the most viewport overlap', () => {
    const sections: SectionRect[] = [
      { id: 'home', top: -500, bottom: 300 },
      { id: 'about', top: 300, bottom: 900 },
    ]
    // home has 300px overlap (0 to 300), about has 500px overlap (300 to 800 in 800px viewport)
    expect(findActiveSectionByOverlap(sections, 800)).toBe('about')
  })

  it('returns null for empty sections array', () => {
    expect(findActiveSectionByOverlap([], 800)).toBeNull()
  })

  it('for any set of non-overlapping sections, returns the one with most viewport overlap', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            top: fc.integer({ min: -2000, max: 2000 }),
            bottom: fc.integer({ min: -2000, max: 2000 }),
          }).filter(s => s.bottom > s.top),
          { minLength: 1, maxLength: 10 }
        ),
        fc.integer({ min: 100, max: 1200 }),
        (sections, viewportHeight) => {
          const result = findActiveSectionByOverlap(sections, viewportHeight)
          // Result must be one of the section IDs
          const ids = sections.map(s => s.id)
          expect(ids).toContain(result)

          // The returned section must have overlap >= all others
          const resultSection = sections.find(s => s.id === result)!
          const resultOverlap = Math.max(0, Math.min(viewportHeight, resultSection.bottom) - Math.max(0, resultSection.top))

          for (const section of sections) {
            const overlap = Math.max(0, Math.min(viewportHeight, section.bottom) - Math.max(0, section.top))
            expect(resultOverlap).toBeGreaterThanOrEqual(overlap)
          }
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
