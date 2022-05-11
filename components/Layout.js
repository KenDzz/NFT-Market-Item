import Head from 'next/head'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"

export default function Layout({
  children,
  title = 'NFT BlockChain - Demo',
}) {
  const [ChangeRouter, setChangeRouter] = useState(false);
  const [CloudBlock, setCloudBlock] = useState("");

function createCloud(n){
    var Cloud = [];
    for(var i = 1; i <= n; i++){
      Cloud.push(<motion.div className={`cloud `+CloudBlock} style={{transition: `all ${getRndInteger(3,5)}s`}} animate={{ x: getRndInteger(-120,120)+"vw", y: getRndx()+"vh", scale: 3.5 }}/>);
      Cloud.push(<motion.div className={`cloud `+CloudBlock} style={{transition: `all ${getRndInteger(3,5)}s`}} animate={{ x: getRndx()+"vw", y: getRndInteger(-120,120)+"vh", scale: 3.5 }}/>);
    }
    return Cloud;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRndx(){
  const x = ["-120", "150"];
  const random = Math.floor(Math.random() * x.length);
  return x[random];
}


function changeCloud(){
  setChangeRouter(true)
  setCloudBlock("cloud-unblock")
}


const Link = ({ children, href }) => {
  changeCloud()
  const router = useRouter()
  return (
    <a href="javascript:void(0)" className={children} onClick={(e) => {
        e.preventDefault()
        setChangeRouter(false)
        router.push(href)
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
      <motion.a href="javascript:void(0)" className='Scorpion' animate={{ x:"70vw" }} transition={{ duration: 10,repeat: Infinity, repeatType: "reverse" }}/>
    </div>
  )
}