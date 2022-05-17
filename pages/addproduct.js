import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'
const Addproduct = () => {
    const [product, setProduct] = useState({ productCode: '', name: '', price: 0, description: '', image: '', category: '', quantity: 1, color: '', size: '', key: '', brand: '' })
    const [isImage, setIsImage] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [addingProduct, setAddingProduct] = useState(false)
    let uploadImage = async (e) => {
        e.preventDefault();
        setImageUploading(true)
        setIsImage(false)
        let formData = new FormData();
        formData.append('image', e.target.files[0])
        let response = await fetch('/api/addproductimage', {
            method: 'POST',
            body: formData
        })
        let data = await response.json();
        if (data.success) {
            setImageUploading(false)
            setIsImage(true)
            setProduct({ ...product, image: data.path })
            toast.success(data.msg, {
                position: 'bottom-left',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            toast.error(data.msg, {
                position: 'bottom-left',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    const handleOnChange = (e) => {
        e.preventDefault()
        if (e.target.name === 'name') {
            setProduct({ ...product, name: e.target.value, productCode: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') })
        } else if (e.target.name === 'image') {
            setProduct({ ...product, image: e.target.value })
            setIsImage(true)
        }
        else {
            setProduct({ ...product, [e.target.name]: e.target.value })
        }
        console.log(product)

    }
    const addProduct = async (e) => {
        e.preventDefault()
        if (!isImage) {
            toast.error("Please upload an image", {
                position: 'bottom-left',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return
        }
        setAddingProduct(true)
        let response = await fetch('/api/addproduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        let data = await response.json();
        console.log(data)
        if (data.success) {
            setAddingProduct(false)
            toast.success(data.msg, {
                position: 'bottom-left',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            // setTimeout(()=>{
            //     window.location.reload()
            // }, 1500)
        } else {
            toast.error(data.msg, {
                position: 'bottom-left',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    return (
        <>
            <ToastContainer />
            <Head>
                <title>Add Product</title>
                <meta name="description" content={`Add Products to ${process.env.WEBSITE_NAME}`} />
            </Head>
            <div className="container m-auto flex flex-col items-center box-border p-2">
                <h2 className="text-2xl font-semibold">Add Product</h2>

                <form className="w-full" onSubmit={addProduct}>
                    <div className="w-full m-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">Product Name* </label>
                        <input className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" name='name' onChange={handleOnChange} id="name" type="text" placeholder="Name" />
                    </div>
                    <div className="w-full m-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="productCode">Product Code* </label>
                        <input className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" value={product.productCode} name='productCode' onChange={handleOnChange} id="productCode" type="text" placeholder="Product Code (product code is the url part of your product)" />
                    </div>
                    <div className="w-full flex flex-col md:flex-row m-1">
                        <div className="w-full md:w-2/6 md:mr-1 mt-1">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="category">Category* </label>
                            <input className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" name='category' onChange={handleOnChange} id="category" type="text" placeholder="Category" />
                        </div>
                        <div className="w-full md:w-2/6 md:ml-1 mt-1">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="price">Price* </label>
                            <input className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" name='price' onChange={handleOnChange} id="price" type="number" placeholder="Price" />
                        </div>
                        <div className="w-full md:w-2/6 md:ml-1 mt-1">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="quantity">Quantity* </label>
                            <input className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" name='quantity' onChange={handleOnChange} id="quantity" type="text" placeholder="Quantity" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row m-1">
                        <div className="w-full md:w-2/6 md:mr-1 mt-1">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="brand">Brand </label>
                            <input className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" name='brand' onChange={handleOnChange} id="brand" type="text" placeholder="Brand" />
                        </div>
                        <div className="w-full md:w-2/6 md:ml-1 mt-1">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="color">Color </label>
                            <input className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" name='color' onChange={handleOnChange} id="color" type="text" placeholder="Color" />
                        </div>
                        <div className="w-full md:w-2/6 md:ml-1 mt-1">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="size">Size </label>
                            <input className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" name='size' onChange={handleOnChange} id="size" type="text" placeholder="Size" />
                        </div>
                    </div>
                    <div className="w-full m-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="productimage">Product Image* </label>
                        <input className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" onChange={uploadImage} id="productimage" type="file" placeholder="Product Image" />
                        {
                            imageUploading && <div className='flex'>
                                <p className='text-sm font-semibold text-gray-800 mt-1'>Uploading Image</p>
                                <img className='w-20' src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="" />
                            </div>
                        }
                        {
                            isImage &&
                            <label className="block text-green-500 text-sm font-semibold mb-1" htmlFor="productimage">Image uploaded successfully</label>
                        }
                    </div>
                    <div className="w-full m-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="image">Or image url </label>
                        <input className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" onChange={handleOnChange} name="image" id="image" type="text" placeholder="Enter image url" />
                    </div>
                    <div className="w-full m-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="description">Description* </label>
                        <textarea className="shadow  border rounded w-full py-2 px-3 text-gray-700 focus:outline-none" name='description' onChange={handleOnChange} id="description" placeholder="Descrition"></textarea>
                    </div>
                    <div className="w-full m-1 flex-wrap flex items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="key">Key* </label>
                        <input className="shadow  border rounded py-2 px-3 text-gray-700 focus:outline-none" id="key" name='key' onChange={handleOnChange} type="text" placeholder="Product add secret key" />
                        {
                            !addingProduct &&
                            <input className="shadow  border rounded py-2 px-3  focus:bg-orange-500 ml-2 text-white cursor-pointer bg-orange-400 " type="submit" value={'Add Product'} placeholder="Product add secret key" />

                        }
                        {
                            addingProduct && <>
                                <span className='text-sm font-semibold text-gray-800 mt-1 ml-3'>Adding </span>
                                <img className='w-20 inline' src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="" />
                            </>
                        }
                    </div>
                </form>

            </div>
        </>
    )
}

export default Addproduct