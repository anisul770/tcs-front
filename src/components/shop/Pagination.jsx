import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // Don't show pagination if there's only 1 page

  return (
    <div className="flex justify-center my-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="join bg-base-100 shadow-2xl border border-base-200 rounded-[1.5rem] p-1.5">
        
        {/* --- Previous Button --- */}
        <button 
          className="join-item btn btn-ghost hover:bg-base-200/50 disabled:bg-transparent disabled:opacity-30 rounded-xl px-4 transition-all" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={18} strokeWidth={3} />
        </button>
        
        {/* --- Page Numbers --- */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          const isActive = currentPage === pageNum;
          
          return (
            <button 
              key={pageNum}
              className={`join-item btn border-none rounded-xl transition-all duration-300 w-12 ${
                isActive 
                ? 'bg-primary hover:bg-primary text-primary-content font-black italic text-lg shadow-lg shadow-primary/30' 
                : 'btn-ghost hover:bg-base-200/50 text-base-content/60 font-bold'
              }`}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        {/* --- Next Button --- */}
        <button 
          className="join-item btn btn-ghost hover:bg-base-200/50 disabled:bg-transparent disabled:opacity-30 rounded-xl px-4 transition-all" 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={18} strokeWidth={3} />
        </button>
        
      </div>
    </div>
  );
};

export default Pagination;  