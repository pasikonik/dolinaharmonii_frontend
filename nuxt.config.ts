// nuxt.config.ts
declare const process: { env: Record<string, string | undefined> }

// A production build without DIRECTUS_URL would silently point the site at localhost.
if (process.env.npm_lifecycle_event === 'build' && !process.env.DIRECTUS_URL) {
  throw new Error('DIRECTUS_URL is not set — refusing to build a production bundle against localhost.')
}

const directusUrl = (process.env.DIRECTUS_URL ?? 'http://localhost:8055').replace(/\/$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/sitemap'],

  // Cache rendered pages for a minute so a traffic spike does not hit Directus on every view.
  routeRules: {
    '/': { swr: 60 },
    '/warsztaty': { swr: 60 },
    '/warsztaty/**': { swr: 60 },
    '/kalendarz': { swr: 60 },
    '/noclegi/**': { swr: 300 },
  },

  // Deploy builds into a separate folder and swaps it in, so the running site is not wiped mid-build.
  nitro: process.env.BUILD_OUTPUT_DIR ? { output: { dir: process.env.BUILD_OUTPUT_DIR } } : {},

  sitemap: {
    sources: ['/api/_sitemap-urls'],
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'pl' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Montserrat:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    // Server-only — never exposed to the browser. Defaults come from the build-time env;
    // NUXT_RESEND_API_KEY / NUXT_RESEND_FROM / NUXT_RESEND_TO override them at runtime.
    resend: {
      apiKey: process.env.RESEND_API_KEY ?? '',
      from: process.env.RESEND_FROM ?? '', // set later; must be a Resend-verified domain
      to: process.env.RESEND_TO ?? 'dolinaharmonii@gmail.com',
    },
    public: {
      directusUrl,
    },
  },
})
