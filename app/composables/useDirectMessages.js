import { ref } from 'vue'
import { supabase } from '~/utils/supabase'

export default function useDirectMessages() {
  const messages = ref([])
  const newMessage = ref('')

  const sendMessage = async (targetUserId) => {
    console.log(' sendMessage called with targetUserId =', targetUserId)

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) {
      console.error(' supabase.auth.getUser() error:', userError)
      return
    }
    if (!user) {
      console.error(' No logged in user')
      return
    }

    console.log(' Current user ID =', user.id)

    // Fetch sender profile
    const { data: senderProfile, error: senderError } = await supabase
      .from('Profile')
      .select('id, username')
      .eq('id', user.id)
      .single()

    if (senderError || !senderProfile) {
      console.error(' Sender profile fetch error:', senderError)
      return
    }

    // Fetch receiver profile
    console.log(' Fetching receiver profile for ID =', targetUserId)
    const { data: receiverProfile, error: receiverError } = await supabase
      .from('Profile')
      .select('id, username')
      .eq('id', targetUserId)
      .single()

    if (receiverError || !receiverProfile) {
      console.error(' Receiver profile fetch error:', receiverError)
      console.log('Receiver ID used:', targetUserId)
      return
    }

    console.log(' Receiver profile found:', receiverProfile)

    const messageObj = {
      send: senderProfile.id,
      received: receiverProfile.id,
      sender_username: senderProfile.username,
      receiver_username: receiverProfile.username,
      content: newMessage.value.trim(),
      status: 'sent',
      created_at: new Date().toISOString(),
    }

    console.log(' Sending message:', messageObj)

    const { data, error } = await supabase
      .from('Messages')
      .insert([messageObj])
      .select()

    if (error) {
      console.error(' Insert message error:', error)
      return
    }

    messages.value.push(data[0])
    newMessage.value = ''
  }

  const fetchMessages = async (currentUserId, targetUserId) => {
    console.log(' fetchMessages called with:', { currentUserId, targetUserId })

    if (!currentUserId || !targetUserId) {
      console.warn(' Missing IDs in fetchMessages:', { currentUserId, targetUserId })
      return
    }

    const { data, error } = await supabase
      .from('Messages')
      .select('*')
      .or(
        `send.eq.${currentUserId}.and.received.eq.${targetUserId},send.eq.${targetUserId}.and.received.eq.${currentUserId}`
      )
      .order('created_at', { ascending: true })

    if (error) {
      console.error('❌ Fetch messages error:', error)
      return
    }

    console.log(' Messages fetched:', data)
    messages.value = data || []
  }

  return { messages, newMessage, sendMessage, fetchMessages }
}
