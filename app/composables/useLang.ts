export const useLang = () => {
  const lang = useState<'pl' | 'en'>('lang', () => 'pl')

  function setLang(l: 'pl' | 'en') {
    lang.value = l
    if (import.meta.client) {
      localStorage.setItem('dh_lang', l)
      document.documentElement.lang = l
    }
  }

  const t = (pl: string, en: string): string => lang.value === 'en' ? en : pl

  return { lang, setLang, t }
}
