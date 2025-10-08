import React, { useState } from "react";
import logo from "../assets/shopman.png";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // null = pas connecté, sinon {name:"..."}
  const { cartItems } = useCart();

  // Simulation login/logout
  const handleLogin = () => {
    setUser({ name: "Haythem" });
  };
  const handleLogout = () => {
    setUser(null);
  };

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
          <Link to="/" className="hover:text-blue-600">
            Accueil
          </Link>
          <Link to="/products" className="hover:text-blue-600">
            Boutique
          </Link>

          {/* Catégories */}
          <div className="relative group">
            <button className="font-semibold px-3 py-2 hover:text-blue-600 transition">
              Catégories
            </button>
            <div className="absolute top-full left-0 mt-2 hidden group-hover:flex flex-col bg-white text-black rounded shadow-lg z-10 min-w-[200px] border border-gray-200">
              <Link to="/categories/homme" className="px-4 py-2 hover:bg-gray-100">
                Homme
              </Link>
              <Link to="/categories/femme" className="px-4 py-2 hover:bg-gray-100">
                Femme
              </Link>
              <Link to="/categories/enfant" className="px-4 py-2 hover:bg-gray-100">
                Enfant
              </Link>
            </div>
          </div>

          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>

        {/* Recherche + Icônes */}
        <div className="flex items-center space-x-4">
          {/* Recherche */}
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
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-xs">
              {cartItems.length}
            </span>
          </Link>

          {/* Authentification */}
          <div className="relative group hidden md:block">
            <button className="font-semibold px-3 py-2 hover:text-blue-600 transition flex items-center gap-1">
              <User className="h-5 w-5" />
              {user ? user.name : ""}
            </button>
            <div className="absolute top-full right-0 mt-2 hidden group-hover:flex flex-col bg-white text-black rounded shadow-lg z-10 min-w-[180px] border border-gray-200">
              {!user ? (
                <>
                  <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    <LogIn className="h-4 w-4" /> Login
                  </button>
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
          </div>

          {/* Burger menu (mobile) */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile (collapsible) */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 flex flex-col bg-white rounded-lg shadow p-4">
          <Link to="/" className="block px-3 py-2 hover:bg-gray-100 rounded">
            Accueil
          </Link>
          <Link to="/products" className="block px-3 py-2 hover:bg-gray-100 rounded">
            Boutique
          </Link>
          
          <Link to="/categories/homme" className="block px-3 py-2 hover:bg-gray-100 rounded">
            Homme
          </Link>
          <Link to="/categories/femme" className="block px-3 py-2 hover:bg-gray-100 rounded">
            Femme
          </Link>
          <Link to="/categories/enfant" className="block px-3 py-2 hover:bg-gray-100 rounded">
            Enfant
          </Link>
          <Link to="/contact" className="block px-3 py-2 hover:bg-gray-100 rounded">
            Contact
          </Link>

          <hr className="my-2" />

          {!user ? (
            <>
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
              >
                <LogIn className="h-4 w-4" /> Login
              </button>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
              >
                <UserPlus className="h-4 w-4" /> Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
              >
                <User className="h-4 w-4" /> Profil
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
              >
                <LogOut className="h-4 w-4" /> Déconnexion
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
