// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/**': { isr: 21600 },
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtseo/module',
    '@vite-pwa/nuxt',
    '@vue-email/nuxt',
    '@vueuse/nuxt',
    'nuxt-gtag',
    'nuxt-icons',
    'nuxt-vitest',
  ],
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    private: {
      rootDir: '',
      gmail: '',
      emailUsername: '',
      emailPassword: '',
      supabaseUrl: '',
      supabaseKey: '',
    },
  },
  image: {
    format: ['avif', 'webp'],
    width: 1024,
    quality: 80,
  },
  colorMode: {
    preference: 'dark',
    fallback: 'light',
    classSuffix: '',
  },
  site: {
    url: 'https://shirsendu-bairagi.dev'
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Shirsendu Bairagi',
      short_name: 'Shirsendu Bairagi',
      description: 'Shirsendu Bairagi is Fullstack Developer',
      theme_color: '#0593FA',
      background_color: "#0593FA",
      icons: [
        {
          src: 'logo-48.png',
          sizes: '48x',
          type: 'image/png',
        },
        {
          src: 'logo-72.png',
          sizes: '72x',
          type: 'image/png',
        },
        {
          src: 'logo-96.png',
          sizes: '96x',
          type: 'image/png',
        },
        {
          src: 'logo-144.png',
          sizes: '144x',
          type: 'image/png',
        },
        {
          src: 'logo-192.png',
          sizes: '192x',
          type: 'image/png',
        },
        {
          src: 'logo-512.png',
          sizes: '512x',
          type: 'image/png',
        },
        {
          src: 'logo-512.png',
          sizes: '512x',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  vueEmail: {
    baseUrl: 'https://shirsendu-bairagi.dev/images/',
  },
  gtag: {
    id: 'G-ZMR7H4LPSK'
  },
})
