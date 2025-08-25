<script setup>
import { ref } from 'vue'
import { supabase } from '~/plugins/supabase'
import { onMounted } from 'vue'

const new_message = ref('')
const messages = ref([])

const fetchMessages = async () => {
  const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false })
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
    <div>
      <p v-for="(msg, index) in messages" :key="index">{{ msg }}</p>
    </div>
  <footer>
    <input v-model="new_message" placeholder="Scrie un mesaj..." />
    <button @click="message_display">Trimite</button>
  </footer>
</template>
