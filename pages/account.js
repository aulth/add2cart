import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
const Account = () => {
const [userName, setUserName] = useState(null)
useEffect(()=>{
    setUserName(localStorage.getItem('add2cart_name'))
    // esling-disable-next-line
}, [])
  return (
    <>
    <Head>
        <title>Account</title>
    </Head>
    <div className="container m-auto box-border p-2 flex flex-col">
        <div className="w-full flex border border-gray-200 rounded box-border flex-col p-2 items-center">
            <img className='w-20' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="" />
            <h2 className="text-xl font-semibold">{userName}</h2>
        </div>
        <ul className="w-full">
            <Link href={'/forgot-password'}><li className='p-1 border-b border-gray-200 hover:translate-x-3 transition cursor-pointer hover:font-semibold  duration-200'>Forgot password</li></Link>
            <Link href={'/orders'}><li className='p-1 border-b border-gray-200 hover:translate-x-3 transition cursor-pointer hover:font-semibold  duration-200'>Orders</li></Link>
            <li className='p-1 border-b border-gray-200 hover:translate-x-3 transition cursor-pointer hover:font-semibold  duration-200'>Logout</li>
        </ul>
    </div>
    
    </>
  )
}

export default Account