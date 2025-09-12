import { supabase } from '~/utils/supabase'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://<project>.supabase.co', '<sb_publishable_... or anon key>')

const roomOne = supabase.channel('room-one') // set your topic here