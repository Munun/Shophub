import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store';
import { ordersAPI } from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderItems = items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      const addressString = `${address.fullName}, ${address.address}, ${address.city}, ${address.state} ${address.zipCode}`;

      const response = await ordersAPI.createCheckoutSession({
        items: orderItems,
        shipping_address: addressString,
      });

      window.location.href = response.data.url;
    } catch (error) {
      alert('Failed to create checkout session');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required placeholder="Full Name" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
              <input type="text" required placeholder="Street Address" value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
                <input type="text" required placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />
              </div>
              <input type="text" required placeholder="ZIP Code" value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none" />

              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-bold text-lg">
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-2 pb-2 border-b">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-semibold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-blue-600">${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
