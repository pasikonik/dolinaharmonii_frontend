export default defineNuxtPlugin((nuxtApp) => {
  const lang = useState<'pl' | 'en'>('lang', () => 'pl')
  // After hydration, so the first client render matches the (Polish) server HTML.
  nuxtApp.hook('app:mounted', () => {
    const stored = localStorage.getItem('dh_lang')
    if (stored === 'en' || stored === 'pl') {
      lang.value = stored
      document.documentElement.lang = stored
    }
  })
})
