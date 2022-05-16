import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Footer from '../components/Footer'
import Search from '../components/Search'
import {useState, useEffect, useContext} from 'react'
import Cartstate from '../components/context/Cartstate'
import {useRouter} from 'next/router'
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
  <Component {...pageProps} />
  <Footer/>
  </Cartstate>
  </>
  )
}

export default MyApp
