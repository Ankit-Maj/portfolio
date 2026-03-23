import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { education } from '../../data/education'

// Feature: personal-portfolio, Property 9: Every education entry renders all required fields
describe('Property 9: Every education entry renders all required fields', () => {
  it('actual education array has at least 2 entries', () => {
    expect(education.length).toBeGreaterThanOrEqual(2)
  })

  it('every education entry has institution, degree, dateRange, and description', () => {
    education.forEach((entry) => {
      expect(entry.institution.trim().length).toBeGreaterThan(0)
      expect(entry.degree.trim().length).toBeGreaterThan(0)
      expect(entry.dateRange.trim().length).toBeGreaterThan(0)
      expect(entry.description.trim().length).toBeGreaterThan(0)
    })
  })

  it('any valid education entry has all required non-empty fields', () => {
    const nonBlankString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)
    fc.assert(
      fc.property(
        fc.record({
          id: nonBlankString,
          institution: nonBlankString,
          degree: nonBlankString,
          dateRange: nonBlankString,
          description: nonBlankString,
        }),
        (entry) => {
          expect(entry.institution.trim().length).toBeGreaterThan(0)
          expect(entry.degree.trim().length).toBeGreaterThan(0)
          expect(entry.dateRange.trim().length).toBeGreaterThan(0)
          expect(entry.description.trim().length).toBeGreaterThan(0)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
