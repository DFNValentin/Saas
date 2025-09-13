<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function goTo(path) { 
  router.push(path)
}
</script>
<template>
  <div class="bg-red-500 text-white text-4xl p-10">
    Tailwind merge! 🎉
  </div>
  <div class="space-y-2">
  <button class="flex items-center gap-2 p-2 rounded hover:bg-[#36393f]" @click="goTo('/register')">Register</button>
  <button class="flex items-center gap-2 p-2 rounded hover:bg-[#36393f]" @click="goTo('/login')">Login</button>
  </div>
</template>
