import Link from 'next/link'
import Head from 'next/head'

export default function Layout({
  children,
  title = 'NFT BlockChain - Demo',
}) {
  return (
    <div className='container'>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className='menu'>
          <Link href="/">
            <a className='logo-home'>Trang chủ</a>
          </Link>{' '}
          <Link href="/pk">
            <a className='logo-pk'>PK</a>
          </Link>{' '}
          <Link href="/user">
            <a className='logo-user'>Túi đồ</a>
          </Link>
        </nav>
      </header>
    
        {children}

      <footer>{'NFT BlockChain Demo - '+new Date().toLocaleString()}</footer>
    </div>
  )
}