<script setup lang="ts">
definePageMeta({ layout: false })

useSeoMeta({
  title: 'Duży Dom — Dolina Harmonii',
  description: 'Drewniany Dom Gościnny z pięcioma przytulnymi pokojami. Kominek w salonie, sala warsztatowa, sauna infrared. Od 320 zł / pokój.',
})

const ROOMS = [
  {
    name: 'Słoneczny',
    who: '3-osobowy pokój na piętrze',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1400&q=80',
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
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=1400&q=80',
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
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80',
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
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1576675784201-0e142b423952?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1400&q=80',
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
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1604014438953-6b7e032dfb15?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1631049552240-59c37f38802b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1594563703937-fdc640497dcd?auto=format&fit=crop&w=1400&q=80',
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

// Slider state for each room
const sliderIndexes = ref<number[]>(ROOMS.map(() => 0))

function prevSlide(roomIndex: number, e: Event) {
  e.stopPropagation()
  const total = ROOMS[roomIndex].images.length
  sliderIndexes.value[roomIndex] = (sliderIndexes.value[roomIndex] - 1 + total) % total
}
function nextSlide(roomIndex: number, e: Event) {
  e.stopPropagation()
  const total = ROOMS[roomIndex].images.length
  sliderIndexes.value[roomIndex] = (sliderIndexes.value[roomIndex] + 1) % total
}
function goToSlide(roomIndex: number, imgIndex: number, e: Event) {
  e.stopPropagation()
  sliderIndexes.value[roomIndex] = imgIndex
}

// Scroll reveal
onMounted(() => {
  const els = document.querySelectorAll('.reveal')
  const io = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
    { threshold: 0.08 }
  )
  els.forEach(el => io.observe(el))
  onUnmounted(() => io.disconnect())
})
</script>

<template>
  <div class="dh-root">

    <!-- ─── NAV ──────────────────────────────────────────────────── -->
    <nav class="nav-pill">
      <NuxtLink class="brand" to="/">
        <DhIcon name="seed" :size="22" :stroke="1.4" />
        Dolina Harmonii
      </NuxtLink>
      <ul>
        <li><NuxtLink to="/#dolina">Dolina</NuxtLink></li>
        <li><NuxtLink to="/warsztaty">Warsztaty</NuxtLink></li>
        <li><NuxtLink to="/#noclegi">Noclegi</NuxtLink></li>
        <li><NuxtLink to="/#izery">Magiczne Izery</NuxtLink></li>
        <li><NuxtLink to="/#galeria">Galeria</NuxtLink></li>
      </ul>
      <a class="nav-cta" href="#rezerwacja">Zarezerwuj</a>
    </nav>

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
            <h2 style="margin-top:16px;margin-bottom:28px">Dom Gościnny — sercem doliny.</h2>
            <p style="color:var(--text-muted);margin-bottom:18px">
              Duży Dom to pięć przytulnych pokoi — 2-, 3- i 5/6-osobowych, każdy z własną łazienką. Wnętrza wypełnia domowy klimat: drewniane meble, naturalne tkaniny i dekoracje inspirowane sielską prostotą izerskiej wsi oraz dalekimi podróżami.
            </p>
            <p style="color:var(--text-muted);margin-bottom:18px">
              Sercem Domu jest salon z trzaskającym ogniem w przeszklonym kominku — miejsce, gdzie po dniu na szlakach goście schodzą się na herbatę z naszego ogrodu, rozmowę albo seans z rzutnika.
            </p>
            <p style="color:var(--text-muted);margin-bottom:28px">
              Kuchnia dla gości jest w pełni wyposażona. Z szacunku do natury i własnych ciał na miejscu nie spożywamy alkoholu i unikamy mięsa, o co prosimy również naszych gości.
            </p>
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
              <img class="tall" src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80" alt="" />
              <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80" alt="" />
              <img src="https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&w=900&q=80" alt="" />
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
            <div class="room-img">
              <div
                v-for="(src, k) in r.images" :key="k"
                class="slide"
                :class="{ active: k === sliderIndexes[i] }"
              >
                <img :src="src" :alt="`${r.name} — zdjęcie ${k+1}`" :loading="k === 0 ? 'eager' : 'lazy'" />
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
              <span class="slider-counter">{{ sliderIndexes[i] + 1 }} / {{ r.images.length }}</span>
            </div>

            <!-- Body -->
            <div class="room-body">
              <span class="room-who">{{ r.who }}</span>
              <h3 class="room-name">{{ r.name }}</h3>
              <p class="room-lead">{{ r.lead }}</p>
              <div class="room-feats">
                <div v-for="(f, j) in r.features" :key="j" class="room-feat">
                  <span class="feat-dot" />
                  <span>{{ f }}</span>
                </div>
              </div>
              <div class="room-foot">
                <div>
                  <span class="room-price">{{ r.price }}</span>
                  <span class="room-unit">{{ r.unit }}</span>
                </div>
                <a class="btn btn-secondary" href="#rezerwacja">Wybierz pokój</a>
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

        <div class="price-grid">
          <div class="price-tile reveal">
            <span class="pt-lab">Pojedynczy pokój</span>
            <span class="pt-price">320–580 zł</span>
            <span class="pt-unit">w zależności od pokoju, doba, ze śniadaniem na życzenie</span>
          </div>
          <div class="price-tile feat reveal">
            <span class="pt-lab" style="color:var(--cta-main)">Cały Duży Dom</span>
            <span class="pt-price">2 200 zł</span>
            <span class="pt-unit">5 pokoi, do 14 osób, doba — strefy wspólne dostępne tylko dla grupy</span>
          </div>
          <div class="price-tile reveal">
            <span class="pt-lab">Tydzień zjazdowy</span>
            <span class="pt-price">13 800 zł</span>
            <span class="pt-unit">cały Dom, 7 nocy, sala warsztatowa, sauna i kuchnia w cenie</span>
          </div>
        </div>

        <div class="booking-cta reveal">
          <div>
            <h3 style="margin-bottom:8px">Sprawdź dostępność</h3>
            <p style="color:var(--text-muted)">Napisz lub zadzwoń — odpowiadamy w ciągu 48 godzin. Pokoje rezerwujemy dwustopniowo: najpierw potwierdzamy termin, potem prosimy o zaliczkę.</p>
          </div>
          <div style="display:flex;gap:12px;flex-shrink:0">
            <a class="btn btn-primary" href="mailto:dolina@harmonii.pl">
              Napisz do nas
              <DhIcon name="arrow" :size="14" :stroke="1.6" />
            </a>
            <NuxtLink class="btn btn-secondary" to="/#noclegi">Zobacz inne obiekty</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FOOTER ─────────────────────────────────────────────────── -->
    <footer>
      <div class="container">
        <div style="text-align:center;padding:40px 0;border-bottom:1px solid rgba(249,247,242,0.1)">
          <div style="font-family:var(--serif);font-style:italic;font-size:36px;color:var(--bg-primary);margin-bottom:8px">Dolina Harmonii</div>
          <p style="color:rgba(249,247,242,0.7)">Kopaniec 47 · 58-512 Stara Kamienica · dolina@harmonii.pl</p>
        </div>
        <div style="display:flex;justify-content:space-between;padding:32px 0;font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(249,247,242,0.5)">
          <span>© 2026 Dolina Harmonii</span>
          <NuxtLink to="/" style="color:inherit">← Wróć do strony głównej</NuxtLink>
        </div>
      </div>
    </footer>

  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg-primary: #F9F7F2; --bg-section: #EFEDE5; --bg-sage: #E2E8DF; --bg-card: #FFFFFF;
  --text-main: #2C2C2C; --text-muted: #5C5C58;
  --brand-primary: #1B3022; --brand-deep: #122019;
  --accent-earth: #A67C52; --accent-earth-deep: #8A6440;
  --cta-main: #E9C46A; --cta-main-hover: #D9B25A;
  --line: #DDD7CB;
  --shadow-sm: 0 1px 2px rgba(27,48,34,.04), 0 2px 6px rgba(27,48,34,.05);
  --shadow-md: 0 4px 12px rgba(27,48,34,.06), 0 12px 28px rgba(27,48,34,.08);
  --shadow-lg: 0 8px 24px rgba(27,48,34,.08), 0 24px 60px rgba(27,48,34,.12);
  --serif: 'Lora', Georgia, serif; --sans: 'Inter', -apple-system, sans-serif; --mono: 'JetBrains Mono', monospace;
  --r-sm: 4px; --r-md: 8px; --r-lg: 16px; --r-pill: 999px; --max-w: 1240px;
}

.dh-root *, .dh-root *::before, .dh-root *::after { box-sizing: border-box; }
.dh-root { background: var(--bg-primary); color: var(--text-main); font-family: var(--sans); font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased; }
.dh-root img { max-width: 100%; display: block; }
.dh-root h1, .dh-root h2, .dh-root h3, .dh-root h4 { font-family: var(--serif); color: var(--brand-primary); font-weight: 500; letter-spacing: -0.01em; margin: 0; line-height: 1.15; }
.dh-root p { margin: 0; }
.dh-root a { color: var(--accent-earth); text-decoration: none; transition: color .2s; }
.dh-root a:hover { color: var(--brand-primary); }
.eyebrow { font-family: var(--sans); text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px; font-weight: 600; color: var(--accent-earth); }
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 48px; }
.dh-root section { padding: 120px 0; }
.dh-root section.tight { padding: 80px 0; }
.dh-root section.cream { background: var(--bg-section); }

.btn { display: inline-flex; align-items: center; gap: 10px; font-family: var(--sans); font-weight: 600; font-size: 14px; letter-spacing: 0.04em; padding: 14px 26px; border-radius: var(--r-sm); border: none; cursor: pointer; transition: all .2s; text-decoration: none; }
.dh-root .btn-primary { background: var(--cta-main); color: var(--brand-primary); }
.dh-root .btn-primary:hover { background: var(--cta-main-hover); color: var(--brand-primary); transform: translateY(-1px); }
.dh-root .btn-secondary { background: transparent; border: 1px solid var(--accent-earth); color: var(--accent-earth); }
.dh-root .btn-secondary:hover { background: var(--accent-earth); color: var(--bg-primary); }

.section-head { text-align: center; margin-bottom: 64px; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.section-head h2 { max-width: 720px; }
.section-head .lede { color: var(--text-muted); max-width: 580px; font-family: var(--serif); font-size: 18px; }

/* Nav */
.nav-pill { position: fixed; top: 24px; left: 50%; transform: translateX(-50%); z-index: 50; display: flex; align-items: center; gap: 4px; background: rgba(249,247,242,0.92); backdrop-filter: blur(14px); border: 1px solid rgba(141,161,146,0.3); border-radius: var(--r-pill); padding: 6px 6px 6px 20px; box-shadow: var(--shadow-md); font-size: 13px; white-space: nowrap; max-width: calc(100vw - 48px); }
.nav-pill .brand { font-family: var(--serif); color: var(--brand-primary); font-size: 16px; font-weight: 500; display: flex; align-items: center; gap: 8px; padding-right: 18px; margin-right: 4px; border-right: 1px solid var(--line); flex-shrink: 0; text-decoration: none; }
.nav-pill ul { display: flex; list-style: none; margin: 0; padding: 0 4px; }
.nav-pill li a { display: block; padding: 8px 12px; color: var(--brand-primary); font-weight: 500; font-size: 13px; border-radius: var(--r-pill); transition: background .2s, color .2s; }
.nav-pill li a:hover { background: var(--bg-sage); color: var(--brand-primary); }
.nav-pill .nav-cta { background: transparent; color: var(--brand-primary); padding: 9px 18px; border-radius: var(--r-pill); border: 1px solid var(--accent-earth); font-weight: 500; font-size: 13px; margin-left: 8px; transition: background .2s, color .2s; flex-shrink: 0; text-decoration: none; }
.nav-pill .nav-cta:hover { background: var(--accent-earth); color: var(--bg-primary); }

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
.room-row.alt .room-img { order: 2; }
.room-row.alt .room-body { order: 1; }

/* Room slider */
.room-img { position: relative; min-height: 360px; overflow: hidden; }
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

/* Room body */
.room-body { padding: 40px; display: flex; flex-direction: column; }
.room-name { font-family: var(--serif); font-style: italic; font-weight: 500; font-size: clamp(34px, 3.4vw, 44px); color: var(--brand-primary); line-height: 1; margin-bottom: 8px; letter-spacing: -0.01em; }
.room-who { font-family: var(--mono); font-size: 11px; letter-spacing: .15em; text-transform: uppercase; color: var(--accent-earth); margin-bottom: 20px; display: block; }
.room-lead { font-family: var(--serif); font-size: 17px; line-height: 1.5; color: var(--text-main); margin-bottom: 24px; max-width: 520px; }
.room-feats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; margin-bottom: 24px; }
.room-feat { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--text-muted); line-height: 1.4; }
.feat-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cta-main); margin-top: 7px; flex-shrink: 0; }
.room-foot { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; }
.room-price { font-family: var(--serif); font-size: 22px; color: var(--brand-primary); }
.room-unit { font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); margin-left: 8px; }

/* Pricing */
.price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 64px; }
.price-tile { background: var(--bg-card); padding: 28px; border-radius: var(--r-md); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 8px; }
.price-tile.feat { background: var(--brand-primary); color: var(--bg-primary); border-color: var(--brand-primary); }
.pt-lab { font-family: var(--mono); font-size: 11px; letter-spacing: .15em; text-transform: uppercase; color: var(--accent-earth); }
.price-tile.feat .pt-lab { color: var(--cta-main); }
.pt-price { font-family: var(--serif); font-size: 36px; color: var(--brand-primary); line-height: 1; }
.price-tile.feat .pt-price { color: var(--bg-primary); }
.pt-unit { font-size: 13px; color: var(--text-muted); }
.price-tile.feat .pt-unit { color: rgba(250,248,242,.7); }

.booking-cta { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-md); padding: 40px 48px; display: flex; justify-content: space-between; align-items: center; gap: 32px; flex-wrap: wrap; }
.booking-cta h3 { color: var(--brand-primary); }

/* Footer */
footer { background: var(--brand-deep); color: rgba(249,247,242,.75); padding: 80px 0 32px; font-size: 14px; }

/* Reveal */
.reveal { opacity: 0; transform: translateY(20px); transition: opacity .8s ease, transform .8s ease; }
.reveal.in { opacity: 1; transform: translateY(0); }
</style>