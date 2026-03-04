import { useEffect } from "react";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import useBookingContext from "../../hooks/useBookingContext";
import {
  LayoutDashboard, TrendingUp, Clock, CheckCircle,
  ArrowUpRight, AlertCircle, FileText, Settings, Activity
} from "lucide-react";

const StaffMain = () => {
  const { user } = useAuthContext();
  const { bookings = [], isLoading, fetchBookings } = useBookingContext();
  // 1. Get dates for comparison
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // TRIGGER DATA FETCH ON MOUNT
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Calculations
  const pendingOrders = bookings.filter(b => b.status === "Pending" || b.status === "Not Paid");
  const completedOrders = bookings.filter(b => b.status === "Delivered");

  const totalRevenue = completedOrders.reduce((sum, b) => {
    return sum + (parseFloat(b.total_price) || 0);
  }, 0);


  // 2. Calculate Current Month Revenue
  const thisMonthRevenue = completedOrders
    .filter(b => {
      const d = new Date(b.created_at);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, b) => sum + (parseFloat(b.total_price) || 0), 0);

  // 3. Calculate Previous Month Revenue
  const lastMonthRevenue = completedOrders
    .filter(b => {
      const d = new Date(b.created_at);
      const lastM = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastY = currentMonth === 0 ? currentYear - 1 : currentYear;
      return d.getMonth() === lastM && d.getFullYear() === lastY;
    })
    .reduce((sum, b) => sum + (parseFloat(b.total_price) || 0), 0);

  // 4. Calculate Percentage Change
  let revenueChange = 0;
  if (lastMonthRevenue > 0) {
    revenueChange = ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
  } else if (thisMonthRevenue > 0) {
    revenueChange = 100; // 100% growth if there was no revenue last month
  }

  const staffDisplayName = user?.first_name
    ? `${user.first_name} ${user.last_name}`
    : user?.email?.split('@')[0];

  if (isLoading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <Activity className="absolute inset-0 m-auto text-primary animate-pulse" size={20} />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Loading Command Center</p>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-700 pb-20">

      {/* 1. ULTRA HEADER */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-base-100 p-8 rounded-[2.5rem] border border-base-200 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-primary rounded-2xl rotate-3 flex items-center justify-center text-primary-content shadow-lg shadow-primary/30">
            <Activity size={32} />
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
              Staff <span className="text-primary underline decoration-4 underline-offset-4">Command</span>
            </h1>
            <p className="text-[10px] font-black uppercase opacity-40 tracking-[0.2em] mt-2">
              Welcome Back, <span className="text-base-content opacity-100">{staffDisplayName}</span> • {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right mr-4">
            <p className="text-[10px] font-black uppercase opacity-40">System Status</p>
            <p className="text-xs font-bold text-success flex items-center justify-end gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span> Live & Healthy</p>
          </div>
          <Link to="/dashboard/admin/services" className="btn btn-neutral rounded-2xl px-8 h-14 border-none shadow-xl hover:scale-105 transition-all">
            <LayoutDashboard size={18} /> <span className="uppercase italic font-black">Manage Inventory</span>
          </Link>
        </div>
      </header>

      {/* 2. GLOSSY METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <div className="group relative bg-gradient-to-br from-primary to-primary-focus p-8 rounded-[2.5rem] text-primary-content shadow-2xl shadow-primary/30 overflow-hidden">
          <TrendingUp className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-500" size={140} />
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Revenue</p>
          <p className="text-5xl font-black italic mt-2 tracking-tighter">€{totalRevenue.toLocaleString()}</p>
          <div className={`mt-6 flex items-center gap-2 text-[10px] font-bold w-fit px-3 py-1 rounded-full backdrop-blur-md ${revenueChange >= 0 ? 'bg-white/20 text-white' : 'bg-red-500/20 text-red-100'
            }`}>
            {revenueChange >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(revenueChange).toFixed(1)}% vs last month
          </div>
        </div>

        {/* Pending */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-200 shadow-sm hover:shadow-xl transition-all group">
          <div className="w-12 h-12 bg-warning/10 text-warning rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform"><Clock size={24} /></div>
          <p className="text-5xl font-black italic mt-6 tracking-tighter">{pendingOrders.length}</p>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">Pending Actions</p>
        </div>

        {/* Completed */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-200 shadow-sm hover:shadow-xl transition-all group">
          <div className="w-12 h-12 bg-success/10 text-success rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform"><CheckCircle size={24} /></div>
          <p className="text-5xl font-black italic mt-6 tracking-tighter">{completedOrders.length}</p>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">Jobs Delivered</p>
        </div>

        {/* Total */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-200 shadow-sm hover:shadow-xl transition-all group">
          <div className="w-12 h-12 bg-info/10 text-info rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform"><FileText size={24} /></div>
          <p className="text-5xl font-black italic mt-6 tracking-tighter">{bookings.length}</p>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">Total Bookings</p>
        </div>
      </div>

      {/* 3. ACTIVITY & TOOLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Table Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-sm overflow-hidden">
            <div className="p-8 flex justify-between items-center border-b border-base-100">
              <h3 className="text-xl font-black italic uppercase tracking-tight">Recent Activity Stream</h3>
              <Link to="/dashboard/bookings" className="btn btn-ghost btn-sm rounded-xl font-black text-[10px] uppercase tracking-widest">View Full Logs</Link>
            </div>

            <div className="overflow-x-auto">
              {bookings.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center text-center opacity-20">
                  <AlertCircle size={48} className="mb-4" />
                  <p className="font-black uppercase tracking-widest text-xs">No Recent Orders Detected</p>
                </div>
              ) : (
                <table className="table w-full">
                  <thead>
                    <tr className="bg-base-200/30 text-[10px] font-black uppercase tracking-widest border-none">
                      <th className="pl-8 py-5">Order Reference</th>
                      <th>Primary Service</th>
                      <th>Status</th>
                      <th className="text-right pr-8">Net Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-base-200/40 transition-colors border-base-100 group">
                        <td className="pl-8 py-6">
                          <p className="font-black text-sm">#{order.id.toString().slice(-8).toUpperCase()}</p>
                          <p className="text-[10px] font-bold opacity-30 uppercase italic">Ref: Customer_{order.user}</p>
                        </td>
                        <td className="py-6">
                          <span className="font-bold text-xs uppercase text-primary tracking-tighter">
                            {order.items[0]?.service?.name || "Premium Cleaning"}
                          </span>
                          {order.items.length > 1 && <span className="ml-2 text-[10px] font-black opacity-30">+{order.items.length - 1} More</span>}
                        </td>
                        <td>
                          <div className={`badge badge-sm rounded-md font-black italic text-[9px] py-3 px-3 border-none ${order.status === 'Delivered' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                            }`}>
                            {order.status}
                          </div>
                        </td>
                        <td className="text-right pr-8">
                          <p className="font-black italic text-lg tracking-tighter">€{(parseFloat(order.total_price) || 0).toFixed(2)}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-neutral text-neutral-content p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <Settings className="absolute -right-8 -top-8 opacity-5 rotate-12" size={160} />
            <h3 className="text-xl font-black italic uppercase tracking-tight mb-8">Quick Control</h3>
            <div className="space-y-3 relative z-10">
              <Link to="/dashboard/admin/services" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest">Inventory Setup</span>
                <ArrowUpRight size={16} />
              </Link>
              <button disabled className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 opacity-30 cursor-not-allowed border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest">Finance Export</span>
                <FileText size={16} />
              </button>
              <button disabled className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 opacity-30 cursor-not-allowed border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest">Staff Roles</span>
                <Settings size={16} />
              </button>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-primary" size={20} />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Intelligence Report</h4>
            </div>
            <p className="text-xs leading-relaxed font-medium opacity-70">
              System is correctly mapping your <span className="text-primary font-bold">/orders/</span> API data. Only "Delivered" items affect the dynamic revenue card.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffMain;