
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.envNEXT_PUBLIC_SUPABSE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)