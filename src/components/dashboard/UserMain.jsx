import { useEffect } from "react";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import useBooking from "../../hooks/useBooking";
import { Calendar, Trophy, Sparkles, ArrowRight, Clock, ShieldCheck, Zap } from "lucide-react";

const UserMain = () => {
  const { user } = useAuthContext();
  const { bookings, fetchBookings, isLoading } = useBooking();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // --- Logic (Unchanged) ---
  const completedOrders = bookings?.filter(o => o.status === "Delivered") || [];
  const totalCleanings = completedOrders.length;
  const nextBooking = bookings
    ?.filter(o => new Date(o.booking_date) >= new Date() && o.status !== "Canceled")
    .sort((a, b) => new Date(a.booking_date) - new Date(b.booking_date))[0];
  const points = totalCleanings * 50;

  const getStatusBadge = (status) => {
    const baseClass = "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic border";
    switch (status) {
      case "Ready To Go":
      case "Delivered":
        return <span className={`${baseClass} bg-success/10 text-success border-success/20`}>Delivered</span>;
      case "Not Paid":
        return <span className={`${baseClass} bg-error/10 text-error border-error/20`}>Not Paid</span>;
      case "Pending":
        return <span className={`${baseClass} bg-warning/10 text-warning border-warning/20`}>Pending</span>;
      case "Canceled":
        return <span className={`${baseClass} bg-base-200 text-base-content/40 border-base-300`}>Canceled</span>;
      default:
        return <span className={`${baseClass} bg-base-200 text-base-content/60 border-base-300`}>{status}</span>;
    }
  };

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name}`
    : user?.email?.split('@')[0];

  if (isLoading) return (
    <div className="space-y-10 animate-pulse">
      {/* --- Header Skeleton --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="h-3 w-32 bg-base-300 rounded-full opacity-50"></div>
          <div className="h-12 w-64 bg-base-300 rounded-2xl"></div>
          <div className="h-4 w-48 bg-base-300 rounded-lg opacity-40"></div>
        </div>
        <div className="h-12 w-40 bg-base-300 rounded-2xl"></div>
      </div>

      {/* --- Bento Stats Skeleton --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-40 bg-base-300 rounded-[2rem] opacity-80"></div>
        <div className="h-40 bg-base-300 rounded-[2rem] opacity-40"></div>
        <div className="h-40 bg-base-300 rounded-[2rem] opacity-60"></div>
      </div>

      {/* --- Table Skeleton --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-200 overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-base-100 bg-base-200/30">
          <div className="h-6 w-40 bg-base-300 rounded-lg"></div>
        </div>
        <div className="p-8 space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-base-300 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-base-300 rounded-md"></div>
                  <div className="h-3 w-20 bg-base-300 rounded-md opacity-50"></div>
                </div>
              </div>
              <div className="h-4 w-16 bg-base-300 rounded-md"></div>
              <div className="h-8 w-24 bg-base-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-[0.3em] text-[10px] mb-2">
            <Zap size={12} fill="currentColor" /> Account Overview
          </div>

          {/* Now using your robust displayName logic */}
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
            Welcome back, <span className="text-primary">{displayName}</span>
          </h1>

          <p className="text-base-content/50 mt-3 font-medium italic">
            Your space is currently in top-tier condition.
          </p>
        </div>

        <Link to="/services" className="group btn btn-primary px-8 rounded-2xl font-black italic uppercase tracking-widest shadow-xl shadow-primary/20">
          Book a Clean <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* --- BENTO STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Next Cleaning */}
        <div className="relative overflow-hidden bg-neutral text-neutral-content p-8 rounded-[2rem] shadow-xl group">
          <Calendar className="absolute -right-4 -top-4 w-32 h-32 opacity-10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-4">Next Appointment</p>
          <div className="relative z-10">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter">
              {nextBooking ? new Date(nextBooking.booking_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : "No Schedule"}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-primary font-bold italic text-sm">
              <Clock size={14} /> {nextBooking ? `Starts at ${nextBooking.booking_time || 'TBD'}` : "Ready when you are"}
            </div>
          </div>
        </div>

        {/* Total Cleanings */}
        <div className="bg-base-100 border border-base-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40">Lifetime Cleans</p>
            <Sparkles className="text-primary" size={20} />
          </div>
          <h3 className="text-5xl font-black italic tracking-tighter text-base-content">
            {totalCleanings.toString().padStart(2, '0')}
          </h3>
          <p className="text-xs font-bold italic text-base-content/40 mt-2">Professional restorations completed</p>
        </div>

        {/* Loyalty Points */}
        <div className="bg-primary/5 border border-primary/10 p-8 rounded-[2rem] shadow-sm relative overflow-hidden group">
          <Trophy className="absolute right-6 bottom-6 text-primary/10 w-20 h-20" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-4">Loyalty Status</p>
          <h3 className="text-4xl font-black italic tracking-tighter text-base-content">
            {points} <span className="text-sm font-black uppercase tracking-widest opacity-40 ml-1">Points</span>
          </h3>
          <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-primary text-primary-content rounded-xl w-fit text-[10px] font-black uppercase italic tracking-widest">
            <ShieldCheck size={12} /> Pro Member
          </div>
        </div>
      </div>

      {/* --- RECENT ACTIVITY TABLE --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-200 overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-base-100 flex items-center justify-between bg-base-200/30">
          <h3 className="font-black italic uppercase tracking-tighter text-xl">Service History</h3>
          <Link to="/dashboard/bookings" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All</Link>
        </div>

        {bookings && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-lg w-full">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 border-none">
                  <th className="pl-8">Service Category</th>
                  <th>Date Requested</th>
                  <th>Status</th>
                  <th className="text-right pr-8">Investment</th>
                </tr>
              </thead>
              <tbody className="font-medium italic text-sm">
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-base-200/40 transition-colors border-base-200">
                    <td className="pl-8 py-5">
                      <Link
                        to={`/dashboard/bookings/${booking.id}`}
                        state={{ orderData: booking }}
                        className="flex items-center gap-3 group/item"
                      >
                        <div className="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                          <Zap size={16} />
                        </div>
                        <span className="font-black uppercase tracking-tight text-base-content group-hover/item:text-primary transition-colors">
                          {booking.items?.[0]?.service.name || "Standard Clean"}
                        </span>
                      </Link>
                    </td>
                    <td className="opacity-60">
                      {new Date(booking.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td className="text-right pr-8 font-black text-base-content italic">
                      €{booking.total_price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-base-200 rounded-[2rem] flex items-center justify-center mb-6 text-base-content/20">
              <Zap size={40} />
            </div>
            <p className="text-sm font-black italic uppercase tracking-widest text-base-content/40 max-w-xs">
              No restoration history detected.
            </p>
            <Link to="/services" className="mt-4 text-primary font-black italic uppercase tracking-widest text-xs hover:underline">
              Start your first session →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMain;