import { Link } from 'react-router-dom';
import { FaLeaf, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [favCount, setFavCount] = useState(0);

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
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <FaLeaf className="text-3xl" />
            <span>AgroLink</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="hover:text-green-200 transition duration-300 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="hover:text-green-200 transition duration-300 font-medium"
            >
              All Products
            </Link>
            <Link 
              to="/add-product" 
              className="hover:text-green-200 transition duration-300 font-medium"
            >
              Add Product
            </Link>
            <Link 
              to="/favorites" 
              className="hover:text-green-200 transition duration-300 font-medium flex items-center space-x-1 relative"
            >
              <FaHeart />
              <span>Favorites</span>
              {favCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
