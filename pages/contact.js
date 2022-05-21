import React, {useState} from 'react'
import {BiUser} from 'react-icons/bi'
import {AiOutlineMail} from 'react-icons/ai'
import {BsTelephone} from 'react-icons/bs'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
const Contact = () => {
    const [contact, setContact] = useState({name:'', email:'', phone:'', message:''})
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
    const handleOnChange = (e)=>{
        setContact({...contact, [e.target.name]:e.target.value})
    }
    const handleOnContact = async(e)=>{
        e.preventDefault()
        const response = await fetch('/api/contact',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(contact)
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            toast.success(data.msg, toastOption)
        }else{
            toast.error(data.msg, toastOption)
        }
    }
  return (
    <>
    <ToastContainer/>
    <Head>
            <title>Contact</title>
            <meta name="description" content={`Contact to ${process.env.WEBSITE_NAME}`} />
        </Head>
    <div className="container m-auto p-2 py-10">
        <form onSubmit={handleOnContact}>
            <h2 className="text-xl font-semibold">
                Contact Us
            </h2>
            <div className="w-ful flex  shadow rounded items-center mt-3">
                <BiUser className='p-1 bg-gray-100' size={'40px'}/>
                <input type="text" name='name' onChange={handleOnChange} placeholder='Customer Name' className='w-full p-2 focus:outline-none' required/>
            </div>
            <div className="w-ful flex  shadow rounded items-center mt-3">
                <AiOutlineMail className='p-1 bg-gray-100' size={'40px'}/>
                <input type="email" name='email' onChange={handleOnChange}  placeholder='Email' className='w-full p-2 focus:outline-none' required/>
            </div>
            <div className="w-ful flex  shadow rounded items-center mt-3">
                <BsTelephone className='p-1 bg-gray-100' size={'40px'}/>
                <input type="text" name='phone' onChange={handleOnChange}  placeholder='Phone' className='w-full p-2 focus:outline-none' required/>
            </div>
            <div className="w-ful flex  shadow rounded items-center mt-3">
                <textarea name='message' placeholder='Query'  onChange={handleOnChange}  className='w-full p-2 focus:outline-none' required></textarea>
            </div>
            <input type='submit' className="bg-orange-300 text-white p-2 mt-3 hover:bg-orange-400 cursor-pointer" value={'Contact'}/>
        </form>

        <h2 className="text-lg font-semibold mt-5">
            Contact Details
        </h2>
        <div>
            Sai Buzurg
            <br />
            Sant Kabir Nagar, Uttar Pradesh 272199
            <br />
        </div>
        <a href="tel:9839872992" className='block'>9839872992</a>
        <a href={`mailto:mohdusman.you@gmail.com`}>mohdusman.you@gmail.com</a>
        {/* <a href={`mailto:${process.env.WEBSITE_EMAIL}`}>{process.env.WEBSITE_EMAIL}</a> */}
    </div>
    </>
  )
}

export default Contact