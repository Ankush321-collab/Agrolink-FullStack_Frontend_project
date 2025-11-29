import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange, placeholder = "Search products..." }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 focus:border-transparent transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;
