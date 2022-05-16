import React, { useState, useEffect } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
const Login = () => {
    const router = useRouter()
    const [user, setUser] = useState({ emailorphone: '', password: '' })
    const handleOnChange = (e) => {
        e.preventDefault()
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }
    const handleOnLogin = async (e) => {
        e.preventDefault();
        let response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        let data = await response.json()
        if (data.success) {
            localStorage.setItem('authtoken', data.authtoken);
            toast.success(data.msg, {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip
            })
            setTimeout(() => {
                router.push('/')
            }, 500);
        }else{
            toast.error(data.msg, {
                position: 'bottom-left',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Flip
            })
        }
    }
    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
            router.push('/')
        }
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <ToastContainer />
            <Head>
            <title>Login</title>
            <meta name="description" content={`Login to ${process.env.WEBSITE_NAME}`} />
        </Head>
            <div className="container m-auto flex justify-center box-border p-2">
                <form className='flex w-full md:w-96 flex-col items-center' onSubmit={handleOnLogin}>
                    <img src="/logo.png" width={'140px'} className="pt-2" alt="logo" />
                    <h2 className="text-2xl font-bold pt-2 pb-4">
                        Login to your account
                    </h2>
                    <div className="flex w-full border border-gray-200 my-2">
                        <AiOutlineUser size={'40px'} className="p-2 bg-gray-200" />
                        <input type="text" onChange={handleOnChange} name='emailorphone' className='p-2 w-full focus:outline-none' placeholder='Enter your email or phone number' />
                    </div>
                    <div className="flex w-full border border-gray-200 my-2">
                        <RiLockPasswordLine size={'40px'} className="p-2 bg-gray-200" />
                        <input type="password" onChange={handleOnChange} name='password' className='p-2 w-full focus:outline-none' placeholder='Password' />
                    </div>
                    <button type='submit' className="w-full p-2 text-lg hover:text-white font-semibold text-orange-400 rounded my-2 border border-orange-400 hover:bg-orange-300 focus:bg-orange-500">
                        Login
                    </button>
                    <div className="w-full flex justify-between items-center">
                        <Link href={'/signup'}>
                            <div className="bg-orange-300 cursor-pointer p-2 text-lg hover:text-orange-400 font-semibold text-white rounded my-2 border border-orange-400 hover:bg-transparent">
                                Sign up
                            </div>
                        </Link>
                        <p>
                            <Link href={'/forgot-password'} className="text-orange-400  cursor-pointer hover:text-orange-500">
                                Forgot password?
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Login