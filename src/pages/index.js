import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";



export default function Home() {
  const supabase = useSupabaseClient();
  const session = useSession();

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <>
      <div style={{ maxWidth: "100%", padding: "5%", textAlign: "center", verticalAlign: "middle" }}>
        <h4>Sign out below.</h4>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

function LoginPage() {
  const supabase = useSupabaseClient();

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      //redirectTo: "https://homepit-6d86b.web.app"
    });
  }
  return (
    <>
      <div style={{ maxWidth: "100%", padding: "5%", textAlign: "center", verticalAlign: "middle" }}>
        <div id="homeLogo">
          <h5>Welcome to</h5>
          <img src="homepit.svg" alt="HoMePIT logo" width='100%' /* width='125' */ height='auto' />
        </div>
        <p></p>
        <div id="homeSignInForm">
          <p>Please sign in to start cooking.</p>
          <button id="homeSignInButton" onClick={loginWithGoogle}>Login</button>
        </div>
      </div>
    </>
  );
}