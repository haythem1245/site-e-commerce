import React, { useState, useContext, useRef } from "react";
import logo from "../assets/shopman.png";
import {
  ShoppingCart,
  User,
  Search,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { cartItems } = useCart();
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  // 🕒 Pendant le chargement du user, on affiche une navbar "vide"
  if (loading) {
    return (
      <nav className="bg-gradient-to-r from-white to-gray-200 text-neutral-700 px-6 md:px-20 py-2 shadow relative">
        <div className="flex items-center justify-between">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className="text-sm text-gray-500">Chargement...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-white to-gray-200 text-neutral-700 px-6 md:px-20 py-2 shadow relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </div>
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link to="/products" className="hover:text-blue-600">
            Boutique
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>

        {/* Recherche + Icônes */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-white border rounded-full px-3 py-1 shadow-sm">
            <input
              type="text"
              placeholder="Rechercher..."
              className="outline-none px-2 text-sm w-40"
            />
            <Search className="h-4 w-4 text-gray-600" />
          </div>

          {/* Panier */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
            {cartItems.length > 0 && (
              <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Compte utilisateur */}
          <div
            className="relative hidden md:block"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="font-semibold px-3 py-2 hover:text-blue-600 transition flex items-center gap-2">
              {user ? (
                <img
                  src={user.image}
                  alt="avatar"
                  className="h-8 w-8 rounded-full border"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
              <span>{user ? user.name.split(" ")[0] : "Compte"}</span>
            </button>

            {/* Menu déroulant */}
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 flex flex-col bg-white text-black rounded shadow-lg z-10 min-w-[180px] border border-gray-200">
                {!user ? (
                  <>
                    <Link
                      to="/signin"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <LogIn className="h-4 w-4" /> Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <UserPlus className="h-4 w-4" /> Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4" /> Profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left"
                    >
                      <LogOut className="h-4 w-4" /> Déconnexion
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
