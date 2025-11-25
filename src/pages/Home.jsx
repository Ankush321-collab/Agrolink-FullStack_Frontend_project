import { Link } from 'react-router-dom';
import { FaLeaf, FaUsers, FaHandshake, FaSeedling } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-green-600">AgroLink</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connecting Farmers Directly with Buyers
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/products"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Browse Products
            </Link>
            <Link 
              to="/add-product"
              className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
            >
              List Your Product
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="flex justify-center mb-4">
              <FaLeaf className="text-5xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fresh Produce</h3>
            <p className="text-gray-600">Directly from farms to your doorstep</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-5xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Connect Farmers</h3>
            <p className="text-gray-600">Build direct relationships with producers</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="flex justify-center mb-4">
              <FaHandshake className="text-5xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fair Pricing</h3>
            <p className="text-gray-600">No middlemen, better prices for all</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="flex justify-center mb-4">
              <FaSeedling className="text-5xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sustainable</h3>
            <p className="text-gray-600">Supporting eco-friendly farming</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">About AgroLink</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
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
