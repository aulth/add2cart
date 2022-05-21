import React, { useState, useEffect } from 'react'
import mongoose from 'mongoose'
import Order from "../../models/Order";
import { BiRupee } from 'react-icons/bi'
import {AiOutlineCheck} from 'react-icons/ai'
import {GiSandsOfTime} from 'react-icons/gi'
import Head from 'next/head'
const Orderhandler = ({ order, products, orderid }) => {
    useEffect(() => {
        console.log(products)
    }, [])

    return (
        <>
            <Head>
                <title>Order</title>
                <meta name="description" content={`You orders ${process.env.WEBSITE_NAME[0].toUpperCase() + process.env.WEBSITE_NAME.slice(1)}`} />
            </Head>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {order &&
                        <div className="lg:w-4/5 mx-auto flex flex-col-reverse md:flex-row">
                            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 mt-2 lg:mb-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">Add2cart</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order id: {order.orderid}</h1>
                                <div className="flex mb-4 border-b-2 border-orange-500">
                                    <p className="flex-grow text-orange-500  py-2 text-lg px-1">Product</p>
                                    <p className="flex-grow py-2 text-lg px-1 text-right">Quantity</p>
                                </div>
                                {
                                    Object.keys(products).map((key) => {
                                        return <div key={key} className="flex border-b border-gray-200 py-2">
                                            <span className="text-gray-500">{products[key].name} </span>
                                            <span className="ml-auto text-gray-900">{products[key].quantity}</span>
                                        </div>
                                    })
                                }
                                <div className="flex mt-2">
                                    <span className="title-font font-medium text-2xl text-gray-900 flex items-center"><BiRupee className='mt-1' />  {order.amount}</span>
                                    <button className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Track order</button>
                                </div>
                            </div>
                            {/* <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded  md:ml-4" src="https://c.tenor.com/xVfFIHxAzW4AAAAC/success.gif" /> */}
                            <div  className="lg:w-1/2 mb-20 md:mb-0 w-full lg:h-auto h-64 object-cover object-center rounded  md:ml-4" >
                               <div className="w-full border border-gray-400 flex  p-2">
                                    <div className="rounded-full w-12 h-12 bg-orange-200 flex justify-center items-center"><AiOutlineCheck className='text-orange-400' size={'30px'}/></div>
                                    <div className="w-full p-2 text-xl flex items-center font-semibold text-black">Order Placed</div>
                               </div>
                               <div className="w-full border border-gray-400 flex  p-2">
                                    <div className="rounded-full w-12 h-12 bg-orange-200 flex justify-center items-center"><GiSandsOfTime className='text-orange-400' size={'30px'}/></div>
                                    <div className="w-full p-2 text-xl flex items-center ">Order Confirmed</div>
                               </div>
                               <div className="w-full border border-gray-400 flex  p-2">
                                    <div className="rounded-full w-12 h-12 bg-orange-200 flex justify-center items-center"><GiSandsOfTime className='text-orange-400' size={'30px'}/></div>
                                    <div className="w-full p-2 text-xl flex items-center">Shipped</div>
                               </div>
                               <div className="w-full border border-gray-400 flex  p-2">
                                    <div className="rounded-full w-12 h-12 bg-orange-200 flex justify-center items-center"><GiSandsOfTime className='text-orange-400' size={'30px'}/></div>
                                    <div className="w-full p-2 text-xl flex items-center">Out For Delivery</div>
                               </div>
                               <div className="w-full border border-gray-400 flex  p-2">
                                    <div className="rounded-full w-12 h-12 bg-orange-200 flex justify-center items-center"><GiSandsOfTime className='text-orange-400' size={'30px'}/></div>
                                    <div className="w-full p-2 text-xl flex items-center">Delivered</div>
                               </div>
                                </div>
                        </div>
                    }
                    {
                        !order &&
                        <div className="container m-auto box-border flex flex-col items-center">
                            No Order found for this id {orderid}
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const { orderid } = context.query;
    let myOrder, products;
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    myOrder = await Order.findOne({ orderid: orderid })
    if(myOrder){
        products = myOrder.products[0]
    }
    return {
        props: {
            orderid: orderid,
            order: JSON.parse(JSON.stringify(myOrder)),
            products: products?JSON.parse(JSON.stringify(products)):null
        }
    }
}

export default Orderhandler