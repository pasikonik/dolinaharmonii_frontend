import { describe, expect, it } from 'vitest'
import { parseContact } from '../server/utils/contact'
import { isRateLimited } from '../server/utils/rateLimit'

const ok = { name: 'Jan', email: 'jan@example.com', topic: 'inne', message: 'Cześć' }

describe('parseContact', () => {
  it('accepts a valid message and trims it', () => {
    expect(parseContact({ ...ok, name: '  Jan  ' })).toEqual(ok)
  })

  it('rejects a bad email', () => {
    expect(parseContact({ ...ok, email: 'nope' })).toBeNull()
  })

  it('rejects a topic that is not in the list', () => {
    expect(parseContact({ ...ok, topic: 'Kup tanie zegarki' })).toBeNull()
    expect(parseContact({ ...ok, topic: 'toString' })).toBeNull()
  })

  it('rejects non-string fields and too long messages', () => {
    expect(parseContact({ ...ok, name: { a: 1 } })).toBeNull()
    expect(parseContact({ ...ok, message: 'x'.repeat(5001) })).toBeNull()
    expect(parseContact(null)).toBeNull()
  })
})

describe('isRateLimited', () => {
  it('blocks after the limit and frees up after the window', () => {
    const t0 = 1_000_000
    for (let i = 0; i < 3; i++) expect(isRateLimited('ip-a', 3, 1000, t0 + i)).toBe(false)
    expect(isRateLimited('ip-a', 3, 1000, t0 + 10)).toBe(true)
    expect(isRateLimited('ip-b', 3, 1000, t0 + 10)).toBe(false)
    expect(isRateLimited('ip-a', 3, 1000, t0 + 5000)).toBe(false)
  })
})
