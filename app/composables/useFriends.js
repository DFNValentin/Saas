import { supabase } from '~/utils/supabase'

export default function useFriends() {
  //  Trimitere cerere prietenie
  const sendRequest = async (username) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('You are not logged.')

    //  Căutăm utilizatorul după username
const { data: senderProfile, error: senderError } = await supabase
    .from('Profile')
    .select('id, username')
    .eq('id', user.id)
    .single()

  if (senderError) throw senderError

  // 📌 Profilul destinatarului (target)
  const { data: targetUser, error: findError } = await supabase
    .from('Profile')
    .select('id, username')
    .eq('username', username)
    .single()

  //if (findError) throw findError
  if (!targetUser) throw new Error("Username doesn't exist.")
  if (targetUser.id == user.id) throw new Error("You can't send a friend request to your account.")

const { data: existing, error: existingError } = await supabase
  .from('Friends')
  .select('*')
  .or(
    `and(sent.eq.${user.id},received.eq.${targetUser.id}),and(sent.eq.${targetUser.id},received.eq.${user.id})`
  )
  .single()

if (existing) {
  throw new Error("Friend request already sent or you are already friends.")
}
  // ✅ Inserăm prietenia
  const { data, error } = await supabase
    .from('Friends')
    .insert([{
      sent: senderProfile.id,
      received: targetUser.id,
      status: 'pending',
      sender_username: senderProfile.username,
      received_username: targetUser.username
    }])
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
     // .eq('received , sent', user.id)
      .or(`sent.eq.${user.id},received.eq.${user.id}`)
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
