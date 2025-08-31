<script setup>
import { ref } from 'vue'
import { supabase } from '~/utils/supabase'
import { onMounted } from 'vue'

const new_message = ref('')
const messages = ref([])

const fetchMessages = async () => {
  const { data, error } = await supabase
  .from("messages")
  .select("*")
  .order("created_at", { ascending: false })
  
  if (error) console.error(error)
  else messages.value = data
}

const message_display = () => {
  if (new_message.value.trim() !== '') {
    messages.value.push(new_message.value) // append corect
    new_message.value = '' // reset input
  }
}
</script>


<template>
  <div class="flex flex-col h-full bg-[#313338] text-white">
    <!-- Zona mesaje -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="bg-[#2b2d31] p-3 rounded-lg max-w-[70%] break-words"
      >
        {{ msg.text || msg }}
      </div>
    </div>

    <!-- Input Footer -->
    <footer class="flex items-center p-4 border-t border-[#2b2d31] bg-[#2b2d31]">
      <input
        v-model="new_message"
        @keyup.enter="sendMessage"
        placeholder="Scrie un mesaj..."
        class="flex-1 rounded-lg bg-[#1e1f22] p-3 text-white outline-none placeholder-gray-400"
      />
      <button
        @click="sendMessage"
        class="ml-3 bg-[#5865F2] hover:bg-[#4752c4] px-4 py-2 rounded-lg transition-colors"
      >
        Trimite
      </button>
    </footer>
  </div>
</template>

<style scoped>
/* Scrollbar dark */
.flex-1::-webkit-scrollbar {
  width: 8px;
}
.flex-1::-webkit-scrollbar-thumb {
  background: #2b2d31;
  border-radius: 9999px;
}
.flex-1::-webkit-scrollbar-track {
  background: transparent;
}
</style>