<template>
  <div class="flex h-screen">
    <!-- Arătăm Chat doar după ce ambele ID-uri sunt încărcate -->
    <Chat
      v-if="currentUserId && targetUserId"
      :currentUserId="currentUserId"
      :targetUserId="targetUserId"
    />
    
    <!-- Loading screen până când sunt gata -->
    <div v-else class="m-auto text-gray-300 text-lg">Loading chat...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '~/utils/supabase'
import Chat from '~/components/chat.vue'

const route = useRoute()
const currentUserId = ref(null)
const targetUserId = ref(null)

onMounted(async () => {
  // Obținem utilizatorul curent din supabase
  const { data: { user } } = await supabase.auth.getUser()
  
  // Setăm ID-urile
  currentUserId.value = user?.id || null
  targetUserId.value = route.params.id || null

  console.log('✅ Loaded IDs:', { currentUserId: currentUserId.value, targetUserId: targetUserId.value })
})
</script>
