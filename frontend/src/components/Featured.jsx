
import React from "react";

const products = [
  {
    title: "Elegant White Blouse",
    image: "https://readdy.ai/api/search-image?query=elegant%20white%20blouse%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod4&orientation=portrait",
    price: 49.99,
    rating: 4.5,
    reviews: 42,
    tag: "New",
  },
  {
    title: "Premium Denim Jeans",
    image: "https://readdy.ai/api/search-image?query=premium%20denim%20jeans%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod5&orientation=portrait",
    price: 79.99,
    rating: 5,
    reviews: 128,
    tag: "Best Seller",
  },
  {
    title: "Classic Leather Jacket",
    image: "https://readdy.ai/api/search-image?query=stylish%20leather%20jacket%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20leather%20texture&width=500&height=600&seq=prod6&orientation=portrait",
    price: 199.99,
    rating: 4.5,
    reviews: 76,
  },
  {
    title: "Floral Summer Dress",
    image: "https://readdy.ai/api/search-image?query=elegant%20summer%20dress%20on%20minimal%20light%20background%2C%20professional%20fashion%20photography%2C%20high%20quality%20product%20image%2C%20detailed%20fabric%20texture&width=500&height=600&seq=prod7&orientation=portrait",
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.5,
    reviews: 54,
    tag: "Sale",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <div className="flex space-x-1 px-1 py-1 bg-gray-100 rounded-full">
            <button className="px-4 py-1.5 bg-white text-gray-800 rounded-full shadow-sm text-sm font-medium whitespace-nowrap">
              All
            </button>
            <button className="px-4 py-1.5 text-gray-600 rounded-full text-sm font-medium hover:bg-white hover:shadow-sm transition whitespace-nowrap">
              New Arrivals
            </button>
            <button className="px-4 py-1.5 text-gray-600 rounded-full text-sm font-medium hover:bg-white hover:shadow-sm transition whitespace-nowrap">
              Best Sellers
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                {product.tag && (
                  <span
                    className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded ${
                      product.tag === "New"
                        ? "bg-primary"
                        : product.tag === "Best Seller"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                  >
                    {product.tag}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-80 object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition">
                    <i className="ri-eye-line"></i>
                  </button>
                  <button className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition">
                    <i className="ri-heart-line"></i>
                  </button>
                  <button className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-primary/90 transition">
                    <i className="ri-shopping-bag-line"></i>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
                <div className="flex items-center mb-1">
                  <div className="flex text-amber-400 text-sm">
                    {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                      <i key={i} className="ri-star-fill"></i>
                    ))}
                    {product.rating % 1 !== 0 && <i className="ri-star-half-fill"></i>}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-900 font-medium">${product.price}</p>
                  {product.oldPrice && (
                    <p className="text-gray-500 line-through text-sm ml-2">
                      ${product.oldPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-block py-3 px-8 border border-gray-300 text-gray-800 font-medium rounded-button hover:bg-gray-50 transition-colors whitespace-nowrap">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
