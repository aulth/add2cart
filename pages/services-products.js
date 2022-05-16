import React from 'react'
import Link from 'next/link'
import {FcTwoSmartphones} from 'react-icons/fc'
import {RiShirtLine} from 'react-icons/ri'
import {AiOutlineTool} from 'react-icons/ai'
import {GoLightBulb} from 'react-icons/go'
import {MdOutlineHealthAndSafety, MdOutlineHeadphones} from 'react-icons/md'
import Head from 'next/head'
const Services = () => {
  return (
    <>
     <Head>
            <title>Services and Products</title>
            <meta name="description" content={`Services and Products on ${process.env.WEBSITE_NAME}`} />
        </Head>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-10 mx-auto">
    <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Services / Products</h1>
      {/* <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p> */}
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
            <FcTwoSmartphones size={'30px'}/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Smartphones</h2>
          <p className="leading-relaxed text-base">Smartphone of various brands/company are available...</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
            <RiShirtLine size={'30px'}/>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">T-shirts</h2>
          <p className="leading-relaxed text-base">T-shirt and shirts are available under 599 INR... </p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
            <AiOutlineTool size={'30px'} />
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Accessories</h2>
          <p className="leading-relaxed text-base">Smartphone , Laptop, Computer Accessories...</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
            <GoLightBulb size={'30px'} />
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Kitchen and Home appiances</h2>
          <p className="leading-relaxed text-base">Useful tools for home and kitchen...</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
            <MdOutlineHealthAndSafety size={'30px'} />
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Healthcare tools</h2>
          <p className="leading-relaxed text-base">Health care devices, Blood pressure measure, thermometer...</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
            <MdOutlineHeadphones size={'30px'} />
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Headphones</h2>
          <p className="leading-relaxed text-base">Headphone are available at very good price...</p>
        </div>
      </div>
    </div>
    <Link href={'/'}>
    <button className="flex mx-auto mt-16 text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg">Continue Shopping</button>
    </Link>
  </div>
</section>

    </>
  )
}

export default Services