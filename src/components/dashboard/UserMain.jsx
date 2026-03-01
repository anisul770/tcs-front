import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const UserMain = () => {
  const { user } = useAuthContext();
  
  // Logical fallback for display name
  const displayName = user?.first_name 
    ? `${user.first_name} ${user.last_name}` 
    : user?.email?.split('@')[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Howdy, {displayName}! 👋</h1>
          <p className="text-base-content/60 mt-1">Everything looks sparkly clean on our end.</p>
        </div>
        <Link to="/services" className="btn btn-primary shadow-lg shadow-primary/20">
          Book New Service
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-base-100 rounded-3xl border border-base-300 shadow-sm">
          <div className="stat-figure text-primary text-3xl">📅</div>
          <div className="stat-title font-bold">Next Cleaning</div>
          <div className="stat-value text-2xl">Oct 12th</div>
          <div className="stat-desc font-medium">at 10:00 AM</div>
        </div>
        
        <div className="stat bg-base-100 rounded-3xl border border-base-300 shadow-sm">
          <div className="stat-figure text-secondary text-3xl">✨</div>
          <div className="stat-title font-bold">Total Cleanings</div>
          <div className="stat-value text-2xl">08</div>
          <div className="stat-desc">Since joining</div>
        </div>

        <div className="stat bg-base-100 rounded-3xl border border-base-300 shadow-sm">
          <div className="stat-figure text-accent text-3xl">🏆</div>
          <div className="stat-title font-bold">Loyalty Points</div>
          <div className="stat-value text-2xl">450</div>
          <div className="stat-desc">€10 off next time</div>
        </div>
      </div>

      {/* Recent Activity / Placeholder */}
      <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-base-200 bg-base-50/50">
          <h3 className="font-bold text-lg text-base-content">Recent Booking History</h3>
        </div>
        <div className="p-10 text-center space-y-4">
          <div className="text-5xl">🧹</div>
          <p className="text-base-content/50 max-w-xs mx-auto">
            You haven't made any bookings yet. Ready to see your home shine?
          </p>
          <Link to="/services" className="btn btn-ghost btn-sm text-primary">Browse Services →</Link>
        </div>
      </div>
    </div>
  );
};

export default UserMain;