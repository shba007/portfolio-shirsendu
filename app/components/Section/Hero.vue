<script setup lang="ts">
import { differenceInMonths, differenceInYears, formatDuration } from 'date-fns'

const emit = defineEmits<{ contact: [] }>()

// const DOB = '2001-01-29'
const DOFC = '2019-12-03'

const now = useNow()

/* const age = computed(() => {
  return formatDuration({ years: differenceInYears(now.value, DOB) }, { format: ['years'] })
}) */

const experience = computed(() =>
  formatDuration(
    {
      years: differenceInYears(now.value, DOFC),
      months: differenceInMonths(now.value, DOFC) % 12,
    },
    { format: ['years', 'months'] }
  )
)
</script>

<template>
  <section id="hero" class="mt-10 flex flex-col-reverse gap-10 md:mt-6 md:flex-row md:justify-between md:gap-4 lg:mb-12 lg:mt-12">
    <!-- <NuxtPicture src="/images/hero-gradient.svg"
      class="absolute -right-8 -top-8 left-0 -z-50 aspect-[3/4] w-full object-cover blur-md md:aspect-auto lg:left-auto lg:blur-lg"
      alt="Hero Background">
      <source media="(min-width: 1024px)" srcset="/images/hero-gradient.svg" />
      <source media="(min-width: 768px)" srcset="/images/hero-gradient-tablet.svg" />
      <source media="(min-width: 100px)" srcset="/images/hero-gradient-mobile.svg" />
    </NuxtPicture> -->
    <div class="flex h-fit flex-col items-center gap-8 md:my-auto md:w-1/2 md:items-start">
      <span class="mx-auto w-fit rounded-full border border-primary-500 px-4 py-2 text-sm capitalize md:mx-0"> {{ experience }} +XP </span>
      <h1 class="text-center text-2xl md:text-left md:text-3xl lg:text-4xl">CTO · Co-founder <br />Open Source Maintainer</h1>
      <h2 class="mx-auto w-fit max-w-[90%] text-center text-lg font-light leading-relaxed opacity-80 sm:max-w-[80%] md:mx-0 md:max-w-[90%] md:text-left">
        CTO & Co-founder of Modest Human Brands. Architecting scalable design, leading product development, and fostering tech innovation.
      </h2>
      <ButtonCTA @click="emit('contact')" />
    </div>

    <div class="grid grid-cols-3 grid-rows-[1fr_2fr_1fr] justify-items-stretch lg:grid-rows-2 lg:gap-x-20 lg:gap-y-36">
      <SkillHex :quadrant="1" class="col-start-1 row-start-1 self-start justify-self-start" />
      <SkillHex :quadrant="2" class="col-start-3 row-start-1 self-start justify-self-end" />
      <div class="relative col-start-2 row-start-2 max-w-[200px] scale-[1.867] self-center justify-self-center lg:row-span-2 lg:row-start-1 lg:scale-[2.8005]">
        <div class="-z-10 rotate-[30deg]">
          <NuxtIcon name="local:hexagon" class="size-[120px] fill-light-500 dark:fill-dark-600" />
        </div>
        <svg class="absolute -top-[3.375rem] w-full scale-90" viewBox="0 0 202 310" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <mask id="clip-mask" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="202" height="310">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M202 0H0.999998V152H1.05919C1.04626 152.317 1.03966 152.636 1.03946 152.955L0.986608 241.399C0.981532 249.893 5.51114 257.738 12.8692 261.98L89.4902 306.157C96.8483 310.399 105.917 310.394 113.28 306.142L189.954 261.875C197.317 257.624 201.856 249.773 201.861 241.279L201.914 152.835C201.914 152.556 201.909 152.278 201.9 152H202V0Z"
              fill="white" />
          </mask>
          <g mask="url(#clip-mask)">
            <rect x="-11" y="11" width="224" height="298" fill="url(#pattern0)" />
          </g>
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#clip-image-light" transform="matrix(0.00123181 0 0 0.000925926 -0.00134755 0)" />
              <use xlink:href="#clip-image-dark" transform="matrix(0.00123181 0 0 0.000925926 -0.00134755 0)" />
            </pattern>
            <image id="clip-image-light" href="~/assets/images/photo-light.webp" alt="photo-light" class="dark:hidden" />
            <image id="clip-image-dark" href="~/assets/images/photo-dark.webp" alt="photo-dark" class="hidden dark:block" />
          </defs>
        </svg>
      </div>
      <SkillHex :quadrant="3" class="col-start-1 row-start-3 self-end justify-self-start lg:row-start-2" />
      <SkillHex :quadrant="4" class="col-start-3 row-start-3 self-end justify-self-end lg:row-start-2" />
    </div>
  </section>
</template>

<style>
picture > img {
  @apply size-full object-cover;
}
</style>
