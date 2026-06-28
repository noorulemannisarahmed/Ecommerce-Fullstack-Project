import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, Heart, Star, Award, ChevronRight, Shield, Globe } from "lucide-react";

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
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (id) {
      getProductById(id).then(data => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [id]);

  const bulkPrices = product?.bulkPrices?.length
    ? product.bulkPrices
    : [
        { minQty: 1, maxQty: 9, price: product?.price },
        { minQty: 10, maxQty: 49, price: Math.round(product?.price * 0.9) },
        { minQty: 50, maxQty: null, price: Math.round(product?.price * 0.8) },
      ];

  const getTierForQty = (qty) => {
    const idx = bulkPrices.findIndex(t => qty >= t.minQty && (t.maxQty === null || qty <= t.maxQty));
    return idx >= 0 ? idx : bulkPrices.length - 1;
  };

  const handleQuantityChange = (newQty) => {
    const clamped = Math.max(1, Math.min(product.stock, newQty));
    setQuantity(clamped);
    setSelectedTier(getTierForQty(clamped));
  };

  const handleAddToCart = () => {
    if (!user) { navigate("/login"); return; }
    if (product && !added) {
      const priceAtQty = bulkPrices[selectedTier]?.price ?? product.price;
      addToCart({ ...product, price: priceAtQty }, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const activePrice = product ? bulkPrices[selectedTier]?.price : 0;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF8" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-stone-400 font-medium">Loading product...</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF8" }}>
      <p className="text-stone-400 text-sm">Product not found</p>
    </div>
  );

  const thumbnails = [product.image];
  const mainImages = [product.image];

  const youMayLike = [
    { name: "Men Blazers Sets Elegant Formal", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
    { name: "Men Shirt Sleeve Polo Contrast", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop" },
    { name: "Apple Watch Series Space Gray", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop" },
    { name: "Basketball Crew Socks", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop" },
    { name: "New Summer Men's T-Shirts", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=80&h=80&fit=crop" },
  ];

  return (
    <div className="min-h-screen font-sans text-stone-800 text-sm" style={{ background: "#FAFAF8" }}>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-3 text-[10px] text-stone-400 flex items-center gap-1 font-medium">
        {["Home", "Clothings", "Men's wear", "Summer clothing"].map((crumb, i, arr) => (
          <React.Fragment key={crumb}>
            <span className={`cursor-pointer transition-colors ${i < arr.length - 1 ? "hover:text-amber-600" : "text-stone-600 font-semibold"}`}
              onClick={() => i === 0 && navigate("/")}>
              {crumb}
            </span>
            {i < arr.length - 1 && <ChevronRight size={10} className="text-stone-300" />}
          </React.Fragment>
        ))}
      </div>

      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col lg:flex-row gap-6 shadow-sm">

          {/* Image block */}
          <div className="flex-shrink-0 w-full lg:w-64">
            <div className="rounded-2xl overflow-hidden h-64 bg-stone-50 border border-stone-100 mb-3">
              <img src={mainImages[selectedImage]} alt={product.name}
                className="w-full h-full object-contain p-4" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {thumbnails.map((thumb, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-12 h-12 rounded-xl border-2 overflow-hidden transition-all ${i === selectedImage ? "border-amber-400 shadow-sm" : "border-stone-200 hover:border-stone-400"}`}>
                  <img src={thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex-1 min-w-0">
            {/* In stock badge */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-lg mb-3 uppercase tracking-wide">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </div>

            <h1 className="text-xl font-black text-stone-900 mb-3 leading-snug">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-stone-400 font-medium">9.3 · 17 reviews</span>
              <span className="text-xs text-stone-300">|</span>
              <span className="text-xs text-stone-400 font-medium">154 sold</span>
            </div>

            {/* Bulk pricing */}
            <div className="mb-4">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Bulk pricing</p>
              <div className="flex gap-2 flex-wrap">
                {bulkPrices.map((tier, i) => (
                  <button key={i} onClick={() => setSelectedTier(i)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${selectedTier === i
                      ? "border-amber-400 text-stone-900 shadow-sm"
                      : "border-stone-200 text-stone-500 hover:border-stone-300 bg-stone-50"}`}
                    style={selectedTier === i ? { background: "#FEF3C7" } : {}}>
                    <div className="font-black text-base leading-none">${tier.price}</div>
                    <div className="text-[10px] font-medium mt-0.5 text-stone-500">
                      {tier.minQty}{tier.maxQty ? `–${tier.maxQty}` : "+"} pcs
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-black text-stone-900">Rs. {activePrice}</span>
              <span className="text-xs text-stone-400">/ piece</span>
            </div>

            {/* Specs */}
            <div className="space-y-2 mb-5 border-t border-stone-100 pt-4">
              {[["Price", `$${activePrice} per piece`], ["Type", "Classic"], ["Material", "Mastercool 270"], ["Design", "Modern 2023"]].map(([k, v]) => (
                <div key={k} className="flex gap-3 text-xs">
                  <span className="text-stone-400 font-medium w-16 shrink-0">{k}</span>
                  <span className="text-stone-700 font-semibold">{v}</span>
                </div>
              ))}
            </div>

            {/* Quantity + CTA */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                <button onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-2.5 text-stone-700 hover:bg-stone-100 font-bold transition-colors text-sm">−</button>
                <span className="px-4 text-sm font-black text-stone-900 border-x border-stone-200">{quantity}</span>
                <button onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-2.5 text-stone-700 hover:bg-stone-100 font-bold transition-colors text-sm">+</button>
              </div>
              <button onClick={handleAddToCart} disabled={product.stock === 0}
                className={`flex-1 py-2.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${added ? "bg-emerald-500 text-white" : "text-stone-900"}`}
                style={!added ? { background: "#F59E0B" } : {}}>
                {added ? <><span>✓</span> Added to cart!</> : <><ShoppingCart size={15} /> Add to cart</>}
              </button>
              <button onClick={() => setWishlisted(!wishlisted)}
                className={`p-2.5 rounded-xl border transition-all ${wishlisted ? "border-red-200 bg-red-50" : "border-stone-200 hover:border-red-200 hover:bg-red-50"}`}>
                <Heart size={16} className={wishlisted ? "fill-red-400 text-red-400" : "text-stone-400"} />
              </button>
            </div>
          </div>

          {/* Seller card */}
          <div className="w-full lg:w-52 flex-shrink-0">
            <div className="border border-stone-200 rounded-2xl p-4 mb-3 bg-stone-50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{ background: "#1C1917" }}>R</div>
                <div>
                  <div className="text-xs font-black text-stone-900">Supplier</div>
                  <div className="text-[10px] text-stone-400">Guanjoi Trading LLC</div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[10px] text-stone-500 font-medium">
                  <span>🇩🇪</span> Germany, Berlin
                </div>
                <div className="flex items-center gap-2 text-[10px] text-stone-500 font-medium">
                  <Shield size={11} className="text-amber-500" /> Verified Seller
                </div>
                <div className="flex items-center gap-2 text-[10px] text-stone-500 font-medium">
                  <Globe size={11} className="text-blue-400" /> Worldwide shipping
                </div>
              </div>
              <button className="w-full py-2.5 font-bold text-stone-900 rounded-xl text-xs mb-2 transition-colors"
                style={{ background: "#F59E0B" }}>
                Send inquiry
              </button>
              <button className="w-full py-2.5 bg-white text-stone-700 border border-stone-200 rounded-xl text-xs font-bold hover:bg-stone-50 transition-colors">
                Seller's profile
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start">

          {/* Tabs */}
          <div className="flex-1 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex border-b border-stone-100 bg-stone-50">
              {["description", "reviews", "shipping", "about seller"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3.5 text-xs font-bold capitalize transition-all border-b-2 -mb-px ${activeTab === tab
                    ? "border-amber-400 text-stone-900 bg-white"
                    : "border-transparent text-stone-400 hover:text-stone-600 hover:bg-stone-50"}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="p-5">
              <p className="text-xs text-stone-500 leading-relaxed mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-xs text-stone-500 leading-relaxed mb-5">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>

              {/* Specs table */}
              <table className="w-full text-xs mb-5 border border-stone-100 rounded-xl overflow-hidden">
                <tbody>
                  {[["Model", "#8786867"], ["Style", "Classic style"], ["Certificate", "ISO-898921212"], ["Size", "34mm x 450mm x 19mm"], ["Memory", "36GB RAM"]].map(([label, value], i) => (
                    <tr key={i} className={`border-b border-stone-50 last:border-0 ${i % 2 === 0 ? "bg-stone-50/50" : "bg-white"}`}>
                      <td className="py-2.5 px-4 text-stone-400 font-medium w-32">{label}</td>
                      <td className="py-2.5 px-4 text-stone-700 font-semibold">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["Some great feature name here", "Lorem ipsum dolor sit amet consectetur", "Duis aute irure dolor in reprehenderit", "Some great feature name here"].map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 bg-stone-50 rounded-xl px-3 py-2.5">
                    <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 text-[8px] font-black">✓</span>
                    </div>
                    <span className="text-xs text-stone-600">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* You may like */}
          <div className="w-full lg:w-56 flex-shrink-0 bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-black text-stone-900 uppercase tracking-wider mb-3">You may like</p>
            <div className="flex flex-col gap-3">
              {youMayLike.map((item, i) => (
                <div key={i} className="flex gap-2.5 cursor-pointer group hover:bg-stone-50 rounded-xl p-1.5 -mx-1.5 transition-colors">
                  <img src={item.img} alt="" className="w-12 h-12 object-cover rounded-xl border border-stone-100 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-stone-600 leading-snug line-clamp-2 group-hover:text-stone-900 font-medium transition-colors">{item.name}</p>
                    <p className="text-xs font-black text-amber-600 mt-1">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* PROMO BANNER */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="rounded-2xl px-8 py-6 flex items-center justify-between relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1C1917 0%, #3D2B1F 100%)" }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #F59E0B 0%, transparent 55%)" }} />
          <div className="relative">
            <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-1">Limited offer</p>
            <div className="text-white font-black text-lg mb-0.5">Super discount on more than 100 USD</div>
            <div className="text-stone-400 text-xs">Valid while stocks last — don't miss out</div>
          </div>
          <button className="relative font-black text-stone-900 text-sm px-6 py-3 rounded-xl transition-opacity hover:opacity-90 whitespace-nowrap z-10 flex items-center gap-2"
            style={{ background: "#F59E0B" }}>
            Shop now <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;