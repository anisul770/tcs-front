import React from 'react';

const FilterSection = ({ 
  searchQuery, setSearchQuery, 
  selectedCategory, setSelectedCategory, 
  ordering, setOrdering, 
  priceRange, setPriceRange,
  categories // Assuming you pass categories down
}) => {
  
  // Helper to update just one part of the price array
  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
  };

  return (
    <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
      
      {/* Price Range (Min / Max) */}
      <div className="form-control w-full flex-row gap-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        {/* Min Range  */}
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min={0}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            className="w-20 p-2 border rounded-md" />
          <input
            type="range"
            min={0}
            max={priceRange[1]}
            step={10}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            className="w-full" />
        </div>
        {/* Max Range  */}
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min={priceRange[0]}
            max={500}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="w-20 p-2 border rounded-md" />
          <input
            type="range"
            min={priceRange[0]}
            max={500}
            step={10}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="w-full" />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      {/* Search Input */}
      <div className="form-control w-full">
        <label className="label cursor-pointer pb-1"><span className="label-text text-xs font-bold uppercase">Search</span></label>
        <input 
          type="text" 
          placeholder="e.g. Deep Clean..." 
          className="input input-bordered w-full" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Dropdown */}
      <div className="form-control w-full">
        <label className="label pb-1"><span className="label-text text-xs font-bold uppercase">Category</span></label>
        <select 
          className="select select-bordered w-full"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Ordering Dropdown */}
      <div className="form-control w-full">
        <label className="label pb-1"><span className="label-text text-xs font-bold uppercase">Sort By</span></label>
        <select 
          className="select select-bordered w-full"
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
        >
          <option value="">Recommended</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="-avg_rating">Highest Rated</option>
        </select>
      </div>


    </div>
  );
};

export default FilterSection;