import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const StaffMain = () => {
  const { user } = useAuthContext();
  
  // Handling name fallback without username
  const staffDisplayName = user?.first_name 
    ? `${user.first_name} ${user.last_name}` 
    : user?.email?.split('@')[0];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* 1. TOP PART (Keeping as requested) */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content">Staff Command Center</h1>
          <p className="text-base-content/60 mt-1">Logged in as: <span className="font-bold text-primary">{staffDisplayName}</span></p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-outline">Export Reports</button>
          <button className="btn btn-sm btn-primary">Schedule Staff</button>
        </div>
      </header>

      {/* 2. HIGH LEVEL METRICS (Keeping as requested) */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-sm bg-base-100 border border-base-300 w-full rounded-3xl">
        <div className="stat">
          <div className="stat-title font-bold">New Bookings</div>
          <div className="stat-value text-primary">14</div>
          <div className="stat-desc">Last 24 hours</div>
        </div>
        <div className="stat">
          <div className="stat-title font-bold">Pending Approval</div>
          <div className="stat-value text-warning">05</div>
          <div className="stat-desc">Needs assignment</div>
        </div>
        <div className="stat">
          <div className="stat-title font-bold">Today's Revenue</div>
          <div className="stat-value text-success">€1,240</div>
          <div className="stat-desc">↗︎ 12% from yesterday</div>
        </div>
        <div className="stat">
          <div className="stat-title font-bold">Active Cleaners</div>
          <div className="stat-value">08</div>
          <div className="stat-desc">On-site now</div>
        </div>
      </div>

      {/* 3. NEW BOTTOM PART: Operational Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Recent Bookings Table (Takes 2/3 space) */}
        <div className="lg:col-span-2 card bg-base-100 border border-base-300 shadow-sm">
          <div className="p-6 border-b border-base-200 flex justify-between items-center">
            <h3 className="font-black text-lg">Upcoming Appointments</h3>
            <Link to="/dashboard/manage-bookings" className="link link-primary text-sm no-underline font-bold">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="text-base-content/50">
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date/Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="font-bold text-sm">John Doe</div>
                    <div className="text-[10px] opacity-50">john.d@example.com</div>
                  </td>
                  <td>Deep Home Clean</td>
                  <td className="text-sm">Today, 14:30</td>
                  <td><span className="badge badge-success badge-sm py-2 text-white font-bold">Assigned</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="font-bold text-sm">Mila Kunis</div>
                    <div className="text-[10px] opacity-50">m.kunis@holiday.com</div>
                  </td>
                  <td>End of Tenancy</td>
                  <td className="text-sm">Tomorrow, 09:00</td>
                  <td><span className="badge badge-warning badge-sm py-2 font-bold text-warning-content">Pending</span></td>
                </tr>
                <tr>
                  <td>
                    <div className="font-bold text-sm">Local Office Inc.</div>
                    <div className="text-[10px] opacity-50">admin@office.ie</div>
                  </td>
                  <td>Office recurring</td>
                  <td className="text-sm">Oct 15, 11:00</td>
                  <td><span className="badge badge-ghost badge-sm py-2 font-bold">Scheduled</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Activity Feed (Takes 1/3 space) */}
        <div className="card bg-base-100 border border-base-300 shadow-sm p-6">
          <h3 className="font-black text-lg mb-6">Recent Activity</h3>
          <ul className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-base-300 before:to-transparent">
            <li className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary z-10 shrink-0 border-4 border-base-100">
                  ✨
                </div>
                <div>
                  <p className="text-sm font-bold leading-none">New Booking</p>
                  <p className="text-xs opacity-60 mt-1">Kitchen deep clean by Sarah W.</p>
                </div>
              </div>
              <span className="text-[10px] opacity-40 font-bold whitespace-nowrap">2m ago</span>
            </li>
            <li className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary z-10 shrink-0 border-4 border-base-100">
                  ⭐
                </div>
                <div>
                  <p className="text-sm font-bold leading-none">New Review</p>
                  <p className="text-xs opacity-60 mt-1">5-star from Mike Ross</p>
                </div>
              </div>
              <span className="text-[10px] opacity-40 font-bold whitespace-nowrap">45m ago</span>
            </li>
            <li className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center text-info z-10 shrink-0 border-4 border-base-100">
                  💳
                </div>
                <div>
                  <p className="text-sm font-bold leading-none">Payment Received</p>
                  <p className="text-xs opacity-60 mt-1">Invoice #2041 Paid</p>
                </div>
              </div>
              <span className="text-[10px] opacity-40 font-bold whitespace-nowrap">2h ago</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default StaffMain;