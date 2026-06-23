import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const thumbnails = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=80&h=80&fit=crop",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&h=80&fit=crop",
  ];

  const mainImages = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
  ];

  const relatedProducts = [
    { name: "Xiaomi Redmi 8 Original", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?w=120&h=120&fit=crop" },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop" },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop" },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop" },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=120&h=120&fit=crop" },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=120&h=120&fit=crop" },
  ];

  const youMayLike = [
    { name: "Men Blazers Sets Elegant Formal", price: "$7.00 – $69.50", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=70&h=70&fit=crop" },
    { name: "Men Short Sleeve Polo Contrast", price: "$7.00 – $20.50", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=70&h=70&fit=crop" },
    { name: "Apple Watch Series Space Gray", price: "$7.00 – $89.50", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=70&h=70&fit=crop" },
    { name: "Basketball Crew Socks Long Stuff", price: "$7.00 – $89.50", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=70&h=70&fit=crop" },
    { name: "New Summer Men's cotton T-Shirts", price: "$7.00 – $30.50", img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=70&h=70&fit=crop" },
  ];

  return (
    <div className="font-sans text-sm text-gray-700 bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 px-4 sm:px-10 py-2 text-xs text-gray-400 border-b border-gray-100">
        <span className="text-blue-600 cursor-pointer">Home</span>
        <span className="mx-1">&gt;</span>
        <span className="text-blue-600 cursor-pointer">Clothings</span>
        <span className="mx-1">&gt;</span>
        <span className="text-blue-600 cursor-pointer">Men's wear</span>
        <span className="mx-1">&gt;</span>
        <span>Summer clothing</span>
      </div>

      {/* Main Product Section */}
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col lg:flex-row gap-6">

        {/* Left: Images */}
        <div className="w-full lg:w-80 flex-shrink-0">
          {/* Main Image */}
          <div className="border border-gray-100 rounded-lg overflow-hidden mb-3 h-72 flex items-center justify-center bg-gray-50">
            <img src={mainImages[selectedImage]} alt="Product" className="w-full h-full object-contain" />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 flex-wrap">
            {thumbnails.map((thumb, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-14 h-14 rounded-md overflow-hidden cursor-pointer flex-shrink-0 border-2 transition-all ${
                  i === selectedImage ? "border-blue-500" : "border-gray-200"
                }`}
              >
                <img src={thumb} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Product Info */}
        <div className="flex-1">
          {/* In Stock */}
          <div className="flex items-center gap-1 mb-2">
            <span className="text-green-500 text-xs">✔</span>
            <span className="text-green-500 text-xs font-medium">In stock</span>
          </div>

          {/* Title */}
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 leading-snug">
            Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
          </h1>

          {/* Rating */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-gray-400">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <span key={i} className={i <= 4 ? "text-yellow-400" : "text-gray-200"}>★</span>
              ))}
            </div>
            <span>4.0</span>
            <span className="text-blue-500 cursor-pointer">32 reviews</span>
            <span>|</span>
            <span>154 sold</span>
          </div>

          {/* Pricing tiers */}
          <div className="flex border border-gray-100 rounded-lg overflow-hidden mb-4">
            {[
              { qty: "10–150 pcs", price: "$98.00", active: false },
              { qty: "150–700 pcs", price: "$90.00", active: false },
              { qty: "700+ pcs", price: "$78.00", active: true },
            ].map((tier, i) => (
              <div
                key={i}
                className={`flex-1 py-2 px-3 text-center ${tier.active ? "bg-yellow-50" : "bg-white"} ${i > 0 ? "border-l border-gray-100" : ""}`}
              >
                <div className={`text-sm font-bold ${tier.active ? "text-orange-600" : "text-gray-700"}`}>{tier.price}</div>
                <div className="text-xs text-gray-400 mt-0.5">{tier.qty}</div>
              </div>
            ))}
          </div>

          {/* Specs table */}
          <table className="w-full text-xs mb-4">
            <tbody>
              {[
                ["Price", "Negotiable"],
                ["Type", "Classic shoes"],
                ["Material", "Plastic material"],
                ["Design", "Modern nice"],
                ["Customization", "Customized logos and design custom packages"],
                ["Protection", "Refund Policy"],
                ["Warranty", "2 years full warranty"],
              ].map(([label, value], i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-1.5 text-gray-400 w-32 align-top">{label}</td>
                  <td className="py-1.5 text-gray-600">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Seller Card */}
        <div className="w-full lg:w-52 flex-shrink-0 flex flex-row lg:flex-col gap-4">

          <div className="border border-gray-100 rounded-lg p-4 flex-1 lg:flex-none">
            {/* Supplier */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">R</div>
              <div>
                <div className="font-semibold text-xs">Supplier</div>
                <div className="text-xs text-gray-500">Guanje Trading LLC</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">🇩🇪 Germany, Berlin</div>
            <div className="text-xs text-green-500 mb-1 flex items-center gap-1">✔ Verified Seller</div>
            <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">🚚 Worldwide Shipping</div>

            <button className="w-full py-2 bg-blue-600 text-white rounded-md text-xs font-semibold mb-2 hover:bg-blue-700 transition-all">
              Send inquiry
            </button>
            <button className="w-full py-2 bg-white text-blue-600 border border-blue-600 rounded-md text-xs font-semibold mb-2 hover:bg-blue-50 transition-all">
              Seller's profile
            </button>
            <button className="w-full py-2 bg-white text-red-400 border border-gray-100 rounded-md text-xs flex items-center justify-center gap-1 hover:bg-red-50 transition-all">
              ♡ Save for later
            </button>
          </div>

          {/* You may like */}
          <div className="border border-gray-100 rounded-lg p-3 flex-1 lg:flex-none">
            <div className="font-semibold text-xs mb-3 text-gray-700">You may like</div>
            {youMayLike.map((item, i) => (
              <div key={i} className="flex gap-2 mb-3 cursor-pointer">
                <img src={item.img} alt="" className="w-12 h-12 object-cover rounded-md border border-gray-100 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 leading-snug mb-0.5 line-clamp-2">{item.name}</div>
                  <div className="text-xs text-orange-600 font-semibold">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-b-2 border-gray-100 flex overflow-x-auto">
          {["description", "reviews", "shipping", "about seller"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 -mb-0.5 capitalize transition-all ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-5">
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>

          {/* Specs mini table */}
          <table className="w-full text-xs mb-4 border border-gray-100 rounded-lg overflow-hidden">
            <tbody>
              {[
                ["Model", "#HS198867"],
                ["Style", "Classic style"],
                ["Certificate", "ISO 9001:2015"],
                ["Size", "34mm x 450mm x 18mm"],
                ["Memory", "66GB RAM"],
              ].map(([label, value], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-3 text-gray-400 w-32 border-b border-gray-100">{label}</td>
                  <td className="py-2 px-3 text-gray-600 border-b border-gray-100">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bullet features */}
          {[
            "Some great feature name here",
            "Lorem ipsum dolor sit amet, consectetur",
            "Duis aute irure dolor in reprehenderit",
            "Some great feature name here",
          ].map((feat, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5">
              <span className="text-green-500 font-bold mt-0.5 text-xs">✔</span>
              <span className="text-xs text-gray-500">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Related products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {relatedProducts.map((product, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <img src={product.img} alt={product.name} className="w-full h-28 object-cover" />
              <div className="p-2">
                <div className="text-xs text-gray-600 mb-1 leading-snug line-clamp-2">{product.name}</div>
                <div className="text-xs text-orange-600 font-semibold">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 px-6 sm:px-16 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-white font-bold text-lg sm:text-xl mb-1">Super discount on more than 100 USD</div>
          <div className="text-blue-100 text-xs">Have you ever finally just write dummy info</div>
        </div>
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold text-sm px-7 py-3 rounded-lg transition-all whitespace-nowrap">
          Shop now
        </button>
      </div>

    </div>
  );
};

export default ProductDetails;