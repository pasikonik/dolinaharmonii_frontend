import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return new Promise((resolve) => {
        const scroll = () => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve({ el: to.hash, top: 80, behavior: 'smooth' })
          } else {
            setTimeout(scroll, 50)
          }
        }
        setTimeout(scroll, 50)
      })
    }

    return { top: 0, behavior: 'instant' }
  },
}
