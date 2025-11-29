import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
    
    // Listen for localStorage changes
    const handleStorageChange = () => {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(favs);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(favs);
      
      const allProducts = await getAllProducts();
      const favoriteProducts = allProducts.filter(product => 
        favs.includes(product.id)
      );
      setProducts(favoriteProducts);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-green-600 text-5xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <FaHeart className="text-red-500 text-4xl mr-3 transition-all duration-300" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white transition-colors duration-300">My Favorites</h1>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-scale-in transition-all duration-300">
            <FaHeart className="text-gray-300 dark:text-gray-600 text-6xl mx-auto mb-4 animate-pulse transition-all duration-300" />
            <p className="text-gray-600 dark:text-gray-300 text-xl mb-4 transition-colors duration-300">No favorites yet!</p>
            <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">
              Start adding products to your favorites by clicking the heart icon on product cards.
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
