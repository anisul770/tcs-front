import React from 'react';
import { Star, Quote, CheckCircle2, Zap } from 'lucide-react';

const ReviewCard = ({ review }) => {
  // Destructuring based on your Django API structure
  const { user, rating, comment, service } = review;

  return (
    <div className="group relative h-full">
      {/* Dynamic Background Glow based on Rating */}
      <div className={`absolute -inset-1 rounded-[2rem] blur opacity-10 group-hover:opacity-40 transition duration-500 ${rating >= 4 ? 'bg-primary' : 'bg-accent'}`}></div>
      
      <div className="relative h-full card bg-base-100 border border-base-200 shadow-sm rounded-[1.8rem] p-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
        
        {/* Floating Quote Icon */}
        <Quote className="absolute top-6 right-8 text-primary/5 w-12 h-12 rotate-12 group-hover:rotate-0 transition-transform duration-500" />

        <div className="flex flex-col h-full">
          {/* User & Verification Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="avatar">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-content font-black shadow-lg shadow-primary/20 rotate-3 group-hover:rotate-0 transition-all">
                {user?.name?.charAt(0) || "U"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h4 className="font-black italic uppercase text-sm tracking-tight">{user?.name}</h4>
                <CheckCircle2 size={12} className="text-success" />
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Verified Experience
              </p>
            </div>
          </div>

          {/* Service Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-0.5 bg-base-200 text-[9px] font-black uppercase italic rounded flex items-center gap-1">
              <Zap size={10} className="text-primary" /> {service?.name}
            </span>
          </div>

          {/* Star Rating */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-base-300"} 
              />
            ))}
          </div>

          {/* Review Text */}
          <p className="text-base-content/70 text-sm italic font-medium leading-relaxed flex-grow">
            "{comment}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;