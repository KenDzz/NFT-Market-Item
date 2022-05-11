import 'bootstrap/dist/css/bootstrap.css'
import { MoralisProvider } from "react-moralis";
import Layout from '../components/Layout';
import '../styles/globals.css';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    router.events.on("routeChangeError", (e) => setLoading(false));
    router.events.on("routeChangeStart", (e) => setLoading(false));
    router.events.on("routeChangeComplete", (e) => setTimeout(() => {setLoading(true)}, 2000));

    return () => {
      router.events.off("routeChangeError", (e) => setLoading(false));
      router.events.off("routeChangeStart", (e) => setLoading(false));
      router.events.off("routeChangeComplete", (e) => setTimeout(() => {setLoading(true)}, 2000));
    };
  }, [router.events]);
  
  return(
    <Layout>
      <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_SERVER_URL} appId={process.env.NEXT_PUBLIC_API_ID}>
        {loading ? (<Component {...pageProps} />) : ( null )}
      </MoralisProvider>
    </Layout>
  );
}

export default MyApp
