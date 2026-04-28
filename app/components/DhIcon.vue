<script setup lang="ts">
// Dolina Harmonii — bespoke organic icon system
// Unified "sketch" (hand-drawn) style for all icons

const ICON_DEFS: Record<string, string> = {
  meditation: `<path d="M31.8 18.1c-2.7-.2-5 2-5 4.8.1 2.7 2.4 4.9 5 4.8 2.7-.1 4.7-2.2 4.7-4.9 0-2.5-2-4.5-4.7-4.7z"/><path d="M19.2 46.4c1.7-7.1 6.5-11.4 12.8-11.3 6.4.1 11.1 4.4 13.2 11.1"/><path d="M13.6 45.8c4.2-2.3 8.5-2.4 12.7-.1"/><path d="M37.6 46c4.1-2.4 8.4-2.2 12.7.1"/>`,
  leaf: `<path d="M13.8 50.2c.4-18.2 14.2-34.1 36.4-36.1-2.4 21.7-18.6 36.6-36.4 36.1z"/><path d="M14.2 49.8C24.4 39.6 36 28.2 50.2 13.6"/>`,
  seed: `<path d="M32 11.8c-7.2 6.1-7 16.2.1 22.1 7-5.9 6.9-16.2-.1-22.1z"/><path d="M32 33.8c.1 6.2 0 12.3-.1 18.4"/><path d="M32 42.2c-3.1.2-6-1.8-7.2-4.9"/><path d="M31.9 46.1c3 .3 6-1.7 7.3-4.7"/>`,
  craft: `<circle cx="32" cy="32" r="6.1"/><path d="M32 14.2v8M32 42v8.1M14.1 32h8M42 32h8.1"/><path d="M19.1 18.9l5 5.1M39.9 40l5.2 5.1M19 45.1l5.1-5M40 24l5.1-5.1"/>`,
  candle: `<path d="M32 10c2 2.1 3 4 3 6s-3 3.1-3.1 6c0-3-2.9-4-2.9-6 0-2 1-4 3-6z"/><path d="M26 26h12v22.1c0 2.1-1.9 4-4 4l-4-.1c-2.1 0-4-1.9-4-3.9z"/><path d="M26 32h12.1"/>`,
  herb: `<path d="M32 52.1l-.1-22.1"/><path d="M32 30c-6 0-10-4-10.1-10 6 .1 10.1 4 10.1 10z"/><path d="M31.9 22.1c6 0 10-4 10-10-5.9-.1-10 4-10 10z"/><path d="M32 36.1c-5 0-8-3-8.1-8 5.1 0 8 3 8.1 8z"/>`,
  arrow: `<path d="M14 32.1l36-.1"/><path d="M40 22l10.1 10-10.1 10.1"/>`,
  compass: `<circle cx="32" cy="32" r="20.1"/><path d="M32 18l4 14-4.1 14-4-14z"/>`,
  star: `<path d="M32 12l5.1 13 14-.1-11 9.1 4 13-12.1-8-12 8 4-13-11-9.1 14 .1z"/>`,
  bed: `<path d="M10 42.1V30c0-2 2-4 4-4l36 .1c2 0 4.1 2 4 4l.1 12"/><path d="M10.1 42h44v8.1"/><path d="M10 50v-8"/><path d="M16 32.1l12-.1v-4"/>`,
  fireplace: `<path d="M10 50V20c0-2 2-4 4.1-4l36-.1c2 0 4 2 4 4.1v30"/><path d="M10 30h44.1"/><path d="M32.1 36c2 2 4 4 4 8 0 4-2 6-4 6.1-2-.1-4-2-4-6 0-2 1-4 2-5 0 1 1 2 2 3"/>`,
  kitchen: `<path d="M14 18h36.1v32H14z"/><path d="M14 30.1l36-.1"/><circle cx="22" cy="40" r="2"/><circle cx="32" cy="40" r="2"/><circle cx="42" cy="40" r="2"/><path d="M22 24h12.1"/>`,
  bath: `<path d="M8 30.1h48v6c0 6-4 10-10 10.1H18.1c-6 0-10-4-10.1-10z"/><path d="M14 46l-2.1 6.1M50 46l2.1 6"/><path d="M16 30.1V18c0-3 2-6 6-6 2 0 4 1 5 3"/><path d="M24.1 16l6-.1"/>`,
  tea: `<path d="M14 22.1h28v18a8 8 0 01-8 8H22a8 8 0 01-8-8z"/><path d="M42 26.1h6c2.1 0 4 1.9 4 4v4c0 2.1-1.9 4-4 4h-6"/><path d="M22 12c-2 3 2.1 5 0 8m8-8c-2.1 3 2 5 0 8"/>`,
  mountain: `<path d="M8.1 48.2l14-22.1 8 12 6-8 8 12 12.1-22.1"/><path d="M8 48.1l48-.1"/><path d="M22 26.1l4 6"/>`,
  hands: `<path d="M22 38c-2.1-2-4-4.1-4-7v-12a3 3 0 016-.1v8.1"/><path d="M28 19c0-2 1-3 3-3.1 2 .1 3 1.1 3 3.1v10"/><path d="M34 22c.1-2 1-3 3-3 2 0 3 1 3 3v10"/><path d="M40 28c0-1 1-2 2.1-2 1 0 2 .9 2 2v8"/><path d="M22 36c-2 2-2 5 0 8l4 4c4 4 8 5 14.1 4 4-.7 6-3 6-7v-9"/>`,
  list: `<path d="M14 18h36"/><path d="M14 32h36"/><path d="M14 46h36"/>`,
  grid: `<path d="M14 14h14v14H14z"/><path d="M36 14h14v14H36z"/><path d="M14 36h14v14H14z"/><path d="M36 36h14v14H36z"/>`,
  calendar: `<path d="M12 18h40v32a2 2 0 01-2 2H14a2 2 0 01-2-2z"/><path d="M12 28h40"/><path d="M22 12v10"/><path d="M42 12v10"/>`,
}

const props = withDefaults(defineProps<{
  name: string
  size?: number
  stroke?: number
  class?: string
}>(), {
  size: 24,
  stroke: 1.5,
})

const paths = computed(() => ICON_DEFS[props.name] || '')
const strokeWidth = computed(() => props.stroke * 1.05)
</script>

<template>
  <svg
    v-if="ICON_DEFS[name]"
    :viewBox="'0 0 64 64'"
    :width="size"
    :height="size"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-html="paths"
  />
</template>