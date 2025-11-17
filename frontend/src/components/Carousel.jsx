import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const { data, fetchAllProducts } = getData();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (data) {
      const featured = data.filter((product) => product.featured);
      setFeaturedProducts(featured);
    }
  }, [data]);

  // 🔥 Arrows modernisées
  const ArrowBtn = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === "left" ? "left-4" : "right-4"
      } bg-white/20 hover:bg-white/30 backdrop-blur-md
      p-3 rounded-full shadow-lg transition-all border border-white/10`}
    >
      {direction === "left" ? (
        <AiOutlineArrowLeft className="text-white" size={22} />
      ) : (
        <AiOutlineArrowRight className="text-white" size={22} />
      )}
    </button>
  );

  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3500,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowBtn direction="right" />,
    prevArrow: <ArrowBtn direction="left" />,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {featuredProducts.map((product, index) => (
          <div key={index}>
            <div className="bg-gradient-to-r from-[#1f1c2c] via-[#2a2349] to-[#1a1a2e]">
              <div className="flex flex-col md:flex-row gap-16 justify-center min-h-[620px] items-center px-6 py-20">

                {/* Text */}
                <div className="space-y-6 md:max-w-lg text-center md:text-left">
                  <span className="text-red-400 font-medium uppercase tracking-wide">
                    Produit en vedette
                  </span>

                  <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                    {product.name}
                  </h1>

                  <p className="text-gray-300 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  <button
                    onClick={() => navigate("/Products")}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-red-500/40"
                  >
                    Shop Now
                  </button>
                </div>

                {/* Image */}
                <div>
                  <img
                    src={product.images}
                    alt={product.name}
                    className="rounded-2xl w-[330px] md:w-[420px] shadow-2xl shadow-black/40 hover:scale-105 transition-transform duration-300"
                  />
                </div>

              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
