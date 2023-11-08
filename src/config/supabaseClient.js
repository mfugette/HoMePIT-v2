import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey)
// supabase.auth.signInWithOAuth({
//     provider: 'google',
//     redirectTo: 'http://localhost:3000'
//   })

export default supabase
