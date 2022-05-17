import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import Link from 'next/link'
import { BsKey } from 'react-icons/bs'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { RiLockPasswordLine } from 'react-icons/ri'
import {useRouter} from 'next/router'
import Head from 'next/head'
const Forgot = () => {
    const [user, setUser] = useState({ email: '', otp: '', password: '' })
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const router = useRouter()
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
    const sendOtp = async (e) => {
        e.preventDefault()
        let response1 = await fetch('/api/checkuser', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: user.email })
        })
        let data1 = await response1.json()
        if(data1.success){
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
                toast.success(data.msg, toastOption)
                setOtpSent(true)
            } else {
                toast.error(data.msg, toastOption)
            }
        }else{
            toast.error(data1.msg, toastOption)
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
        if (data.success) {
            setOtp(data.otp)
            toast.success(data.message, toastOption)
        } else {
            toast.error(data.message, toastOption)
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
    const createNewPassword = async (e)=>{
        e.preventDefault();
        
        let response = await fetch('/api/createpassword', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({email:user.email, password:user.password})
        })
        let data = await response.json()
        if(data.success){
            toast.success(data.message, toastOption)
            router.push('/login')
        }else{
            toast.error(data.msg, toastOption)
        }
    }
    return (
        <>
            <ToastContainer />
            <Head>
            <title>Forgot Password</title>
            <meta name="description" content={`Reset your password on ${process.env.WEBSITE_NAME}/forgot-password`} />
        </Head>
            <div className="container m-auto flex justify-center box-border p-2">
                <form className='flex w-full md:w-96 flex-col items-center'>
                    <img src="/logo.png" width={'140px'} className="pt-2" alt="logo" />
                    <h2 className="text-2xl font-bold pt-2 pb-4">
                        Reset your account password
                    </h2>
                    <div className="flex w-full border border-gray-200 my-2">
                        <AiOutlineUser size={'40px'} className="p-2 bg-gray-200" />
                        <input type="text" className='p-2 w-full focus:outline-none' name='email' onChange={handleOnChange} placeholder='Enter your email ' />
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
                                <input type="email" name='otp' id='userotp' onChange={handleOnChange} className='p-2 w-full focus:outline-none' placeholder='Enter otp sent to your mail' required />
                            </div>
                            <div className="flex flex-col w-full md:flex-row">
                                <button className='w-full md:1/2 mr-1 text-center p-1 border text-gray-500 border-gray-300 rounded  cursor-pointer hover:bg-gray-300' onClick={verifyOtp}>Verify OTP</button>
                                <button className='w-full md:1/2 md:ml-1 text-center p-1 border text-gray-500 border-gray-300 rounded  cursor-pointer hover:bg-gray-300' onClick={resendOtp}>Resend OTP</button>
                            </div>
                        </>
                    }
                    {
                        isEmailVerified &&
                        <>
                            <label className='text-left text-sm font-bold w-full mt-2'>Create a new password</label>
                            <div className="flex w-full border border-gray-200 my-2">
                                <RiLockPasswordLine size={'40px'} className="p-2 bg-gray-200" />
                                <input type="password" name='password' onChange={handleOnChange} className='p-2 w-full focus:outline-none' placeholder='Create a new password' required />
                            </div>
                            <button disabled={!isEmailVerified} onClick={createNewPassword} className={`w-full text-center p-2 font-semibold rounded ${!isEmailVerified?'bg-gray-300 cursor-not-allowed':'bg-orange-400 text-white'} `}>Create new password</button>
                        </>
                    }
                    <div className="w-full flex justify-between items-center">
                        <Link href={'/login'}>
                            <div className="text-center w-full cursor-pointer p-2 text-lg hover:bg-orange-300 font-semibold hover:text-white text-orange-400 rounded my-2 border border-orange-400 ">
                                Login
                            </div>
                        </Link>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Forgot