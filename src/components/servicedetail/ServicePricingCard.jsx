import React, { useState } from 'react';
import useCartContext from '../../hooks/useCartContext';
import { useNavigate } from 'react-router';
import { Loader2, ShoppingCart, Zap } from 'lucide-react';

const ServicePricingCard = ({ price, service }) => {

  const { addCartItems } = useCartContext();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Flow 1: Just add to cart and stay on page
  const handleAddToCart = async () => {
    setIsAdding(true);
    await addCartItems(service.id, 1);
    setIsAdding(false);
  };

  // Flow 2: Direct Booking (Add to cart + Redirect to Cart Page)
  const handleDirectBooking = async () => {
    setIsBooking(true);
    await addCartItems(service.id, 1);
    navigate("/dashboard/cart"); // Take them straight to the finish line
  };

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

        <div className="space-y-3">
          {/* Primary Action: Direct Booking */}
          <button
            disabled={isBooking || isAdding}
            onClick={handleDirectBooking}
            className="btn btn-primary btn-lg w-full rounded-full shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all group"
          >
            {isBooking ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Zap size={20} className="fill-current" />
                Book Now
              </>
            )}
          </button>

          {/* Secondary Action: Add to Cart */}
          <button
            disabled={isAdding || isBooking}
            onClick={handleAddToCart}
            className="btn btn-outline btn-primary btn-lg w-full rounded-full border-2 hover:-translate-y-1 transition-all"
          >
            {isAdding ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <ShoppingCart size={20} />
                Add to Cart
              </>
            )}
          </button>

          <p className="text-[10px] text-center opacity-50 font-bold uppercase tracking-widest mt-4">
            Free cancellation up to 24h before
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
          🔒 Secure checkout via sslcommerze
        </p>

      </div>
    </div>
  );
};

export default ServicePricingCard;