import { useState, useRef } from "react";
import logo from "../assets/Shopman.png";
import { ShoppingCart, User, Search, LogIn, UserPlus, LogOut } from "lucide-react";
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsUserMenuOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 200);
  };

  if (loading) {
    return (
      <nav className="bg-blue-50 text-gray-700 px-6 md:px-20 py-3 shadow">
        <div className="flex items-center justify-between">
          <img src={logo} alt="ShopMan" className="h-10 w-auto" />
          <span className="text-sm text-gray-500">Chargement...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="ShopMan" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link to="/products" className="hover:text-blue-600 transition-colors">Boutique</Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">À propos</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        </div>

        {/* Icons & Search */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button
            onClick={() => setShowSearchBar(prev => !prev)}
            className="hidden md:flex p-2 rounded hover:bg-blue-50 transition"
            title="Rechercher"
          >
            <Search className="h-5 w-5 text-gray-700" />
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600 transition" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div
            className="relative hidden md:block"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 transition">
              {user ? (
                <img src={user?.image || "/default-avatar.png"} alt="avatar" className="h-8 w-8 rounded-full border" />
              ) : (
                <User className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md z-10 min-w-[180px]">
                {!user ? (
                  <>
                    <Link to="/signin" className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition">
                      <LogIn className="h-4 w-4" /> Login
                    </Link>
                    <Link to="/signup" className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition">
                      <UserPlus className="h-4 w-4" /> Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition">
                      <User className="h-4 w-4" /> Profil
                    </Link>

                    {/* Lien vers les commandes */}
                    <Link to="/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition">
                      <ShoppingCart className="h-4 w-4" /> Commandes
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-blue-50 transition"
                    >
                      <LogOut className="h-4 w-4" /> Déconnexion
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-1 hover:text-blue-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow px-5 py-4 space-y-3">
          <form onSubmit={handleSearch} className="flex items-center border rounded px-2 py-1">
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

          <Link to="/products" className="block hover:text-blue-600 transition">Boutique</Link>
          <Link to="/about" className="block hover:text-blue-600 transition">À propos</Link>
          <Link to="/contact" className="block hover:text-blue-600 transition">Contact</Link>

          {user ? (
            <>
              <Link to="/orders" className="block hover:text-blue-600 transition">Commandes</Link>
              <button onClick={handleLogout} className="block text-left w-full hover:text-blue-600 transition">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="block hover:text-blue-600 transition">Login</Link>
              <Link to="/signup" className="block hover:text-blue-600 transition">Signup</Link>
            </>
          )}
        </div>
      )}

      {/* Search Bar */}
      {showSearchBar && (
        <div className="absolute left-0 top-full w-full bg-white shadow-lg z-50 p-4 border-t border-gray-200">
          <ChercheProduit />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
