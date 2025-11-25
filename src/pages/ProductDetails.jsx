import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, deleteProduct, getFarmerById } from '../services/api';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { FaSpinner, FaMapMarkerAlt, FaRupeeSign, FaEdit, FaTrash, FaStar, FaLeaf, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-green-600 text-5xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-xl mb-4">Product not found</p>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.organic && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                  <FaLeaf />
                  <span>Organic</span>
                </div>
              )}
              {!product.inStock && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                  Out of Stock
                </div>
              )}
            </div>
            
            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                {product.category && (
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              {product.rating && (
                <div className="flex items-center mb-4">
                  <FaStar className="text-yellow-400 mr-1 text-xl" />
                  <span className="text-xl font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-gray-500 ml-1">/ 5</span>
                </div>
              )}

              <div className="flex items-center text-gray-600 mb-4">
                <FaMapMarkerAlt className="mr-2 text-green-600" size={20} />
                <span className="text-lg">{product.location}</span>
              </div>
              
              <div className="flex items-center text-green-600 font-bold text-3xl mb-6">
                <FaRupeeSign className="mr-1" />
                <span>{product.price}</span>
                <span className="text-gray-500 ml-2 text-lg font-normal">/ {product.quantity}</span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Farmer Information */}
              {farmer && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FaUser className="mr-2 text-green-600" />
                    Farmer Information
                  </h3>
                  <div className="space-y-2">
                    <Link 
                      to={`/farmer/${farmer.id}`}
                      className="text-green-600 hover:text-green-700 font-semibold text-lg block"
                    >
                      {farmer.name}
                    </Link>
                    <p className="text-gray-600">{farmer.specialization}</p>
                    <div className="flex items-center text-gray-600">
                      <FaPhone className="mr-2 text-green-600" />
                      <a href={`tel:${farmer.phone}`} className="hover:text-green-600">
                        {farmer.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaEnvelope className="mr-2 text-green-600" />
                      <a href={`mailto:${farmer.email}`} className="hover:text-green-600">
                        {farmer.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4">
                <Button 
                  onClick={() => navigate(`/edit-product/${id}`)}
                  variant="primary"
                  className="flex items-center flex-1"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </Button>
                <Button 
                  onClick={() => setShowDeleteModal(true)}
                  variant="danger"
                  className="flex items-center flex-1"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </Button>
              </div>
              
              <Button 
                onClick={() => navigate('/products')}
                variant="outline"
                className="w-full mt-4"
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
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{product.name}"? This action cannot be undone.
        </p>
        <div className="flex space-x-4">
          <Button 
            onClick={handleDelete}
            variant="danger"
            className="flex-1"
          >
            Delete
          </Button>
          <Button 
            onClick={() => setShowDeleteModal(false)}
            variant="secondary"
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
