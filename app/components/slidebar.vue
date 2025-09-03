<script setup>
import { ref, computed } from 'vue'
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
const servers = [
  { id: '1', name: 'Frontend Guild' },
  { id: '2', name: 'Vue Land' },
  { id: '3', name: 'Tailwind Tips' },
  { id: '4', name: 'Gamers' }
]

const activeId = ref('1')
const userName = 'Alex Doe'
const userInitials = computed(() => initials(userName))

function initials(name) {
  if (!name) return 'U'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function goTo(path) {
  router.push(path)
}

function onAdd() { console.log('Add server') }
function onDiscover() { console.log('Discover servers') }
function onProfile() { console.log('Profile clicked') }
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="h-full w-[72px] bg-[#1e1f22] text-white flex flex-col items-center py-3 gap-3 select-none">
      <!-- Home buttons -->
      <button @click="goTo('/friends')" class="w-12 h-12 rounded-2xl bg-[#5865F2] flex items-center justify-center">
        👥
      </button>

      <button @click="goTo('/me')" class="w-12 h-12 rounded-2xl bg-[#5865F2] flex items-center justify-center">
        🏠
      </button>

      <Separator />

      <!-- Servers list -->
      <ul class="flex-1 flex flex-col items-center gap-2 w-full overflow-y-auto pr-1">
        <li v-for="s in servers" :key="s.id" class="w-full flex justify-center">
          <button
            @click="activeId = s.id"
            class="w-12 h-12 rounded-2xl bg-[#313338] hover:bg-[#5865F2] flex items-center justify-center text-sm font-semibold"
            :class="{'ring-2 ring-white/40': s.id === activeId}"
          >
            {{ initials(s.name) }}
          </button>
        </li>
      </ul>

      <!-- Add / Discover -->
      <button @click="onAdd" class="w-12 h-12 rounded-2xl bg-[#2b2d31] flex items-center justify-center">+</button>
      <button @click="onDiscover" class="w-12 h-12 rounded-2xl bg-[#2b2d31] flex items-center justify-center">🔍</button>

      <Separator />

      <!-- Profile -->
      <button @click="onProfile" class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5865F2] to-[#3ba55d] text-xs font-bold flex items-center justify-center">
        {{ displayName }}
      </button>
    </aside>

    <!-- Main content    <main class="flex-1 overflow-y-auto bg-[#313338] text-white p-6">
      <slot />
    </main> -->

  </div>
</template>

<!-- Separator inline -->
<script>
export default {
  components: {
    Separator: {
      template: `<div class="w-8 h-[2px] rounded bg-white/10 my-2" aria-hidden="true"></div>`
    }
  }
}
</script>
