import React, { useContext } from 'react'
import Cartcontext from './context/Cartcontext'
import { BsCartPlus } from 'react-icons/bs'
import { BiRupee } from 'react-icons/bi'
import Link from 'next/link'
import { ToastContainer, toast, Flip } from 'react-toastify';

const ProductItem = ({ product }) => {
  const { addToCart, cartRef, toggleCart } = useContext(Cartcontext);
  const showToast = ()=>{
    toast.success('Item added to cart!', {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Flip
      });
  }
  return (
    <>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full relative product-card border border-white rounded-lg">
        <BsCartPlus onClick={() => { addToCart(product.productCode, 1, product.price, product.name, product.image); if(cartRef.current.classList.contains('translate-x-full')){toggleCart(cartRef)}; showToast()}} className='absolute top-4 left-4 z-10 bg-orange-400 text-white p-1 cursor-pointer hover:bg-orange-300 rounded-br-xl' size={'40px'} />
        <Link href={`/product/${product.productCode}`}>
          <a>
        <div className="block relative h-48 rounded overflow-hidden">
          <img alt={product.name} className="object-cover object-center w-full block" height={'286px'} src={product.image} />
        </div>
          <div className="mt-4 cursor-pointer">
            <Link href={`/category/${product.category}`}>
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
            </Link>
            <h2 className="text-gray-900 title-font text-lg font-semibold">{product.name.slice(0,26)}  {product.name.length>=26?'..':''}</h2>
            <p className="mt-1 flex items-center"><BiRupee size={'20px'} className="mt-1" /> {product.price}</p>
          </div>
          </a>
        </Link>
      </div>
    </>
  )
}

export default ProductItem