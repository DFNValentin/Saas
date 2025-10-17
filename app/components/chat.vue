<template>
  <div class="flex flex-col h-full bg-gray-800 text-white">
    <header class="p-4 bg-gray-900 font-semibold">
      Chat with {{ targetId || '...' }}
    </header>

    <div class="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="msg.send === currentId ? 'self-end bg-blue-600 text-white' : 'self-start bg-gray-700 text-white'"
        class="p-2 rounded max-w-[70%] break-words"
      >
        <div class="text-xs opacity-70">{{ msg.sender_username }}</div>
        <div>{{ msg.content }}</div>
      </div>
    </div>

    <footer class="p-4 flex gap-2 bg-gray-900">
      <input
        v-model="newMessage"
        @keyup.enter="handleSend"
        placeholder="Type a message..."
        class="flex-1 p-2 rounded bg-gray-700 text-white outline-none"
      />
      <button @click="handleSend" class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Send</button>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import useDirectMessages from '~/composables/useDirectMessages'


const props = defineProps({
currentUserId: String,
targetUserId: String
})


const { messages, newMessage, sendMessage, fetchMessages } = useDirectMessages()


const currentId = ref(null)
const targetId = ref(null)


watch(
  () => [props.currentUserId, props.targetUserId],
  ([newCurrent, newTarget]) => {
    console.log('Props updated:', { newCurrent, newTarget })
    if (!newCurrent || !newTarget) return
    currentId.value = newCurrent
    targetId.value = newTarget
    fetchMessages(currentId.value, targetId.value)
  },
  { immediate: true }
)


const handleSend = () => {
  if (!newMessage.value.trim()) return
  if (!targetId.value) {
    alert("Chat not ready yet — please wait a second!")
    return
  }
  sendMessage(targetId.value)
}
</script>

<style scoped>
.self-end { align-self: flex-end; }
.self-start { align-self: flex-start; }
</style>
