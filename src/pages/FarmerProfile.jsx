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
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-green-600 text-5xl" />
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-xl">Farmer not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Farmer Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={farmer.avatar}
              alt={farmer.name}
              className="w-32 h-32 rounded-full border-4 border-green-500"
            />
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{farmer.name}</h1>
                {farmer.certified && (
                  <FaCertificate className="text-green-600 text-xl" title="Certified Farmer" />
                )}
              </div>
              
              <p className="text-gray-600 text-lg mb-4">{farmer.specialization}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>{farmer.location}</span>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <FaSeedling className="text-green-600" />
                  <span>Farm Size: {farmer.farmSize}</span>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <FaPhone className="text-green-600" />
                  <a href={`tel:${farmer.phone}`} className="hover:text-green-600">
                    {farmer.phone}
                  </a>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <FaEnvelope className="text-green-600" />
                  <a href={`mailto:${farmer.email}`} className="hover:text-green-600">
                    {farmer.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farmer's Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Products by {farmer.name} ({products.length})
          </h2>
          
          {products.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">This farmer hasn't listed any products yet.</p>
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
