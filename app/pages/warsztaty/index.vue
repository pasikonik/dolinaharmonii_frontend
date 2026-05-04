<script setup lang="ts">
const { lang, t } = useLang()
const origin = useRequestURL().origin

useSeoMeta({
  title: 'Warsztaty — Dolina Harmonii',
  description: 'Kameralne, kilkudniowe warsztaty od maja do października w Dolinie Harmonii. Mindfulness, joga, natura, rękodzieło.',
  ogTitle: 'Warsztaty — Dolina Harmonii',
  ogDescription: 'Kameralne, kilkudniowe warsztaty od maja do października w Dolinie Harmonii. Mindfulness, joga, natura, rękodzieło.',
  ogUrl: `${origin}/warsztaty`,
  ogImage: `${origin}/kopaniec.avif`,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Warsztaty — Dolina Harmonii',
  twitterDescription: 'Kameralne, kilkudniowe warsztaty od maja do października w Dolinie Harmonii.',
  twitterImage: `${origin}/kopaniec.avif`,
})

// ─── Static data ──────────────────────────────────────────────────────────
const CATEGORIES_RAW = [
  { id: 'all',         label_pl: 'Wszystkie',   label_en: 'All',        icon: 'compass' },
  { id: 'natura',      label_pl: 'Natura',      label_en: 'Nature',     icon: 'leaf' },
  { id: 'ogród',       label_pl: 'Ogród',       label_en: 'Garden',     icon: 'herb' },
  { id: 'joga',        label_pl: 'Joga',        label_en: 'Yoga',       icon: 'hands' },
  { id: 'mindfulness', label_pl: 'Mindfulness', label_en: 'Mindfulness',icon: 'meditation' },
  { id: 'drewno',      label_pl: 'Drewno',      label_en: 'Wood',       icon: 'candle' },
  { id: 'rękodzieło',  label_pl: 'Rękodzieło',  label_en: 'Crafts',     icon: 'craft' },
]
const CATEGORIES = computed(() => CATEGORIES_RAW.map(c => ({ ...c, label: t(c.label_pl, c.label_en) })))

const MONTHS_RAW = [
  { id: 'all', label_pl: 'Cały sezon',  label_en: 'Full season' },
  { id: 'maj', label_pl: 'Maj',         label_en: 'May' },
  { id: 'cze', label_pl: 'Czerwiec',    label_en: 'June' },
  { id: 'lip', label_pl: 'Lipiec',      label_en: 'July' },
  { id: 'sie', label_pl: 'Sierpień',    label_en: 'August' },
  { id: 'wrz', label_pl: 'Wrzesień',    label_en: 'September' },
  { id: 'paź', label_pl: 'Październik', label_en: 'October' },
]
const MONTHS = computed(() => MONTHS_RAW.map(m => ({ ...m, label: t(m.label_pl, m.label_en) })))

const MONTH_LABELS_PL: Record<string, string> = { maj: 'Maj', cze: 'Czerwiec', lip: 'Lipiec', sie: 'Sierpień', wrz: 'Wrzesień', paź: 'Październik' }
const MONTH_LABELS_EN: Record<string, string> = { maj: 'May', cze: 'June',    lip: 'July',   sie: 'August',   wrz: 'September', paź: 'October' }

const PEOPLE: Record<string, { name: string, photo: string }> = {
  joanna: { name: 'Joanna Lis',      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
  marek:  { name: 'Marek Wojciech',  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  anna:   { name: 'Anna Mróz',       photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
  ewa:    { name: 'Ewa Jagoda',      photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
  tomek:  { name: 'Tomasz Bór',      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  hanka:  { name: 'Hanna Sosnowska', photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80' },
}

const WORKSHOPS_RAW = [
  { id: 'mindful-natura', slug: 'mindfulness-w-naturze',  name_pl: 'Mindfulness w naturze',   name_en: 'Mindfulness in Nature',    cat: 'mindfulness', icon: 'meditation', month: 'maj', dur_pl: '3 dni',   dur_en: '3 days',  date_pl: '8–10 maja',         date_en: '8–10 May',          dateLong_pl: '8–10 maja 2026',         dateLong_en: '8–10 May 2026',         day: 8,  hours: '17:00 – 14:00', spots: 12, taken: 8,  instr: 'joanna', img: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=80',  desc_pl: 'Praktyka uważnej obecności na łące, w lesie i przy ognisku. Z prowadzeniem Joanny Lis.',   desc_en: 'A practice of mindful presence on the meadow, in the forest and by the fire. Led by Joanna Lis.',   price: '1 480 zł', priceN: 1480 },
  { id: 'cisza',          slug: 'cisza-i-medytacja',      name_pl: 'Cisza i medytacja',        name_en: 'Silence & Meditation',     cat: 'mindfulness', icon: 'candle',     month: 'cze', dur_pl: '5 dni',   dur_en: '5 days',  date_pl: '12–16 czerwca',     date_en: '12–16 June',        dateLong_pl: '12–16 czerwca 2026',     dateLong_en: '12–16 June 2026',       day: 12, hours: '18:00 – 12:00', spots: 10, taken: 4,  instr: 'marek',  img: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&w=900&q=80',  desc_pl: 'Pięciodniowe odosobnienie w ciszy z prowadzeniem zen i tradycji wglądu.',                  desc_en: 'A five-day silent retreat led in the Zen and Insight traditions.',                                   price: '2 200 zł', priceN: 2200 },
  { id: 'rekodzielo',     slug: 'rekodzieło-z-izerow',    name_pl: 'Rękodzieło z Izerów',      name_en: 'Izera Crafts',             cat: 'rękodzieło',  icon: 'craft',      month: 'lip', dur_pl: 'Weekend', dur_en: 'Weekend', date_pl: '4–6 lipca',         date_en: '4–6 July',          dateLong_pl: '4–6 lipca 2026',         dateLong_en: '4–6 July 2026',         day: 4,  hours: '16:00 – 15:00', spots: 12, taken: 11, instr: 'anna',   img: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80',  desc_pl: 'Filcowanie wełną, plecionkarstwo, wypał ceramiki — z lokalnymi rękodzielniczkami.',         desc_en: 'Wool felting, basketry, ceramic firing — with local craftswomen.',                                   price: '980 zł',   priceN: 980  },
  { id: 'ziola',          slug: 'ziola-i-ogrod',          name_pl: 'Zioła i ogród',            name_en: 'Herbs & Garden',           cat: 'ogród',       icon: 'herb',       month: 'sie', dur_pl: '4 dni',   dur_en: '4 days',  date_pl: '20–23 sierpnia',    date_en: '20–23 August',      dateLong_pl: '20–23 sierpnia 2026',    dateLong_en: '20–23 August 2026',     day: 20, hours: '15:00 – 14:00', spots: 12, taken: 8,  instr: 'ewa',    img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',  desc_pl: 'Praca w ogrodzie permakulturowym — od grządki do zielarskiej apteczki.',                   desc_en: 'Work in the permaculture garden — from bed to herbal medicine chest.',                               price: '1 680 zł', priceN: 1680 },
  { id: 'pol-odosob',     slug: 'letnie-polodosobnienie', name_pl: 'Letnie półodosobnienie',   name_en: 'Summer Half-Retreat',      cat: 'mindfulness', icon: 'meditation', month: 'lip', dur_pl: '7 dni',   dur_en: '7 days',  date_pl: '5–11 lipca',        date_en: '5–11 July',         dateLong_pl: '5–11 lipca 2026',        dateLong_en: '5–11 July 2026',        day: 5,  hours: '17:00 – 12:00', spots: 14, taken: 5,  instr: 'marek',  img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80',  desc_pl: 'Wakacyjny tydzień: praktyka rano i wieczorem, dni w naturze.',                              desc_en: 'A holiday week: morning and evening practice, days spent in nature.',                                price: '2 600 zł', priceN: 2600 },
  { id: 'forest',         slug: 'forest-bathing',         name_pl: 'Forest bathing',           name_en: 'Forest Bathing',           cat: 'natura',      icon: 'leaf',       month: 'maj', dur_pl: '2 dni',   dur_en: '2 days',  date_pl: '24–25 maja',        date_en: '24–25 May',         dateLong_pl: '24–25 maja 2026',        dateLong_en: '24–25 May 2026',        day: 24, hours: '10:00 – 16:00', spots: 14, taken: 0,  instr: 'tomek',  img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80',  desc_pl: 'Shinrin-yoku — kąpiele leśne w izerskim borze świerkowo-bukowym.',                         desc_en: 'Shinrin-yoku — forest bathing in the Izera spruce-beech woodland.',                                  price: '680 zł',   priceN: 680  },
  { id: 'pisanie',        slug: 'pisanie-z-natury',       name_pl: 'Pisanie z natury',         name_en: 'Writing from Nature',      cat: 'natura',      icon: 'leaf',       month: 'wrz', dur_pl: 'Weekend', dur_en: 'Weekend', date_pl: '11–13 września',    date_en: '11–13 September',   dateLong_pl: '11–13 września 2026',    dateLong_en: '11–13 September 2026',  day: 11, hours: '17:00 – 15:00', spots: 12, taken: 3,  instr: 'hanka',  img: 'https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=900&q=80',  desc_pl: 'Warsztat pisania literackiego z ćwiczeniami obserwacji i ciszy.',                           desc_en: 'A literary writing workshop with observation and silence exercises.',                                 price: '1 100 zł', priceN: 1100 },
  { id: 'joga-sauna',     slug: 'joga-i-sauna',           name_pl: 'Joga i sauna',             name_en: 'Yoga & Sauna',             cat: 'joga',        icon: 'candle',     month: 'paź', dur_pl: 'Weekend', dur_en: 'Weekend', date_pl: '18–20 października', date_en: '18–20 October',     dateLong_pl: '18–20 października 2026',dateLong_en: '18–20 October 2026',    day: 18, hours: '17:00 – 14:00', spots: 12, taken: 12, instr: 'ewa',    img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80',  desc_pl: 'Vinyasa i hatha rano, sauna fińska wieczorem, kuchnia roślinna pomiędzy.',                 desc_en: 'Vinyasa and hatha in the morning, Finnish sauna in the evening, plant-based kitchen between.',       price: '980 zł',   priceN: 980  },
  { id: 'kregi',          slug: 'krag-jogi-kobiecej',     name_pl: 'Krąg jogi kobiecej',       name_en: "Women's Yoga Circle",      cat: 'joga',        icon: 'hands',      month: 'wrz', dur_pl: 'Weekend', dur_en: 'Weekend', date_pl: '25–27 września',    date_en: '25–27 September',   dateLong_pl: '25–27 września 2026',    dateLong_en: '25–27 September 2026',  day: 25, hours: '18:00 – 14:00', spots: 10, taken: 6,  instr: 'joanna', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80',  desc_pl: 'Trzydniowy krąg jogi kobiecej w rytmie wczesnej jesieni.',                                 desc_en: 'A three-day circle of women\'s yoga attuned to the rhythm of early autumn.',                         price: '1 200 zł', priceN: 1200 },
  { id: 'rzezba',         slug: 'rzezba-w-drewnie',       name_pl: 'Rzeźba w drewnie',         name_en: 'Wood Carving',             cat: 'drewno',      icon: 'candle',     month: 'sie', dur_pl: '3 dni',   dur_en: '3 days',  date_pl: '7–9 sierpnia',      date_en: '7–9 August',        dateLong_pl: '7–9 sierpnia 2026',      dateLong_en: '7–9 August 2026',       day: 7,  hours: '14:00 – 16:00', spots: 8,  taken: 7,  instr: 'anna',   img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',  desc_pl: 'Tradycyjna rzeźba w drewnie z lokalnym snycerzem — od bryły do formy.',                    desc_en: 'Traditional wood carving with a local craftsman — from block to form.',                              price: '1 380 zł', priceN: 1380 },
]

const WORKSHOPS = computed(() => WORKSHOPS_RAW.map(w => ({
  ...w,
  name: t(w.name_pl, w.name_en),
  desc: t(w.desc_pl, w.desc_en),
  durLabel: t(w.dur_pl, w.dur_en),
  date: t(w.date_pl, w.date_en),
  dateLong: t(w.dateLong_pl, w.dateLong_en),
})))

// ─── Filter state ──────────────────────────────────────────────────────────
type WorkshopRow = (typeof WORKSHOPS)['value'][number]

const cat   = ref('all')
const month = ref('all')
const view  = ref<'list'|'grid'|'calendar'>('list')
const sort  = ref('date')
const q     = ref('')

const MONTH_ORDER = ['maj','cze','lip','sie','wrz','paź']

const FALLBACK_PERSON = { name: '—', photo: '' }
function getPerson(id: string) {
  return PEOPLE[id] ?? FALLBACK_PERSON
}

function monthShort(w: WorkshopRow): string {
  const labels = lang.value === 'en' ? MONTH_LABELS_EN : MONTH_LABELS_PL
  return labels[w.month] ?? w.month
}

function pluralWorkshops(n: number) {
  if (lang.value === 'en') return n === 1 ? 'workshop' : 'workshops'
  if (n === 1) return 'warsztat'
  if (n >= 2 && n <= 4) return 'warsztaty'
  return 'warsztatów'
}

const filtered = computed(() => WORKSHOPS.value.filter(w => {
  if (cat.value !== 'all' && w.cat !== cat.value) return false
  if (month.value !== 'all' && w.month !== month.value) return false
  if (q.value) {
    const query = q.value.toLowerCase()
    const person = getPerson(w.instr).name.toLowerCase()
    if (!w.name.toLowerCase().includes(query) && !w.desc.toLowerCase().includes(query) && !person.includes(query)) return false
  }
  return true
}))

const sorted = computed(() => [...filtered.value].sort((a, b) => {
  if (sort.value === 'price-asc')  return a.priceN - b.priceN
  if (sort.value === 'price-desc') return b.priceN - a.priceN
  if (sort.value === 'spots')      return (a.spots - a.taken) - (b.spots - b.taken)
  const ma = MONTH_ORDER.indexOf(a.month)
  const mb = MONTH_ORDER.indexOf(b.month)
  if (ma !== mb) return ma - mb
  return a.day - b.day
}))

const monthGroups = computed(() =>
  sorted.value.reduce((acc, w) => {
    const list = acc[w.month] ?? (acc[w.month] = [])
    list.push(w)
    return acc
  }, {} as Record<string, WorkshopRow[]>)
)

const hasFilters = computed(() => cat.value !== 'all' || month.value !== 'all' || q.value !== '')
function clearAll() { cat.value = 'all'; month.value = 'all'; q.value = '' }

function availClass(w: WorkshopRow) {
  const free = w.spots - w.taken
  if (free === 0) return 'full'
  if (free <= 3)  return 'low'
  return ''
}
function availLabel(w: WorkshopRow) {
  const free = w.spots - w.taken
  if (lang.value === 'en') {
    if (free === 0) return 'Fully booked'
    if (free <= 3)  return `last ${free} spots`
    return `${free} of ${w.spots} spots`
  }
  if (free === 0) return 'Brak miejsc'
  if (free <= 3)  return `ostatnie ${free} miejsc`
  return `${free} z ${w.spots} miejsc`
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
          <div class="s"><div class="n">6</div><div class="l">{{ t('stałych prowadzących', 'regular facilitators') }}</div></div>
          <div class="s"><div class="n">8—16</div><div class="l">{{ t('osób w grupie', 'guests per group') }}</div></div>
          <div class="s"><div class="n"><em>{{ t('mar', 'Mar') }}</em>—{{ t('gru', 'Dec') }}</div><div class="l">{{ t('sezon warsztatowy', 'workshop season') }}</div></div>
        </div>
      </div>
    </section>

    <section class="tight">
      <div class="container">

        <!-- ─── FEATURED ─────────────────────────────────────────── -->
        <div class="feature-block reveal">
          <div class="feat-img">
            <span class="badge">
              <DhIcon name="star" :size="12" :stroke="1.6" />
              {{ t('Najbliższe wydarzenie', 'Next event') }}
            </span>
            <img src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1400&q=80" alt="" />
          </div>
          <div class="feat-body">
            <span class="eyebrow">Mindfulness</span>
            <h2 style="margin-top:12px">{{ t('Mindfulness w naturze', 'Mindfulness in Nature') }}</h2>
            <p>{{ t('Trzydniowy warsztat uważnej obecności w terenie. Codzienna praktyka rano, spacery medytacyjne, wieczorny krąg ciszy przy ognisku.', 'A three-day workshop of mindful presence outdoors. Daily morning practice, meditative walks, evening circle of silence by the fire.') }}</p>
            <div class="feature-meta">
              <div><div class="fk">{{ t('Termin', 'Date') }}</div><div class="fv">{{ t('8–10 maja', '8–10 May') }}</div></div>
              <div><div class="fk">{{ t('Cena', 'Price') }}</div><div class="fv">1 480 zł</div></div>
              <div><div class="fk">{{ t('Wolne', 'Available') }}</div><div class="fv">{{ t('4 z 12 miejsc', '4 of 12 spots') }}</div></div>
            </div>
            <div style="display:flex;gap:12px">
              <NuxtLink class="btn btn-secondary" to="/warsztaty/mindfulness-w-naturze">
                {{ t('Szczegóły', 'Details') }}
                <DhIcon name="arrow" :size="14" :stroke="1.6" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- ─── CONTROLS ─────────────────────────────────────────── -->
        <div class="controls-bar reveal">
          <div class="search-input" :class="{ focused: q }">
            <DhIcon name="compass" :size="18" :stroke="1.4" />
            <input
              v-model="q"
              type="text"
              :placeholder="t('Szukaj po nazwie, opisie, prowadzącym…', 'Search by name, description, instructor…')"
            />
            <button v-if="q" class="clear-btn" @click="q = ''">×</button>
          </div>
          <div class="sort-select">
            <span class="sort-label">{{ t('Sortuj', 'Sort') }}</span>
            <select v-model="sort">
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
                @click="month = m.id"
              >
                {{ m.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- ─── RESULTS HEAD ──────────────────────────────────────── -->
        <div class="results-head">
          <div class="rcount">
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
              <span class="month-tag">{{ w.day }} {{ monthShort(w) }}</span>
            </div>
            <div class="wks-info-col">
              <div class="wks-badges">
                <DhIcon :name="w.icon" :size="20" :stroke="1.4" class="wks-badge-ic" />
                <span class="chip">{{ w.cat }}</span>
                <span class="wks-meta-short">· {{ w.durLabel }} · {{ w.hours }}</span>
              </div>
              <h3>{{ w.name }}</h3>
              <p class="wrow-desc">{{ w.desc }}</p>
              <div class="row-meta">
                <span class="instr-line">
                  <img :src="getPerson(w.instr).photo" :alt="getPerson(w.instr).name" loading="lazy" />
                  {{ getPerson(w.instr).name }}
                </span>
              </div>
            </div>
            <div class="wrow-date">
              {{ w.date }}
              <small>{{ w.hours }}</small>
            </div>
            <div class="price-wrap">
              <div class="wrow-price">{{ w.price }}</div>
              <div class="wrow-unit">{{ t('os. / pełen koszt', 'per person / full cost') }}</div>
              <div class="availability" :class="availClass(w)">
                <div class="abar"><div class="afill" :style="{ width: `${(w.taken/w.spots)*100}%` }"></div></div>
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
              <span class="month-tag">{{ monthShort(w) }}</span>
              <span class="cat-tag">
                <DhIcon :name="w.icon" :size="12" :stroke="1.6" />
                {{ w.cat }}
              </span>
            </div>
            <div class="card-body">
              <div class="card-date">{{ w.date }} <small>· {{ w.durLabel }}</small></div>
              <h3>{{ w.name }}</h3>
              <p class="card-desc">{{ w.desc }}</p>
              <div class="card-instr">
                <img :src="getPerson(w.instr).photo" :alt="getPerson(w.instr).name" loading="lazy" />
                {{ t('Prow.', 'Led by') }} {{ getPerson(w.instr).name }}
              </div>
              <div class="card-foot">
                <div class="card-price">{{ w.price }}</div>
                <div class="card-avail" :class="availClass(w)">{{ availLabel(w) }}</div>
              </div>
            </div>
          </NuxtLink>
        </div>


        <!-- ─── CALENDAR VIEW ─────────────────────────────────────── -->
        <div v-else class="cal-view">
          <div v-for="(rows, m) in monthGroups" :key="m" class="cal-month reveal">
            <h3>{{ (lang === 'en' ? MONTH_LABELS_EN[m] : MONTH_LABELS_PL[m]) || m }} 2026</h3>
            <div class="m-sub">{{ rows.length }} {{ pluralWorkshops(rows.length) }} {{ t('w tym miesiącu', 'this month') }}</div>
            <div class="cal-rows">
              <NuxtLink
                v-for="w in rows" :key="w.id"
                :to="`/warsztaty/${w.slug}`"
                class="cal-row"
              >
                <div class="cal-day">
                  {{ w.day }}
                  <small>{{ monthShort(w) }}</small>
                </div>
                <div class="cal-info">
                  <h4>{{ w.name }}</h4>
                  <span class="cal-cat">
                    <DhIcon :name="w.icon" :size="12" :stroke="1.4" />
                    {{ w.cat }} · {{ w.durLabel }}
                  </span>
                </div>
                <div class="cal-instr">
                  <img :src="getPerson(w.instr).photo" :alt="getPerson(w.instr).name" loading="lazy" />
                  <span>{{ getPerson(w.instr).name }}</span>
                </div>
                <div class="cal-price">{{ w.price }}</div>
                <div class="cal-avail" :class="availClass(w)">{{ availLabel(w) }}</div>
              </NuxtLink>
            </div>
          </div>
        </div>

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