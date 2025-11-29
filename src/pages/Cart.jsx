import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import Button from '../components/Button';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FaShoppingBag className="text-8xl text-gray-300 dark:text-gray-600 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Add some products to get started!</p>
          <Link to="/products">
            <Button variant="primary">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-all duration-300 hover:scale-105"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-xl p-6 flex items-center space-x-4 transition-all duration-300 hover:scale-[1.02] animate-scale-in"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.location}</p>
                  <p className="text-green-600 dark:text-green-400 font-bold mt-1">₹ {item.price}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <FaMinus className="text-xs dark:text-white" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <FaPlus className="text-xs dark:text-white" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                    ₹ {item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 mt-2 flex items-center space-x-1 ml-auto transition-all duration-300 hover:scale-105"
                  >
                    <FaTrash className="text-sm" />
                    <span className="text-sm">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl p-6 sticky top-4 transition-all duration-300 animate-scale-in">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>₹ {getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 dark:text-green-400">Free</span>
                </div>
                <div className="border-t dark:border-gray-600 pt-3 flex justify-between text-lg font-bold text-gray-800 dark:text-white bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 p-3 rounded-xl">
                  <span>Total</span>
                  <span>₹ {getCartTotal()}</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full mb-3 hover:scale-105 hover:shadow-lg transition-all duration-300"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <Link to="/products">
                <Button variant="outline" className="w-full hover:scale-105 transition-all duration-300">
                  Continue Shopping
                </Button>
              </Link>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl border-2 border-green-200 dark:border-green-700 transition-all duration-300">
                <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                  🎉 Free Delivery on all orders!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
