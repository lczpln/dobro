<template>
  <Button
    v-if="!disableFunction"
    class="flex items-center justify-center rounded-sm min-w-8 w-8 h-10 border-primary-foreground border transition-all p-0"
    :class="{
      'bg-secondary text-white hover:bg-secondary':
        coreStore.game.playerHasRedCard(playerName),
    }"
    @click="coreStore.game.togglePlayerRedCard(playerName)"
  >
    <AlertCircle :size="16" class="stroke-primary-foreground" />
  </Button>

  <span
    v-else
    class="flex items-center justify-center rounded-sm min-w-8 w-8 h-10 border-primary-foreground border transition-all p-0 bg-secondary text-primary-foreground hover:bg-secondary"
  >
    <AlertCircle :size="16" />
  </span>
</template>

<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next";
import { useCoreStore } from "@/stores/core";
import Button from "@/components/ui/button/Button.vue";

defineProps<{
  playerName: string;
  disableFunction?: boolean;
}>();

const coreStore = useCoreStore();
</script>
