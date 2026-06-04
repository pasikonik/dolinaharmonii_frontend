<script setup lang="ts">
import { DEFAULT_PRICING } from '~~/types/directus'

const { getPricing } = useDirectus()

const { data: pricingData } = await useAsyncData('prices-lesny-domek', async () => {
  try { return await getPricing() } catch { return null }
})
const p = computed(() => pricingData.value?.data ?? DEFAULT_PRICING)

function fmt(n: number): string {
  return n.toLocaleString('pl-PL')
}

const origin = useRequestURL().origin

useSeoMeta({
  title: 'Leśny Domek — Dolina Harmonii',
  description: () => `Dwupoziomowy domek w zaciszu drzew dla do 5 osób. Kominek, kuchnia, widok na Wiśniową Górę. Od ${fmt(p.value.forest_house)} zł / noc.`,
  ogTitle: 'Leśny Domek · Dolina Harmonii',
  ogDescription: 'Osobny, dwupoziomowy domek ukryty w lesie — kominek, pełna kuchnia, widok na Wiśniową Górę. Koty i psy mile widziane.',
  ogUrl: `${origin}/noclegi/lesny-domek`,
  ogImage: `${origin}/miejsce/lesny-domek.avif`,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Leśny Domek — Dolina Harmonii',
  twitterDescription: 'Dwupoziomowy domek w lesie dla do 5 osób, z kominkiem i widokiem na góry.',
  twitterImage: `${origin}/miejsce/lesny-domek.avif`,
})

useHead({
  script: [{
    key: 'ld-cottage',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Leśny Domek — Dolina Harmonii',
      description: 'Osobny, dwupoziomowy domek w zaciszu drzew dla do 5 osób. Kominek, pełna kuchnia, widok na Wiśniową Górę.',
      url: `${origin}/noclegi/lesny-domek`,
      email: 'dolinaharmonii@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kopaniec',
        addressRegion: 'Dolny Śląsk',
        addressCountry: 'PL',
      },
      image: `${origin}/miejsce/lesny-domek.avif`,
      numberOfRooms: 1,
      petsAllowed: true,
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Kominek', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Kuchnia', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Zwierzęta akceptowane', value: true },
      ],
    }),
  }],
})

const DOMEK_FEATURES = [
  { icon: 'bed',       t: 'Łoże + 2 łóżka',        d: 'Bardzo duże łóżko podwójne i dwa łóżka pojedyncze w sypialni na piętrze.' },
  { icon: 'tea',       t: 'Kanapa rozkładana',       d: 'Salon na parterze z wygodną kanapą rozkładaną — razem do 5 osób.' },
  { icon: 'kitchen',   t: 'Kuchnia i jadalnia',      d: 'W pełni wyposażony aneks kuchenny z miejscem do wspólnych posiłków.' },
  { icon: 'fireplace', t: 'Salon z kominkiem',       d: 'Przytulny salon z trzaskającym kominkiem — idealne na chłodne wieczory.' },
  { icon: 'leaf',      t: 'Widok na Wiśniową Górę',  d: 'Panorama na Wiśniową Górę, leśny labirynt, staw i osadę z owieczkami.' },
  { icon: 'star',      t: 'Zwierzęta mile widziane', d: 'Akceptujemy koty, średnie i małe psy. Prosimy o info przy rezerwacji.' },
]

const GALLERY = [
  { src: '/miejsce/Lesny Domek/lesny_domek_01.avif', title: 'Leśny Domek — 1' },
  { src: '/miejsce/Lesny Domek/lesny_domek_02.avif', title: 'Leśny Domek — 2' },
  { src: '/miejsce/Lesny Domek/lesny_domek_03.avif', title: 'Leśny Domek — 3' },
  { src: '/miejsce/Lesny Domek/lesny_domek_04.avif', title: 'Leśny Domek — 4' },
  { src: '/miejsce/Lesny Domek/lesny_domek_05.avif', title: 'Leśny Domek — 5' },
  { src: '/miejsce/Lesny Domek/lesny_domek_06.avif', title: 'Leśny Domek — 6' },
  { src: '/miejsce/Lesny Domek/lesny_domek_07.avif', title: 'Leśny Domek — 7' },
  { src: '/miejsce/Lesny Domek/lesny_domek_08.avif', title: 'Leśny Domek — 8' },
  { src: '/miejsce/Lesny Domek/lesny_domek_09.avif', title: 'Leśny Domek — 9' },
  { src: '/miejsce/Lesny Domek/lesny_domek_10.avif', title: 'Leśny Domek — 10' },
  { src: '/miejsce/Lesny Domek/lesny_domek_11.avif', title: 'Leśny Domek — 11' },
]

const lbIndex = ref<number | null>(null)
function openLightbox(imgIndex: number) { lbIndex.value = imgIndex }

useScrollReveal({ threshold: 0.08 })
</script>

<template>
  <div class="lesny-domek-page">

    <!-- ─── HERO ──────────────────────────────────────────────────── -->
    <header class="hero-sub">
      <img class="bg" src="/miejsce/lesny-domek.avif" alt="" />
      <div class="container">
        <nav aria-label="Breadcrumb" class="crumb">
          <ol>
            <li><NuxtLink to="/#noclegi">Noclegi</NuxtLink></li>
            <li aria-current="page">Leśny Domek</li>
          </ol>
        </nav>
        <h1>Leśny Domek</h1>
        <p class="hero-lede">Osobny, dwupoziomowy domek ukryty w zaciszu, pośród drzew. Na dole salon z kominkiem i kuchnia, na piętrze sypialnia z widokiem na góry.</p>
        <div class="quick-meta">
          <span>Do 5 osób</span>
          <span>· 50 m²</span>
          <span>· Kominek · Kuchnia</span>
          <span>· Zwierzęta OK</span>
          <span>· Od {{ fmt(p.forest_house) }} zł / noc</span>
        </div>
      </div>
    </header>

    <!-- ─── O DOMKU ──────────────────────────────────────────────── -->
    <section class="tight">
      <div class="container">
        <div class="intro-grid">
          <div class="reveal">
            <span class="eyebrow">O obiekcie</span>
            <h2 class="section-title">Domek w zaciszu, pośród drzew.</h2>
            <div class="desc-text">
              <p>
                Domek w zaciszu, pośród drzew. Z okien rozciąga się widok na Osadę z owieczkami, leśny labirynt, staw oraz Wiśniową Górę. Na dole — salon oraz kuchnia, na piętrze — część sypialna. To wymarzone miejsce na odpoczynek.
              </p>
              <p class="note">
                Ważne: w Domku schody są strome oraz parkujemy pod Domem Gościnnym.
              </p>
            </div>
            <table class="spec-table">
              <caption class="sr-only">Parametry techniczne Leśnego Domku</caption>
              <tbody>
                <tr><td>Powierzchnia</td><td>50 m²</td></tr>
                <tr><td>Liczba osób</td><td>do 5 (przy rozłożonej sofie)</td></tr>
                <tr><td>Sypialnia (piętro)</td><td>bardzo duże łóżko podwójne · 2 łóżka pojedyncze</td></tr>
                <tr><td>Salon (parter)</td><td>kanapa rozkładana · kuchnia · jadalnia · kominek</td></tr>
                <tr><td>Łazienka</td><td>1 · z prysznicem</td></tr>
                <tr><td>Zwierzęta</td><td>koty, średnie i małe psy mile widziane</td></tr>
                <tr><td>Uwaga</td><td>strome schody · parking pod Dużym Domem</td></tr>
              </tbody>
            </table>
          </div>

          <div class="reveal">
            <div class="img-stack">
              <button class="img-btn img-btn--tall" @click="openLightbox(0)" aria-label="Otwórz galerię Leśnego Domku">
                <img src="/miejsce/Lesny Domek/lesny_domek_01.avif" alt="Leśny Domek — wnętrze" />
              </button>
              <button class="img-btn" @click="openLightbox(1)" aria-label="Otwórz galerię Leśnego Domku">
                <img src="/miejsce/Lesny Domek/lesny_domek_02.avif" alt="Leśny Domek — wnętrze" />
              </button>
              <button class="img-btn" @click="openLightbox(2)" aria-label="Otwórz galerię Leśnego Domku">
                <img src="/miejsce/Lesny Domek/lesny_domek_03.avif" alt="Leśny Domek — zewnątrz" />
              </button>
            </div>
            <button class="gallery-btn reveal" @click="openLightbox(0)">
              <DhIcon name="star" :size="16" :stroke="1.5" />
              Zobacz wszystkie {{ GALLERY.length }} zdjęcia
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CECHY ─────────────────────────────────────────────────── -->
    <section class="cream">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Co znajdziesz w Domku</span>
          <h2>Wszystko, czego potrzeba na spokojny pobyt.</h2>
          <p class="lede">Leśny Domek jest w pełni wyposażony — przyjeżdżasz z bagażem, wychodzisz z głową pełną wspomnień.</p>
        </div>
        <div class="features-grid">
          <div v-for="(f, i) in DOMEK_FEATURES" :key="i" class="feat-card reveal">
            <span class="feat-icon"><DhIcon :name="f.icon" :size="48" :stroke="1.4" /></span>
            <h4>{{ f.t }}</h4>
            <p>{{ f.d }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── GALERIA ────────────────────────────────────────────────── -->
    <section class="tight">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Galeria</span>
          <h2>Zajrzyj do środka.</h2>
        </div>
        <div class="photo-grid reveal">
          <button
            v-for="(img, k) in GALLERY" :key="k"
            class="photo-tile"
            :class="{ tall: k === 0 || k === 5 }"
            @click="openLightbox(k)"
            :aria-label="`Otwórz zdjęcie ${k + 1}`"
          >
            <img :src="img.src" :alt="img.alt" loading="lazy" />
          </button>
        </div>
      </div>
    </section>

    <!-- ─── CENNIK & REZERWACJA ───────────────────────────────────── -->
    <section class="cream" id="rezerwacja">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Cennik &amp; rezerwacja</span>
          <h2>Zarezerwuj Leśny Domek.</h2>
          <p class="lede">Leśny Domek wynajmujemy w całości — dla pary, rodziny lub małej grupy przyjaciół.</p>
        </div>

        <div class="price-options-grid">
          <div class="price-tile-card reveal">
            <span class="pt-label-tag">Pobyt weekendowy</span>
            <span class="pt-price-big">{{ fmt(p.forest_house) }} zł</span>
            <span class="pt-unit-text">cały domek / noc · do 5 osób</span>
          </div>
          <div class="price-tile-card featured-tile reveal">
            <span class="pt-label-tag">Pobyt tygodniowy</span>
            <span class="pt-price-big">{{ fmt(p.forest_house * 6) }} zł</span>
            <span class="pt-unit-text">7 nocy · cały domek · oszczędzasz jedną dobę</span>
          </div>
          <div class="price-tile-card reveal">
            <span class="pt-label-tag">Minimalna długość</span>
            <span class="pt-price-big">2 noce</span>
            <span class="pt-unit-text">w sezonie maj–październik · poza sezonem elastycznie</span>
          </div>
        </div>

        <div class="booking-cta-bar reveal">
          <div class="cta-text-content">
            <h3 class="cta-title">Zapytaj o termin</h3>
            <p class="cta-desc">Napisz lub zadzwoń — odpowiadamy w ciągu 48 godzin. Rezerwację potwierdzamy dwuetapowo: najpierw termin, potem zaliczka.</p>
          </div>
          <div class="cta-buttons-wrap">
            <a class="btn btn-primary" href="mailto:dolinaharmonii@gmail.com">
              Napisz do nas
              <DhIcon name="arrow" :size="14" :stroke="1.6" />
            </a>
            <NuxtLink class="btn btn-secondary" to="/#noclegi">Zobacz inne obiekty</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>

  <DhLightbox v-model="lbIndex" :images="GALLERY" title="Leśny Domek" />
</template>

<style scoped>
/* Hero */
.hero-sub { min-height: 78vh; padding-top: 140px; padding-bottom: 80px; display: flex; align-items: end; position: relative; background: var(--brand-primary); color: var(--bg-primary); overflow: hidden; }
.hero-sub::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(27,48,34,.25) 0%, rgba(27,48,34,.72) 100%); z-index: 1; }
.hero-sub img.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .75; }
.hero-sub .container { position: relative; z-index: 2; }
.hero-sub .crumb { font-family: var(--mono); font-size: 11px; letter-spacing: .15em; text-transform: uppercase; color: var(--cta-main); margin-bottom: 24px; }
.hero-sub .crumb ol { list-style: none; padding: 0; margin: 0; display: flex; gap: 8px; align-items: center; }
.hero-sub .crumb li + li::before { content: '/'; opacity: 0.5; margin-right: 8px; }
.hero-sub .crumb a { color: inherit; text-decoration: none; opacity: 0.7; }
.hero-sub .crumb a:hover { opacity: 1; }
.hero-sub .crumb [aria-current="page"] { opacity: 1; }
.hero-sub h1 { font-size: clamp(56px, 7vw, 104px); color: #FAF8F2; font-style: italic; font-weight: 500; line-height: 1; margin-bottom: 24px; letter-spacing: -0.02em; }
.hero-lede { font-family: var(--serif); font-size: 22px; max-width: 600px; color: rgba(250,248,242,.9); margin-bottom: 0; }
.quick-meta { display: flex; gap: 48px; margin-top: 56px; flex-wrap: wrap; padding-top: 32px; border-top: 1px solid rgba(250,248,242,.2); font-family: var(--mono); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: rgba(250,248,242,.85); }

/* Intro grid */
.intro-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: start; }
.section-title { margin-top: 16px; margin-bottom: 28px; }
.desc-text p { color: var(--text-muted); margin-bottom: 18px; }
.desc-text .note { font-family: var(--mono); font-size: 12px; letter-spacing: .06em; color: var(--accent-earth); background: rgba(180,140,80,.08); border-left: 3px solid var(--accent-earth); padding: 12px 16px; border-radius: 0 var(--r-sm) var(--r-sm) 0; margin-top: 8px; }

/* Spec table */
.spec-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
.spec-table tr { border-top: 1px solid var(--line); }
.spec-table tr:last-child { border-bottom: 1px solid var(--line); }
.spec-table td { padding: 16px 0; font-size: 14px; vertical-align: top; }
.spec-table td:first-child { color: var(--text-muted); font-family: var(--mono); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; width: 38%; }
.spec-table td:last-child { color: var(--brand-primary); font-weight: 500; }

/* Img stack */
.img-stack { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; gap: 12px; }
.img-btn { display: block; padding: 0; border: none; background: none; cursor: zoom-in; border-radius: var(--r-md); overflow: hidden; }
.img-btn--tall { grid-column: 1; grid-row: 1 / 3; }
.img-btn:not(.img-btn--tall):nth-child(2) { grid-column: 2; grid-row: 1; }
.img-btn:not(.img-btn--tall):nth-child(3) { grid-column: 2; grid-row: 2; }
.img-btn img { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; transition: transform .4s ease; }
.img-btn--tall img { aspect-ratio: 4/9; }
.img-btn:hover img { transform: scale(1.04); }

.gallery-btn { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; padding: 10px 20px; border: 1px solid var(--line); border-radius: 100px; background: transparent; cursor: pointer; font-family: var(--mono); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); transition: background .2s, color .2s, border-color .2s; }
.gallery-btn:hover { background: var(--brand-primary); color: var(--bg-primary); border-color: var(--brand-primary); }

/* Features */
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.feat-card { display: flex; flex-direction: column; gap: 12px; padding: 24px; background: var(--bg-card); border-radius: var(--r-md); border: 1px solid var(--line); }
.feat-icon { width: 48px; height: 48px; color: var(--accent-earth); }
.feat-card h4 { font-family: var(--serif); font-size: 18px; margin-top: 8px; color: var(--brand-primary); }
.feat-card p { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

/* Photo grid */
.photo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.photo-tile { display: block; padding: 0; border: none; background: none; cursor: zoom-in; overflow: hidden; border-radius: var(--r-sm); }
.photo-tile.tall { grid-row: span 2; }
.photo-tile img { width: 100%; height: 100%; object-fit: cover; aspect-ratio: 1; display: block; transition: transform .4s ease; }
.photo-tile.tall img { aspect-ratio: 1/2; }
.photo-tile:hover img { transform: scale(1.06); }

/* Pricing */
.price-options-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 64px; }
.price-tile-card { background: var(--bg-card); padding: 28px; border-radius: var(--r-md); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 8px; }
.featured-tile { background: var(--brand-primary); color: var(--bg-primary); border-color: var(--brand-primary); }
.pt-label-tag { font-family: var(--mono); font-size: 11px; letter-spacing: .15em; text-transform: uppercase; color: var(--accent-earth); }
.featured-tile .pt-label-tag { color: var(--cta-main); }
.pt-price-big { font-family: var(--serif); font-size: 36px; color: var(--brand-primary); line-height: 1; }
.featured-tile .pt-price-big { color: var(--bg-primary); }
.pt-unit-text { font-size: 13px; color: var(--text-muted); }
.featured-tile .pt-unit-text { color: rgba(250,248,242,.7); }

.booking-cta-bar { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-md); padding: 40px 48px; display: flex; justify-content: space-between; align-items: center; gap: 32px; flex-wrap: wrap; }
.cta-title { color: var(--brand-primary); margin-bottom: 8px; }
.cta-desc { color: var(--text-muted); }
.cta-buttons-wrap { display: flex; gap: 12px; flex-shrink: 0; }


/* ─── Responsive ────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .intro-grid { grid-template-columns: 1fr; gap: 48px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .price-options-grid { grid-template-columns: 1fr; }
  .photo-grid { grid-template-columns: repeat(3, 1fr); }
  .quick-meta { gap: 16px 32px; }
}

@media (max-width: 720px) {
  .hero-sub { min-height: 60vh; padding-top: 120px; padding-bottom: 56px; }
  .quick-meta { gap: 8px; padding-top: 24px; margin-top: 32px; flex-direction: column; }
  .features-grid { grid-template-columns: 1fr; }
  .photo-grid { grid-template-columns: repeat(2, 1fr); }
  .img-stack { grid-template-columns: 1fr; grid-template-rows: auto; }
  .img-btn--tall { grid-column: 1; grid-row: auto; }
  .img-btn:not(.img-btn--tall):nth-child(2) { grid-column: 1; grid-row: auto; }
  .img-btn:not(.img-btn--tall):nth-child(3) { grid-column: 1; grid-row: auto; }
  .img-btn--tall img { aspect-ratio: 4/5; }
  .booking-cta-bar { padding: 28px; flex-direction: column; align-items: stretch; }
  .cta-buttons-wrap { flex-direction: column; }
}
</style>
