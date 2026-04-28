<script setup lang="ts">
useSeoMeta({
  title: 'Duży Dom — Dolina Harmonii',
  description: 'Drewniany Dom Gościnny z pięcioma przytulnymi pokojami. Kominek w salonie, sala warsztatowa, sauna infrared. Od 320 zł / pokój.',
})

const ROOMS = [
  {
    name: 'Słoneczny',
    who: '3-osobowy pokój na piętrze',
    images: [
      '/sloneczny-1.avif',
      '/sloneczny-2.avif',
      '/sloneczny-3.avif',
    ],
    lead: 'Najjaśniejszy pokój w Domu — z oknami zwróconymi ku południowi i widokiem na sad oraz otaczającą zieleń.',
    features: [
      '3 łóżka jednoosobowe lub łóżko małżeńskie i pojedyncze',
      'Łazienka z wanną',
      'Widok na sad i zieleń',
      'Drewniane meble, naturalne tkaniny',
    ],
    price: 'od 380 zł',
    unit: 'pokój / doba',
  },
  {
    name: 'Leśny',
    who: '2-osobowy pokój na piętrze',
    images: [
      '/lesny-1.avif',
      '/lesny-2.avif',
      '/lesny-3.avif',
      '/lesny-4.avif',
    ],
    lead: 'Kameralny pokój dla dwóch osób z dwoma osobnymi łóżkami — w spokojnej, zacisznej części piętra.',
    features: [
      'Dwa osobne łóżka',
      'Łazienka z prysznicem',
      'Widok na sad i zieleń',
      'Naturalne, leśne barwy wnętrza',
    ],
    price: 'od 320 zł',
    unit: 'pokój / doba',
  },
  {
    name: 'Kwiecisty',
    who: '2/3-osobowy pokój na piętrze',
    images: [
      '/kwiecisty-1.avif',
      '/kwiecisty-2.avif',
      '/kwiecisty-3.avif',
      '/kwiecisty-4.avif',
    ],
    lead: 'Przytulny pokój z łóżkiem małżeńskim i kanapą, z oknem otwartym na Wiśniową Górę.',
    features: [
      'Łóżko małżeńskie oraz kanapa',
      'Łazienka z prysznicem',
      'Widok na Wiśniową Górę',
      'Kwiatowe motywy i tekstylia',
    ],
    price: 'od 360 zł',
    unit: 'pokój / doba',
  },
  {
    name: 'Etniczny',
    who: '2-osobowy pokój na piętrze',
    images: [
      '/etniczny-1.avif',
      '/etniczny-2.avif',
      '/etniczny-3.avif',
      '/etniczny-4.avif',
    ],
    lead: 'Pokój z dekoracjami inspirowanymi orientalnym podróżowaniem — kilimy, drewno, ciepłe światło.',
    features: [
      '2 łóżka pojedyncze lub łóżko małżeńskie',
      'Łazienka z wanną',
      'Widok na Wiśniową Górę',
      'Etniczne dekoracje, ręcznie tkane dywany',
    ],
    price: 'od 340 zł',
    unit: 'pokój / doba',
  },
  {
    name: 'Magiczny',
    who: 'Największy, 5/6-osobowy pokój na poddaszu',
    images: [
      '/magiczny-1.avif',
      '/magiczny-2.avif',
      '/magiczny-3.avif',
      '/magiczny-4.avif',
    ],
    lead: 'Przestronne poddasze pod skośnym dachem — idealne dla rodziny lub większej grupy przyjaciół.',
    features: [
      'Łoże małżeńskie i 3 pojedyncze łóżka oraz rozkładana sofa',
      'Łazienka z prysznicem',
      'Widok na Osadę Kopaniec',
      'Najwięcej miejsca i światła',
    ],
    price: 'od 580 zł',
    unit: 'pokój / doba',
  },
]

const HOUSE_FEATURES = [
  { icon: 'fireplace', t: 'Salon z kominkiem',     d: 'Sercem Domu jest salon z trzaskającym ogniem w przeszklonym kominku.' },
  { icon: 'kitchen',   t: 'Kuchnia dla gości',     d: 'W pełni wyposażona, dostępna dla wszystkich mieszkańców Domu.' },
  { icon: 'meditation',t: 'Sala warsztatowa',      d: 'Maty do jogi, poduszki i materace do medytacji oraz wypoczynku.' },
  { icon: 'bath',      t: 'Sauna infrared',        d: 'Pokój regeneracji z prysznicem hydromasażem i stołem do masażu.' },
  { icon: 'tea',       t: 'Wspólna jadalnia',      d: 'Duży, drewniany stół przy którym poznają się goście.' },
  { icon: 'leaf',      t: 'Ogród i sad',           d: 'Otwarty dla gości, kręgi kamienne i ścieżki bose.' },
  { icon: 'star',      t: 'Ciemne niebo',          d: 'Bez latarni — wieczorami widać Drogę Mleczną nad doliną.' },
  { icon: 'bed',       t: '5 pokoi · do 14 osób', d: 'Każdy z osobną łazienką i własnym charakterem.' },
]

// Slider state for each room — track current + which slides have been "touched"
// so we can lazy-load images only after the user navigates to them.
const sliderIndexes = ref<number[]>(ROOMS.map(() => 0))
const visitedSlides = ref<Set<string>[]>(ROOMS.map((_, i) => new Set([`${i}-0`])))

function markVisited(roomIndex: number, imgIndex: number) {
  const set = visitedSlides.value[roomIndex]
  if (set) set.add(`${roomIndex}-${imgIndex}`)
}

function shouldRender(roomIndex: number, imgIndex: number) {
  return visitedSlides.value[roomIndex]?.has(`${roomIndex}-${imgIndex}`) ?? false
}

function prevSlide(roomIndex: number, e: Event) {
  e.stopPropagation()
  const room = ROOMS[roomIndex]
  if (!room) return
  const total = room.images.length
  const current = sliderIndexes.value[roomIndex] ?? 0
  const next = (current - 1 + total) % total
  sliderIndexes.value[roomIndex] = next
  markVisited(roomIndex, next)
}
function nextSlide(roomIndex: number, e: Event) {
  e.stopPropagation()
  const room = ROOMS[roomIndex]
  if (!room) return
  const total = room.images.length
  const current = sliderIndexes.value[roomIndex] ?? 0
  const next = (current + 1) % total
  sliderIndexes.value[roomIndex] = next
  markVisited(roomIndex, next)
}
function goToSlide(roomIndex: number, imgIndex: number, e: Event) {
  e.stopPropagation()
  sliderIndexes.value[roomIndex] = imgIndex
  markVisited(roomIndex, imgIndex)
}

useScrollReveal({ threshold: 0.08 })
</script>

<template>
  <div class="duzy-dom-page">
    <!-- ─── HERO ──────────────────────────────────────────────────── -->
    <header class="hero-sub">
      <img class="bg" src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=2000&q=80" alt="" />
      <div class="container">
        <div class="crumb">Noclegi / Obiekt 01</div>
        <h1>Duży Dom</h1>
        <p class="hero-lede">Drewniany Dom Gościnny z pięcioma przytulnymi pokojami — sercem Doliny Harmonii. Domowy klimat, kominek w salonie, sala warsztatowa i wspólna kuchnia, w której poznają się goście.</p>
        <div class="quick-meta">
          <span>5 pokoi</span>
          <span>· 12–14 miejsc</span>
          <span>· Salon · Kuchnia · Jadalnia</span>
          <span>· Sauna infrared</span>
          <span>· Od 320 zł / pokój</span>
        </div>
      </div>
    </header>

    <!-- ─── OPIS + ZDJĘCIA ────────────────────────────────────────── -->
    <section class="tight">
      <div class="container">
        <div class="intro-grid">
          <div class="reveal">
            <span class="eyebrow">O obiekcie</span>
            <h2 class="section-title">Dom Gościnny — sercem doliny.</h2>
            <div class="desc-text">
              <p>
                Duży Dom to pięć przytulnych pokoi — 2-, 3- i 5/6-osobowych, każdy z własną łazienką. Wnętrza wypełnia domowy klimat: drewniane meble, naturalne tkaniny i dekoracje inspirowane sielską prostotą izerskiej wsi oraz dalekimi podróżami.
              </p>
              <p>
                Sercem Domu jest salon z trzaskającym ogniem w przeszklonym kominku — miejsce, gdzie po dniu na szlakach goście schodzą się na herbatę z naszego ogrodu, rozmowę albo seans z rzutnika.
              </p>
              <p>
                Kuchnia dla gości jest w pełni wyposażona. Z szacunku do natury i własnych ciał na miejscu nie spożywamy alkoholu i unikamy mięsa, o co prosimy również naszych gości.
              </p>
            </div>
            <table class="spec-table">
              <tbody>
                <tr><td>Liczba pokoi</td><td>5 · każdy z osobną łazienką</td></tr>
                <tr><td>Maksymalna liczba osób</td><td>14 (z rozłożonymi sofami)</td></tr>
                <tr><td>Strefy wspólne</td><td>salon z kominkiem · jadalnia · kuchnia · sala warsztatowa</td></tr>
                <tr><td>Regeneracja</td><td>sauna infrared · stół do masażu · prysznic z hydromasażem</td></tr>
                <tr><td>Wyżywienie</td><td>kuchnia roślinna dla grup warsztatowych</td></tr>
                <tr><td>Zwierzęta</td><td>jesteśmy otwarci na przybycie ze zwierzakami</td></tr>
              </tbody>
            </table>
          </div>
          <div class="reveal">
            <div class="img-stack">
              <img class="tall" src="/kwiecisty-4.avif" alt="" />
              <img src="/magiczny-1.avif" alt="" />
              <img src="/sloneczny-1.avif" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── STREFY WSPÓLNE ────────────────────────────────────────── -->
    <section class="cream">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Strefy wspólne</span>
          <h2>Wszystko, czego potrzeba grupie.</h2>
          <p class="lede">Duży Dom to nie tylko pokoje — to całe życie wspólne, które dzieje się przy stole, kominku i w sali warsztatowej.</p>
        </div>
        <div class="features-grid">
          <div
            v-for="(f, i) in HOUSE_FEATURES" :key="i"
            class="feat-card reveal"
          >
            <span class="feat-icon"><DhIcon :name="f.icon" :size="48" :stroke="1.4" /></span>
            <h4>{{ f.t }}</h4>
            <p>{{ f.d }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── POKOJE ─────────────────────────────────────────────────── -->
    <section>
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Pokoje w Dużym Domu</span>
          <h2>Pięć pokoi, pięć charakterów.</h2>
          <p class="lede">Każdy z pokoi ma własną nazwę i własny klimat — wynikający z koloru, widoku i drobnych przedmiotów, które przywieźliśmy z podróży.</p>
        </div>

        <div class="rooms-list">
          <article
            v-for="(r, i) in ROOMS" :key="i"
            class="room-row reveal"
            :class="{ alt: i % 2 === 1 }"
          >
            <!-- Slider -->
            <div class="room-img-slider">
              <div
                v-for="(src, k) in r.images" :key="k"
                class="slide"
                :class="{ active: k === sliderIndexes[i] }"
              >
                <img
                  v-if="shouldRender(i, k)"
                  :src="src"
                  :alt="`${r.name} — zdjęcie ${k+1}`"
                  :loading="k === 0 ? 'eager' : 'lazy'"
                />
              </div>
              <span class="room-badge">0{{ i+1 }} · Pokój</span>
              <button class="slider-arrow prev" @click="prevSlide(i, $event)" aria-label="Poprzednie">‹</button>
              <button class="slider-arrow next" @click="nextSlide(i, $event)" aria-label="Następne">›</button>
              <div class="slider-dots">
                <button
                  v-for="(_, k) in r.images" :key="k"
                  :class="{ active: k === sliderIndexes[i] }"
                  @click="goToSlide(i, k, $event)"
                  :aria-label="`Zdjęcie ${k+1}`"
                />
              </div>
              <span class="slider-counter">{{ (sliderIndexes[i] ?? 0) + 1 }} / {{ r.images.length }}</span>
            </div>

            <!-- Body -->
            <div class="room-body">
              <span class="room-who">{{ r.who }}</span>
              <h3 class="room-name">{{ r.name }}</h3>
              <p class="room-lead">{{ r.lead }}</p>
              <div class="room-feats-list">
                <div v-for="(f, j) in r.features" :key="j" class="room-feat-item">
                  <span class="feat-dot"></span>
                  <span>{{ f }}</span>
                </div>
              </div>
              <div class="room-foot-bar">
                <div>
                  <span class="room-price-val">{{ r.price }}</span>
                  <span class="room-unit-val">{{ r.unit }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ─── CENNIK & REZERWACJA ───────────────────────────────────── -->
    <section class="cream" id="rezerwacja">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Cennik &amp; rezerwacja</span>
          <h2>Wybierz formę pobytu.</h2>
          <p class="lede">Możesz zarezerwować pojedynczy pokój — albo wynająć cały Dom dla grupy warsztatowej, rodziny lub przyjaciół.</p>
        </div>

        <div class="price-options-grid">
          <div class="price-tile-card reveal">
            <span class="pt-label-tag">Pojedynczy pokój</span>
            <span class="pt-price-big">320–580 zł</span>
            <span class="pt-unit-text">w zależności od pokoju, doba, ze śniadaniem na życzenie</span>
          </div>
          <div class="price-tile-card featured-tile reveal">
            <span class="pt-label-tag">Cały Duży Dom</span>
            <span class="pt-price-big">2 200 zł</span>
            <span class="pt-unit-text">5 pokoi, do 14 osób, doba — strefy wspólne dostępne tylko dla grupy</span>
          </div>
          <div class="price-tile-card reveal">
            <span class="pt-label-tag">Tydzień zjazdowy</span>
            <span class="pt-price-big">13 800 zł</span>
            <span class="pt-unit-text">cały Dom, 7 nocy, sala warsztatowa, sauna i kuchnia w cenie</span>
          </div>
        </div>

        <div class="booking-cta-bar reveal">
          <div class="cta-text-content">
            <h3 class="cta-title">Sprawdź dostępność</h3>
            <p class="cta-desc">Napisz lub zadzwoń — odpowiadamy w ciągu 48 godzin. Pokoje rezerwujemy dwustopniowo: najpierw potwierdzamy termin, potem prosimy o zaliczkę.</p>
          </div>
          <div class="cta-buttons-wrap">
            <a class="btn btn-primary" href="mailto:dolina@harmonii.pl">
              Napisz do nas
              <DhIcon name="arrow" :size="14" :stroke="1.6" />
            </a>
            <NuxtLink class="btn btn-secondary" to="/#noclegi">Zobacz inne obiekty</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Page-specific styles only. Base styles moved to main.css */

/* Hero */
.hero-sub { min-height: 78vh; padding-top: 140px; padding-bottom: 80px; display: flex; align-items: end; position: relative; background: var(--brand-primary); color: var(--bg-primary); overflow: hidden; }
.hero-sub::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(27,48,34,.3) 0%, rgba(27,48,34,.7) 100%); z-index: 1; }
.hero-sub img.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .7; }
.hero-sub .container { position: relative; z-index: 2; }
.hero-sub .crumb { font-family: var(--mono); font-size: 11px; letter-spacing: .15em; text-transform: uppercase; color: var(--cta-main); margin-bottom: 24px; }
.hero-sub h1 { font-size: clamp(56px, 7vw, 104px); color: #FAF8F2; font-style: italic; font-weight: 500; line-height: 1; margin-bottom: 24px; letter-spacing: -0.02em; }
.hero-lede { font-family: var(--serif); font-size: 22px; max-width: 620px; color: rgba(250,248,242,.9); margin-bottom: 0; }
.quick-meta { display: flex; gap: 48px; margin-top: 56px; flex-wrap: wrap; padding-top: 32px; border-top: 1px solid rgba(250,248,242,.2); font-family: var(--mono); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: rgba(250,248,242,.85); }

/* Intro grid */
.intro-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: start; }
.section-title { margin-top: 16px; margin-bottom: 28px; }
.desc-text p { color: var(--text-muted); margin-bottom: 18px; }
.desc-text p:last-child { margin-bottom: 28px; }
.img-stack { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.img-stack img { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: var(--r-md); }
.img-stack img.tall { grid-row: span 2; aspect-ratio: 4/9; }

/* Spec table */
.spec-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
.spec-table tr { border-top: 1px solid var(--line); }
.spec-table tr:last-child { border-bottom: 1px solid var(--line); }
.spec-table td { padding: 16px 0; font-size: 14px; vertical-align: top; }
.spec-table td:first-child { color: var(--text-muted); font-family: var(--mono); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; width: 38%; }
.spec-table td:last-child { color: var(--brand-primary); font-weight: 500; }

/* Features grid */
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.feat-card { display: flex; flex-direction: column; gap: 12px; padding: 24px; background: var(--bg-card); border-radius: var(--r-md); border: 1px solid var(--line); }
.feat-icon { width: 48px; height: 48px; color: var(--accent-earth); }
.feat-card h4 { font-family: var(--serif); font-size: 18px; margin-top: 8px; color: var(--brand-primary); }
.feat-card p { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

/* Rooms list */
.rooms-list { display: flex; flex-direction: column; gap: 24px; }
.room-row { display: grid; grid-template-columns: 0.9fr 1.1fr; background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; box-shadow: var(--shadow-sm); min-height: 360px; }
.room-row.alt { grid-template-columns: 1.1fr 0.9fr; }
.room-row.alt .room-img-slider { order: 2; }
.room-row.alt .room-body { order: 1; }

.room-img-slider { position: relative; min-height: 360px; overflow: hidden; }
.slide { position: absolute; inset: 0; opacity: 0; transition: opacity .55s ease; }
.slide.active { opacity: 1; }
.slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
.room-badge { position: absolute; top: 20px; left: 20px; z-index: 3; background: rgba(27,48,34,.85); color: #FAF8F2; font-family: var(--mono); font-size: 11px; letter-spacing: .15em; text-transform: uppercase; padding: 8px 14px; border-radius: 100px; }
.slider-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(250,248,242,.4); background: rgba(27,48,34,.55); color: #FAF8F2; backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 3; font-size: 20px; line-height: 1; transition: background .2s, border-color .2s; }
.slider-arrow:hover { background: rgba(27,48,34,.85); border-color: rgba(250,248,242,.7); }
.slider-arrow.prev { left: 16px; }
.slider-arrow.next { right: 16px; }
.slider-dots { position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 3; }
.slider-dots button { width: 8px; height: 8px; border-radius: 50%; border: none; padding: 0; cursor: pointer; background: rgba(250,248,242,.5); transition: background .2s, transform .2s; }
.slider-dots button.active { background: #FAF8F2; transform: scale(1.3); }
.slider-counter { position: absolute; bottom: 18px; right: 20px; z-index: 3; font-family: var(--mono); font-size: 11px; letter-spacing: .12em; color: #FAF8F2; background: rgba(27,48,34,.55); padding: 4px 10px; border-radius: 100px; backdrop-filter: blur(6px); }

.room-body { padding: 40px; display: flex; flex-direction: column; }
.room-name { font-family: var(--serif); font-style: italic; font-weight: 500; font-size: clamp(34px, 3.4vw, 44px); color: var(--brand-primary); line-height: 1; margin-bottom: 8px; letter-spacing: -0.01em; }
.room-who { font-family: var(--mono); font-size: 11px; letter-spacing: .15em; text-transform: uppercase; color: var(--accent-earth); margin-bottom: 20px; display: block; }
.room-lead { font-family: var(--serif); font-size: 17px; line-height: 1.5; color: var(--text-main); margin-bottom: 24px; max-width: 520px; }
.room-feats-list { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; margin-bottom: 24px; }
.room-feat-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--text-muted); line-height: 1.4; }
.feat-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cta-main); margin-top: 7px; flex-shrink: 0; }
.room-foot-bar { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; }
.room-price-val { font-family: var(--serif); font-size: 22px; color: var(--brand-primary); }
.room-unit-val { font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); margin-left: 8px; }

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
  .room-row, .room-row.alt { grid-template-columns: 1fr; }
  .room-row.alt .room-img-slider { order: 0; }
  .room-row.alt .room-body { order: 0; }
  .room-img-slider { min-height: 280px; }
  .quick-meta { gap: 16px 32px; }
}

@media (max-width: 720px) {
  .features-grid { grid-template-columns: 1fr; }
  .room-feats-list { grid-template-columns: 1fr; }
  .room-body { padding: 28px 24px; }
  .booking-cta-bar { padding: 28px; flex-direction: column; align-items: stretch; }
  .cta-buttons-wrap { flex-direction: column; }
  .img-stack { grid-template-columns: 1fr; }
  .img-stack img.tall { grid-row: auto; aspect-ratio: 4/5; }
  .hero-sub { min-height: 60vh; padding-top: 120px; padding-bottom: 56px; }
  .quick-meta { gap: 8px; padding-top: 24px; margin-top: 32px; flex-direction: column; }
  .room-foot-bar { flex-direction: column; align-items: flex-start; gap: 8px; }
}
</style>