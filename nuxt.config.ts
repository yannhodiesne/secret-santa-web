// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/fonts'
  ],
  $production: {
    app: {
      pageTransition: { name: 'page', mode: 'out-in' }
    }
  },
  devtools: { enabled: true },
  runtimeConfig: {
    dbPath: '',
    adminIds: '',
    guildId: ''
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
