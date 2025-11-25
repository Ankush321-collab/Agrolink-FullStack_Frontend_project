import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/api';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import { FaSpinner } from 'react-icons/fa';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    location: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setFormData({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        location: data.location,
        image: data.image,
        description: data.description
      });
    } catch (error) {
      toast.error('Failed to fetch product details.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        ...formData,
        price: Number(formData.price)
      };
      
      await updateProduct(id, productData);
      toast.success('Product updated successfully!');
      navigate(`/product/${id}`);
    } catch (error) {
      toast.error('Failed to update product. Please try again.');
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Edit Product</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" variant="primary" className="flex-1">
                Update Product
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate(`/product/${id}`)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
