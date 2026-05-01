// nuxt.config.ts
declare const process: { env: Record<string, string | undefined> }

const directusUrl = process.env.DIRECTUS_URL ?? 'http://localhost:8055'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
  ],

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
          href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
    },
  },

  image: {
    directus: {
      baseURL: `${directusUrl}/assets/`,
    },
  },

  runtimeConfig: {
    // Server-only — never exposed to the browser
    directusToken: process.env.DIRECTUS_TOKEN,

    public: {
      directusUrl,
    },
  },
})
