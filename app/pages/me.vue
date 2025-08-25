<script setup>
definePageMeta({
  middleware: 'auth'
})
import { ref, onMounted } from 'vue'
import { supabase } from '~/utils/supabase'
import { useRouter } from 'vue-router'
const router = useRouter()
const displayName = ref('')

onMounted(async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (!error && user) {
    // vezi exact ce cheie are user_metadata
    console.log(user) // debug să vezi structura completă
    displayName.value = user.user_metadata.full_name || user.user_metadata.display_name || ''
  }
})
</script>

<template>
  <div>
    <p v-if="displayName">Salut, {{ displayName }}!</p>
    <p v-else>Nu ești logat sau nu există display name.</p>
    <chat/>
  </div>
</template>
