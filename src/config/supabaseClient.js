//import dotenv from 'dotenv'
//const dotenv = require('dotenv').config().parsed;
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

// export async function loginWithGoogle() {


//     // const { data, error } = await supabase.auth.signInWithOAuth({
//     //     provider: 'google',
//     //     options: {
//     //         redirectTo: 'http://localhost:3000'
//     //     }
//     // })
//     await supabase.auth.signInWithOAuth({ provider: 'google' })

// }
// export async function logout() {
//     const { error } = await supabase.auth.signOut();
// }