import React from 'react'
import FeaturedProducts from '../components/Featured'
import Category from '../components/Category'
import Carousel from '../components/carousel'


const Home = () => {
  return (
    <>
       <Carousel/>
      <Category/>
      <FeaturedProducts/>
   </>
  )
}

export default Home
