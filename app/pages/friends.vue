<script setup>
//import useFriends from '~/composables/useFriends'

definePageMeta({
  middleware: 'auth'
})

//const friends = ref([])
//const pendingRequests = ref([])

//const { getFriendsList, getPendingRequests, acceptRequest, declineRequest } = useFriends()

//onMounted(async () => {
  //friends.value = await getFriendsList()
  //pendingRequests.value = await getPendingRequests()
//})


// Funcții pentru butoane
//const handleAccept = async (id) => {
  //await acceptRequest(id)
  //pendingRequests.value = await getPendingRequests()
  //friends.value = await getFriendsList()
//}

//const handleDecline = async (id) => {
 // await declineRequest(id)
  //pendingRequests.value = await getPendingRequests()
//}
</script>



<template>
  <div class="flex h-screen">
    <!-- Sidebar servers -->
    <slidebar />

    <!-- Friends panel -->
    <aside class="w-60 bg-[#2b2d31] text-white flex flex-col">
      <!-- Header -->
      <div class="h-12 px-4 flex items-center border-b border-white/10 font-semibold">
        Friends
      </div>

      <!-- Nav Tabs -->
      <nav class="flex flex-col p-2 text-sm space-y-1">
        <button class="px-3 py-2 text-left rounded hover:bg-[#404249]">All</button>
        <button class="px-3 py-2 text-left rounded hover:bg-[#404249]">Online</button>
        <button class="px-3 py-2 text-left rounded hover:bg-[#404249]">Pending</button>
        <button class="px-3 py-2 text-left rounded hover:bg-[#404249]">Blocked</button>
        <button class="px-3 py-2 text-left rounded bg-green-600 hover:bg-green-700 mt-2">
          Add Friend
        </button>
      </nav>

      <!-- Friends List -->
      <div class="flex-1 overflow-y-auto p-2 space-y-2">
        <div v-for="f in friends" :key="f.id" 
             class="flex items-center gap-3 p-2 rounded hover:bg-[#404249] cursor-pointer">
          <div class="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center">
            {{ f.initials }}
          </div>
          <span class="text-sm">{{ f.name }}</span>
        </div>
      </div>
    </aside>

    <!-- Main Chat area -->
    <main class="flex-1 bg-[#313338] text-white flex flex-col">
      <header class="h-12 border-b border-white/10 px-4 flex items-center">
        <h2 class="font-semibold">Select a friend to chat</h2>
      </header>
      <div class="flex-1 flex items-center justify-center text-white/40">
        👈 Alege un prieten din lista
      </div>
    </main>
  </div>
</template>

