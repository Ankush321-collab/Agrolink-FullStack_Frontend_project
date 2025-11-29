import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, deleteProduct, getFarmerById } from '../services/api';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { FaSpinner, FaMapMarkerAlt, FaRupeeSign, FaEdit, FaTrash, FaStar, FaLeaf, FaUser, FaPhone, FaEnvelope, FaShoppingCart } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      
      // Fetch farmer info if farmerId exists
      if (data.farmerId) {
        const farmerData = await getFarmerById(data.farmerId);
        setFarmer(farmerData);
      }
    } catch (error) {
      toast.error('Failed to fetch product details.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully!');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to delete product. Please try again.');
      console.error(error);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Check if current user is the owner of the product
  const isOwner = user?.role === 'farmer' && user?.id === product?.farmerId;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <FaSpinner className="animate-spin text-green-600 dark:text-green-400 text-5xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <p className="text-gray-600 dark:text-gray-300 text-xl mb-4">Product not found</p>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-6xl animate-slide-up">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="md:flex">
            <div className="md:w-1/2 relative overflow-hidden group">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
              />
              {product.organic && (
                <div className="absolute top-4 left-4 bg-green-500 dark:bg-green-900/50 text-white dark:text-green-300 px-3 py-1 rounded-xl flex items-center space-x-1 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
                  <FaLeaf />
                  <span>Organic</span>
                </div>
              )}
              {!product.inStock && (
                <div className="absolute top-4 right-4 bg-red-500 dark:bg-red-900/50 text-white dark:text-red-300 px-3 py-1 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
                  Out of Stock
                </div>
              )}
            </div>
            
            <div className="md:w-1/2 p-8">
              <div className="mb-4 animate-scale-in">
                {product.category && (
                  <span className="inline-block bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105">
                    {product.category}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">{product.name}</h1>
              
              {product.rating && (
                <div className="flex items-center mb-4 animate-scale-in">
                  <FaStar className="text-yellow-400 dark:text-yellow-300 mr-1 text-xl" />
                  <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">{product.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">/ 5</span>
                </div>
              )}

              <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                <FaMapMarkerAlt className="mr-2 text-green-600 dark:text-green-400" size={20} />
                <span className="text-lg">{product.location}</span>
              </div>
              
              <div className="flex items-center text-green-600 dark:text-green-400 font-bold text-3xl mb-6 transition-colors duration-300">
                <FaRupeeSign className="mr-1" />
                <span>{product.price}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2 text-lg font-normal">/ {product.quantity}</span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-300">Description</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{product.description}</p>
              </div>

              {/* Farmer Information */}
              {farmer && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl mb-6 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center transition-colors duration-300">
                    <FaUser className="mr-2 text-green-600 dark:text-green-400" />
                    Farmer Information
                  </h3>
                  <div className="space-y-2">
                    <Link 
                      to={`/farmer/${farmer.id}`}
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold text-lg block transition-colors duration-300"
                    >
                      {farmer.name}
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{farmer.specialization}</p>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      <FaPhone className="mr-2 text-green-600 dark:text-green-400" />
                      <a href={`tel:${farmer.phone}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300">
                        {farmer.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      <FaEnvelope className="mr-2 text-green-600 dark:text-green-400" />
                      <a href={`mailto:${farmer.email}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300">
                        {farmer.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Add to Cart Section */}
              {product.inStock && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl mb-4 transition-all duration-300">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-300"
                    />
                    <Button
                      onClick={handleAddToCart}
                      variant="primary"
                      className="flex-1 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 hover:from-green-600 hover:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Edit/Delete Buttons - Only for product owner */}
              {isOwner && (
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => navigate(`/edit-product/${id}`)}
                    variant="primary"
                    className="flex items-center flex-1 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </Button>
                  <Button 
                    onClick={() => setShowDeleteModal(true)}
                    variant="danger"
                    className="flex items-center flex-1 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </Button>
                </div>
              )}
              
              <Button 
                onClick={() => navigate('/products')}
                variant="outline"
                className="w-full mt-4 rounded-xl hover:scale-105 transition-all duration-300 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Back to All Products
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
          Are you sure you want to delete "{product.name}"? This action cannot be undone.
        </p>
        <div className="flex space-x-4">
          <Button 
            onClick={handleDelete}
            variant="danger"
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Delete
          </Button>
          <Button 
            onClick={() => setShowDeleteModal(false)}
            variant="secondary"
            className="flex-1 rounded-xl hover:scale-105 transition-all duration-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
