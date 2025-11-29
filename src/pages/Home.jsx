import { Link } from 'react-router-dom';
import { FaLeaf, FaUsers, FaHandshake, FaSeedling } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 transition-colors duration-500">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 animate-fade-in">
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 dark:from-green-400 dark:via-emerald-300 dark:to-green-500 bg-clip-text text-transparent mb-4 animate-gradient bg-400%">
            Welcome to AgroLink
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 font-medium">
            Connecting Farmers Directly with Buyers 🌾
          </p>
          <div className="flex justify-center space-x-4 animate-slide-up">
            <Link 
              to="/products"
              className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
            >
              Browse Products
            </Link>
            <Link 
              to="/add-product"
              className="border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-300 transform"
            >
              List Your Product
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in">
            <div className="flex justify-center mb-4">
              <FaLeaf className="text-6xl text-green-600 dark:text-green-400 animate-bounce-slow" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Fresh Produce</h3>
            <p className="text-gray-600 dark:text-gray-300">Directly from farms to your doorstep</p>
          </div>

          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-center mb-4">
              <FaUsers className="text-6xl text-blue-600 dark:text-blue-400 animate-bounce-slow" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Connect Farmers</h3>
            <p className="text-gray-600 dark:text-gray-300">Build direct relationships with producers</p>
          </div>

          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-center mb-4">
              <FaHandshake className="text-6xl text-purple-600 dark:text-purple-400 animate-bounce-slow" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Fair Pricing</h3>
            <p className="text-gray-600 dark:text-gray-300">No middlemen, better prices for all</p>
          </div>

          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-center mb-4">
              <FaSeedling className="text-6xl text-emerald-600 dark:text-emerald-400 animate-bounce-slow" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Sustainable</h3>
            <p className="text-gray-600 dark:text-gray-300">Supporting eco-friendly farming</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-16 bg-gradient-to-br from-white via-green-50 to-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl shadow-2xl p-10 animate-slide-up">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent mb-6 text-center">
            About AgroLink
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-center text-lg max-w-3xl mx-auto leading-relaxed">
            AgroLink is a revolutionary platform that bridges the gap between farmers and buyers. 
            We empower farmers to list their agricultural products directly, ensuring they get fair 
            prices while buyers get access to fresh, quality produce. Join us in building a sustainable 
            and transparent agricultural marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
