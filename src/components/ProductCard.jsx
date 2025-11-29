import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign, FaStar, FaHeart, FaRegHeart, FaLeaf, FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (favorites.includes(product.id)) {
      newFavorites = favorites.filter(id => id !== product.id);
    } else {
      newFavorites = [...favorites, product.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 relative transform hover:-translate-y-2 hover:scale-105 animate-scale-in group">
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-700 rounded-full p-2.5 shadow-lg hover:scale-125 transition-all duration-300 transform hover:rotate-12"
      >
        {isFavorite ? (
          <FaHeart className="text-red-500 dark:text-red-400 text-xl animate-pulse" />
        ) : (
          <FaRegHeart className="text-gray-400 dark:text-gray-300 text-xl group-hover:text-red-400 transition-colors" />
        )}
      </button>

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
        {product.organic && (
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-md animate-bounce-slow">
            <FaLeaf className="text-xs" />
            <span>Organic</span>
          </span>
        )}
        {!product.inStock && (
          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1.5 rounded-full shadow-md">
            Out of Stock
          </span>
        )}
      </div>

      <div className="overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{product.name}</h3>
        
        {/* Category Badge */}
        {product.category && (
          <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs px-3 py-1 rounded-full mb-3 font-medium">
            {product.category}
          </span>
        )}

        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
          <FaMapMarkerAlt className="mr-2 text-red-500 dark:text-red-400" />
          <span>{product.location}</span>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i}
                className={`${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} transition-all`}
              />
            ))}
            <span className="text-gray-700 dark:text-gray-300 font-semibold ml-2">{product.rating}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">/ 5</span>
          </div>
        )}

        <div className="flex items-center text-green-600 dark:text-green-400 font-bold text-xl mb-3">
          <FaRupeeSign className="mr-1" />
          <span>{product.price}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm font-normal">/ {product.quantity}</span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex space-x-2">
          <Link 
            to={`/product/${product.id}`}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white text-center py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
          >
            View Details
          </Link>
          {product.inStock && (
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-1"
              title="Add to Cart"
            >
              <FaShoppingCart className="text-lg" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
