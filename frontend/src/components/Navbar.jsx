import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Menu, X, Store } from 'lucide-react';
import { useCartStore, useAuthStore } from '../store';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const getItemCount = useCartStore((state) => state.getItemCount);
  const itemCount = getItemCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center shadow-md">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              ShopHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-brand-navy font-semibold transition-colors">
              Products
            </Link>

            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-brand-navy transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-navy text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Hi, {user.full_name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 hover:text-brand-navy font-semibold">
                  Login
                </Link>
                <Link to="/register" className="bg-brand-navy hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg transition-colors font-semibold shadow-md">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-700">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-brand-navy font-semibold">
              Products
            </Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-brand-navy font-semibold">
              Cart ({itemCount})
            </Link>
            {user ? (
              <>
                <div className="py-2 text-sm font-medium text-gray-700">Hi, {user.full_name}</div>
                <button onClick={handleLogout} className="block w-full text-left py-2 text-red-600 font-semibold">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-brand-navy font-semibold">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block py-2 bg-brand-navy text-white text-center rounded-lg font-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
