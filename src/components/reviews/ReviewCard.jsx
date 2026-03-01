import React from 'react';

const ReviewCard = ({ user_name, rating, comment }) => {
  return (
    <div className="card w-full bg-base-100 border border-base-300 shadow-sm shrink-0">
      <div className="card-body p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar placeholder">
            <div className="bg-primary flex items-center justify-center text-primary-content rounded-full w-10">
              <span className="text-xs">{user_name.charAt(0)}</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm">{user_name}</h4>
            <div className="rating rating-xs">
              {[...Array(5)].map((_, i) => (
                <input 
                  key={i} 
                  type="radio" 
                  className={`mask mask-star-2 ${i < rating ? 'bg-orange-800' : 'bg-gray-300'}`} 
                  disabled 
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm italic">"{comment}"</p>
      </div>
    </div>
  );
};

export default ReviewCard;