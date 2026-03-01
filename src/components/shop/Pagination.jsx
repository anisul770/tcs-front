import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // Don't show pagination if there's only 1 page

  return (
    <div className="flex justify-center mt-8">
      <div className="join">
        {/* Previous Button */}
        <button 
          className="join-item btn" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </button>
        
        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button 
              key={pageNum}
              className={`join-item btn ${currentPage === pageNum ? 'btn-active btn-primary' : ''}`}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button 
          className="join-item btn" 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;