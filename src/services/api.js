import axios from 'axios';

const API_URL = 'http://localhost:3001/products';
const CATEGORIES_URL = 'http://localhost:3001/categories';
const FARMERS_URL = 'http://localhost:3001/farmers';
const BUYERS_URL = 'http://localhost:3001/buyers';
const ORDERS_URL = 'http://localhost:3001/orders';

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

// GET - Fetch all buyers
export const getAllBuyers = async () => {
  try {
    const response = await axios.get(BUYERS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching buyers:', error);
    throw error;
  }
};

// GET - Fetch buyer by ID
export const getBuyerById = async (id) => {
  try {
    const response = await axios.get(`${BUYERS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching buyer:', error);
    throw error;
  }
};

// POST - Register new buyer
export const registerBuyer = async (buyer) => {
  try {
    const response = await axios.post(BUYERS_URL, buyer);
    return response.data;
  } catch (error) {
    console.error('Error registering buyer:', error);
    throw error;
  }
};

// PUT - Update buyer
export const updateBuyer = async (id, buyer) => {
  try {
    const response = await axios.put(`${BUYERS_URL}/${id}`, buyer);
    return response.data;
  } catch (error) {
    console.error('Error updating buyer:', error);
    throw error;
  }
};

// GET - Fetch all orders
export const getAllOrders = async () => {
  try {
    const response = await axios.get(ORDERS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// GET - Fetch orders by buyer ID
export const getOrdersByBuyerId = async (buyerId) => {
  try {
    const response = await axios.get(`${ORDERS_URL}?buyerId=${buyerId}&_sort=id&_order=desc`);
    return response.data;
  } catch (error) {
    console.error('Error fetching buyer orders:', error);
    throw error;
  }
};

// POST - Create new order
export const createOrder = async (order) => {
  try {
    const response = await axios.post(ORDERS_URL, order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// PUT - Update order status
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${ORDERS_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

