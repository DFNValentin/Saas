import { ref } from 'vue'
import { supabase } from '~/utils/supabase'

export default function useDirectMessages() {
  const messages = ref([])
  const newMessage = ref('')

  const sendMessage = async (targetUserId) => {
    // Verify If User Is Logged
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('You are not logged in.')
    if (!newMessage.value.trim()) return

    // Sender User Profile
    const { data: senderProfile, error: senderError } = await supabase
      .from('Profile')
      .select('id, username')
      .eq('id', user.id)
      .single()

    if (senderError || !senderProfile) {
      console.error('❌ Sender profile fetch error:', senderError)
      return
    }

    // Target User Profile
    const { data: receiverProfile, error: receiverError } = await supabase
      .from('Profile')
      .select('id, username')
      .eq('id', targetUserId)
      .single()

    if (receiverError || !receiverProfile) {
      console.error('❌ Receiver profile fetch error:', receiverError)
      console.log('Receiver ID used:', targetUserId)
      return
    }

    // Create Message Obj

    const messageObj = {
      send: senderProfile.id,
      received: receiverProfile.id,
      sender_username: senderProfile.username,
      receiver_username: receiverProfile.username,
      content: newMessage.value.trim(),
      status: 'sent',
      created_at: new Date().toISOString(),
    }

    console.log('💬 Sending message from', senderProfile.id, 'to', receiverProfile.id)

    // Insert in Database
    const { data, error } = await supabase
      .from('Messages')
      .insert([messageObj])
      .select()

    if (error) {
      console.error('❌ Insert message error:', error)
      return
    }

    // Add local Message
    messages.value.push(data[0])
    newMessage.value = ''
  }

  const fetchMessages = async (currentUserId, targetUserId) => {
  if (!currentUserId || !targetUserId) return

  const { data, error } = await supabase
    .from('Messages')
    .select('*')
    .or(
      `send.eq.${currentUserId}.and.received.eq.${targetUserId}),` +
      `send.eq.${targetUserId}.and.received_id.eq.${currentUserId}`
    )
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Fetch messages error:', error)
    return
  }

  messages.value = data || []
}

  return { messages, newMessage, sendMessage , fetchMessages}
}
