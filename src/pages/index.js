import Head from 'next/head'
import { Inter } from 'next/font/google'
import supabase from '@/config/supabaseClient';
//import { loginWithGoogle } from '@/config/supabaseClient';

import { useSession } from "next-auth/react"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  
// supabase.auth.signInWithOAuth({
//       provider: 'google',
//     })
  return (
    <>
      <Head>
        <title>HoMePIT</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <div>

        <main>
          <h1>Home Page</h1>
        </main>


        <b>
          <form>
            {/* { handleSignInWithGoogle() } */}
            {/* <button onClick={ () => }>Sign In</button> */}
          </form>
        </b>

        <footer>
          <p>Footer</p>
        </footer>
      </div>
    </>
  )
}