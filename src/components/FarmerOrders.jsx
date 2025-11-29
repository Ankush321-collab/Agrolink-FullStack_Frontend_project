import { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaBox, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const FarmerOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected

  useEffect(() => {
    if (user?.role === 'farmer') {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3001/orders');
      
      // Filter orders that contain products from this farmer
      const farmerOrders = data.filter(order => 
        order.items && order.items.some(item => item.farmerId === user.id)
      );
      
      setOrders(farmerOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3001/orders/${orderId}`, {
        status: 'accepted'
      });
      toast.success('Order accepted successfully!');
      fetchOrders();
    } catch (error) {
      console.error('Error accepting order:', error);
      toast.error('Failed to accept order');
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3001/orders/${orderId}`, {
        status: 'rejected'
      });
      toast.success('Order rejected');
      fetchOrders();
    } catch (error) {
      console.error('Error rejecting order:', error);
      toast.error('Failed to reject order');
    }
  };

  const handleMarkInTransit = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3001/orders/${orderId}`, {
        status: 'in-transit'
      });
      toast.success('Order marked as in transit!');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
      accepted: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
      rejected: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
      'in-transit': 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
    };
    return badges[status] || 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300';
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-gray-600 dark:text-gray-300 mt-4">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Incoming Orders</h2>
        <div className="flex space-x-2">
          {['all', 'pending', 'accepted', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl font-medium capitalize transition-all duration-300 hover:scale-105 ${
                filter === status
                  ? 'bg-green-600 dark:bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <FaBox className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl p-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-scale-in"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Buyer: {order.buyerName || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Date: {order.orderDate}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-3 mb-3">
                <h4 className="font-semibold text-gray-700 dark:text-white mb-2 text-sm">Items:</h4>
                {order.items
                  .filter(item => item.farmerId === user.id)
                  .map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>{item.productName} x {item.quantity}</span>
                      <span className="font-medium">₹{item.total}</span>
                    </div>
                  ))}
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Delivery Address:</span>{' '}
                  {order.shippingAddress}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t dark:border-gray-600">
                <p className="font-bold text-gray-800 dark:text-white">
                  Total: ₹{order.items
                    .filter(item => item.farmerId === user.id)
                    .reduce((sum, item) => sum + item.total, 0)}
                </p>

                <div className="flex space-x-2">
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleAcceptOrder(order.id)}
                        className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 hover:scale-105 hover:shadow-lg transition-all duration-300"
                      >
                        <FaCheck />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleRejectOrder(order.id)}
                        className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:scale-105 hover:shadow-lg transition-all duration-300"
                      >
                        <FaTimes />
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                  {order.status === 'accepted' && (
                    <button
                      onClick={() => handleMarkInTransit(order.id)}
                      className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-all duration-300"
                    >
                      <FaClock />
                      <span>Mark In Transit</span>
                    </button>
                  )}
                  {order.status === 'rejected' && (
                    <span className="text-red-600 dark:text-red-400 font-medium">Order Rejected</span>
                  )}
                  {order.status === 'in-transit' && (
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Order In Transit</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;
