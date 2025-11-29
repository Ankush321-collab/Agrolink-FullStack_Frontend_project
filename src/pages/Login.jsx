import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    role: 'buyer' // 'buyer' or 'farmer'
  });
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated && user) {
      const dashboardPath = user.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard';
      navigate(dashboardPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Try to find user in buyers
      const buyersResponse = await axios.get('http://localhost:3001/buyers');
      const buyer = buyersResponse.data.find(
        (b) => b.email === formData.email && b.password === formData.password
      );

      if (buyer) {
        login({ ...buyer, role: 'buyer' });
        toast.success(`Welcome back, ${buyer.name}!`);
        navigate('/buyer-dashboard');
        return;
      }

      // Try to find user in farmers
      const farmersResponse = await axios.get('http://localhost:3001/farmers');
      const farmer = farmersResponse.data.find(
        (f) => f.email === formData.email && f.password === formData.password
      );

      if (farmer) {
        login({ ...farmer, role: 'farmer' });
        toast.success(`Welcome back, ${farmer.name}!`);
        navigate('/farmer-dashboard');
        return;
      }

      toast.error('Invalid email or password');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (formData.role === 'buyer') {
        const newBuyer = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          avatar: `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}&background=3b82f6&color=fff`,
          createdAt: new Date().toISOString().split('T')[0]
        };

        const { data } = await axios.post('http://localhost:3001/buyers', newBuyer);
        login({ ...data, role: 'buyer' });
        toast.success('Registration successful!');
        navigate('/buyer-dashboard');
      } else {
        // Register as farmer
        const newFarmer = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          location: formData.address,
          farmSize: '',
          certified: false,
          specialization: '',
          avatar: `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}&background=22c55e&color=fff`
        };

        const { data } = await axios.post('http://localhost:3001/farmers', newFarmer);
        login({ ...data, role: 'farmer' });
        toast.success('Registration successful!');
        navigate('/farmer-dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 flex items-center justify-center py-12 px-4 transition-colors duration-500">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 animate-scale-in backdrop-blur-sm">
        <div className="text-center mb-8 animate-slide-down">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isLogin ? 'Login to your account' : 'Register to get started'}
          </p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-5">
          {!isLogin && (
            <>
              <div className="animate-slide-up">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Register As
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'buyer' })}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-105 ${
                      formData.role === 'buyer'
                        ? 'border-blue-500 dark:border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 text-blue-700 dark:text-blue-300 shadow-lg'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500'
                    }`}
                  >
                    🛒 Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'farmer' })}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-105 ${
                      formData.role === 'farmer'
                        ? 'border-green-500 dark:border-green-400 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 text-green-700 dark:text-green-300 shadow-lg'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-500'
                    }`}
                  >
                    🌾 Farmer
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formData.role === 'buyer' ? 'Delivery Address' : 'Farm Location'}
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="2"
                  className="w-full px-4 py-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder={formData.role === 'buyer' ? 'Enter your delivery address' : 'Enter your farm location'}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-green-700 hover:to-blue-700 dark:hover:from-green-600 dark:hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-300"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300"
          >
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </button>
        </div>


      </div>
    </div>
  );
};

export default Login;
