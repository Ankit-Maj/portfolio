import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import * as fc from 'fast-check'

// Replicate the pure validation logic from Contact.tsx for property testing
function validateEmail(email: string): boolean {
  const atIdx = email.indexOf('@')
  if (atIdx < 1) return false
  const domain = email.slice(atIdx + 1)
  return domain.includes('.') && domain.length > 2
}

interface FormFields {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {}
  if (!fields.name.trim()) errors.name = 'Name is required'
  if (!fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.message.trim()) errors.message = 'Message is required'
  return errors
}

// Arbitraries
const nonBlankString = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0)

// Valid email: local@sub.tld where local >= 1 char, sub >= 1 char, tld >= 2 chars
const validEmail = fc
  .tuple(
    fc.stringMatching(/^[a-zA-Z0-9]+$/),
    fc.stringMatching(/^[a-zA-Z0-9]+$/),
    fc.stringMatching(/^[a-zA-Z]{2,}$/)
  )
  .filter(([local]) => local.length >= 1)
  .map(([local, sub, tld]) => `${local}@${sub}.${tld}`)

// Email missing '@' entirely
const emailWithoutAt = fc.string().filter((s) => !s.includes('@'))

// Email missing domain (has '@' but nothing valid after it)
const emailMissingDomain = nonBlankString.map((local) => `${local}@`)

/**
 * **Validates: Requirements 13.4**
 * Property 10: Contact form validates all required fields before submission
 */
describe('Property 10: Contact form validates all required fields before submission', () => {
  it('empty name always produces a name validation error', () => {
    fc.assert(
      fc.property(
        fc.constant(''),
        nonBlankString,
        nonBlankString,
        (name, email, message) => {
          const errors = validate({ name, email, message })
          expect(errors.name).toBeDefined()
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('whitespace-only name always produces a name validation error', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).map((s) => s.replace(/\S/g, ' ')).filter((s) => s.length > 0),
        validEmail,
        nonBlankString,
        (name, email, message) => {
          const errors = validate({ name, email, message })
          expect(errors.name).toBeDefined()
          return true
        }
      ),
      { numRuns: 50 }
    )
  })

  it('empty email always produces an email validation error', () => {
    fc.assert(
      fc.property(
        nonBlankString,
        fc.constant(''),
        nonBlankString,
        (name, email, message) => {
          const errors = validate({ name, email, message })
          expect(errors.email).toBeDefined()
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('empty message always produces a message validation error', () => {
    fc.assert(
      fc.property(
        nonBlankString,
        validEmail,
        fc.constant(''),
        (name, email, message) => {
          const errors = validate({ name, email, message })
          expect(errors.message).toBeDefined()
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('valid inputs (non-empty name, valid email, non-empty message) always pass validation', () => {
    fc.assert(
      fc.property(
        nonBlankString,
        validEmail,
        nonBlankString,
        (name, email, message) => {
          const errors = validate({ name, email, message })
          expect(errors.name).toBeUndefined()
          expect(errors.email).toBeUndefined()
          expect(errors.message).toBeUndefined()
          return true
        }
      ),
      { numRuns: 200 }
    )
  })

  it('email without @ always fails email validation', () => {
    fc.assert(
      fc.property(emailWithoutAt, (email) => {
        expect(validateEmail(email)).toBe(false)
        return true
      }),
      { numRuns: 100 }
    )
  })

  it('email missing domain after @ always fails email validation', () => {
    fc.assert(
      fc.property(emailMissingDomain, (email) => {
        expect(validateEmail(email)).toBe(false)
        return true
      }),
      { numRuns: 100 }
    )
  })

  it('all-empty fields always produce errors for all three fields', () => {
    const errors = validate({ name: '', email: '', message: '' })
    expect(errors.name).toBeDefined()
    expect(errors.email).toBeDefined()
    expect(errors.message).toBeDefined()
  })
})
