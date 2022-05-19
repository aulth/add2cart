import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineUser, AiOutlineMail, AiOutlinePushpin } from 'react-icons/ai'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { BsTelephone } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { GrLocationPin } from 'react-icons/gr'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { MdOutlinePayment } from 'react-icons/md'
import { MdOutlineClear } from 'react-icons/md'
import { BiRupee } from 'react-icons/bi'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cartcontext from '../components/context/Cartcontext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Script from 'next/script'
import { getCookie } from 'cookies-next';
const Checkout = () => {
    const router = useRouter()
    const [amount, setAmount] = useState(0)
    const [order, setOrder] = useState({payment:false, payment_id:'', order_id:'', signature:''})
    const [address, setAddress] = useState({name:'',email:'', phone:'', address:'', city:'', state:'', pincode:''})
    const { addToCart, removeFromCart, cart, clearCart, subTotal, saveCart } = useContext(Cartcontext)
    let description='';
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
    const makePayment = async ()=>{
        const data = await fetch('/api/razorpay', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({amount:amount, authtoken:getCookie('authtoken')})
        }).then(res=>res.json())
        if(data.success){

            for(let key in cart){
                description += `${cart[key].name.slice(0,12)}..X${cart[key].quantity}`
            }
            var options = {
                key:process.env.RAZOR_KEY_ID,
                name:'Add2Cart',
                currency:data.currency,
                amount:data.amount,
                order_id:data.id,
                description : description,
                handler: function (response){
                    placeOrder(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
                    toast.success('Payment Successful',toastOption)
                    toast.success('Order Placed Successfully',toastOption)
                    setTimeout(() => {
                        router.push(`/order/${response.razorpay_order_id}`)
                    }, 1000);
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);
                },
                prefill:{
                    name:localStorage.getItem('add2cart_name'),
                    email:localStorage.getItem('add2cart_email'),
                    contact:localStorage.getItem('add2cart_contact')
                }
            }
            var rzp1 = new window.Razorpay(options);
            rzp1.open()
            rzp1.on('payment.failed', function (response){
                toast.error('Payment Failed',toastOption)
                toast.error(response.error.reason,toastOption)
                toast.error(response.error.description,toastOption)
                // alert(response.error.code);
                // alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
        });
        }else{
            toast.error(data.msg,toastOption)
        }
    }
    const placeOrder = async (payment_id, order_id, signature)=>{
        const response = await fetch('/api/order', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({products:cart, amount:amount, address:address, order:{payment:true, payment_id:payment_id, order_id:order_id, signature:signature}})
        }).then(res=>res.json())
    }

    const fetchCart = async (cart)=>{
        const response = await fetch('/api/calculateamount', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({cart:cart})
        }).then(res=>res.json())
        if(response.success){
            setAmount(response.amount)
            
        }
    }
    const handleOnChange = (e)=>{
        e.preventDefault();
        setAddress({...address, [e.target.name]:e.target.value})
    }
    useEffect(() => {
        try {
            let newCart = JSON.parse(localStorage.getItem('add2cart'))
            if (newCart) {
                saveCart(newCart);
            }
            fetchCart(newCart)
        } catch (error) {
            console.log(error)
            localStorage.clear()
        }
        //eslint-disable-next-line
    }, [subTotal])
    return (
        <>
        <ToastContainer/>
            <Head>
            <title>Checkout</title>
            <meta name="description" content={`Checkout your products`} />
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <form onSubmit={(e)=>{e.preventDefault();makePayment()}} className="container m-auto box-border md:p-5 p-2">
                <h2 className="text-xl font-semibold">
                    Customer Details
                </h2>
                <div className="w-full flex flex-wrap flex-col md:flex-row box-border my-5 ">
                    <div className='w-full md:w-1/2  box-border p-2'>
                        <label htmlFor="name" className='mt-2'> Name</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <AiOutlineUser size={'40px'} className="bg-gray-200 p-2" />
                            <input type="text" onChange={handleOnChange} placeholder='Enter your name' name='name' className='box-border p-2 w-full focus:outline-none' required />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 box-border p-2'>
                        <label htmlFor="email" className='mt-5'> Email</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <AiOutlineMail size={'40px'} className="bg-gray-200 p-2" />
                            <input type="email"  onChange={handleOnChange}  placeholder='Enter your email' name='email' className='box-border p-2 w-full focus:outline-none' required />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 box-border p-2'>
                        <label htmlFor="phone" className='mt-5'> Phone</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <BsTelephone size={'40px'} className="bg-gray-200 p-2" />
                            <input type="tel"  onChange={handleOnChange}  placeholder='Enter your number' name='phone' className='box-border p-2 w-full focus:outline-none' required />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 box-border p-2'>
                        <label htmlFor="state" className='mt-5'> State</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <AiOutlinePushpin size={'40px'} className="bg-gray-200 p-2" />
                            <input type="text"  onChange={handleOnChange}  placeholder='State' name='state' className='box-border p-2 w-full focus:outline-none'  required/>
                        </div>
                    </div>
                    <div className='w-full md:w-3/4 box-border p-2'>
                        <label htmlFor="address" className='mt-5'> Address</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <GoLocation size={'40px'} className="bg-gray-200 p-2" />
                            <input type="text"  onChange={handleOnChange}  placeholder='Address' name='address' className='box-border p-2 w-full focus:outline-none' required/>
                        </div>
                    </div>
                    <div className='w-full md:w-1/4 box-border p-2'>
                        <label htmlFor="pincode" className='mt-5'>Pincode</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <GrLocationPin size={'40px'} className="bg-gray-200 p-2" />
                            <input type="text"  onChange={handleOnChange}  placeholder='Pincode' name='pincode' className='box-border p-2 w-full focus:outline-none' required />
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-semibold">
                    Cart Items
                </h2>
                <div className="w-full flex flex-col box-border my-5 ">
                    <ol className="list-decimal list-inside text-xl py-2">
                        {
                            Object.keys(cart).length <= 0 && <p className="text-xl mt-2" >Cart is empty</p>
                        }
                        {
                            Object.keys(cart).map((key, index) => {
                                return <div className="flex justify-between items-center border border-gray-200 rounded box-border p-1 mt-1" key={key}>
                                <div className="w-16 h-16 box-border rounded-sm border border-gray-200 p-2">
                                  <img src={cart[key].image} className="w-full object-cover object-top" alt="" />
                                </div>
                                <div className="w-full text-sm box-border pl-1 pr-1">
                                  <Link href={`/product/${cart[key].productCode}`}>
                                  <h3 className="font-bold hover:text-orange-400 cursor-pointer">
                                    {cart[key].name}
                                  </h3>
                                  </Link>
                                  <p className="text-sm font-semibold flex items-center">
                                    <BiRupee className="mt-1" /> {cart[key].price}
                                  </p>
                                  <div className="w-full flex items-center">
                                    <AiOutlinePlus onClick={() => { addToCart(key, 1, cart[key].price, cart[key].name, cart[key].image) }} className="mr-1 cursor-pointer border border-gray-300 hover:text-white hover:bg-gray-300" /> {cart[key].quantity} <AiOutlineMinus onClick={() => { removeFromCart(key) }} className="ml-1 border border-gray-300 font-light cursor-pointer hover:text-white hover:bg-gray-300" />
                                  </div>
                                </div>
                              </div>
                            })
                        }
                    </ol>
                    {
                        Object.keys(cart).length > 0 &&
                        <div className="flex justify-between items-center box-border pt-8 pb-2">
                            <p className="text-xl text-orange-400 flex items-center">Subtotal: <BiRupee className="ml-2" /> {amount}</p>
                        </div>
                    }
                    <div className="mt-5 flex">
                        {/* <Link href={'/order'}> */}
                            <button type='submit'  disabled={Object.keys(cart).length <= 0} className="box-border border border-gray-700 text-white p-2 bg-gray-700 hover:bg-transparent hover:text-black disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-black disabled:hover:text-black">
                                <MdOutlinePayment className="inline" /> Pay and continue
                            </button>
                        {/* </Link> */}
                        <button disabled={Object.keys(cart).length <= 0} onClick={clearCart} className="box-border p-2 border text-black border-gray-700 mx-2 hover:bg-gray-700 hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-black disabled:hover:text-black">
                            <MdOutlineClear className="inline" /> Clear Cart
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Checkout