import { Link } from "react-router";
import { Calendar, Package, ArrowRight, Loader2, Search } from "lucide-react";
import useBookingContext from "../hooks/useBookingContext";
import { useEffect } from "react";

const BookingsList = () => {
  const { bookings, isLoading, fetchBookings } = useBookingContext();

  useEffect(() => {
    // Only fetch if we don't have bookings yet, or to ensure fresh data
    fetchBookings();
  }, [fetchBookings]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ready To Go":
      case "Delivered":
        return <span className="badge badge-success badge-sm font-bold uppercase text-[10px] py-3 px-4 italic">Delivered</span>;
      case "Not Paid":
        return <span className="badge badge-error badge-sm font-bold uppercase text-[10px] py-3 px-4 italic">Not Paid</span>;
      case "Pending":
        return <span className="badge badge-warning badge-sm font-bold uppercase text-[10px] py-3 px-4 italic">Pending</span>;
      case "Canceled":
        return <span className="badge badge-ghost badge-sm font-bold uppercase text-[10px] py-3 px-4 italic opacity-50">Canceled</span>;
      default:
        return <span className="badge badge-ghost badge-sm font-bold uppercase text-[10px] py-3 px-4 italic">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic text-base-content uppercase tracking-tighter">
            My <span className="text-primary">Bookings</span>
          </h1>
          <p className="text-base-content/50 font-medium mt-1">
            Track your cleaning appointments and order history.
          </p>
        </div>
        <Link to="/services" className="btn btn-primary shadow-xl shadow-primary/20 group">
          Book New Service
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-24 flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-xs font-bold uppercase opacity-40 tracking-widest">Loading your history...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-20 text-center">
            <div className="bg-base-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={30} className="opacity-20" />
            </div>
            <p className="text-xl font-bold italic">No bookings found</p>
            <p className="text-sm opacity-50 mt-2 mb-6">You haven't scheduled any cleaning services yet.</p>
            <Link to="/dashboard/services" className="btn btn-outline btn-sm">Start Browsing</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-base-200/50 text-base-content/70 uppercase text-[11px] font-black tracking-widest">
                  <th className="py-5 pl-8">Booking Reference</th>
                  <th>Date Placed</th>
                  <th>Services</th>
                  <th>Total Amount</th>
                  <th>Payment</th>
                  <th className="text-right pr-8">Details</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {bookings.map((order) => (
                  <tr key={order.id} className="hover:bg-base-200/30 transition-colors group">
                    <td className="py-6 pl-8 font-mono text-xs font-bold text-primary">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="opacity-40" />
                        {formatDate(order.created_at)}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold">
                          {order.items[0]?.service?.name || "Service"}
                        </span>
                        {order.items.length > 1 && (
                          <span className="text-[10px] opacity-50 font-bold uppercase italic text-primary">
                            + {order.items.length - 1} other services
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="font-black text-base">
                      €{parseFloat(order.total_price).toFixed(2)}
                    </td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td className="text-right pr-8">
                      <Link
                        to={`/dashboard/bookings/${order.id}`}
                        state={{ orderData: order }} // This passes the object without showing it in the URL
                        className="btn btn-ghost btn-sm btn-circle hover:bg-primary"
                      >
                        <Search size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsList;