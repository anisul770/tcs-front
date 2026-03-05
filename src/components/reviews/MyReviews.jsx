import { useEffect, useState } from 'react';
import { Star, MessageSquare, Calendar, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import authApiClient from '../../services/auth-api-client';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyReviews = async () => {
      try {
        // Calling your new endpoint!
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
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black italic text-primary uppercase tracking-tighter">
          My <span className="text-base-content">Reviews</span>
        </h1>
        <p className="text-sm text-gray-500 font-medium italic">Feedback you've shared with our community.</p>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
          <MessageSquare size={48} className="mx-auto mb-4 text-base-300" />
          <h3 className="text-xl font-bold opacity-50">You haven't written any reviews yet.</h3>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.id} className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-all overflow-hidden group">
              <div className="h-1.5 bg-primary w-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="card-body p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black uppercase italic text-sm text-primary tracking-wider">
                      Service ID: {review.service}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                    <Calendar size={12} />
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -top-2 -left-2 text-4xl text-primary/10 font-serif">“</span>
                  <p className="text-base-content/80 text-sm italic leading-relaxed relative z-10 pl-4">
                    {review.comment}
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