import { ref, onMounted } from 'vue'
import { supabase } from '~/utils/supabase'

const currentUser = ref(null)

const error = ref(null)


export function useAuth()  { 
    const loading = ref(true)

    const loadUSer = async () => {
        const {data , error} = await supabase.auth.getSession()
        currentUser.value = data.session?.user || null
        loading.value = false
    }

    supabase.auth.onAuthStateChange((_event , session) => { 
        currentUser.value = session?.user || null
    })

    onMounted(loadUSer)
    
    return { currentUser, loading }
}

