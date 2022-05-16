import React from 'react'
import mongoose from 'mongoose'
import Product from '../../models/Product'
import Productcomponent from '../../components/Product'
// import ErrorPage from 'next/error'
import Head from 'next/head'
const handler = ({products, category}) => {
  return (
    <>
     <Head>
            <title>{category}</title>
            <meta name="description" content={`Products in ${category}`} />
        </Head>
    {
        products && 
        <Productcomponent products={products}/>
    }
    {
        products.length<=0 && 
        <>
            <div className="container m-auto flex-justify-center box-border p-5">
                <h2 className="text-2xl text-center">
                    No Products Found
                </h2>
            </div>
        </>
    }
    </>
  )
}

export async function getServerSideProps(context){
    let {category} = context.query;
    let categ = category.toLowerCase();
    category = new RegExp(category, 'i')
    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.MONGOURI);
    }
    let products = await Product.find({category:category});
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
            category: categ[0].toUpperCase() + categ.slice(1)
        }
    }
}

export default handler