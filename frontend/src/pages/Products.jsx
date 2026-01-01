import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { useCartStore } from '../store';
import { Search, ShoppingCart, Star, TrendingUp, Truck, Shield, Award, Sparkles } from 'lucide-react';
import ProductModal from '../components/ProductModal';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addItem(product);
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-4 bg-white border-l-4 border-brand-emerald px-6 py-4 rounded-lg shadow-2xl z-50';
    toast.innerHTML = `<div class="flex items-center gap-3"><svg class="w-5 h-5 text-brand-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><div><div class="font-semibold text-gray-900">Added to cart</div><div class="text-sm text-gray-600">${product.name}</div></div></div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-navy border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Professional Hero */}
      <div className="bg-gradient-to-br from-brand-navy via-blue-900 to-brand-navy relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span className="text-sm text-white font-medium">Premium Quality • Trusted by Thousands</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                Shop Smarter,
              </h1>
              <h1 className="text-5xl md:text-6xl font-bold text-blue-200 leading-tight">
                Live Better
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover premium products that blend quality, style, and value
            </p>
          </div>
        </div>

        {/* Subtle wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
            <path d="M0,40 C320,70 640,10 960,40 C1280,70 1440,40 1440,40 L1440,80 L0,80 Z" fill="rgb(249 250 251)" />
          </svg>
        </div>
      </div>

      {/* Trust Badges - Clean & Minimal */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 justify-center">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-brand-navy" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Best Prices</div>
                <div className="text-sm text-gray-600">Guaranteed lowest prices</div>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-brand-emerald" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Free Shipping</div>
                <div className="text-sm text-gray-600">Fast delivery on all orders</div>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-brand-navy" />
              </div>
              <div>
                <div className="font-bold text-gray-900">100% Secure</div>
                <div className="text-sm text-gray-600">Protected checkout</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter - Clean Design */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-5">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for your perfect product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent bg-white text-gray-900"
              />
            </div>

            {/* Categories - Clean Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 mr-2">Browse:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-navy text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium">
            <span className="text-brand-navy font-bold text-lg">{filteredProducts.length}</span> products found
          </p>
        </div>

        {/* Products Grid - Clean Professional Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-brand-navy hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image */}
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 backdrop-blur-sm text-brand-navy text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    {product.category}
                  </span>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                    -30%
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[56px] group-hover:text-brand-navy transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 font-medium ml-1">
                    ({Math.floor(Math.random() * 300) + 50})
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${(parseFloat(product.price) * 1.3).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-brand-emerald font-semibold mt-1">
                    Save 30%
                  </div>
                </div>

                {/* Stock */}
                <div className="mb-4 text-sm font-medium">
                  {product.stock_quantity > 10 ? (
                    <span className="text-brand-emerald flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-brand-emerald rounded-full"></div>
                      In Stock
                    </span>
                  ) : product.stock_quantity > 0 ? (
                    <span className="text-orange-600 flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
                      Only {product.stock_quantity} left
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  disabled={product.stock_quantity === 0}
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    product.stock_quantity > 0
                      ? 'bg-brand-navy text-white hover:bg-blue-900 shadow-md hover:shadow-lg'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full mt-2 py-2 text-sm text-brand-navy hover:text-blue-900 font-semibold transition-colors"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try different keywords or browse all categories</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
              }}
              className="px-8 py-3 bg-brand-navy text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-blue-900 transition-all"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
