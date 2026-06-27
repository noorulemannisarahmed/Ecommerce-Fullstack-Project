import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ChevronDown,
  Heart,
  Grid3x3,
  List,
  X,
  Star,
  Menu,
} from "lucide-react";
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
          <Star
            key={i}
            size={14}
            className={i < Math.floor(rating / 2) ? "fill-orange-400 text-orange-400" : "text-gray-300"}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">{rating}</span>
    </div>
  );
}

function ProductCard({ product, isListView, onProductClick }) {
  if (isListView) {
    return (
      <div className="border border-gray-200 rounded-lg p-3 sm:p-4 flex gap-3 sm:gap-5 mb-4 bg-white hover:shadow-md transition-shadow">
        <img src={product.image} alt={product.name} className="w-24 h-20 sm:w-40 sm:h-32 object-cover rounded flex-shrink-0" />
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">{product.name}</h3>
            <div className="flex items-center gap-2 mb-1 sm:mb-2 flex-wrap">
              <span className="text-sm sm:text-lg font-bold text-gray-900">Rs. {product.price}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
              <StarRating rating={product.stock} />
              <span className="text-xs text-gray-500">Stock: {product.stock}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 line-clamp-2 hidden sm:block">
              {product.description}
            </p>
          </div>
          <button
            onClick={() => onProductClick(product._id)}
            className="text-xs text-indigo-600 font-medium inline-block hover:underline"
          >
            View details
          </button>
        </div>
        <Heart className="text-indigo-500 hover:text-red-600 cursor-pointer flex-shrink-0 mt-1" size={24} />
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer" onClick={() => onProductClick(product._id)}>
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-32 sm:h-48 lg:h-64 object-cover" />
        <Heart className="absolute top-2 right-2 sm:top-3 sm:right-3 text-indigo-500 hover:text-red-600 cursor-pointer bg-white rounded-full p-1.5 sm:p-2 shadow-md" size={40} />
      </div>
      <div className="p-2 sm:p-4">
        <div className="flex gap-2 mb-2">
          <span className="text-sm sm:text-lg font-bold text-gray-900">Rs. {product.price}</span>
        </div>
        <StarRating rating={product.stock} />
        <span className="text-xs sm:text-sm text-gray-500 ml-1">Stock: {product.stock}</span>
        <p className="text-xs sm:text-sm font-medium text-gray-600 mt-2 line-clamp-2">{product.name}</p>
      </div>
    </div>
  );
}

export default function ProductListing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

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

  const removeFilter = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value),
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({ brands: [], features: [], ratings: [] });
  };

  const allFilters = [...selectedFilters.brands, ...selectedFilters.features, ...selectedFilters.ratings];

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-gray-900 font-sans">
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4 grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 bottom-0 w-80 bg-white z-40 transform transition-transform duration-300 overflow-y-auto lg:relative lg:transform-none lg:w-auto lg:z-0 ${showFilters ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="sticky top-0 bg-white p-4 border-b lg:hidden flex justify-between items-center z-50">
            <h2 className="font-bold">Filters</h2>
            <button onClick={() => setShowFilters(false)} className="text-gray-600 hover:text-gray-900">
              <X size={24} />
            </button>
          </div>

          <div className="p-4 lg:p-0">
            {/* Category */}
            <div className="bg-white lg:bg-transparent rounded-lg lg:rounded-none border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <h3 className="font-semibold text-sm">Category</h3>
                <ChevronDown size={16} />
              </div>
              {categories.map(cat => (
                <div key={cat} className="text-xs text-gray-600 py-2 hover:text-indigo-600 cursor-pointer">
                  {cat}
                </div>
              ))}
            </div>

            {/* Brands */}
            <div className="bg-white lg:bg-transparent rounded-lg lg:rounded-none border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <h3 className="font-semibold text-sm">Brands</h3>
                <ChevronDown size={16} />
              </div>
              {brands.map(brand => (
                <label key={brand.name} className="flex items-center gap-2 py-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={brand.checked} className="w-4 h-4 text-indigo-600 accent-blue-600" />
                  <span className="text-xs text-gray-600">{brand.name}</span>
                </label>
              ))}
              <div className="text-xs text-indigo-600 font-medium mt-2 cursor-pointer">See all</div>
            </div>

            {/* Features */}
            <div className="bg-white lg:bg-transparent rounded-lg lg:rounded-none border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <h3 className="font-semibold text-sm">Features</h3>
                <ChevronDown size={16} />
              </div>
              {features.map(feature => (
                <label key={feature.name} className="flex items-center gap-2 py-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={feature.checked} className="w-4 h-4 text-indigo-600 accent-blue-600" />
                  <span className="text-xs text-gray-600">{feature.name}</span>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className="bg-white lg:bg-transparent rounded-lg lg:rounded-none border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <h3 className="font-semibold text-sm">Price range</h3>
                <ChevronDown size={16} />
              </div>
              <input type="range" className="w-full" />
              <div className="flex gap-2 mt-3 flex-col sm:flex-row">
                <input placeholder="Min" className="w-full min-w-0 flex-1 border border-gray-200 rounded px-2 py-1 text-xs" />
                <input placeholder="Max" className="w-full min-w-0 flex-1 border border-gray-200 rounded px-2 py-1 text-xs" />
              </div>
              <button className="w-full mt-3 bg-white border border-gray-200 text-xs py-2 rounded hover:bg-gray-50">
                Apply
              </button>
            </div>

            {/* Condition */}
            <div className="bg-white lg:bg-transparent rounded-lg lg:rounded-none border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <h3 className="font-semibold text-sm">Condition</h3>
                <ChevronDown size={16} />
              </div>
              {conditions.map(cond => (
                <label key={cond.name} className="flex items-center gap-2 py-2 cursor-pointer">
                  <input type="radio" name="condition" defaultChecked={cond.checked} className="w-4 h-4 text-indigo-600 accent-blue-600" />
                  <span className="text-xs text-gray-600">{cond.name}</span>
                </label>
              ))}
            </div>

            {/* Ratings */}
            <div className="bg-white lg:bg-transparent rounded-lg lg:rounded-none border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <h3 className="font-semibold text-sm">Ratings</h3>
                <ChevronDown size={16} />
              </div>
              {[5, 4, 3, 2].map(stars => (
                <label key={stars} className="flex items-center gap-2 py-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 accent-blue-600" />
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < stars ? "fill-orange-400 text-orange-400" : "text-gray-300"} />
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {/* Filter Pills */}
          <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-4 mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3">
              <span className="text-xs sm:text-sm font-medium">{filteredProducts.length} items found</span>
              <div className="flex items-center gap-2 flex-wrap">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                  Verified only
                </label>
                <select className="border border-gray-200 rounded px-2 py-1 text-xs bg-white">
                  <option>Featured</option>
                </select>
              </div>
            </div>

            {allFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center mb-3">
                {allFilters.map(filter => (
                  <div
                    key={filter}
                    className="border border-indigo-400 text-indigo-600 bg-indigo-50 rounded-full px-2 sm:px-3 py-1 text-xs flex items-center gap-2"
                  >
                    {filter}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-indigo-700"
                      onClick={() => {
                        if (selectedFilters.brands.includes(filter)) removeFilter("brands", filter);
                        else if (selectedFilters.features.includes(filter)) removeFilter("features", filter);
                        else if (selectedFilters.ratings.includes(filter)) removeFilter("ratings", filter);
                      }}
                    />
                  </div>
                ))}
                <button onClick={clearAllFilters} className="text-indigo-600 text-xs font-medium hover:underline">
                  Clear all
                </button>
              </div>
            )}

            <div className="flex gap-2 justify-between items-center">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-1 text-xs px-3 py-2 border border-gray-200 rounded hover:bg-gray-50"
              >
                <Menu size={16} /> Filters
              </button>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-2 rounded ${isGridView ? "bg-gray-200" : "bg-white border border-gray-200"}`}
                >
                  <Grid3x3 size={16} />
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-2 rounded ${!isGridView ? "bg-gray-200" : "bg-white border border-gray-200"}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length === 0 && products.length > 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-gray-200 text-center px-4">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">No results for "{urlSearch}"</h3>
              <p className="text-xs text-gray-500 mb-5">Try different keywords or check your spelling</p>
              <button
                onClick={() => navigate('/products')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-5 py-2.5 rounded-lg transition-all"
              >
                Clear search & browse all
              </button>
            </div>
          ) : (
            <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" : "block"}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isListView={!isGridView}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 sm:mt-6 flex-wrap gap-2">
            <select className="border border-gray-200 rounded px-2 sm:px-3 py-1 sm:py-2 text-xs bg-white">
              <option>Show 10</option>
              <option>Show 20</option>
              <option>Show 50</option>
            </select>
            <div className="flex gap-1">
              <button className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-200 rounded text-xs hover:bg-gray-50">&lt;</button>
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 sm:px-3 py-1 sm:py-2 rounded text-xs ${currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "border border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-200 rounded text-xs hover:bg-gray-50">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}