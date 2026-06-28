import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDown, Heart, Grid3x3, List, X, Star, Menu, SlidersHorizontal } from "lucide-react";
import { getProducts } from "../services/api";

const categories = ["Mobile accessory", "Electronics", "Smartphones", "Modern tech"];
const brands = [
  { name: "Samsung", checked: true },
  { name: "Apple", checked: true },
  { name: "Huawei", checked: false },
  { name: "Poco", checked: true },
  { name: "Lenovo", checked: false },
];
const features = [
  { name: "Metallic", checked: true },
  { name: "Plastic cover", checked: false },
  { name: "8GB Ram", checked: false },
  { name: "Super power", checked: false },
  { name: "Large Memory", checked: false },
];
const conditions = [
  { name: "Any", checked: true },
  { name: "Refurbished", checked: false },
  { name: "Brand new", checked: false },
  { name: "Old items", checked: false },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12}
            className={i < Math.floor(rating / 2) ? "fill-amber-400 text-amber-400" : "text-stone-200"} />
        ))}
      </div>
      <span className="text-[10px] text-stone-400 font-medium">{rating}</span>
    </div>
  );
}

function ProductCard({ product, isListView, onProductClick }) {
  if (isListView) {
    return (
      <div className="border border-stone-200 rounded-2xl p-4 flex gap-4 mb-3 bg-white hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => onProductClick(product._id)}>
        <div className="w-24 h-24 sm:w-36 sm:h-28 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="text-sm font-bold text-stone-900 mb-1 line-clamp-2 leading-snug">{product.name}</h3>
            <span className="text-base font-black text-stone-900">Rs. {product.price}</span>
            <div className="mt-1">
              <StarRating rating={product.stock} />
            </div>
            <p className="text-xs text-stone-400 mt-1.5 line-clamp-2 hidden sm:block">{product.description}</p>
          </div>
          <span className="text-xs text-amber-600 font-bold hover:underline mt-1 inline-block">View details →</span>
        </div>
        <button className="flex-shrink-0 mt-1 p-2 rounded-xl border border-stone-200 hover:border-red-200 hover:bg-red-50 transition-colors h-fit">
          <Heart size={16} className="text-stone-400 hover:text-red-400 transition-colors" />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
      onClick={() => onProductClick(product._id)}>
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name}
          className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <button className="absolute top-2.5 right-2.5 bg-white rounded-xl p-2 shadow-sm border border-stone-100 hover:border-red-200 hover:bg-red-50 transition-colors"
          onClick={e => { e.stopPropagation(); }}>
          <Heart size={14} className="text-stone-400 hover:text-red-400 transition-colors" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-12"
          style={{ background: "linear-gradient(to top, rgba(28,25,23,0.4), transparent)" }} />
      </div>
      <div className="p-3">
        <p className="text-sm font-black text-stone-900 mb-1">Rs. {product.price}</p>
        <StarRating rating={product.stock} />
        <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-snug font-medium">{product.name}</p>
      </div>
    </div>
  );
}

export default function ProductListing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    brands: brands.filter(b => b.checked).map(b => b.name),
    features: features.filter(f => f.checked).map(f => f.name),
    ratings: ["4 star", "3 star"],
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts().then(data => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    if (urlSearch) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(urlSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(urlSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(urlSearch.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [urlSearch, products]);

  const removeFilter = (type, value) =>
    setSelectedFilters(prev => ({ ...prev, [type]: prev[type].filter(item => item !== value) }));

  const clearAllFilters = () =>
    setSelectedFilters({ brands: [], features: [], ratings: [] });

  const allFilters = [...selectedFilters.brands, ...selectedFilters.features, ...selectedFilters.ratings];

  const SidebarSection = ({ title, children }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 cursor-pointer">
        <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">{title}</h3>
        <ChevronDown size={14} className="text-stone-400" />
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen font-sans" style={{ background: "#FAFAF8" }}>
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setShowFilters(false)} />
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* Sidebar */}
        <div className={`fixed left-0 top-0 bottom-0 w-80 bg-white z-40 transform transition-transform duration-300 overflow-y-auto shadow-2xl lg:relative lg:transform-none lg:w-auto lg:z-0 lg:shadow-none ${showFilters ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="sticky top-0 bg-white px-4 py-4 border-b border-stone-100 lg:hidden flex justify-between items-center">
            <h2 className="font-black text-stone-900">Filters</h2>
            <button onClick={() => setShowFilters(false)}
              className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors">
              <X size={18} className="text-stone-600" />
            </button>
          </div>

          <div className="p-4 lg:p-0">

            {/* Category */}
            <SidebarSection title="Category">
              <div className="flex flex-col gap-0.5">
                {categories.map((cat, i) => (
                  <button key={cat}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${i === 0 ? "bg-amber-400 text-stone-900 font-bold" : "text-stone-600 hover:bg-stone-50"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </SidebarSection>

            {/* Brands */}
            <SidebarSection title="Brands">
              {brands.map(b => (
                <label key={b.name} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                  <input type="checkbox" defaultChecked={b.checked}
                    className="w-3.5 h-3.5 rounded accent-amber-500" />
                  <span className="text-xs text-stone-600 group-hover:text-stone-900 transition-colors">{b.name}</span>
                </label>
              ))}
            </SidebarSection>

            {/* Features */}
            <SidebarSection title="Features">
              {features.map(f => (
                <label key={f.name} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                  <input type="checkbox" defaultChecked={f.checked}
                    className="w-3.5 h-3.5 rounded accent-amber-500" />
                  <span className="text-xs text-stone-600 group-hover:text-stone-900 transition-colors">{f.name}</span>
                </label>
              ))}
            </SidebarSection>

            {/* Price range */}
            <SidebarSection title="Price range">
              <input type="range" className="w-full accent-amber-500 mb-2" />
              <div className="flex gap-2">
                <input placeholder="Min" className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-amber-400 bg-stone-50" />
                <input placeholder="Max" className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-amber-400 bg-stone-50" />
              </div>
              <button className="w-full mt-2 border border-stone-200 text-xs py-2 rounded-xl hover:bg-stone-50 font-semibold text-stone-700 transition-colors">
                Apply
              </button>
            </SidebarSection>

            {/* Condition */}
            <SidebarSection title="Condition">
              {conditions.map(c => (
                <label key={c.name} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                  <input type="radio" name="condition" defaultChecked={c.checked}
                    className="w-3.5 h-3.5 accent-amber-500" />
                  <span className="text-xs text-stone-600 group-hover:text-stone-900 transition-colors">{c.name}</span>
                </label>
              ))}
            </SidebarSection>

            {/* Ratings */}
            <SidebarSection title="Ratings">
              {[5, 4, 3, 2].map(stars => (
                <label key={stars} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded accent-amber-500" />
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11}
                        className={i < stars ? "fill-amber-400 text-amber-400" : "text-stone-200"} />
                    ))}
                  </div>
                </label>
              ))}
            </SidebarSection>

          </div>
        </div>

        {/* Products area */}
        <div className="lg:col-span-3">

          {/* Toolbar */}
          <div className="bg-white rounded-2xl border border-stone-200 p-3 sm:p-4 mb-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-sm font-black text-stone-900">{filteredProducts.length} items</span>
                {urlSearch && <span className="text-xs text-stone-400 ml-2">for "{urlSearch}"</span>}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <label className="flex items-center gap-2 text-xs cursor-pointer text-stone-600 font-medium">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-amber-500" />
                  Only Verified
                </label>
                <select className="border border-stone-200 rounded-xl px-3 py-1.5 text-xs bg-stone-50 text-stone-700 font-semibold focus:border-amber-400 outline-none">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {/* Active filters */}
            {allFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center mb-3">
                {allFilters.map(filter => (
                  <div key={filter}
                    className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-2.5 py-1 text-xs flex items-center gap-1.5 font-semibold">
                    {filter}
                    <X size={11} className="cursor-pointer hover:text-amber-900"
                      onClick={() => {
                        if (selectedFilters.brands.includes(filter)) removeFilter("brands", filter);
                        else if (selectedFilters.features.includes(filter)) removeFilter("features", filter);
                        else removeFilter("ratings", filter);
                      }} />
                  </div>
                ))}
                <button onClick={clearAllFilters}
                  className="text-xs text-stone-400 hover:text-stone-700 font-semibold underline transition-colors">
                  Clear all
                </button>
              </div>
            )}

            <div className="flex gap-2 justify-between items-center">
              <button onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs px-3 py-2 border border-stone-200 rounded-xl hover:bg-stone-50 font-semibold text-stone-700 transition-colors">
                <SlidersHorizontal size={14} /> Filters
              </button>
              <div className="flex gap-1.5 ml-auto">
                <button onClick={() => setIsGridView(true)}
                  className={`p-2 rounded-xl transition-all ${isGridView ? "bg-stone-900 text-white" : "bg-stone-50 border border-stone-200 text-stone-500 hover:bg-stone-100"}`}>
                  <Grid3x3 size={15} />
                </button>
                <button onClick={() => setIsGridView(false)}
                  className={`p-2 rounded-xl transition-all ${!isGridView ? "bg-stone-900 text-white" : "bg-stone-50 border border-stone-200 text-stone-500 hover:bg-stone-100"}`}>
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length === 0 && products.length > 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-stone-200 text-center px-4">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-base font-black text-stone-900 mb-1">No results for "{urlSearch}"</h3>
              <p className="text-xs text-stone-400 mb-5">Try different keywords or browse all products</p>
              <button onClick={() => navigate("/products")}
                className="font-bold text-stone-900 text-xs px-6 py-2.5 rounded-xl transition-colors"
                style={{ background: "#F59E0B" }}>
                Browse all products
              </button>
            </div>
          ) : (
            <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" : "block"}>
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product}
                  isListView={!isGridView} onProductClick={id => navigate(`/products/${id}`)} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-5 flex-wrap gap-2">
            <select className="border border-stone-200 rounded-xl px-3 py-2 text-xs bg-white font-semibold text-stone-700 focus:border-amber-400 outline-none">
              <option>Show 10</option>
              <option>Show 20</option>
              <option>Show 50</option>
            </select>
            <div className="flex gap-1.5">
              <button className="px-3 py-2 border border-stone-200 rounded-xl text-xs font-bold hover:bg-stone-50 transition-colors text-stone-600">&lt;</button>
              {[1, 2, 3].map(page => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${currentPage === page
                    ? "text-stone-900 shadow-sm"
                    : "border border-stone-200 hover:bg-stone-50 text-stone-600"}`}
                  style={currentPage === page ? { background: "#F59E0B" } : {}}>
                  {page}
                </button>
              ))}
              <button className="px-3 py-2 border border-stone-200 rounded-xl text-xs font-bold hover:bg-stone-50 transition-colors text-stone-600">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}