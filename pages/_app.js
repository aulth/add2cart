import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Footer from '../components/Footer'
import Search from '../components/Search'
import {useState, useEffect, useContext} from 'react'
import Cartstate from '../components/context/Cartstate'
import {useRouter} from 'next/router'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  let searchBarFree = ['/login', '/signup', '/forgot-password', '/product/[item]', '/about', '/services-products', '/contact']
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem('authtoken')){
      setUserLoggedIn(true)
    }
  }, [router.pathname])
  return (
  <>
  <Cartstate>
  <Navbar userLoggedIn={userLoggedIn}/>
  {
    searchBarFree.includes(router.pathname) ? null : <Search/>
  }
  <Head>
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
  </Head>
  <Component {...pageProps} />
  <Footer/>
  </Cartstate>
  </>
  )
}

export default MyApp
