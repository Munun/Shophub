import { X, Star, ShoppingCart, Package, Truck, Shield } from 'lucide-react';
import { useState } from 'react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'One Size');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({ ...product, selectedSize, quantity });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <Truck className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-xs font-semibold text-green-700">Free Shipping</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <Shield className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-xs font-semibold text-blue-700">Secure Payment</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                  <Package className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-xs font-semibold text-purple-700">Easy Returns</div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({Math.floor(Math.random() * 400) + 100} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${(parseFloat(product.price) * 1.3).toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-700 text-sm font-bold px-2 py-1 rounded">
                  Save 30%
                </span>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${product.stock_quantity > 10 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                <span className="text-sm font-semibold text-gray-700">
                  {product.stock_quantity > 10 ? 'In Stock' : `Only ${product.stock_quantity} left!`}
                </span>
              </div>

              {/* Short Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Full Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.full_description || product.description + ' This premium product features high-quality materials, excellent craftsmanship, and modern design. Perfect for everyday use with outstanding durability and performance.'}
                </p>
              </div>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedSize === size
                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                  >
                    −
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  product.stock_quantity > 0
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              {/* Features */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Free Shipping</div>
                    <div className="text-sm text-gray-600">On orders over $50</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900">30-Day Returns</div>
                    <div className="text-sm text-gray-600">Easy return policy</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Secure Checkout</div>
                    <div className="text-sm text-gray-600">Stripe payment protection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
