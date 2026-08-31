<script setup lang="ts">
const title = `Fullstack Developer in Kolkata`
const description = `Shirsendu Bairagi is Fullstack Developer with more then 3 years of experience.
He had done more then a dozens production grade cutting edge projects in web, app, iot and ml.`

const {
  app: { buildTime },
  public: { siteUrl, vapidKey },
} = useRuntimeConfig()

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})

useSeoMeta({
  ogType: 'profile',
  ogImageWidth: 1280,
  ogImageHeight: 640,
  fbAppId: 966242223397117,
  twitterCard: 'summary_large_image',
  colorScheme: 'light dark',
})

useSchemaOrg([
  defineWebPage({
    datePublished: new Date(2023, 6, 9).toISOString(),
    dateModified: buildTime,
    author: 'Shirsendu Bairagi',
  }),
  defineWebSite({
    url: siteUrl,
    name: title,
    description: description,
  }),
  definePerson({
    name: 'Shirsendu Bairagi',
    description: 'He is a Fullstack Developer',
    image: siteUrl + '/logo.png',
    sameAs: [
      'https://codedamn.com/user/shba007',
      'https://leetcode.com/shba007',
      'https://devpost.com/shba007',
      'https://github.com/shba007',
      'https://x.com/shirsendu_baira',
      'https://linkedin.com/in/shirsendu-bairagi',
      'https://youtube.com/@shirsendu_bairagi',
      'https://instagram.com/shirsendu_bairagi',
    ],
  }),
  defineLocalBusiness({
    '@type': 'ProfessionalService',
    name: 'Shirsendu Bairagi',
    description: description,
    image: `${siteUrl}/previews/landing.webp`,
    logo: siteUrl + '/logo.png',
    url: siteUrl,
    address: {
      streetAddress: 'RN Bhattacharya Road, Kumorpara 2nd Lane',
      addressLocality: 'Kolkata',
      addressRegion: 'WB',
      postalCode: '700146',
      addressCountry: 'IN',
    },
    sameAs: ['https://linkedin.com/in/shirsendu-bairagi', 'https://github.com/shba007'],
  }),
])

const { $api } = useNuxtApp()
const { isSupported, permissionGranted } = useWebNotification()

async function getExistingSubscription() {
  const registration = await navigator.serviceWorker.ready
  let subscription = await registration.pushManager.getSubscription()

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidKey,
    })
  }

  await $api('/api/notification/push/subscribe', {
    method: 'POST',
    body: subscription.toJSON(),
  })

  return subscription
}

const { version } = useAppUpdater({ checkOnStartup: true, autoInstall: true })

onMounted(async () => {
  console.log('App Version', version.value)
  if (isSupported.value && permissionGranted.value) await getExistingSubscription()
})

watch(permissionGranted, async (value) => {
  if (value) await getExistingSubscription()
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPwaAssets />
  <NuxtLoadingIndicator color="#0593FA" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <LazyAppInstallPrompt hydrate-on-idle />
</template>

<style>
* {
  -webkit-tap-highlight-color: transparent;
  scrollbar-width: 6px;
  @apply antialiased;
}

*::-webkit-scrollbar {
  @apply block size-[6px] bg-light-400 dark:bg-dark-400;
}

*::-webkit-scrollbar-thumb {
  @apply rounded-md bg-light-600 dark:bg-dark-600;
}

html {
  @apply relative overflow-x-hidden scroll-smooth;
}

body {
  @apply relative min-h-screen overflow-x-hidden bg-light-400 fill-black font-main text-black dark:bg-dark-400 dark:fill-white dark:text-white;
  @apply bg-[url("~/assets/images/dot-light.svg")] bg-auto bg-left-top bg-repeat dark:bg-[url("~/assets/images/dot-dark.svg")];
}

svg.iconify--local {
  @apply !m-0 !box-content;
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
