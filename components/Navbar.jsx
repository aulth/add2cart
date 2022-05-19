import React, { useContext, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CgCheckO } from 'react-icons/cg'
import { MdOutlineClear } from 'react-icons/md'
import { BiRupee } from 'react-icons/bi'
import { FaRegUserCircle } from 'react-icons/fa'
import Link from "next/link";
import { useRef, useEffect } from "react";
import { useRouter } from 'next/router'
import Cartcontext from "./context/Cartcontext";
import { BsPlusSquare, BsMinusSquare } from 'react-icons/bs'
import { removeCookies } from "cookies-next";
const Navbar = ({ userLoggedIn }) => {
  const { addToCart, removeFromCart, cart, clearCart, subTotal, toggleCart, cartRef, saveCart } = useContext(Cartcontext);
  const [toggleAccount, setToggleAccount] = useState(false)
  const router = useRouter()
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
    // eslint-disable-next-line
  }, [])
  const handleOnLogout = () => {
    localStorage.clear()
    removeCookies('authtoken')
    window.location.reload()
  }
  return (
    <>
      <header className="text-gray-600 body-font shadow sticky top-0 bg-white z-30 ">
        <div className="container mx-auto flex flex-wrap p-1 md:flex-row items-center justify-between ">
          <Link href={"/"}>
            <div className="flex cursor-pointer">
              <img src="/logo.png" alt="logo" className="align-middle" width={"180px"} />
            </div>
          </Link>
          <nav className="md:ml-auto md:mr-auto md:flex flex-wrap items-center text-base justify-center hidden">
            <Link href={"/category/physics"}>
              <a className="mr-5 hover:text-gray-900">Physics</a>
            </Link>
            <Link href={"/category/chemistry"}>
              <a className="mr-5 hover:text-gray-900">Chemistry</a>
            </Link>
            <Link href={"/category/mathematics"}>
              <a className="mr-5 hover:text-gray-900">Math</a>
            </Link>
            <Link href={"/category/javascript"}>
              <a className="mr-5 hover:text-gray-900">Javascrip</a>
            </Link>
          </nav>
          <div className="cursor-pointer flex ">
            {
              !userLoggedIn &&
              <button className="p-2  text-orange-400 "><Link href={'/login'}>Login</Link> / <Link href={'/signup'}>Signup</Link> </button>
            }
            {
              userLoggedIn &&
              <div onMouseOver={() => { setToggleAccount(true) }} onMouseLeave={() => { setToggleAccount(false) }}>
                <FaRegUserCircle size={'30px'} className="mx-2 mt-1" />
                {
                  toggleAccount &&
                  <div className="box-border p-2 absolute top-5 border border-gray-400 bg-white m-auto right-10 rounded">
                    <ul>
                      <Link href={'/account'}><li  className="font-semibold text-gray-500 hover:text-gray-800">Account</li></Link>
                      <Link href={'/orders'}><li  className="font-semibold text-gray-500 hover:text-gray-800">Orders</li></Link>
                      <li onClick={handleOnLogout} className="font-semibold text-gray-500 hover:text-gray-800">Logout</li>
                    </ul>
                  </div>
                }
              </div>
            }
            <AiOutlineShoppingCart onClick={() => { toggleCart(cartRef) }} size={'30px'} className="mt-1" />
          </div>
        </div>
        <div ref={cartRef} className="side-cart z-40 w-full absolute top-0 right-0 md:w-96 transition duration-200  translate-x-full">
          <div className=" box-border md:block flex flex-col items-center p-5 h-screen bg-gray-100 md:p-2  border border-gray-300  md:rounded-bl-xl md:rounded-tl-xl overflow-y-scroll">
            <div style={{ height: '60px' }} className="absolute top-2 right-6 flex jusitfy-center items-center">
              <AiOutlineClose size={'30px'} onClick={() => { toggleCart(cartRef) }} className="m-auto cursor-pointer border border-gray-300 rounded font-normal text-gray-500 hover:text-white hover:bg-gray-300" />
            </div>
            <h2 className="text-orange-400 text-xl font-semibold md:mt-4 mt-10">
              You Cart
            </h2>
            <ol className="list-decimal list-inside text-xl py-2">
              {
                Object.keys(cart).length <= 0 && <p className="text-lg font-semibold mt-2" >Cart is empty</p>
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
                <p className="text-xl text-orange-400 font-normal flex items-center">Subtotal: <BiRupee className="ml-2" /> {subTotal}</p>
              </div>
            }
            <div className="mt-5 flex">
              <Link href={'/checkout'}>
                <button onClick={() => { toggleCart(cartRef) }} disabled={Object.keys(cart).length <= 0} className="box-border border border-gray-700 text-white p-2 bg-gray-700 hover:bg-transparent hover:text-black disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-black disabled:hover:text-black">
                  <CgCheckO className="inline"   /> Checkout
                </button>
              </Link>
              <button disabled={Object.keys(cart).length <= 0} onClick={clearCart} className="box-border p-2 border text-black border-gray-700 mx-2 hover:bg-gray-700 hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-black disabled:hover:text-black">
                <MdOutlineClear className="inline" /> Clear Cart
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
