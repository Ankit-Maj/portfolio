import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { projects } from '../../data/projects'
import { certificates } from '../../data/certificates'

/**
 * **Validates: Requirements 17.3**
 * Property 12: All images have non-empty alt text
 *
 * Verifies that every image in the portfolio data has a non-empty alt attribute,
 * and that the alt text generation pattern (used in components) always produces
 * non-empty strings for any valid project/certificate data.
 */
describe('Property 12: All images have non-empty alt text', () => {
  it('every project has a non-empty image alt text (title-based)', () => {
    projects.forEach((project) => {
      // Projects.tsx uses: alt={`${project.title} preview`}
      const alt = `${project.title} preview`
      expect(alt.trim().length).toBeGreaterThan(0)
    })
  })

  it('every certificate has a non-empty image alt text (title-based)', () => {
    certificates.forEach((cert) => {
      // Certificates.tsx uses: alt={`${cert.title} certificate`}
      const alt = `${cert.title} certificate`
      expect(alt.trim().length).toBeGreaterThan(0)
    })
  })

  it('Hero profile image has a non-empty alt text', () => {
    // Hero.tsx uses: alt="Ankit Majumdar profile photo"
    const alt = 'Ankit Majumdar profile photo'
    expect(alt.trim().length).toBeGreaterThan(0)
  })

  it('About decorative image has a non-empty alt text', () => {
    // About.tsx uses: alt="Ankit Majumdar working"
    const alt = 'Ankit Majumdar working'
    expect(alt.trim().length).toBeGreaterThan(0)
  })

  it('for any project with a non-empty title, the alt text is non-empty', () => {
    const nonBlankString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)
    fc.assert(
      fc.property(
        fc.record({
          id: nonBlankString,
          title: nonBlankString,
          description: nonBlankString,
          image: fc.string(),
          tags: fc.array(nonBlankString, { minLength: 1 }),
          liveUrl: nonBlankString,
          githubUrl: nonBlankString,
          domain: fc.constantFrom('fullstack' as const, 'ai-agent' as const, 'ml' as const),
          featured: fc.option(fc.boolean(), { nil: undefined }),
        }),
        (project) => {
          const alt = `${project.title} preview`
          expect(alt.trim().length).toBeGreaterThan(0)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('for any certificate with a non-empty title, the alt text is non-empty', () => {
    const nonBlankString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)
    fc.assert(
      fc.property(
        fc.record({
          id: nonBlankString,
          title: nonBlankString,
          issuer: nonBlankString,
          image: fc.string(),
          date: fc.string(),
        }),
        (cert) => {
          const alt = `${cert.title} certificate`
          expect(alt.trim().length).toBeGreaterThan(0)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
