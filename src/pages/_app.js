 import 'bootstrap/dist/css/bootstrap.css'
 import '../styles/globals.css'
 
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import MenuAppBar from "@/components/navbar";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <MenuAppBar/>
      <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>

      <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  );
}
