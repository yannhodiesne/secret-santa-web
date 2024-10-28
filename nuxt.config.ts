// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-auth-utils",
    "@nuxt/eslint",
    "@nuxt/image",
  ],
  compatibilityDate: "2024-10-28",
  future: { compatibilityVersion: 4 },
});