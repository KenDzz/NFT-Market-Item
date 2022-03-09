import 'bootstrap/dist/css/bootstrap.css'
import { MoralisProvider } from "react-moralis";
import Layout from '../components/Layout';
import '../styles/globals.css';
import Image from 'next/image'


function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_SERVER_URL} appId={process.env.NEXT_PUBLIC_API_ID}>
        <Component {...pageProps} />
      </MoralisProvider>
    </Layout>
  );
}

export default MyApp
