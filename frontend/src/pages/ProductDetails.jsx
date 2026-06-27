import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, Heart, Star, MessageSquare, Award } from "lucide-react";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [selectedTier, setSelectedTier] = useState(0);

  useEffect(() => {
    if (id) {
      getProductById(id).then(data => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [id]);

  const bulkPrices = product?.bulkPrices?.length ? product.bulkPrices : [
    { minQty: 1, maxQty: 9, price: product?.price },
    { minQty: 10, maxQty: 49, price: Math.round(product?.price * 0.9) },
    { minQty: 50, maxQty: null, price: Math.round(product?.price * 0.8) },
  ];

  // Quantity change hone par sahi tier dhundo
  const getTierForQty = (qty) => {
    const idx = bulkPrices.findIndex(
      (t) => qty >= t.minQty && (t.maxQty === null || qty <= t.maxQty)
    );
    return idx >= 0 ? idx : bulkPrices.length - 1;
  };

  const handleQuantityChange = (newQty) => {
    const clamped = Math.max(1, Math.min(product.stock, newQty));
    setQuantity(clamped);
    setSelectedTier(getTierForQty(clamped));
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (product && !added) {
      // Cart mein correct (bulk) price bhejo
      const priceAtQty = bulkPrices[selectedTier]?.price ?? product.price;
      addToCart({ ...product, price: priceAtQty }, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const activePrice = product ? bulkPrices[selectedTier]?.price : 0;

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading product...</div>
    </div>
  );
  if (!product) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Product not found</div>
    </div>
  );

const thumbnails = [product.image];
const mainImages = [product.image];

  const youMayLike = [
    { name: "Men Blazers Sets Elegant Formal", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
    { name: "Men Shirt Sleeve Polo Contrast", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop" },
    { name: "Apple Watch Series Space Gray", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop" },
    { name: "Basketball Crew Socks Long Stuff", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop" },
    { name: "New Summer Men's castrol T-Shirts", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=80&h=80&fit=crop" },
  ];

  const relatedProducts = [
    { name: "Related Product 1", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?w=200&h=200&fit=crop" },
    { name: "Related Product 2", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
    { name: "Related Product 3", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
    { name: "Related Product 4", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" },
    { name: "Related Product 5", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=200&fit=crop" },
    { name: "Related Product 6", price: "$32.00–$40.00", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-gray-800 text-sm">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-gray-400 flex items-center gap-1">
        <span className="cursor-pointer hover:text-indigo-500" onClick={() => navigate('/')}>Home</span>
        <span>›</span>
        <span className="cursor-pointer hover:text-indigo-500">Clothings</span>
        <span>›</span>
        <span className="cursor-pointer hover:text-indigo-500">Men's wear</span>
        <span>›</span>
        <span className="text-gray-500">Summer clothing</span>
      </div>

      {/* ── TOP SECTION ── */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col lg:flex-row gap-6">

          {/* Image block: main + thumbnails below */}
          <div className="flex-shrink-0 w-full lg:w-64">
            <div className="border border-gray-200 rounded-lg overflow-hidden h-64 flex items-center justify-center bg-white mb-3">
              <img
                src={mainImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-3"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {thumbnails.map((thumb, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-12 h-12 rounded border-2 overflow-hidden cursor-pointer flex-shrink-0 transition-all ${
                    i === selectedImage ? "border-indigo-500" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={thumb} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex-1 min-w-0">
            {/* In stock */}
            <div className="flex items-center gap-1.5 mb-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="#22c55e" opacity="0.15"/>
                <path d="M4 7l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-green-600 text-xs font-medium">
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-base font-bold text-gray-900 mb-2 leading-snug">
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-2 mb-4 text-xs text-gray-400 flex-wrap">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={13} className={i <= 4 ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"} />
                ))}
              </div>
              <span className="text-gray-600 font-medium">9.3</span>
              <span className="text-gray-300">•</span>
              <MessageSquare size={12} className="text-gray-400" />
              <span className="text-indigo-500 cursor-pointer">32 reviews</span>
              <span className="text-gray-300">•</span>
              <Award size={12} className="text-gray-400" />
              <span>154 sold</span>
            </div>

            {/* Pricing tiers */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-5 w-fit">
              {bulkPrices.map((tier, i) => (
                <div
                  key={i}
                  onClick={() => handleQuantityChange(tier.minQty)}
                  className={`px-5 py-2.5 text-center cursor-pointer transition-all ${i === selectedTier ? "bg-orange-50" : "bg-white hover:bg-gray-50"} ${i > 0 ? "border-l border-gray-200" : ""}`}
                >
                  <div className={`text-sm font-bold ${i === selectedTier ? "text-orange-500" : "text-gray-800"}`}>
                    Rs. {tier.price}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {tier.maxQty ? `${tier.minQty}–${tier.maxQty} pcs` : `${tier.minQty}+ pcs`}
                  </div>
                </div>
              ))}
            </div>

            {/* Specs table */}
            <table className="text-xs w-full max-w-md">
              <tbody>
                {[
                  ["Price", `Rs. ${activePrice}`],
                  ["Category", product.category],
                  ["Description", product.description],
                  ["Stock", `${product.stock} pcs`],
                  ["Customization", "Customized logo and design custom packages"],
                  ["Protection", "Refund Policy"],
                  ["Warranty", "2 years full warranty"],
                ].map(([label, value], i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 text-gray-400 w-28 align-top">{label}:</td>
                    <td className="py-2 text-gray-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-2 text-gray-500 hover:bg-gray-100 text-base leading-none"
                >−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  max={product.stock}
                  className="w-12 text-center py-2 text-sm outline-none border-x border-gray-200"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-2 text-gray-500 hover:bg-gray-100 text-base leading-none"
                >+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-2.5 rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:bg-gray-300 ${added ? "bg-green-500 hover:bg-green-500" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                {added ? (
                  <><span>✔</span> Added!</>
                ) : (
                  <><ShoppingCart size={15} /> Add to cart</>
                )}
              </button>
            </div>
          </div>

          {/* Seller card */}
          <div className="w-full lg:w-48 flex-shrink-0">
            <div className="border border-gray-200 rounded-lg p-4 mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">R</div>
                <div>
                  <div className="text-xs font-semibold text-gray-800">Supplier</div>
                  <div className="text-xs text-gray-400">Guanjoi Trading LLC</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-1.5 flex items-center gap-2">
                <span>🇩🇪</span> Germany, Berlin
              </div>
              <div className="text-xs text-gray-500 mb-1.5 flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Verified Seller
              </div>
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Worldwide shipping
              </div>
              <button className="w-full py-2 bg-indigo-600 text-white rounded-md text-xs font-semibold mb-2 hover:bg-indigo-700 transition-all">
                Send inquiry
              </button>
              <button className="w-full py-2 bg-white text-indigo-600 border border-indigo-500 rounded-md text-xs font-semibold hover:bg-indigo-50 transition-all">
                Seller's profile
              </button>
            </div>
            <button className="w-full py-2 bg-white text-indigo-500 border border-gray-200 rounded-md text-xs flex items-center justify-center gap-1.5 hover:bg-red-50 hover:text-red-400 hover:border-red-200 transition-all">
              <Heart size={13} /> Save for later
            </button>
          </div>

        </div>
      </div>

      {/* ── BOTTOM SECTION: tabs + you may like ── */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start">

          {/* Tabs block */}
          <div className="flex-1 bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Tab headers */}
            <div className="flex border-b border-gray-200">
              {["description", "reviews", "shipping", "about seller"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-xs font-medium capitalize transition-all border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-indigo-500 text-indigo-600 font-semibold"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-5">
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

              {/* Specs mini table */}
              <table className="w-full text-xs mb-5 border border-gray-200 rounded-lg overflow-hidden">
                <tbody>
                  {[
                    ["Model", "#8786867"],
                    ["Style", "Classic style"],
                    ["Certificate", "ISO-898921212"],
                    ["Size", "34mm x 450mm x 19mm"],
                    ["Memory", "36GB RAM"],
                  ].map(([label, value], i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 px-3 text-gray-500 w-32 bg-white">{label}</td>
                      <td className="py-2.5 px-3 text-gray-700 bg-white">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Features */}
              {[
                "Some great feature name here",
                "Lorem ipsum dolor sit amet, consectetur",
                "Duis aute irure dolor in reprehenderit",
                "Some great feature name here",
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs text-gray-500">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* You may like */}
          <div className="w-full lg:w-52 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-800 mb-3">You may like</div>
            <div className="flex flex-col gap-3">
              {youMayLike.map((item, i) => (
                <div key={i} className="flex gap-2 cursor-pointer group">
                  <img src={item.img} alt="" className="w-14 h-14 object-cover rounded border border-gray-100 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-600 leading-snug line-clamp-2 group-hover:text-indigo-500 transition-colors">{item.name}</div>
                    <div className="text-xs text-indigo-500 font-medium mt-1">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── PROMO BANNER ── */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <div className="bg-gradient-to-r from-indigo-700 to-violet-600 rounded-xl px-8 py-5 flex items-center justify-between relative overflow-hidden">
          <div
            className="absolute right-32 top-0 bottom-0 w-40 opacity-20"
            style={{
              background: "linear-gradient(135deg, transparent 40%, #93c5fd 40%)",
            }}
          />
          <div>
            <div className="text-white font-bold text-base mb-0.5">Super discount on more than 100 USD</div>
            <div className="text-indigo-200 text-xs">Have you ever finally just write dummy info</div>
          </div>
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-all whitespace-nowrap z-10">
            Shop now
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;