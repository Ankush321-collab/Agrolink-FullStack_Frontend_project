import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign, FaStar, FaHeart, FaRegHeart, FaLeaf } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
      >
        {isFavorite ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FaRegHeart className="text-gray-400 text-xl" />
        )}
      </button>

      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
        {product.organic && (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
            <FaLeaf className="text-xs" />
            <span>Organic</span>
          </span>
        )}
        {!product.inStock && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        
        {/* Category Badge */}
        {product.category && (
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
            {product.category}
          </span>
        )}

        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <span>{product.location}</span>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-gray-700 font-semibold">{product.rating}</span>
            <span className="text-gray-500 text-sm ml-1">/ 5</span>
          </div>
        )}

        <div className="flex items-center text-green-600 font-semibold mb-2">
          <FaRupeeSign className="mr-1" />
          <span>{product.price}</span>
          <span className="text-gray-500 ml-2 text-sm">/ {product.quantity}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <Link 
          to={`/product/${product.id}`}
          className="block w-full bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
