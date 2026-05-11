<script setup lang="ts">
const { lang, t } = useLang()
const origin = useRequestURL().origin

useSeoMeta({
  title: 'Kalendarz dostępności — Dolina Harmonii',
  description: 'Sprawdź dostępność pokoi w Dużym Domu i okna wolne pod wynajem całej doliny w sezonie 2026.',
  ogTitle: 'Kalendarz dostępności — Dolina Harmonii',
  ogDescription: 'Sprawdź dostępność pokoi w Dużym Domu i okna wolne pod wynajem całej doliny w sezonie 2026.',
  ogUrl: `${origin}/kalendarz`,
  ogImage: `${origin}/kopaniec.avif`,
  twitterCard: 'summary_large_image',
})

// ─── DATA ──────────────────────────────────────────────────────────────────
type Mode = 'individual' | 'group'

interface Workshop {
  id: string
  slug: string
  name_pl: string
  name_en: string
  startISO: string
  endISO: string
  cat_pl: string
  cat_en: string
  spots: number
  taken: number
  price: string
  instr: string
  img: string
}

interface GroupRental {
  id: string
  name_pl: string
  name_en: string
  startISO: string
  endISO: string
  type_pl: string
  type_en: string
}

const WORKSHOPS: Workshop[] = [
  { id: 'mindful-natura', slug: 'mindfulness-w-naturze',  name_pl: 'Mindfulness w naturze',   name_en: 'Mindfulness in Nature',  startISO: '2026-05-08', endISO: '2026-05-10', cat_pl: 'Mindfulness', cat_en: 'Mindfulness', spots: 12, taken: 8,  price: '1 480 zł', instr: 'Joanna Lis',       img: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=400&q=80' },
  { id: 'forest-bathing', slug: 'forest-bathing',         name_pl: 'Forest bathing',          name_en: 'Forest Bathing',         startISO: '2026-05-24', endISO: '2026-05-25', cat_pl: 'Natura',      cat_en: 'Nature',      spots: 14, taken: 0,  price: '680 zł',   instr: 'Tomasz Bór',       img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
  { id: 'cisza',          slug: 'cisza-i-medytacja',      name_pl: 'Cisza i medytacja',       name_en: 'Silence & Meditation',   startISO: '2026-06-12', endISO: '2026-06-16', cat_pl: 'Mindfulness', cat_en: 'Mindfulness', spots: 10, taken: 4,  price: '2 200 zł', instr: 'Marek Wojciech',   img: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&w=400&q=80' },
  { id: 'pol-odosob',     slug: 'letnie-polodosobnienie', name_pl: 'Letnie półodosobnienie',  name_en: 'Summer Half-Retreat',    startISO: '2026-07-05', endISO: '2026-07-11', cat_pl: 'Mindfulness', cat_en: 'Mindfulness', spots: 14, taken: 5,  price: '2 600 zł', instr: 'Marek Wojciech',   img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80' },
  { id: 'rzezba',         slug: 'rzezba-w-drewnie',       name_pl: 'Rzeźba w drewnie',        name_en: 'Wood Carving',           startISO: '2026-08-07', endISO: '2026-08-09', cat_pl: 'Drewno',      cat_en: 'Wood',        spots: 8,  taken: 7,  price: '1 380 zł', instr: 'Anna Mróz',        img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80' },
  { id: 'ziola',          slug: 'ziola-i-ogrod',          name_pl: 'Zioła i ogród',           name_en: 'Herbs & Garden',         startISO: '2026-08-20', endISO: '2026-08-23', cat_pl: 'Ogród',       cat_en: 'Garden',      spots: 12, taken: 8,  price: '1 680 zł', instr: 'Ewa Jagoda',       img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&q=80' },
  { id: 'pisanie',        slug: 'pisanie-z-natury',       name_pl: 'Pisanie z natury',        name_en: 'Writing from Nature',    startISO: '2026-09-11', endISO: '2026-09-13', cat_pl: 'Natura',      cat_en: 'Nature',      spots: 12, taken: 3,  price: '1 100 zł', instr: 'Hanna Sosnowska',  img: 'https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=400&q=80' },
  { id: 'kregi',          slug: 'krag-jogi-kobiecej',     name_pl: 'Krąg jogi kobiecej',      name_en: "Women's Yoga Circle",    startISO: '2026-09-25', endISO: '2026-09-27', cat_pl: 'Joga',        cat_en: 'Yoga',        spots: 10, taken: 6,  price: '1 200 zł', instr: 'Joanna Lis',       img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
  { id: 'joga-sauna',     slug: 'joga-i-sauna',           name_pl: 'Joga i sauna',            name_en: 'Yoga & Sauna',           startISO: '2026-10-18', endISO: '2026-10-20', cat_pl: 'Joga',        cat_en: 'Yoga',        spots: 12, taken: 12, price: '980 zł',   instr: 'Ewa Jagoda',       img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=400&q=80' },
]

const GROUP_RENTALS: GroupRental[] = [
  { id: 'g1', name_pl: 'Joga z Wrocławia · grupa zamknięta', name_en: 'Yoga from Wrocław · closed group', startISO: '2026-05-16', endISO: '2026-05-19', type_pl: 'Wynajem całości', type_en: 'Whole-property rental' },
  { id: 'g2', name_pl: 'Spotkanie rodzinne · 18 osób',       name_en: 'Family gathering · 18 guests',     startISO: '2026-06-26', endISO: '2026-06-28', type_pl: 'Wynajem całości', type_en: 'Whole-property rental' },
  { id: 'g3', name_pl: 'Korporacyjny offsite',                name_en: 'Corporate offsite',                startISO: '2026-07-22', endISO: '2026-07-26', type_pl: 'Wynajem całości', type_en: 'Whole-property rental' },
  { id: 'g4', name_pl: 'Chór kameralny · zjazd',              name_en: 'Chamber choir · gathering',        startISO: '2026-09-04', endISO: '2026-09-07', type_pl: 'Wynajem całości', type_en: 'Whole-property rental' },
]

// Real rooms from the Duży Dom page
const ROOMS = [
  { id: 'sloneczny', name: 'Słoneczny', capacity: 3 },
  { id: 'lesny',     name: 'Leśny',     capacity: 2 },
  { id: 'kwiecisty', name: 'Kwiecisty', capacity: 3 },
  { id: 'etniczny',  name: 'Etniczny',  capacity: 2 },
  { id: 'magiczny',  name: 'Magiczny',  capacity: 6 },
]
const ROOM_COUNT = ROOMS.length

const MONTHS_PL = ['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień']
const MONTHS_PL_GEN = ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia']
const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEKDAYS_FULL_PL = ['poniedziałek','wtorek','środa','czwartek','piątek','sobota','niedziela']
const WEEKDAYS_FULL_EN = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const WEEKDAYS_SHORT_PL = ['Pn','Wt','Śr','Cz','Pt','So','Nd']
const WEEKDAYS_SHORT_EN = ['Mo','Tu','We','Th','Fr','Sa','Su']

const SEASON_MONTHS = [
  { year: 2026, month: 4,  label_pl: 'Maj',          label_en: 'May',       short_pl: 'Maj',  short_en: 'May' },
  { year: 2026, month: 5,  label_pl: 'Czerwiec',     label_en: 'June',      short_pl: 'Cze',  short_en: 'Jun' },
  { year: 2026, month: 6,  label_pl: 'Lipiec',       label_en: 'July',      short_pl: 'Lip',  short_en: 'Jul' },
  { year: 2026, month: 7,  label_pl: 'Sierpień',     label_en: 'August',    short_pl: 'Sie',  short_en: 'Aug' },
  { year: 2026, month: 8,  label_pl: 'Wrzesień',     label_en: 'September', short_pl: 'Wrz',  short_en: 'Sep' },
  { year: 2026, month: 9,  label_pl: 'Październik',  label_en: 'October',   short_pl: 'Paź',  short_en: 'Oct' },
]

// ─── HELPERS ───────────────────────────────────────────────────────────────
function makeToday() {
  // Use real today, but anchor inside the demo season (May–Oct 2026) if needed.
  const real = new Date()
  real.setHours(0, 0, 0, 0)
  const seasonStart = new Date(2026, 4, 1)
  return real < seasonStart ? seasonStart : real
}
const TODAY = makeToday()

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function parseISO(s: string) {
  const [y, m, d] = s.split('-').map(Number) as [number, number, number]
  return new Date(y, m - 1, d)
}
function dateInRange(d: Date, startISO: string, endISO: string) {
  const t = d.getTime()
  return t >= parseISO(startISO).getTime() && t <= parseISO(endISO).getTime()
}
function getWeekdayIdx(d: Date) {
  // Monday = 0 .. Sunday = 6
  return (d.getDay() + 6) % 7
}
function dayHash(d: Date) {
  return (d.getFullYear() * 13 + (d.getMonth() + 1) * 31 + d.getDate() * 7) % 100
}

type DayStatus = 'past' | 'workshop' | 'group-booked' | 'available' | 'partial' | 'limited' | 'full'
interface DayInfo {
  status: DayStatus
  workshop?: Workshop
  group?: GroupRental
  free?: number
  total?: number
}

function getDayStatus(d: Date, mode: Mode): DayInfo {
  if (d < TODAY) return { status: 'past' }

  const ws = WORKSHOPS.find(w => dateInRange(d, w.startISO, w.endISO))
  if (ws) return { status: 'workshop', workshop: ws }

  const gr = GROUP_RENTALS.find(g => dateInRange(d, g.startISO, g.endISO))
  if (gr) return { status: 'group-booked', group: gr }

  if (mode === 'group') {
    return { status: 'available' }
  }

  const h = dayHash(d)
  const wd = getWeekdayIdx(d)
  const weekend = wd === 4 || wd === 5
  let booked: number
  if (weekend) booked = 2 + (h % 4)
  else booked = h % 4
  const free = ROOM_COUNT - booked

  if (free <= 0) return { status: 'full', free: 0, total: ROOM_COUNT }
  if (free <= 1) return { status: 'limited', free, total: ROOM_COUNT }
  if (free <= 3) return { status: 'partial', free, total: ROOM_COUNT }
  return { status: 'available', free, total: ROOM_COUNT }
}

function getRoomOccupancyForDay(d: Date) {
  return ROOMS.map(r => {
    const h = (dayHash(d) + r.id.charCodeAt(0) * 11) % 100
    const wd = getWeekdayIdx(d)
    const weekend = wd === 4 || wd === 5
    const taken = weekend ? h > 35 : h > 65
    return { ...r, taken }
  })
}

function monthLabel(m: typeof SEASON_MONTHS[number]) {
  return lang.value === 'en' ? m.label_en : m.label_pl
}
function monthShort(m: typeof SEASON_MONTHS[number]) {
  return lang.value === 'en' ? m.short_en : m.short_pl
}
function weekdayShortList() {
  return lang.value === 'en' ? WEEKDAYS_SHORT_EN : WEEKDAYS_SHORT_PL
}
function workshopName(w: Workshop) { return lang.value === 'en' ? w.name_en : w.name_pl }
function workshopCat(w: Workshop) { return lang.value === 'en' ? w.cat_en : w.cat_pl }
function groupName(g: GroupRental) { return lang.value === 'en' ? g.name_en : g.name_pl }
function groupType(g: GroupRental) { return lang.value === 'en' ? g.type_en : g.type_pl }

function formatRangePL(s: Date, e: Date) {
  const sd = s.getDate(), ed = e.getDate()
  const sm = MONTHS_PL_GEN[s.getMonth()]
  const em = MONTHS_PL_GEN[e.getMonth()]
  if (s.getMonth() === e.getMonth()) return `${sd}—${ed} ${em}`
  return `${sd} ${sm} — ${ed} ${em}`
}
function formatRangeEN(s: Date, e: Date) {
  const sd = s.getDate(), ed = e.getDate()
  const sm = MONTHS_EN[s.getMonth()]
  const em = MONTHS_EN[e.getMonth()]
  if (s.getMonth() === e.getMonth()) return `${sd}–${ed} ${em}`
  return `${sd} ${sm} – ${ed} ${em}`
}
function formatRange(s: Date, e: Date) {
  return lang.value === 'en' ? formatRangeEN(s, e) : formatRangePL(s, e)
}

// ─── STATE ─────────────────────────────────────────────────────────────────
const mode = ref<Mode>('individual')
const monthIdx = ref(0)
const selectedISO = ref<string | null>(null)

watch([mode, monthIdx], () => { selectedISO.value = null })

const currentMonth = computed(() => SEASON_MONTHS[monthIdx.value]!)

interface CalCell {
  date: Date | null
  info?: DayInfo
  isToday?: boolean
  selected?: boolean
  meta?: string
  isWorkshopStart?: boolean
  isGroupStart?: boolean
  key: string
}

const cells = computed<CalCell[]>(() => {
  const m = currentMonth.value
  const first = new Date(m.year, m.month, 1)
  const last = new Date(m.year, m.month + 1, 0)
  const leadingBlanks = getWeekdayIdx(first)
  const total = last.getDate()
  const out: CalCell[] = []
  for (let i = 0; i < leadingBlanks; i++) out.push({ date: null, key: `b-${i}` })
  for (let day = 1; day <= total; day++) {
    const d = new Date(m.year, m.month, day)
    const info = getDayStatus(d, mode.value)
    const dISO = iso(d)
    const isToday = dISO === iso(TODAY)
    const selected = dISO === selectedISO.value

    let meta = ''
    if (mode.value === 'individual') {
      if (info.status === 'available' || info.status === 'partial') meta = lang.value === 'en' ? `${info.free}/${ROOM_COUNT} free` : `${info.free}/${ROOM_COUNT} wolnych`
      else if (info.status === 'limited') meta = lang.value === 'en' ? `${info.free} of ${ROOM_COUNT}` : `${info.free} z ${ROOM_COUNT}`
      else if (info.status === 'full') meta = lang.value === 'en' ? 'none' : 'brak'
      else if (info.status === 'workshop') meta = lang.value === 'en' ? 'workshop' : 'warsztat'
      else if (info.status === 'group-booked') meta = lang.value === 'en' ? 'group' : 'grupa'
    } else {
      if (info.status === 'available') meta = lang.value === 'en' ? 'free' : 'wolne'
      else if (info.status === 'workshop') meta = workshopCat(info.workshop!).toLowerCase()
      else if (info.status === 'group-booked') meta = lang.value === 'en' ? 'group' : 'grupa'
    }

    out.push({
      date: d,
      info,
      isToday,
      selected,
      meta,
      isWorkshopStart: info.status === 'workshop' && info.workshop!.startISO === dISO,
      isGroupStart: info.status === 'group-booked' && info.group!.startISO === dISO,
      key: `d-${day}`,
    })
  }
  while (out.length % 7 !== 0) out.push({ date: null, key: `t-${out.length}` })
  while (out.length < 42) out.push({ date: null, key: `t-${out.length}` })
  return out
})

const selectedDate = computed(() => selectedISO.value ? parseISO(selectedISO.value) : null)
const selectedInfo = computed<DayInfo | null>(() => selectedDate.value ? getDayStatus(selectedDate.value, mode.value) : null)
const selectedRooms = computed(() => {
  if (!selectedDate.value || !selectedInfo.value) return null
  if (mode.value !== 'individual') return null
  if (!['available', 'partial', 'limited', 'full'].includes(selectedInfo.value.status)) return null
  return getRoomOccupancyForDay(selectedDate.value)
})

const selectedMonthLabel = computed(() => {
  if (!selectedDate.value) return ''
  return lang.value === 'en' ? MONTHS_EN[selectedDate.value.getMonth()] : MONTHS_PL_GEN[selectedDate.value.getMonth()]
})
const selectedDayName = computed(() => {
  if (!selectedDate.value) return ''
  const idx = getWeekdayIdx(selectedDate.value)
  return lang.value === 'en' ? WEEKDAYS_FULL_EN[idx] : WEEKDAYS_FULL_PL[idx]
})

function statusLabel(s: DayStatus) {
  const m = mode.value
  if (lang.value === 'en') {
    const map: Record<DayStatus, string> = {
      available: m === 'individual' ? 'Rooms available' : 'Valley free',
      partial: 'Partial availability',
      limited: 'Last spots',
      full: 'Fully booked',
      workshop: 'Workshop in progress',
      'group-booked': 'Group rental',
      past: 'Past date',
    }
    return map[s]
  }
  const map: Record<DayStatus, string> = {
    available: m === 'individual' ? 'Dostępne pokoje' : 'Dolina wolna',
    partial: 'Częściowa dostępność',
    limited: 'Ostatnie miejsca',
    full: 'Brak miejsc',
    workshop: 'Trwa warsztat',
    'group-booked': 'Wynajem grupy',
    past: 'Termin miniony',
  }
  return map[s]
}

// Month stats for sidebar
const monthStats = computed(() => {
  const m = currentMonth.value
  const totalDays = new Date(m.year, m.month + 1, 0).getDate()
  let workshopDays = 0, groupDays = 0, freeDays = 0
  for (let d = 1; d <= totalDays; d++) {
    const dt = new Date(m.year, m.month, d)
    if (dt < TODAY) continue
    const info = getDayStatus(dt, mode.value)
    if (info.status === 'workshop') workshopDays++
    else if (info.status === 'group-booked') groupDays++
    else freeDays++
  }
  return { workshopDays, groupDays, freeDays }
})

// Month pills: month dot if any workshop starts in that month
function monthHasWorkshop(m: typeof SEASON_MONTHS[number]) {
  return WORKSHOPS.some(w => {
    const ws = parseISO(w.startISO)
    return ws.getFullYear() === m.year && ws.getMonth() === m.month
  })
}

// Legend
const legendItems = computed(() => {
  if (mode.value === 'individual') {
    return lang.value === 'en' ? [
      { c: 'available',    ll: 'Free rooms',    ld: `4–${ROOM_COUNT} of ${ROOM_COUNT}` },
      { c: 'partial',      ll: 'Partial',       ld: `2–3 of ${ROOM_COUNT}` },
      { c: 'limited',      ll: 'Last spots',    ld: `1 of ${ROOM_COUNT}` },
      { c: 'full',         ll: 'Fully booked',  ld: `0 of ${ROOM_COUNT}` },
      { c: 'workshop',     ll: 'Workshop',      ld: 'no individual stays' },
      { c: 'group-booked', ll: 'Group rental',  ld: 'whole property' },
    ] : [
      { c: 'available',    ll: 'Wolne pokoje',     ld: `4–${ROOM_COUNT} z ${ROOM_COUNT}` },
      { c: 'partial',      ll: 'Częściowo',        ld: `2–3 z ${ROOM_COUNT}` },
      { c: 'limited',      ll: 'Ostatnie miejsca', ld: `1 z ${ROOM_COUNT}` },
      { c: 'full',         ll: 'Brak miejsc',      ld: `0 z ${ROOM_COUNT}` },
      { c: 'workshop',     ll: 'Trwa warsztat',    ld: 'brak rezerwacji indyw.' },
      { c: 'group-booked', ll: 'Wynajem grupy',    ld: 'cały obiekt' },
    ]
  }
  return lang.value === 'en' ? [
    { c: 'bookable',     ll: 'Valley free',   ld: 'min. 3 nights' },
    { c: 'workshop',     ll: 'Our workshop',  ld: 'unavailable' },
    { c: 'group-booked', ll: 'Other group',   ld: 'unavailable' },
  ] : [
    { c: 'bookable',     ll: 'Dolina wolna',  ld: 'min. 3 doby' },
    { c: 'workshop',     ll: 'Nasz warsztat', ld: 'niedostępne' },
    { c: 'group-booked', ll: 'Inna grupa',    ld: 'niedostępne' },
  ]
})

// Upcoming list (workshops + group rentals)
type UpcomingItem =
  | { kind: 'workshop'; date: Date; endDate: Date; data: Workshop }
  | { kind: 'group';    date: Date; endDate: Date; data: GroupRental }

const upcoming = computed<UpcomingItem[]>(() => {
  const items: UpcomingItem[] = []
  WORKSHOPS.forEach(w => {
    const d = parseISO(w.startISO)
    if (d >= TODAY) items.push({ kind: 'workshop', date: d, endDate: parseISO(w.endISO), data: w })
  })
  GROUP_RENTALS.forEach(g => {
    const d = parseISO(g.startISO)
    if (d >= TODAY) items.push({ kind: 'group', date: d, endDate: parseISO(g.endISO), data: g })
  })
  items.sort((a, b) => a.date.getTime() - b.date.getTime())
  return items.slice(0, 8)
})

function shortMonthGen(d: Date) {
  return lang.value === 'en' ? MONTHS_EN[d.getMonth()]!.slice(0, 3) : MONTHS_PL_GEN[d.getMonth()]!.slice(0, 3)
}

// Actions
function selectDay(c: CalCell) {
  if (!c.date || !c.info || c.info.status === 'past') return
  selectedISO.value = iso(c.date)
}
function goMonth(i: number) {
  monthIdx.value = Math.max(0, Math.min(SEASON_MONTHS.length - 1, i))
}

useScrollReveal({ threshold: 0.05, retriggerOn: [mode, monthIdx] })
</script>

<template>
  <div class="cal-page">
    <!-- ─── HERO ──────────────────────────────────────────────── -->
    <section class="cal-hero">
      <div class="container">
        <div class="row">
          <div>
            <span class="eyebrow">{{ t('Dostępność · Sezon 2026', 'Availability · Season 2026') }}</span>
            <h1>{{ t('Kalendarz', 'Calendar of') }} <em>{{ t('dostępności', 'availability') }}</em>.</h1>
          </div>
          <p class="lede">{{ t(
            'Sprawdź, kiedy w dolinie są wolne pokoje albo kiedy możesz wynająć całość pod swoje warsztaty.',
            'See when rooms are free in the valley or when you can rent the whole property for your own workshop.'
          ) }}</p>
        </div>
        <div class="stats">
          <div class="s"><div class="n"><em>{{ t('maj', 'May') }}</em>—{{ t('paź', 'Oct') }}</div><div class="l">{{ t('sezon otwarty', 'season open') }}</div></div>
          <div class="s"><div class="n">{{ WORKSHOPS.length }}</div><div class="l">{{ t('naszych warsztatów', 'our workshops') }}</div></div>
          <div class="s"><div class="n">{{ ROOM_COUNT }}</div><div class="l">{{ t('pokoi w dużym domu', 'rooms in the big house') }}</div></div>
          <div class="s"><div class="n">14</div><div class="l">{{ t('miejsc dla grupy', 'spots for a group') }}</div></div>
        </div>
      </div>
    </section>

    <section class="tight">
      <div class="container">

        <!-- ─── MODE SWITCH ─────────────────────────────────────── -->
        <div class="mode-switch reveal" role="tablist">
          <button
            role="tab"
            :aria-selected="mode === 'individual'"
            :class="{ active: mode === 'individual' }"
            @click="mode = 'individual'"
          >
            <span class="ic"><DhIcon name="hands" :size="18" :stroke="1.4" /></span>
            {{ t('Klienci indywidualni', 'Individual stays') }}
          </button>
          <button
            role="tab"
            :aria-selected="mode === 'group'"
            :class="{ active: mode === 'group', group: mode === 'group' }"
            @click="mode = 'group'"
          >
            <span class="ic"><DhIcon name="meditation" :size="18" :stroke="1.4" /></span>
            {{ t('Grupy warsztatowe', 'Workshop groups') }}
          </button>
        </div>

        <!-- ─── MODE DESCRIPTION ────────────────────────────────── -->
        <div class="mode-desc reveal" :class="{ group: mode === 'group' }">
          <div class="ic-wrap">
            <DhIcon :name="mode === 'individual' ? 'hands' : 'meditation'" :size="22" :stroke="1.4" />
          </div>
          <div class="txt">
            <h3>{{ mode === 'individual' ? t('Nocleg dla par i rodzin', 'Stays for couples and families') : t('Wynajem całej doliny', 'Rent the whole valley') }}</h3>
            <p v-if="mode === 'individual'">
              {{ t('Rezerwujesz', 'You book') }} <strong>{{ t('pojedyncze pokoje', 'single rooms') }}</strong>
              {{ t(
                ' w Dużym Domu — od jednej nocy w górę. Na zielono zaznaczyliśmy dni, w których są wolne pokoje. W trakcie warsztatów i wynajmów całościowych dolina jest zamknięta dla rezerwacji indywidualnych.',
                ' in the Big House — from one night upwards. Days with rooms available are marked in green. During workshops and whole-property rentals the valley is closed to individual stays.'
              ) }}
            </p>
            <p v-else>
              {{ t('Dla grup prowadzących', 'For groups running') }}
              <strong>{{ t('własne warsztaty, rekolekcje, treningi czy zjazdy', 'their own workshops, retreats, trainings or gatherings') }}</strong>
              {{ t(
                ' — Dom Jogi + Duży Dom + cały teren na wyłączność, min. 3 doby. Pokazujemy okna wolne od naszych własnych warsztatów i już zarezerwowanych grup.',
                ' — Yoga House + Big House + the whole property exclusively, min. 3 nights. We show windows free from our own workshops and already booked groups.'
              ) }}
            </p>
          </div>
        </div>

        <!-- ─── MONTH NAV ───────────────────────────────────────── -->
        <div class="month-nav reveal">
          <div class="pager">
            <button :disabled="monthIdx === 0" :aria-label="t('Poprzedni miesiąc', 'Previous month')" @click="goMonth(monthIdx - 1)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div class="current">{{ monthLabel(currentMonth) }} {{ currentMonth.year }}</div>
            <button :disabled="monthIdx === SEASON_MONTHS.length - 1" :aria-label="t('Następny miesiąc', 'Next month')" @click="goMonth(monthIdx + 1)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
          <div class="month-pills">
            <button
              v-for="(m, i) in SEASON_MONTHS" :key="i"
              :class="{ active: i === monthIdx }"
              @click="goMonth(i)"
            >
              {{ monthShort(m) }}
              <span v-if="monthHasWorkshop(m)" class="dot" />
            </button>
          </div>
        </div>

        <!-- ─── CALENDAR + SIDEBAR ─────────────────────────────── -->
        <div class="cal-layout">

          <!-- Calendar -->
          <div class="cal-card reveal">
            <div class="cal-weekdays">
              <div v-for="w in weekdayShortList()" :key="w">{{ w }}</div>
            </div>
            <div class="cal-grid">
              <template v-for="c in cells" :key="c.key">
                <div v-if="!c.date" class="cal-day empty" />
                <button
                  v-else
                  type="button"
                  class="cal-day"
                  :class="[
                    c.info!.status,
                    { today: c.isToday, selected: c.selected }
                  ]"
                  :disabled="c.info!.status === 'past'"
                  @click="selectDay(c)"
                >
                  <div class="num">{{ c.date.getDate() }}</div>
                  <div class="meta">{{ c.meta }}</div>
                  <div v-if="c.isWorkshopStart && c.info!.workshop" class="ws-ribbon" :title="workshopName(c.info!.workshop)">{{ workshopName(c.info!.workshop) }}</div>
                  <div v-else-if="c.isGroupStart && c.info!.group" class="ws-ribbon" :title="groupName(c.info!.group)">{{ groupName(c.info!.group) }}</div>
                </button>
              </template>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="cal-sidebar">

            <!-- Day detail -->
            <div class="side-card day-detail">
              <template v-if="!selectedDate">
                <h3>{{ t('Szczegóły dnia', 'Day details') }}</h3>
                <div class="placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="3"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <div>{{ t(
                    'Wybierz dzień w kalendarzu, aby zobaczyć dostępne pokoje, trwające warsztaty i opcje rezerwacji.',
                    'Pick a day on the calendar to see available rooms, ongoing workshops and booking options.'
                  ) }}</div>
                </div>
              </template>
              <template v-else>
                <div class="h-row">
                  <h3>{{ t('Szczegóły dnia', 'Day details') }}</h3>
                  <span class="sub">{{ mode === 'individual' ? t('nocleg', 'stay') : t('wynajem', 'rental') }}</span>
                </div>
                <div class="d-header">
                  <div class="d-date">{{ selectedDate.getDate() }}</div>
                  <div>
                    <div class="d-sub">{{ selectedMonthLabel }} {{ selectedDate.getFullYear() }}</div>
                    <div class="d-day">{{ selectedDayName }}</div>
                  </div>
                </div>
                <span class="status-badge" :class="selectedInfo!.status">
                  <span class="dot-cur" />
                  {{ statusLabel(selectedInfo!.status) }}
                </span>

                <div class="d-body">
                  <!-- WORKSHOP -->
                  <template v-if="selectedInfo!.status === 'workshop'">
                    <p>{{ t(
                      'W tym dniu trwa nasz warsztat. Dolina jest zamknięta dla pojedynczych rezerwacji noclegowych — zapraszamy, jeśli chcesz dołączyć do programu.',
                      'Our workshop is running on this day. The valley is closed to individual bookings — you are welcome to join the programme.'
                    ) }}</p>
                    <NuxtLink :to="`/warsztaty/${selectedInfo!.workshop!.slug}`" class="workshop-card">
                      <img :src="selectedInfo!.workshop!.img" alt="" loading="lazy" />
                      <div class="info">
                        <h5>{{ workshopName(selectedInfo!.workshop!) }}</h5>
                        <p>{{ workshopCat(selectedInfo!.workshop!) }} · {{ t('prow.', 'led by') }} {{ selectedInfo!.workshop!.instr }}</p>
                        <p>
                          {{ selectedInfo!.workshop!.spots - selectedInfo!.workshop!.taken }}
                          {{ t('z', 'of') }}
                          {{ selectedInfo!.workshop!.spots }}
                          {{ t('wolnych', 'free') }} ·
                          {{ selectedInfo!.workshop!.price }}
                        </p>
                      </div>
                    </NuxtLink>
                    <div class="actions">
                      <NuxtLink class="btn btn-primary" :to="`/warsztaty/${selectedInfo!.workshop!.slug}`">
                        {{ t('Zobacz warsztat', 'View workshop') }}
                        <DhIcon name="arrow" :size="12" :stroke="1.6" />
                      </NuxtLink>
                      <NuxtLink class="btn btn-secondary" to="/warsztaty">{{ t('Inne terminy', 'Other dates') }}</NuxtLink>
                    </div>
                  </template>

                  <!-- GROUP BOOKED -->
                  <template v-else-if="selectedInfo!.status === 'group-booked'">
                    <p>
                      {{ t('W tym terminie dolina jest', 'On this date the valley is') }}
                      <strong>{{ t('w całości wynajęta', 'fully rented') }}</strong>
                      {{ t(
                        ' przez grupę. Nie prowadzimy rezerwacji indywidualnych ani nie przyjmujemy innych grup.',
                        ' by a group. No individual bookings or other groups are accepted.'
                      ) }}
                    </p>
                    <div class="workshop-card group-card">
                      <div class="group-icon">
                        <DhIcon name="meditation" :size="24" :stroke="1.4" />
                      </div>
                      <div class="info">
                        <h5>{{ groupName(selectedInfo!.group!) }}</h5>
                        <p>{{ groupType(selectedInfo!.group!) }} · {{ formatRange(parseISO(selectedInfo!.group!.startISO), parseISO(selectedInfo!.group!.endISO)) }}</p>
                      </div>
                    </div>
                    <div class="actions">
                      <a class="btn btn-secondary" href="#" @click.prevent>{{ t('Sprawdź inne terminy', 'Check other dates') }}</a>
                    </div>
                  </template>

                  <!-- INDIVIDUAL: rooms grid (not full) -->
                  <template v-else-if="selectedRooms && selectedInfo!.status !== 'full'">
                    <p>
                      {{ t('Wolne pokoje w Dużym Domu:', 'Free rooms in the Big House:') }}
                      <strong>{{ selectedInfo!.free }} {{ t('z', 'of') }} {{ selectedInfo!.total }}</strong>.
                      {{ t('Cena za pokój:', 'Per room:') }}
                      <strong>{{ t('od 320 zł / doba', 'from 320 zł / night') }}</strong>
                      {{ t('(śniadanie wliczone).', '(breakfast included).') }}
                    </p>
                    <div class="rooms-grid">
                      <div
                        v-for="r in selectedRooms" :key="r.id"
                        class="room-pill"
                        :class="{ taken: r.taken }"
                      >
                        <span class="nm">{{ r.name }} <span class="cap">· {{ r.capacity }} {{ t('os.', 'pp') }}</span></span>
                        <span class="st" :class="r.taken ? 'taken' : 'free'">{{ r.taken ? t('zajęty', 'taken') : t('wolny', 'free') }}</span>
                      </div>
                    </div>
                    <div class="actions">
                      <NuxtLink class="btn btn-primary" to="/#rezerwacja">
                        {{ t('Zarezerwuj nocleg', 'Book a stay') }}
                        <DhIcon name="arrow" :size="12" :stroke="1.6" />
                      </NuxtLink>
                      <NuxtLink class="btn btn-secondary" to="/noclegi/duzy-dom">{{ t('O Dużym Domu', 'About the Big House') }}</NuxtLink>
                    </div>
                  </template>

                  <!-- FULL -->
                  <template v-else-if="selectedInfo!.status === 'full'">
                    <p>{{ t(
                      'Wszystkie pokoje są w tym dniu zajęte. Sprawdź sąsiednie terminy — okolice tygodnia mają zwykle większą dostępność.',
                      'All rooms are taken on this day. Check neighbouring dates — weekdays usually have more availability.'
                    ) }}</p>
                    <div class="actions">
                      <a class="btn btn-secondary" href="#" @click.prevent>{{ t('Pokaż wolne dni', 'Show free days') }}</a>
                    </div>
                  </template>

                  <!-- GROUP MODE: available -->
                  <template v-else-if="mode === 'group' && selectedInfo!.status === 'available'">
                    <p>
                      {{ t('Dolina jest', 'The valley is') }}
                      <strong>{{ t('otwarta do wynajmu', 'open for rental') }}</strong>
                      {{ t(
                        ' — Dom Jogi (sala 80 m²), Duży Dom (5 pokoi, 12—14 miejsc), kuchnia, sauna i cały teren. Minimum 3 doby; orientacyjnie ',
                        ' — Yoga House (80 m² hall), Big House (5 rooms, 12–14 spots), kitchen, sauna and the whole property. Minimum 3 nights; approx. '
                      ) }}
                      <strong>{{ t('od 4 800 zł / doba', 'from 4 800 zł / night') }}</strong>.
                    </p>
                    <div class="actions">
                      <NuxtLink class="btn btn-primary" to="/#rezerwacja">
                        {{ t('Zapytaj o ten termin', 'Ask about this date') }}
                        <DhIcon name="arrow" :size="12" :stroke="1.6" />
                      </NuxtLink>
                      <NuxtLink class="btn btn-secondary" to="/noclegi/duzy-dom">{{ t('O obiekcie', 'About the property') }}</NuxtLink>
                    </div>
                  </template>
                </div>
              </template>
            </div>

            <!-- Legend -->
            <div class="side-card">
              <div class="h-row">
                <h3>{{ t('Legenda', 'Legend') }}</h3>
                <span class="sub">{{ mode === 'individual' ? t('noclegi', 'stays') : t('wynajem', 'rental') }}</span>
              </div>
              <div class="legend-list">
                <div v-for="(it, i) in legendItems" :key="i" class="legend-item">
                  <div class="legend-swatch" :class="it.c" />
                  <span class="ll">{{ it.ll }}</span>
                  <span class="ld">{{ it.ld }}</span>
                </div>
              </div>
            </div>

            <!-- Month stats -->
            <div class="side-card">
              <h3>{{ monthLabel(currentMonth) }} {{ t('w skrócie', 'at a glance') }}</h3>
              <div class="month-stats">
                <div class="stat-row">
                  <span>{{ t('Dni z naszymi warsztatami', 'Days with our workshops') }}</span>
                  <strong>{{ monthStats.workshopDays }}</strong>
                </div>
                <div class="stat-row">
                  <span>{{ t('Dni wynajęte przez grupy', 'Days booked by groups') }}</span>
                  <strong>{{ monthStats.groupDays }}</strong>
                </div>
                <div class="stat-row last">
                  <span>{{ mode === 'individual' ? t('Dni z dostępnymi pokojami', 'Days with rooms available') : t('Dni wolne do wynajmu', 'Days free for rental') }}</span>
                  <strong class="hl">{{ monthStats.freeDays }}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- ─── UPCOMING ─────────────────────────────────────────── -->
        <div class="upcoming">
          <div class="upcoming-head">
            <h2>{{ t('Najbliższe terminy', 'Upcoming dates') }}</h2>
            <NuxtLink class="btn btn-secondary" to="/warsztaty">
              {{ t('Pełen kalendarz warsztatów', 'Full workshop calendar') }}
              <DhIcon name="arrow" :size="14" :stroke="1.6" />
            </NuxtLink>
          </div>
          <div class="upcoming-list">
            <template v-for="(it, i) in upcoming" :key="i">
              <NuxtLink v-if="it.kind === 'workshop'" :to="`/warsztaty/${it.data.slug}`" class="up-row">
                <div class="day-block">
                  {{ it.date.getDate() }}
                  <small>{{ shortMonthGen(it.date) }} {{ it.date.getFullYear() }}</small>
                </div>
                <div class="nm-col">
                  <div class="nm">{{ workshopName(it.data) }}</div>
                  <div class="nm-sub">{{ formatRange(it.date, it.endDate) }} · {{ t('prow.', 'led by') }} {{ it.data.instr }}</div>
                </div>
                <span class="pill workshop">
                  <DhIcon name="meditation" :size="12" :stroke="1.6" />
                  {{ t('Warsztat', 'Workshop') }} · {{ workshopCat(it.data) }}
                </span>
                <div class="price-mini">
                  {{ it.data.price }}
                  <small>
                    {{ it.data.spots - it.data.taken === 0
                       ? t('brak miejsc', 'fully booked')
                       : `${it.data.spots - it.data.taken} ${t('z', 'of')} ${it.data.spots} ${t('wolnych', 'free')}` }}
                  </small>
                </div>
                <div class="cta-mini">{{ t('Szczegóły', 'Details') }} →</div>
              </NuxtLink>
              <div v-else class="up-row static">
                <div class="day-block">
                  {{ it.date.getDate() }}
                  <small>{{ shortMonthGen(it.date) }} {{ it.date.getFullYear() }}</small>
                </div>
                <div class="nm-col">
                  <div class="nm">{{ groupName(it.data) }}</div>
                  <div class="nm-sub">{{ formatRange(it.date, it.endDate) }} · {{ groupType(it.data) }}</div>
                </div>
                <span class="pill group">
                  <DhIcon name="hands" :size="12" :stroke="1.6" />
                  {{ t('Grupa zamknięta', 'Closed group') }}
                </span>
                <div class="price-mini muted">{{ t('niedostępne', 'unavailable') }}</div>
                <div class="cta-mini muted">—</div>
              </div>
            </template>
          </div>
        </div>

        <!-- ─── CTA BAR ──────────────────────────────────────────── -->
        <div class="cta-bar">
          <div>
            <span class="eyebrow gold">{{ t('Nie znajdujesz terminu?', 'Cannot find a date?') }}</span>
            <h2>{{ t('Napisz do nas.', 'Drop us a line.') }}</h2>
            <p>{{ t(
              'Odpowiadamy w ciągu jednego dnia. Pomożemy zaplanować pobyt indywidualny, weekend dla rodziny albo własny warsztat w dolinie.',
              'We reply within a day. We will help you plan an individual stay, a family weekend or your own workshop in the valley.'
            ) }}</p>
          </div>
          <div class="actions">
            <a class="btn btn-gold" href="mailto:dolina@harmonii.pl">dolina@harmonii.pl <DhIcon name="arrow" :size="12" :stroke="1.6" /></a>
            <NuxtLink class="btn btn-glass" to="/dojazd">{{ t('Dojazd', 'Getting here') }}</NuxtLink>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
/* ─── HERO ───────────────────────────────────────────────────── */
.cal-hero {
  padding: 160px 0 64px;
  background: var(--brand-deep);
}
.cal-hero .row {
  display: flex; justify-content: space-between; align-items: end; gap: 48px;
}
.cal-hero h1 {
  font-size: clamp(40px, 4.8vw, 68px);
  font-style: italic;
  font-weight: 500;
  line-height: 1.0;
  letter-spacing: -0.02em;
  margin: 16px 0 0;
  color: var(--bg-primary);
}
.cal-hero h1 em { color: var(--cta-main); font-style: italic; }
.cal-hero .eyebrow { color: rgba(253,251,247,0.55); }
.cal-hero .lede {
  font-family: var(--serif);
  font-size: 17px;
  max-width: 380px;
  color: rgba(253,251,247,0.72);
  line-height: 1.5;
}
.cal-hero .stats {
  display: flex; gap: 56px; margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(253,251,247,0.15);
  flex-wrap: wrap;
}
.cal-hero .stats .s .n {
  font-family: var(--serif); font-size: 32px; color: var(--bg-primary);
  line-height: 1; font-weight: 500;
}
.cal-hero .stats .s .n em { color: var(--cta-main); font-style: normal; }
.cal-hero .stats .s .l {
  font-family: var(--mono); font-size: 10px; letter-spacing: .12em;
  text-transform: uppercase; color: rgba(253,251,247,0.5); margin-top: 8px;
}

/* ─── MODE SWITCH ───────────────────────────────────────────── */
.mode-switch {
  display: inline-flex;
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-pill);
  padding: 6px;
  gap: 4px;
  margin-bottom: 40px;
}
.mode-switch button {
  border: none; background: transparent; cursor: pointer;
  font-family: var(--sans); font-size: 13px; font-weight: 500;
  letter-spacing: 0.02em;
  padding: 14px 28px;
  border-radius: var(--r-pill);
  color: var(--text-muted);
  display: flex; align-items: center; gap: 10px;
  transition: all .25s ease;
}
.mode-switch button:hover { color: var(--brand-primary); }
.mode-switch button.active {
  background: var(--brand-primary);
  color: var(--bg-primary);
  box-shadow: 0 2px 8px rgba(85,107,47,0.25);
}
.mode-switch button.active.group {
  background: var(--accent-earth);
  box-shadow: 0 2px 8px rgba(107,66,38,0.25);
}
.mode-switch .ic { width: 18px; height: 18px; display: inline-flex; }

/* ─── MODE DESCRIPTION ──────────────────────────────────────── */
.mode-desc {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-left: 4px solid var(--brand-primary);
  border-radius: var(--r-md);
  padding: 24px 32px;
  margin-bottom: 40px;
  display: flex; gap: 24px; align-items: flex-start;
}
.mode-desc.group { border-left-color: var(--accent-earth); }
.mode-desc .ic-wrap {
  flex-shrink: 0;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: rgba(139,154,103,0.18);
  color: var(--brand-primary);
  display: flex; align-items: center; justify-content: center;
}
.mode-desc.group .ic-wrap {
  background: rgba(107,66,38,0.12);
  color: var(--accent-earth);
}
.mode-desc .txt h3 {
  font-family: var(--serif); font-size: 22px; font-style: italic;
  margin: 0 0 6px; color: var(--brand-deep);
}
.mode-desc .txt p {
  color: var(--text-muted); font-size: 14px; line-height: 1.6;
  max-width: 680px;
}
.mode-desc .txt p strong { color: var(--text-main); font-weight: 600; }

/* ─── MONTH NAV ─────────────────────────────────────────────── */
.month-nav {
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px; margin-bottom: 24px; flex-wrap: wrap;
}
.month-nav .pager {
  display: flex; align-items: center; gap: 16px;
}
.month-nav .pager button {
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--bg-card); color: var(--brand-primary);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .2s ease;
}
.month-nav .pager button:hover:not(:disabled) {
  background: var(--brand-primary); color: var(--bg-primary);
  border-color: var(--brand-primary);
}
.month-nav .pager button:disabled { opacity: .35; cursor: not-allowed; }
.month-nav .current {
  font-family: var(--serif); font-style: italic; font-size: 36px;
  color: var(--brand-deep); font-weight: 500; line-height: 1;
  min-width: 280px; text-align: center;
}
.month-nav .month-pills {
  display: flex; gap: 8px; flex-wrap: wrap;
}
.month-nav .month-pills button {
  border: 1px solid var(--line);
  background: transparent;
  padding: 8px 14px;
  border-radius: var(--r-pill);
  cursor: pointer;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-muted);
  transition: all .2s ease;
}
.month-nav .month-pills button:hover {
  color: var(--brand-primary); border-color: var(--brand-light);
}
.month-nav .month-pills button.active {
  background: var(--brand-primary); color: var(--bg-primary);
  border-color: var(--brand-primary);
}
.month-nav .month-pills button .dot {
  display: inline-block; width: 4px; height: 4px;
  background: var(--cta-main); border-radius: 50%;
  margin-left: 6px; vertical-align: middle;
}

/* ─── LAYOUT ────────────────────────────────────────────────── */
.cal-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  align-items: start;
}

/* ─── CALENDAR GRID ─────────────────────────────────────────── */
.cal-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
}
.cal-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}
.cal-weekdays div {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: .14em; text-transform: uppercase;
  color: var(--text-muted); text-align: center;
  padding: 8px 0;
}
.cal-weekdays div:nth-child(6),
.cal-weekdays div:nth-child(7) { color: var(--accent-earth); }

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}
.cal-day {
  aspect-ratio: 1 / 1;
  border-radius: var(--r-sm);
  border: 1.5px solid var(--line);
  background: var(--bg-primary);
  padding: 10px;
  display: flex; flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  position: relative;
  overflow: hidden;
  text-align: left;
  font-family: inherit;
  color: inherit;
}
.cal-day:hover:not(.empty):not(.past):not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--brand-primary);
  z-index: 2;
}
.cal-day .num {
  font-family: var(--serif); font-size: 22px;
  color: var(--text-main); font-weight: 500;
  line-height: 1;
}
.cal-day .meta {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: .06em; text-transform: uppercase;
  color: var(--text-muted); line-height: 1.2;
  word-break: break-word;
}
.cal-day.empty {
  background: transparent; border: none; cursor: default;
  pointer-events: none;
}
.cal-day.past {
  background: var(--bg-section);
  border-color: transparent;
  cursor: not-allowed;
  opacity: .42;
}
.cal-day.past .num { color: var(--text-muted); }

.cal-day.today { border-color: var(--cta-main); border-width: 2px; }
.cal-day.today::after {
  content: ''; position: absolute; bottom: 6px; left: 50%;
  transform: translateX(-50%);
  width: 5px; height: 5px;
  background: var(--cta-main); border-radius: 50%;
}
.cal-day.selected {
  outline: 3px solid var(--brand-deep);
  outline-offset: -3px;
  z-index: 3;
}

.cal-day.available {
  background: rgba(139,154,103,0.10);
  border-color: rgba(139,154,103,0.35);
}
.cal-day.available .num { color: var(--brand-deep); }
.cal-day.available .meta { color: var(--brand-primary); font-weight: 600; }

.cal-day.partial {
  background: rgba(217,174,86,0.12);
  border-color: rgba(217,174,86,0.40);
}
.cal-day.partial .num { color: var(--accent-earth-deep); }
.cal-day.partial .meta { color: var(--gold-muted); font-weight: 600; }

.cal-day.limited {
  background: rgba(201,123,74,0.14);
  border-color: rgba(201,123,74,0.42);
}
.cal-day.limited .num { color: var(--accent-earth-deep); }
.cal-day.limited .meta { color: #B45C2F; font-weight: 700; }

.cal-day.workshop {
  background: var(--brand-primary);
  border-color: var(--brand-deep);
}
.cal-day.workshop .num { color: var(--bg-primary); }
.cal-day.workshop .meta { color: rgba(253,251,247,0.85); font-weight: 600; }

.cal-day.group-booked {
  background: var(--accent-earth);
  border-color: var(--accent-earth-deep);
}
.cal-day.group-booked .num { color: var(--bg-primary); }
.cal-day.group-booked .meta { color: rgba(253,251,247,0.85); font-weight: 600; }

.cal-day.full {
  background: var(--text-muted);
  border-color: var(--text-main);
}
.cal-day.full .num { color: var(--bg-primary); }
.cal-day.full .meta { color: rgba(253,251,247,0.85); font-weight: 600; }

.cal-day .ws-ribbon {
  position: absolute;
  left: 4px; right: 4px;
  bottom: 6px;
  font-family: var(--sans);
  font-size: 9px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: .02em;
  color: rgba(253,251,247,0.92);
  text-transform: uppercase;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ─── SIDEBAR ───────────────────────────────────────────────── */
.cal-sidebar {
  display: flex; flex-direction: column; gap: 20px;
  position: sticky; top: 100px;
}
.side-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  padding: 28px;
  box-shadow: var(--shadow-sm);
}
.side-card h3 {
  font-family: var(--serif); font-size: 22px; font-style: italic;
  margin: 0 0 16px; color: var(--brand-deep);
}
.side-card .h-row {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
}
.side-card .h-row h3 { margin-bottom: 0; }
.side-card .h-row .sub {
  font-family: var(--mono); font-size: 10px; letter-spacing: .12em;
  text-transform: uppercase; color: var(--text-muted);
}

/* Legend */
.legend-list {
  display: flex; flex-direction: column; gap: 12px;
}
.legend-item {
  display: flex; align-items: center; gap: 14px;
  font-size: 13px; color: var(--text-main);
}
.legend-swatch {
  width: 28px; height: 28px;
  border-radius: var(--r-sm);
  border: 1.5px solid var(--line);
  flex-shrink: 0;
}
.legend-swatch.available    { background: rgba(139,154,103,0.10); border-color: rgba(139,154,103,0.35); }
.legend-swatch.partial      { background: rgba(217,174,86,0.12); border-color: rgba(217,174,86,0.40); }
.legend-swatch.limited      { background: rgba(201,123,74,0.14); border-color: rgba(201,123,74,0.42); }
.legend-swatch.workshop     { background: var(--brand-primary); border-color: var(--brand-deep); }
.legend-swatch.group-booked { background: var(--accent-earth); border-color: var(--accent-earth-deep); }
.legend-swatch.full         { background: var(--text-muted); border-color: var(--text-main); }
.legend-swatch.bookable     { background: rgba(139,154,103,0.10); border-color: rgba(139,154,103,0.35); }
.legend-item .ll { font-weight: 500; }
.legend-item .ld {
  color: var(--text-muted); font-size: 12px; margin-left: auto;
  font-family: var(--mono); letter-spacing: .04em;
}

/* Day detail */
.day-detail .placeholder {
  text-align: center; padding: 32px 16px;
  color: var(--text-muted); font-size: 13px;
}
.day-detail .placeholder svg {
  color: var(--brand-light); margin-bottom: 12px; opacity: .6;
}
.day-detail .d-header {
  display: flex; align-items: center; gap: 16px;
  margin-bottom: 20px;
}
.day-detail .d-date {
  font-family: var(--serif); font-size: 48px; line-height: 1;
  color: var(--brand-deep); font-weight: 500;
}
.day-detail .d-sub {
  font-family: var(--mono); font-size: 11px;
  letter-spacing: .14em; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 4px;
}
.day-detail .d-day {
  font-family: var(--serif); font-style: italic;
  font-size: 18px; color: var(--brand-primary);
}
.day-detail .status-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 14px;
  border-radius: var(--r-pill);
  font-size: 12px; font-weight: 600;
  margin-bottom: 16px;
}
.day-detail .status-badge .dot-cur {
  width: 8px; height: 8px; background: currentColor;
  border-radius: 50%; opacity: .7;
}
.status-badge.available    { background: rgba(139,154,103,0.18); color: var(--brand-deep); }
.status-badge.partial      { background: rgba(217,174,86,0.20); color: var(--gold-muted); }
.status-badge.limited      { background: rgba(201,123,74,0.22); color: #8C3D17; }
.status-badge.workshop     { background: var(--brand-primary); color: var(--bg-primary); }
.status-badge.group-booked { background: var(--accent-earth); color: var(--bg-primary); }
.status-badge.full         { background: var(--text-muted); color: var(--bg-primary); }

.day-detail .d-body p {
  font-size: 14px; color: var(--text-muted); line-height: 1.6;
  margin-bottom: 16px;
}
.day-detail .d-body p strong { color: var(--text-main); }
.day-detail .rooms-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 16px 0 20px;
}
.room-pill {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: var(--r-sm);
  background: var(--bg-section);
  font-size: 13px;
}
.room-pill .nm { color: var(--text-main); }
.room-pill .nm .cap { color: var(--text-muted); font-size: 11px; }
.room-pill .st {
  font-family: var(--mono); font-size: 10px; letter-spacing: .08em;
  text-transform: uppercase;
}
.room-pill .st.free { color: var(--brand-primary); font-weight: 600; }
.room-pill .st.taken { color: var(--accent-earth); opacity: .7; }
.room-pill.taken { opacity: .55; }

.day-detail .workshop-card {
  background: rgba(85,107,47,0.08);
  border: 1px solid rgba(85,107,47,0.2);
  border-radius: var(--r-sm);
  padding: 16px;
  margin: 12px 0 20px;
  display: flex; gap: 14px; align-items: center;
  text-decoration: none; color: inherit;
  transition: background .2s ease;
}
.day-detail .workshop-card:hover { background: rgba(85,107,47,0.14); }
.day-detail .workshop-card img {
  width: 56px; height: 56px; object-fit: cover;
  border-radius: var(--r-sm);
  flex-shrink: 0;
}
.day-detail .workshop-card.group-card {
  background: rgba(107,66,38,0.08);
  border-color: rgba(107,66,38,0.18);
}
.day-detail .workshop-card .group-icon {
  width: 56px; height: 56px;
  border-radius: var(--r-sm);
  background: var(--accent-earth);
  color: var(--bg-primary);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.day-detail .workshop-card .info h5 {
  font-family: var(--serif); font-size: 16px;
  color: var(--brand-deep); margin: 0 0 4px;
  font-weight: 500;
}
.day-detail .workshop-card .info p {
  font-size: 11px; color: var(--text-muted);
  font-family: var(--mono); letter-spacing: .08em;
  text-transform: uppercase; margin: 0;
}
.day-detail .actions {
  display: flex; gap: 10px; margin-top: 20px;
  padding-top: 20px; border-top: 1px solid var(--line);
  flex-wrap: wrap;
}
.day-detail .actions .btn {
  flex: 1; justify-content: center; font-size: 11px; padding: 14px 16px;
  min-width: 140px;
}

/* Month stats */
.month-stats {
  display: flex; flex-direction: column; gap: 10px; font-size: 13px;
}
.stat-row {
  display: flex; justify-content: space-between;
  padding: 8px 0; border-bottom: 1px solid var(--line);
}
.stat-row.last { border-bottom: none; }
.stat-row span { color: var(--text-muted); }
.stat-row strong.hl { color: var(--brand-primary); }

/* ─── UPCOMING ──────────────────────────────────────────────── */
.upcoming { margin-top: 80px; }
.upcoming-head {
  display: flex; justify-content: space-between; align-items: end;
  margin-bottom: 28px; gap: 16px; flex-wrap: wrap;
}
.upcoming-head h2 {
  font-style: italic; font-size: clamp(28px, 3vw, 40px);
}
.upcoming-list {
  display: flex; flex-direction: column; gap: 12px;
}
.up-row {
  display: grid;
  grid-template-columns: 90px 1fr 200px 160px 120px;
  gap: 24px; align-items: center;
  padding: 20px 24px;
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  text-decoration: none; color: inherit;
  transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
}
a.up-row:hover {
  border-color: var(--brand-primary);
  transform: translateX(3px);
  box-shadow: var(--shadow-sm);
}
.up-row.static { cursor: default; }
.up-row .day-block {
  font-family: var(--serif); font-size: 28px; line-height: 1;
  color: var(--brand-deep); font-weight: 500;
}
.up-row .day-block small {
  display: block;
  font-family: var(--mono); font-size: 10px;
  color: var(--text-muted); letter-spacing: .12em;
  text-transform: uppercase; margin-top: 6px;
}
.up-row .nm-col .nm {
  font-family: var(--serif); font-size: 20px;
  color: var(--brand-primary); margin-bottom: 4px;
}
.up-row .nm-col .nm-sub {
  font-family: var(--mono); font-size: 10px; letter-spacing: .12em;
  text-transform: uppercase; color: var(--text-muted);
}
.up-row .pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 12px;
  border-radius: var(--r-pill);
  font-size: 11px; font-weight: 600;
  letter-spacing: .04em;
}
.up-row .pill.workshop { background: rgba(85,107,47,0.15); color: var(--brand-deep); }
.up-row .pill.group    { background: rgba(107,66,38,0.15); color: var(--accent-earth-deep); }
.up-row .price-mini {
  font-family: var(--serif); font-size: 22px;
  color: var(--brand-primary); text-align: right;
}
.up-row .price-mini small {
  display: block; font-family: var(--mono); font-size: 10px;
  color: var(--text-muted); letter-spacing: .08em;
  text-transform: uppercase; margin-top: 4px;
  font-family: var(--mono);
}
.up-row .price-mini.muted {
  font-size: 14px; color: var(--text-muted);
  font-family: var(--mono); letter-spacing: .06em;
  text-transform: uppercase;
}
.up-row .cta-mini {
  text-align: right; font-family: var(--mono); font-size: 11px;
  letter-spacing: .1em; text-transform: uppercase;
  color: var(--accent-earth);
}
.up-row .cta-mini.muted { color: var(--text-muted); }

/* ─── CTA BAR ───────────────────────────────────────────────── */
.cta-bar {
  margin-top: 80px;
  background: var(--brand-deep);
  border-radius: var(--r-lg);
  padding: 56px 64px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: center;
  color: var(--bg-primary);
  position: relative;
  overflow: hidden;
}
.cta-bar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 60% at 100% 100%, rgba(85,107,47,0.45) 0%, transparent 60%);
  pointer-events: none;
}
.cta-bar h2 {
  color: var(--bg-primary);
  font-style: italic; font-size: clamp(28px, 3vw, 36px);
  margin-bottom: 8px;
  position: relative; z-index: 1;
}
.cta-bar p {
  color: rgba(253,251,247,0.75); font-size: 15px;
  max-width: 540px;
  position: relative; z-index: 1;
}
.cta-bar .eyebrow.gold { color: var(--cta-main); }
.cta-bar .actions {
  display: flex; gap: 12px; flex-shrink: 0;
  position: relative; z-index: 1;
  flex-wrap: wrap;
}

/* ─── RESPONSIVE ────────────────────────────────────────────── */
@media (max-width: 1080px) {
  .cal-layout { grid-template-columns: 1fr; }
  .cal-sidebar { position: static; }
  .month-nav { flex-wrap: wrap; }
  .up-row { grid-template-columns: 70px 1fr; }
  .up-row > *:nth-child(n+3) { display: none; }
}
@media (max-width: 720px) {
  .cal-hero { padding: 130px 0 56px; }
  .cal-hero .row { flex-direction: column; align-items: flex-start; gap: 16px; }
  .cal-hero .stats { gap: 32px; }
  .cal-card { padding: 16px; }
  .cal-day { padding: 6px; }
  .cal-day .num { font-size: 16px; }
  .cal-day .meta { font-size: 8px; }
  .cal-day .ws-ribbon { display: none; }
  .month-nav .current { font-size: 28px; min-width: auto; }
  .mode-switch { width: 100%; }
  .mode-switch button { padding: 12px 14px; font-size: 12px; flex: 1; justify-content: center; }
  .mode-desc { padding: 20px; flex-direction: column; gap: 16px; }
  .cta-bar { padding: 40px 28px; grid-template-columns: 1fr; }
  .day-detail .rooms-grid { grid-template-columns: 1fr; }
}
</style>
