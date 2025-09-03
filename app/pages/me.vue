<script setup>
definePageMeta({
  middleware: 'auth'
})
import { ref, onMounted } from 'vue'
import { supabase } from '~/utils/supabase'
import { useRouter } from 'vue-router'
const router = useRouter()
//const displayName = ref('')

//onMounted(async () => {
  //const { data: { user }, error } = await supabase.auth.getUser()
  
  //if (!error && user) {
    // vezi exact ce cheie are user_metadata
   // console.log(user) // debug să vezi structura completă
   // displayName.value = user.user_metadata.full_name || user.user_metadata.display_name || ''
  //}
//})
</script>



<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <slidebar />

    <!-- Chat -->
    <chat class="flex-1" />
   <!--{{ displayName }}--> 
  </div>
</template>
