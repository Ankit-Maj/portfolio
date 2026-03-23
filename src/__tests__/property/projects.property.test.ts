import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { projects, type Project } from '../../data/projects'

// Feature: personal-portfolio, Property 7: Projects data spans all three required domains
describe('Property 7: Projects data spans all three required domains', () => {
  it('actual projects array contains all three domains', () => {
    const domains = projects.map((p) => p.domain)
    expect(domains).toContain('fullstack')
    expect(domains).toContain('ai-agent')
    expect(domains).toContain('ml')
  })

  it('any valid projects array with all three domains satisfies the property', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.record({
            id: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            description: fc.string({ minLength: 1 }),
            image: fc.string(),
            tags: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
            liveUrl: fc.string(),
            githubUrl: fc.string(),
            domain: fc.constant('fullstack' as const),
          }),
          fc.record({
            id: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            description: fc.string({ minLength: 1 }),
            image: fc.string(),
            tags: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
            liveUrl: fc.string(),
            githubUrl: fc.string(),
            domain: fc.constant('ai-agent' as const),
          }),
          fc.record({
            id: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            description: fc.string({ minLength: 1 }),
            image: fc.string(),
            tags: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
            liveUrl: fc.string(),
            githubUrl: fc.string(),
            domain: fc.constant('ml' as const),
          })
        ),
        ([p1, p2, p3]: [Project, Project, Project]) => {
          const arr = [p1, p2, p3]
          const domains = arr.map((p) => p.domain)
          expect(domains).toContain('fullstack')
          expect(domains).toContain('ai-agent')
          expect(domains).toContain('ml')
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
