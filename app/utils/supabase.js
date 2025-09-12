import { createClient } from '@supabase/supabase-js'
//const supabaseUrl = 'https://ategmunnayebykislzxa.supabase.co'
//const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0ZWdtdW5uYXllYnlraXNsenhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMDY5NjUsImV4cCI6MjA3MDc4Mjk2NX0.DrTgWWXw91NBBwhS0RzTNgbycI80B7SerP-JcxAXqso'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey , {
    auth: {
    autoRefreshToken: true,
    persistSession: true, //  păstrează login la refresh
    detectSessionInUrl: true
  }
})