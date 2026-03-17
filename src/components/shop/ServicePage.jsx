import React, { useState, useEffect } from 'react';
import Services from './Services';
import useCategories from '../../hooks/useCategories';
import useServices from '../../hooks/useServices';
import FilterSection from './FilterSection';
import Pagination from './Pagination';
import { useLocation } from 'react-router';

// Helper component for the Skeleton Card
const ServiceSkeleton = () => (
  <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
    <div className="h-48 bg-base-300 animate-pulse"></div> {/* Image placeholder */}
    <div className="card-body p-6 space-y-4">
      <div className="h-4 bg-base-300 animate-pulse rounded w-1/2"></div> {/* Category tag */}
      <div className="h-6 bg-base-300 animate-pulse rounded w-3/4"></div> {/* Title */}
      <div className="space-y-2">
        <div className="h-3 bg-base-300 animate-pulse rounded w-full"></div> {/* Description line 1 */}
        <div className="h-3 bg-base-300 animate-pulse rounded w-5/6"></div> {/* Description line 2 */}
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="h-8 bg-base-300 animate-pulse rounded w-20"></div> {/* Price tag */}
        <div className="h-10 bg-base-300 animate-pulse rounded w-28"></div> {/* Button */}
      </div>
    </div>
  </div>
);

const ShopPage = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ordering, setOrdering] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]); 
  const [searchQuery, setSearchQuery] = useState("");

  const { categories } = useCategories();

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategory(categoryId);
    }
  }, [location]);

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

        <FilterSection
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          ordering={ordering} setOrdering={setOrdering}
          priceRange={priceRange} setPriceRange={setPriceRange}
          categories={categories}
        />

        {errorMsg && (
          <div className="alert alert-error my-4">
            <span>Something went wrong while fetching services.</span>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Service List / Skeleton Loading State */}
        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Display 6 skeletons while loading */}
            {[...Array(6)].map((_, index) => (
              <ServiceSkeleton key={index} />
            ))}
          </div>
        ) : services.length === 0 && !errorMsg ? (
          <div className="text-center py-20 bg-base-100 rounded-2xl">
            <h3 className="text-xl font-bold opacity-50">No services found matching your filters.</h3>
            <button
              className="btn btn-outline btn-sm mt-4"
              onClick={() => {
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
          <Services services={services} loading={loading} />
        )}

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