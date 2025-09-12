<template>
  <aside class="w-64 bg-[#1e1f22] text-white flex flex-col h-full p-4">
    <h2 class="text-lg font-bold mb-6">Settings</h2>

    <nav class="flex flex-col space-y-2">
      <button 
        class="flex items-center gap-2 p-2 rounded hover:bg-[#36393f]" 
        @click="activeTab='general'">
        ⚙️ General
      </button>
      <button 
        class="flex items-center gap-2 p-2 rounded hover:bg-[#36393f]" 
        @click="activeTab='account'">
        👤 Account
      </button>
      <button 
        class="flex items-center gap-2 p-2 rounded hover:bg-[#36393f]" 
        @click="activeTab='security'">
        🔒 Security
      </button>
      <button 
        class="flex items-center gap-2 p-2 rounded hover:bg-[#36393f]" 
        @click="activeTab='notifications'">
        🔔 Notifications
      </button>
      <button 
        class="flex items-center gap-2 p-2 rounded hover:bg-[#36393f]" 
        @click="activeTab='privacy'">
        🛡️ Privacy
      </button>
            <button 
        class="flex items-center gap-2 p-2 rounded bg-red-600 rounded hover:bg-red-700"" 
        @click="activeTab='privacy'">
        Log Out
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('general')


function goTo(path) {
  router.push(path)
}
</script>

<style scoped>
button { text-align: left; }
</style>
