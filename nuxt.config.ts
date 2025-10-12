// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
import { cpSync } from 'fs';

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/device',
    '@nuxt/test-utils/module'
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
  experimental: { inlineRouteRules: true },
  compatibilityDate: '2025-05-15',
  nitro: {
    preset: 'bun'
  },
  hooks: {
    'nitro:build:public-assets': (nitro) => {
      // copy migrations to .output/server/database/migrations
      const targetDir = path.join(nitro.options.output.serverDir, './database/migrations');
      cpSync('./server/database/migrations', targetDir, { recursive: true });
    }
  },
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
