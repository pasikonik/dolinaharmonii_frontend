import { describe, expect, it } from 'vitest'
import { buildCalendarMonths, calcDuration, fmtRange } from '../app/utils/dates'

describe('buildCalendarMonths', () => {
  it('still has months after the old 2026 season ended', () => {
    const months = buildCalendarMonths(new Date(2027, 0, 5))
    expect(months).toHaveLength(12)
    expect(months[0]).toMatchObject({ year: 2027, month: 0, label_pl: 'Styczeń' })
    expect(months[11]).toMatchObject({ year: 2027, month: 11 })
  })

  it('rolls over the year', () => {
    const months = buildCalendarMonths(new Date(2026, 10, 16), 3)
    expect(months.map(m => [m.year, m.month])).toEqual([[2026, 10], [2026, 11], [2027, 0]])
  })
})

describe('date helpers', () => {
  it('counts days inclusively', () => {
    expect(calcDuration('2026-05-01', '2026-05-03', 'pl')).toBe('3 dni')
    expect(calcDuration('2026-05-01', '2026-05-01', 'en')).toBe('1 day')
  })

  it('formats a range inside one month', () => {
    expect(fmtRange('2026-05-01T10:00:00', '2026-05-03T10:00:00', 'pl')).toBe('1–3 maja')
  })
})
