declare module 'nuxt/schema' {
  interface RuntimeConfig {
    dbPath: string,
    adminIds: string
  }
  interface PublicRuntimeConfig {
  }
}

export {}
