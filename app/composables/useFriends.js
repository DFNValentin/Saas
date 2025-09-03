import { supabase } from '~/utils/supabase'

export default function useFriends() {
  //  Trimitere cerere prietenie
  const sendRequest = async (username) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Nu ești logat.')

    //  Căutăm utilizatorul după username
    const { data: targetUser, error: findError } = await supabase
      .from('Profile')            // tabela ta de users (ai username acolo)
      .select('id')
      .eq('username', username) // username vine din input
      .single()

    if (findError) throw findError
    if (!targetUser) throw new Error('Utilizatorul nu există.')

    // ✅ Inserăm prietenia cu UUID-uri
    const { data, error } = await supabase
      .from('Friends')
      .insert([{ sent: user.id, received: targetUser.id, status: 'pending' }])

    if (error) throw error
    return data
  }

  const acceptRequest = async (friendId) => {
    const { data, error } = await supabase
      .from('Friends')
      .update({ status: 'accepted' })
      .eq('id', friendId)

    if (error) throw error
    return data
  }

  const revokeRequest = async (friendId) => {
    const { data, error } = await supabase
      .from('Friends')
      .delete()
      .eq('id', friendId)

    if (error) throw error
    return data
  }

  const getPendingRequests = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) return []

    const { data, error } = await supabase
      .from('Friends')
      .select('*')
      .eq('received', user.id)
      .eq('status', 'pending')
    
    if (error) throw error
    return data
  }

  const getFriendsList = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) return []

    const { data, error } = await supabase
      .from('Friends')
      .select('*')
      .or(`sent.eq.${user.id},received.eq.${user.id}`)
      .eq('status', 'accepted')

    if (error) throw error
    return data
  }

  const deleteFriend = async (friendId) => {
    const {data , error} = await supabase
    .from('Friends')
    .delete()
    .eq('id', friendId)
    if (error) throw error
    return await getFriendsList()
  }
  return {
    sendRequest,
    acceptRequest,
    revokeRequest,
    getPendingRequests,
    getFriendsList,
    deleteFriend
  }
}
