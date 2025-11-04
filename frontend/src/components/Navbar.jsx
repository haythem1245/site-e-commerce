import React, { useState, useRef } from "react";
import logo from "../assets/Shopman.png";
import {
  ShoppingCart,
  User,
  Search,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthProvider";
import ChercheProduit from "./cherchProduit";

const Navbar = () => {
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { cartItems } = useCart();
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // --- Handle classic search (with redirect)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  // --- Handle logout
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  // --- Handle user dropdown (desktop)
  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsUserMenuOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 200);
  };

  // --- Loading state
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
        {/* 🌀 Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* 🧭 Desktop Menu */}
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

        {/* 🔍 Search + Icons */}
        <div className="flex items-center space-x-4">
          {/* 🔎 Search Button (opens the ChercheProduit bar) */}
          <button
            onClick={() => setShowSearchBar((prev) => !prev)}
            className="hidden md:block p-2 hover:text-blue-600"
            title="Rechercher un produit"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* 🛒 Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
            {cartItems.length > 0 && (
              <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* 👤 User (Desktop Dropdown) */}
          <div
            className="relative hidden md:block"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="font-semibold px-3 py-2 hover:text-blue-600 transition flex items-center gap-2">
              {user ? (
                <img
                  src={user?.image || "/default-avatar.png"}
                  alt="avatar"
                  className="h-8 w-8 rounded-full border"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </button>

            {isUserMenuOpen && (
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

          {/* 📱 Mobile Icons */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-1 hover:text-blue-600"
            >
              <Search className="h-6 w-6" />
            </button>

            <Link to={user ? "/profile" : "/signin"} className="p-1">
              {user ? (
                <img
                  src={user?.image || "/default-avatar.png"}
                  alt="avatar"
                  className="h-8 w-8 rounded-full border"
                />
              ) : (
                <User className="h-6 w-6" />
              )}
            </Link>

            <button
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              className="p-1 hover:text-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      {(isMobileMenuOpen || isUserMenuOpen) && (
        <div className="md:hidden bg-white border-t shadow mt-2 py-3 px-5 space-y-3">
          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border rounded px-2 py-1"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="flex-1 outline-none text-sm"
            />
            <button type="submit">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
          </form>

          {/* Links */}
          <Link to="/products" className="block hover:text-blue-600">
            Boutique
          </Link>
          <Link to="/about" className="block hover:text-blue-600">
            About
          </Link>
          <Link to="/contact" className="block hover:text-blue-600">
            Contact
          </Link>

          {/* Auth actions */}
          {user ? (
            <button
              onClick={handleLogout}
              className="block text-left w-full hover:text-blue-600"
            >
              Déconnexion
            </button>
          ) : (
            <>
              <Link to="/signin" className="block hover:text-blue-600">
                Login
              </Link>
              <Link to="/signup" className="block hover:text-blue-600">
                Signup
              </Link>
            </>
          )}
        </div>
      )}

      {/* 🔎 Barre de recherche interactive (ChercheProduit) */}
      {showSearchBar && (
        <div className="absolute left-0 top-full w-full bg-white shadow-lg z-50 p-4 border-t border-gray-200">
          <ChercheProduit />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
