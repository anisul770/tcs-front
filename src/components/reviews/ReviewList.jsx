import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewList = () => {
  // Matches Django API structure: user_name, rating, comment
  const reviews = [
    { id: 1, user_name: "Alice Wang", rating: 5, comment: "Best service I've ever used. So transparent!" },
    { id: 2, user_name: "Robert Fox", rating: 4, comment: "Very professional and on time. Highly recommended." },
    { id: 3, user_name: "Sarah J.", rating: 5, comment: "The deep clean made my house look brand new." },
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        
        {/* Horizontal Scroll/Carousel on Mobile, Grid on Desktop */}
        <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto gap-6 pb-6 lg:pb-0 scrollbar-hide">
          {reviews.map(rev => (
            <div key={rev.id} className="w-[85%] lg:w-full shrink-0">
              <ReviewCard 
                user_name={rev.user_name} 
                rating={rev.rating} 
                comment={rev.comment} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewList;