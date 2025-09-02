<script setup>
import { defineProps } from 'vue'
import useFriends from '~/composables/useFriends'
const props = defineProps({
  show: Boolean
})

</script>

<template>
  <div 
    v-if="show"
    class="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50"
  >
    <div class="bg-[#313338] rounded-2xl p-6 w-96 shadow-lg relative">
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


