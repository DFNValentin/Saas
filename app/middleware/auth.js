import { supabase } from '~/utils/supabase'

export default defineNuxtRouteMiddleware(async (to, from) => {

  if (!process.client) return
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return navigateTo('/login')
  }
})

