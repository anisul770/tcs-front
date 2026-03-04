import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router";
import {
  ArrowLeft,
  CreditCard,
  Printer,
  Hash,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuthContext from "../../hooks/useAuthContext"; // Ensure path is correct
import BookingDetailsLeft from "./BookingDetailsLeft";
import BookingDetailsRight from "./BookingDetailsRight";
import useBookingContext from "../../hooks/useBookingContext";

const BookingDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  // Destructure currentOrder from the context
  const {
    fetchOrderDetails,
    currentOrder,
    actionLoading,
    updateOrderStatus,
    cancelBooking,
    bookingPayment
  } = useBookingContext();
  const { user } = useAuthContext();
  // 1. Point the order variable to currentOrder from the hook
  const [order, setOrder] = useState(location.state?.orderData || null);
  const [loading, setLoading] = useState(!order);


  useEffect(() => {
    if (currentOrder && currentOrder.id === id) {
      setOrder(currentOrder);
      setLoading(false);
    }
  }, [currentOrder, id]);

  useEffect(() => {
    const loadData = async () => {
      // If we don't have order in state, ensure loader is visible
      if (!order) setLoading(true);
      await fetchOrderDetails(id);
      // Loading stops once the sync useEffect above triggers
    };
    loadData();
  }, [id, fetchOrderDetails, order]);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    const res = await cancelBooking(id);
    if (res.success) setOrder(res.data);
    else toast.error(res.msg);
  };

  const handleStatusChange = async (newStatus) => {
    const res = await updateOrderStatus(id, newStatus);
    if (res.success) setOrder(res.data);
    else toast.error(res.msg);
  };

  const handlePayment = async () => {
    const res = await bookingPayment(order);
    if(!res.success) toast.error(res.msg || "Something went Wrong");
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner text-primary loading-lg"></span>
      <p className="text-xs font-bold uppercase tracking-widest opacity-40">Retrieving Order...</p>
    </div>
  );

  if (!order) return <div className="text-center py-20 font-bold">Order not found.</div>;

  const isCancelled = order.status === "Canceled";
  const isCompleted = order.status === "Completed";

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <Link to="/dashboard/bookings" className="btn btn-ghost btn-xs gap-2 mb-2 opacity-50 hover:opacity-100 -ml-2">
            <ArrowLeft size={14} /> Back to History
          </Link>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Order <span className="text-primary">Summary</span>
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs font-mono font-bold opacity-40">
              <Hash size={12} /> {order.id}
            </span>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="btn btn-outline btn-sm gap-2 flex-1 md:flex-none">
            <Printer size={16} /> Print
          </button>
          {order.status === "Not Paid" && !isCancelled && !user.is_staff && (
            <button disabled={actionLoading} onClick={handlePayment} className="btn btn-primary btn-sm gap-2 flex-1 md:flex-none shadow-lg shadow-primary/20">
              <CreditCard size={16} /> Pay Now
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <BookingDetailsLeft order={order} />

        {/* Right Column */}
        <BookingDetailsRight user={user}
          actionLoading={actionLoading}
          handleStatusChange={handleStatusChange}
          handleCancel={handleCancel}
          order={order}
          isCancelled={isCancelled}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
};

export default BookingDetails;