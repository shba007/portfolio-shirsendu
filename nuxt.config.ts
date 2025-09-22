import vue from '@vitejs/plugin-vue'

const host = process.env.TAURI_DEV_HOST || 'localhost'
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000

const nativeConfig =
  process.env.PLATFORM_ENV === 'native'
    ? {
        ssr: false,
        devServer: { host },
        ignore: ['**/src-tauri/**', '**/node_modules/**', '**/dist/**', '**/.git/**', '**/.nuxt/**', '**/.output/**'],
        vite: {
          clearScreen: false,
          envPrefix: ['VITE_', 'TAURI_'],
          server: {
            strictPort: true,
            port,
            host: host || false,
            hmr: host
              ? {
                  protocol: 'ws',
                  host,
                  port,
                }
              : undefined,
          },
        },
        nitro: {
          storage: {
            fs: {
              driver: 'fs',
              base: './static',
            },
          },
          rollupConfig: {
            plugins: [vue()],
          },
          prerender: {
            routes: ['/_ipx/s_512x512/images/globe.webp', '/_ipx/s_512x512/images/mobile.webp', '/_ipx/s_512x512/images/robot.webp', '/_ipx/s_512x512/images/drone.webp'],
          },
        },
      }
    : {}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    // '@hannoeru/nuxt-otel',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils/module',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    'nuxt-nodemailer',
    'nuxt-splide',
    '@regle/nuxt',
  ],
  nitro: {
    compressPublicAssets: true,
    storage: {
      fs: {
        driver: 'fs',
        base: './static',
      },
    },
    rollupConfig: {
      plugins: [vue()],
    },
  },
  /* vite: {
    // FIXME: temporary fix for email remove when not needed
    $server: {
      build: {
        rollupOptions: {
          output: {
            preserveModules: true,
          },
        },
      },
    },
  }, */
  routeRules: {
    '/': { ssr: true },
    '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/manifest.webmanifest': {
      headers: { 'content-type': 'application/manifest+json', 'cache-control': 'public, max-age=0, must-revalidate' },
    },
    '/api/**': { cors: true },
  },
  runtimeConfig: {
    app: {
      version: '',
      buildTime: '',
    },
    public: {
      siteUrl: '',
      scripts: {
        googleAnalytics: {
          id: '',
        },
      },
      vapidKey: '',
    },
    private: {
      notionDbId: '',
      vapidKey: '',
      vapidSubject: '',
      emailMetaData: '',
      oauthClientId: '',
      oauthClientSecret: '',
      oauthRefreshToken: '',
      serverValidationKey: '',
      paymentUpiInfo: '',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  icon: {
    componentName: 'NuxtIcon',
    provider: 'none',
    mode: 'svg',
    customCollections: [
      {
        prefix: 'local',
        dir: './app/assets/icons',
      },
    ],
    clientBundle: {
      scan: true,
    },
  },
  image: {
    provider: 'uploadcare',
    ipx: {},
    uploadcare: {
      cdnURL: 'https://ucarecdn.com',
      quality: 'smart',
      format: 'auto',
      progressive: 'yes',
      strip_meta: 'all',
    },
  },
  scripts: {
    registry: {
      googleAnalytics: true,
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  site: {
    name: 'Shirsendu Bairagi',
    url: process.env.NUXT_PUBLIC_SITE_URL,
  },
  sitemap: {
    autoLastmod: true,
    sources: ['/api/__sitemap__/urls'],
  },
  robots: {
    disallow: ['/_nuxt/'],
  },
  pwa: {
    srcDir: '../public/services',
    filename: 'sw-main.ts',
    strategies: 'injectManifest',
    injectRegister: 'auto',
    registerType: 'autoUpdate',
    includeManifestIcons: false,
    manifest: {
      name: 'Shirsendu Bairagi',
      short_name: 'Shirsendu Bairagi',
      description: 'Shirsendu Bairagi is a Fullstack Developer',
      theme_color: '#0593FA',
      background_color: '#0593FA',
      orientation: 'any',
      display: 'fullscreen',
      shortcuts: [
        {
          name: 'Contact Me',
          short_name: 'Contact',
          description: 'Contact with me via mail',
          url: '/?contact',
          icons: [
            {
              src: '/pwa/email.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa/email-maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      ],
      icons: [
        {
          src: '/pwa/icon-48.png',
          sizes: '48x48',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-72.png',
          sizes: '72x72',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa/icon-maskable-48.png',
          sizes: '48x48',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-72.png',
          sizes: '72x72',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa/icon-maskable-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      screenshots: [
        {
          src: '/pwa/screenshot-desktop-1.webp',
          sizes: '1024x576',
          type: 'image/webp',
          form_factor: 'wide',
          label: 'Screenshot 1',
        },
        {
          src: '/pwa/screenshot-desktop-2.webp',
          sizes: '1024x576',
          type: 'image/webp',
          form_factor: 'wide',
          label: 'Screenshot 2',
        },
        {
          src: '/pwa/screenshot-desktop-3.webp',
          sizes: '1024x576',
          type: 'image/webp',
          form_factor: 'wide',
          label: 'Screenshot 3',
        },
        {
          src: '/pwa/screenshot-mobile-1.webp',
          sizes: '576x1024',
          type: 'image/webp',
          form_factor: 'narrow',
          label: 'Screenshot 1',
        },
        {
          src: '/pwa/screenshot-mobile-2.webp',
          sizes: '576x1024',
          type: 'image/webp',
          form_factor: 'narrow',
          label: 'Screenshot 2',
        },
        {
          src: '/pwa/screenshot-mobile-3.webp',
          sizes: '576x1024',
          type: 'image/webp',
          form_factor: 'narrow',
          label: 'Screenshot 3',
        },
      ],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}'],
      globIgnores: ['manifest**.webmanifest'],
      maximumFileSizeToCacheInBytes: 3000000,
    },
    devOptions: {
      type: 'module',
      enabled: false,
      suppressWarnings: false,
    },
  },
  nodemailer: {
    from: '',
    host: '',
    port: '',
    secure: true,
    auth: {
      user: '',
      pass: '',
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  splide: {
    theme: 'core',
  },
  ...nativeConfig,
})
