import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { BiRupee } from 'react-icons/bi'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
const Order = ({products}) => {
  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content={`You orders ${process.env.WEBSITE_NAME}`} />
      </Head>
      <div className="container m-auto box-border p-2 flex flex-col">
        {
          products && 
        <ul>
          {
            products.map((item, index)=>{
              return <div key={index} className="w-full border mt-1 border-gray-300 box-border p-2">
              <h3 className="font-semibold">Order id: {item.orderid}</h3>
              {
                Object.keys(item.products[0]).map((key)=>{
                  return <div key={key} className="flex justify-between items-center border border-gray-200 rounded box-border p-1 mt-1">
                  <div className="w-16 h-16 box-border rounded-sm border border-gray-200 ">
                    <img src={item.products[0][key].image} className="w-full h-full object-cover object-top" alt="" />
                  </div>
                  <div className="w-full text-sm box-border pl-1 pr-1 flex flex-col justify-between">
                    <div className="flex justify-between pb-1">
                    <Link href={`/product/${item.products[0][key].productCode}`}>
                    <h3 className="font-bold cursor-pointer hover:text-orange-400">
                      {item.products[0][key].name}
                    </h3>
                    </Link>
                    <h3 className="font-semibold">
                      Qty : {item.products[0][key].quantity}
                    </h3>
                    </div>
                    <p className="text-sm font-semibold flex items-center">
                      <BiRupee className="mt-1" /> {item.products[0][key].price}
                    </p>
                  </div>
                </div>
                })
              }
              
            </div>
            })
          }
          
        </ul>
}
{
  !products.length>0 && <h1>No orders</h1>
}
      </div>

    </>
  )
}


export async function getServerSideProps({req, res}){
  try{
    let url = `${process.env.WEBSITE}/api/getorders`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ authtoken: getCookie('authtoken', {req, res}) })
    }).then(response => response.json())
    let products = [];
    for (let i = 0; i < response.orders.length; i++) {
      products.push(response.orders[i])
    }
    return {
      props: {
        products
      }
    }
  }catch(error){
    console.log(error)
    return{
      props:{
        products: []
      }
    }
  }
}

// export const getServerSideProps = ({ req, res }) => {
//   console.log(getCookie('authtoken', { req, res}));
// return { props: {}};
// }

export default Order