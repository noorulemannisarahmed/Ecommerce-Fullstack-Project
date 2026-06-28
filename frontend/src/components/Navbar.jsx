import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import useCart from "../hooks/useCart";
import { useAuth } from "../context/AuthContext";
import ReactCountryFlag from "react-country-flag";
import {
  User,
  MessageCircle,
  Heart,
  ShoppingCart,
  Menu,
  ChevronDown,
  Search,
  LogOut,
  Package,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState(false);
  const { cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setSearchError(true);
      setTimeout(() => setSearchError(false), 2000);
      return;
    }
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-blue-600 p-1.5 rounded">
            <ShoppingCart className="text-white" size={18} />
          </div>
          <Link to="/" className="font-bold text-lg hover:text-blue-600 transition">
            Amazon
          </Link>
        </div>

        <form onSubmit={handleSearch} className={`flex-1 hidden md:flex max-w-xl border-2 rounded-lg overflow-hidden transition-all duration-300 ${searchError ? 'border-red-400' : 'border-blue-500'}`}>
          <input
            placeholder={searchError ? "Please enter something first..." : "Search"}
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSearchError(false); }}
            className={`flex-1 px-3 py-2 text-sm outline-none transition-all duration-300 ${searchError ? 'placeholder-red-400 bg-red-50' : 'placeholder-gray-400 bg-white'}`}
          />
          <div className={`border-l-2 w-px transition-all duration-300 ${searchError ? 'border-red-400' : 'border-blue-500'}`}></div>
          <select className="border-t border-b border-gray-300 px-2 text-sm font-semibold bg-white text-gray-700">
            <option>All category</option>
          </select>
          <button
            type="submit"
            className={`text-white px-5 py-2 text-sm font-medium flex items-center gap-1.5 rounded transition-all duration-300 ${searchError ? 'bg-red-400 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            <Search size={15} />
            Search
          </button>
        </form>

        <div className="flex items-center gap-4 lg:gap-5 text-[11px] text-gray-600 shrink-0 ml-auto">

          {/* Profile / Login */}
          {user ? (
            <div className="flex items-center gap-4 lg:gap-5">
              {/* User name + admin badge */}
              <Link to="/profile" className="hidden sm:flex flex-col items-center gap-1 hover:text-blue-600 transition">
                {isAdmin && (
                  <span className="bg-blue-100 text-blue-600 text-[9px] font-bold px-1.5 rounded-full -mt-1">
                    ADMIN
                  </span>
                )}
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex flex-col items-center gap-1 cursor-pointer hover:text-red-500 transition"
              >
                <LogOut size={18} />
                Logout
              </button>

              {/* Admin Panel */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600 transition text-blue-600 font-semibold"
                >
                  <Package size={18} />
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600 transition"
            >
              <User size={18} />
              Login
            </Link>
          )}

          <div className="hidden sm:flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600 transition">
            <MessageCircle size={18} />
            Message
          </div>
          <div className="hidden sm:flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600 transition">
            <Heart size={18} />
            Orders
          </div>

          {/* Cart with badge */}
          <Link
            to="/cart"
            className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600 transition relative"
          >
            <div className="relative">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 leading-none">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
            My cart
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between text-xs lg:text-sm overflow-x-auto">
          <nav className="flex items-center gap-4 lg:gap-6 text-gray-700 whitespace-nowrap">
            <span className="flex items-center gap-1 font-medium text-gray-900">
              <Menu size={15} />
              All category
            </span>
            <Link to="/products" className="cursor-pointer hover:text-blue-600 transition">Hot offers</Link>
            <span className="cursor-pointer hover:text-blue-600">Gift boxes</span>
            <span className="cursor-pointer hover:text-blue-600">Projects</span>
            <span className="cursor-pointer hover:text-blue-600">Menu item</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              Help <ChevronDown size={13} />
            </span>
          </nav>
          <div className="hidden md:flex items-center gap-4 text-gray-700 whitespace-nowrap">
            <span className="flex items-center gap-1 cursor-pointer font-semibold">
              English, USD <ChevronDown size={13} />
            </span>
            <span className="flex items-center gap-1 cursor-pointer font-semibold">
              Ship to <ReactCountryFlag countryCode="DE" svg style={{ width: "20px", height: "20px" }} />{" "}
              <ChevronDown size={13} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}