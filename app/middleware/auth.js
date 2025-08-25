import { supabase } from '~/utils/supabase'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    // redirecționează către /login dacă nu e logat
    return navigateTo('/login')
  }

  // dacă e logat, continuă către ruta cerută
})
