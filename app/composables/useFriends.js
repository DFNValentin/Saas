import { supabase } from '~/utils/supabase'

export function useFriends  ()  { 
    const sendRequest = async (userId) => {
        const {data , error} = await supabase
        .from('friends')
        .insert([{sent: supabase.auth.user().id, received: userId}])
        if (error) throw error
        return data
    }

    const acceptRequest = async (friendId) => {
        const {data ,  error} = await supabase
        .from('friends')
        .update({accepted: true})
        .eq('id' , friendId)
        if (error) throw error
        return data
    }

    const revokeRequest = async (friendId) => {
        const {data ,  error} = await supabase
        .from('friends')
        .delete()
        .eq('id' , friendId)
        if (error) throw error
        return data
    }

    const getPendingRequest = async () => { 
        const {data , error} = await supabase
        .from('friends')
        .select('*')
        .eq('received', supabase.auth.user().id)
        .eq('accepted', false)
        if (error) throw error
        return data
    }

    const getFriendList = async () => { 
        const {data , error} = await supabase  
        .from('friends')
        .select('*')
        //include rândurile în 
        // care utilizatorul este fie cel care a trimis cererea, fie cel care a primit-o.
        .or(`sent.eq.${supabase.auth.user().id},received.eq.${supabase.auth.user().id}`)
        .eq('accepted' , true) 
    }   
}