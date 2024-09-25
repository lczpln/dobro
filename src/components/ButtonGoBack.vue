<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <Button
    variant="outline"
    class="flex items-center justify-center w-64 h-10 text-sm font-medium text-primary"
  >
    <ArrowLeft class="mr-2 h-4 w-4" /> Voltar
  </Button>
</template>
