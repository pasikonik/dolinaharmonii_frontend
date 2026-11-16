export const MONTHS_PL_GEN = ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia']
export const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December']

type Lang = 'pl' | 'en'

export function calcDuration(start: string | null | undefined, end: string | null | undefined, lang: Lang): string {
  if (!start || !end) return ''
  const days = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86_400_000) + 1
  if (lang === 'en') return days === 1 ? '1 day' : `${days} days`
  return days === 1 ? '1 dzień' : `${days} dni`
}

export function fmtRange(start: string | null | undefined, end: string | null | undefined, lang: Lang, withYear = false): string {
  if (!start) return ''
  const en = lang === 'en'
  const months = en ? MONTHS_EN : MONTHS_PL_GEN
  const s = new Date(start)
  const e = end ? new Date(end) : s
  const year = withYear ? ` ${s.getFullYear()}` : ''
  if (s.toDateString() === e.toDateString()) {
    return en ? `${months[s.getMonth()]} ${s.getDate()}${year}` : `${s.getDate()} ${months[s.getMonth()]}${year}`
  }
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return en ? `${months[s.getMonth()]} ${s.getDate()}–${e.getDate()}${year}` : `${s.getDate()}–${e.getDate()} ${months[s.getMonth()]}${year}`
  }
  return en
    ? `${months[s.getMonth()]} ${s.getDate()} – ${months[e.getMonth()]} ${e.getDate()}${year}`
    : `${s.getDate()} ${months[s.getMonth()]} – ${e.getDate()} ${months[e.getMonth()]}${year}`
}

export interface CalendarMonth {
  year: number
  month: number // 0-based
  label_pl: string
  label_en: string
  short_pl: string
  short_en: string
}

const LABELS_PL = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']
const SHORT_PL = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru']
const SHORT_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// The calendar always shows the current month and the next `count - 1` months.
export function buildCalendarMonths(from: Date, count = 12): CalendarMonth[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from.getFullYear(), from.getMonth() + i, 1)
    const m = d.getMonth()
    return {
      year: d.getFullYear(),
      month: m,
      label_pl: LABELS_PL[m]!,
      label_en: MONTHS_EN[m]!,
      short_pl: SHORT_PL[m]!,
      short_en: SHORT_EN[m]!,
    }
  })
}
