import React, { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { User, Search, Archive, Send, Globe, ChevronRight, Zap } from "lucide-react";
import { getProducts } from "../services/api";

const categories = [
  "Automobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
  "More category",
];

const timer = [
  { label: "Days", value: "04" },
  { label: "Hour", value: "13" },
  { label: "Min", value: "34" },
  { label: "Sec", value: "56" },
];

const dealProducts = [
  { name: "Smart watches", discount: "-25%", img: "https://picsum.photos/seed/dealwatch/120/120" },
  { name: "Laptops", discount: "-15%", img: "https://picsum.photos/seed/deallaptop/120/120" },
  { name: "GoPro cameras", discount: "-40%", img: "https://picsum.photos/seed/dealgopro/120/120" },
  { name: "Headphones", discount: "-25%", img: "https://picsum.photos/seed/dealheadphones/120/120" },
  { name: "Canon cameras", discount: "-25%", img: "https://picsum.photos/seed/dealcanon/120/120" },
];

const recommendedItems = [
  { name: "T-shirts with multiple colors, for men", price: "10.30", img: "https://picsum.photos/seed/tshirt/300/240" },
  { name: "Jeans shorts for men blue color", price: "10.30", img: "https://picsum.photos/seed/jeansshorts/300/240" },
  { name: "Brown winter coat medium size", price: "12.50", img: "https://picsum.photos/seed/wintercoat/300/240" },
  { name: "Jeans bag for travel for men", price: "34.00", img: "https://picsum.photos/seed/jeansbag1/300/240" },
  { name: "Leather wallet", price: "99.00", img: "https://picsum.photos/seed/leatherwallet/300/240" },
  { name: "Canon camera black, 100x zoom", price: "9.99", img: "https://picsum.photos/seed/canonblack/300/240" },
  { name: "Headset for gaming with mic", price: "8.99", img: "https://picsum.photos/seed/gamingheadset/300/240" },
  { name: "Smartwatch silver color modern", price: "10.30", img: "https://picsum.photos/seed/silverwatch/300/240" },
  { name: "Blue wallet for men leather material", price: "10.30", img: "https://picsum.photos/seed/bluewallet/300/240" },
  { name: "Jeans bag for travel for men", price: "80.95", img: "https://picsum.photos/seed/jeansbag2/300/240" },
];

const services = [
  { title: "Source from Industry Hubs", icon: Search, img: "https://picsum.photos/seed/sourcehub/300/200" },
  { title: "Customize Your Products", icon: Archive, img: "https://picsum.photos/seed/customize/300/200" },
  { title: "Fast, reliable shipping by ocean or air", icon: Send, img: "https://picsum.photos/seed/shipping/300/200" },
  { title: "Product monitoring and inspection", icon: Globe, img: "https://picsum.photos/seed/monitoring/300/200" },
];

const regions = [
  { name: "Arabic Emirates", domain: "shopname.ae", flag: "AE" },
  { name: "Australia", domain: "shopname.au", flag: "AU" },
  { name: "United States", domain: "shopname.us", flag: "US" },
  { name: "Russia", domain: "shopname.ru", flag: "RU" },
  { name: "Italy", domain: "shopname.it", flag: "IT" },
  { name: "Denmark", domain: "shopname.dk", flag: "DK" },
  { name: "France", domain: "shopname.fr", flag: "FR" },
  { name: "Arabic Emirates", domain: "shopname.ae", flag: "AE" },
  { name: "China", domain: "shopname.cn", flag: "CN" },
  { name: "Great Britain", domain: "shopname.co.uk", flag: "GB" },
];

function CategoryShowcase({ title, bgImage, products }) {
  return (
    <div className="rounded-2xl overflow-hidden grid grid-cols-12 border border-stone-200 bg-white shadow-sm">
      <div className="col-span-12 md:col-span-3 relative min-h-[180px]">
        <img src={bgImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-stone-900/20 p-5 flex flex-col justify-between">
          <h3 className="font-bold text-white text-lg leading-snug drop-shadow">{title}</h3>
          <button className="bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold px-4 py-2 rounded-lg w-fit transition-colors flex items-center gap-1">
            Source now <ChevronRight size={13} />
          </button>
        </div>
      </div>
      <div className="col-span-12 md:col-span-9 grid grid-cols-2 sm:grid-cols-4">
        {products.map((p, i) => {
          const isLastColDesktop = (i + 1) % 4 === 0;
          const isLastRowDesktop = i >= products.length - 4;
          const borderClasses = [
            "border-b border-stone-100",
            isLastColDesktop ? "sm:border-r-0" : "sm:border-r sm:border-stone-100",
            isLastRowDesktop ? "sm:border-b-0" : "",
          ].join(" ");
          return (
            <div key={i} className={`flex items-center justify-between gap-3 p-4 hover:bg-amber-50 transition-colors cursor-pointer ${borderClasses}`}>
              <div>
                <p className="text-xs text-stone-700 font-semibold mb-1 leading-snug">{p.name}</p>
                <p className="text-[10px] text-stone-400">From</p>
                <p className="text-xs text-amber-600 font-bold">USD {p.price}</p>
              </div>
              <img src={p.img} alt={p.name} className="w-12 h-12 object-cover rounded-lg shrink-0 border border-stone-100" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen font-sans" style={{ background: "#FAFAF8", color: "#1C1917" }}>

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-12 gap-4">

        {/* Category Sidebar */}
        <div className="hidden lg:block col-span-2 bg-white rounded-2xl border border-stone-200 overflow-hidden h-fit shadow-sm">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-4 pt-4 pb-2">Browse</p>
          {categories.map((c, i) => (
            <button
              key={c}
              onClick={() => setActiveCategory(i)}
              className={`w-full text-left px-4 py-2.5 text-xs transition-all flex items-center justify-between group ${
                i === activeCategory
                  ? "bg-amber-400 text-stone-900 font-bold"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              }`}
            >
              {c}
              {i === activeCategory && <ChevronRight size={12} />}
            </button>
          ))}
        </div>

        {/* Hero Banner */}
        <div className="col-span-12 lg:col-span-7 rounded-2xl overflow-hidden relative min-h-[320px] flex items-end"
          style={{ background: "linear-gradient(135deg, #1C1917 0%, #292524 60%, #3D2B1F 100%)" }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #F59E0B 0%, transparent 60%)" }} />
          <div className="relative z-10 p-8 pb-10 max-w-xs">
            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-stone-900 text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              <Zap size={10} /> Trending now
            </span>
            <h1 className="text-4xl font-black text-white mb-2 leading-tight">Electronic<br />Items</h1>
            <p className="text-stone-400 text-sm mb-5">Latest gadgets at unbeatable prices</p>
            <button className="bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
              Explore now
            </button>
          </div>
          <img
            src="https://picsum.photos/seed/herotech/420/300"
            alt="trending electronics"
            className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-60"
            style={{ maskImage: "linear-gradient(to right, transparent, black 40%)" }}
          />
        </div>

        {/* Right Cards */}
        <div className="col-span-12 lg:col-span-3 flex flex-row lg:flex-col gap-3">
          <div className="bg-white rounded-2xl border border-stone-200 p-4 flex-1 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                <User size={18} className="text-stone-500" />
              </div>
              <div>
                <p className="text-xs text-stone-400">Welcome back</p>
                <p className="text-sm font-bold text-stone-800">Hi, User!</p>
              </div>
            </div>
            <button className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-xl py-2.5 text-sm font-bold mb-2 transition-colors">
              Join now
            </button>
            <button className="w-full border border-stone-200 rounded-xl py-2.5 text-sm font-semibold hover:bg-stone-50 text-stone-700 transition-colors">
              Log in
            </button>
          </div>
          <div className="rounded-2xl p-4 flex-1 flex items-center font-bold text-sm leading-snug"
            style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#1C1917" }}>
            Get US $10 off with a new supplier
          </div>
          <div className="rounded-2xl p-4 flex-1 flex items-center font-bold text-sm leading-snug text-white"
            style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
            Send quotes with supplier preferences
          </div>
        </div>
      </section>

      {/* ── DEALS ── */}
      <section className="max-w-7xl mx-auto px-4 py-3">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 items-center shadow-sm">
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Limited time</p>
            <h3 className="font-black text-xl text-stone-900">Deals & Offers</h3>
            <p className="text-xs text-stone-400 mb-3">Hygiene equipments</p>
            <div className="flex gap-1.5">
              {timer.map((t) => (
                <div key={t.label} className="rounded-xl px-2.5 py-2 text-center min-w-[44px]"
                  style={{ background: "#1C1917" }}>
                  <div className="text-sm font-black text-amber-400 leading-none">{t.value}</div>
                  <div className="text-[9px] text-stone-400 mt-0.5 uppercase tracking-wide">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
          {dealProducts.map((p) => (
            <div key={p.name} className="text-center group cursor-pointer">
              <div className="relative bg-stone-50 rounded-xl p-3 mb-2 border border-stone-100 group-hover:border-amber-300 transition-all">
                <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-lg font-bold">
                  {p.discount}
                </span>
                <img src={p.img} alt={p.name} className="h-16 w-full object-cover rounded-lg mx-auto" />
              </div>
              <p className="text-xs text-stone-600 font-medium">{p.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORY SHOWCASES ── */}
      <section className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-4">
        <CategoryShowcase
          title="Home and outdoor"
          bgImage="https://loremflickr.com/400/400/livingroom,sofa?lock=301"
          products={products}
        />
        <CategoryShowcase
          title="Consumer electronics and gadgets"
          bgImage="https://loremflickr.com/400/400/gadgets,electronics?lock=302"
          products={products}
        />
      </section>

      {/* ── SEND QUOTE CTA ── */}
      <section className="max-w-7xl mx-auto px-4 py-5">
        <div className="relative rounded-2xl overflow-hidden grid grid-cols-12 min-h-[260px]">
          <img src="https://picsum.photos/seed/shippingport/1200/400" alt="shipping"
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #1C1917ee 40%, #1C191766)" }} />
          <div className="relative col-span-12 md:col-span-6 p-8 md:p-10 flex flex-col justify-center text-white">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">Easy sourcing</span>
            <h2 className="text-2xl font-black mb-3 max-w-sm leading-snug">
              An easy way to send requests to all suppliers
            </h2>
            <p className="text-sm text-stone-400 max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>
          <div className="relative col-span-12 md:col-span-6 flex items-center md:justify-end p-6 md:p-8">
            <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-xl border border-stone-100">
              <h3 className="font-black text-stone-900 text-sm mb-1">Send quote to suppliers</h3>
              <p className="text-xs text-stone-400 mb-3">Fill the form and connect instantly</p>
              <input placeholder="What item you need?"
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-xs mb-2 outline-none focus:border-amber-400 transition-colors bg-stone-50" />
              <textarea placeholder="Type more details"
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-xs mb-2 h-16 resize-none outline-none focus:border-amber-400 transition-colors bg-stone-50" />
              <div className="flex gap-2 mb-3">
                <input placeholder="Quantity"
                  className="flex-1 border border-stone-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-amber-400 transition-colors bg-stone-50" />
                <select className="border border-stone-200 rounded-xl px-3 text-xs text-stone-600 bg-stone-50">
                  <option>Pcs</option>
                </select>
              </div>
              <button className="w-full font-bold text-stone-900 rounded-xl py-2.5 text-xs transition-colors"
                style={{ background: "#F59E0B" }}
                onMouseOver={e => e.target.style.background = "#D97706"}
                onMouseOut={e => e.target.style.background = "#F59E0B"}>
                Send inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED ITEMS ── */}
      <section className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-xl text-stone-900">Recommended items</h3>
          <button className="text-xs text-amber-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View all <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {recommendedItems.map((p, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white border border-stone-200 hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group">
              <div className="overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <p className="font-black text-sm text-stone-900 mb-1">${p.price}</p>
                <p className="text-xs text-stone-500 leading-snug line-clamp-2">{p.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXTRA SERVICES ── */}
      <section className="max-w-7xl mx-auto px-4 py-5">
        <h3 className="font-black text-xl text-stone-900 mb-4">Our extra services</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="relative rounded-2xl overflow-hidden h-36 group cursor-pointer">
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-stone-900/50 group-hover:bg-stone-900/60 transition-colors" />
                <div className="absolute top-3 right-3 bg-amber-400 rounded-xl p-2">
                  <Icon size={14} className="text-stone-900" />
                </div>
                <p className="absolute bottom-3 left-3 right-10 text-white text-xs font-bold leading-snug">
                  {s.title}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SUPPLIERS BY REGION ── */}
      <section className="max-w-7xl mx-auto px-4 py-3 pb-10">
        <h3 className="font-black text-xl text-stone-900 mb-4">Suppliers by region</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {regions.map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer">
              <ReactCountryFlag countryCode={r.flag} svg style={{ width: "22px", height: "22px", borderRadius: "4px" }} />
              <div>
                <p className="text-xs font-semibold text-stone-800 leading-tight">{r.name}</p>
                <p className="text-[10px] text-stone-400 leading-tight">{r.domain}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}