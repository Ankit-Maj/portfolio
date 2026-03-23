import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { projects } from '../../data/projects'

// Feature: personal-portfolio, Property 6: Every project card renders all required fields
describe('Property 6: Every project card renders all required fields', () => {
  it('every project in the projects array has all required fields', () => {
    projects.forEach((project) => {
      expect(project.title.trim().length).toBeGreaterThan(0)
      expect(project.description.trim().length).toBeGreaterThan(0)
      expect(project.tags.length).toBeGreaterThan(0)
      expect(project.liveUrl.length).toBeGreaterThan(0)
      expect(project.githubUrl.length).toBeGreaterThan(0)
      expect(['fullstack', 'ai-agent', 'ml']).toContain(project.domain)
    })
  })

  it('any valid project object has all required fields', () => {
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
          expect(project.title.trim().length).toBeGreaterThan(0)
          expect(project.description.trim().length).toBeGreaterThan(0)
          expect(project.tags.length).toBeGreaterThan(0)
          expect(project.liveUrl.trim().length).toBeGreaterThan(0)
          expect(project.githubUrl.trim().length).toBeGreaterThan(0)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
