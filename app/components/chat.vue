<script setup>
import { ref, onMounted } from 'vue'
import useDirectMessages from '~/composables/useDirectMessages'

const props = defineProps({
  currentUserId: { type: String, required: true },
  targetUserId: { type: String, required: true }
})

const { messages, newMessage, sendMessage, fetchMessages } = useDirectMessages()

// We use direct props.currentUserId ca "currentId"
const currentId = props.currentUserId

const handleSend = () => {
  if (!newMessage.value.trim()) return
  sendMessage(props.targetUserId)
}

// We take over the existing messages at mount
onMounted(() => {
  fetchMessages(props.currentUserId, props.targetUserId)
})
</script>

<template>
  <div class="flex flex-col h-full bg-gray-800 text-white">
    <!-- Header -->
    <header class="p-4 bg-gray-900 font-semibold">
      Chat with {{ props.targetUserId }}
    </header>

    <!-- Messages list -->
    <div class="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="msg.sender_id === currentId ? 'self-end bg-blue-600' : 'self-start bg-gray-700'"
        class="p-2 rounded max-w-[70%]"
      >
        <div>{{ msg.content }}</div>
      </div>
    </div>

    <!-- Input -->
    <footer class="p-4 flex gap-2 bg-gray-900">
      <input
        v-model="newMessage"
        @keyup.enter="handleSend"
        placeholder="Type a message..."
        class="flex-1 p-2 rounded bg-gray-700 text-white"
      />
      <button @click="handleSend" class="px-4 py-2 bg-blue-600 rounded">Send</button>
    </footer>
  </div>
</template>
