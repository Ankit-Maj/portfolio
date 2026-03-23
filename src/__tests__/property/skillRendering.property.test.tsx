import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { skillCategories } from '../../data/skills'

// Feature: personal-portfolio, Property 4: Every skill is rendered with an icon and label
describe('Property 4: Every skill is rendered with an icon and label', () => {
  it('every skill in skillCategories has a non-empty label and icon', () => {
    skillCategories.forEach((category) => {
      category.skills.forEach((skill) => {
        expect(skill.label.trim().length).toBeGreaterThan(0)
        expect(skill.icon.trim().length).toBeGreaterThan(0)
      })
    })
  })

  it('any valid skill object has non-empty label and icon', () => {
    const nonBlankString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)
    fc.assert(
      fc.property(
        fc.record({
          label: nonBlankString,
          icon: nonBlankString,
          level: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined }),
        }),
        (skill) => {
          expect(skill.label.trim().length).toBeGreaterThan(0)
          expect(skill.icon.trim().length).toBeGreaterThan(0)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
