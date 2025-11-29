import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '../components/Button';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...user,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        avatar: `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}&background=3b82f6&color=fff`
      };

      await axios.put(`http://localhost:3001/buyers/${user.id}`, updatedData);
      updateUser(updatedData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 transition-all duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 transition-colors duration-300">My Profile</h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-scale-in transition-all duration-300">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8 pb-8 border-b dark:border-gray-700 transition-colors duration-300">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full ring-4 ring-green-400/30 dark:ring-green-400/30 transition-all duration-300"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{user.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">Member since {user.createdAt}</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                <FaUser className="text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                <span>Full Name</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              ) : (
                <p className="text-gray-800 dark:text-white font-medium pl-6 transition-colors duration-300">{user.name}</p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                <FaEnvelope className="text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                <span>Email Address</span>
              </label>
              <p className="text-gray-800 dark:text-white font-medium pl-6 transition-colors duration-300">{user.email}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 pl-6 mt-1 transition-colors duration-300">Email cannot be changed</p>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                <FaPhone className="text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                <span>Phone Number</span>
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              ) : (
                <p className="text-gray-800 dark:text-white font-medium pl-6 transition-colors duration-300">{user.phone}</p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                <span>Address</span>
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              ) : (
                <p className="text-gray-800 dark:text-white font-medium pl-6 transition-colors duration-300">{user.address}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex space-x-4 mt-8 pt-8 border-t dark:border-gray-700 transition-colors duration-300">
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user.name,
                    phone: user.phone,
                    address: user.address
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
