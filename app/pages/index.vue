<script setup lang="ts">
definePageMeta({ layout: false })
import type { Workshop } from '~/types/directus'

// ─── Data fetching ────────────────────────────────────────────────────────────
const { getWorkshops, getImageUrl } = useDirectus()

const { data } = await useAsyncData('workshops-home', () => getWorkshops({ limit: 3 }))
const workshops = computed(() => data.value?.data ?? [])

// ─── SEO ─────────────────────────────────────────────────────────────────────
useSeoMeta({
  title: 'Dolina Harmonii — miejsce naturalnych mocy',
  description: 'Ośrodek warsztatowy w Kopańcu, w Górach Izerskich. Warsztaty mindfulness, medytacja, rękodzieło, pobyty regeneracyjne.',
  ogTitle: 'Dolina Harmonii',
  ogDescription: 'Miejsce naturalnych mocy w Górach Izerskich.',
})

// ─── Scroll reveal ────────────────────────────────────────────────────────────
onMounted(() => {
  const els = document.querySelectorAll('.reveal')
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })
  els.forEach(el => io.observe(el))
  onUnmounted(() => io.disconnect())
})

// ─── Static data (placeholder until CMS-driven) ───────────────────────────────
const STATIC_WORKSHOPS = [
  { slug: 'mindfulness-w-naturze', name: 'Mindfulness w naturze', cat: 'mindfulness', icon: 'meditation', img: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1000&q=80', dur: '3 dni', date: 'Maj 2026', desc: 'Praktyka uważnej obecności na łące, w lesie i przy ognisku — w towarzystwie cykli pór roku.' },
  { slug: 'cisza-i-medytacja', name: 'Cisza i medytacja', cat: 'medytacja', icon: 'candle', img: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&w=1000&q=80', dur: '5 dni', date: 'Czerwiec', desc: 'Pięciodniowe odosobnienie w ciszy z prowadzeniem zen i tradycji wglądu. Dla początkujących i wracających.' },
  { slug: 'rekodzieło-z-izerow', name: 'Rękodzieło z Izerów', cat: 'rękodzieło', icon: 'craft', img: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=80', dur: 'Weekend', date: 'Lipiec', desc: 'Filcowanie wełną, plecionkarstwo, wypał ceramiki — z lokalnymi rękodzielniczkami.' },
]

// Use CMS workshops if available, fall back to static
const displayWorkshops = computed(() => {
  if (workshops.value.length > 0) return workshops.value.map(w => ({
    slug: w.slug,
    name: w.title,
    cat: typeof w.category === 'object' ? w.category?.name : w.category,
    icon: typeof w.category === 'object' ? (w.category?.icon?.split(':')[1] ?? 'meditation') : 'meditation',
    img: w.cover_image ? getImageUrl(w.cover_image, { width: 1000, format: 'webp' }) : STATIC_WORKSHOPS[0].img,
    dur: '',
    date: w.start_date ? new Date(w.start_date).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }) : '',
    desc: w.short_description,
  }))
  return STATIC_WORKSHOPS
})

const ACCOMMODATIONS = [
  {
    num: '01 — Obiekt główny', name: 'Duży Dom',
    tag: 'Dom Gościnny · 5 pokoi · 12–14 miejsc',
    desc: 'Drewniany dom z pięcioma przytulnymi pokojami — 2-, 3- i 5-osobowymi. Wnętrza wypełnia domowy klimat: drewniane meble, naturalne tkaniny, dekoracje inspirowane sielską prostotą izerskiej wsi. W salonie kominek z trzaskającym ogniem, w sali warsztatowej maty i poduszki do medytacji.',
    main: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1400&q=80',
    small: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=900&q=80',
    features: [{ i: 'bed', t: '5 pokoi gościnnych' }, { i: 'fireplace', t: 'Kominek w salonie' }, { i: 'kitchen', t: 'Kuchnia dla gości' }, { i: 'meditation', t: 'Sala warsztatowa' }, { i: 'bath', t: 'Sauna infrared' }, { i: 'leaf', t: 'Sad i widok na góry' }],
    price: 'od 320 zł', priceFor: 'pokój / doba',
  },
  {
    num: '02 — Obiekt osobny', name: 'Leśny Domek',
    tag: 'Dwupoziomowy · 4/5 osób',
    desc: 'Osobny, dwupoziomowy obiekt ukryty w zaciszu, pośród drzew. Z okien rozciąga się widok na Osadę z owieczkami, leśny labirynt, staw oraz Wiśniową Górę. Na dole salon i kuchnia, na piętrze część sypialna.',
    main: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80',
    small: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
    features: [{ i: 'bed', t: 'Łoże + 2 łóżka + sofa' }, { i: 'bath', t: 'Łazienka z prysznicem' }, { i: 'kitchen', t: 'Kuchnia, jadalnia' }, { i: 'fireplace', t: 'Salon z kominkiem' }, { i: 'leaf', t: 'Widok na Wiśniową Górę' }, { i: 'star', t: 'Pełna prywatność' }],
    price: 'od 580 zł', priceFor: 'cały domek / doba',
  },
  {
    num: '03 — Obiekt osobny', name: 'Studio z oranżerią',
    tag: 'Apartament 2/3-osobowy',
    desc: 'Osobny, kameralny obiekt z klimatycznym salonem w postaci przeszklonej oranżerii. Łoże małżeńskie, rozkładana sofa, aneks kuchenny i łazienka. Idealne dla pary szukającej intymności lub trójki gości pragnących osobnej przestrzeni z widokiem na sad.',
    main: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    small: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    features: [{ i: 'bed', t: 'Łoże + rozkładana sofa' }, { i: 'bath', t: 'Łazienka z prysznicem' }, { i: 'kitchen', t: 'Aneks kuchenny' }, { i: 'leaf', t: 'Salon-oranżeria' }, { i: 'tea', t: 'Widok na sad owocowy' }, { i: 'star', t: 'Prawie osobny apartament' }],
    price: 'od 480 zł', priceFor: 'studio / doba',
  },
]

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1200&q=80', span: 'span-2-row' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=900&q=80', span: 'span-2-col' },
  { src: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=900&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80', span: 'span-2-col' },
  { src: 'https://images.unsplash.com/photo-1574482620881-df9b3b0e6e63?auto=format&fit=crop&w=900&q=80', span: '' },
]

const TEAM = [
  { name: 'Anna Wójcik', role: 'Założycielka', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
  { name: 'Marek Stępień', role: 'Gospodarz', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Joanna Lis', role: 'Praktyka medytacji', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80' },
  { name: 'Tomasz Borek', role: 'Kuchnia roślinna', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' },
]

const email = ref('')
</script>

<template>
  <div class="dh-root">
    <!-- ─── NAV ─────────────────────────────────────────────────── -->
    <nav class="nav-pill">
      <span class="brand">
        <DhIcon name="seed" :size="28" :stroke="1.4" />
        Dolina Harmonii
      </span>
      <ul>
        <li><a href="#dolina">Dolina</a></li>
        <li><a href="#warsztaty">Warsztaty</a></li>
        <li><a href="#noclegi">Noclegi</a></li>
        <li><a href="#izery">Izery</a></li>
        <li><a href="#galeria">Galeria</a></li>
        <li><a href="#zespol">Zespół</a></li>
      </ul>
      <a class="nav-cta" href="#rezerwacja">Zarezerwuj</a>
    </nav>

    <!-- ─── HERO ──────────────────────────────────────────────────── -->
    <header class="hero" id="top">
      <img class="hero-bg" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80" alt="" />
      <div class="hero-content">
        <div style="margin-bottom:32px;display:flex;justify-content:center;align-items:center;gap:14px;color:rgba(250,248,242,0.9);font-family:var(--mono);font-size:11px;letter-spacing:0.2em;text-transform:uppercase">
          <span style="width:40px;height:1px;background:currentColor;opacity:.5"></span>
          Kopaniec · Góry Izerskie
          <span style="width:40px;height:1px;background:currentColor;opacity:.5"></span>
        </div>
        <p class="hero-tagline">miejsce naturalnych mocy</p>
        <div style="display:flex;gap:12px;justify-content:center; margin-top: 40px">
          <a class="btn btn-primary" href="#noclegi">
            Zaplanuj pobyt
            <DhIcon name="arrow" :size="18" :stroke="1.6" />
          </a>
          <a class="btn btn-glass" href="#warsztaty">Zobacz warsztaty</a>
        </div>
      </div>
      <div class="hero-meta">
        <span>
          <DhIcon name="compass" :size="18" :stroke="1.4" />
          50°51′N · 15°27′E
        </span>
        <span>EST. 2017 · 720 m n.p.m.</span>
        <span>↓ przewiń</span>
      </div>
    </header>

    <!-- ─── INTRO ─────────────────────────────────────────────────── -->
    <section id="dolina" class="cream">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-text reveal">
            <span class="eyebrow">Czym jest Dolina</span>
            <p class="lead" style="margin-top:16px">
              Stary, drewniany dom u podnóża Izerów — przestrzeń, gdzie warsztaty, cisza i wspólny stół tworzą rytm dnia bliski naturze.
            </p>
            <p style="color:var(--text-muted);margin-bottom:16px">
              Działamy od 2017 roku w Kopańcu — niewielkiej wsi otoczonej lasami, łąkami i strumieniami. Zapraszamy grupy warsztatowe oraz osoby, które chcą po prostu zatrzymać się na kilka dni, oddychać i obserwować pory roku.
            </p>
            <p style="color:var(--text-muted)">
              Łączymy ekologię, rozwój osobisty i turystykę regionalną. Współtworzymy Magiczne Izery — opowieść o tym miejscu, jego ludziach i tradycjach.
            </p>
            <div style="margin-top:32px;display:flex;gap:24px;padding-top:24px;border-top:1px solid var(--line)">
              <div v-for="s in [{ n: '8', l: 'lat tworzenia miejsca' }, { n: '40+', l: 'warsztatów rocznie' }, { n: '3', l: 'budynki, 7 pokoi' }]" :key="s.n">
                <div style="font-family:var(--serif);font-size:36px;color:var(--brand-primary);font-weight:500;line-height:1">{{ s.n }}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:6px;letter-spacing:0.04em">{{ s.l }}</div>
              </div>
            </div>
          </div>
          <div class="reveal" style="position:relative">
            <img
              src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1400&q=80"
              alt="Wnętrze drewnianego domu"
              style="width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:var(--r-md);box-shadow:var(--shadow-md)"
            />
            <div class="intro-badge">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <DhIcon name="leaf" :size="28" :stroke="1.4" style="color:var(--accent-earth)" />
                <span style="font-family:var(--mono);font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:var(--accent-earth)">Dwa filary</span>
              </div>
              <p style="font-family:var(--serif);font-size:18px;color:var(--brand-primary);line-height:1.3">
                Wynajem przestrzeni dla grup warsztatowych oraz indywidualne pobyty regeneracyjne.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── WORKSHOPS ─────────────────────────────────────────────── -->
    <section id="warsztaty">
      <div class="container">
        <div class="workshops-head reveal">
          <div>
            <span class="eyebrow">Warsztaty &amp; wydarzenia</span>
            <h2 style="margin-top:16px">Cztery ścieżki, jedna dolina.</h2>
          </div>
          <p class="lede">
            Spotykamy się przy konkretnych praktykach — mindfulness, medytacji, rękodziele i samoopiece. Każdy warsztat to mały, kameralny krąg.
          </p>
        </div>
        <div class="workshop-grid">
          <NuxtLink
            v-for="(w, i) in displayWorkshops"
            :key="i"
            :to="`/warsztaty/${w.slug}`"
            class="workshop-card reveal"
            :style="{ transitionDelay: `${i * 60}ms` }"
          >
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
        <div style="text-align:center;margin-top:56px">
          <NuxtLink class="btn btn-secondary" to="/warsztaty">
            Pełen kalendarz warsztatów
            <DhIcon name="arrow" :size="18" :stroke="1.6" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ─── ACCOMMODATIONS ────────────────────────────────────────── -->
    <section id="noclegi" class="cream">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Oferta miejsca</span>
          <h2>Dwa domy, dwa rytmy.</h2>
          <p class="lede">Wynajmiemy ci pokój, weekend lub całą stodołę — w zależności od tego, czy przyjeżdżasz solo, w parze, czy z grupą warsztatową.</p>
        </div>
        <div
          v-for="(a, i) in ACCOMMODATIONS"
          :key="i"
          class="accommodation reveal"
          :class="{ reverse: i % 2 === 1 }"
        >
          <div class="acc-imgs">
            <img class="main" :src="a.main" :alt="a.name" />
            <img class="small" :src="a.small" alt="" />
          </div>
          <div class="acc-text">
            <span class="num">{{ a.num }}</span>
            <h3>{{ a.name }}</h3>
            <span class="chip" style="margin-bottom:20px;display:inline-flex">{{ a.tag }}</span>
            <p style="color:var(--text-muted);margin-bottom:28px;max-width:480px">{{ a.desc }}</p>
            <div class="acc-features">
              <div v-for="(f, j) in a.features" :key="j" class="acc-feature">
                <span class="icon"><DhIcon :name="f.i" :size="30" :stroke="1.4" /></span>
                {{ f.t }}
              </div>
            </div>
            <div class="acc-price">
              <div>
                <div class="label">Pobyt indywidualny</div>
                <div style="display:flex;align-items:baseline;gap:8px;margin-top:4px">
                  <span class="price">{{ a.price }}</span>
                  <span class="unit">{{ a.priceFor }}</span>
                </div>
              </div>
            </div>
            <div style="display:flex;gap:12px;margin-top:24px">
              <a class="btn btn-primary" href="#">
                Zobacz obiekt
                <DhIcon name="arrow" :size="18" :stroke="1.6" />
              </a>
              <a class="btn btn-secondary" href="#rezerwacja">Sprawdź dostępność</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── REGION ─────────────────────────────────────────────────── -->
    <section id="izery" class="region">
      <div class="container">
        <div class="region-grid">
          <div class="reveal">
            <span class="eyebrow" style="color:var(--cta-main)">Magiczne Izery</span>
            <h2 style="margin-top:16px;margin-bottom:28px;color:var(--bg-primary)">Najstarsze góry w Polsce, najmniej zatłoczone.</h2>
            <p style="color:rgba(249,247,242,0.75);margin-bottom:20px">
              Kopaniec leży w cieniu Izerskich Garbów — pasma uważanego za jedno z najmniej znanych w Polsce. Mchy, torfowiska, kryształy kwarcu w strumieniach, ciemne niebo gwiazd.
            </p>
            <p style="color:rgba(249,247,242,0.75);margin-bottom:20px">
              Współtworzymy oddolny ruch Magiczne Izery — opowieść o ludziach, miejscach i tradycjach regionu. Polecamy wycieczki, mapy, miejscowych przewodników.
            </p>
            <div class="region-stats">
              <div v-for="s in [{ n: '600+', l: 'milionów lat geologii' }, { n: 'III', l: 'stopień ochrony nieba' }, { n: '14', l: 'tras pieszych w okolicy' }]" :key="s.n" class="region-stat">
                <div class="num">{{ s.n }}</div>
                <div class="label">{{ s.l }}</div>
              </div>
            </div>
            <div style="margin-top:40px">
              <a class="btn" style="background:var(--cta-main);color:var(--brand-primary)" href="#">
                Poznaj region
                <DhIcon name="arrow" :size="18" :stroke="1.6" />
              </a>
            </div>
          </div>
          <div class="reveal region-img">
            <img src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1400&q=80" alt="Góry Izerskie" />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── GALLERY ────────────────────────────────────────────────── -->
    <section id="galeria">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Galeria</span>
          <h2>Cztery pory roku w Dolinie.</h2>
          <p class="lede">Jazdy konne wczesną wiosną, koncerty w stodole, sierpniowe zbiory, ciche zimowe poranki — fragmenty życia miejsca.</p>
        </div>
        <div class="gallery-grid reveal">
          <img
            v-for="(g, i) in GALLERY"
            :key="i"
            :src="g.src"
            alt=""
            :class="g.span"
          />
        </div>
      </div>
    </section>

    <!-- ─── TEAM ───────────────────────────────────────────────────── -->
    <section id="zespol" class="cream">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Zespół &amp; partnerzy</span>
          <h2>Ludzie, którzy tworzą Dolinę.</h2>
          <p class="lede">Niewielka grupa stałych mieszkańców i prowadzących, plus szeroki krąg lokalnych rzemieślniczek, muzyków i przewodników.</p>
        </div>
        <div class="team-grid reveal">
          <div v-for="(m, i) in TEAM" :key="i" class="team-member">
            <img class="photo" :src="m.img" :alt="m.name" />
            <h4>{{ m.name }}</h4>
            <span class="role">{{ m.role }}</span>
          </div>
        </div>
        <div class="reveal partners-strip">
          <span class="eyebrow">Współpracujemy z</span>
          <div class="partners-list">
            <span>Fundacja Harmonia Kultury</span>
            <span>· Magiczne Izery</span>
            <span>· Slow Hood Karkonosze</span>
            <span>· Izerski Park Ciemnego Nieba</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── NEWSLETTER ─────────────────────────────────────────────── -->
    <section id="rezerwacja" class="tight">
      <div class="container">
        <div class="newsletter-wrap reveal">
          <div>
            <span class="eyebrow">List z doliny</span>
            <h2 style="margin-top:16px;margin-bottom:16px;font-size:44px">Kalendarz warsztatów &amp; wolne terminy — raz w miesiącu.</h2>
            <p style="color:var(--text-muted);max-width:420px">
              Wysyłamy spokojną wiadomość: nowe warsztaty, otwarte terminy noclegów, fragmenty z izerskiego życia. Bez nachalności.
            </p>
          </div>
          <div class="newsletter-form">
            <div class="row">
              <input v-model="email" type="email" placeholder="twój e-mail" />
              <button class="btn btn-primary" type="button">Zapisz się</button>
            </div>
            <span class="note">Wypisać się można jednym kliknięciem. Nie udostępniamy adresów.</span>
            <div class="newsletter-tip">
              <DhIcon name="herb" :size="44" :stroke="1.4" style="color:var(--accent-earth);flex-shrink:0" />
              <span style="font-family:var(--serif);font-size:15px;color:var(--brand-primary);line-height:1.4">
                Pobyt grupowy? Napisz <a href="mailto:dolina@harmonii.pl">dolina@harmonii.pl</a> — odpowiadamy w 48 godzin.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FOOTER ─────────────────────────────────────────────────── -->
    <footer>
      <div class="container">
        <div class="foot-grid">
          <div class="foot-brand">
            <div class="logo">Dolina Harmonii</div>
            <p>Miejsce naturalnych mocy.<br/>Kopaniec 47, 58-512 Stara Kamienica<br/>Magiczne Izery, Dolny Śląsk</p>
            <div style="display:flex;gap:12px;margin-top:20px">
              <span v-for="ic in ['compass', 'star', 'leaf']" :key="ic" class="foot-icon">
                <DhIcon :name="ic" :size="22" :stroke="1.4" />
              </span>
            </div>
          </div>
          <div>
            <h5>Miejsce</h5>
            <ul>
              <li><a href="#dolina">O Dolinie</a></li>
              <li><a href="#noclegi">Noclegi</a></li>
              <li><a href="#noclegi">Duży Dom</a></li>
              <li><a href="#noclegi">Leśny Domek</a></li>
              <li><a href="#noclegi">Studio z oranżerią</a></li>
            </ul>
          </div>
          <div>
            <h5>Praktyka</h5>
            <ul>
              <li><NuxtLink to="/warsztaty">Warsztaty</NuxtLink></li>
              <li><a href="#">Wydarzenia specjalne</a></li>
              <li><a href="#izery">Magiczne Izery</a></li>
              <li><a href="#galeria">Galeria</a></li>
            </ul>
          </div>
          <div>
            <h5>Kontakt</h5>
            <ul>
              <li>dolina@harmonii.pl</li>
              <li>+48 757 123 456</li>
              <li>pn–pt, 10:00–18:00</li>
              <li><a href="#">Polityka prywatności</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© 2026 Dolina Harmonii · wszystkie prawa zastrzeżone</span>
          <span>strona w przygotowaniu</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* ─── Google Fonts ──────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

/* ─── Design tokens ─────────────────────────────────────────────── */
:root {
  --bg-primary: #F9F7F2;
  --bg-section: #EFEDE5;
  --bg-sage: #E2E8DF;
  --bg-card: #FFFFFF;
  --text-main: #2C2C2C;
  --text-muted: #5C5C58;
  --brand-primary: #1B3022;
  --brand-deep: #122019;
  --accent-soft: #8DA192;
  --accent-earth: #A67C52;
  --accent-earth-deep: #8A6440;
  --cta-main: #E9C46A;
  --cta-main-hover: #D9B25A;
  --line: #DDD7CB;
  --shadow-sm: 0 1px 2px rgba(27,48,34,.04), 0 2px 6px rgba(27,48,34,.05);
  --shadow-md: 0 4px 12px rgba(27,48,34,.06), 0 12px 28px rgba(27,48,34,.08);
  --shadow-lg: 0 8px 24px rgba(27,48,34,.08), 0 24px 60px rgba(27,48,34,.12);
  --serif: 'Lora', Georgia, serif;
  --sans: 'Inter', -apple-system, sans-serif;
  --mono: 'JetBrains Mono', monospace;
  --r-sm: 4px; --r-md: 8px; --r-lg: 16px; --r-pill: 999px;
  --max-w: 1240px;
}

.dh-root * , .dh-root *::before, .dh-root *::after { box-sizing: border-box; }

.dh-root {
  background: var(--bg-primary);
  color: var(--text-main);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.dh-root img { max-width: 100%; display: block; }

.dh-root h1, .dh-root h2, .dh-root h3, .dh-root h4, .dh-root h5 {
  font-family: var(--serif);
  color: var(--brand-primary);
  font-weight: 500;
  letter-spacing: -0.01em;
  margin: 0;
  line-height: 1.15;
}
.dh-root h1 { font-size: clamp(48px, 6vw, 88px); }
.dh-root h2 { font-size: clamp(36px, 4vw, 56px); }
.dh-root h3 { font-size: clamp(24px, 2.4vw, 32px); }
.dh-root h4 { font-size: 20px; }
.dh-root p { margin: 0; }
.dh-root a { color: var(--accent-earth); text-decoration: none; transition: color .2s; }
.dh-root a:hover { color: var(--brand-primary); }

/* ─── Utilities ─────────────────────────────────────────────────── */
.eyebrow {
  font-family: var(--sans);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-earth);
}

.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 48px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--sans);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.04em;
  padding: 14px 26px;
  border-radius: var(--r-sm);
  border: none;
  cursor: pointer;
  transition: all .2s;
  text-decoration: none;
}
/* btn-primary */
.dh-root .btn-primary {
  background: var(--cta-main);
  color: var(--brand-primary);
}
.dh-root .btn-primary:hover {
  background: var(--cta-main-hover);
  color: var(--brand-primary);
  transform: translateY(-1px);
}
.btn-secondary { background: transparent; border: 1px solid var(--accent-earth); color: var(--accent-earth); }
.btn-secondary:hover { background: var(--accent-earth); color: var(--bg-primary); }

/* btn-glass — tylko w hero, jasny tekst bo na ciemnym tle */
.dh-root .btn-glass {
  background: rgba(249,247,242,0.15);
  color: #FAF8F2;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(249,247,242,0.4);
}
.dh-root .btn-glass:hover {
  background: rgba(249,247,242,0.28);
  color: #FAF8F2;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-family: var(--sans);
  font-weight: 500;
  padding: 6px 12px;
  border-radius: var(--r-pill);
  background: var(--bg-sage);
  color: var(--brand-primary);
  letter-spacing: 0.02em;
}

/* ─── Sections ──────────────────────────────────────────────────── */
.dh-root section { padding: 120px 0; position: relative; }
.dh-root section.tight { padding: 80px 0; }
.dh-root section.cream { background: var(--bg-section); }
.dh-root section.sage { background: var(--bg-sage); }

.section-head {
  text-align: center;
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.section-head h2 { max-width: 720px; }
.section-head .lede { color: var(--text-muted); max-width: 580px; }

/* ─── Nav ───────────────────────────────────────────────────────── */
.nav-pill {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(249,247,242,0.92);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(141,161,146,0.3);
  border-radius: var(--r-pill);
  padding: 6px 6px 6px 20px;
  box-shadow: var(--shadow-md);
  font-size: 13px;
  white-space: nowrap;
  max-width: calc(100vw - 48px);
}
.nav-pill .brand {
  font-family: var(--serif);
  color: var(--brand-primary);
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 18px;
  margin-right: 4px;
  border-right: 1px solid var(--line);
  flex-shrink: 0;
  text-decoration: none;
}
.nav-pill ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0 4px;
  gap: 0;
}
.nav-pill li a {
  display: block;
  padding: 8px 12px;
  color: var(--brand-primary);
  font-weight: 500;
  font-size: 13px;
  border-radius: var(--r-pill);
  transition: background .2s, color .2s;
}
.nav-pill li a:hover { background: var(--bg-sage); color: var(--brand-primary); }
/* nav-cta */
.nav-pill .nav-cta {
  background: transparent;
  color: var(--brand-primary);
  padding: 9px 18px;
  border-radius: var(--r-pill);
  border: 1px solid var(--accent-earth);
  font-weight: 500;
  font-size: 13px;
  margin-left: 8px;
  transition: background .2s, color .2s;
  flex-shrink: 0;
  text-decoration: none;
}
.nav-pill .nav-cta:hover {
  background: var(--accent-earth);
  color: var(--bg-primary);
  border-color: var(--accent-earth);
}

/* ─── Hero ──────────────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100vh;
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
  background: linear-gradient(180deg, rgba(27,48,34,.15) 0%, rgba(27,48,34,.05) 30%, rgba(249,247,242,0) 60%, rgba(249,247,242,.95) 100%);
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
.hero-tagline {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(28px, 3.2vw, 44px);
  line-height: 1.2;
  font-weight: 400;
  max-width: 680px;
  margin: 0 auto 40px;
  color: #FAF8F2;
  text-shadow: 0 2px 30px rgba(27,48,34,.4);
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
  color: rgba(250,248,242,.85);
}
.hero-meta span { display: flex; align-items: center; gap: 8px; }

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
  margin-bottom: 32px;
  font-weight: 400;
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

/* ─── Workshops ─────────────────────────────────────────────────── */
.workshops-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 56px;
  gap: 48px;
}
.workshops-head h2 { max-width: 600px; }
.workshops-head .lede { max-width: 380px; color: var(--text-muted); }
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
.workshop-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.workshop-card .img { aspect-ratio: 4/5; width: 100%; object-fit: cover; }
.workshop-card .body { padding: 24px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.workshop-card .head-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.workshop-card .icon-wrap { width: 36px; height: 36px; color: var(--brand-primary); flex-shrink: 0; }
.workshop-card h4 { font-family: var(--serif); font-size: 22px; font-weight: 500; margin: 0; }
.workshop-card .meta { display: flex; gap: 16px; font-size: 12px; color: var(--text-muted); font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }
.workshop-card p { font-size: 14px; color: var(--text-muted); line-height: 1.5; }

/* ─── Accommodations ────────────────────────────────────────────── */
.accommodation {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 140px;
}
.accommodation:last-child { margin-bottom: 0; }
.accommodation.reverse { grid-template-columns: 1fr 1.1fr; }
.accommodation.reverse .acc-imgs { order: 2; }
.accommodation.reverse .acc-text { order: 1; }
.acc-imgs { position: relative; aspect-ratio: 4/5; }
.acc-imgs .main { width: 100%; height: 100%; object-fit: cover; border-radius: var(--r-md); }
.acc-imgs .small {
  position: absolute;
  width: 45%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: var(--r-md);
  border: 8px solid var(--bg-primary);
  box-shadow: var(--shadow-md);
}
.accommodation:not(.reverse) .acc-imgs .small { bottom: -40px; right: -40px; }
.accommodation.reverse .acc-imgs .small { bottom: -40px; left: -40px; }
.acc-text .num { font-family: var(--mono); font-size: 12px; letter-spacing: 0.18em; color: var(--accent-earth); text-transform: uppercase; margin-bottom: 20px; display: block; }
.acc-text h3 { font-size: 48px; margin-bottom: 20px; }
.acc-features { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 32px; margin-bottom: 32px; max-width: 480px; }
.acc-feature { display: flex; align-items: center; gap: 14px; font-size: 14px; color: var(--text-main); }
.acc-feature .icon { width: 30px; height: 30px; color: var(--accent-earth); flex-shrink: 0; }
.acc-price {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 20px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  max-width: 480px;
}
.acc-price .label { font-family: var(--mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-muted); }
.acc-price .price { font-family: var(--serif); font-size: 32px; color: var(--brand-primary); }
.acc-price .unit { font-size: 14px; color: var(--text-muted); }

/* ─── Region ────────────────────────────────────────────────────── */
.region {
  background: var(--brand-primary) !important;
  color: var(--bg-primary);
  padding: 140px 0 !important;
}
.region-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center; }
.region-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 40px; }
.region-stat { border-top: 1px solid rgba(249,247,242,.2); padding-top: 16px; }
.region-stat .num { font-family: var(--serif); font-size: 40px; font-weight: 500; color: var(--cta-main); line-height: 1; margin-bottom: 8px; }
.region-stat .label { font-size: 12px; color: rgba(249,247,242,.7); letter-spacing: 0.04em; }
.region-img { aspect-ratio: 4/5; border-radius: var(--r-md); overflow: hidden; }
.region-img img { width: 100%; height: 100%; object-fit: cover; }

/* ─── Gallery ───────────────────────────────────────────────────── */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 240px;
  gap: 12px;
}
.gallery-grid img { width: 100%; height: 100%; object-fit: cover; border-radius: var(--r-sm); transition: opacity .3s; }
.gallery-grid img:hover { opacity: .9; }
.gallery-grid .span-2-col { grid-column: span 2; }
.gallery-grid .span-2-row { grid-row: span 2; }

/* ─── Team ──────────────────────────────────────────────────────── */
.team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
.team-member { text-align: left; }
.team-member .photo { aspect-ratio: 3/4; width: 100%; object-fit: cover; border-radius: var(--r-md); margin-bottom: 16px; filter: saturate(0.85); }
.team-member h4 { font-family: var(--serif); margin-bottom: 4px; }
.team-member .role { font-size: 13px; color: var(--accent-earth); font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.1em; }
.partners-strip { margin-top: 80px; padding: 40px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.partners-list { display: flex; gap: 48px; flex: 1; justify-content: space-around; flex-wrap: wrap; font-family: var(--serif); font-size: 18px; color: var(--brand-primary); font-style: italic; }

/* ─── Newsletter ────────────────────────────────────────────────── */
.newsletter-wrap {
  background: var(--bg-sage);
  border-radius: var(--r-lg);
  padding: 72px 64px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.newsletter-form { display: flex; flex-direction: column; gap: 12px; }
.newsletter-form .row { display: flex; gap: 8px; }
.newsletter-form input { flex: 1; padding: 14px 18px; font-family: var(--sans); font-size: 14px; border: 1px solid var(--line); border-radius: var(--r-sm); background: var(--bg-primary); color: var(--text-main); outline: none; }
.newsletter-form input:focus { border-color: var(--brand-primary); }
.newsletter-form .note { font-size: 12px; color: var(--text-muted); }
.newsletter-tip { margin-top: 16px; display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--bg-primary); border-radius: var(--r-md); border: 1px solid var(--line); }

/* ─── Footer ────────────────────────────────────────────────────── */
footer {
  background: var(--brand-deep);
  color: rgba(249,247,242,.75);
  padding: 80px 0 32px;
  font-size: 14px;
}
footer .foot-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 64px; }
footer h5 { color: var(--bg-primary); font-family: var(--sans); font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 20px; font-weight: 600; }
footer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
footer ul a { color: rgba(249,247,242,0.45); }
footer ul a:hover { color: var(--cta-main); }
footer .foot-brand .logo { font-family: var(--serif); font-style: italic; font-size: 32px; color: var(--bg-primary); margin-bottom: 12px; }
footer .foot-bottom { display: flex; justify-content: space-between; padding-top: 32px; border-top: 1px solid rgba(249,247,242,.1); font-size: 12px; color: rgba(249,247,242,.5); font-family: var(--mono); letter-spacing: 0.08em; text-transform: uppercase; }
.foot-icon { width: 44px; height: 44px; border: 1px solid rgba(249,247,242,.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(249,247,242,.7); }

/* ─── Reveal animation ──────────────────────────────────────────── */
.reveal { opacity: 0; transform: translateY(20px); transition: opacity .8s ease, transform .8s ease; }
.reveal.in { opacity: 1; transform: translateY(0); }
</style>