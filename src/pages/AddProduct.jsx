import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct, getAllCategories, getAllFarmers } from '../services/api';
import { toast } from 'react-toastify';
import Button from '../components/Button';

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    location: '',
    category: '',
    farmerId: '',
    image: '',
    description: '',
    organic: false,
    inStock: true,
    rating: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesData, farmersData] = await Promise.all([
        getAllCategories(),
        getAllFarmers()
      ]);
      setCategories(categoriesData);
      setFarmers(farmersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating)
      };
      
      await addProduct(productData);
      toast.success('Product added successfully!');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to add product. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Add New Product</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., Wheat, Rice, Tomatoes"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Farmer *</label>
                <select
                  name="farmerId"
                  value={formData.farmerId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Select Farmer</option>
                  {farmers.map(farmer => (
                    <option key={farmer.id} value={farmer.id}>{farmer.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="e.g., 1200"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Quantity *</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="e.g., 50 kg"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., Nashik, Pune"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Rating (0-5)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., 4.5"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Describe your product..."
              />
            </div>

            <div className="flex items-center space-x-6 mb-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="organic"
                  checked={formData.organic}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-gray-700">Organic Product</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-gray-700">In Stock</span>
              </label>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" variant="primary" className="flex-1">
                Add Product
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/products')}
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

export default AddProduct;
