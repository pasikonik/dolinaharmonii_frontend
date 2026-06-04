<script setup lang="ts">
import { DEFAULT_PRICING } from '~~/types/directus'

const { getPricing } = useDirectus()

const { data: pricingData } = await useAsyncData('prices-studio', async () => {
  try { return await getPricing() } catch { return null }
})
const p = computed(() => pricingData.value?.data ?? DEFAULT_PRICING)

function fmt(n: number): string {
  return n.toLocaleString('pl-PL')
}

const origin = useRequestURL().origin

useSeoMeta({
  title: 'Studio z oranżerią — Dolina Harmonii',
  description: () => `Kameralny apartament z przeszklonym salonem-oranżerią, łożem małżeńskim i widokiem na sad. Od ${fmt(p.value.studio_room)} zł / noc.`,
  ogTitle: 'Studio z oranżerią · Dolina Harmonii',
  ogDescription: 'Osobny apartament z klimatyczną oranżerią jako salonem — łoże małżeńskie, aneks kuchenny, widok na sad.',
  ogUrl: `${origin}/noclegi/studio-z-oranzeria`,
  ogImage: `${origin}/miejsce/oranzeria.avif`,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Studio z oranżerią — Dolina Harmonii',
  twitterDescription: 'Apartament z przeszklonym salonem-oranżerią i widokiem na sad owocowy.',
  twitterImage: `${origin}/miejsce/oranzeria.avif`,
})

useHead({
  script: [{
    key: 'ld-studio',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Studio z oranżerią — Dolina Harmonii',
      description: 'Osobny, kameralny apartament z przeszklonym salonem-oranżerią i widokiem na sad owocowy.',
      url: `${origin}/noclegi/studio-z-oranzeria`,
      email: 'dolinaharmonii@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kopaniec',
        addressRegion: 'Dolny Śląsk',
        addressCountry: 'PL',
      },
      image: `${origin}/miejsce/oranzeria.avif`,
      numberOfRooms: 1,
      petsAllowed: true,
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Oranżeria', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Aneks kuchenny', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Zwierzęta akceptowane', value: true },
      ],
    }),
  }],
})

const STUDIO_FEATURES = [
  { icon: 'bed',       t: 'Łoże + rozkładana sofa',  d: 'Duże łóżko małżeńskie i rozkładana sofa — wygodny nocleg dla 2 lub 3 osób.' },
  { icon: 'leaf',      t: 'Salon-oranżeria',          d: 'Serce apartamentu — przeszklony salon z widokiem na ogród i sad owocowy.' },
  { icon: 'kitchen',   t: 'Aneks kuchenny',           d: 'Kompaktowy, w pełni wyposażony aneks kuchenny do samodzielnego gotowania.' },
  { icon: 'bath',      t: 'Łazienka z prysznicem',    d: 'Prywatna łazienka z prysznicem — tylko do Twojej dyspozycji.' },
  { icon: 'tea',       t: 'Widok na sad',             d: 'Z oranżerii rozciąga się spokojny widok na sad owocowy i zieleń Doliny.' },
  { icon: 'star',      t: 'Pełna prywatność',         d: 'Osobny budynek, własne wejście — cisza i intymność dla pary lub małej rodziny.' },
]

const GALLERY = [
  { src: '/miejsce/Oranzeria/oranzeria_1.jpg', title: 'Studio z oranżerią — 1' },
  { src: '/miejsce/Oranzeria/oranzeria_2.jpg', title: 'Studio z oranżerią — 2' },
  { src: '/miejsce/Oranzeria/oranzeria_3.jpg', title: 'Studio z oranżerią — 3' },
  { src: '/miejsce/Oranzeria/oranzeria_4.jpg', title: 'Studio z oranżerią — 4' },
  { src: '/miejsce/Oranzeria/oranzeria_5.jpg', title: 'Studio z oranżerią — 5' },
  { src: '/miejsce/Oranzeria/oranzeria_6.jpg', title: 'Studio z oranżerią — 6' },
  { src: '/miejsce/Oranzeria/oranzeria_7.jpg', title: 'Studio z oranżerią — 7' },
  { src: '/miejsce/Oranzeria/oranzeria_8.jpg', title: 'Studio z oranżerią — 8' },
  { src: '/miejsce/Oranzeria/oranzeria_9.jpg', title: 'Studio z oranżerią — 9' },
  { src: '/miejsce/oranzeria.avif',            title: 'Studio z oranżerią — widok zewnętrzny' },
  { src: '/miejsce/oranzeria-inside.avif',     title: 'Studio z oranżerią — wnętrze' },
]

const lbIndex = ref<number | null>(null)
function openLightbox(imgIndex: number) { lbIndex.value = imgIndex }

useScrollReveal({ threshold: 0.08 })
</script>

<template>
  <div class="studio-page">

    <!-- ─── HERO ──────────────────────────────────────────────────── -->
    <header class="hero-sub">
      <img class="bg" src="/miejsce/oranzeria.avif" alt="" />
      <div class="container">
        <nav aria-label="Breadcrumb" class="crumb">
          <ol>
            <li><NuxtLink to="/#noclegi">Noclegi</NuxtLink></li>
            <li aria-current="page">Studio z oranżerią</li>
          </ol>
        </nav>
        <h1>Studio z&nbsp;oranżerią</h1>
        <p class="hero-lede">Osobny, kameralny apartament z klimatycznym salonem w postaci przeszklonej oranżerii — idealne schronienie dla pary lub małej rodziny.</p>
        <div class="quick-meta">
          <span>Do 3 osób</span>
          <span>· Łoże małżeńskie</span>
          <span>· Oranżeria · Kuchnia</span>
          <span>· Widok na sad</span>
          <span>· Od {{ fmt(p.studio_room) }} zł / noc</span>
        </div>
      </div>
    </header>

    <!-- ─── O STUDIO ─────────────────────────────────────────────── -->
    <section class="tight">
      <div class="container">
        <div class="intro-grid">
          <div class="reveal">
            <span class="eyebrow">O obiekcie</span>
            <h2 class="section-title">Własna przestrzeń z duszą.</h2>
            <div class="desc-text">
              <p>
                Osobny, kameralny obiekt z klimatycznym salonem w postaci przeszklonej oranżerii. Łoże małżeńskie, rozkładana sofa, aneks kuchenny i łazienka.
              </p>
              <p>
                Idealne dla pary szukającej intymności lub trójki gości pragnących osobnej przestrzeni z widokiem na sad.
              </p>
            </div>
            <table class="spec-table">
              <caption class="sr-only">Parametry techniczne Studia z oranżerią</caption>
              <tbody>
                <tr><td>Typ</td><td>Osobny apartament · własne wejście</td></tr>
                <tr><td>Liczba osób</td><td>do 3 (przy rozłożonej sofie)</td></tr>
                <tr><td>Sypialnia</td><td>duże łóżko małżeńskie</td></tr>
                <tr><td>Salon / oranżeria</td><td>przeszklony · rozkładana sofa · widok na sad</td></tr>
                <tr><td>Kuchnia</td><td>aneks kuchenny · pełne wyposażenie</td></tr>
                <tr><td>Łazienka</td><td>1 · z prysznicem</td></tr>
                <tr><td>Zwierzęta</td><td>grzeczne psy mile widziane</td></tr>
              </tbody>
            </table>
          </div>

          <div class="reveal">
            <div class="img-stack">
              <button class="img-btn img-btn--tall" @click="openLightbox(0)" aria-label="Otwórz galerię Studia z oranżerią">
                <img src="/miejsce/Oranzeria/oranzeria_1.jpg" alt="Studio z oranżerią — wnętrze" />
              </button>
              <button class="img-btn" @click="openLightbox(9)" aria-label="Otwórz galerię Studia z oranżerią">
                <img src="/miejsce/oranzeria.avif" alt="Studio z oranżerią — zewnątrz" />
              </button>
              <button class="img-btn" @click="openLightbox(1)" aria-label="Otwórz galerię Studia z oranżerią">
                <img src="/miejsce/Oranzeria/oranzeria_2.jpg" alt="Studio z oranżerią — detal" />
              </button>
            </div>
            <button class="gallery-btn" @click="openLightbox(0)">
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
          <span class="eyebrow">Co znajdziesz w Studio</span>
          <h2>Komfort i prywatność w sercu Doliny.</h2>
          <p class="lede">Studio z oranżerią to apartament zaprojektowany z myślą o parach i małych rodzinach — własna przestrzeń, ciepło drewna i bliskość natury.</p>
        </div>
        <div class="features-grid">
          <div v-for="(f, i) in STUDIO_FEATURES" :key="i" class="feat-card reveal">
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
          <h2>Zarezerwuj Studio z oranżerią.</h2>
          <p class="lede">Studio wynajmujemy w całości — dla pary, trojga znajomych lub rodziny z dzieckiem.</p>
        </div>

        <div class="price-options-grid">
          <div class="price-tile-card reveal">
            <span class="pt-label-tag">Pobyt weekendowy</span>
            <span class="pt-price-big">{{ fmt(p.studio_room) }} zł</span>
            <span class="pt-unit-text">całe studio / noc · do 3 osób</span>
          </div>
          <div class="price-tile-card featured-tile reveal">
            <span class="pt-label-tag">Pobyt tygodniowy</span>
            <span class="pt-price-big">{{ fmt(p.studio_room * 6) }} zł</span>
            <span class="pt-unit-text">7 nocy · całe studio · oszczędzasz jedną dobę</span>
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

  <DhLightbox v-model="lbIndex" :images="GALLERY" title="Studio z oranżerią" />
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
.hero-sub h1 { font-size: clamp(48px, 6vw, 96px); color: #FAF8F2; font-style: italic; font-weight: 500; line-height: 1; margin-bottom: 24px; letter-spacing: -0.02em; }
.hero-lede { font-family: var(--serif); font-size: 22px; max-width: 600px; color: rgba(250,248,242,.9); margin-bottom: 0; }
.quick-meta { display: flex; gap: 48px; margin-top: 56px; flex-wrap: wrap; padding-top: 32px; border-top: 1px solid rgba(250,248,242,.2); font-family: var(--mono); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: rgba(250,248,242,.85); }

/* Intro grid */
.intro-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: start; }
.section-title { margin-top: 16px; margin-bottom: 28px; }
.desc-text p { color: var(--text-muted); margin-bottom: 18px; }

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
