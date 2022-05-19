import React from 'react'
import Head from 'next/head'
const About = () => {
    return (
        <>
        <Head>
            <title>About</title>
            <meta name="description" content={`Information about ${process.env.WEBSITE_NAME}`} />
        </Head>
            <div className="container m-auto box-border mt-5 p-1">
                <h1 className="text-xl font-semibold w-full border border-orange-300 text-orange-400 rounded   mt-2 h-20 flex items-center justify-center">About</h1>
                <p className="text-lg p-2">
                    Welcome to {process.env.WEBSITE_NAME}, your number one source for New/Used Books.
                    We are dedicated to providing you the best of product, with a focus on dependability. customer service.
                    We are working to turn our passion for product into a booming online store. We hope you enjoy our products as much as we enjoy offering them to you. Sincerely,
                </p>
                <br />
                <p className='p-2'>
                    <span className="text-normal">
                    - {process.env.WEBSITE_NAME} Founder 
                    </span>
                    <br />
                    <a  className='text-orange-400' href="https://aulth.github.io/usman">Mohd Usman</a>                    
                </p>
                <p className="text-xl p-2 font-semibold">Add2Cart <br />Sai Buzurg, Sant Kabir Nagar, 272199</p>
            </div>
        </>
    )
}

export default About