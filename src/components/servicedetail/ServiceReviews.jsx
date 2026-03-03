import { useEffect, useState } from "react";
import { Star, MessageSquare, Edit2, Trash2, Loader2, Plus, ShieldCheck } from "lucide-react";
import apiClient from "../../services/api-client";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";
import toast from "react-hot-toast";

const ServiceReviews = ({ serviceId }) => {
  const { user } = useAuthContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canReview, setCanReview] = useState(false); // New permission state

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await apiClient.get(`/services/${serviceId}/reviews/`);
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if user has ordered this specific service
  const checkOrderPermission = async () => {
    if (!user) return;
    try {
      const res = await authApiClient.get(`/services/has-ordered/${serviceId}/`);
      setCanReview(res.data.hasOrdered);
    } catch (error) {
      setCanReview(false);
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchReviews();
      checkOrderPermission();
    }
  }, [serviceId, user]);

  const userHasReviewed = reviews.some(r => r.user?.id === user?.id);

  // ... (Keep openModal, closeModal, handleDelete, and handleSubmit logic from previous version)
  const openModal = (review = null) => {
    if (review) {
      setEditingReviewId(review.id);
      setRating(review.rating);
      setComment(review.comment);
    } else {
      setEditingReviewId(null);
      setRating(5);
      setComment("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReviewId(null);
    setRating(5);
    setComment("");
  };

  const handleSubmit = async () => {
    if (comment.length < 5) return toast.error("Please write a longer comment.");
    setActionLoading(true);
    try {
      if (editingReviewId) {
        await authApiClient.patch(`/services/${serviceId}/reviews/${editingReviewId}/`, { rating, comment });
        toast.success("Review updated");
      } else {
        await authApiClient.post(`/services/${serviceId}/reviews/`, { service: serviceId, rating, comment });
        toast.success("Review posted!");
      }
      closeModal();
      fetchReviews();
    } catch (error) {
      toast.error( error.response?.data || "Action failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await authApiClient.delete(`/services/${serviceId}/reviews/${reviewId}/`);
      toast.success("Review deleted");
      fetchReviews();
    } catch (error) { 
      toast.error(error.response?.data || "Delete failed"); 
    }
  };

  if (loading) return <div className="flex justify-center py-10"><span className="loading loading-spinner text-primary"></span></div>;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-base-200/30 p-4 rounded-2xl border border-base-200">
        <p className="text-xs font-black uppercase tracking-widest opacity-50">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </p>
        
        {/* Permission-based Button Logic */}
        {user && canReview && !userHasReviewed && (
          <button onClick={() => openModal()} className="btn btn-primary btn-sm gap-2 rounded-full">
            <Plus size={14} /> Write Review
          </button>
        )}

        {user && !canReview && (
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-base-content/40 italic">
            <ShieldCheck size={12} /> {userHasReviewed ? 'Already Reviewed' : 'Only verified customers can review'}
          </div>
        )}
      </div>

      {/* Review List & Modal Rendering (Same as before but with verified check UI) */}
      <div className="space-y-4">
        {reviews.map((review) => {
          const isOwner = user && user.id === review.user?.id;
          return (
            <div key={review.id} className={`p-6 bg-base-100 border rounded-3xl shadow-sm ${isOwner ? 'border-primary/30 ring-1 ring-primary/10' : 'border-base-200'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-black italic text-base-content uppercase text-sm flex items-center gap-2">
                    {review.user?.name || "Customer"}
                    {isOwner && <span className="badge badge-primary badge-sm text-[8px] font-black italic">YOU</span>}
                  </h4>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">
                    {new Date(review.created_at).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} className={star <= review.rating ? "fill-primary text-primary" : "text-base-300 fill-base-200"} />
                    ))}
                  </div>
                  {isOwner && (
                    <div className="flex gap-1">
                      <button onClick={() => openModal(review)} className="btn btn-ghost btn-xs text-base-content/40 hover:text-primary"><Edit2 size={12}/></button>
                      <button onClick={() => handleDelete(review.id)} className="btn btn-ghost btn-xs text-base-content/40 hover:text-error"><Trash2 size={12}/></button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm opacity-80 leading-relaxed font-medium italic">"{review.comment}"</p>
            </div>
          );
        })}
      </div>

      {/* Modal structure (stays the same) */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box border border-base-300 p-8">
          <h3 className="text-2xl font-black italic uppercase text-primary mb-6">
            {editingReviewId ? "Edit Review" : "Verified Review"}
          </h3>
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className="transition-transform active:scale-90">
                <Star size={36} className={star <= rating ? "fill-primary text-primary" : "text-base-300"} />
              </button>
            ))}
          </div>
          <textarea className="textarea textarea-bordered w-full h-32 font-medium" placeholder="Describe your experience..." value={comment} onChange={(e) => setComment(e.target.value)} />
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button onClick={handleSubmit} disabled={actionLoading} className="btn btn-primary px-8 rounded-full">
              {actionLoading ? <Loader2 className="animate-spin" size={16} /> : "Post Review"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ServiceReviews;