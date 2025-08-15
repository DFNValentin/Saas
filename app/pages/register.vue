<template>
  <form @submit.prevent="register">
    <input v-model="name" type="name" placeholder="name" required />
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Parolă" required />
    <input v-model="password1" type="password1" placeholder="Parolă" required />
    <button type="submit">Înregistrează-te</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { supabase } from '~/utils/supabase'

const name = ref('')
const email = ref('')
const password = ref('')
const password1 = ref('')
const error = ref(null)

const register = async () => {
  error.value = null
  const { data, error: signUpError } = await supabase.auth.signUp({
    name: name.value,
    email: email.value,
    password: password.value,
    password1: password1.value,
  })

  if (signUpError) {
    error.value = signUpError.message
    return
  }

  console.log('User registered:', data)
}
</script>