import { useEffect } from "react";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import useBooking from "../../hooks/useBooking"; // This hook manages your Orders

const UserMain = () => {
  const { user } = useAuthContext();
  const { bookings, fetchBookings, isLoading } = useBooking();

  // Load bookings (bookings) on mount
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // 1. Calculate Total Cleanings (Where status is Delivered)
  const completedOrders = bookings?.filter(o => o.status === "Delivered") || [];
  const totalCleanings = completedOrders.length;

  // 2. Find Next Upcoming Cleaning (Future date, not cancelled)
  const nextBooking = bookings
    ?.filter(o => new Date(o.booking_date) >= new Date() && o.status !== "Canceled")
    .sort((a, b) => new Date(a.booking_date) - new Date(b.booking_date))[0];

  // 3. Loyalty Points Logic (e.g., 50 points per completed booking)
  const points = totalCleanings * 50;

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

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name}`
    : user?.email?.split('@')[0];

  if (isLoading) return <div className="flex justify-center p-20"><span className="loading loading-dots loading-lg"></span></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight italic uppercase">Howdy, {displayName}! 👋</h1>
          <p className="text-base-content/60 mt-1">Everything looks sparkly clean on our end.</p>
        </div>
        <Link to="/services" className="btn btn-primary shadow-lg shadow-primary/20 font-black italic">
          Book New Service
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-base-100 rounded-3xl border border-base-300 shadow-sm">
          <div className="stat-figure text-primary text-3xl">📅</div>
          <div className="stat-title font-bold">Next Cleaning</div>
          <div className="stat-value text-xl">
            {nextBooking ? new Date(nextBooking.booking_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : "None"}
          </div>
          <div className="stat-desc font-medium">
            {nextBooking ? `at ${nextBooking.booking_time || 'Pending'}` : "Book your next clean!"}
          </div>
        </div>

        <div className="stat bg-base-100 rounded-3xl border border-base-300 shadow-sm">
          <div className="stat-figure text-secondary text-3xl">✨</div>
          <div className="stat-title font-bold">Total Cleanings</div>
          <div className="stat-value text-2xl">{totalCleanings.toString().padStart(2, '0')}</div>
          <div className="stat-desc">Since joining</div>
        </div>

        <div className="stat bg-base-100 rounded-3xl border border-base-300 shadow-sm">
          <div className="stat-figure text-accent text-3xl">🏆</div>
          <div className="stat-title font-bold">Loyalty Points</div>
          <div className="stat-value text-2xl">{points}</div>
          <div className="stat-desc">Earn more with every clean</div>
        </div>
      </div>

      {/* Recent Activity / Table */}
      <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-base-200 bg-base-50/50">
          <h3 className="font-bold text-lg text-base-content">Recent Booking History</h3>
        </div>

        {bookings && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-xs uppercase opacity-50">
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-base-200/50 transition-colors">
                    <td className="font-bold"><Link to={`/dashboard/bookings/${booking.id}`} state={{ orderData: booking }}>{booking.items?.[0]?.service.name || "Cleaning"}</Link></td>
                    <td>{new Date(booking.created_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td>
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="font-mono text-xs">€{booking.total_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center space-y-4">
            <div className="text-5xl">🧹</div>
            <p className="text-base-content/50 max-w-xs mx-auto">
              You haven't made any bookings yet. Ready to see your home shine?
            </p>
            <Link to="/services" className="btn btn-ghost btn-sm text-primary">Browse Services →</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMain;