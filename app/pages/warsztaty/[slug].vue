<script setup lang="ts">
import type { Workshop, Instructor } from '~/types/directus'

definePageMeta({ layout: false })

const route = useRoute()
const { getWorkshop, getImageUrl } = useDirectus()

const { data, error } = await useAsyncData(
  `workshop-${route.params.slug}`,
  () => getWorkshop(route.params.slug as string)
)

const workshop = computed(() => data.value?.data?.[0] ?? null)

useSeoMeta({
  title: () => workshop.value ? `${workshop.value.title} — Dolina Harmonii` : 'Warsztat — Dolina Harmonii',
  description: () => workshop.value?.meta_description || workshop.value?.short_description || '',
})

const lightboxIndex = ref<number | null>(null)

const galleryImages = computed(() => {
  if (!workshop.value) return STATIC_W.gallery
  if (workshop.value.cover_image) {
    return [getImageUrl(workshop.value.cover_image, { width: 1400, format: 'webp' })]
  }
  return STATIC_W.gallery
})

function openLightbox(i: number) { lightboxIndex.value = i }
function closeLightbox() { lightboxIndex.value = null }
function prevImg() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length
}
function nextImg() {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryImages.value.length
}

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (lightboxIndex.value === null) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImg()
    if (e.key === 'ArrowLeft') prevImg()
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))

  const els = document.querySelectorAll('.reveal')
  const io = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
    { threshold: 0.1 }
  )
  els.forEach(el => io.observe(el))
  onUnmounted(() => io.disconnect())
})

const displayData = computed(() => {
  if (workshop.value) {
    const w = workshop.value
    const spotsFree = w.capacity - (w.spots_taken ?? 0)
    const pct = ((w.spots_taken ?? 0) / w.capacity) * 100
    const instructor = Array.isArray(w.instructors) && w.instructors.length > 0
      ? w.instructors[0].instructors_id : null
    return {
      title: w.title,
      category: typeof w.category === 'object' ? w.category : null,
      lede: w.short_description,
      description: w.description,
      price: `${w.price} zł`,
      date: w.start_date ? new Date(w.start_date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
      duration: '',
      spotsTotal: w.capacity,
      spotsFree,
      pct,
      instructor,
    }
  }
  return {
    title: STATIC_W.title,
    category: STATIC_W.category,
    lede: STATIC_W.lede,
    description: null,
    price: STATIC_W.price,
    date: STATIC_W.date,
    duration: STATIC_W.duration,
    spotsTotal: STATIC_W.spotsTotal,
    spotsFree: STATIC_W.spotsTotal - STATIC_W.spotsTaken,
    pct: (STATIC_W.spotsTaken / STATIC_W.spotsTotal) * 100,
    instructor: STATIC_W.instructor,
  }
})

const STATIC_W = {
  title: 'Mindfulness w naturze',
  category: { name: 'Mindfulness', icon: 'meditation' },
  level: 'Wszystkie poziomy',
  lede: 'Trzydniowy warsztat uważnej obecności w terenie. Codzienna praktyka rano, spacery medytacyjne, wieczorny krąg ciszy przy ognisku.',
  date: '8–10 maja 2026',
  hours: '17:00 (pt) — 14:00 (nd)',
  duration: '3 dni · 18h praktyki',
  spotsTotal: 12,
  spotsTaken: 8,
  price: '1 480 zł',
  intro: 'Zatrzymujemy się na trzy dni, żeby z uważnością wrócić do tego, co bezpośrednie: oddech, krok, dotyk powietrza na skórze. To warsztat dla osób, które chcą zacząć praktykę mindfulness — albo pogłębić ją w innym kontekście niż miejski kurs.',
  body: [
    'Pracujemy w niedużej grupie (max 12 osób) w drewnianym Domu Jogi i w okolicznym lesie. Codzienna praktyka medytacji prowadzonej przeplata się z nieformalnymi spacerami, milczącymi posiłkami i kręgiem dzielenia.',
    'Nie wymagamy żadnego doświadczenia. Wymagamy gotowości — żeby na trzy dni odłożyć telefon, posiedzieć w niewygodzie, posłuchać siebie i innych. Uważność jest umiejętnością; jak każdą inną — można jej się nauczyć.',
  ],
  gallery: [
    'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1400&q=80',
  ],
  includes: [
    { ic: 'bed',        t: '2 noclegi w pokojach 2-os' },
    { ic: 'tea',        t: 'Pełne wyżywienie wegetariańskie' },
    { ic: 'meditation', t: '18h praktyki prowadzonej' },
    { ic: 'candle',     t: 'Krąg przy ognisku' },
    { ic: 'bath',       t: 'Sauna fińska (sobota wieczorem)' },
    { ic: 'herb',       t: 'Materiały i herbaty ziołowe' },
  ],
  bring: [
    'Wygodne ubrania w kilku warstwach (zmienna pogoda)',
    'Buty trekkingowe lub wodoodporne',
    'Mata, koc i poduszka — opcjonalnie (mamy też swoje)',
    'Notes i długopis',
    'Telefon na czas warsztatu trafia do koszyka — to część praktyki',
  ],
  instructor: {
    name: 'Joanna Lis',
    role: 'Prowadząca · nauczycielka mindfulness',
    bio: 'Certyfikowana nauczycielka MBSR (Bangor University). Prowadzi warsztaty od 2014 r., związana z Doliną Harmonii od początku. Autorka książki „Praktyka, nie ucieczka".',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    email: 'joanna@harmonii.pl',
    phone: '+48 691 230 451',
  },
}
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
      <NuxtLink class="nav-cta" to="/warsztaty">Wszystkie warsztaty</NuxtLink>
    </nav>

    <!-- ─── HERO ──────────────────────────────────────────────────── -->
    <section class="w-hero">
      <div class="container">

        <div class="w-hero-grid">
          <!-- Left: title + meta -->
          <div>
            <div class="cat-row">
              <span class="cat-pill">
                <DhIcon
                  :name="typeof displayData.category === 'object' && displayData.category?.icon ? displayData.category.icon.split(':').pop()! : 'meditation'"
                  :size="16" :stroke="1.4"
                />
                {{ typeof displayData.category === 'object' ? displayData.category?.name : displayData.category }}
              </span>
              <span class="level-pill">{{ STATIC_W.level }}</span>
            </div>
            <h1 v-html="displayData.title.replace(/w naturze/, '<em>w naturze</em>')" />
            <p class="lede">{{ displayData.lede }}</p>
          </div>

          <!-- Right: booking card -->
          <aside class="book-card" id="zapis">
            <div class="book-label">Cena za osobę</div>
            <div class="book-price">
              {{ displayData.price }}
              <small>brutto</small>
            </div>

            <div class="avail-wrap">
              <div class="avail-head">
                <span class="ah-l">Wolne miejsca</span>
                <span class="ah-r">{{ displayData.spotsFree }} z {{ displayData.spotsTotal }}</span>
              </div>
              <div class="avail-bar">
                <div class="fill" :style="{ width: `${displayData.pct}%` }" />
              </div>
              <div class="avail-meta">
                <span>{{ displayData.spotsTotal - displayData.spotsFree }} zajętych</span>
                <span>zostało {{ displayData.spotsFree }}</span>
              </div>
            </div>

            <div class="divide" />

            <div class="book-row">
              <span class="bk">Termin</span>
              <span class="bv">{{ displayData.date }}</span>
            </div>
            <div class="book-row">
              <span class="bk">Czas trwania</span>
              <span class="bv">{{ displayData.duration || STATIC_W.duration }}</span>
            </div>
          </aside>
        </div>

        <!-- Gallery strip -->
        <div class="w-gallery-strip">
          <div>
            <img :src="galleryImages[0]" alt="" />
          </div>
          <div class="right-stack">
            <div><img :src="galleryImages[1]" alt="" /></div>
            <div>
              <img :src="galleryImages[2]" alt="" />
              <div class="more-overlay">+ {{ galleryImages.length - 3 }} zdjęć</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── BODY ──────────────────────────────────────────────────── -->
    <section class="w-body">
      <div class="container">
        <div class="w-body-grid">

          <!-- Main content -->
          <div>
            <!-- About -->
            <div class="w-section reveal">
              <span class="eyebrow">O warsztacie</span>
              <h2 style="margin-top:16px">Trzy dni z uważnością — od oddechu do kroku.</h2>
              <p class="lead-p">{{ STATIC_W.intro }}</p>
              <p v-for="(p, i) in STATIC_W.body" :key="i">{{ p }}</p>
            </div>

            <!-- Includes + Bring -->
            <div class="w-section reveal" style="display:grid;grid-template-columns:1fr 1fr;gap:56px">
              <div>
                <span class="eyebrow">W cenie</span>
                <h2 style="margin-top:16px;font-size:28px">Co jest wliczone</h2>
                <ul class="check-list" style="margin-top:24px">
                  <li v-for="(it, i) in STATIC_W.includes" :key="i">
                    <span class="ico"><DhIcon :name="it.ic" :size="26" :stroke="1.4" /></span>
                    <span>{{ it.t }}</span>
                  </li>
                </ul>
              </div>
              <div>
                <span class="eyebrow">Zabierz ze sobą</span>
                <h2 style="margin-top:16px;font-size:28px">Praktyczne</h2>
                <ul class="check-list" style="margin-top:24px">
                  <li v-for="(t, i) in STATIC_W.bring" :key="i">
                    <span class="ico"><DhIcon name="leaf" :size="22" :stroke="1.4" /></span>
                    <span>{{ t }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Sidebar — only instructor -->
          <aside class="side">
            <div class="instructor-card reveal">
              <div class="head">
                <img
                  class="photo"
                  :src="displayData.instructor?.photo || STATIC_W.instructor.photo"
                  :alt="displayData.instructor?.name || STATIC_W.instructor.name"
                />
                <div class="inst-body">
                  <div class="role">{{ STATIC_W.instructor.role }}</div>
                  <h3>{{ displayData.instructor?.name || STATIC_W.instructor.name }}</h3>
                </div>
              </div>
              <p>{{ STATIC_W.instructor.bio }}</p>
              <div class="contact">
                <a :href="`mailto:${STATIC_W.instructor.email}`">
                  <DhIcon name="seed" :size="16" :stroke="1.4" />
                  {{ STATIC_W.instructor.email }}
                </a>
                <a :href="`tel:${STATIC_W.instructor.phone.replace(/\s/g, '')}`">
                  <DhIcon name="compass" :size="16" :stroke="1.4" />
                  {{ STATIC_W.instructor.phone }}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ─── LIGHTBOX ──────────────────────────────────────────────── -->
    <Teleport to="body">
      <div v-if="lightboxIndex !== null" class="lightbox open" @click="closeLightbox">
        <button class="lightbox-nav prev" @click.stop="prevImg">←</button>
        <img :src="galleryImages[lightboxIndex]" alt="" @click.stop />
        <button class="lightbox-nav next" @click.stop="nextImg">→</button>
        <button class="lightbox-close" @click="closeLightbox">×</button>
        <div class="lightbox-counter">{{ lightboxIndex + 1 }} / {{ galleryImages.length }}</div>
      </div>
    </Teleport>

    <!-- ─── FOOTER ─────────────────────────────────────────────────── -->
    <footer>
      <div class="container">
        <div style="text-align:center;padding:40px 0;border-bottom:1px solid rgba(249,247,242,0.1)">
          <div style="font-family:var(--serif);font-style:italic;font-size:36px;color:var(--bg-primary);margin-bottom:8px">Dolina Harmonii</div>
          <p style="color:rgba(249,247,242,0.7)">Kopaniec 47 · 58-512 Stara Kamienica · dolina@harmonii.pl</p>
        </div>
        <div style="display:flex;justify-content:space-between;padding:32px 0;font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(249,247,242,0.5)">
          <span>© 2026 Dolina Harmonii</span>
          <NuxtLink to="/warsztaty" style="color:inherit">← Wszystkie warsztaty</NuxtLink>
        </div>
      </div>
    </footer>

  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

/* ─── Hero ────────────────────────────────────────────────────── */
.w-hero { padding: 160px 0 0; background: var(--bg-section); border-bottom: 1px solid var(--line); }
.w-hero-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 64px; align-items: end; }
.w-hero h1 { font-size: clamp(56px, 6.4vw, 104px); font-style: italic; font-weight: 500; line-height: 0.96; letter-spacing: -0.02em; margin-bottom: 28px; }
.w-hero h1 em { color: var(--accent-earth); font-style: italic; }
.w-hero .lede { font-family: var(--serif); font-size: 22px; line-height: 1.45; color: var(--text-muted); max-width: 560px; margin-bottom: 32px; }
.cat-row { display: flex; gap: 10px; align-items: center; margin-bottom: 28px; }
.cat-pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: var(--r-pill); background: var(--bg-card); border: 1px solid var(--line); font-size: 12px; font-weight: 500; letter-spacing: .04em; color: var(--brand-primary); }
.level-pill { font-family: var(--mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-muted); padding: 8px 0 8px 14px; border-left: 1px solid var(--line); }

/* ─── Booking Card ────────────────────────────────────────────── */
.book-card { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-md); box-shadow: var(--shadow-md); padding: 32px; transform: translateY(64px); }
.book-label { font-family: var(--mono); font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; }
.book-price { font-family: var(--serif); font-size: 44px; line-height: 1; color: var(--brand-primary); font-weight: 500; }
.book-price small { font-size: 14px; color: var(--text-muted); font-weight: 400; margin-left: 8px; letter-spacing: .04em; }
.divide { height: 1px; background: var(--line); margin: 24px 0; }
.book-row { display: flex; justify-content: space-between; align-items: baseline; padding: 10px 0; gap: 16px; }
.book-row .bk { font-size: 13px; color: var(--text-muted); }
.book-row .bv { font-family: var(--serif); font-size: 16px; color: var(--brand-primary); text-align: right; }

/* ─── Availability ────────────────────────────────────────────── */
.avail-wrap { padding: 18px 0 6px; }
.avail-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.avail-head .ah-l { font-size: 13px; color: var(--text-muted); }
.avail-head .ah-r { font-family: var(--serif); font-size: 18px; color: var(--brand-primary); }
.avail-bar { height: 8px; background: var(--bg-section); border-radius: var(--r-pill); overflow: hidden; position: relative; }
.avail-bar .fill { position: absolute; inset: 0 auto 0 0; background: linear-gradient(90deg, var(--accent-earth), var(--cta-main)); border-radius: var(--r-pill); }
.avail-meta { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-muted); margin-top: 8px; display: flex; justify-content: space-between; }

/* ─── Gallery Strip ───────────────────────────────────────────── */
.w-gallery-strip { margin-top: 96px; display: grid; grid-template-columns: 2fr 1fr; gap: 8px; height: 460px; }
.w-gallery-strip > div { overflow: hidden; border-radius: var(--r-sm); position: relative; background: var(--bg-section); }
.w-gallery-strip img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s ease; }
.w-gallery-strip > div:hover img { transform: scale(1.04); }
.w-gallery-strip .right-stack { display: grid; grid-template-rows: 1fr 1fr; gap: 8px; height: 100%; }
.w-gallery-strip .more-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(27,48,34,0) 60%, rgba(27,48,34,.6) 100%); display: flex; align-items: flex-end; padding: 16px; color: var(--bg-primary); font-family: var(--mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; pointer-events: none; }

/* ─── Body ────────────────────────────────────────────────────── */
.w-body { padding: 96px 0; }
.w-body-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 96px; align-items: start; }
.w-section { margin-bottom: 72px; }
.w-section:last-child { margin-bottom: 0; }
.w-section h2 { font-size: 36px; margin-bottom: 24px; }
.w-section .lead-p { font-family: var(--serif); font-size: 22px; line-height: 1.5; color: var(--brand-primary); margin-bottom: 24px; }
.w-section p { color: var(--text-muted); margin-bottom: 16px; font-size: 16px; line-height: 1.7; }

/* ─── Check list ──────────────────────────────────────────────── */
.check-list { display: flex; flex-direction: column; gap: 14px; margin: 0; padding: 0; }
.check-list li { display: flex; gap: 14px; align-items: flex-start; list-style: none; font-size: 15px; color: var(--text-main); }
.check-list .ico { width: 28px; height: 28px; flex-shrink: 0; color: var(--accent-earth); margin-top: -2px; }

/* ─── Sidebar ─────────────────────────────────────────────────── */
.side { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 32px; }
.instructor-card { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; padding: 24px; }
.instructor-card .head { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.instructor-card .photo { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; filter: saturate(0.9); flex-shrink: 0; }
.instructor-card .inst-body { flex: 1; min-width: 0; }
.instructor-card .role { font-family: var(--mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--accent-earth); margin-bottom: 4px; }
.instructor-card h3 { font-size: 20px; margin-bottom: 0; line-height: 1.2; }
.instructor-card p { color: var(--text-muted); font-size: 13px; line-height: 1.55; margin-bottom: 14px; }
.instructor-card .contact { border-top: 1px solid var(--line); padding-top: 14px; display: flex; flex-direction: column; gap: 8px; }
.instructor-card .contact a { display: flex; align-items: center; gap: 10px; color: var(--brand-primary); font-size: 13px; }
.instructor-card .contact a:hover { color: var(--accent-earth); }

/* ─── Lightbox ────────────────────────────────────────────────── */
.lightbox { position: fixed; inset: 0; z-index: 100; background: rgba(18,32,25,0.94); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 48px; }
.lightbox img { max-width: 90vw; max-height: 86vh; object-fit: contain; border-radius: var(--r-sm); box-shadow: var(--shadow-lg); }
.lightbox-close, .lightbox-nav { position: absolute; background: rgba(249,247,242,0.1); color: #FAF8F2; border: 1px solid rgba(249,247,242,0.2); width: 48px; height: 48px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; font-size: 20px; }
.lightbox-close:hover, .lightbox-nav:hover { background: rgba(249,247,242,0.2); }
.lightbox-close { top: 24px; right: 24px; }
.lightbox-nav.prev { left: 24px; top: 50%; transform: translateY(-50%); }
.lightbox-nav.next { right: 24px; top: 50%; transform: translateY(-50%); }
.lightbox-counter { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); font-family: var(--mono); font-size: 12px; letter-spacing: .12em; color: rgba(249,247,242,.7); text-transform: uppercase; }

/* ─── Reveal ──────────────────────────────────────────────────── */
.reveal { opacity: 0; transform: translateY(20px); transition: opacity .8s ease, transform .8s ease; }
.reveal.in { opacity: 1; transform: translateY(0); }
</style>