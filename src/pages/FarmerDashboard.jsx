import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBox, FaStar, FaChartLine, FaSignOutAlt, FaPlus, FaEdit } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import FarmerOrders from '../components/FarmerOrders';

const FarmerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStockProducts: 0,
    averageRating: 0,
    organicProducts: 0
  });

  useEffect(() => {
    if (!user || user.role !== 'farmer') {
      navigate('/login');
      return;
    }
    fetchFarmerProducts();
  }, [user, navigate]);

  const fetchFarmerProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/products?farmerId=${user.id}`);
      setProducts(data);
      
      // Calculate stats
      const totalProducts = data.length;
      const inStockProducts = data.filter(p => p.inStock).length;
      const organicProducts = data.filter(p => p.organic).length;
      const avgRating = data.reduce((sum, p) => sum + (p.rating || 0), 0) / (totalProducts || 1);
      
      setStats({
        totalProducts,
        inStockProducts,
        averageRating: avgRating.toFixed(1),
        organicProducts
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.role !== 'farmer') return null;

  const statCards = [
    {
      icon: <FaBox className="text-3xl" />,
      label: 'Total Products',
      value: stats.totalProducts,
      color: 'bg-green-500',
      link: '#my-products'
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      label: 'In Stock',
      value: stats.inStockProducts,
      color: 'bg-blue-500',
      link: '#my-products'
    },
    {
      icon: <FaStar className="text-3xl" />,
      label: 'Avg Rating',
      value: stats.averageRating,
      color: 'bg-yellow-500',
      link: '#my-products'
    },
    {
      icon: <FaBox className="text-3xl" />,
      label: 'Organic Products',
      value: stats.organicProducts,
      color: 'bg-emerald-500',
      link: '#my-products'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full ring-4 ring-green-500/20 dark:ring-green-400/30 transition-all duration-300"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                  Welcome, {user.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{user.specialization || 'Farmer'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{user.location}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {statCards.map((stat, index) => (
            <a
              key={index}
              href={stat.link}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-scale-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${stat.color} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {stat.icon}
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-300">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2 transition-colors duration-300">{stat.value}</p>
            </a>
          ))}
        </div>

        {/* Farm Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Farm Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Farm Size</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 transition-colors duration-300">{user.farmSize || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Certification</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 transition-colors duration-300">
                {user.certified ? (
                  <span className="text-green-600 dark:text-green-400 transition-colors duration-300">✓ Certified</span>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Not Certified</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Contact</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 transition-colors duration-300">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Link
            to="/add-product"
            className="bg-gradient-to-r from-green-500 via-green-600 to-green-500 dark:from-green-600 dark:via-green-700 dark:to-green-600 text-white rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-4 group"
          >
            <FaPlus className="text-3xl group-hover:rotate-90 transition-transform duration-500" />
            <div>
              <h3 className="text-lg font-bold mb-1">Add New Product</h3>
              <p className="text-green-50 dark:text-green-100">List a new agricultural product</p>
            </div>
          </Link>
          <a
            href="#my-products"
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 dark:from-blue-600 dark:via-blue-700 dark:to-blue-600 text-white rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-4 group"
          >
            <FaEdit className="text-3xl group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="text-lg font-bold mb-1">Manage Products</h3>
              <p className="text-blue-50 dark:text-blue-100">Edit or update your listings</p>
            </div>
          </a>
        </div>

        {/* Farmer Orders */}
        <div className="mb-6">
          <FarmerOrders />
        </div>

        {/* My Products */}
        <div id="my-products" className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">My Products</h2>
            <Link
              to="/add-product"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <FaPlus />
              <span>Add Product</span>
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaBox className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">
                No Products Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">
                Start by adding your first agricultural product
              </p>
              <Link
                to="/add-product"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <FaPlus />
                <span>Add Your First Product</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
