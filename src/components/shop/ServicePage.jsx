import React, { useState, useEffect } from 'react';
import Services from './Services';
import useCategories from '../../hooks/useCategories';
import useServices from '../../hooks/useServices';
import FilterSection from './FilterSection';
import Pagination from './Pagination';
import { useLocation } from 'react-router';

const ShopPage = () => {
  // 1. All the state required by your hook
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ordering, setOrdering] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]); // Default min/max
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Fetch Categories for the dropdown
  const { categories } = useCategories();

  // 3. Fetch Services using your hook
  const { loading, services, errorMsg, totalPages } = useServices({
    currentPage,
    selectedCategory,
    ordering,
    priceRange,
    searchQuery
  });
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category');
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [location]);

  // 4. IMPORTANT: Reset to page 1 if any filter changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [selectedCategory, ordering, priceRange, searchQuery]);


  return (
    <div className="min-h-screen bg-base-200 py-12 pt-24">
      <div className="container mx-auto px-4">

        <div className="mb-8">
          <h1 className="text-4xl font-black italic text-primary uppercase">All Services</h1>
          <p className="text-gray-500 mt-2">Filter and find exactly what you need.</p>
        </div>

        {/* Filters */}
        <FilterSection
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          ordering={ordering} setOrdering={setOrdering}
          priceRange={priceRange} setPriceRange={setPriceRange}
          categories={categories}
        />

        {/* Error Handling */}
        {errorMsg && (
          <div className="alert alert-error my-4">
            <span>Something went wrong while fetching services.</span>
          </div>
        )}
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Service List / Loading State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : services.length === 0 && !errorMsg ? (
          <div className="text-center py-20 bg-base-100 rounded-2xl">
            <h3 className="text-xl font-bold opacity-50">No services found matching your filters.</h3>
            <button
              className="btn btn-outline btn-sm mt-4"
              onClick={() => {
                // Quick reset button
                setSearchQuery("");
                setSelectedCategory("");
                setOrdering("");
                setPriceRange([0, 500]);
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          // Pass the data to the component you already built!
          <Services services={services} loading={loading} />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </div>
    </div>
  );
};

export default ShopPage;