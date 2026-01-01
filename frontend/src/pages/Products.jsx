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
    toast.className = 'fixed top-20 right-4 bg-white border-2 border-green-500 px-6 py-4 rounded-xl shadow-2xl z-50';
    toast.innerHTML = `<div class="flex items-center gap-3"><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg><div><div class="font-bold text-gray-900">Added to cart!</div><div class="text-sm text-gray-600">${product.name}</div></div></div>`;
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-700 font-semibold">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-xl">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-bold">Premium Quality • Trusted by Thousands</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">Shop Smarter,<br /><span className="text-yellow-300">Live Better</span></h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto font-light">Discover premium products that blend quality, style, and value</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0,64 C240,120 480,120 720,80 C960,40 1200,40 1440,64 L1440,120 L0,120 Z" fill="rgb(255 247 237)" />
          </svg>
        </div>
      </div>

      <div className="relative -mt-16 mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-brand-primary">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-gray-900 mb-1">Best Prices</h3>
                  <p className="text-sm text-gray-600">Guaranteed lowest prices on all products</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-brand-secondary">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-secondary to-yellow-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-gray-900 mb-1">Free Shipping</h3>
                  <p className="text-sm text-gray-600">Fast & free delivery on every order</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-brand-dark">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-dark to-brand-primary rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-gray-900 mb-1">100% Secure</h3>
                  <p className="text-sm text-gray-600">Protected checkout with encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white p-8 mb-10">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <input type="text" placeholder="Search for your perfect product..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 text-gray-900 text-lg transition-all shadow-sm" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-gray-700 font-bold">
                <span>Browse:</span>
              </div>
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-3 text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg ${selectedCategory === cat ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white scale-110' : 'bg-white text-gray-700 hover:bg-orange-50'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-gray-700 font-semibold text-lg"><span className="text-brand-primary text-2xl font-black">{filteredProducts.length}</span> products found</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3" onClick={() => setSelectedProduct(product)} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-black px-4 py-2 rounded-full shadow-xl backdrop-blur-sm">{product.category}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-xl text-gray-900 mb-3 line-clamp-2 min-h-[56px] group-hover:text-brand-primary transition-colors">{product.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}</div>
                  <span className="text-sm text-gray-600 font-semibold">({Math.floor(Math.random() * 300) + 50})</span>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-gray-900">${parseFloat(product.price).toFixed(2)}</span>
                    <span className="text-base text-gray-500 line-through">${(parseFloat(product.price) * 1.3).toFixed(2)}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 mt-2 bg-green-100 text-green-700 text-xs font-black px-3 py-1.5 rounded-full">
                    <Award className="w-3 h-3" />Save 30%
                  </div>
                </div>
                <div className="mb-5 text-sm font-bold">
                  {product.stock_quantity > 10 ? (<span className="text-green-600 flex items-center gap-2"><div className="w-2 h-2 bg-green-600 rounded-full"></div>In Stock</span>) : product.stock_quantity > 0 ? (<span className="text-brand-primary flex items-center gap-2"><div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>Only {product.stock_quantity} left!</span>) : (<span className="text-red-600 flex items-center gap-2"><div className="w-2 h-2 bg-red-600 rounded-full"></div>Out of Stock</span>)}
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} disabled={product.stock_quantity === 0} className={`w-full py-4 rounded-2xl font-black text-base shadow-xl transition-all flex items-center justify-center gap-2 ${product.stock_quantity > 0 ? 'bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-dark hover:to-brand-primary text-white hover:shadow-2xl hover:scale-105 active:scale-95' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
                  <ShoppingCart className="w-5 h-5" />{product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button onClick={() => setSelectedProduct(product)} className="w-full mt-3 py-2 text-sm text-brand-primary hover:text-brand-dark font-bold transition-colors">View Full Details →</button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full mb-6 shadow-xl">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-600 mb-8 text-lg">Try different keywords or browse all categories</p>
            <button onClick={() => { setSearch(''); setSelectedCategory('All'); }} className="px-10 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">Show All Products</button>
          </div>
        )}
      </div>

      {selectedProduct && (<ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />)}
    </div>
  );
}
