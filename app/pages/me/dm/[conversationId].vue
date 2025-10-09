<template>
  <div class="flex h-screen">
    <Chat
      v-if="currentUserId && targetUserId"
      :currentUserId="currentUserId"
      :targetUserId="targetUserId"
    />
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
  const { data: { user } } = await supabase.auth.getUser()
  currentUserId.value = user?.id
  targetUserId.value = route.params.id
})
</script>
