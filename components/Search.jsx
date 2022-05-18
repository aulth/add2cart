import React from 'react'
import {BsSearch} from 'react-icons/bs'
import {BiMicrophone} from 'react-icons/bi'
const Search = () => {
  return (
    <>
    <div className="box-border  w-full md:m-auto p-2 mt-4 mr-2 ml-2 md:mt-4 container">
  <div className="box-border border p-2 w-full border-gray-300 flex items-center justify-center">
        <BsSearch size={'20px'} className='inline cursor-pointer hover:drop-shadow'/>
        <input type="search" className='w-full focus:outline-none pl-2 bg-transparent' placeholder='Search...'/>
        <BiMicrophone size={'20px'} className='inline cursor-pointer hover:drop-shadow '/>
      </div>
  </div>
    </>
  )
}

export default Search