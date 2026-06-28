import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { Trash2, Heart, Shield, Headphones, Truck, ShoppingCart, Tag, ChevronRight } from "lucide-react";

const savedItems = [
  { id: 1, title: "GoPro HERO6 4K Action Camera - Black", price: 99.5, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=140&fit=crop" },
  { id: 2, title: "GoPro HERO6 4K Action Camera - Black", price: 99.5, img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=140&fit=crop" },
  { id: 3, title: "GoPro HERO6 4K Action Camera - Black", price: 99.5, img: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=200&h=140&fit=crop" },
  { id: 4, title: "GoPro HERO6 4K Action Camera - Black", price: 99.5, img: "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=200&h=140&fit=crop" },
];

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
  const [coupon, setCoupon] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal > 5000 ? 500 : 0;
  const tax = Math.round(subtotal * 0.02);
  const total = subtotal - discount + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen px-4 py-16 font-sans flex items-center justify-center" style={{ background: "#FAFAF8" }}>
        <div className="text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "#F5F5F0", border: "2px dashed #D6D3D1" }}>
            <ShoppingCart size={36} className="text-stone-400" />
          </div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Your cart is empty</h2>
          <p className="text-stone-500 text-sm mb-6">Looks like you haven't added anything yet.</p>
          <button onClick={() => navigate("/products")}
            className="px-7 py-3 font-bold text-stone-900 rounded-xl text-sm transition-colors"
            style={{ background: "#F59E0B" }}>
            Start shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 font-sans" style={{ background: "#FAFAF8" }}>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-stone-900">My Cart</h2>
            <p className="text-xs text-stone-400 mt-0.5">{cartCount} item{cartCount !== 1 ? "s" : ""} in your bag</p>
          </div>
          <button onClick={clearCart}
            className="text-xs font-semibold text-red-400 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
            <Trash2 size={12} /> Remove all
          </button>
        </div>

        {/* Main */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* LEFT: Items */}
          <div className="flex flex-col gap-3 flex-1">

            {cart.map((item) => (
              <div key={item._id}
                className="flex gap-4 bg-white rounded-2xl p-4 border border-stone-200 hover:border-amber-300 hover:shadow-sm transition-all items-start">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <p className="text-sm font-bold text-stone-900 leading-snug line-clamp-1">{item.name}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-stone-500 bg-stone-100 rounded-md px-2 py-0.5 w-fit uppercase tracking-wide">
                    {item.category}
                  </span>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-0.5">{item.description}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => removeFromCart(item._id)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 flex items-center gap-1 transition-colors">
                      <Trash2 size={12} /> Remove
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 flex items-center gap-1 transition-colors">
                      <Heart size={12} /> Save
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <p className="text-base font-black text-stone-900">Rs. {item.price.toFixed(0)}</p>
                  <div className="flex items-center gap-1.5">
                    <label className="text-[10px] text-stone-400 font-semibold uppercase tracking-wide">Qty</label>
                    <select value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      className="border border-stone-200 rounded-lg px-2 py-1 text-xs bg-stone-50 cursor-pointer font-semibold focus:border-amber-400 outline-none">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {/* Back to shop */}
            <button onClick={() => navigate("/")}
              className="flex items-center gap-2 text-stone-700 text-sm font-bold px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 w-fit transition-colors">
              ← Back to shop
            </button>

            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-5 border border-stone-200">
              {[
                { Icon: Shield, title: "Secure payment", sub: "Protected transactions", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
                { Icon: Headphones, title: "24/7 Support", sub: "Always here for you", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
                { Icon: Truck, title: "Free delivery", sub: "On orders above Rs. 5000", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-xl ${badge.bg} border ${badge.border} flex items-center justify-center flex-shrink-0`}>
                    <badge.Icon size={18} className={badge.color} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">{badge.title}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Receipt-style order summary */}
          <div className="w-full lg:w-72 bg-white rounded-2xl border border-stone-200 overflow-hidden lg:sticky lg:top-5 shadow-sm">

            {/* Header */}
            <div className="px-5 py-4 border-b border-stone-100" style={{ background: "#1C1917" }}>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Order Summary</p>
            </div>

            {/* Coupon */}
            <div className="px-5 py-4 border-b border-stone-100">
              <div className="flex items-center gap-1.5 mb-2">
                <Tag size={12} className="text-amber-500" />
                <p className="text-xs font-bold text-stone-700">Have a coupon?</p>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter code"
                  value={coupon} onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-amber-400 transition-colors bg-stone-50" />
                <button className="px-3 py-2 font-bold rounded-xl text-xs text-stone-900 transition-colors"
                  style={{ background: "#F59E0B" }}>
                  Apply
                </button>
              </div>
            </div>

            {/* Line items */}
            <div className="px-5 py-4 flex flex-col gap-3 border-b border-dashed border-stone-200">
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-semibold text-stone-800">Rs. {subtotal.toFixed(0)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Discount</span>
                  <span className="font-bold text-emerald-600">− Rs. {discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Tax (2%)</span>
                <span className="font-semibold text-red-400">+ Rs. {tax.toFixed(0)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="px-5 py-4 flex justify-between items-center border-b border-stone-100">
              <span className="text-sm font-black text-stone-900">Total</span>
              <span className="text-lg font-black text-stone-900">Rs. {total.toFixed(0)}</span>
            </div>

            {/* CTA */}
            <div className="px-5 py-4">
              <button className="w-full py-3 font-black text-stone-900 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                style={{ background: "#F59E0B" }}
                onMouseOver={e => e.currentTarget.style.background = "#D97706"}
                onMouseOut={e => e.currentTarget.style.background = "#F59E0B"}>
                <ShoppingCart size={16} />
                Checkout
                <ChevronRight size={14} />
              </button>

              {/* Payment icons */}
              <div className="flex gap-2 justify-center flex-wrap mt-4">
                <svg width="38" height="24" viewBox="0 0 38 24"><rect width="38" height="24" rx="6" fill="#f5f5f0" /><circle cx="15" cy="12" r="7" fill="#EB001B" /><circle cx="23" cy="12" r="7" fill="#F79E1B" /><path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00" /></svg>
                <svg width="38" height="24" viewBox="0 0 38 24"><rect width="38" height="24" rx="6" fill="#f5f5f0" /><text x="6" y="16" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#1A1F71">VISA</text></svg>
                <svg width="38" height="24" viewBox="0 0 38 24"><rect width="38" height="24" rx="6" fill="#f5f5f0" /><text x="4" y="16" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#003087">Pay</text><text x="18" y="16" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#009cde">Pal</text></svg>
                <svg width="38" height="24" viewBox="0 0 38 24"><rect width="38" height="24" rx="6" fill="#1C1917" /><text x="4" y="16" fontFamily="Arial" fontWeight="bold" fontSize="8" fill="#fff">Apple Pay</text></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Saved for Later */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200">
          <h3 className="text-sm font-black text-stone-900 mb-4">Saved for later</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {savedItems.map((item) => (
              <div key={item.id}
                className="rounded-xl overflow-hidden border border-stone-100 hover:border-amber-300 hover:shadow-sm transition-all flex flex-col group">
                <div className="overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3 flex flex-col gap-1 flex-1">
                  <p className="text-xs font-black text-stone-900">Rs. {item.price.toFixed(0)}</p>
                  <p className="text-[10px] text-stone-400 leading-snug line-clamp-2">{item.title}</p>
                  <button className="mt-auto text-xs border border-stone-200 text-stone-600 rounded-lg py-1.5 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all font-bold flex items-center justify-center gap-1">
                    <ShoppingCart size={11} /> Move to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo */}
        <div className="rounded-2xl px-7 py-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ background: "linear-gradient(135deg, #1C1917 0%, #3D2B1F 100%)" }}>
          <div>
            <p className="text-base font-black text-white">Super discount on orders above Rs. 5000</p>
            <p className="text-xs text-stone-400 mt-1">Free delivery + Rs. 500 off — automatically applied</p>
          </div>
          <button onClick={() => navigate("/products")}
            className="px-6 py-2.5 font-black text-stone-900 text-sm rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ background: "#F59E0B" }}>
            Shop now
          </button>
        </div>

      </div>
    </div>
  );
}