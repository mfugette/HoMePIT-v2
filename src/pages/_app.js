import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Navbar from '../components/navbar';
import Sidebar from '@/components/sidebar';
import AppBar from '@mui/material/AppBar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Component {...pageProps} />

      </div>
    </>
  );

}
