import { useEffect, useState } from 'react';
import { Star, MessageSquare, Calendar, Loader2, Tag, Quote, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import authApiClient from '../../services/auth-api-client';
import { Link } from 'react-router';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyReviews = async () => {
      try {
        const res = await authApiClient.get('/all_reviews/mine/');
        setReviews(res.data);
      } catch (err) {
        toast.error(err.response?.data || "Failed to load your reviews.");
      } finally {
        setLoading(false);
      }
    };
    getMyReviews();
  }, []);

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black italic text-primary uppercase tracking-tighter">
          My <span className="text-base-content">Feedback</span>
        </h1>
        <div className="h-1 w-20 bg-primary mt-2"></div>
        <p className="text-sm text-gray-500 font-medium italic mt-2">History of your service experiences.</p>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300">
          <MessageSquare size={48} className="mx-auto mb-4 text-base-300" />
          <h3 className="text-xl font-bold opacity-50 uppercase italic">No reviews found.</h3>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.id} className="relative group">
              {/* Background Decorative Element */}
              <div className="absolute inset-0 bg-primary/5 rounded-3xl rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>

              <div className="relative bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200 hover:shadow-xl transition-all duration-300">

                {/* Top Section: Category & Date */}
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                    <Tag size={10} /> {review.service.category.name}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                    <Calendar size={12} />
                    {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                {/* Service Details */}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/services/${review.service.id}`} className="flex-grow">
                      <h3 className="text-lg font-black italic uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors line-clamp-1">
                        {review.service.name}
                      </h3>
                    </Link>
                    <Link to={`/services/${review.service.id}`} className="p-1.5 rounded-full bg-base-200 group-hover:bg-primary group-hover:text-primary-content transition-all ml-2">
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                  <p className="text-primary font-bold text-sm mt-1">${review.service.price}</p>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-base-300"}
                    />
                  ))}
                  <span className="ml-2 text-xs font-black text-base-content/40">{review.rating}/5</span>
                </div>

                {/* The Comment (Footer removed, padding adjusted) */}
                <div className="bg-base-200/50 p-4 rounded-xl relative overflow-hidden">
                  <Quote className="absolute -right-2 -bottom-2 text-primary/10 w-12 h-12" />
                  <p className="text-sm font-medium italic text-base-content/80 relative z-10">
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

export default MyReviews;