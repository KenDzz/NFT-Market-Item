import Head from 'next/head'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { color } from '@chakra-ui/react';

export default function Layout({
  children,
  title = 'NFT BlockChain - Demo',
}) {
  const router = useRouter();
  const [ChangeRouter, setChangeRouter] = useState(false);
  const [CloudBlock, setCloudBlock] = useState("");

function createCloud(n){
    var Cloud = [];
    for(var i = 1; i <= n; i++){
      Cloud.push(<motion.div className={`cloud `+CloudBlock} style={{transition: `all ${getRndInteger(3,10)}s`}} animate={{ x: getRndInteger(-120,120)+"vw", y: getRndx()+"vh", scale: 3.5 }}/>);
      Cloud.push(<motion.div className={`cloud `+CloudBlock} style={{transition: `all ${getRndInteger(3,10)}s`}} animate={{ x: getRndx()+"vw", y: getRndInteger(-120,120)+"vh", scale: 3.5 }}/>);
    }
    return Cloud;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRndx(){
  const x = ["-120", "120"];
  const random = Math.floor(Math.random() * x.length);
  return x[random];
}

function changeCloud(){
  setChangeRouter(true)
  setCloudBlock("cloud-unblock")
}


useEffect(() => {
  router.events.on("routeChangeComplete", () => {
    console.log("routeChangeComplete");
  });
  router.events.on("routeChangeStart", () => {
    console.log("routeChangeStart");
  });
  return () => {
    router.events.off("routeChangeComplete", () => {
      console.log("stoped");
    });
  };
}, [router.events]);


const Link = ({ children, href }) => {
  changeCloud()
  const router = useRouter()
  return (
    <a href="#" className={children} onClick={(e) => {
        e.preventDefault()
        setTimeout(() => {
          setChangeRouter(false)
          router.push(href)
        }, 1000);
      }}
    ></a>
  )
}


  return (
    <div className='container'>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className='menu'>
          <Link href="/">logo-home</Link>
          <Link href="/pk">logo-pk</Link>
          <Link href="/user">logo-user</Link>
        </nav>
      </header>
        <div className='sky'>
            {ChangeRouter == true ? ( 
              createCloud(50)
             ) : ( 
              createCloud(50)
            )}
        </div>
        {children}

      <footer>{'NFT BlockChain Demo - Developer By KenDzz '+new Date().toLocaleString()}</footer>
    </div>
  )
}