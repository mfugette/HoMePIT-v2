import Head from 'next/head'
import { Inter } from 'next/font/google'
import supabase from '@/config/supabaseClient';
//import { loginWithGoogle } from '@/config/supabaseClient';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  //console.log(supabase)
  async function loginWithGoogle() {
    // supabase.auth.signInWithOAuth({
    //   provider: 'google',
    // })

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    console.log(data)
    console.log(error)


  }
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
            <button onClick={ loginWithGoogle() }>Sign In</button>
          </form>
        </b>

        <footer>
          <p>Footer</p>
        </footer>
      </div>
    </>
  )
}