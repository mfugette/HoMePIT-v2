import { loginWithGoogle } from '@/config/supabaseClient';
import supabase from '@/config/supabaseClient';

export default async function SignIn() {
    // supabase.auth.signInWithOAuth({
    //     provider: 'google',
    // })
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })
        return data;

    } catch (error) {
        console.error(error);
    }

    // console.log(supabase.auth.getSession())
    // console.log(supabase.auth.getUser())
}