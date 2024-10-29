// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/eslint',
    '@nuxt/image'
  ],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    dbPath: 'file:db.sqlite',
    adminIds: '148744805269110785'
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-10-28',
  // Development config
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never',
        semi: true
      }
    }
  }
});
