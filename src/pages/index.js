import Head from 'next/head'
import { Inter } from 'next/font/google'
import supabase from '@/config/supabaseClient';
//import SignIn from './signIn';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  

  async function loginWithGoogle() {
    
    let { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})

  }

  async function logoutWithGoogle() {
    let { error } = await supabase.auth.signOut()
  }

  console.log(supabase)

  return (
    <>
      <Head>
        <title>HoMePIT</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <div>

        <main>
          <h1 id="homeLogo">Home Page</h1>
        </main>

        <b id="">
          <form id="signIn">
            <h4> Sign in with google </h4>
            <button onClick={loginWithGoogle} >
              Sign In
            </button>
          </form>
        </b>

        <footer>
          <p>Footer</p>
        </footer>
      </div>
    </>
  )
}
