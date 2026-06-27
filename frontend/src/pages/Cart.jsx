import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { Trash2, Heart, Shield, Headphones, Truck, ShoppingCart } from "lucide-react";

const savedItems = [
  {
    id: 1,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=140&fit=crop",
  },
  {
    id: 2,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=140&fit=crop",
  },
  {
    id: 3,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    img: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=200&h=140&fit=crop",
  },
  {
    id: 4,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    img: "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=200&h=140&fit=crop",
  },
];

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
  const [coupon, setCoupon] = useState("");

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal > 5000 ? 500 : 0;
  const tax = Math.round(subtotal * 0.02);
  const total = subtotal - discount + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 font-sans">
        <div className="max-w-5xl mx-auto">
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button 
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">
          My cart ({cartCount})
        </h2>

        {/* Main Layout: LEFT items + RIGHT summary */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* LEFT: Cart Items */}
          <div className="flex flex-col gap-3 flex-1">

            {cart.map((item) => (
              <div key={item._id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-md items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-100"
                />
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-sm font-semibold text-gray-800 leading-snug">{item.name}</p>
                  <p className="text-xs text-gray-400">
                    Category: {item.category}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-sm px-3 py-1 rounded-md border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-300 flex items-center gap-1 transition-all"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                    <button className="text-sm px-3 py-1 rounded-md border border-gray-200 text-indigo-500 hover:bg-indigo-50 hover:border-indigo-300 flex items-center gap-1 transition-all">
                      <Heart size={14} />
                      Save for later
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <p className="text-base font-bold text-gray-800">Rs. {item.price.toFixed(0)}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <label>Qty:</label>
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      className="border border-gray-200 rounded-md px-2 py-1 text-sm bg-gray-50 cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Back / Remove All */}
            <div className="flex justify-between items-center bg-white rounded-xl px-4 py-3 shadow-sm">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
              >
                ← Back to shop
              </button>
              <button onClick={clearCart} className="text-sm font-semibold border border-red-300 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-all">
                Remove all
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl p-5 shadow-md">
              {[
                { Icon: Shield, title: "Secure payment", sub: "Protected transactions", color: "text-amber-500", bg: "bg-amber-50" },
                { Icon: Headphones, title: "Customer support", sub: "24/7 assistance", color: "text-indigo-500", bg: "bg-indigo-50" },
                { Icon: Truck, title: "Free delivery", sub: "On orders above Rs. 5000", color: "text-green-500", bg: "bg-green-50" },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-3 flex-1">
                  <div className={`w-11 h-11 rounded-lg ${badge.bg} flex items-center justify-center flex-shrink-0`}>
                    <badge.Icon size={20} className={badge.color} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{badge.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
          {/* END LEFT */}

          {/* RIGHT: Order Summary */}
          <div className="w-full lg:w-72 bg-white rounded-2xl p-5 shadow-md lg:sticky lg:top-5 flex flex-col gap-4">

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Have a coupon?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 transition-all"
                />
                <button className="px-3 py-2 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-all">
                  Apply
                </button>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal:</span>
                <span>Rs. {subtotal.toFixed(0)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Discount:</span>
                  <span className="text-green-600 font-semibold">-Rs. {discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (2%):</span>
                <span className="text-red-500">+Rs. {tax.toFixed(0)}</span>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="flex justify-between text-base font-bold text-gray-800">
              <span>Total:</span>
              <span>Rs. {total.toFixed(0)}</span>
            </div>

            <button className="w-full py-3 bg-indigo-500 text-white rounded-lg text-sm font-bold hover:bg-indigo-600 transition-all tracking-wide flex items-center justify-center gap-2">
              <ShoppingCart size={18} />
              Checkout
            </button>

            {/* Payment Icons */}
            <div className="flex gap-2 justify-center flex-wrap pt-1">
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="#f0f0f0" />
                <circle cx="15" cy="12" r="7" fill="#EB001B" />
                <circle cx="23" cy="12" r="7" fill="#F79E1B" />
                <path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00" />
              </svg>
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="#f0f0f0" />
                <text x="6" y="16" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#1A1F71">VISA</text>
              </svg>
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="#f0f0f0" />
                <text x="4" y="16" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#003087">Pay</text>
                <text x="18" y="16" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#009cde">Pal</text>
              </svg>
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="#000" />
                <text x="4" y="16" fontFamily="Arial" fontWeight="bold" fontSize="8" fill="#fff">Apple Pay</text>
              </svg>
            </div>

          </div>
          {/* END RIGHT */}

        </div>
        {/* END MAIN LAYOUT */}

        {/* Saved for Later - full width */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-base font-bold text-gray-800 mb-4">Saved for later</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-all flex flex-col"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-32 object-cover bg-gray-100"
                />
                <div className="p-2 flex flex-col gap-1 flex-1">
                  <p className="text-sm font-bold text-gray-800">Rs. {item.price.toFixed(0)}</p>
                  <p className="text-xs text-gray-500 leading-snug">{item.title}</p>
                  <button className="mt-auto text-sm border border-indigo-400 text-indigo-500 rounded-md py-1.5 hover:bg-indigo-500 hover:text-white transition-all font-semibold flex items-center justify-center gap-1">
                    <ShoppingCart size={14} />
                    Move to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Banner - full width */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-xl px-7 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-white">
            <p className="text-base font-bold">Super discount on orders above Rs. 5000</p>
            <p className="text-sm opacity-80 mt-1">Get free delivery + Rs. 500 discount</p>
          </div>
          <button 
            onClick={() => navigate('/products')}
            className="px-5 py-2.5 bg-white text-indigo-700 font-bold text-sm rounded-lg hover:bg-gray-100 transition-all whitespace-nowrap"
          >
            Shop now
          </button>
        </div>

      </div>
    </div>
  );
}