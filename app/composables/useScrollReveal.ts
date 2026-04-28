import type { WatchSource } from 'vue'

interface Options {
  threshold?: number
  rootMargin?: string
  selector?: string
  retriggerOn?: WatchSource | WatchSource[]
}

export function useScrollReveal(opts: Options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    selector = '.reveal',
    retriggerOn,
  } = opts

  let observer: IntersectionObserver | null = null

  const observe = () => {
    observer?.disconnect()
    observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold, rootMargin },
    )
    document.querySelectorAll(selector).forEach(el => observer!.observe(el))
  }

  onMounted(() => {
    observe()
    if (retriggerOn) {
      watch(retriggerOn, async () => {
        await nextTick()
        observe()
      })
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })
}
