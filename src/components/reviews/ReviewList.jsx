import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { Sparkles, Loader2 } from 'lucide-react';
import apiClient from '../../services/api-client';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get('/all_reviews/');
        const topReviews = response.data
          .filter(r => r.rating >= 4)
          .slice(0, 6);
        setReviews(topReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-24 bg-base-100 overflow-hidden relative">
      {/* Decorative Brand Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none opacity-[0.02] select-none text-center">
        <h1 className="text-[15vw] font-black italic uppercase leading-none">Trust & Quality</h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-[0.3em] text-xs mb-4">
            <Sparkles size={14} /> The Wall of Love
          </div>
          <h2 className="text-5xl md:text-6xl font-black italic text-base-content uppercase tracking-tighter leading-none">
            What Our <span className="text-primary">Clients</span> Say
          </h2>
          <div className="h-1.5 w-32 bg-primary mt-6 rounded-full"></div>
        </div>

        {loading ? (
          /* SKELETON LOADING STATE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 w-full bg-base-200 animate-pulse rounded-[1.8rem]"></div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center opacity-50 italic font-bold uppercase tracking-widest">
            No verified reviews yet. Be the first!
          </div>
        ) : (
          /* ACTUAL DATA GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {reviews.map(rev => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        {/* <div className="mt-20 text-center">
          <button className="btn btn-primary btn-wide font-black italic uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
            Read All Reviews
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default ReviewList;