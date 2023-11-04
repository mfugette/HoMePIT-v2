import { loginWithGoogle } from '@/config/supabaseClient';
import supabase from '@/config/supabaseClient';

export default function SignIn() {
    supabase.auth.signInWithOAuth({
        provider: 'google',
    })
}