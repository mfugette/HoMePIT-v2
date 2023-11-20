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
      <div style={{ maxWidth: "100%", padding: "5%", textAlign: "center", verticalAlign: "middle"}}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

// #homeSignInForm {
//   margin-top: 90%;
//   max-width: 100%;
//   padding: 20%;
//   background-color: blanchedalmond;
//   text-align: center;
//   vertical-align: middle;
//   border: 5%, solid, black;
// }

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
      <div style={{ maxWidth: "100%", padding: "5%", textAlign: "center", verticalAlign: "middle"}}>
        <h4>Welcome to</h4>
        <img src = "homepit.svg" alt="HoMePIT logo" width='125' height='auto'/>
        <p></p>
        <p>Please sign in to start cooking.</p>
        <button onClick={loginWithGoogle}>Login</button>
      </div>
    </>
  );
}