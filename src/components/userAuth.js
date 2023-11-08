import supabase from "@/config/supabaseClient"

export const handleAuth = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }