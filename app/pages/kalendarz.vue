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

type Mode = 'individual' | 'group'

interface Workshop {
  id: string; slug: string
  name_pl: string; name_en: string
  cat_pl: string;  cat_en: string
  start: Date; end: Date
  spots: number; taken: number
  price: string; instr: string; img: string
}
interface GroupRental {
  id: string
  name_pl: string; name_en: string
  type_pl: string; type_en: string
  start: Date; end: Date
}

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function parseISO(s: string) {
  const [y, m, d] = s.split('-').map(Number) as [number, number, number]
  return new Date(y, m - 1, d)
}
const D = parseISO

const WORKSHOPS: Workshop[] = [
  { id: 'mindful-natura', slug: 'mindfulness-w-naturze',  name_pl: 'Mindfulness w naturze',  name_en: 'Mindfulness in Nature', cat_pl: 'Mindfulness', cat_en: 'Mindfulness', start: D('2026-05-08'), end: D('2026-05-10'), spots: 12, taken: 8,  price: '1 480 zł', instr: 'Joanna Lis',      img: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=400&q=80' },
  { id: 'forest-bathing', slug: 'forest-bathing',         name_pl: 'Forest bathing',         name_en: 'Forest Bathing',        cat_pl: 'Natura',      cat_en: 'Nature',      start: D('2026-05-24'), end: D('2026-05-25'), spots: 14, taken: 0,  price: '680 zł',   instr: 'Tomasz Bór',      img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
  { id: 'cisza',          slug: 'cisza-i-medytacja',      name_pl: 'Cisza i medytacja',      name_en: 'Silence & Meditation',  cat_pl: 'Mindfulness', cat_en: 'Mindfulness', start: D('2026-06-12'), end: D('2026-06-16'), spots: 10, taken: 4,  price: '2 200 zł', instr: 'Marek Wojciech',  img: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&w=400&q=80' },
  { id: 'pol-odosob',     slug: 'letnie-polodosobnienie', name_pl: 'Letnie półodosobnienie', name_en: 'Summer Half-Retreat',   cat_pl: 'Mindfulness', cat_en: 'Mindfulness', start: D('2026-07-05'), end: D('2026-07-11'), spots: 14, taken: 5,  price: '2 600 zł', instr: 'Marek Wojciech',  img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80' },
  { id: 'rzezba',         slug: 'rzezba-w-drewnie',       name_pl: 'Rzeźba w drewnie',       name_en: 'Wood Carving',          cat_pl: 'Drewno',      cat_en: 'Wood',        start: D('2026-08-07'), end: D('2026-08-09'), spots: 8,  taken: 7,  price: '1 380 zł', instr: 'Anna Mróz',       img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80' },
  { id: 'ziola',          slug: 'ziola-i-ogrod',          name_pl: 'Zioła i ogród',          name_en: 'Herbs & Garden',        cat_pl: 'Ogród',       cat_en: 'Garden',      start: D('2026-08-20'), end: D('2026-08-23'), spots: 12, taken: 8,  price: '1 680 zł', instr: 'Ewa Jagoda',      img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&q=80' },
  { id: 'pisanie',        slug: 'pisanie-z-natury',       name_pl: 'Pisanie z natury',       name_en: 'Writing from Nature',   cat_pl: 'Natura',      cat_en: 'Nature',      start: D('2026-09-11'), end: D('2026-09-13'), spots: 12, taken: 3,  price: '1 100 zł', instr: 'Hanna Sosnowska', img: 'https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=400&q=80' },
  { id: 'kregi',          slug: 'krag-jogi-kobiecej',     name_pl: 'Krąg jogi kobiecej',     name_en: "Women's Yoga Circle",   cat_pl: 'Joga',        cat_en: 'Yoga',        start: D('2026-09-25'), end: D('2026-09-27'), spots: 10, taken: 6,  price: '1 200 zł', instr: 'Joanna Lis',      img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
  { id: 'joga-sauna',     slug: 'joga-i-sauna',           name_pl: 'Joga i sauna',           name_en: 'Yoga & Sauna',          cat_pl: 'Joga',        cat_en: 'Yoga',        start: D('2026-10-18'), end: D('2026-10-20'), spots: 12, taken: 12, price: '980 zł',   instr: 'Ewa Jagoda',      img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=400&q=80' },
]

const GROUP_RENTALS: GroupRental[] = [
  { id: 'g1', name_pl: 'Joga z Wrocławia · grupa zamknięta', name_en: 'Yoga from Wrocław · closed group', type_pl: 'Wynajem całości', type_en: 'Whole-property rental', start: D('2026-05-16'), end: D('2026-05-19') },
  { id: 'g2', name_pl: 'Spotkanie rodzinne · 18 osób',       name_en: 'Family gathering · 18 guests',     type_pl: 'Wynajem całości', type_en: 'Whole-property rental', start: D('2026-06-26'), end: D('2026-06-28') },
  { id: 'g3', name_pl: 'Korporacyjny offsite',                name_en: 'Corporate offsite',                type_pl: 'Wynajem całości', type_en: 'Whole-property rental', start: D('2026-07-22'), end: D('2026-07-26') },
  { id: 'g4', name_pl: 'Chór kameralny · zjazd',              name_en: 'Chamber choir · gathering',        type_pl: 'Wynajem całości', type_en: 'Whole-property rental', start: D('2026-09-04'), end: D('2026-09-07') },
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

const MONTHS_PL_GEN = ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia']
const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEKDAYS_FULL_PL = ['poniedziałek','wtorek','środa','czwartek','piątek','sobota','niedziela']
const WEEKDAYS_FULL_EN = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const WEEKDAYS_SHORT_PL = ['Pn','Wt','Śr','Cz','Pt','So','Nd']
const WEEKDAYS_SHORT_EN = ['Mo','Tu','We','Th','Fr','Sa','Su']

const SEASON_MONTHS = [
  { year: 2026, month: 4, label_pl: 'Maj',         label_en: 'May',       short_pl: 'Maj', short_en: 'May' },
  { year: 2026, month: 5, label_pl: 'Czerwiec',    label_en: 'June',      short_pl: 'Cze', short_en: 'Jun' },
  { year: 2026, month: 6, label_pl: 'Lipiec',      label_en: 'July',      short_pl: 'Lip', short_en: 'Jul' },
  { year: 2026, month: 7, label_pl: 'Sierpień',    label_en: 'August',    short_pl: 'Sie', short_en: 'Aug' },
  { year: 2026, month: 8, label_pl: 'Wrzesień',    label_en: 'September', short_pl: 'Wrz', short_en: 'Sep' },
  { year: 2026, month: 9, label_pl: 'Październik', label_en: 'October',   short_pl: 'Paź', short_en: 'Oct' },
]
const WORKSHOP_MONTHS = new Set(WORKSHOPS.map(w => `${w.start.getFullYear()}-${w.start.getMonth()}`))

// Anchor inside the demo season (May–Oct 2026) so the calendar always has live cells.
function makeToday() {
  const real = new Date()
  real.setHours(0, 0, 0, 0)
  const seasonStart = new Date(2026, 4, 1)
  return real < seasonStart ? seasonStart : real
}
const TODAY = makeToday()
const TODAY_ISO = iso(TODAY)

function inRange(d: Date, start: Date, end: Date) {
  const t = d.getTime()
  return t >= start.getTime() && t <= end.getTime()
}
// Monday = 0 .. Sunday = 6
function getWeekdayIdx(d: Date) {
  return (d.getDay() + 6) % 7
}
function dayHash(d: Date) {
  return (d.getFullYear() * 13 + (d.getMonth() + 1) * 31 + d.getDate() * 7) % 100
}

type DayStatus = 'past' | 'workshop' | 'group-booked' | 'available' | 'partial' | 'limited' | 'full'
type DayInfo =
  | { status: 'past' }
  | { status: 'workshop'; workshop: Workshop }
  | { status: 'group-booked'; group: GroupRental }
  | { status: 'available' | 'partial' | 'limited' | 'full'; free: number; total: number }

function getDayStatus(d: Date, m: Mode): DayInfo {
  if (d < TODAY) return { status: 'past' }
  const ws = WORKSHOPS.find(w => inRange(d, w.start, w.end))
  if (ws) return { status: 'workshop', workshop: ws }
  const gr = GROUP_RENTALS.find(g => inRange(d, g.start, g.end))
  if (gr) return { status: 'group-booked', group: gr }
  if (m === 'group') return { status: 'available', free: ROOM_COUNT, total: ROOM_COUNT }

  const h = dayHash(d)
  const weekend = getWeekdayIdx(d) >= 4
  const booked = weekend ? 2 + (h % 4) : h % 4
  const free = Math.max(0, ROOM_COUNT - booked)
  const total = ROOM_COUNT
  if (free === 0) return { status: 'full', free, total }
  if (free === 1) return { status: 'limited', free, total }
  if (free <= 3) return { status: 'partial', free, total }
  return { status: 'available', free, total }
}

function getRoomOccupancyForDay(d: Date) {
  const weekend = getWeekdayIdx(d) >= 4
  return ROOMS.map(r => {
    const h = (dayHash(d) + r.id.charCodeAt(0) * 11) % 100
    return { ...r, taken: weekend ? h > 35 : h > 65 }
  })
}

// PL/EN field picker for objects with `<field>_pl` / `<field>_en` keys.
function pick(obj: object, field: string): string {
  return (obj as Record<string, string>)[`${field}_${lang.value}`]!
}

function formatRange(s: Date, e: Date) {
  const isEn = lang.value === 'en'
  const months = isEn ? MONTHS_EN : MONTHS_PL_GEN
  const dash = isEn ? '–' : '—'
  const sd = s.getDate(), ed = e.getDate()
  const sm = months[s.getMonth()], em = months[e.getMonth()]
  if (s.getMonth() === e.getMonth()) return `${sd}${dash}${ed} ${em}`
  return `${sd} ${sm} ${dash} ${ed} ${em}`
}
function weekdayShortList() {
  return lang.value === 'en' ? WEEKDAYS_SHORT_EN : WEEKDAYS_SHORT_PL
}

const mode = ref<Mode>('individual')
const monthIdx = ref(0)
const selectedISO = ref<string | null>(null)

watch([mode, monthIdx], () => { selectedISO.value = null })

const currentMonth = computed(() => SEASON_MONTHS[monthIdx.value]!)

interface CalCell {
  key: string
  date: Date | null
  dISO: string | null
  info: DayInfo | null
  isToday: boolean
  meta: string
}

function metaFor(info: DayInfo): string {
  if (mode.value === 'individual') {
    switch (info.status) {
      case 'available':
      case 'partial':       return t(`${info.free}/${ROOM_COUNT} wolnych`, `${info.free}/${ROOM_COUNT} free`)
      case 'limited':       return t(`${info.free} z ${ROOM_COUNT}`, `${info.free} of ${ROOM_COUNT}`)
      case 'full':          return t('brak', 'none')
      case 'workshop':
      case 'group-booked':  return t('warsztat', 'workshop')
      default:              return ''
    }
  }
  switch (info.status) {
    case 'available':     return t('wolne', 'free')
    case 'workshop':      return pick(info.workshop, 'cat').toLowerCase()
    case 'group-booked':  return t('warsztat', 'workshop')
    default:              return ''
  }
}

const blankCell = (key: string): CalCell => ({ key, date: null, dISO: null, info: null, isToday: false, meta: '' })

const cells = computed<CalCell[]>(() => {
  const m = currentMonth.value
  const leadingBlanks = getWeekdayIdx(new Date(m.year, m.month, 1))
  const totalDays = new Date(m.year, m.month + 1, 0).getDate()
  const out: CalCell[] = []
  for (let i = 0; i < leadingBlanks; i++) out.push(blankCell(`b-${i}`))
  for (let day = 1; day <= totalDays; day++) {
    const d = new Date(m.year, m.month, day)
    const info = getDayStatus(d, mode.value)
    const dISO = iso(d)
    out.push({ key: `d-${day}`, date: d, dISO, info, isToday: dISO === TODAY_ISO, meta: metaFor(info) })
  }
  while (out.length < 42) out.push(blankCell(`t-${out.length}`))
  return out
})

const selectedDate = computed(() => selectedISO.value ? parseISO(selectedISO.value) : null)
const selectedInfo = computed<DayInfo | null>(() => selectedDate.value ? getDayStatus(selectedDate.value, mode.value) : null)
const selectedWorkshop = computed(() => selectedInfo.value?.status === 'workshop' ? selectedInfo.value.workshop : null)
const selectedGroup = computed(() => selectedInfo.value?.status === 'group-booked' ? selectedInfo.value.group : null)
const selectedFree = computed(() => {
  const i = selectedInfo.value
  return i && 'free' in i ? { free: i.free, total: i.total } : null
})
const selectedRooms = computed(() => {
  const d = selectedDate.value
  if (!d || mode.value !== 'individual' || !selectedFree.value) return null
  return getRoomOccupancyForDay(d)
})

const selectedMonthLabel = computed(() => {
  const d = selectedDate.value
  return d ? (lang.value === 'en' ? MONTHS_EN : MONTHS_PL_GEN)[d.getMonth()] : ''
})
const selectedDayName = computed(() => {
  const d = selectedDate.value
  return d ? (lang.value === 'en' ? WEEKDAYS_FULL_EN : WEEKDAYS_FULL_PL)[getWeekdayIdx(d)] : ''
})

function statusLabel(s: DayStatus): string {
  const m = mode.value
  switch (s) {
    case 'available':    return m === 'individual' ? t('Dostępne pokoje', 'Rooms available') : t('Dolina wolna', 'Valley free')
    case 'partial':      return t('Częściowa dostępność', 'Partial availability')
    case 'limited':      return t('Ostatnie miejsca', 'Last spots')
    case 'full':         return t('Brak miejsc', 'Fully booked')
    case 'workshop':     return t('Trwa warsztat', 'Workshop in progress')
    case 'group-booked': return t('Wynajem grupy', 'Group rental')
    case 'past':         return t('Termin miniony', 'Past date')
  }
}

const monthStats = computed(() => {
  let workshopDays = 0, freeDays = 0
  for (const c of cells.value) {
    if (!c.info || c.info.status === 'past') continue
    if (c.info.status === 'workshop' || c.info.status === 'group-booked') workshopDays++
    else freeDays++
  }
  return { workshopDays, freeDays }
})

function monthHasWorkshop(m: typeof SEASON_MONTHS[number]) {
  return WORKSHOP_MONTHS.has(`${m.year}-${m.month}`)
}

const legendItems = computed(() => {
  if (mode.value === 'individual') {
    return [
      { c: 'available',    ll: t('Wolne pokoje',     'Free rooms'),    ld: t(`4–${ROOM_COUNT} z ${ROOM_COUNT}`,     `4–${ROOM_COUNT} of ${ROOM_COUNT}`) },
      { c: 'partial',      ll: t('Częściowo',        'Partial'),       ld: t(`2–3 z ${ROOM_COUNT}`,                 `2–3 of ${ROOM_COUNT}`) },
      { c: 'limited',      ll: t('Ostatnie miejsca', 'Last spots'),    ld: t(`1 z ${ROOM_COUNT}`,                   `1 of ${ROOM_COUNT}`) },
      { c: 'full',         ll: t('Brak miejsc',      'Fully booked'),  ld: t(`0 z ${ROOM_COUNT}`,                   `0 of ${ROOM_COUNT}`) },
      { c: 'workshop',     ll: t('Warsztat / wynajem', 'Workshop / rental'), ld: t('brak rezerwacji indyw.', 'no individual stays') },
    ]
  }
  return [
    { c: 'bookable', ll: t('Dolina wolna',        'Valley free'),        ld: t('min. 3 doby',  'min. 3 nights') },
    { c: 'workshop', ll: t('Warsztaty / grupy', 'Workshops / groups'), ld: t('niedostępne', 'unavailable') },
  ]
})

function selectDay(c: CalCell) {
  if (!c.date || !c.dISO || !c.info || c.info.status === 'past') return
  selectedISO.value = c.dISO
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
            :class="{ active: mode === 'group' }"
            @click="mode = 'group'"
          >
            <span class="ic"><DhIcon name="meditation" :size="18" :stroke="1.4" /></span>
            {{ t('Grupy warsztatowe', 'Workshop groups') }}
          </button>
        </div>

        <!-- ─── MODE DESCRIPTION ────────────────────────────────── -->
        <div class="mode-desc reveal">
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
            <div class="current">{{ pick(currentMonth, 'label') }} {{ currentMonth.year }}</div>
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
              {{ pick(m, 'short') }}
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
                    c.info?.status,
                    { today: c.isToday, selected: c.dISO === selectedISO }
                  ]"
                  :disabled="c.info?.status === 'past'"
                  @click="selectDay(c)"
                >
                  <div class="num">{{ c.date.getDate() }}</div>
                  <div class="meta">{{ c.meta }}</div>
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
                <span class="status-badge" :class="selectedInfo?.status">
                  <span class="dot-cur" />
                  {{ selectedInfo ? statusLabel(selectedInfo.status) : '' }}
                </span>

                <div class="d-body">
                  <template v-if="selectedWorkshop">
                    <p>{{ t(
                      'W tym dniu trwa nasz warsztat. Dolina jest zamknięta dla pojedynczych rezerwacji noclegowych — zapraszamy, jeśli chcesz dołączyć do programu.',
                      'Our workshop is running on this day. The valley is closed to individual bookings — you are welcome to join the programme.'
                    ) }}</p>
                    <NuxtLink :to="`/warsztaty/${selectedWorkshop.slug}`" class="workshop-card">
                      <img :src="selectedWorkshop.img" alt="" loading="lazy" />
                      <div class="info">
                        <h5>{{ pick(selectedWorkshop, 'name') }}</h5>
                        <p>{{ pick(selectedWorkshop, 'cat') }} · {{ t('prow.', 'led by') }} {{ selectedWorkshop.instr }}</p>
                        <p>
                          {{ selectedWorkshop.spots - selectedWorkshop.taken }}
                          {{ t('z', 'of') }}
                          {{ selectedWorkshop.spots }}
                          {{ t('wolnych', 'free') }} ·
                          {{ selectedWorkshop.price }}
                        </p>
                      </div>
                    </NuxtLink>
                    <div class="actions">
                      <NuxtLink class="btn btn-primary" :to="`/warsztaty/${selectedWorkshop.slug}`">
                        {{ t('Zobacz warsztat', 'View workshop') }}
                        <DhIcon name="arrow" :size="12" :stroke="1.6" />
                      </NuxtLink>
                      <NuxtLink class="btn btn-secondary" to="/warsztaty">{{ t('Inne terminy', 'Other dates') }}</NuxtLink>
                    </div>
                  </template>

                  <template v-else-if="selectedGroup">
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
                        <h5>{{ pick(selectedGroup, 'name') }}</h5>
                        <p>{{ pick(selectedGroup, 'type') }} · {{ formatRange(selectedGroup.start, selectedGroup.end) }}</p>
                      </div>
                    </div>
                    <div class="actions">
                      <a class="btn btn-secondary" href="#" @click.prevent>{{ t('Sprawdź inne terminy', 'Check other dates') }}</a>
                    </div>
                  </template>

                  <template v-else-if="selectedRooms && selectedFree && selectedInfo?.status !== 'full'">
                    <p>
                      {{ t('Wolne pokoje w Dużym Domu:', 'Free rooms in the Big House:') }}
                      <strong>{{ selectedFree.free }} {{ t('z', 'of') }} {{ selectedFree.total }}</strong>.
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

                  <template v-else-if="selectedInfo?.status === 'full'">
                    <p>{{ t(
                      'Wszystkie pokoje są w tym dniu zajęte. Sprawdź sąsiednie terminy — okolice tygodnia mają zwykle większą dostępność.',
                      'All rooms are taken on this day. Check neighbouring dates — weekdays usually have more availability.'
                    ) }}</p>
                    <div class="actions">
                      <a class="btn btn-secondary" href="#" @click.prevent>{{ t('Pokaż wolne dni', 'Show free days') }}</a>
                    </div>
                  </template>

                  <template v-else-if="mode === 'group' && selectedInfo?.status === 'available'">
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
              <h3>{{ pick(currentMonth, 'label') }} {{ t('w skrócie', 'at a glance') }}</h3>
              <div class="month-stats">
                <div class="stat-row">
                  <span>{{ t('Dni z warsztatami i grupami', 'Days with workshops / groups') }}</span>
                  <strong>{{ monthStats.workshopDays }}</strong>
                </div>
                <div class="stat-row last">
                  <span>{{ mode === 'individual' ? t('Dni z dostępnymi pokojami', 'Days with rooms available') : t('Dni wolne do wynajmu', 'Days free for rental') }}</span>
                  <strong class="hl">{{ monthStats.freeDays }}</strong>
                </div>
              </div>
            </div>

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
            <a class="btn btn-gold" href="mailto:dolinaharmonii@gmail.com">dolinaharmonii@gmail.com <DhIcon name="arrow" :size="12" :stroke="1.6" /></a>
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
.mode-desc .ic-wrap {
  flex-shrink: 0;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: rgba(139,154,103,0.18);
  color: var(--brand-primary);
  display: flex; align-items: center; justify-content: center;
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
  background: var(--brand-primary);
  border-color: var(--brand-deep);
}
.cal-day.group-booked .num { color: var(--bg-primary); }
.cal-day.group-booked .meta { color: rgba(253,251,247,0.85); font-weight: 600; }

.cal-day.full {
  background: var(--text-muted);
  border-color: var(--text-main);
}
.cal-day.full .num { color: var(--bg-primary); }
.cal-day.full .meta { color: rgba(253,251,247,0.85); font-weight: 600; }

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
.legend-swatch.group-booked { background: var(--brand-primary); border-color: var(--brand-deep); }
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
.status-badge.group-booked { background: var(--brand-primary); color: var(--bg-primary); }
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
}
@media (max-width: 720px) {
  .cal-hero { padding: 130px 0 56px; }
  .cal-hero .row { flex-direction: column; align-items: flex-start; gap: 16px; }
  .cal-hero .stats { gap: 32px; }
  .cal-card { padding: 16px; }
  .cal-day { padding: 6px; }
  .cal-day .num { font-size: 16px; }
  .cal-day .meta { font-size: 8px; }
  .month-nav .current { font-size: 28px; min-width: auto; }
  .mode-switch { width: 100%; }
  .mode-switch button { padding: 12px 14px; font-size: 12px; flex: 1; justify-content: center; }
  .mode-desc { padding: 20px; flex-direction: column; gap: 16px; }
  .cta-bar { padding: 40px 28px; grid-template-columns: 1fr; }
  .day-detail .rooms-grid { grid-template-columns: 1fr; }
}
</style>
