<script setup lang="ts">
interface LbImage {
  src: string
  thumb?: string
  title?: string
}

const props = defineProps<{
  images: LbImage[]
  modelValue: number | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const loading = ref(false)
const thumbsEl = ref<HTMLElement | null>(null)

const current = computed(() =>
  props.modelValue !== null ? props.images[props.modelValue] : null,
)

function close() { emit('update:modelValue', null) }
function go(i: number) { emit('update:modelValue', i) }
function prev() {
  if (props.modelValue === null) return
  emit('update:modelValue', (props.modelValue - 1 + props.images.length) % props.images.length)
}
function next() {
  if (props.modelValue === null) return
  emit('update:modelValue', (props.modelValue + 1) % props.images.length)
}

watch(() => props.modelValue, (val) => {
  if (val === null) return
  loading.value = true
  if (import.meta.client) {
    const n = props.images.length
    for (const k of [(val + 1) % n, (val - 1 + n) % n]) {
      const img = props.images[k]
      if (img) { const im = new Image(); im.src = img.src }
    }
  }
  nextTick(() => {
    const el = thumbsEl.value?.children[val] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  })
})

function onLoad() { loading.value = false }

function onKey(e: KeyboardEvent) {
  if (props.modelValue === null) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue !== null" class="lb" @click="close">
      <button class="lb-close" aria-label="Zamknij" @click="close">×</button>

      <!-- main image + arrows -->
      <div class="lb-main" @click.stop>
        <button v-if="images.length > 1" class="lb-nav lb-prev" aria-label="Poprzednie" @click="prev">‹</button>
        <div class="lb-stage">
          <div v-show="loading" class="lb-spinner" />
          <img
            :key="modelValue"
            :src="current?.src"
            :alt="current?.title ?? ''"
            :class="{ 'lb-img-loading': loading }"
            decoding="async"
            fetchpriority="high"
            @load="onLoad"
            @error="onLoad"
          />
        </div>
        <button v-if="images.length > 1" class="lb-nav lb-next" aria-label="Następne" @click="next">›</button>
      </div>

      <!-- thumbnail strip -->
      <div v-if="images.length > 1" class="lb-strip" @click.stop>
        <span class="lb-counter">{{ modelValue + 1 }} / {{ images.length }}</span>
        <div ref="thumbsEl" class="lb-thumbs">
          <button
            v-for="(img, i) in images"
            :key="i"
            class="lb-thumb"
            :class="{ active: i === modelValue }"
            :aria-label="`Zdjęcie ${i + 1}`"
            @click="go(i)"
          >
            <img :src="img.thumb ?? img.src" :alt="img.title ?? ''" loading="lazy" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(14, 26, 18, 0.97);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.lb-close {
  position: absolute;
  top: 20px;
  right: 24px;
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(253, 251, 247, 0.2);
  background: rgba(253, 251, 247, 0.08);
  color: #fdfbf7;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.lb-close:hover { background: rgba(253, 251, 247, 0.18); }

/* ── main image area ───────────────────────────── */
.lb-main {
  flex: 1;
  display: flex;
  align-items: stretch;
  min-height: 0;
  padding: 56px 80px 16px;
  position: relative;
}

.lb-stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  min-width: 0;
  position: relative;
}

.lb-stage img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 8px 48px rgba(0, 0, 0, 0.5);
  transition: opacity 0.2s ease;
}
.lb-stage img.lb-img-loading { opacity: 0; }

.lb-spinner {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2.5px solid rgba(253, 251, 247, 0.15);
  border-top-color: rgba(253, 251, 247, 0.8);
  border-radius: 50%;
  animation: lb-spin 0.8s linear infinite;
}
@keyframes lb-spin { to { transform: rotate(360deg); } }

.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(253, 251, 247, 0.2);
  background: rgba(253, 251, 247, 0.08);
  color: #fdfbf7;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 5;
}
.lb-nav:hover { background: rgba(253, 251, 247, 0.18); }
.lb-prev { left: 20px; }
.lb-next { right: 20px; }

/* ── thumbnail strip ───────────────────────────── */
.lb-strip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px 80px 24px;
  flex-shrink: 0;
}

.lb-counter {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(253, 251, 247, 0.4);
}

.lb-thumbs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  max-width: 100%;
  scrollbar-width: none;
  padding: 3px;
}
.lb-thumbs::-webkit-scrollbar { display: none; }

.lb-thumb {
  flex-shrink: 0;
  width: 62px;
  height: 62px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.4;
  background: none;
  transition: opacity 0.2s, border-color 0.2s, transform 0.2s;
}
.lb-thumb:hover { opacity: 0.75; transform: translateY(-2px); }
.lb-thumb.active {
  opacity: 1;
  border-color: rgba(253, 251, 247, 0.85);
  transform: translateY(-2px);
}

.lb-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ── responsive ────────────────────────────────── */
@media (max-width: 720px) {
  .lb-main { padding: 48px 0 8px; }
  .lb-prev { left: 8px; }
  .lb-next { right: 8px; }
  .lb-strip { padding: 6px 12px 16px; }
  .lb-thumb { width: 50px; height: 50px; }
}
</style>
