// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About */}
          <div className="lg:col-span-2">
         <a href="#" className="inline-block mb-4">
  <img
    src="./assets/Shopman.png"
    alt="Logo ShopEase"
    className="h-12 w-auto"
  />
</a>


            <p className="text-gray-600 mb-6 max-w-md">
              We offer premium quality clothing and accessories for men and women. Our mission is to provide sustainable fashion that lasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <i className="ri-twitter-x-line"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <i className="ri-pinterest-line"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {["Women","Men","Accessories","Footwear","New Arrivals","Sale"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Help</h3>
            <ul className="space-y-3">
              {["Customer Service","My Account","Find a Store","Shipping & Returns","FAQs"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: About */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">About</h3>
            <ul className="space-y-3">
              {["About Us","Sustainability","Careers","Press","Contact Us"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; 2025 ShopEase. All rights reserved.</p>

            <div className="flex flex-wrap justify-center gap-4">
              {["Privacy Policy","Terms of Service","Cookies Settings"].map((item, index) => (
                <a key={index} href="#" className="text-gray-500 text-sm hover:text-gray-700">{item}</a>
              ))}
            </div>

            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <i className="ri-visa-fill text-2xl text-gray-600"></i>
              <i className="ri-mastercard-fill text-2xl text-gray-600"></i>
              <i className="ri-paypal-fill text-2xl text-gray-600"></i>
              <i className="ri-apple-fill text-2xl text-gray-600"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
