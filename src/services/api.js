import axios from 'axios';

const API_URL = 'http://localhost:3001/products';
const CATEGORIES_URL = 'http://localhost:3001/categories';
const FARMERS_URL = 'http://localhost:3001/farmers';

// GET - Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// GET - Fetch single product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// POST - Add new product
export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// PUT - Update product
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// DELETE - Remove product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// GET - Fetch all categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(CATEGORIES_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// GET - Fetch farmer by ID
export const getFarmerById = async (id) => {
  try {
    const response = await axios.get(`${FARMERS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching farmer:', error);
    throw error;
  }
};

// GET - Fetch all farmers
export const getAllFarmers = async () => {
  try {
    const response = await axios.get(FARMERS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching farmers:', error);
    throw error;
  }
};

