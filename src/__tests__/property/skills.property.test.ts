import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { skillCategories, type SkillCategory } from '../../data/skills'

// Feature: personal-portfolio, Property 5: Skills data contains at least three categories
describe('Property 5: Skills data contains at least three categories', () => {
  it('actual skillCategories has at least 3 categories with non-empty names and skills', () => {
    expect(skillCategories.length).toBeGreaterThanOrEqual(3)
    skillCategories.forEach((cat) => {
      expect(cat.name.trim().length).toBeGreaterThan(0)
      expect(cat.skills.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('any valid SkillCategory array with 3+ entries satisfies the property', () => {
    const nonBlankString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            name: nonBlankString,
            skills: fc.array(
              fc.record({
                label: nonBlankString,
                icon: nonBlankString,
                level: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined }),
              }),
              { minLength: 1 }
            ),
          }),
          { minLength: 3 }
        ),
        (categories: SkillCategory[]) => {
          expect(categories.length).toBeGreaterThanOrEqual(3)
          categories.forEach((cat) => {
            expect(cat.name.trim().length).toBeGreaterThan(0)
            expect(cat.skills.length).toBeGreaterThanOrEqual(1)
          })
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
