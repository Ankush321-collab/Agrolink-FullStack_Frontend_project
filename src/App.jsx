import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDetails from './pages/ProductDetails';
import Favorites from './pages/Favorites';
import FarmerProfile from './pages/FarmerProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/farmer/:id" element={<FarmerProfile />} />
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;

