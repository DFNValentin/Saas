<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
    
    <!-- Background SVG -->
    <div class="absolute inset-0">
      <svg class="w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#4f46e5" fill-opacity="0.2">
    <animate attributeName="d" dur="10s" repeatCount="indefinite"
      values="
        M0,128L80,160C160,192,320,256,480,261.3C640,267,800,213,960,181.3C1120,149,1280,139,1360,133.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z;
        M0,160L80,180C160,200,320,220,480,200C640,180,800,160,960,181.3C1120,203,1280,245,1360,266.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z;
        M0,128L80,160C160,192,320,256,480,261.3C640,267,800,213,960,181.3C1120,149,1280,139,1360,133.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z
      "
    />
  </path>
</svg>

    </div>

    <!-- Formular -->
    <form @submit.prevent="register" 
      class="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md space-y-6 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80"
    >
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">Register</h2>
      
      <div>
        <label class="block text-gray-700 dark:text-gray-200 mb-2">Name</label>
        <input v-model="name" type="text" placeholder="Your Name" required
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 dark:text-gray-200 mb-2">Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" required
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 dark:text-gray-200 mb-2">Password</label>
        <input v-model="password" type="password" placeholder="••••••••" required
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 dark:text-gray-200 mb-2">Confirm Password</label>
        <input v-model="passwordConfirm" type="password" placeholder="••••••••" required
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button type="submit"
        class="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Register
      </button>
      <button @click="goTo('/login')">Already have an account? LogIn</button>
      <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { supabase } from '~/utils/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(path) {
  router.push(path)
}

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const error = ref(null)

const register = async () => {
  error.value = null

  if (password.value !== passwordConfirm.value) {
    error.value = 'Parolele nu coincid.'
    return
  }

  // 1️⃣ Crează utilizatorul în auth
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        display_name: name.value
      }
    }
  })

  if (signUpError) {
    error.value = signUpError.message
    return
  }

  const user = signUpData.user
  if (!user) {
    error.value = 'Nu s-a putut crea utilizatorul.'
    return
  }

  // 2️⃣ Creează rândul în tabela profiles
  const { data: profileData, error: profileError } = await supabase
    .from('Profile')
    .insert([{
      id: user.id,               // folosim UUID-ul generat în auth
      username: name.value,
    //  display_name: name.value
    }])

  if (profileError) {
    error.value = profileError.message
    return
  }

  console.log('User registered and profile created:', profileData)

  // 3️⃣ Redirect după succes
  router.push('/login')
}
</script>