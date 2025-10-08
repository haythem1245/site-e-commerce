import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'; 


const Carousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/category/men's clothing");
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchProducts();
  }, []);

  const SamplePrevArrow = ({ className, style, onClick }) => (
    <div onClick={onClick} className={`arrow ${className}`} style={{ zIndex: 3 }}>
      <AiOutlineArrowLeft
        className="arrows"
        style={{
          ...style,
          display: 'block',
          borderRadius: '50px',
          background: '#f53347',
          color: 'white',
          position: 'absolute',
          padding: '2px',
          left: '50px',
        }}
      />
    </div>
  );

  const SampleNextArrow = ({ className, style, onClick }) => (
    <div onClick={onClick} className={`arrow ${className}`}>
      <AiOutlineArrowRight
        className="arrows"
        style={{
          ...style,
          display: 'block',
          borderRadius: '50px',
          background: '#f20018ff',
          color: 'white',
          position: 'absolute',
          padding: '2px',
          right: '50px',
        }}
      />
    </div>
  );

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {products.slice(0, 7).map((product, index) => (
          <div key={index} className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4">
              <div className="md:space-y-6 space-y-3">
                <h3 className="text-red-500 font-semibold font-sans text-sm">
                  Powering Your World with the Best in Electronics
                </h3>
                <h1 className="md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white">
                  {product.title}
                </h1>
                <p className="md:w-[200px] line-clamp-3 text-gray-400 pr-7">{product.description}</p>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Shop Now
                </button>
              </div>
              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-full w-[350px] hover:scale-105 transition-all shadow-2xl shadow-red-400"
                />
              </div>
            </div>
            
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
