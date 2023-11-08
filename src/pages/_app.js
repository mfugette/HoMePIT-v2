import '../styles/globals.css'
import Navbar from '../components/navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Component {...pageProps} />

      </div>
    </>
  );

}
