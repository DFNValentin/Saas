import { supabase } from '~/utils/supabase'

export default function useFriends() {
  const sendRequest = async (userId) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Nu ești logat.')

    const { data, error } = await supabase
      .from('Friends') // numele corect al tablei
      .insert([{ sent: user.id, received: userId, status: false }])
    if (error) throw error
    return data
  }

  const acceptRequest = async (friendId) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Nu ești logat.')

    const { data, error } = await supabase
      .from('Friends')
      .update({ accepted: true })
      .eq('id', friendId)
    if (error) throw error
    return data
  }

  const revokeRequest = async (friendId) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Nu ești logat.')

    const { data, error } = await supabase
      .from('Friends')
      .delete()
      .eq('id', friendId)
    if (error) throw error
    return data
  }

  const getPendingRequest = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) return []

    const { data, error } = await supabase
      .from('Friends')
      .select('*')
      .eq('received', user.id)
      .eq('accepted', false)
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
      .eq('accepted', true)
    if (error) throw error
    return data
  }

  return {
    sendRequest,
    acceptRequest,
    revokeRequest,
    getPendingRequest,
    getFriendsList
  }
}
