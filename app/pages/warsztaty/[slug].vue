<script setup lang="ts">
import type { Workshop } from '~~/types/directus'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { getWorkshop, getWorkshops, getImageUrl } = useDirectus()

const { data } = await useAsyncData(
  `workshop-${slug.value}`,
  () => getWorkshop(slug.value),
)

const workshop = computed(() => data.value?.data?.[0] ?? null)

if (!workshop.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Nie znaleziono takiego warsztatu',
    fatal: true,
  })
}

const { data: relatedData } = await useAsyncData(
  `related-${slug.value}`,
  () => {
    const cat = workshop.value?.category
    const id = typeof cat === 'object' ? cat?.id : null
    if (!id) return Promise.resolve(null)
    return getWorkshops({
      filter: {
        _and: [
          { status: { _eq: 'published' } },
          { category: { id: { _eq: id } } },
          { slug: { _neq: slug.value } },
        ],
      },
      limit: 3,
    })
  },
)

const origin = useRequestURL().origin

useSeoMeta({
  title: () => workshop.value
    ? (workshop.value.meta_title || `${workshop.value.title} — Dolina Harmonii`)
    : 'Warsztat — Dolina Harmonii',
  description: () => workshop.value?.meta_description || workshop.value?.short_description || '',
  ogTitle: () => workshop.value?.title ?? 'Warsztat — Dolina Harmonii',
  ogDescription: () => workshop.value?.meta_description || workshop.value?.short_description || '',
  ogUrl: () => `${origin}/warsztaty/${slug.value}`,
  ogImage: () => workshop.value?.cover_image
    ? getImageUrl(workshop.value.cover_image, { width: 1200, format: 'webp' })
    : `${origin}/duzy_dom.avif`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => workshop.value?.title ?? 'Warsztat — Dolina Harmonii',
  twitterDescription: () => workshop.value?.meta_description || workshop.value?.short_description || '',
  twitterImage: () => workshop.value?.cover_image
    ? getImageUrl(workshop.value.cover_image, { width: 1200, format: 'webp' })
    : `${origin}/duzy_dom.avif`,
})

useHead(computed(() => ({
  script: workshop.value ? [{
    key: 'ld-event',
    type: 'application/ld+json' as const,
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: workshop.value.title,
      description: workshop.value.short_description,
      startDate: workshop.value.start_date,
      endDate: workshop.value.end_date,
      url: `${origin}/warsztaty/${slug.value}`,
      location: {
        '@type': 'Place',
        name: 'Dolina Harmonii',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kopaniec',
          addressRegion: 'Dolny Śląsk',
          addressCountry: 'PL',
        },
      },
      ...(workshop.value.price ? {
        offers: {
          '@type': 'Offer',
          price: String(workshop.value.price),
          priceCurrency: 'PLN',
          availability: 'https://schema.org/InStock',
          url: `${origin}/warsztaty/${slug.value}#zapis`,
        },
      } : {}),
      ...(workshop.value.cover_image ? {
        image: getImageUrl(workshop.value.cover_image, { width: 1200, format: 'webp' }),
      } : {}),
      organizer: {
        '@type': 'Organization',
        name: 'Dolina Harmonii',
        url: origin,
      },
    }),
  }] : [],
})))

const lightboxIndex = ref<number | null>(null)

const galleryImages = computed(() => {
  const imgs: string[] = []
  if (workshop.value?.cover_image) {
    imgs.push(getImageUrl(workshop.value.cover_image, { width: 1400, format: 'webp' }))
  }
  if (Array.isArray(workshop.value?.gallery)) {
    for (const item of workshop.value.gallery) {
      const fileId = typeof item === 'object' && item !== null ? item.directus_files_id : item
      if (fileId) imgs.push(getImageUrl(fileId, { width: 1400, format: 'webp' }))
    }
  }
  return imgs
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

function onKey(e: KeyboardEvent) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') nextImg()
  else if (e.key === 'ArrowLeft') prevImg()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

useScrollReveal()

const category = computed(() => {
  const cat = workshop.value?.category
  return typeof cat === 'object' ? cat : null
})

const instructor = computed(() => {
  const w = workshop.value
  if (!w || !Array.isArray(w.instructors) || w.instructors.length === 0) return null
  return w.instructors[0]?.instructors_id ?? null
})

const spotsInfo = computed(() => {
  const w = workshop.value
  if (!w?.capacity) return null
  const free = w.capacity - (w.spots_taken ?? 0)
  const pct = ((w.spots_taken ?? 0) / w.capacity) * 100
  return { total: w.capacity, free, taken: w.spots_taken ?? 0, pct }
})

const startDate = computed(() =>
  workshop.value?.start_date
    ? new Date(workshop.value.start_date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
    : null
)

const duration = computed(() => {
  const { start_date, end_date } = workshop.value ?? {}
  if (!start_date || !end_date) return null
  const days = Math.round((new Date(end_date).getTime() - new Date(start_date).getTime()) / 86_400_000) + 1
  return days === 1 ? '1 dzień' : `${days} dni`
})

const relatedWorkshops = computed(() =>
  relatedData.value?.data?.map((w: Workshop) => ({
    slug: w.slug,
    title: w.title,
    date: w.start_date ? new Date(w.start_date).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }) : '',
    img: w.cover_image ? getImageUrl(w.cover_image, { width: 400, format: 'webp' }) : '',
  })) ?? []
)
</script>

<template>
  <div class="workshop-detail-page">
    <!-- ─── HERO ──────────────────────────────────────────────────── -->
    <header class="w-hero">
      <div class="container">
        <div class="w-hero-grid">
          <!-- Left: title + meta -->
          <div class="w-hero-title-col">
            <div v-if="category" class="cat-row">
              <span class="cat-pill">
                <DhIcon
                  :name="category.icon ? category.icon.split(':').pop()! : 'meditation'"
                  :size="16" :stroke="1.4"
                />
                {{ category.name }}
              </span>
            </div>
            <h1>{{ workshop?.title }}</h1>
            <p v-if="workshop?.short_description" class="lede">{{ workshop.short_description }}</p>
          </div>

          <!-- Right: booking card -->
          <aside class="book-card" id="zapis">
            <template v-if="workshop?.price">
              <div class="book-label">Cena za osobę</div>
              <div class="book-price">
                {{ workshop.price }} zł
                <small>brutto</small>
              </div>
            </template>

            <div v-if="spotsInfo" class="avail-wrap">
              <div class="avail-head">
                <span class="ah-l">Wolne miejsca</span>
                <span class="ah-r">{{ spotsInfo.free }} z {{ spotsInfo.total }}</span>
              </div>
              <div class="avail-bar">
                <div class="fill" :style="{ width: `${spotsInfo.pct}%` }" />
              </div>
              <div class="avail-meta">
                <span>{{ spotsInfo.taken }} zajętych</span>
                <span>zostało {{ spotsInfo.free }}</span>
              </div>
            </div>

            <div class="divide" />

            <div v-if="startDate" class="book-row">
              <span class="bk">Termin</span>
              <span class="bv">{{ startDate }}</span>
            </div>
            <div v-if="duration" class="book-row">
              <span class="bk">Czas trwania</span>
              <span class="bv">{{ duration }}</span>
            </div>
          </aside>
        </div>

      </div>
    </header>

    <!-- ─── BODY ──────────────────────────────────────────────────── -->
    <section class="w-body">
      <div class="container">
        <div class="w-body-grid">
          <!-- Main content -->
          <div class="w-content-col">
            <div v-if="workshop?.description" class="w-section reveal">
              <span class="eyebrow">O warsztacie</span>
              <div class="body-p-wrap" v-html="workshop.description" />
            </div>
          </div>

          <!-- Sidebar — only instructor -->
          <aside class="side">
            <div v-if="instructor" class="instructor-card reveal">
              <span class="inst-label">Prowadzący</span>
              <div class="inst-head">
                <img
                  v-if="instructor.photo"
                  class="photo"
                  :src="getImageUrl(instructor.photo, { width: 200, format: 'webp' })"
                  :alt="instructor.name"
                />
                <div class="inst-info">
                  <div v-if="instructor.role" class="role-tag">{{ instructor.role }}</div>
                  <h3 class="inst-name">{{ instructor.name }}</h3>
                </div>
              </div>
              <p v-if="instructor.bio" class="inst-bio">{{ instructor.bio }}</p>
              <div class="inst-contact">
                <a v-if="instructor.email" :href="`mailto:${instructor.email}`" class="contact-link">
                  <DhIcon name="seed" :size="16" :stroke="1.4" />
                  {{ instructor.email }}
                </a>
                <a v-if="instructor.phone" :href="`tel:${instructor.phone.replace(/\s/g, '')}`" class="contact-link">
                  <DhIcon name="compass" :size="16" :stroke="1.4" />
                  {{ instructor.phone }}
                </a>
                <a v-if="instructor.website" :href="instructor.website" class="contact-link" target="_blank" rel="noopener">
                  <DhIcon name="leaf" :size="16" :stroke="1.4" />
                  {{ instructor.website }}
                </a>
              </div>
            </div>

            <div v-if="relatedWorkshops.length" class="related-card reveal">
              <span class="eyebrow">Z tej samej kategorii</span>
              <div class="related-list">
                <NuxtLink
                  v-for="w in relatedWorkshops"
                  :key="w.slug"
                  :to="`/warsztaty/${w.slug}`"
                  class="related-item"
                >
                  <img v-if="w.img" :src="w.img" alt="" />
                  <div class="related-meta">
                    <div class="related-title">{{ w.title }}</div>
                    <div class="related-date">{{ w.date }}</div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ─── GALLERY ───────────────────────────────────────────────── -->
    <section v-if="galleryImages.length" class="w-gallery-section">
      <div class="container">
        <div class="w-gallery-strip" :class="{ 'single': galleryImages.length === 1 }">
          <div class="gallery-main" @click="openLightbox(0)">
            <img :src="galleryImages[0]" alt="" />
          </div>
          <div v-if="galleryImages.length >= 3" class="right-stack">
            <div @click="openLightbox(1)"><img :src="galleryImages[1]" alt="" /></div>
            <div class="gallery-more" @click="openLightbox(2)">
              <img :src="galleryImages[2]" alt="" />
              <div v-if="galleryImages.length > 3" class="more-overlay">+ {{ galleryImages.length - 3 }} zdjęć</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── LIGHTBOX ──────────────────────────────────────────────── -->
    <Teleport to="body">
      <div v-if="lightboxIndex !== null" class="lightbox open" @click="closeLightbox">
        <button class="lightbox-nav prev" @click.stop="prevImg">‹</button>
        <img :src="galleryImages[lightboxIndex]" alt="" @click.stop />
        <button class="lightbox-nav next" @click.stop="nextImg">›</button>
        <button class="lightbox-close" @click="closeLightbox">×</button>
        <div class="lightbox-counter">{{ lightboxIndex + 1 }} / {{ galleryImages.length }}</div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Page-specific styles only. Base styles moved to main.css */

/* ─── Hero ────────────────────────────────────────────────────── */
.w-hero { padding: 160px 0 0; background: var(--bg-section); border-bottom: 1px solid var(--line); }
.w-hero-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 64px; align-items: end; }
.w-hero h1 { font-size: clamp(56px, 6.4vw, 104px); font-style: italic; font-weight: 500; line-height: 0.96; letter-spacing: -0.02em; margin-bottom: 28px; }
.w-hero .lede { font-family: var(--serif); font-size: 22px; line-height: 1.45; color: var(--text-muted); max-width: 560px; margin-bottom: 32px; }
.cat-row { display: flex; gap: 10px; align-items: center; margin-bottom: 28px; }
.cat-pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: var(--r-pill); background: var(--bg-card); border: 1px solid var(--line); font-size: 12px; font-weight: 500; letter-spacing: .04em; color: var(--brand-primary); }

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
.w-gallery-section { padding: 0 0 96px; }
.w-gallery-strip { display: grid; grid-template-columns: 2fr 1fr; gap: 8px; height: 460px; }
.w-gallery-strip.single { grid-template-columns: 1fr; }
.w-gallery-strip > div { overflow: hidden; border-radius: var(--r-sm); position: relative; background: var(--bg-section); cursor: pointer; }
.w-gallery-strip img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s ease; }
.w-gallery-strip > div:hover img { transform: scale(1.04); }
.w-gallery-strip .right-stack { display: grid; grid-template-rows: 1fr 1fr; gap: 8px; height: 100%; }
.w-gallery-strip .more-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(27,48,34,0) 60%, rgba(27,48,34,.6) 100%); display: flex; align-items: flex-end; padding: 16px; color: var(--bg-primary); font-family: var(--mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; pointer-events: none; }

/* ─── Body ────────────────────────────────────────────────────── */
.w-body { padding: 96px 0; }
.w-body-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 96px; align-items: start; }
.w-section { margin-bottom: 72px; }
.body-p-wrap { margin-top: 24px; }
.body-p-wrap p { color: var(--text-muted); margin-bottom: 16px; font-size: 16px; line-height: 1.7; }

/* ─── Sidebar ─────────────────────────────────────────────────── */
.side { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 32px; }
.instructor-card { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-md); overflow: hidden; padding: 24px; }
.inst-head { display: flex; align-items: center; gap: 16px; }
.photo { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; filter: saturate(0.9); flex-shrink: 0; }
.inst-label { display: block; font-family: var(--mono); font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px; }
.inst-info { flex: 1; min-width: 0; }
.role-tag { font-family: var(--mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--accent-earth); margin-bottom: 4px; }
.inst-name { font-size: 20px; margin-bottom: 0; line-height: 1.2; }
.inst-bio { color: var(--text-muted); font-size: 13px; line-height: 1.55; margin-bottom: 14px; margin-top: 16px; }
.inst-contact { border-top: 1px solid var(--line); padding-top: 14px; display: flex; flex-direction: column; gap: 8px; }
.contact-link { display: flex; align-items: center; gap: 10px; color: var(--brand-primary); font-size: 13px; text-decoration: none; word-break: break-all; }
.contact-link:hover { color: var(--accent-earth); }

/* ─── Related workshops ───────────────────────────────────────── */
.related-card { background: var(--bg-card); border: 1px solid var(--line); border-radius: var(--r-md); padding: 20px; }
.related-card .eyebrow { display: block; margin-bottom: 16px; }
.related-list { display: flex; flex-direction: column; gap: 4px; }
.related-item { display: flex; align-items: center; gap: 14px; text-decoration: none; color: inherit; padding: 8px; border-radius: var(--r-sm); transition: background .2s; }
.related-item:hover { background: var(--bg-section); }
.related-item img { width: 56px; height: 56px; object-fit: cover; border-radius: var(--r-sm); flex-shrink: 0; }
.related-meta { flex: 1; min-width: 0; }
.related-title { font-family: var(--serif); font-size: 15px; color: var(--brand-primary); line-height: 1.3; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.related-date { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-muted); }

/* ─── Lightbox ────────────────────────────────────────────────── */
.lightbox { position: fixed; inset: 0; z-index: 100; background: rgba(18,32,25,0.94); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 48px; }
.lightbox img { max-width: 90vw; max-height: 86vh; object-fit: contain; border-radius: var(--r-sm); box-shadow: var(--shadow-lg); }
.lightbox-close, .lightbox-nav { position: absolute; background: rgba(253,251,247,0.1); color: #FDFBF7; border: 1px solid rgba(253,251,247,0.2); width: 48px; height: 48px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; font-size: 20px; }
.lightbox-close:hover, .lightbox-nav:hover { background: rgba(253,251,247,0.2); }
.lightbox-close { top: 24px; right: 24px; }
.lightbox-nav.prev { left: 24px; top: 50%; transform: translateY(-50%); }
.lightbox-nav.next { right: 24px; top: 50%; transform: translateY(-50%); }
.lightbox-counter { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); font-family: var(--mono); font-size: 12px; letter-spacing: .12em; color: rgba(253,251,247,.7); text-transform: uppercase; }

/* ─── Responsive ──────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .w-hero { padding: 120px 0 0; }
  .w-hero-grid { grid-template-columns: 1fr; gap: 32px; }
  .book-card { transform: none; }
  .w-body-grid { grid-template-columns: 1fr; gap: 48px; }
  .side { position: static; }
  .w-gallery-section { padding: 0 0 64px; }
  .w-gallery-strip { height: 360px; }
}

@media (max-width: 720px) {
  .w-gallery-strip { grid-template-columns: 1fr; height: auto; }
  .w-gallery-strip .right-stack { display: none; }
  .w-gallery-strip .gallery-main { aspect-ratio: 4/3; }
  .lightbox { padding: 16px; }
  .lightbox-close, .lightbox-nav { width: 40px; height: 40px; }
  .lightbox-nav.prev { left: 8px; }
  .lightbox-nav.next { right: 8px; }
}
</style>
