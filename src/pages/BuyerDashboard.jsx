import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaBox, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyerDashboard = () => {
  const { user, logout } = useAuth();
  const { getCartCount, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
    updateFavoriteCount();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/orders?buyerId=${user.id}`);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateFavoriteCount = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteCount(favorites.length);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const stats = [
    {
      icon: <FaShoppingCart className="text-3xl" />,
      label: 'Cart Items',
      value: getCartCount(),
      color: 'bg-blue-500',
      link: '/cart'
    },
    {
      icon: <FaBox className="text-3xl" />,
      label: 'Total Orders',
      value: orders.length,
      color: 'bg-green-500',
      link: '/my-orders'
    },
    {
      icon: <FaHeart className="text-3xl" />,
      label: 'Favorites',
      value: favoriteCount,
      color: 'bg-red-500',
      link: '/favorites'
    }
  ];

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 animate-scale-in transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full ring-4 ring-blue-500 dark:ring-blue-400 transition-all duration-300"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                  Welcome, {user.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-scale-in border border-gray-100 dark:border-gray-700"
            >
              <div className={`${stat.color} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 hover:scale-110`}>
                {stat.icon}
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium transition-colors duration-300">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2 transition-colors duration-300">{stat.value}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cart Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 animate-scale-in transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Cart Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Items in Cart</span>
                <span className="font-semibold text-gray-800 dark:text-white transition-colors duration-300">{getCartCount()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Cart Total</span>
                <span className="font-bold text-green-600 dark:text-green-400 text-xl transition-colors duration-300">₹ {getCartTotal()}</span>
              </div>
              <Link
                to="/cart"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white text-center py-3 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 mt-4"
              >
                View Cart
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 animate-scale-in transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Recent Orders</h2>
            {recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white transition-colors duration-300">Order #{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{order.orderDate}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                          order.status === 'in-transit'
                            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
                            : order.status === 'accepted'
                            ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300'
                            : order.status === 'rejected'
                            ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {order.status === 'in-transit' ? 'In Transit' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
                      ₹ {order.totalAmount}
                    </p>
                  </div>
                ))}
                <Link
                  to="/my-orders"
                  className="block text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mt-4 transition-colors duration-300"
                >
                  View All Orders
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <FaBox className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-3 transition-colors duration-300" />
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">No orders yet</p>
                <Link
                  to="/products"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mt-2 inline-block transition-colors duration-300"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Link
            to="/products"
            className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in"
          >
            <h3 className="text-lg font-bold mb-2">Browse Products</h3>
            <p className="text-green-50 dark:text-green-100">Explore fresh agricultural products</p>
          </Link>
          <Link
            to="/favorites"
            className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in"
          >
            <h3 className="text-lg font-bold mb-2">My Favorites</h3>
            <p className="text-red-50 dark:text-red-100">View your saved products</p>
          </Link>
          <Link
            to="/profile"
            className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in"
          >
            <h3 className="text-lg font-bold mb-2">My Profile</h3>
            <p className="text-blue-50 dark:text-blue-100">Update your information</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
