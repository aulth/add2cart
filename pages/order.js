import React from 'react'
import Head from 'next/head'
const order = () => {
  return (
    <>
     <Head>
            <title>Order</title>
            <meta name="description" content={`You orders ${process.env.WEBSITE_NAME}`} />
        </Head>
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">add2cart</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order id #12343</h1>
        <div className="flex mb-4 border-b-2 border-orange-500">
          <p className="flex-grow text-orange-500  py-2 text-lg px-1">Product</p>
          <p className="flex-grow py-2 text-lg px-1 text-right">Quantity</p>
        </div>
        <div className="flex border-b border-gray-200 py-2">
          <span className="text-gray-500">Redmi Note 9 </span>
          <span className="ml-auto text-gray-900">1</span>
        </div>
        <div className="flex border-b mb-3 border-gray-200 py-2">
          <span className="text-gray-500">Iphone 14</span>
          <span className="ml-auto text-gray-900">1</span>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
          <button className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Track order</button>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
    </div>
  </div>
</section>

    </>
  )
}

export default order