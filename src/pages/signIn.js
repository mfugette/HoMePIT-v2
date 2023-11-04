import { loginWithGoogle } from '@/config/supabaseClient';
import supabase from '@/config/supabaseClient';

export default function SignIn() {
    return (

        supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    )
}