const FilterPanel = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceChange,
  locations,
  selectedLocation,
  onLocationChange,
  sortBy,
  onSortChange,
  onReset
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        <button 
          onClick={onReset}
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">All Locations</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="2000"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([0, parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
