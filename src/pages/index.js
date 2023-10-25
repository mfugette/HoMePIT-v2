import Head from 'next/head'
import { Inter } from 'next/font/google'
import supabase from '@/config/supabaseClient';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

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
          <h1>Home Page</h1>
        </main>

        <footer>
          <p>Footer</p>
        </footer>
      </div>
    </>
  )
}
