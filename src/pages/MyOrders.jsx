import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaCheckCircle, FaClock, FaTruck } from 'react-icons/fa';
import axios from 'axios';

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/orders?buyerId=${user.id}&_sort=id&_order=desc`);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-transit':
        return <FaTruck className="text-blue-500 dark:text-blue-400 transition-colors duration-300" />;
      case 'accepted':
        return <FaCheckCircle className="text-green-500 dark:text-green-400 transition-colors duration-300" />;
      case 'rejected':
        return <FaBox className="text-red-500 dark:text-red-400 transition-colors duration-300" />;
      case 'pending':
        return <FaClock className="text-yellow-500 dark:text-yellow-400 transition-colors duration-300" />;
      default:
        return <FaBox className="text-gray-500 dark:text-gray-400 transition-colors duration-300" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-transit':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300';
      case 'accepted':
        return 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300';
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 flex items-center justify-center transition-colors duration-500">
        <div className="text-center animate-scale-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 transition-colors duration-300">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4 text-center animate-scale-in">
          <FaBox className="text-8xl text-gray-300 dark:text-gray-600 mx-auto mb-6 transition-colors duration-300" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">No Orders Yet</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">Start shopping to see your orders here!</p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white rounded-xl hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 animate-slide-up transition-colors duration-300">My Orders</h1>

        <div className="space-y-6 animate-scale-in">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4 pb-4 border-b dark:border-gray-700 transition-colors duration-300">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white transition-colors duration-300">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
                    Placed on {order.orderDate}
                  </p>
                  {order.deliveryDate && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      Delivered on {order.deliveryDate}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status === 'in-transit' ? 'In Transit' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center transition-colors duration-300">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white transition-colors duration-300">{item.productName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Quantity: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-white transition-colors duration-300">₹ {item.total}</p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700 transition-colors duration-300">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Delivery Address:</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-300 transition-colors duration-300">{order.shippingAddress}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 transition-colors duration-300">₹ {order.totalAmount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
