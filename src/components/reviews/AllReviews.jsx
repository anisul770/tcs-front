import { useEffect, useState } from 'react';
import { Star, Loader2, UserCircle, Calendar, BarChart3, TrendingUp, Quote, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '../../services/api-client';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const res = await apiClient.get('/all_reviews/');
        setReviews(res.data);
      } catch (err) {
        toast.error(err.response?.data||"Failed to load review data.");
      } finally {
        setLoading(false);
      }
    };
    getAllReviews();
  }, []);

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length).toFixed(1) 
    : "0.0";

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      {/* --- HEADER & STATS SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black italic text-primary uppercase tracking-tighter">
            Review <span className="text-base-content">Transparency</span>
          </h1>
          <div className="h-1 w-24 bg-primary mt-2"></div>
          <p className="text-xs text-gray-500 font-bold uppercase mt-3 tracking-widest">Read-Only Administrative View</p>
        </div>

        <div className="flex gap-4">
          <div className="bg-base-100 border border-base-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-primary/10 rounded-xl text-primary"><BarChart3 size={20}/></div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400">Total Feedback</p>
              <p className="text-xl font-black italic">{reviews.length}</p>
            </div>
          </div>
          <div className="bg-base-100 border border-base-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-yellow-400/10 rounded-xl text-yellow-500"><TrendingUp size={20}/></div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400">Avg. Rating</p>
              <p className="text-xl font-black italic">{avgRating} / 5.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- REVIEWS GRID --- */}
      {reviews.length === 0 ? (
        <div className="text-center py-20 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300">
          <h3 className="text-xl font-bold opacity-30 uppercase italic">No reviews currently in the system</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-base-100 rounded-3xl border border-base-200 flex flex-col shadow-sm hover:shadow-md transition-all relative overflow-hidden h-full"
            >
              {/* Quality Indicator Edge */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${review.rating >= 4 ? 'bg-success' : review.rating <= 2 ? 'bg-error' : 'bg-warning'}`}></div>

              <div className="p-6 flex flex-col h-full">
                {/* User Header */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                      <UserCircle size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase italic leading-tight">{review.user.name}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">ID: {review.user.id}</p>
                    </div>
                  </div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase bg-base-200/50 py-1 px-2 rounded">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>

                {/* Service Details */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded flex items-center gap-1">
                      <Tag size={8} /> {review.service.category.name}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-base-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-md font-black italic text-base-content uppercase tracking-tight leading-tight">
                    {review.service.name}
                  </h3>
                </div>

                {/* Feedback Content */}
                <div className="relative bg-base-200/30 p-4 rounded-2xl border border-base-200/50 flex-grow">
                  <Quote className="absolute -right-1 -bottom-1 text-primary/5 w-12 h-12 rotate-12" />
                  <p className="text-sm font-medium italic text-base-content/80 relative z-10 leading-relaxed line-clamp-4">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;