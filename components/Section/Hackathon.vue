<script setup lang="ts">
const { data } = await useFetch('/api/hackathon')

const hackathons = computed(() => data.value?.toSorted((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()))
</script>

<template>
  <section id="hackathon" class="relative flex flex-col gap-8">
    <h3 class="mx-auto mb-8 w-fit text-lg">All Hackathons</h3>
    <div class="relative flex flex-wrap justify-center gap-5 overflow-hidden py-4">
      <HackathonCard v-for="{ name, url, project, title, startedAt } in hackathons" :key="name" :name="name" :url="url" :project="project" :title="title" :started-at="startedAt" />
    </div>
  </section>
</template>
