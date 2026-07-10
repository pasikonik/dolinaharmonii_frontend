<script setup lang="ts">
import type { Category, Workshop } from '~~/types/directus'

const { getWorkshops, getCategories, getImageUrl } = useDirectus()
const { lang, t } = useLang()
const origin = useRequestURL().origin

const { data, error: workshopsError } = await useAsyncData('workshops-list', () =>
  Promise.all([getWorkshops(), getCategories()]).then(([workshops, categories]) => ({ workshops, categories })),
)

const workshopsRaw = computed(() => data.value?.workshops?.data ?? [])
const categoriesRaw = computed(() => data.value?.categories?.data ?? [])

useSeoMeta({
  title: 'Warsztaty — Dolina Harmonii',
  description: 'Kameralne, kilkudniowe warsztaty w Dolinie Harmonii. Mindfulness, joga, natura, rękodzieło.',
  ogTitle: 'Warsztaty — Dolina Harmonii',
  ogDescription: 'Kameralne, kilkudniowe warsztaty w Dolinie Harmonii. Mindfulness, joga, natura, rękodzieło.',
  ogUrl: `${origin}/warsztaty`,
  ogImage: `${origin}/miejsce/kopaniec.avif`,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Warsztaty — Dolina Harmonii',
  twitterDescription: 'Kameralne, kilkudniowe warsztaty w Dolinie Harmonii.',
  twitterImage: `${origin}/miejsce/kopaniec.avif`,
})

// ─── Helpers ────────────────────────────────────────────────────────────────
const FALLBACK_IMG = '/miejsce/kopaniec.avif'

function fmt(n: number): string {
  return n.toLocaleString('pl-PL')
}

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

// Directus categories don't carry an icon — infer one from the slug/name, fallback to "leaf".
const CATEGORY_ICON_KEYWORDS: [string[], string][] = [
  [['natura', 'las', 'forest'], 'leaf'],
  [['ogrod', 'garden', 'ziol'], 'herb'],
  [['joga', 'yoga'], 'hands'],
  [['mindful', 'medytacj', 'cisza', 'silence'], 'meditation'],
  [['drewno', 'wood', 'rzezb', 'carv'], 'candle'],
  [['rekodziel', 'craft'], 'craft'],
]
function iconForCategory(cat?: Pick<Category, 'name' | 'slug'> | null): string {
  if (!cat) return 'leaf'
  const key = normalize(`${cat.slug ?? ''} ${cat.name ?? ''}`)
  for (const [keywords, icon] of CATEGORY_ICON_KEYWORDS) {
    if (keywords.some(k => key.includes(k))) return icon
  }
  return 'leaf'
}

function calcDuration(start?: string | null, end?: string | null): string {
  if (!start || !end) return ''
  const days = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86_400_000) + 1
  if (lang.value === 'en') return days === 1 ? '1 day' : `${days} days`
  return days === 1 ? '1 dzień' : `${days} dni`
}

function fmtHours(start?: string | null, end?: string | null): string {
  if (!start || !end) return ''
  const locale = lang.value === 'en' ? 'en-GB' : 'pl-PL'
  const opts: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }
  return `${new Date(start).toLocaleTimeString(locale, opts)} – ${new Date(end).toLocaleTimeString(locale, opts)}`
}

function fmtRange(start?: string | null, end?: string | null, withYear = false): string {
  if (!start) return ''
  const en = lang.value === 'en'
  const months = en
    ? ['January','February','March','April','May','June','July','August','September','October','November','December']
    : ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia']
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

// ─── Workshops normalized for display ───────────────────────────────────────
const WORKSHOPS = computed(() => workshopsRaw.value.map((w: Workshop) => {
  const cat = typeof w.category === 'object' ? w.category : null
  const instructor = Array.isArray(w.instructors) && w.instructors.length ? w.instructors[0]?.instructors_id : null
  const start = w.start_date ? new Date(w.start_date) : null
  const monthKey = start ? `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}` : ''
  const spots = typeof w.capacity === 'number' ? w.capacity : null

  return {
    id: w.id,
    slug: w.slug,
    name: w.title,
    desc: w.short_description ?? '',
    catId: cat?.slug ?? '',
    catName: cat?.name ?? '',
    icon: iconForCategory(cat),
    monthKey,
    day: start ? start.getDate() : null,
    monthShort: start ? start.toLocaleDateString(lang.value === 'en' ? 'en-GB' : 'pl-PL', { month: 'short' }) : '',
    durLabel: calcDuration(w.start_date, w.end_date),
    date: fmtRange(w.start_date, w.end_date, false),
    dateLong: fmtRange(w.start_date, w.end_date, true),
    hours: fmtHours(w.start_date, w.end_date),
    spots,
    taken: w.spots_taken ?? 0,
    instrName: instructor?.name ?? '',
    instrPhoto: instructor?.photo ? getImageUrl(instructor.photo, { width: 100, height: 100, fit: 'cover' }) : '',
    img: w.cover_image ? getImageUrl(w.cover_image, { width: 900, fit: 'cover' }) : FALLBACK_IMG,
    price: typeof w.price === 'number' ? w.price : null,
    priceLabel: typeof w.price === 'number' ? `${fmt(w.price)} zł` : '',
    startDate: w.start_date ?? null,
    isPast: (() => {
      const ref = w.end_date ?? w.start_date
      return ref ? new Date(ref).getTime() < Date.now() : false
    })(),
  }
}))

type WorkshopRow = (typeof WORKSHOPS)['value'][number]

const currentYear = new Date().getFullYear()

const CATEGORIES = computed(() => {
  const activeSlugs = new Set(
    WORKSHOPS.value
      .filter(w => w.startDate && new Date(w.startDate).getFullYear() === currentYear)
      .map(w => w.catId)
      .filter(Boolean),
  )
  return [
    { id: 'all', label: t('Wszystkie', 'All'), icon: 'compass' },
    ...categoriesRaw.value
      .filter(c => activeSlugs.has(c.slug))
      .map(c => ({ id: c.slug, label: c.name, icon: iconForCategory(c) })),
  ]
})

const MONTHS = computed(() => {
  const seen = new Map<string, Date>()
  for (const w of WORKSHOPS.value) {
    if (!w.monthKey || !w.startDate || seen.has(w.monthKey)) continue
    seen.set(w.monthKey, new Date(w.startDate))
  }
  const entries = [...seen.entries()].sort((a, b) => a[1].getTime() - b[1].getTime())
  return [
    { id: 'all', label: t('Cały rok', 'All year around') },
    ...entries.map(([key, d]) => ({
      id: key,
      label: d.toLocaleDateString(lang.value === 'en' ? 'en-GB' : 'pl-PL', { month: 'long', year: 'numeric' }),
    })),
  ]
})

function monthGroupLabel(key: string): string {
  return MONTHS.value.find(m => m.id === key)?.label ?? key
}

// ─── Hero stats ──────────────────────────────────────────────────────────────
const instructorCount = computed(() => new Set(WORKSHOPS.value.map(w => w.instrName).filter(Boolean)).size)

const capacityRange = computed(() => {
  const caps = WORKSHOPS.value.map(w => w.spots).filter((n): n is number => n !== null)
  if (!caps.length) return null
  return { min: Math.min(...caps), max: Math.max(...caps) }
})

const seasonRange = computed(() => {
  const dates = WORKSHOPS.value.map(w => w.startDate).filter((d): d is string => !!d).map(d => new Date(d))
  if (!dates.length) return null
  const locale = lang.value === 'en' ? 'en-GB' : 'pl-PL'
  const min = new Date(Math.min(...dates.map(d => d.getTime())))
  const max = new Date(Math.max(...dates.map(d => d.getTime())))
  return {
    from: min.toLocaleDateString(locale, { month: 'short' }),
    to: max.toLocaleDateString(locale, { month: 'short' }),
  }
})

// ─── Next event (featured) ───────────────────────────────────────────────────
const featured = computed(() => {
  const now = Date.now()
  const upcoming = WORKSHOPS.value.filter(w => w.startDate && new Date(w.startDate).getTime() >= now)
  const pool = upcoming.length ? upcoming : WORKSHOPS.value
  return [...pool].sort((a, b) => new Date(a.startDate ?? 0).getTime() - new Date(b.startDate ?? 0).getTime())[0] ?? null
})

// ─── JSON-LD ─────────────────────────────────────────────────────────────────
useHead({
  script: [{
    key: 'ld-workshops',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Warsztaty — Dolina Harmonii',
      description: 'Kameralne, kilkudniowe warsztaty w Dolinie Harmonii.',
      url: `${origin}/warsztaty`,
      numberOfItems: workshopsRaw.value.length,
      itemListElement: workshopsRaw.value.map((w, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Event',
          name: w.title,
          description: w.short_description,
          url: `${origin}/warsztaty/${w.slug}`,
          image: w.cover_image ? getImageUrl(w.cover_image, { width: 1200, format: 'webp' }) : `${origin}/miejsce/duzy-dom.avif`,
          startDate: w.start_date,
          endDate: w.end_date,
          location: {
            '@type': 'Place',
            name: 'Dolina Harmonii',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Kopaniec 69A',
              addressLocality: 'Kopaniec',
              postalCode: '58-512',
              addressCountry: 'PL',
            },
          },
          ...(typeof w.price === 'number' ? {
            offers: {
              '@type': 'Offer',
              price: w.price,
              priceCurrency: 'PLN',
              availability: (typeof w.capacity === 'number' && (w.spots_taken ?? 0) >= w.capacity)
                ? 'https://schema.org/SoldOut'
                : 'https://schema.org/InStock',
              url: `${origin}/warsztaty/${w.slug}`,
            },
          } : {}),
        },
      })),
    }),
  }],
})

// ─── Filter state ──────────────────────────────────────────────────────────
const cat   = ref('all')
const month = ref('all')
const view  = ref<'list'|'grid'|'calendar'>('list')
const sort  = ref('date')
const q     = ref('')

function pluralWorkshops(n: number) {
  if (lang.value === 'en') return n === 1 ? 'workshop' : 'workshops'
  if (n === 1) return 'warsztat'
  if (n >= 2 && n <= 4) return 'warsztaty'
  return 'warsztatów'
}

const filtered = computed(() => WORKSHOPS.value.filter(w => {
  if (cat.value !== 'all' && w.catId !== cat.value) return false
  if (month.value !== 'all' && w.monthKey !== month.value) return false
  if (q.value) {
    const query = q.value.toLowerCase()
    if (!w.name.toLowerCase().includes(query) && !w.desc.toLowerCase().includes(query) && !w.instrName.toLowerCase().includes(query)) return false
  }
  return true
}))

const sorted = computed(() => [...filtered.value].sort((a, b) => {
  if (sort.value === 'price-asc')  return (a.price ?? Infinity) - (b.price ?? Infinity)
  if (sort.value === 'price-desc') return (b.price ?? -Infinity) - (a.price ?? -Infinity)
  if (sort.value === 'spots') {
    const freeA = a.spots !== null ? a.spots - a.taken : Infinity
    const freeB = b.spots !== null ? b.spots - b.taken : Infinity
    return freeA - freeB
  }
  return new Date(a.startDate ?? 0).getTime() - new Date(b.startDate ?? 0).getTime()
}))

const monthGroups = computed(() =>
  sorted.value.reduce((acc, w) => {
    const list = acc[w.monthKey] ?? (acc[w.monthKey] = [])
    list.push(w)
    return acc
  }, {} as Record<string, WorkshopRow[]>)
)

const hasFilters = computed(() => cat.value !== 'all' || month.value !== 'all' || q.value !== '')
function clearAll() { cat.value = 'all'; month.value = 'all'; q.value = '' }

function availClass(w: WorkshopRow) {
  if (w.spots === null) return ''
  const free = w.spots - w.taken
  if (free <= 0) return 'full'
  if (free <= 3)  return 'low'
  return ''
}
function availLabel(w: WorkshopRow) {
  if (w.spots === null) return t('Zapytaj o dostępność', 'Ask about availability')
  const free = w.spots - w.taken
  if (lang.value === 'en') {
    if (free <= 0) return 'Fully booked'
    if (free <= 3)  return `last ${free} spots`
    return `${free} of ${w.spots} spots`
  }
  if (free <= 0) return 'Brak miejsc'
  if (free <= 3)  return `ostatnie ${free} miejsc`
  return `${free} z ${w.spots} miejsc`
}
function availWidth(w: WorkshopRow): string {
  if (w.spots === null || w.spots === 0) return '0%'
  return `${Math.min(100, (w.taken / w.spots) * 100)}%`
}

useScrollReveal({ threshold: 0.05, retriggerOn: [view, cat, month, q, sort] })
</script>

<template>
  <div class="workshops-page">
    <!-- ─── HERO ──────────────────────────────────────────────────── -->
    <section class="wks-hero">
      <div class="container">
        <div class="wks-hero-row">
          <div>
            <span class="eyebrow">{{ t('Kalendarz 2026', 'Schedule 2026') }}</span>
            <h1>{{ t('Warsztaty', 'Workshops') }} <em>{{ t('na każdy sezon', 'for every season') }}</em>.</h1>
          </div>
          <p class="lede">{{ t('Kameralne, kilkudniowe spotkania od maja do października — w rytmie tego, co dzieje się w izerskim lesie.', 'Intimate, multi-day gatherings from May to October — in tune with what is happening in the Izera forest.') }}</p>
        </div>
        <div class="wks-hero-stats">
          <div class="s"><div class="n">{{ WORKSHOPS.length }}</div><div class="l">{{ t('warsztatów w sezonie', 'workshops this season') }}</div></div>
          <div v-if="instructorCount" class="s"><div class="n">{{ instructorCount }}</div><div class="l">{{ t('stałych prowadzących', 'regular facilitators') }}</div></div>
          <div v-if="capacityRange" class="s"><div class="n">{{ capacityRange.min === capacityRange.max ? capacityRange.min : `${capacityRange.min}—${capacityRange.max}` }}</div><div class="l">{{ t('osób w grupie', 'guests per group') }}</div></div>
          <div v-if="seasonRange" class="s"><div class="n"><em>{{ seasonRange.from }}</em>—{{ seasonRange.to }}</div><div class="l">{{ t('sezon warsztatowy', 'workshop season') }}</div></div>
        </div>
      </div>
    </section>

    <section class="tight">
      <div class="container">

        <!-- ─── FEATURED ─────────────────────────────────────────── -->
        <div v-if="featured" class="feature-block reveal">
          <div class="feat-img">
            <span class="badge">
              <DhIcon name="star" :size="12" :stroke="1.6" />
              {{ t('Najbliższe wydarzenie', 'Next event') }}
            </span>
            <img :src="featured.img" :alt="featured.name" />
          </div>
          <div class="feat-body">
            <span v-if="featured.catName" class="eyebrow">{{ featured.catName }}</span>
            <h2 style="margin-top:12px">{{ featured.name }}</h2>
            <p>{{ featured.desc }}</p>
            <div class="feature-meta">
              <div><div class="fk">{{ t('Termin', 'Date') }}</div><div class="fv">{{ featured.date }}</div></div>
              <div><div class="fk">{{ t('Cena', 'Price') }}</div><div class="fv">{{ featured.priceLabel || t('Zapytaj o cenę', 'Ask for price') }}</div></div>
              <div v-if="!featured.isPast"><div class="fk">{{ t('Wolne', 'Available') }}</div><div class="fv">{{ availLabel(featured) }}</div></div>
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap">
              <NuxtLink class="btn btn-secondary" :to="`/warsztaty/${featured.slug}`">
                {{ t('Szczegóły', 'Details') }}
                <DhIcon name="arrow" :size="14" :stroke="1.6" />
              </NuxtLink>
              <NuxtLink class="btn btn-primary" to="/kalendarz">
                <DhIcon name="calendar" :size="14" :stroke="1.6" />
                {{ t('Kalendarz dostępności', 'Availability calendar') }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- ─── ERROR STATE ───────────────────────────────────────── -->
        <div v-if="workshopsError" class="workshops-notice">
          <DhIcon name="leaf" :size="32" :stroke="1.2" class="notice-icon" />
          <p class="notice-title">{{ t('Nie udało się pobrać warsztatów', 'Workshops unavailable') }}</p>
          <p class="notice-desc">{{ t('Sprawdź ponownie za chwilę lub napisz do nas bezpośrednio.', 'Please try again in a moment or contact us directly.') }}</p>
          <a href="mailto:dolinaharmonii@gmail.com" class="btn btn-secondary">dolinaharmonii@gmail.com</a>
        </div>
        <template v-else>

        <!-- ─── CONTROLS ─────────────────────────────────────────── -->
        <div class="controls-bar reveal">
          <div class="search-input" :class="{ focused: q }">
            <DhIcon name="compass" :size="18" :stroke="1.4" aria-hidden="true" />
            <input
              v-model="q"
              type="search"
              :aria-label="t('Szukaj warsztatów', 'Search workshops')"
              :placeholder="t('Szukaj po nazwie, opisie, prowadzącym…', 'Search by name, description, instructor…')"
            />
            <button v-if="q" class="clear-btn" @click="q = ''">×</button>
          </div>
          <div class="sort-select">
            <label :for="'wks-sort'" class="sort-label">{{ t('Sortuj', 'Sort') }}</label>
            <select id="wks-sort" v-model="sort">
              <option value="date">{{ t('Wg daty', 'By date') }}</option>
              <option value="price-asc">{{ t('Cena ↑', 'Price ↑') }}</option>
              <option value="price-desc">{{ t('Cena ↓', 'Price ↓') }}</option>
              <option value="spots">{{ t('Wolne miejsca', 'Available spots') }}</option>
            </select>
          </div>
          <div class="view-toggle">
            <button :class="{ active: view === 'list' }" @click="view = 'list'" :title="t('Lista', 'List')">
              <DhIcon name="list" :size="16" :stroke="1.4" />
            </button>
            <button :class="{ active: view === 'grid' }" @click="view = 'grid'" :title="t('Siatka', 'Grid')">
              <DhIcon name="grid" :size="16" :stroke="1.4" />
            </button>
            <button :class="{ active: view === 'calendar' }" @click="view = 'calendar'" :title="t('Kalendarz', 'Calendar')">
              <DhIcon name="calendar" :size="16" :stroke="1.4" />
            </button>
          </div>
        </div>

        <!-- ─── FILTERS ───────────────────────────────────────────── -->
        <div class="filter-section reveal">
          <div class="filter-row">
            <div class="label-col">{{ t('Kategoria', 'Category') }}</div>
            <div class="filter-chips">
              <button
                v-for="c in CATEGORIES" :key="c.id"
                class="filter-chip"
                :class="{ active: cat === c.id }"
                :aria-pressed="cat === c.id"
                @click="cat = c.id"
              >
                <span class="chip-ic"><DhIcon :name="c.icon" :size="16" :stroke="1.4" /></span>
                {{ c.label }}
              </button>
            </div>
          </div>
          <div class="filter-row">
            <div class="label-col">{{ t('Miesiąc', 'Month') }}</div>
            <div class="filter-chips">
              <button
                v-for="m in MONTHS" :key="m.id"
                class="filter-chip month-chip"
                :class="{ active: month === m.id }"
                :aria-pressed="month === m.id"
                @click="month = m.id"
              >
                {{ m.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- ─── RESULTS HEAD ──────────────────────────────────────── -->
        <div class="results-head">
          <div class="rcount" aria-live="polite" aria-atomic="true">
            {{ t('Znaleziono', 'Found') }} <em>{{ sorted.length }}</em> {{ pluralWorkshops(sorted.length) }}
          </div>
          <button v-if="hasFilters" class="clear-all-btn" @click="clearAll">× {{ t('Wyczyść filtry', 'Clear filters') }}</button>
        </div>

        <!-- ─── EMPTY STATE ───────────────────────────────────────── -->
        <div v-if="sorted.length === 0" class="empty">
          <h3>{{ t('Nic nie znaleziono', 'Nothing found') }}</h3>
          <p>{{ t('Spróbuj innych filtrów albo wyczyść wszystkie i przejrzyj sezon od początku.', 'Try different filters or clear all and browse the whole season.') }}</p>
          <button class="btn btn-secondary" @click="clearAll">{{ t('Wyczyść filtry', 'Clear filters') }}</button>
        </div>

        <!-- ─── LIST VIEW ─────────────────────────────────────────── -->
        <div v-else-if="view === 'list'" class="wks-list">
          <NuxtLink
            v-for="(w, i) in sorted" :key="w.id"
            :to="`/warsztaty/${w.slug}`"
            class="wks-row reveal"
            :style="{ transitionDelay: `${i * 30}ms` }"
          >
            <div class="img-wrap">
              <img :src="w.img" :alt="w.name" loading="lazy" />
              <span v-if="w.day" class="month-tag">{{ w.day }} {{ w.monthShort }}</span>
            </div>
            <div class="wks-info-col">
              <div class="wks-badges">
                <DhIcon :name="w.icon" :size="20" :stroke="1.4" class="wks-badge-ic" />
                <span v-if="w.catName" class="chip">{{ w.catName }}</span>
                <span v-if="w.durLabel || w.hours" class="wks-meta-short">· {{ [w.durLabel, w.hours].filter(Boolean).join(' · ') }}</span>
              </div>
              <h3>{{ w.name }}</h3>
              <p class="wrow-desc">{{ w.desc }}</p>
              <div v-if="w.instrName" class="row-meta">
                <span class="instr-line">
                  <img v-if="w.instrPhoto" :src="w.instrPhoto" :alt="w.instrName" loading="lazy" />
                  {{ w.instrName }}
                </span>
              </div>
            </div>
            <div class="wrow-date">
              {{ w.date }}
              <small v-if="w.hours">{{ w.hours }}</small>
            </div>
            <div class="price-wrap">
              <div class="wrow-price">{{ w.priceLabel || t('Zapytaj o cenę', 'Ask for price') }}</div>
              <div class="wrow-unit">{{ t('os. / pełen koszt', 'per person / full cost') }}</div>
              <div v-if="!w.isPast" class="availability" :class="availClass(w)">
                <div class="abar"><div class="afill" :style="{ width: availWidth(w) }"></div></div>
                <div class="alabel">{{ availLabel(w) }}</div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- ─── GRID VIEW ─────────────────────────────────────────── -->
        <div v-else-if="view === 'grid'" class="wks-grid">
          <NuxtLink
            v-for="(w, i) in sorted" :key="w.id"
            :to="`/warsztaty/${w.slug}`"
            class="wks-card reveal"
            :style="{ transitionDelay: `${i * 30}ms` }"
          >
            <div class="card-ph">
              <img :src="w.img" :alt="w.name" loading="lazy" />
              <span v-if="w.monthShort" class="month-tag">{{ w.monthShort }}</span>
              <span v-if="w.catName" class="cat-tag">
                <DhIcon :name="w.icon" :size="12" :stroke="1.6" />
                {{ w.catName }}
              </span>
            </div>
            <div class="card-body">
              <div class="card-date">{{ w.date }} <small v-if="w.durLabel">· {{ w.durLabel }}</small></div>
              <h3>{{ w.name }}</h3>
              <p class="card-desc">{{ w.desc }}</p>
              <div v-if="w.instrName" class="card-instr">
                <img v-if="w.instrPhoto" :src="w.instrPhoto" :alt="w.instrName" loading="lazy" />
                {{ t('Prow.', 'Led by') }} {{ w.instrName }}
              </div>
              <div class="card-foot">
                <div class="card-price">{{ w.priceLabel || t('Zapytaj o cenę', 'Ask for price') }}</div>
                <div v-if="!w.isPast" class="card-avail" :class="availClass(w)">{{ availLabel(w) }}</div>
              </div>
            </div>
          </NuxtLink>
        </div>


        <!-- ─── CALENDAR VIEW ─────────────────────────────────────── -->
        <div v-else class="cal-view">
          <div v-for="(rows, m) in monthGroups" :key="m" class="cal-month reveal">
            <h3>{{ monthGroupLabel(m) }}</h3>
            <div class="m-sub">{{ rows.length }} {{ pluralWorkshops(rows.length) }} {{ t('w tym miesiącu', 'this month') }}</div>
            <div class="cal-rows">
              <NuxtLink
                v-for="w in rows" :key="w.id"
                :to="`/warsztaty/${w.slug}`"
                class="cal-row"
              >
                <div class="cal-day">
                  {{ w.day }}
                  <small>{{ w.monthShort }}</small>
                </div>
                <div class="cal-info">
                  <h4>{{ w.name }}</h4>
                  <span class="cal-cat">
                    <DhIcon :name="w.icon" :size="12" :stroke="1.4" />
                    {{ [w.catName, w.durLabel].filter(Boolean).join(' · ') }}
                  </span>
                </div>
                <div v-if="w.instrName" class="cal-instr">
                  <img v-if="w.instrPhoto" :src="w.instrPhoto" :alt="w.instrName" loading="lazy" />
                  <span>{{ w.instrName }}</span>
                </div>
                <div class="cal-price">{{ w.priceLabel || t('Zapytaj o cenę', 'Ask for price') }}</div>
                <div v-if="!w.isPast" class="cal-avail" :class="availClass(w)">{{ availLabel(w) }}</div>
              </NuxtLink>
            </div>
          </div>
        </div>
        </template>

        <!-- ─── RENT CTA ──────────────────────────────────────────── -->
        <div class="rent-cta">
          <h3>{{ t('Prowadzisz warsztaty? Możesz wynająć Duży Dom.', 'Running a workshop? You can rent the Big House.') }}</h3>
          <p>{{ t('Wynajmujemy całość obiektu grupom warsztatowym — od weekendu w górę.', 'We rent the whole building to workshop groups — from a weekend upwards.') }}</p>
          <NuxtLink class="btn btn-primary" to="/noclegi/duzy-dom">
            {{ t('Zobacz Duży Dom', 'View the Big House') }}
            <DhIcon name="arrow" :size="14" :stroke="1.6" />
          </NuxtLink>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
/* Page-specific styles only. Base styles moved to main.css */

/* Hero */
.wks-hero { padding: 140px 0 64px; background: var(--brand-primary); }
.wks-hero-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 48px; }
.wks-hero .eyebrow { color: rgba(253,251,247,0.55); }
.wks-hero h1 { font-size: clamp(48px, 5.6vw, 80px); font-style: italic; font-weight: 500; line-height: 0.98; letter-spacing: -0.02em; margin: 16px 0 0; max-width: 720px; color: #FDFBF7; }
.wks-hero h1 em { color: var(--cta-main); font-style: italic; }
.wks-hero .lede { font-family: var(--serif); font-size: 17px; max-width: 360px; color: rgba(253,251,247,0.72); line-height: 1.55; flex-shrink: 0; }
.wks-hero-stats { display: flex; gap: 48px; margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(253,251,247,0.18); }
.wks-hero-stats .s .n { font-family: var(--serif); font-size: 32px; color: #FDFBF7; line-height: 1; font-weight: 500; }
.wks-hero-stats .s .n em { color: var(--cta-main); font-style: normal; }
.wks-hero-stats .s .l { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: rgba(253,251,247,0.5); margin-top: 8px; }

/* Featured block */
.feature-block { display: grid; grid-template-columns: 1.1fr 1fr; gap: 0; border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; background: var(--bg-card); margin-bottom: 96px; box-shadow: var(--shadow-md); }
.feat-img { position: relative; min-height: 480px; }
.feat-img img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
.feat-img .badge { position: absolute; top: 24px; left: 24px; display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: var(--r-pill); background: var(--cta-main); color: var(--brand-primary); font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; z-index: 2; }
.feat-body { padding: 56px; display: flex; flex-direction: column; justify-content: center; }
.feat-body h2 { font-size: 48px; margin-bottom: 16px; font-style: italic; line-height: 1.05; }
.feat-body p { color: var(--text-muted); margin-bottom: 28px; font-size: 16px; line-height: 1.6; }
.feature-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 24px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-bottom: 28px; }
.feature-meta .fk { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
.feature-meta .fv { font-family: var(--serif); font-size: 18px; color: var(--brand-primary); }

/* Controls */
.controls-bar { display: flex; gap: 16px; align-items: center; padding: 20px 0; margin-bottom: 16px; }
.search-input { flex: 1; display: flex; align-items: center; gap: 12px; background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-pill); padding: 4px 4px 4px 20px; transition: border-color .2s; }
.search-input.focused { border-color: var(--accent-earth); }
.search-input input { flex: 1; border: none; outline: none; background: transparent; font-family: var(--sans); font-size: 14px; color: var(--text-main); padding: 12px 0; }
.clear-btn { background: var(--bg-section); border: none; border-radius: 999px; width: 36px; height: 36px; cursor: pointer; color: var(--text-muted); font-size: 14px; display: flex; align-items: center; justify-content: center; }
.sort-select { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-pill); height: 48px; display: flex; align-items: center; padding: 0 6px 0 20px; gap: 8px; }
.sort-label { font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-muted); white-space: nowrap; }
.sort-select select { border: none; background: transparent; font-family: var(--sans); font-size: 13px; padding: 12px 16px 12px 4px; outline: none; cursor: pointer; color: var(--brand-primary); }
.view-toggle { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-pill); height: 48px; display: flex; align-items: center; }
.view-toggle button { border: none; background: transparent; padding: 0 16px; height: 100%; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; border-radius: var(--r-pill); transition: all .2s; }
.view-toggle button.active { background: var(--brand-primary); color: var(--bg-primary); margin: 4px; }

/* Filters */
.filter-section { padding: 20px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-bottom: 40px; }
.filter-row { display: flex; gap: 32px; align-items: flex-start; padding: 4px 0; }
.filter-row + .filter-row { padding-top: 16px; border-top: 1px dashed var(--line); margin-top: 16px; }
.label-col { flex: 0 0 130px; font-family: var(--mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-muted); padding-top: 14px; }
.filter-chips { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; }
.filter-chip { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: var(--r-pill); border: 1px solid var(--line); background: transparent; cursor: pointer; font-family: var(--sans); font-size: 13px; color: var(--text-main); transition: all .2s; }
.filter-chip.active { background: var(--brand-primary); color: var(--bg-primary); border-color: var(--brand-primary); }
.chip-ic { width: 18px; height: 18px; display: flex; align-items: center; }
.month-chip { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; padding: 8px 14px; }

/* Results head */
.results-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.rcount { font-family: var(--serif); font-size: 22px; color: var(--brand-primary); }
.rcount em { font-style: italic; color: var(--accent-earth); }
.clear-all-btn { font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--accent-earth); background: none; border: none; cursor: pointer; padding: 8px 14px; }

/* Empty */
.empty { text-align: center; padding: 96px 0; color: var(--text-muted); }
.empty h3 { color: var(--brand-primary); margin-bottom: 12px; font-style: italic; }

/* Fetch error notice */
.workshops-notice { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 64px 32px; border: 1px solid var(--line); border-radius: var(--r-md); background: var(--bg-card); text-align: center; max-width: 480px; margin: 0 auto 96px; }
.workshops-notice .notice-icon { color: var(--accent-earth); opacity: 0.6; }
.workshops-notice .notice-title { font-family: var(--serif); font-size: 22px; color: var(--brand-primary); margin: 0; }
.workshops-notice .notice-desc { font-size: 15px; color: var(--text-muted); line-height: 1.6; margin: 0; }

/* List view */
.wks-list { display: flex; flex-direction: column; gap: 16px; }
.wks-row { display: grid; grid-template-columns: 200px 1fr 220px 200px; gap: 32px; padding: 24px; background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-md); align-items: center; transition: transform .2s, box-shadow .2s, border-color .2s; text-decoration: none; color: inherit; cursor: pointer; }
.wks-row:hover { transform: translateX(4px); box-shadow: var(--shadow-md); border-color: var(--accent-earth); }
.img-wrap { position: relative; }
.img-wrap img { width: 100%; height: 160px; object-fit: cover; border-radius: var(--r-sm); }
.month-tag { position: absolute; top: 10px; left: 10px; background: var(--bg-primary); color: var(--brand-primary); font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; padding: 6px 10px; border-radius: var(--r-sm); }
.wks-info-col { flex: 1; }
.wks-badges { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.wks-badge-ic { color: var(--accent-earth); }
.wks-meta-short { font-size: 11px; color: var(--text-muted); font-family: var(--mono); text-transform: uppercase; letter-spacing: .08em; }
.wks-row h3 { font-size: 26px; margin-bottom: 6px; line-height: 1.2; color: var(--brand-primary); }
.wrow-desc { color: var(--text-muted); font-size: 14px; line-height: 1.5; max-width: 520px; margin-bottom: 12px; }
.row-meta { display: flex; gap: 12px; align-items: center; margin-top: 10px; }
.instr-line { display: inline-flex; align-items: center; gap: 8px; color: var(--brand-primary); font-weight: 500; font-size: 13px; }
.instr-line img { width: 22px; height: 22px; border-radius: 50%; object-fit: cover; }
.wrow-date { font-family: var(--serif); font-size: 22px; color: var(--brand-primary); line-height: 1.1; }
.wrow-date small { display: block; font-family: var(--mono); font-size: 11px; color: var(--text-muted); letter-spacing: .1em; text-transform: uppercase; margin-top: 6px; font-weight: 400; }
.price-wrap { text-align: right; }
.wrow-price { font-family: var(--serif); font-size: 26px; color: var(--brand-primary); line-height: 1; }
.wrow-unit { font-size: 11px; color: var(--text-muted); font-family: var(--mono); text-transform: uppercase; letter-spacing: .08em; margin-top: 6px; }
.availability { margin-top: 12px; }
.abar { height: 6px; background: var(--bg-section); border-radius: var(--r-pill); overflow: hidden; margin-bottom: 6px; }
.afill { height: 100%; background: linear-gradient(90deg, var(--accent-earth), var(--cta-main)); border-radius: var(--r-pill); }
.availability.low .afill { background: linear-gradient(90deg, #C97B4A, #E69A65); }
.availability.full .afill { background: var(--text-muted); width: 100% !important; }
.alabel { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); }
.availability.low .alabel { color: var(--accent-earth-deep); font-weight: 600; }

/* Grid view */
.wks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.wks-card { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; display: flex; flex-direction: column; transition: transform .3s, box-shadow .3s, border-color .2s; text-decoration: none; color: inherit; }
.wks-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--accent-earth); }
.card-ph { aspect-ratio: 4/3; position: relative; overflow: hidden; }
.card-ph img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s; }
.wks-card:hover .card-ph img { transform: scale(1.04); }
.cat-tag { position: absolute; top: 12px; right: 12px; background: rgba(58,75,32,.85); color: var(--bg-primary); backdrop-filter: blur(8px); font-size: 11px; padding: 6px 12px; border-radius: var(--r-pill); display: flex; align-items: center; gap: 6px; }
.card-body { padding: 24px; display: flex; flex-direction: column; flex: 1; gap: 12px; }
.card-date { font-family: var(--serif); font-size: 17px; color: var(--brand-primary); }
.card-date small { font-family: var(--mono); font-size: 10px; color: var(--text-muted); letter-spacing: .1em; text-transform: uppercase; margin-left: 8px; }
.wks-card h3 { font-size: 22px; line-height: 1.2; color: var(--brand-primary); }
.card-desc { color: var(--text-muted); font-size: 13px; line-height: 1.5; flex: 1; }
.card-instr { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--brand-primary); }
.card-instr img { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }
.card-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--line); }
.card-price { font-family: var(--serif); font-size: 22px; color: var(--brand-primary); }
.card-avail { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); }
.card-avail.low { color: var(--accent-earth-deep); font-weight: 600; }
.card-avail.full { opacity: .5; }


/* Calendar view */
.cal-view { display: flex; flex-direction: column; gap: 56px; }
.cal-month h3 { font-family: var(--serif); font-size: 36px; font-style: italic; margin-bottom: 8px; }
.m-sub { font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 28px; }
.cal-rows { display: flex; flex-direction: column; gap: 12px; }
.cal-row { display: grid; grid-template-columns: 80px 1fr 200px 140px 120px; align-items: center; gap: 24px; padding: 20px 24px; background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-md); text-decoration: none; color: inherit; transition: all .2s; }
.cal-row:hover { border-color: var(--accent-earth); transform: translateX(4px); }
.cal-day { font-family: var(--serif); font-size: 32px; color: var(--brand-primary); font-weight: 500; line-height: 1; }
.cal-day small { display: block; font-family: var(--mono); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-muted); margin-top: 6px; }
.cal-info h4 { font-size: 20px; margin-bottom: 4px; color: var(--brand-primary); }
.cal-cat { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--accent-earth); }
.cal-instr { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text-muted); }
.cal-instr img { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
.cal-price { font-family: var(--serif); font-size: 20px; color: var(--brand-primary); text-align: right; }
.cal-avail { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); text-align: right; }
.cal-avail.low { color: var(--accent-earth-deep); font-weight: 600; }
.cal-avail.full { opacity: .5; }

/* Rent CTA */
.rent-cta { margin-top: 96px; padding: 56px 0; border-top: 1px solid var(--line); text-align: center; }
.rent-cta h3 { font-style: italic; font-size: 32px; margin-bottom: 12px; }
.rent-cta p { color: var(--text-muted); margin-bottom: 24px; max-width: 520px; margin-left: auto; margin-right: auto; }

/* ─── Responsive ────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .feature-block { grid-template-columns: 1fr; }
  .feat-img { min-height: 320px; }
  .feat-body { padding: 40px; }
  .wks-row { grid-template-columns: 160px 1fr; gap: 20px; padding: 20px; }
  .wrow-date, .price-wrap { grid-column: 2; text-align: left; }
  .wks-grid { grid-template-columns: repeat(2, 1fr); }
  .wks-hero-row { flex-direction: column; align-items: flex-start; gap: 16px; }
  .wks-hero-stats { flex-wrap: wrap; gap: 24px; }
  .cal-row { grid-template-columns: 60px 1fr; gap: 16px; padding: 16px; }
  .cal-row .cal-instr,
  .cal-row .cal-price,
  .cal-row .cal-avail { grid-column: 2; text-align: left; }
}

@media (max-width: 720px) {
  .controls-bar { flex-wrap: wrap; }
  .search-input { flex: 1 1 100%; }
  .filter-row { flex-direction: column; gap: 12px; }
  .label-col { padding-top: 0; }
  .wks-row { grid-template-columns: 1fr; gap: 14px; }
  .wks-row .img-wrap img { height: 200px; }
  .wrow-date, .price-wrap { grid-column: 1; }
  .wks-grid { grid-template-columns: 1fr; }
  .feat-body h2 { font-size: 32px; }
  .feature-meta { grid-template-columns: 1fr 1fr; gap: 12px; }
  .results-head { flex-direction: column; align-items: flex-start; gap: 8px; }
}
</style>