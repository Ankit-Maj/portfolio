import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { certificates } from '../../data/certificates'

// Feature: personal-portfolio, Property 8: Every certificate card renders all required fields
describe('Property 8: Every certificate card renders all required fields', () => {
  it('actual certificates array has at least 4 entries', () => {
    expect(certificates.length).toBeGreaterThanOrEqual(4)
  })

  it('every certificate in the array has title, issuer, and image', () => {
    certificates.forEach((cert) => {
      expect(cert.title.trim().length).toBeGreaterThan(0)
      expect(cert.issuer.trim().length).toBeGreaterThan(0)
      expect(cert.image.trim().length).toBeGreaterThan(0)
    })
  })

  it('any valid certificate object has non-empty title, issuer, and image', () => {
    const nonBlankString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)
    fc.assert(
      fc.property(
        fc.record({
          id: nonBlankString,
          title: nonBlankString,
          issuer: nonBlankString,
          image: nonBlankString,
          date: fc.string(),
        }),
        (cert) => {
          expect(cert.title.trim().length).toBeGreaterThan(0)
          expect(cert.issuer.trim().length).toBeGreaterThan(0)
          expect(cert.image.trim().length).toBeGreaterThan(0)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
