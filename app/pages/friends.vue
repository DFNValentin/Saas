<script setup>
import { ref, computed, onMounted } from 'vue'
import useFriends from '~/composables/useFriends'
import Modal from '../components/modal.vue'
import Slidebar from '../components/slidebar.vue'

const showModal = ref(false)
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

const {
  sendRequest,
  acceptRequest,
  revokeRequest,
  getPendingRequests,
  getFriendsList
} = useFriends()

definePageMeta({ middleware: 'auth' })

const friends = ref([])
const pendingRequests = ref([])
const activeTab = ref('all')
const friendName = ref('')
const loading = ref(false)
const error = ref('')
const userId = ref(null)

// Load friends and pending requests on mount
onMounted(async () => {
  try {
    const friendsData = await getFriendsList() || []
    const pendingData = await getPendingRequests() || []

    friends.value = friendsData
    pendingRequests.value = pendingData

    // Set current userId (assuming getFriendsList returns user info)
    if (friendsData.length > 0) {
      userId.value = friendsData[0].currentUserId || null
    }
  } catch (e) {
    console.error(e)
  }
})

// Compute which list to display based on active tab
const displayedList = computed(() => {
  if (activeTab.value === 'pending') return pendingRequests.value
  if (activeTab.value === 'all') return friends.value
  // Online and Blocked tabs can filter accordingly if you have data
  return friends.value
})

// Handle sending friend request
const handleSend = async () => {
  error.value = ''
  const name = friendName.value.trim()
  if (!name) {
    error.value = 'Te rog introdu un username.'
    return
  }
  loading.value = true
  try {
    await sendRequest(name)
    friendName.value = ''
    closeModal()
    pendingRequests.value = await getPendingRequests() || []
  } catch (e) {
    error.value = e?.message || 'A apărut o problemă la trimiterea cererii.'
  } finally {
    loading.value = false
  }
}

// Handle accepting a request
const handleAccept = async (id) => {
  await acceptRequest(id)
  pendingRequests.value = await getPendingRequests() || []
  friends.value = await getFriendsList() || []
}

// Handle declining a request
const handleDecline = async (id) => {
  await revokeRequest(id)
  pendingRequests.value = await getPendingRequests() || []
}
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Slidebar />

    <!-- Friends panel -->
    <aside class="w-60 bg-[#2b2d31] text-white flex flex-col">
      <div class="h-12 px-4 flex items-center border-b border-white/10 font-semibold">
        Friends
      </div>

      <nav class="flex flex-col p-2 text-sm space-y-1">
        <button :class="{'bg-[#404249]': activeTab==='all'}" @click="activeTab='all'" class="px-3 py-2 text-left rounded hover:bg-[#404249]">All</button>
        <button :class="{'bg-[#404249]': activeTab==='online'}" @click="activeTab='online'" class="px-3 py-2 text-left rounded hover:bg-[#404249]">Online</button>
        <button :class="{'bg-[#404249]': activeTab==='pending'}" @click="activeTab='pending'" class="px-3 py-2 text-left rounded hover:bg-[#404249]">Pending</button>
        <button :class="{'bg-[#404249]': activeTab==='blocked'}" @click="activeTab='blocked'" class="px-3 py-2 text-left rounded hover:bg-[#404249]">Blocked</button>

        <button @click="openModal" class="px-3 py-2 text-left rounded bg-green-600 hover:bg-green-700 mt-2 text-white">Add Friend</button>

        <!-- Add Friend Modal -->
        <Modal :show="showModal" @close="closeModal">
          <input v-model="friendName" type="text" placeholder="Friend name" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm transition text-black" />
          <button @click="handleSend" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-2">Confirm</button>
          <p v-if="error" class="text-red-400 text-sm mt-2">{{ error }}</p>
        </Modal>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 bg-[#313338] text-white p-4 overflow-y-auto">
      <!-- Pending Requests -->
      <div v-if="activeTab==='pending'">
        <h2 class="font-semibold mb-2">Pending Requests</h2>
        <div v-for="f in displayedList" :key="f.id" class="flex items-center justify-between p-2 rounded hover:bg-[#404249]">
          <span>{{ f.name || f.username || f.sent }}</span>
          <div class="flex gap-2">
            <button @click="handleAccept(f.id)" class="px-2 py-1 bg-green-600 rounded hover:bg-green-700">Accept</button>
            <button @click="handleDecline(f.id)" class="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Decline</button>
          </div>
        </div>
      </div>

      <!-- Friends List -->
      <div v-else>
        <h2 class="font-semibold mb-2">Friends List</h2>
        <div v-for="f in displayedList" :key="f.id" class="flex items-center gap-3 p-2 rounded hover:bg-[#404249]">
          <div class="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-sm font-semibold">
            {{ (f.name || f.username || (f.sent === userId ? f.received : f.sent) || '').slice(0,2).toUpperCase() }}
          </div>
          <span>{{ f.name || f.username || (f.sent === userId ? f.received : f.sent) }}</span>
        </div>
      </div>
    </main>
  </div>
</template>
