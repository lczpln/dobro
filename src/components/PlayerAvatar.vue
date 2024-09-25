<template>
  <img :src="avatar" class="w-10 h-10" alt="avatar" />
  <span v-if="name">{{ name }}</span>
</template>

<script setup lang="ts">
defineProps<{
  avatar: string
  name?: string
}>()
</script>
