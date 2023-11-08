import Head from 'next/head'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import supabase from '@/config/supabaseClient';
//import { loginWithGoogle } from '@/config/supabaseClient';
//import { handleAuth } from '@/components/userAuth';

//import { useSession } from "next-auth/react"


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
        <div id="intro">
          <p>Welcome to HoMePIT!</p>
          <form id = "homeSignIn">
            <h4>Sign in with google</h4>
            <ul id = "homeSignInButtonUl">
              <li id="homeSignInButton">
                <Link href={"/signIn"}>
                Sign In
                </Link>
              </li>
            </ul>
          </form>
        </div>
    </>
  )
}