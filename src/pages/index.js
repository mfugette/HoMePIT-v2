import Head from 'next/head'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import supabase from '@/config/supabaseClient';
//import { loginWithGoogle } from '@/config/supabaseClient';
//import { handleAuth } from '@/components/userAuth';

//import { useSession } from "next-auth/react"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

/*
  supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            
          }
        }

      })
      */
  return (
    <>
      <Head>
        <title>HoMePIT</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
        <div id="intro">
          <form id = "homeLogo">
            <h6 id = "homeH6"> Welcome to</h6>
            <h2 id = "homeH2"> HoMePIT </h2>
          </form>
          <form id = "homeSignInForm">
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