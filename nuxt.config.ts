// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/icon',
  ],

  image: {
    directus: {
      baseURL: process.env.DIRECTUS_URL + '/assets/',
    },
  },

  runtimeConfig: {
    // Prywatne — tylko server-side (nie trafia do przeglądarki)
    directusToken: process.env.DIRECTUS_TOKEN,

    // Publiczne — dostępne też w przeglądarce
    public: {
      directusUrl: process.env.DIRECTUS_URL || 'http://localhost:8055',
    },
  },
})