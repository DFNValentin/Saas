<template>
  <form @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '~/utils/supabase'

const email = ref('')
const password = ref('')
const error = ref(null)

const login = async () => {
  error.value = null
  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (loginError) {
    error.value = loginError.message
    return
  }

  console.log('User Logged:', data.user)
}
</script>



