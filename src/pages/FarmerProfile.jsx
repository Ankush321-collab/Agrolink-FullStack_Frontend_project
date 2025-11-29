import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFarmerById, getAllProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { FaSpinner, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSeedling, FaCertificate } from 'react-icons/fa';

const FarmerProfile = () => {
  const { id } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [farmerData, allProducts] = await Promise.all([
        getFarmerById(id),
        getAllProducts()
      ]);
      
      setFarmer(farmerData);
      const farmerProducts = allProducts.filter(p => p.farmerId === id);
      setProducts(farmerProducts);
    } catch (error) {
      console.error('Error fetching farmer data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <FaSpinner className="animate-spin text-green-600 dark:text-green-400 text-5xl" />
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300 text-xl">Farmer not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Farmer Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 animate-scale-in transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={farmer.avatar}
              alt={farmer.name}
              className="w-32 h-32 rounded-full ring-4 ring-green-500/20 dark:ring-green-400/30 shadow-lg transition-all duration-300"
            />
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-300">{farmer.name}</h1>
                {farmer.certified && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-full shadow-lg">
                    <FaCertificate className="text-white text-xl" title="Certified Farmer" />
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-4 transition-colors duration-300">{farmer.specialization}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-center md:justify-start space-x-2 group transition-all duration-300">
                  <FaMapMarkerAlt className="text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="transition-colors duration-300">{farmer.location}</span>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-2 group transition-all duration-300">
                  <FaSeedling className="text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="transition-colors duration-300">Farm Size: {farmer.farmSize}</span>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-2 group transition-all duration-300">
                  <FaPhone className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <a href={`tel:${farmer.phone}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300">
                    {farmer.phone}
                  </a>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-2 group transition-all duration-300">
                  <FaEnvelope className="text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <a href={`mailto:${farmer.email}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300">
                    {farmer.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farmer's Products */}
        <div className="animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
            Products by {farmer.name} ({products.length})
          </h2>
          
          {products.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center transition-all duration-300">
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">This farmer hasn't listed any products yet.</p>
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
    </div>
  );
};

export default FarmerProfile;
