<template>
  <div 
    v-if="show"
    class="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50 z-50"
  >
    <div class="bg-[#5865F2] rounded-2xl p-6 w-96 shadow-lg relative">
      <button 
        @click="$emit('close')" 
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  show: Boolean
})
</script>
