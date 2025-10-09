<script setup>
import { ref, computed, onMounted } from 'vue'
import Modal from './modal.vue'
import { useRouter } from 'vue-router'
import useFriends from '~/composables/useFriends'
import { supabase } from '~/utils/supabase'

const router = useRouter()
const showModal = ref(false)
const friendName = ref('')
const activeTab = ref('all')

const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

const {
  sendRequest,
  acceptRequest,
  revokeRequest,
  getPendingRequests,
  getFriendsList,
  deleteFriend
} = useFriends()

const friends = ref([])
const pendingRequests = ref([])
const user = ref(null)

// Load friends and pending requests
onMounted(async () => {
  const { data: currentUser } = await supabase.auth.getUser()
  user.value = currentUser.user
  friends.value = await getFriendsList() || []
  pendingRequests.value = await getPendingRequests() || []
})

// Computed list
const displayedList = computed(() => {
  if (activeTab.value === 'pending') return pendingRequests.value
  return friends.value
})

const goToDM = (friendId) => router.push(`/dm/${friendId}`)

// Friend functions
const handleSend = async () => {
  if (!friendName.value.trim()) return
  await sendRequest(friendName.value)
  friendName.value = ''
  closeModal()
  pendingRequests.value = await getPendingRequests() || []
  friends.value = await getFriendsList() || []
}

const handleAccept = async (id) => {
  await acceptRequest(id)
  pendingRequests.value = await getPendingRequests() || []
  friends.value = await getFriendsList() || []
}

const handleDecline = async (id) => {
  await revokeRequest(id)
  pendingRequests.value = await getPendingRequests() || []
}

const handleDelete = async (id) => {
  await deleteFriend(id)
  friends.value = await getFriendsList() || []
}

const getFriendName = (f) => f.sent === user.value.id ? f.received_username : f.sender_username
</script>

<template>
  <aside class="w-60 bg-[#2b2d31] text-white flex flex-col">
    <div class="h-12 px-4 flex items-center border-b border-white/10 font-semibold">
      Friends
    </div>

    <nav class="flex flex-col p-2 text-sm space-y-1">
      <button :class="{'bg-[#404249]': activeTab==='all'}" @click="activeTab='all'" class="px-3 py-2 text-left rounded hover:bg-[#404249]">All</button>
      <button :class="{'bg-[#404249]': activeTab==='pending'}" @click="activeTab='pending'" class="px-3 py-2 text-left rounded hover:bg-[#404249]">Pending</button>

      <button @click="openModal" class="px-3 py-2 text-left rounded bg-green-600 hover:bg-green-700 mt-2 text-white">Add Friend</button>

      <Modal :show="showModal" @close="closeModal">
        <input v-model="friendName" placeholder="Friend name" class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 text-black" />
        <button @click="handleSend" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-2">Confirm</button>
      </Modal>

      <ul class="flex flex-col space-y-1 mt-4">
        <li v-for="f in displayedList" :key="f.id" class="px-3 py-2 rounded hover:bg-[#404249] cursor-pointer flex items-center justify-between" @click="goToDM(f.id)">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-sm font-semibold">{{ (getFriendName(f) || '').slice(0,2).toUpperCase() }}</div>
            <span>{{ getFriendName(f) }}</span>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>
