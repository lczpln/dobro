<template>
  <div class="mb-8 bg-primary w-full p-4 rounded-sm">
    <ul v-if="list.length" class="text-xl bg-primary flex flex-col gap-2 w-full">
      <h2 class="text-center text-2xl font-bold mb-4">Jogadores</h2>

      <li
        v-for="(player, index) in list"
        :key="index"
        class="flex items-center justify-between gap-2 p-2 bg-zinc-800 rounded-md"
      >
        <span class="flex items-center gap-2">
          <PlayerAvatar :avatar="player.avatar" :name="player.name" />
        </span>

        <span class="flex justify-end gap-2">
          <slot :player="player" :index="index"></slot>
        </span>
      </li>
    </ul>

    <h2 v-else class="text-center text-2xl font-bold">Nenhum jogador adicionado</h2>
  </div>
</template>

<script setup lang="ts">
import PlayerAvatar from '@/components/PlayerAvatar.vue'
import type { Player } from '@/types/game'

defineProps<{
  list: Player[]
}>()
</script>
