import React from 'react';

const ServicePricingCard = ({ price }) => {
  return (
    <div className="card bg-base-100 shadow-2xl border border-primary/20 sticky top-28">
      <div className="card-body p-8">
        
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Total Investment</h2>
        <div className="flex items-end gap-2 mb-6">
          <span className="text-5xl font-black text-primary">${price}</span>
          <span className="text-gray-500 mb-1">/ session</span>
        </div>

        <ul className="space-y-3 mb-8 text-sm text-gray-600 border-t border-b border-base-200 py-6">
          <li className="flex justify-between">
            <span>Duration:</span> <span className="font-bold text-base-content">~ 3-4 Hours</span>
          </li>
          <li className="flex justify-between">
            <span>Availability:</span> <span className="font-bold text-success">Next Day</span>
          </li>
          <li className="flex justify-between">
            <span>Cancellation:</span> <span className="font-bold text-base-content">24h Notice</span>
          </li>
        </ul>

        <button className="btn btn-primary btn-lg w-full rounded-full shadow-lg shadow-primary/30 hover:-translate-y-1 transition-transform">
          Book This Service
        </button>
        
        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
          🔒 Secure checkout via sslcommerze
        </p>

      </div>
    </div>
  );
};

export default ServicePricingCard;