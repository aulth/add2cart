import React, { useContext, useEffect } from 'react'
import { AiOutlineUser, AiOutlineMail, AiOutlinePushpin } from 'react-icons/ai'
import { BsTelephone } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { GrLocationPin } from 'react-icons/gr'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { MdOutlinePayment } from 'react-icons/md'
import { MdOutlineClear } from 'react-icons/md'
import { BiRupee } from 'react-icons/bi'
import Cartcontext from '../components/context/Cartcontext'
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'

const Checkout = () => {
    const { addToCart, removeFromCart, cart, clearCart, subTotal, saveCart } = useContext(Cartcontext)
    
    const initiatePayment =async  () => {
        console.log('initiae')
        let orderId = Math.floor(Math.random() * 100000)
        let data = {cart, subTotal, orderId, email:'usman@gmail.com'}
        let response = await fetch('/api/pretransaction', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let data1 = await response.json()
        console.log(data1)
        let txnToken;
        var config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
                "orderId": orderId, /* update order id */
                "token": txnToken, /* update token value */
                "tokenType": "TXN_TOKEN",
                "amount": subTotal /* update amount */
            },
            "handler": {
                "notifyMerchant": function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            // after successfully updating configuration, invoke JS Checkout
            window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error) {
            console.log("error => ", error);
        });
    }

    useEffect(() => {
        try {
            let newCart = JSON.parse(localStorage.getItem('add2cart'))
            if (newCart) {
                saveCart(newCart);
            }
        } catch (error) {
            console.log(error)
            localStorage.clear()
        }
        //eslint-disable-next-line
    }, [])
    return (
        <>
            <Head>
            <title>Checkout</title>
            <meta name="description" content={`Checkout your products`} />
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
                {/* <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.HOST}/merchantpgpui/checkoutjs/merchants/${process.env.MID}.js`} onload="onScriptLoad();" /> */}
            <div className="container m-auto box-border md:p-5 p-2">
                <h2 className="text-xl font-semibold">
                    Customer Details
                </h2>
                <div className="w-full flex flex-wrap flex-col md:flex-row box-border my-5 ">
                    <div className='w-full md:w-1/2  box-border p-2'>
                        <label htmlFor="name" className='mt-2'> Name</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <AiOutlineUser size={'40px'} className="bg-gray-200 p-2" />
                            <input type="text" placeholder='Enter your name' name='name' className='box-border p-2 w-full focus:outline-none' />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 box-border p-2'>
                        <label htmlFor="email" className='mt-5'> Email</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <AiOutlineMail size={'40px'} className="bg-gray-200 p-2" />
                            <input type="email" placeholder='Enter your email' name='email' className='box-border p-2 w-full focus:outline-none' />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 box-border p-2'>
                        <label htmlFor="phone" className='mt-5'> Phone</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <BsTelephone size={'40px'} className="bg-gray-200 p-2" />
                            <input type="tel" placeholder='Enter your number' name='phone' className='box-border p-2 w-full focus:outline-none' />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 box-border p-2'>
                        <label htmlFor="state" className='mt-5'> State</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <AiOutlinePushpin size={'40px'} className="bg-gray-200 p-2" />
                            <input type="text" placeholder='State' name='state' className='box-border p-2 w-full focus:outline-none' />
                        </div>
                    </div>
                    <div className='w-full md:w-3/4 box-border p-2'>
                        <label htmlFor="address" className='mt-5'> Address</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <GoLocation size={'40px'} className="bg-gray-200 p-2" />
                            <input type="text" placeholder='Address' name='address' className='box-border p-2 w-full focus:outline-none' />
                        </div>
                    </div>
                    <div className='w-full md:w-1/4 box-border p-2'>
                        <label htmlFor="pincode" className='mt-5'>Pincode</label>
                        <div className="flex items-center w-full border border-gray-300">
                            <GrLocationPin size={'40px'} className="bg-gray-200 p-2" />
                            <input type="text" placeholder='Pincode' name='pincode' className='box-border p-2 w-full focus:outline-none' />
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
                                return <div className="flex justify-between items-center" key={key}>
                                    <div className='flex justify-between'>
                                        {index + 1}. {cart[key].name} - <p className="text-lg flex items-center"><BiRupee />{cart[key].price}</p>
                                    </div>
                                    <div className="mx-2 flex items-center">
                                        <AiOutlinePlusCircle onClick={() => { addToCart(key, 1, cart[key].price, cart[key].name) }} className="mx-1 cursor-pointer" /> {cart[key].quantity} <AiOutlineMinusCircle onClick={() => { removeFromCart(key) }} className="mx-1 cursor-pointer" />
                                    </div>
                                </div>
                            })
                        }
                    </ol>
                    {
                        Object.keys(cart).length > 0 &&
                        <div className="flex justify-between items-center box-border pt-8 pb-2">
                            <p className="text-xl text-orange-400 flex items-center">Subtotal: <BiRupee className="ml-2" /> {subTotal}</p>
                        </div>
                    }
                    <div className="mt-5 flex">
                        {/* <Link href={'/order'}> */}
                            <button disabled={Object.keys(cart).length <= 0} onClick={initiatePayment} className="box-border border border-gray-700 text-white p-2 bg-gray-700 hover:bg-transparent hover:text-black disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-black disabled:hover:text-black">
                                <MdOutlinePayment className="inline" /> Pay and continue
                            </button>
                        {/* </Link> */}
                        <button disabled={Object.keys(cart).length <= 0} onClick={clearCart} className="box-border p-2 border text-black border-gray-700 mx-2 hover:bg-gray-700 hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-black disabled:hover:text-black">
                            <MdOutlineClear className="inline" /> Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout