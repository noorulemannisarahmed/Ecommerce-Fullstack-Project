import React, { useState } from "react";

const cartItems = [
  {
    id: 1,
    title: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Artel Market",
    price: 78.99,
    qty: 9,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
  },
  {
    id: 2,
    title: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Best factory LLC",
    price: 39.0,
    qty: 3,
    img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=80&h=80&fit=crop",
  },
  {
    id: 3,
    title: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Plastic",
    seller: "Artel Market",
    price: 170.5,
    qty: 1,
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=80&h=80&fit=crop",
  },
];

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
  const [coupon, setCoupon] = useState("");

  const subtotal = 1403.97;
  const discount = 80.0;
  const tax = 14.0;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">
          My cart ({cartItems.length})
        </h2>

        {/* Main Layout: LEFT items + RIGHT summary */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* LEFT: Cart Items */}
          <div className="flex flex-col gap-3 flex-1">

            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm items-start">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-100"
                />
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-sm font-semibold text-gray-800 leading-snug">{item.title}</p>
                  <p className="text-xs text-gray-400">
                    Size: {item.size}, Color: {item.color}, Material: {item.material}
                  </p>
                  <p className="text-xs text-gray-400">Seller: {item.seller}</p>
                  <div className="flex gap-2 mt-2">
                    <button className="text-sm px-3 py-1 rounded-md border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all">
                      Remove
                    </button>
                    <button className="text-sm px-3 py-1 rounded-md border border-gray-200 text-blue-500 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-500 transition-all">
                      Save for later
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <p className="text-base font-bold text-gray-800">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <label>Qty:</label>
                    <select
                      defaultValue={item.qty}
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
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
                ← Back to shop
              </button>
              <button className="text-sm font-semibold border border-red-300 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-all">
                Remove all
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl p-5 shadow-sm">
              {[
                { icon: "ti-lock", title: "Secure payment", sub: "Have you ever finally just", bg: "bg-amber-50", text: "text-amber-500" },
                { icon: "ti-headphones", title: "Customer support", sub: "Have you ever finally just", bg: "bg-blue-50", text: "text-blue-500" },
                { icon: "ti-truck-delivery", title: "Free delivery", sub: "Have you ever finally just", bg: "bg-green-50", text: "text-green-500" },
              ].map((badge) => (
                <div key={badge.title} className="flex items-center gap-3 flex-1">
                  <div className={`w-11 h-11 rounded-lg ${badge.bg} flex items-center justify-center flex-shrink-0`}>
                    <i className={`ti ${badge.icon} text-2xl ${badge.text}`}></i>
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
          <div className="w-full lg:w-72 bg-white rounded-xl p-5 shadow-sm lg:sticky lg:top-5 flex flex-col gap-4">

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Have a coupon?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 transition-all"
                />
                <button className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all">
                  Apply
                </button>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount:</span>
                <span className="text-green-600 font-semibold">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax:</span>
                <span className="text-red-500">+${tax.toFixed(2)}</span>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="flex justify-between text-base font-bold text-gray-800">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="w-full py-3 bg-blue-500 text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-all tracking-wide">
              <i className="ti ti-shopping-cart text-sm"></i>
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
        <div className="bg-white rounded-xl p-5 shadow-sm">
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
                  <p className="text-sm font-bold text-gray-800">${item.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 leading-snug">{item.title}</p>
                  <button className="mt-auto text-sm border border-blue-400 text-blue-500 rounded-md py-1.5 hover:bg-blue-500 hover:text-white transition-all font-semibold">
                    <i className="ti ti-shopping-cart text-sm"></i>
                    Move to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Banner - full width */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl px-7 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-white">
            <p className="text-base font-bold">Super discount on more than 100 USD</p>
            <p className="text-sm opacity-80 mt-1">Have you ever finally just write dummy info</p>
          </div>
          <button className="px-5 py-2.5 bg-white text-blue-700 font-bold text-sm rounded-lg hover:bg-gray-100 transition-all whitespace-nowrap">
            Shop now
          </button>
        </div>

      </div>
    </div>
  );
}