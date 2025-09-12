import { ref, onMounted } from 'vue'
import { supabase } from '~/utils/supabase'

const currentUser = ref('')
const loading = ref(true)
const error = ref(null)
