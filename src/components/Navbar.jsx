import { Link } from 'react-router-dom';
import { FaLeaf, FaHeart, FaShoppingCart, FaUser, FaSignInAlt, FaMoon, FaSun } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [favCount, setFavCount] = useState(0);
  const { getCartCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    updateFavCount();
    
    // Listen for storage changes
    const handleStorageChange = () => updateFavCount();
    window.addEventListener('storage', handleStorageChange);
    
    // Poll for changes (in case localStorage is updated in the same window)
    const interval = setInterval(updateFavCount, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const updateFavCount = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavCount(favorites.length);
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-white shadow-lg transition-all duration-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold transform hover:scale-105 transition-transform duration-300">
            <FaLeaf className="text-3xl animate-bounce-slow" />
            <span className="bg-gradient-to-r from-white to-green-100 dark:from-green-200 dark:to-white bg-clip-text text-transparent">AgroLink</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="hover:text-green-200 dark:hover:text-green-300 transition-all duration-300 font-medium hover:scale-110 transform"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="hover:text-green-200 dark:hover:text-green-300 transition-all duration-300 font-medium hover:scale-110 transform"
            >
              All Products
            </Link>
            {user?.role === 'farmer' && (
              <Link 
                to="/add-product" 
                className="hover:text-green-200 dark:hover:text-green-300 transition-all duration-300 font-medium hover:scale-110 transform"
              >
                Add Product
              </Link>
            )}
            {user?.role !== 'farmer' && (
              <>
                <Link 
                  to="/favorites" 
                  className="hover:text-green-200 dark:hover:text-green-300 transition-all duration-300 font-medium flex items-center space-x-1 relative group"
                >
                  <FaHeart className="group-hover:scale-125 transition-transform duration-300" />
                  <span>Favorites</span>
                  {favCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {favCount}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/cart" 
                  className="hover:text-green-200 dark:hover:text-green-300 transition-all duration-300 font-medium flex items-center space-x-1 relative group"
                >
                  <FaShoppingCart className="group-hover:scale-125 transition-transform duration-300" />
                  <span>Cart</span>
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
              </>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FaSun className="text-yellow-300 text-xl" />
              ) : (
                <FaMoon className="text-blue-200 text-xl" />
              )}
            </button>

            {isAuthenticated ? (
              <Link 
                to={user?.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'}
                className="hover:text-green-200 dark:hover:text-green-300 transition-all duration-300 font-medium flex items-center space-x-1 group"
              >
                <FaUser className="group-hover:scale-125 transition-transform duration-300" />
                <span>{user?.name?.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="hover:text-green-200 dark:hover:text-green-300 transition-all duration-300 font-medium flex items-center space-x-1 group"
              >
                <FaSignInAlt className="group-hover:scale-125 transition-transform duration-300" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
