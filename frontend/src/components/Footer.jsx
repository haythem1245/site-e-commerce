import React from "react";
import logo from "../assets/Shopman.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const sections = {
    Shop: ["Women", "Men", "Accessories", "Footwear", "New Arrivals", "Sale"],
    Help: ["Customer Service", "My Account", "Find a Store", "Shipping & Returns", "FAQs"],
    About: ["About Us", "Sustainability", "Careers", "Press", "Contact Us"],
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo + description */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="ShopEase logo" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              We offer premium quality clothing and accessories for men and women.
            </p>
            <div className="flex space-x-4">
              {["facebook-fill","instagram-line","twitter-x-line","pinterest-line"].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                  <i className={`ri-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Autres colonnes */}
          {Object.entries(sections).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-gray-900 font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((item, i) => (
                  <li key={i}>
                    <Link to="#" className="text-gray-600 hover:text-primary transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bas du footer */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; 2025 ShopEase. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Privacy Policy","Terms of Service","Cookies Settings"].map((item, i) => (
                <Link key={i} to="#" className="text-gray-500 text-sm hover:text-gray-700">{item}</Link>
              ))}
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              {["visa-fill","mastercard-fill","paypal-fill","apple-fill"].map((icon, i) => (
                <i key={i} className={`ri-${icon} text-2xl text-gray-600`}></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
