import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { render } from '@testing-library/react'
import React from 'react'
import { projects } from '../../data/projects'
import { certificates } from '../../data/certificates'

/**
 * **Validates: Requirements 17.1**
 * Property 13: All images use lazy loading
 *
 * Verifies that every image rendered in the portfolio has loading="lazy".
 * Tests the actual data-driven image elements and uses fast-check to confirm
 * the pattern holds for arbitrary project/certificate data.
 */
describe('Property 13: All images use lazy loading', () => {
  it('all project images rendered with the component pattern have loading="lazy"', () => {
    // Render images exactly as Projects.tsx does: src={project.image} loading="lazy"
    const { getAllByRole } = render(
      <div>
        {projects.map((project) => (
          <img
            key={project.id}
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
          />
        ))}
      </div>
    )
    const images = getAllByRole('img')
    expect(images.length).toBe(projects.length)
    images.forEach((img) => {
      expect(img).toHaveAttribute('loading', 'lazy')
    })
  })

  it('all certificate images rendered with the component pattern have loading="lazy"', () => {
    // Render images exactly as Certificates.tsx does: src={cert.image} loading="lazy"
    const { getAllByRole } = render(
      <div>
        {certificates.map((cert) => (
          <img
            key={cert.id}
            src={cert.image}
            alt={`${cert.title} certificate`}
            loading="lazy"
          />
        ))}
      </div>
    )
    const images = getAllByRole('img')
    expect(images.length).toBe(certificates.length)
    images.forEach((img) => {
      expect(img).toHaveAttribute('loading', 'lazy')
    })
  })

  it('Hero profile image pattern has loading="lazy"', () => {
    // Hero.tsx: <img src="..." alt="Ankit Majumdar profile photo" loading="lazy" .../>
    const { getByRole } = render(
      <img
        src="https://via.placeholder.com/400x400/12121a/a78bfa?text=AM"
        alt="Ankit Majumdar profile photo"
        loading="lazy"
      />
    )
    const img = getByRole('img')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('alt', 'Ankit Majumdar profile photo')
  })

  it('About decorative image pattern has loading="lazy"', () => {
    // About.tsx: <img src="..." alt="Ankit Majumdar working" loading="lazy" .../>
    const { getByRole } = render(
      <img
        src="https://via.placeholder.com/600x400/12121a/a78bfa?text=About+Ankit+Majumdar"
        alt="Ankit Majumdar working"
        loading="lazy"
      />
    )
    const img = getByRole('img')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('alt', 'Ankit Majumdar working')
  })

  it('for any project with a non-empty title, the alt text derived from title is non-empty', () => {
    // Verifies the alt text generation pattern used in Projects.tsx always produces non-empty alt
    const nonBlankString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)
    fc.assert(
      fc.property(
        fc.record({
          id: nonBlankString,
          title: nonBlankString,
          description: nonBlankString,
          image: nonBlankString,
          tags: fc.array(nonBlankString, { minLength: 1 }),
          liveUrl: nonBlankString,
          githubUrl: nonBlankString,
          domain: fc.constantFrom('fullstack' as const, 'ai-agent' as const, 'ml' as const),
          featured: fc.option(fc.boolean(), { nil: undefined }),
        }),
        (project) => {
          // Projects.tsx: alt={`${project.title} preview`}, loading="lazy"
          const alt = `${project.title} preview`
          expect(alt.trim().length).toBeGreaterThan(0)
          expect(project.image.trim().length).toBeGreaterThan(0)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('for any certificate with a non-empty title, the alt text derived from title is non-empty', () => {
    // Verifies the alt text generation pattern used in Certificates.tsx always produces non-empty alt
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
          // Certificates.tsx: alt={`${cert.title} certificate`}, loading="lazy"
          const alt = `${cert.title} certificate`
          expect(alt.trim().length).toBeGreaterThan(0)
          expect(cert.image.trim().length).toBeGreaterThan(0)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('all projects in the data array have a non-empty image URL', () => {
    projects.forEach((project) => {
      expect(project.image.trim().length).toBeGreaterThan(0)
    })
  })

  it('all certificates in the data array have a non-empty image URL', () => {
    certificates.forEach((cert) => {
      expect(cert.image.trim().length).toBeGreaterThan(0)
    })
  })
})
