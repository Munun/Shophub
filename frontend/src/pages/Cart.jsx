import { useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../store';
import { Trash2, Plus, Minus, ShoppingBag, Lock, Truck, RotateCcw, ArrowRight, Tag } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const user = useAuthStore((state) => state.user);

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full mb-8 shadow-2xl">
            <ShoppingBag className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-lg text-gray-600 mb-8">Discover amazing products and start shopping!</p>
          <button 
            onClick={() => navigate('/products')} 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-4 rounded-2xl hover:shadow-xl font-black text-lg transition-all hover:scale-105"
          >
            Start Shopping
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-lg text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-brand-primary">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-black text-xl text-gray-900 mb-1">{item.name}</h3>
                        {item.selectedSize && (
                          <p className="text-sm text-gray-600 mb-2">
                            Size: <span className="font-bold text-brand-primary">{item.selectedSize}</span>
                          </p>
                        )}
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{item.category}</p>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-black text-gray-900">
                        ${parseFloat(item.price).toFixed(2)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 font-semibold">Quantity:</span>
                        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-brand-primary hover:text-white transition-all font-bold shadow-sm"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-black text-lg">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-brand-primary hover:text-white transition-all font-bold shadow-sm"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Subtotal */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-semibold">Item Total:</span>
                      <span className="text-2xl font-black text-brand-primary">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Button */}
            <button
              onClick={() => navigate('/products')}
              className="w-full py-4 px-6 bg-white border-2 border-gray-200 rounded-2xl font-bold text-gray-700 hover:border-brand-primary hover:text-brand-primary transition-all"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sticky top-24 border-2 border-brand-light">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>
              
              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Subtotal ({items.length} items)</span>
                  <span className="font-bold">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Shipping</span>
                  <span className="font-bold text-brand-secondary flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    FREE
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">Tax</span>
                  <span className="font-bold">Calculated at checkout</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-gray-200 my-6"></div>

              {/* Total */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-black text-gray-900">Total</span>
                <span className="text-4xl font-black text-brand-primary">
                  ${getTotal().toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={handleCheckout} 
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-5 rounded-2xl hover:shadow-2xl font-black text-lg transition-all flex items-center justify-center gap-3 mb-4 hover:scale-105 active:scale-95"
              >
                <Lock className="w-5 h-5" />
                Secure Checkout
              </button>

              {/* Trust Badges */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-semibold">Secure SSL Encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <RotateCcw className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-semibold">30-Day Easy Returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-semibold">Free Shipping Always</span>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-5 h-5 text-brand-primary" />
                  <span className="font-bold text-gray-900">Have a promo code?</span>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-primary focus:outline-none"
                  />
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
