import React from 'react'
import ReviewItem from './ReviewItem'

const Review = () => {
  return (
    <>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-10 mx-auto">
    <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Reviews</h1>
    <div className="flex flex-wrap -m-4">
      <ReviewItem/>
      <ReviewItem/>
      <ReviewItem/>
      <ReviewItem/>
      <ReviewItem/>
    </div>
  </div>
</section>

    </>
  )
}

export default Review