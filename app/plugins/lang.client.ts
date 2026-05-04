export default defineNuxtPlugin(() => {
  const lang = useState<'pl' | 'en'>('lang', () => 'pl')
  const stored = localStorage.getItem('dh_lang')
  if (stored === 'en' || stored === 'pl') {
    lang.value = stored
    document.documentElement.lang = stored
  }
})
