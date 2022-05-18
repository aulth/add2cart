import React, { useState, useEffect } from 'react'
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import {BsEye, BsEyeSlash} from 'react-icons/bs'
import { MdOutlineCall } from 'react-icons/md'
import { BsKey } from 'react-icons/bs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { setCookies } from 'cookies-next'
import Head from 'next/head'
const Signup = () => {
    const router = useRouter()
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [user, setUser] = useState({ name: '', email: '', phone: '', password: '', otp: '' })
    const [passwordVisible, setPasswordVisible] = useState(false)
    const toastOption = {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip
    }
    const handleOnChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleOnSignup = async (e) => {
        e.preventDefault();
        let response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        let data = await response.json()
        if (data.success) {
            setCookies('authtoken', data.authtoken)
            localStorage.setItem('authtoken', data.authtoken);
            localStorage.setItem('authtoken', data.authtoken);
            localStorage.setItem('add2cart_name', data.name);
            localStorage.setItem('add2cart_email', data.email);
            localStorage.setItem('add2cart_contact', data.contact);
            toast.success(data.msg,toastOption)
            router.push('/')
        } else {
            toast.error(data.msg, toastOption)
        }
    }

    const sendOtp = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/sendemailotp', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: user.email })
        })
        let data = await response.json()
        if (data.success) {
            setOtp(data.otp)
            toast.success(data.message, toastOption)
            setOtpSent(true)
        } else {
            toast.error(data.message, toastOption)
        }
    }
    const resendOtp = async (e) => {
        e.preventDefault();
        let response = await fetch('/api/sendemailotp', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: user.email })
        })
        let data = await response.json()
        if(data.success){
            setOtp(data.otp)
        toast.success(data.msg, toastOption)
        }else{
            toast.error(data.msg, toastOption)
        }

    }
    const verifyOtp = async (e) => {
        e.preventDefault();
        if (user.otp == otp) {
            setIsEmailVerified(true)
            toast.success('Email verified successfully', toastOption)
        } else {
            toast.error('OTP not matched', toastOption)
        }
    }
    const showPassword = ()=>{
        let elem = document.getElementById('password')
        if(elem.type=='password'){
            setPasswordVisible(true)
            elem.type='text'
        }else{
            setPasswordVisible(false)
            elem.type='password'
        }
    }
    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
            router.push('/')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <ToastContainer />
            <Head>
            <title>Sign up</title>
            <meta name="description" content={`Create an account on ${process.env.WEBSITE_NAME}`} />
        </Head>
            <div className="container m-auto flex justify-center box-border p-2">
                <form className='flex w-full md:w-96 flex-col items-center' onSubmit={handleOnSignup}>
                    <img src="/logo.png" width={'140px'} className="pt-2" alt="logo" />
                    <h2 className="text-2xl font-bold pt-2 pb-4">
                        Create an account
                    </h2>
                    <div className="flex w-full border border-gray-200 my-2">
                        <AiOutlineUser size={'40px'} className="p-2 bg-gray-200" />
                        <input type="text" name='name' onChange={handleOnChange} className='p-2 w-full focus:outline-none' placeholder='Name' required />
                    </div>
                    <div className="flex w-full border border-gray-200 my-2">
                        <AiOutlineMail size={'40px'} className="p-2 bg-gray-200" />
                        <input type="email" name='email' onChange={handleOnChange} className='p-2 w-full focus:outline-none' placeholder='Enter your email' required />
                    </div>
                    {
                        !otpSent &&
                        <button className='w-full text-center p-1 border text-gray-500 border-gray-300 rounded cursor-pointer hover:bg-gray-300 ' onClick={sendOtp}>Send Otp to email</button>
                    }
                    {
                        otpSent && !isEmailVerified &&
                        <>
                            <div className="flex w-full border border-gray-200 my-2">
                                <BsKey size={'40px'} className="p-2 bg-gray-200" />
                                <input type="email" name='otp' id='userotp' onChange={handleOnChange} className='p-2 w-full focus:outline-none' placeholder='Enter otp sent to your mail' required/>
                            </div>
                            <div className="flex flex-col w-full md:flex-row">
                                <button className='w-full md:1/2 mr-1 text-center p-1 border text-gray-500 border-gray-300 rounded  cursor-pointer hover:bg-gray-300' onClick={verifyOtp}>Verify OTP</button>
                                <button className='w-full md:1/2 md:ml-1 text-center p-1 border text-gray-500 border-gray-300 rounded  cursor-pointer hover:bg-gray-300' onClick={resendOtp}>Resend OTP</button>
                            </div>
                        </>
                    }
                    <div className="flex w-full border border-gray-200 my-2">
                        <MdOutlineCall size={'40px'} className="p-2 bg-gray-200" />
                        <input type="tel" name='phone' onChange={handleOnChange} className='p-2 w-full focus:outline-none' placeholder='Phone' required />
                    </div>
                    <div className="flex w-full border border-gray-200 my-2">
                        <RiLockPasswordLine size={'40px'} className="p-2 bg-gray-200" />
                        <input type="password" id='password' name='password' onChange={handleOnChange} className='p-2 w-full focus:outline-none' placeholder='Password' required/>
                        {
                            !passwordVisible && <BsEye onClick={showPassword} size={'40px'} className="p-2 bg-gray-200 cursor-pointer" />
                        }
                        {
                            passwordVisible && <BsEyeSlash onClick={showPassword} size={'40px'} className="p-2 bg-gray-200 cursor-pointer" />
                        }
                    </div>
                    <button disabled={!isEmailVerified} className={`w-full ${!isEmailVerified ? 'bg-gray-400 cursor-not-allowed text-white' : 'hover:text-white text-orange-400 border-orange-400 hover:bg-orange-300 focus:bg-orange-500 '} p-2 text-lg  font-semibold rounded my-2 border  `}>
                        Signup
                    </button>
                    <div className="w-full flex justify-between items-center">
                        <Link href={'/login'}>
                            <div className="bg-orange-300 cursor-pointer p-2 text-lg hover:text-orange-400 font-semibold text-white rounded my-2 border border-orange-400 hover:bg-transparent">
                                Login
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

export default Signup