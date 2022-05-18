import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Footer from '../components/Footer'
import Search from '../components/Search'
import { useState, useEffect, useContext } from 'react'
import Cartstate from '../components/context/Cartstate'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Head from 'next/head'
import NProgress from "nprogress"
import "nprogress/nprogress.css"
function MyApp({ Component, pageProps }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  let searchBarFree = ['/login', '/signup', '/forgot-password', '/product/[item]', '/about', '/services-products', '/contact', '/checkout', '/addproduct']
  NProgress.configure({ showSpinner: false })
  Router.onRouteChangeStart = ()=>{
    NProgress.start()
  }
  Router.onRouteChangeComplete = ()=>{
    NProgress.done()
  }
  Router.onRouteChangeError = ()=>{
    NProgress.done()
  }
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('authtoken')) {
      setUserLoggedIn(true)
    }
  }, [router.pathname])
  return (
    <>
      <Cartstate>
        <Navbar userLoggedIn={userLoggedIn} />
        {
          searchBarFree.includes(router.pathname) ? null : <Search />
        }
        <Head>
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        </Head>
        <Component {...pageProps} />
        <Footer />
      </Cartstate>
    </>
  )
}

export default MyApp
