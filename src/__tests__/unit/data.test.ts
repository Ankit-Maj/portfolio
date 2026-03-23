import { describe, it, expect } from 'vitest'
import { certificates } from '../../data/certificates'
import { education } from '../../data/education'

describe('Data integrity', () => {
  it('certificates array has at least 4 entries', () => {
    expect(certificates.length).toBeGreaterThanOrEqual(4)
  })

  it('education array has at least 2 entries', () => {
    expect(education.length).toBeGreaterThanOrEqual(2)
  })
})
