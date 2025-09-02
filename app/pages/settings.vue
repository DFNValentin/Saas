<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(path) {
  router.push(path)
}
</script>

<template>
    <div class="flex h-screen">
        <settingsPanel/>
        <main class="flex-1 bg-[#313338] text-white flex flex-col">
      <header class="h-12 border-b border-white/10 px-4 flex items-center">
        <h2 class="font-semibold">Settings</h2>
        <button @click="goTo('/me')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        ✕
      </button>
      </header>
      <div class="flex-1 flex items-center justify-center text-white/40">
        Settings
      </div>
    </main>
    </div>
    

</template>