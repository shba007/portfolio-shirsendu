<script setup lang="ts">
const props = defineProps<{
  quadrant: 1 | 2 | 3 | 4
}>()

const hexClass = ref('')
const imageClass = ref('')
const image = ref<string | null>(null)
const skill = ref<'Web' | 'Mobile' | 'AI' | 'IoT' | null>(null)

function onQuadrant() {
  switch (props.quadrant) {
    case 1:
      hexClass.value = 'row-start-1 col-start-1 justify-self-start self-start'
      imageClass.value = 'top-0 left-0 -right-2 bottom-2 scale-90'
      image.value = '/images/globe.webp'
      skill.value = 'Web'
      break
    case 2:
      hexClass.value = 'row-start-1 col-start-3 justify-self-end self-start'
      imageClass.value = '-top-4 left-0 -right-2 -bottom-2'
      image.value = 'images/mobile.webp'
      skill.value = 'Mobile'
      break
    case 3:
      hexClass.value = 'row-start-3 lg:row-start-2 col-start-1 justify-self-start self-end'
      imageClass.value = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-90'
      image.value = '/images/robot.webp'
      skill.value = 'AI'
      break
    case 4:
      hexClass.value = 'row-start-3 lg:row-start-2 col-start-3 justify-self-end self-end'
      imageClass.value = 'top-2 -left-2 -right-2 -bottom-2'
      image.value = '/images/drone.webp'
      skill.value = 'IoT'
      break
    default:
      hexClass.value = ''
      imageClass.value = ''
      image.value = null
      skill.value = null
      break
  }
}

onMounted(() => onQuadrant())
</script>

<template>
  <span class="relative hover:scale-105 transition-transform drop-shadow-md" :class="hexClass">
    <NuxtIcon name="hexagon" class="text-[120px] lg:text-[180px] text-light-500 dark:text-dark-600 shadow-md" />
    <img dir="assets/images" v-if="image && skill" :src="image" :alt="skill" class="absolute drop-shadow-sm"
      :class="imageClass" />
    <span class="absolute left-1/2 -bottom-6 lg:-bottom-8 -translate-x-1/2 opacity-60 lg:text-xl">{{ skill }}</span>
  </span>
</template>