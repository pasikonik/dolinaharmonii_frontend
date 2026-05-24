<script setup lang="ts">
import type { RoomAvailability } from '~~/types/directus'

const { lang, t } = useLang()
const { getRoomAvailability } = useDirectus()
const origin = useRequestURL().origin

useSeoMeta({
  title: 'Kalendarz dostępności — Dolina Harmonii',
  description: 'Sprawdź dostępność pokoi w Dużym Domu i okna wolne pod wynajem całej doliny w sezonie 2026.',
  ogTitle: 'Kalendarz dostępności — Dolina Harmonii',
  ogDescription: 'Sprawdź dostępność pokoi w Dużym Domu i okna wolne pod wynajem całej doliny w sezonie 2026.',
  ogUrl: `${origin}/kalendarz`,
  ogImage: `${origin}/miejsce/kopaniec.avif`,
  twitterCard: 'summary_large_image',
})

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function parseISO(s: string) {
  // Accepts "YYYY-MM-DD" or "YYYY-MM-DDThh:mm:ss"; ignores time component.
  const [date] = s.split('T') as [string]
  const [y, m, d] = date.split('-').map(Number) as [number, number, number]
  return new Date(y, m - 1, d)
}

const { data: availabilityData } = await useAsyncData(
  'room-availability',
  async () => {
    try { return await getRoomAvailability() }
    catch { return null }
  },
)
const availability = computed<RoomAvailability[]>(() => availabilityData.value?.data ?? [])

// Real rooms from the Duży Dom page
const ROOMS = [
  { id: 'sloneczny', name: 'Słoneczny', capacity: 3 },
  { id: 'lesny',     name: 'Leśny',     capacity: 2 },
  { id: 'kwiecisty', name: 'Kwiecisty', capacity: 3 },
  { id: 'etniczny',  name: 'Etniczny',  capacity: 2 },
  { id: 'magiczny',  name: 'Magiczny',  capacity: 6 },
]
const ROOM_COUNT = ROOMS.length

useHead({
  script: [{
    key: 'ld-calendar',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Dolina Harmonii — Duży Dom',
      url: `${origin}/noclegi/duzy-dom`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kopaniec 69A',
        addressLocality: 'Kopaniec',
        postalCode: '58-512',
        addressCountry: 'PL',
      },
      containsPlace: ROOMS.map(r => ({
        '@type': 'HotelRoom',
        name: `Pokój ${r.name}`,
        occupancy: {
          '@type': 'QuantitativeValue',
          maxValue: r.capacity,
        },
      })),
    }),
  }],
})

const MONTHS_PL_GEN = ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia']
const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEKDAYS_FULL_PL = ['poniedziałek','wtorek','środa','czwartek','piątek','sobota','niedziela']
const WEEKDAYS_FULL_EN = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const WEEKDAYS_SHORT_PL = ['Pn','Wt','Śr','Cz','Pt','So','Nd']
const WEEKDAYS_SHORT_EN = ['Mo','Tu','We','Th','Fr','Sa','Su']

const SEASON_MONTHS = [
  { year: 2026, month: 3,  label_pl: 'Kwiecień',    label_en: 'April',     short_pl: 'Kwi', short_en: 'Apr' },
  { year: 2026, month: 4,  label_pl: 'Maj',         label_en: 'May',       short_pl: 'Maj', short_en: 'May' },
  { year: 2026, month: 5,  label_pl: 'Czerwiec',    label_en: 'June',      short_pl: 'Cze', short_en: 'Jun' },
  { year: 2026, month: 6,  label_pl: 'Lipiec',      label_en: 'July',      short_pl: 'Lip', short_en: 'Jul' },
  { year: 2026, month: 7,  label_pl: 'Sierpień',    label_en: 'August',    short_pl: 'Sie', short_en: 'Aug' },
  { year: 2026, month: 8,  label_pl: 'Wrzesień',    label_en: 'September', short_pl: 'Wrz', short_en: 'Sep' },
  { year: 2026, month: 9,  label_pl: 'Październik', label_en: 'October',   short_pl: 'Paź', short_en: 'Oct' },
  { year: 2026, month: 10, label_pl: 'Listopad',    label_en: 'November',  short_pl: 'Lis', short_en: 'Nov' },
  { year: 2026, month: 11, label_pl: 'Grudzień',    label_en: 'December',  short_pl: 'Gru', short_en: 'Dec' },
]

// Anchor inside the season (Apr–Dec 2026) so the calendar always has live cells.
function makeToday() {
  const real = new Date()
  real.setHours(0, 0, 0, 0)
  const seasonStart = new Date(2026, 3, 1)
  return real < seasonStart ? seasonStart : real
}
const TODAY = makeToday()
const TODAY_ISO = iso(TODAY)

// Only show current month and forward within the season.
const VISIBLE_MONTHS = SEASON_MONTHS.filter(
  m => m.year > TODAY.getFullYear() || (m.year === TODAY.getFullYear() && m.month >= TODAY.getMonth()),
)

// Monday = 0 .. Sunday = 6
function getWeekdayIdx(d: Date) {
  return (d.getDay() + 6) % 7
}

// Map of day-ISO → set of blocked room ids, built from Directus records.
const blockedByDay = computed(() => {
  const map = new Map<string, Set<string>>()
  for (const rec of availability.value) {
    const start = parseISO(rec.start_date)
    const end = parseISO(rec.end_date)
    if (end < start) continue
    const cur = new Date(start)
    while (cur <= end) {
      const key = iso(cur)
      let set = map.get(key)
      if (!set) { set = new Set(); map.set(key, set) }
      set.add(rec.room)
      cur.setDate(cur.getDate() + 1)
    }
  }
  return map
})

type DayStatus = 'past' | 'available' | 'partial' | 'limited' | 'full'
interface DayInfo {
  status: DayStatus
  free: number
  total: number
  blocked: Set<string>
}

function getDayStatus(d: Date): DayInfo {
  const blocked = blockedByDay.value.get(iso(d)) ?? new Set<string>()
  const free = Math.max(0, ROOM_COUNT - blocked.size)
  const total = ROOM_COUNT
  if (d < TODAY) return { status: 'past', free, total, blocked }
  if (free === 0) return { status: 'full', free, total, blocked }
  if (free === 1) return { status: 'limited', free, total, blocked }
  if (free <= 3) return { status: 'partial', free, total, blocked }
  return { status: 'available', free, total, blocked }
}

function weekdayShortList() {
  return lang.value === 'en' ? WEEKDAYS_SHORT_EN : WEEKDAYS_SHORT_PL
}
function pickMonth(m: typeof SEASON_MONTHS[number], field: 'label' | 'short'): string {
  return (m as unknown as Record<string, string>)[`${field}_${lang.value}`]!
}

const monthIdx = ref(0)
const selectedISO = ref<string | null>(null)

watch(monthIdx, () => { selectedISO.value = null })

const currentMonth = computed(() => VISIBLE_MONTHS[monthIdx.value]!)

interface CalCell {
  key: string
  date: Date | null
  dISO: string | null
  info: DayInfo | null
  isToday: boolean
  meta: string
}

function metaFor(info: DayInfo): string {
  if (info.status === 'past') return ''
  if (info.status === 'full') return t('brak', 'none')
  return t(`${info.free}/${ROOM_COUNT} wolnych`, `${info.free}/${ROOM_COUNT} free`)
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
    const info = getDayStatus(d)
    const dISO = iso(d)
    out.push({ key: `d-${day}`, date: d, dISO, info, isToday: dISO === TODAY_ISO, meta: metaFor(info) })
  }
  while (out.length < 42) out.push(blankCell(`t-${out.length}`))
  return out
})

const selectedDate = computed(() => selectedISO.value ? parseISO(selectedISO.value) : null)
const selectedInfo = computed<DayInfo | null>(() => selectedDate.value ? getDayStatus(selectedDate.value) : null)
const selectedRooms = computed(() => {
  const info = selectedInfo.value
  if (!info) return null
  return ROOMS.map(r => ({ ...r, taken: info.blocked.has(r.id) }))
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
  switch (s) {
    case 'available': return t('Dostępne pokoje', 'Rooms available')
    case 'partial':   return t('Częściowa dostępność', 'Partial availability')
    case 'limited':   return t('Ostatnie miejsca', 'Last spots')
    case 'full':      return t('Brak miejsc', 'Fully booked')
    case 'past':      return t('Termin miniony', 'Past date')
  }
}

const monthStats = computed(() => {
  let fullDays = 0, freeDays = 0
  for (const c of cells.value) {
    if (!c.info || c.info.status === 'past') continue
    if (c.info.status === 'full') fullDays++
    else freeDays++
  }
  return { fullDays, freeDays }
})

const legendItems = computed(() => [
  { c: 'available', ll: t('Wolne pokoje',     'Free rooms'),   ld: t(`4–${ROOM_COUNT} z ${ROOM_COUNT}`, `4–${ROOM_COUNT} of ${ROOM_COUNT}`) },
  { c: 'partial',   ll: t('Częściowo',        'Partial'),      ld: t(`2–3 z ${ROOM_COUNT}`,             `2–3 of ${ROOM_COUNT}`) },
  { c: 'limited',   ll: t('Ostatnie miejsca', 'Last spots'),   ld: t(`1 z ${ROOM_COUNT}`,               `1 of ${ROOM_COUNT}`) },
  { c: 'full',      ll: t('Brak miejsc',      'Fully booked'), ld: t(`0 z ${ROOM_COUNT}`,               `0 of ${ROOM_COUNT}`) },
])

function selectDay(c: CalCell) {
  if (!c.date || !c.dISO || !c.info || c.info.status === 'past') return
  selectedISO.value = c.dISO
}
function goMonth(i: number) {
  monthIdx.value = Math.max(0, Math.min(VISIBLE_MONTHS.length - 1, i))
}

useScrollReveal({ threshold: 0.05, retriggerOn: [monthIdx] })
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
            'Sprawdź, w które dni w Dużym Domu są jeszcze wolne pokoje. Wybierz datę, aby zobaczyć, które pokoje są dostępne.',
            'See on which days the Big House still has free rooms. Pick a date to see which rooms are available.'
          ) }}</p>
        </div>
      </div>
    </section>

    <section class="tight">
      <div class="container">

        <!-- ─── MONTH NAV ───────────────────────────────────────── -->
        <div class="month-nav reveal">
          <div class="pager">
            <button :disabled="monthIdx === 0" :aria-label="t('Poprzedni miesiąc', 'Previous month')" @click="goMonth(monthIdx - 1)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div class="current">{{ pickMonth(currentMonth, 'label') }} {{ currentMonth.year }}</div>
            <button :disabled="monthIdx === VISIBLE_MONTHS.length - 1" :aria-label="t('Następny miesiąc', 'Next month')" @click="goMonth(monthIdx + 1)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
          <div class="month-pills">
            <button
              v-for="(m, i) in VISIBLE_MONTHS" :key="i"
              :class="{ active: i === monthIdx }"
              @click="goMonth(i)"
            >
              {{ pickMonth(m, 'short') }}
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
              <template v-if="!selectedDate || !selectedInfo">
                <h3>{{ t('Szczegóły dnia', 'Day details') }}</h3>
                <div class="placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="3"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <div>{{ t(
                    'Wybierz dzień w kalendarzu, aby zobaczyć dostępne pokoje.',
                    'Pick a day on the calendar to see available rooms.'
                  ) }}</div>
                </div>
              </template>
              <template v-else>
                <div class="h-row">
                  <h3>{{ t('Szczegóły dnia', 'Day details') }}</h3>
                  <span class="sub">{{ t('nocleg', 'stay') }}</span>
                </div>
                <div class="d-header">
                  <div class="d-date">{{ selectedDate.getDate() }}</div>
                  <div>
                    <div class="d-sub">{{ selectedMonthLabel }} {{ selectedDate.getFullYear() }}</div>
                    <div class="d-day">{{ selectedDayName }}</div>
                  </div>
                </div>
                <span class="status-badge" :class="selectedInfo.status">
                  <span class="dot-cur" />
                  {{ statusLabel(selectedInfo.status) }}
                </span>

                <div class="d-body">
                  <template v-if="selectedInfo.status === 'full'">
                    <p>{{ t(
                      'Wszystkie pokoje są w tym dniu zajęte. Sprawdź sąsiednie terminy — okolice tygodnia mają zwykle większą dostępność.',
                      'All rooms are taken on this day. Check neighbouring dates — weekdays usually have more availability.'
                    ) }}</p>
                  </template>
                  <template v-else>
                    <p>
                      {{ t('Wolne pokoje w Dużym Domu:', 'Free rooms in the Big House:') }}
                      <strong>{{ selectedInfo.free }} {{ t('z', 'of') }} {{ selectedInfo.total }}</strong>.
                      {{ t('Cena za pokój:', 'Per room:') }}
                      <strong>{{ t('od 320 zł / doba', 'from 320 zł / night') }}</strong>
                      {{ t('(śniadanie wliczone).', '(breakfast included).') }}
                    </p>
                  </template>

                  <div v-if="selectedRooms" class="rooms-grid">
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
                    <NuxtLink v-if="selectedInfo.status !== 'full'" class="btn btn-primary" to="/#rezerwacja">
                      {{ t('Zarezerwuj nocleg', 'Book a stay') }}
                      <DhIcon name="arrow" :size="12" :stroke="1.6" />
                    </NuxtLink>
                    <NuxtLink class="btn btn-secondary" to="/noclegi/duzy-dom">{{ t('O Dużym Domu', 'About the Big House') }}</NuxtLink>
                  </div>
                </div>
              </template>
            </div>

            <!-- Legend -->
            <div class="side-card">
              <div class="h-row">
                <h3>{{ t('Legenda', 'Legend') }}</h3>
                <span class="sub">{{ t('noclegi', 'stays') }}</span>
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
              <h3>{{ pickMonth(currentMonth, 'label') }} {{ t('w skrócie', 'at a glance') }}</h3>
              <div class="month-stats">
                <div class="stat-row">
                  <span>{{ t('Dni z dostępnymi pokojami', 'Days with rooms available') }}</span>
                  <strong class="hl">{{ monthStats.freeDays }}</strong>
                </div>
                <div class="stat-row last">
                  <span>{{ t('Dni całkowicie zajęte', 'Fully booked days') }}</span>
                  <strong>{{ monthStats.fullDays }}</strong>
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
.legend-swatch.available { background: rgba(139,154,103,0.10); border-color: rgba(139,154,103,0.35); }
.legend-swatch.partial   { background: rgba(217,174,86,0.12); border-color: rgba(217,174,86,0.40); }
.legend-swatch.limited   { background: rgba(201,123,74,0.14); border-color: rgba(201,123,74,0.42); }
.legend-swatch.full      { background: var(--text-muted); border-color: var(--text-main); }
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
.status-badge.available { background: rgba(139,154,103,0.18); color: var(--brand-deep); }
.status-badge.partial   { background: rgba(217,174,86,0.20); color: var(--gold-muted); }
.status-badge.limited   { background: rgba(201,123,74,0.22); color: #8C3D17; }
.status-badge.full      { background: var(--text-muted); color: var(--bg-primary); }

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
  .cal-card { padding: 16px; }
  .cal-day { padding: 6px; }
  .cal-day .num { font-size: 16px; }
  .cal-day .meta { font-size: 8px; }
  .month-nav .current { font-size: 28px; min-width: auto; }
  .cta-bar { padding: 40px 28px; grid-template-columns: 1fr; }
  .day-detail .rooms-grid { grid-template-columns: 1fr; }
}
</style>
