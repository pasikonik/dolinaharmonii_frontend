<script setup lang="ts">
import type { Workshop } from '~~/types/directus'
import { DEFAULT_PRICING } from '~~/types/directus'

const { getWorkshops, getImageUrl, getPricing } = useDirectus()
const { lang, t } = useLang()

const { data } = await useAsyncData('workshops-home', () => getWorkshops({ limit: 3 }))
const workshops = computed(() => data.value?.data ?? [])

const { data: pricingData } = await useAsyncData('prices', async () => {
  try { return await getPricing() } catch { return null }
})
const p = computed(() => pricingData.value?.data ?? DEFAULT_PRICING)

function fmt(n: number): string {
  return n.toLocaleString('pl-PL')
}

const origin = useRequestURL().origin

useSeoMeta({
  title: 'Dolina Harmonii — miejsce naturalnych mocy',
  description: 'Ośrodek warsztatowy w Kopańcu, w Górach Izerskich. Warsztaty mindfulness, medytacja, rękodzieło, pobyty regeneracyjne.',
  ogTitle: 'Dolina Harmonii — miejsce naturalnych mocy',
  ogDescription: 'Ośrodek warsztatowy w Kopańcu, w Górach Izerskich. Warsztaty mindfulness, medytacja, rękodzieło, pobyty regeneracyjne.',
  ogUrl: origin,
  ogImage: `${origin}/duzy_dom.avif`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Dolina Harmonii — miejsce naturalnych mocy',
  twitterDescription: 'Ośrodek warsztatowy w Kopańcu, w Górach Izerskich. Warsztaty mindfulness, medytacja, rękodzieło.',
  twitterImage: `${origin}/duzy_dom.avif`,
})

useHead({
  script: [{
    key: 'ld-localbusiness',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Dolina Harmonii',
      description: 'Ośrodek warsztatowy i dom gościnny w Kopańcu, w Górach Izerskich. Warsztaty mindfulness, medytacja, rękodzieło, pobyty regeneracyjne.',
      url: origin,
      email: 'dolina@harmonii.pl',
      foundingDate: '2017',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kopaniec',
        addressRegion: 'Dolny Śląsk',
        postalCode: '58-564',
        addressCountry: 'PL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 50.85,
        longitude: 15.45,
      },
      image: `${origin}/duzy_dom.avif`,
    }),
  }],
})

useScrollReveal({ rootMargin: '0px 0px -60px 0px' })

const yearsOpen = new Date().getFullYear() - 2017

const STATIC_WORKSHOPS_RAW = [
  {
    slug: 'mindfulness-w-naturze',
    name_pl: 'Mindfulness w naturze', name_en: 'Mindfulness in Nature',
    cat_pl: 'mindfulness', cat_en: 'mindfulness',
    icon: 'meditation',
    img: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1000&q=80',
    dur_pl: '3 dni', dur_en: '3 days',
    date_pl: 'Maj 2026', date_en: 'May 2026',
    desc_pl: 'Praktyka uważnej obecności na łące, w lesie i przy ognisku — w towarzystwie cykli pór roku.',
    desc_en: 'A practice of mindful presence on the meadow, in the forest and by the fire — attuned to the cycles of the seasons.',
  },
  {
    slug: 'cisza-i-medytacja',
    name_pl: 'Cisza i medytacja', name_en: 'Silence & Meditation',
    cat_pl: 'medytacja', cat_en: 'meditation',
    icon: 'candle',
    img: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&w=1000&q=80',
    dur_pl: '5 dni', dur_en: '5 days',
    date_pl: 'Czerwiec', date_en: 'June',
    desc_pl: 'Pięciodniowe odosobnienie w ciszy z prowadzeniem zen i tradycji wglądu. Dla początkujących i wracających.',
    desc_en: 'A five-day silent retreat led in the Zen and Insight traditions. Open to beginners and returning practitioners.',
  },
  {
    slug: 'rekodzielo-z-izerow',
    name_pl: 'Rękodzieło z Izerów', name_en: 'Izera Crafts',
    cat_pl: 'rękodzieło', cat_en: 'crafts',
    icon: 'craft',
    img: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=80',
    dur_pl: 'Weekend', dur_en: 'Weekend',
    date_pl: 'Lipiec', date_en: 'July',
    desc_pl: 'Filcowanie wełną, plecionkarstwo, wypał ceramiki — z lokalnymi rękodzielniczkami.',
    desc_en: 'Wool felting, basketry, ceramic firing — with local craftswomen from the Izera foothills.',
  },
]

const STATIC_WORKSHOPS = computed(() => STATIC_WORKSHOPS_RAW.map(w => ({
  slug: w.slug,
  name: t(w.name_pl, w.name_en),
  cat: t(w.cat_pl, w.cat_en),
  icon: w.icon,
  img: w.img,
  dur: t(w.dur_pl, w.dur_en),
  date: t(w.date_pl, w.date_en),
  desc: t(w.desc_pl, w.desc_en),
})))

const FALLBACK_IMG = '/duzy_dom.avif'

function calcDuration(start?: string | null, end?: string | null): string {
  if (!start || !end) return ''
  const days = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86_400_000) + 1
  if (lang.value === 'en') return days === 1 ? '1 day' : `${days} days`
  return days === 1 ? '1 dzień' : `${days} dni`
}

function categoryIcon(cat: Workshop['category']): string {
  if (typeof cat !== 'object' || !cat?.icon) return 'meditation'
  return cat.icon.includes(':') ? (cat.icon.split(':')[1] ?? 'meditation') : cat.icon
}

const displayWorkshops = computed(() => {
  if (workshops.value.length > 0) return workshops.value.map(w => ({
    slug: w.slug,
    name: w.title,
    cat: typeof w.category === 'object' ? w.category?.name : w.category,
    icon: categoryIcon(w.category),
    img: w.cover_image ? getImageUrl(w.cover_image, { width: 1000, format: 'webp' }) : FALLBACK_IMG,
    dur: calcDuration(w.start_date, w.end_date),
    date: w.start_date ? new Date(w.start_date).toLocaleDateString(lang.value === 'en' ? 'en-GB' : 'pl-PL', { month: 'long', year: 'numeric' }) : '',
    desc: w.short_description,
  }))
  return STATIC_WORKSHOPS.value
})

const ACCOM_RAW = [
  {
    num_pl: '01 — Obiekt główny', num_en: '01 — Main building',
    name: 'Duży Dom',
    tag_pl: 'Dom Gościnny · 5 pokoi · 12–14 miejsc', tag_en: 'Guest House · 5 rooms · 12–14 guests',
    desc_pl: 'Drewniany dom z pięcioma przytulnymi pokojami — 2-, 3- i 5-osobowymi. Wnętrza wypełnia domowy klimat: drewniane meble, naturalne tkaniny, dekoracje inspirowane sielską prostotą izerskiej wsi. W salonie kominek z trzaskającym ogniem, w sali warsztatowej maty i poduszki do medytacji.',
    desc_en: 'A wooden house with five cosy rooms — for 2, 3 and 5 guests. The interiors exude a homely warmth: wooden furniture, natural fabrics, décor inspired by the pastoral simplicity of an Izera village. In the living room a crackling fireplace; in the workshop hall, mats and meditation cushions.',
    main: '/duzy_dom.avif', small: '/sala-w-1.avif',
    features_pl: [{ i: 'bed', t: '5 pokoi gościnnych' }, { i: 'fireplace', t: 'Kominek w salonie' }, { i: 'kitchen', t: 'Kuchnia dla gości' }, { i: 'meditation', t: 'Sala warsztatowa' }, { i: 'bath', t: 'Sauna infrared' }, { i: 'leaf', t: 'Sad i widok na góry' }],
    features_en: [{ i: 'bed', t: '5 guest rooms' }, { i: 'fireplace', t: 'Fireplace in lounge' }, { i: 'kitchen', t: 'Guest kitchen' }, { i: 'meditation', t: 'Workshop hall' }, { i: 'bath', t: 'Infrared sauna' }, { i: 'leaf', t: 'Orchard & mountain view' }],
    getPrice: (p: typeof DEFAULT_PRICING) => Math.min(p.forest_room, p.sun_room, p.flower_room, p.ethnic_room, p.magic_room),
    priceFor_pl: 'pokój / doba', priceFor_en: 'room / night',
    url: '/noclegi/duzy-dom',
  },
  {
    num_pl: '02 — Obiekt osobny', num_en: '02 — Separate building',
    name: 'Leśny Domek',
    tag_pl: 'Dwupoziomowy · 4/5 osób', tag_en: 'Two-storey · 4/5 guests',
    desc_pl: 'Osobny, dwupoziomowy obiekt ukryty w zaciszu, pośród drzew. Z okien rozciąga się widok na Osadę z owieczkami, leśny labirynt, staw oraz Wiśniową Górę. Na dole salon i kuchnia, na piętrze część sypialna.',
    desc_en: 'A separate two-storey cottage tucked away among the trees. The windows frame views of the sheep hamlet, forest labyrinth, pond and Cherry Hill. Ground floor: living room and kitchen; upper floor: sleeping quarters.',
    main: '/lesny-domek.avif', small: '/lesny_taras.avif',
    features_pl: [{ i: 'bed', t: 'Łoże + 2 łóżka + sofa' }, { i: 'bath', t: 'Łazienka z prysznicem' }, { i: 'kitchen', t: 'Kuchnia, jadalnia' }, { i: 'fireplace', t: 'Salon z kominkiem' }, { i: 'leaf', t: 'Widok na Wiśniową Górę' }, { i: 'star', t: 'Pełna prywatność' }],
    features_en: [{ i: 'bed', t: 'Double + 2 beds + sofa' }, { i: 'bath', t: 'Bathroom with shower' }, { i: 'kitchen', t: 'Kitchen & dining' }, { i: 'fireplace', t: 'Living room + fireplace' }, { i: 'leaf', t: 'View of Cherry Hill' }, { i: 'star', t: 'Complete privacy' }],
    getPrice: (p: typeof DEFAULT_PRICING) => p.forest_house,
    priceFor_pl: 'cały domek / doba', priceFor_en: 'whole cottage / night',
    url: '/noclegi/lesny-domek',
  },
  {
    num_pl: '03 — Obiekt osobny', num_en: '03 — Separate building',
    name: 'Studio z oranżerią',
    tag_pl: 'Apartament 2/3-osobowy', tag_en: '2/3-person apartment',
    desc_pl: 'Osobny, kameralny obiekt z klimatycznym salonem w postaci przeszklonej oranżerii. Łoże małżeńskie, rozkładana sofa, aneks kuchenny i łazienka. Idealne dla pary szukającej intymności lub trójki gości pragnących osobnej przestrzeni z widokiem na sad.',
    desc_en: 'A cosy separate unit with an atmospheric glass conservatory as the living room. Double bed, pull-out sofa, kitchenette and bathroom. Perfect for a couple seeking intimacy or three guests wanting a private space with orchard views.',
    main: '/oranzeria.avif', small: '/oranzeria-inside.avif',
    features_pl: [{ i: 'bed', t: 'Łoże + rozkładana sofa' }, { i: 'bath', t: 'Łazienka z prysznicem' }, { i: 'kitchen', t: 'Aneks kuchenny' }, { i: 'leaf', t: 'Salon-oranżeria' }, { i: 'tea', t: 'Widok na sad owocowy' }, { i: 'star', t: 'Prawie osobny apartament' }],
    features_en: [{ i: 'bed', t: 'Double + pull-out sofa' }, { i: 'bath', t: 'Bathroom with shower' }, { i: 'kitchen', t: 'Kitchenette' }, { i: 'leaf', t: 'Glass conservatory lounge' }, { i: 'tea', t: 'View of the orchard' }, { i: 'star', t: 'Near-private apartment' }],
    getPrice: (p: typeof DEFAULT_PRICING) => p.studio_room,
    priceFor_pl: 'studio / doba', priceFor_en: 'studio / night',
    url: '/noclegi/studio-z-oranzeria',
  },
]

const ACCOMMODATIONS = computed(() => ACCOM_RAW.map(a => ({
  num: t(a.num_pl, a.num_en),
  name: a.name,
  tag: t(a.tag_pl, a.tag_en),
  desc: t(a.desc_pl, a.desc_en),
  main: a.main, small: a.small,
  features: lang.value === 'en' ? a.features_en : a.features_pl,
  price: `${t('od', 'from')} ${fmt(a.getPrice(p.value))} ${t('zł', 'PLN')}`,
  priceFor: t(a.priceFor_pl, a.priceFor_en),
  url: a.url,
})))

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1200&q=80', span: 'span-2-row' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=900&q=80', span: 'span-2-col' },
  { src: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=900&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80', span: 'span-2-col' },
]

const TEAM_RAW = [
  { name: 'Danuta', role_pl: 'Założycielka', role_en: 'Founder', img: '/dana.avif' },
  { name: 'Filip', role_pl: 'Gospodarz', role_en: 'Host', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Kulka', role_pl: 'Gospodarz', role_en: 'Host', img: '/kulka.avif' },
  { name: 'Jędrzej', role_pl: 'Cieśla', role_en: 'Carpenter', img: '/Jedrzej.avif' },
]

const TEAM = computed(() => TEAM_RAW.map(m => ({ name: m.name, role: t(m.role_pl, m.role_en), img: m.img })))

</script>

<template>
  <div class="home-page">
    <!-- ─── HERO ──────────────────────────────────────────────────── -->
    <header class="hero" id="top">
      <NuxtImg
        class="hero-bg"
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80"
        alt=""
        loading="eager"
        fetchpriority="high"
        sizes="100vw"
      />
      <div class="hero-content">
        <div class="hero-eyebrow-row">
          <span class="line"></span>
          Kopaniec · {{ t('Góry Izerskie', 'Izera Mountains') }}
          <span class="line"></span>
        </div>
        <h1 class="hero-tagline">{{ t('Dolina Harmonii — miejsce naturalnych mocy', 'Dolina Harmonii — a place of natural power') }}</h1>
        <div class="hero-ctas">
          <NuxtLink class="btn btn-primary" to="#noclegi">
            {{ t('Zobacz noclegi', 'Explore stays') }}
            <DhIcon name="arrow" :size="18" :stroke="1.6" />
          </NuxtLink>
          <NuxtLink class="btn btn-glass" to="/warsztaty">{{ t('Zobacz warsztaty', 'Browse workshops') }}</NuxtLink>
        </div>
      </div>
      <div class="hero-meta">
        <span>
          <DhIcon name="compass" :size="18" :stroke="1.4" />
          50°51′N · 15°27′E
        </span>
        <span>EST. 2017 · 720 m {{ t('n.p.m.', 'a.s.l.') }}</span>
        <span>↓ {{ t('przewiń', 'scroll') }}</span>
      </div>
    </header>

    <!-- ─── INTRO ─────────────────────────────────────────────────── -->
    <section id="dolina" class="cream" :aria-label="t('O Dolinie', 'About the Valley')">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-text reveal">
            <span class="eyebrow">{{ t('Czym jest Dolina', 'About the Valley') }}</span>
            <p class="lead">
              {{ t(
                'Stary, drewniany dom u podnóża Izerów — przestrzeń, gdzie warsztaty, cisza i wspólny stół tworzą rytm dnia bliski naturze.',
                'An old wooden house at the foot of the Izeras — a space where workshops, silence and a shared table create a daily rhythm close to nature.'
              ) }}
            </p>
            <p class="desc-muted">
              {{ t(
                'Działamy od 2017 roku w Kopańcu — niewielkiej wsi otoczonej lasami, łąkami i strumieniami. Zapraszamy grupy warsztatowe oraz osoby, które chcą po prostu zatrzymać się na kilka dni, oddychać i obserwować pory roku.',
                'We have been here since 2017 in Kopaniec — a small village surrounded by forests, meadows and streams. We welcome workshop groups and anyone who simply wants to pause for a few days, breathe and watch the seasons change.'
              ) }}
            </p>
            <p class="desc-muted">
              {{ t(
                'Łączymy ekologię, rozwój osobisty i turystykę regionalną. Współtworzymy Magiczne Izery — opowieść o tym miejscu, jego ludziach i tradycjach.',
                'We weave together ecology, personal growth and regional tourism. We co-create Magical Izeras — a story about this place, its people and traditions.'
              ) }}
            </p>
            <div class="intro-stats">
              <div
                v-for="s in [
                  { n: String(yearsOpen), l: t('lat tworzenia miejsca', 'years building this place') },
                  { n: '40+', l: t('warsztatów rocznie', 'workshops a year') },
                  { n: '3', l: t('budynki, 7 pokoi', 'buildings, 7 rooms') }
                ]"
                :key="s.n">
                <div class="stat-num">{{ s.n }}</div>
                <div class="stat-label">{{ s.l }}</div>
              </div>
            </div>
          </div>
          <div class="reveal intro-image-wrap">
            <img src="/szalas.avif"
              :alt="t('Wnętrze drewnianego domu', 'Interior of the wooden house')" class="intro-main-img" />
            <div class="intro-badge">
              <div class="badge-head">
                <DhIcon name="leaf" :size="28" :stroke="1.4" class="badge-ic" />
                <span class="badge-label">{{ t('Dwa filary', 'Two pillars') }}</span>
              </div>
              <p class="badge-text">
                {{ t(
                  'Wynajem przestrzeni dla grup warsztatowych oraz indywidualne pobyty regeneracyjne.',
                  'Space rental for workshop groups and individual regenerative stays.'
                ) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── WORKSHOPS ─────────────────────────────────────────────── -->
    <section id="warsztaty" :aria-label="t('Warsztaty i wydarzenia', 'Workshops and events')">
      <div class="container">
        <div class="workshops-head reveal">
          <div>
            <span class="eyebrow">{{ t('Warsztaty &amp; wydarzenia', 'Workshops &amp; events') }}</span>
            <h2 class="section-title">{{ t('Cztery ścieżki, jedna dolina.', 'Four paths, one valley.') }}</h2>
          </div>
          <p class="lede">
            {{ t(
              'Spotykamy się przy konkretnych praktykach — mindfulness, medytacji, rękodziele i samoopiece. Każdy warsztat to mały, kameralny krąg.',
              'We gather around specific practices — mindfulness, meditation, crafts and self-care. Every workshop is a small, intimate circle.'
            ) }}
          </p>
        </div>
        <div class="workshop-grid">
          <NuxtLink v-for="(w, i) in displayWorkshops" :key="i" :to="`/warsztaty/${w.slug}`"
            class="workshop-card reveal" :style="{ transitionDelay: `${i * 60}ms` }">
            <img class="img" :src="w.img" :alt="w.name" />
            <div class="body">
              <div class="head-row">
                <span class="chip">{{ w.cat }}</span>
                <span class="icon-wrap">
                  <DhIcon :name="w.icon" :size="36" :stroke="1.4" />
                </span>
              </div>
              <h4>{{ w.name }}</h4>
              <p>{{ w.desc }}</p>
              <div class="meta">
                <span v-if="w.dur">{{ w.dur }}</span>
                <span v-if="w.date">· {{ w.date }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="all-workshops-cta">
          <NuxtLink class="btn btn-secondary" to="/warsztaty">
            {{ t('Wszystkie warsztaty', 'All workshops') }}
            <DhIcon name="arrow" :size="18" :stroke="1.6" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ─── ACCOMMODATIONS ────────────────────────────────────────── -->
    <section id="noclegi" class="cream" :aria-label="t('Noclegi', 'Accommodation')">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">{{ t('Oferta miejsca', 'Our spaces') }}</span>
          <h2>{{ t('Trzy domy, trzy rytmy.', 'Three houses, three rhythms.') }}</h2>
          <p class="lede">{{ t(
            'Wynajmiemy ci pokój, weekend lub całą stodołę — w zależności od tego, czy przyjeżdżasz solo, w parze, czy z grupą warsztatową.',
            'We can rent you a room, a weekend, or the whole barn — depending on whether you arrive solo, as a couple, or with a workshop group.'
          ) }}</p>
        </div>
        <div v-for="(a, i) in ACCOMMODATIONS" :key="i" class="accommodation reveal" :class="{ reverse: i % 2 === 1 }">
          <div class="acc-imgs">
            <img class="main" :src="a.main" :alt="a.name" />
            <img class="small" :src="a.small" alt="" />
          </div>
          <div class="acc-text">
            <span class="num">{{ a.num }}</span>
            <h3>{{ a.name }}</h3>
            <span class="chip acc-tag">{{ a.tag }}</span>
            <p class="acc-desc">{{ a.desc }}</p>
            <div class="acc-features">
              <div v-for="(f, j) in a.features" :key="j" class="acc-feature">
                <span class="icon">
                  <DhIcon :name="f.i" :size="30" :stroke="1.4" />
                </span>
                {{ f.t }}
              </div>
            </div>
            <div class="acc-price-block">
              <div>
                <div class="price-label">{{ t('Pobyt indywidualny', 'Individual stay') }}</div>
                <div class="price-row">
                  <span class="price-val">{{ a.price }}</span>
                  <span class="price-unit">{{ a.priceFor }}</span>
                </div>
              </div>
            </div>
            <div class="acc-ctas">
              <NuxtLink class="btn btn-primary" :to="a.url">
                {{ t('Zobacz obiekt', 'View property') }}
                <DhIcon name="arrow" :size="18" :stroke="1.6" />
              </NuxtLink>
              <a class="btn btn-secondary" href="mailto:dolina@harmonii.pl">{{ t('Zapytaj o termin', 'Ask about dates') }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── REGION ─────────────────────────────────────────────────── -->
    <section id="izery" class="region-section" :aria-label="t('Magiczne Izery', 'Magical Izeras')">
      <div class="container">
        <div class="region-grid">
          <div class="reveal">
            <span class="eyebrow region-eyebrow">{{ t('Magiczne Izery', 'Magical Izeras') }}</span>
            <h2 class="region-title">{{ t('Najstarsze góry w Polsce, najmniej zatłoczone.', 'The oldest mountains in Poland, the least crowded.') }}</h2>
            <p class="region-desc">
              {{ t(
                'Kopaniec leży w cieniu Izerskich Garbów — pasma uważanego za jedno z najmniej znanych w Polsce. Mchy, torfowiska, kryształy kwarcu w strumieniach, ciemne niebo gwiazd.',
                'Kopaniec lies in the shadow of the Izera Ridge — a range considered one of the least known in Poland. Mosses, peat bogs, quartz crystals in the streams, dark starry skies.'
              ) }}
            </p>
            <p class="region-desc">
              {{ t(
                'Współtworzymy oddolny ruch Magiczne Izery — opowieść o ludziach, miejscach i tradycjach regionu. Polecamy wycieczki, mapy, miejscowych przewodników.',
                'We co-create the grassroots Magical Izeras movement — a story about the people, places and traditions of the region. We recommend hikes, maps and local guides.'
              ) }}
            </p>
            <div class="region-stats">
              <div
                v-for="s in [
                  { n: '600+', l: t('milionów lat geologii', 'million years of geology') },
                  { n: 'III', l: t('stopień ochrony nieba', 'dark sky protection grade') },
                  { n: '14', l: t('tras pieszych w okolicy', 'hiking trails nearby') }
                ]"
                :key="s.n" class="region-stat">
                <div class="num">{{ s.n }}</div>
                <div class="label">{{ s.l }}</div>
              </div>
            </div>
            <div class="region-cta">
              <NuxtLink class="btn btn-primary" to="/dojazd">
                {{ t('Poznaj region', 'Discover the region') }}
                <DhIcon name="arrow" :size="18" :stroke="1.6" />
              </NuxtLink>
            </div>
          </div>
          <div class="reveal region-img-wrap">
            <img src="/kopaniec.avif"
              :alt="t('Góry Izerskie', 'Izera Mountains')" />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── GALLERY ────────────────────────────────────────────────── -->
    <section id="galeria" :aria-label="t('Galeria', 'Gallery')">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">{{ t('Galeria', 'Gallery') }}</span>
          <h2>{{ t('Cztery pory roku w Dolinie.', 'Four seasons in the Valley.') }}</h2>
          <p class="lede">{{ t(
            'Jazdy konne wczesną wiosną, koncerty w stodole, sierpniowe zbiory, ciche zimowe poranki — fragmenty życia miejsca.',
            'Horse rides in early spring, barn concerts, August harvests, quiet winter mornings — glimpses of life in this place.'
          ) }}</p>
        </div>
        <div class="gallery-grid reveal">
          <NuxtImg
            v-for="(g, i) in GALLERY"
            :key="i"
            :src="g.src"
            alt=""
            loading="lazy"
            sizes="(max-width:768px) 50vw, 25vw"
            :class="g.span"
          />
        </div>
      </div>
    </section>

    <!-- ─── TEAM ───────────────────────────────────────────────────── -->
    <section id="zespol" class="cream" :aria-label="t('Zespół i partnerzy', 'Team and partners')">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">{{ t('Zespół &amp; partnerzy', 'Team &amp; partners') }}</span>
          <h2>{{ t('Ludzie, którzy tworzą Dolinę.', 'The people who make the Valley.') }}</h2>
          <p class="lede">{{ t(
            'Niewielka grupa stałych mieszkańców i prowadzących, plus szeroki krąg lokalnych rzemieślniczek, muzyków i przewodników.',
            'A small group of permanent residents and facilitators, plus a wide circle of local craftswomen, musicians and guides.'
          ) }}</p>
        </div>
        <div class="team-grid reveal">
          <div v-for="(m, i) in TEAM" :key="i" class="team-member">
            <img class="photo" :src="m.img" :alt="m.name" loading="lazy" />
            <h4>{{ m.name }}</h4>
            <span class="role">{{ m.role }}</span>
          </div>
        </div>
        <div class="reveal partners-strip">
          <span class="eyebrow">{{ t('Współpracujemy z', 'We work with') }}</span>
          <div class="partners-list">
            <span>Fundacja Harmonia Kultury</span>
            <span>· Magiczne Izery</span>
            <span>· Slow Hood Karkonosze</span>
            <span>· Izerski Park Ciemnego Nieba</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CONTACT FORM ────────────────────────────────────────────── -->
    <ContactForm />
  </div>
</template>

<style scoped>
/* Page-specific styles only. Base styles moved to main.css */

/* ─── Hero ──────────────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(58, 75, 32, .15) 0%, rgba(58, 75, 32, .05) 30%, rgba(253, 251, 247, 0) 60%, rgba(253, 251, 247, .95) 100%);
  pointer-events: none;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1100px;
  padding: 0 32px;
  margin-top: 40px;
}

.hero-eyebrow-row {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  color: rgba(253, 251, 247, 0.9);
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.hero-eyebrow-row .line {
  width: 40px;
  height: 1px;
  background: currentColor;
  opacity: .5;
}

.hero-tagline {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(28px, 3.2vw, 44px);
  line-height: 1.2;
  font-weight: 400;
  max-width: 680px;
  margin: 0 auto 40px;
  color: #FAF8F2;
  text-shadow: 0 2px 30px rgba(58, 75, 32, .4);
}

.hero-ctas {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 40px;
}

.hero-meta {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  padding: 0 64px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(253, 251, 247, .85);
}

.hero-meta span {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ─── Intro ─────────────────────────────────────────────────────── */
.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.intro-text .lead {
  font-family: var(--serif);
  font-size: 28px;
  line-height: 1.4;
  color: var(--brand-primary);
  margin-top: 16px;
  margin-bottom: 32px;
  font-weight: 400;
}

.desc-muted {
  color: var(--text-muted);
  margin-bottom: 16px;
}

.intro-stats {
  margin-top: 32px;
  display: flex;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.stat-num {
  font-family: var(--serif);
  font-size: 36px;
  color: var(--brand-primary);
  font-weight: 500;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 6px;
  letter-spacing: 0.04em;
}

.intro-image-wrap {
  position: relative;
}

.intro-main-img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  border-radius: var(--r-md);
  box-shadow: var(--shadow-md);
}

.intro-badge {
  position: absolute;
  bottom: -32px;
  left: -32px;
  background: var(--bg-card);
  padding: 20px 24px;
  border-radius: var(--r-md);
  box-shadow: var(--shadow-md);
  max-width: 260px;
  border: 1px solid var(--line);
}

.badge-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.badge-ic {
  color: var(--accent-earth);
}

.badge-label {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-earth);
}

.badge-text {
  font-family: var(--serif);
  font-size: 18px;
  color: var(--brand-primary);
  line-height: 1.3;
}

/* ─── Workshops ─────────────────────────────────────────────────── */
.workshops-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 56px;
  gap: 48px;
}

.section-title {
  margin-top: 16px;
}

.workshop-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.workshop-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform .3s, box-shadow .3s;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.workshop-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.workshop-card .img {
  aspect-ratio: 4/5;
  width: 100%;
  object-fit: cover;
}

.workshop-card .body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.workshop-card .head-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.workshop-card .icon-wrap {
  width: 36px;
  height: 36px;
  color: var(--brand-primary);
  flex-shrink: 0;
}

.workshop-card h4 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  margin: 0;
}

.workshop-card .meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 4px;
}

.workshop-card p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
}

.all-workshops-cta {
  text-align: center;
  margin-top: 56px;
}

/* ─── Accommodations ────────────────────────────────────────────── */
.accommodation {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 140px;
}

.accommodation:last-child {
  margin-bottom: 0;
}

.accommodation.reverse {
  grid-template-columns: 1fr 1.1fr;
}

.accommodation.reverse .acc-imgs {
  order: 2;
}

.accommodation.reverse .acc-text {
  order: 1;
}

.acc-imgs {
  position: relative;
  aspect-ratio: 4/5;
}

.acc-imgs .main {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--r-md);
}

.acc-imgs .small {
  position: absolute;
  width: 45%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: var(--r-md);
  border: 8px solid var(--bg-primary);
  box-shadow: var(--shadow-md);
}

.accommodation:not(.reverse) .acc-imgs .small {
  bottom: -40px;
  right: -40px;
}

.accommodation.reverse .acc-imgs .small {
  bottom: -40px;
  left: -40px;
}

.acc-text .num {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--accent-earth);
  text-transform: uppercase;
  margin-bottom: 20px;
  display: block;
}

.acc-text h3 {
  font-size: 48px;
  margin-bottom: 20px;
}

.acc-tag {
  margin-bottom: 20px;
  display: inline-flex;
}

.acc-desc {
  color: var(--text-muted);
  margin-bottom: 28px;
  max-width: 480px;
}

.acc-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 32px;
  margin-bottom: 32px;
  max-width: 480px;
}

.acc-feature {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  color: var(--text-main);
}

.acc-feature .icon {
  width: 30px;
  height: 30px;
  color: var(--accent-earth);
  flex-shrink: 0;
}

.acc-price-block {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 20px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  max-width: 480px;
}

.price-label {
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 4px;
}

.price-val {
  font-family: var(--serif);
  font-size: 32px;
  color: var(--brand-primary);
}

.price-unit {
  font-size: 14px;
  color: var(--text-muted);
}

.acc-ctas {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

/* ─── Region ────────────────────────────────────────────────────── */
.region-section {
  background: var(--brand-primary) !important;
  color: var(--bg-primary);
  padding: 140px 0 !important;
}

.region-eyebrow {
  color: var(--cta-main);
}

.region-title {
  margin-top: 16px;
  margin-bottom: 28px;
  color: var(--bg-primary);
}

.region-desc {
  color: rgba(253, 251, 247, 0.75);
  margin-bottom: 20px;
}

.region-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: center;
}

.region-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 40px;
}

.region-stat {
  border-top: 1px solid rgba(253, 251, 247, .2);
  padding-top: 16px;
}

.region-stat .num {
  font-family: var(--serif);
  font-size: 40px;
  font-weight: 500;
  color: var(--cta-main);
  line-height: 1;
  margin-bottom: 8px;
}

.region-stat .label {
  font-size: 12px;
  color: rgba(253, 251, 247, .7);
  letter-spacing: 0.04em;
}

.region-cta {
  margin-top: 40px;
}

.region-img-wrap {
  aspect-ratio: 4/5;
  border-radius: var(--r-md);
  overflow: hidden;
}

.region-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ─── Gallery ───────────────────────────────────────────────────── */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 240px;
  gap: 12px;
}

.gallery-grid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--r-sm);
  transition: opacity .3s;
}

.gallery-grid img:hover {
  opacity: .9;
}

.gallery-grid .span-2-col {
  grid-column: span 2;
}

.gallery-grid .span-2-row {
  grid-row: span 2;
}

/* ─── Team ──────────────────────────────────────────────────────── */
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.team-member {
  text-align: left;
}

.team-member .photo {
  aspect-ratio: 3/4;
  width: 100%;
  object-fit: cover;
  border-radius: var(--r-md);
  margin-bottom: 16px;
  filter: saturate(0.85);
}

.team-member h4 {
  font-family: var(--serif);
  margin-bottom: 4px;
}

.team-member .role {
  font-size: 13px;
  color: var(--accent-earth);
  font-family: var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.partners-strip {
  margin-top: 80px;
  padding: 40px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.partners-list {
  display: flex;
  gap: 48px;
  flex: 1;
  justify-content: space-around;
  flex-wrap: wrap;
  font-family: var(--serif);
  font-size: 18px;
  color: var(--brand-primary);
  font-style: italic;
}

/* ─── Responsive ────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .intro-grid,
  .region-grid,
  .accommodation,
  .accommodation.reverse {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .accommodation.reverse .acc-imgs { order: 0; }
  .accommodation.reverse .acc-text { order: 0; }
  .workshop-grid { grid-template-columns: repeat(2, 1fr); }
  .team-grid { grid-template-columns: repeat(2, 1fr); }
  .gallery-grid { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; }
  .gallery-grid .span-2-col { grid-column: span 2; }
  .gallery-grid .span-2-row { grid-row: span 1; }
  .workshops-head { flex-direction: column; align-items: flex-start; gap: 16px; }
  .hero-meta { padding: 0 24px; gap: 12px; flex-wrap: wrap; justify-content: center; }
  .accommodation { margin-bottom: 96px; }
  .accommodation:not(.reverse) .acc-imgs .small,
  .accommodation.reverse .acc-imgs .small { bottom: -24px; right: -16px; left: auto; }
}

@media (max-width: 720px) {
  .workshop-grid { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
  .gallery-grid { grid-template-columns: 1fr 1fr; grid-auto-rows: 180px; }
  .gallery-grid .span-2-col,
  .gallery-grid .span-2-row { grid-column: auto; grid-row: auto; }
  .intro-stats { flex-wrap: wrap; gap: 16px; }
  .stat-num { font-size: 28px; }
  .acc-features { grid-template-columns: 1fr; }
  .acc-text h3 { font-size: 36px; }
  .region-stats { grid-template-columns: 1fr; }
  .hero-content { padding: 0 24px; }
  .hero-ctas { flex-direction: column; align-items: stretch; }
  .partners-list { gap: 16px; font-size: 15px; justify-content: center; }
  .partners-strip { flex-direction: column; align-items: flex-start; gap: 16px; }
  .intro-badge { left: 16px; right: 16px; bottom: -16px; max-width: none; }
}
</style>
