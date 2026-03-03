import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import useBookingContext from "../../hooks/useBookingContext"; // Added context
import { LayoutDashboard, TrendingUp, Clock, CheckCircle, ArrowUpRight } from "lucide-react";

const StaffMain = () => {
  const { user } = useAuthContext();
  const { bookings, isLoading } = useBookingContext();
  
  // Real Data Logic
  const pendingOrders = bookings.filter(b => b.status === "Pending" || b.status === "Not Paid");
  const completedOrders = bookings.filter(b => b.status === "Delivered");
  const totalRevenue = completedOrders.reduce((sum, b) => sum + parseFloat(b.total_price), 0);

  const staffDisplayName = user?.first_name 
    ? `${user.first_name} ${user.last_name}` 
    : user?.email?.split('@')[0];

  if (isLoading) return (
    <div className="h-96 flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* 1. Header with dynamic name */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-base-content">
            Staff <span className="text-primary">Command</span>
          </h1>
          <p className="text-xs font-bold uppercase opacity-40 tracking-widest mt-1">
            Welcome back, <span className="text-primary">{staffDisplayName}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/dashboard/admin/services" className="btn btn-sm btn-primary rounded-full px-6">
            <LayoutDashboard size={14} /> Manage Services
          </Link>
        </div>
      </header>

      {/* 2. REAL METRICS - No more hardcoded numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm hover:border-primary/30 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-primary/10 rounded-xl text-primary"><TrendingUp size={20}/></div>
            <span className="text-[10px] font-black opacity-30 uppercase tracking-tighter">Live</span>
          </div>
          <p className="mt-4 text-3xl font-black italic">€{totalRevenue.toFixed(0)}</p>
          <p className="text-[10px] font-bold uppercase opacity-50">Total Revenue</p>
        </div>

        <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
          <div className="p-2 bg-warning/10 rounded-xl text-warning"><Clock size={20}/></div>
          <p className="mt-4 text-3xl font-black italic">{pendingOrders.length}</p>
          <p className="text-[10px] font-bold uppercase opacity-50">Pending Action</p>
        </div>

        <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
          <div className="p-2 bg-success/10 rounded-xl text-success"><CheckCircle size={20}/></div>
          <p className="mt-4 text-3xl font-black italic">{completedOrders.length}</p>
          <p className="text-[10px] font-bold uppercase opacity-50">Jobs Delivered</p>
        </div>

        <div className="bg-primary p-6 rounded-3xl shadow-xl shadow-primary/20 text-primary-content">
          <div className="p-2 bg-white/20 rounded-xl w-fit"><ArrowUpRight size={20}/></div>
          <p className="mt-4 text-3xl font-black italic">{bookings.length}</p>
          <p className="text-[10px] font-bold uppercase opacity-80">Total Bookings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real Bookings Table */}
        <div className="lg:col-span-2 card bg-base-100 border border-base-300 shadow-sm overflow-hidden rounded-3xl">
          <div className="p-6 border-b border-base-200 flex justify-between items-center">
            <h3 className="font-black text-lg italic uppercase tracking-tight">Recent Orders</h3>
            <Link to="/dashboard/bookings" className="text-xs font-black uppercase text-primary hover:underline">View All History</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  <th className="pl-8">Customer</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th className="text-right pr-8">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {bookings.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-base-200/30 transition-colors">
                    <td className="pl-8 py-4">
                      <div className="font-bold">Order #{order.id.toString().slice(-4)}</div>
                      <div className="text-[10px] opacity-50">Customer ID: {order.user}</div>
                    </td>
                    <td className="font-medium text-xs">
                       {order.items[0]?.service?.name || "Service"} 
                       {order.items.length > 1 && ` +${order.items.length - 1}`}
                    </td>
                    <td>
                      <span className={`badge badge-sm font-black italic text-[9px] py-2 px-3 ${
                        order.status === 'Delivered' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-right pr-8 font-black">€{parseFloat(order.total_price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Simple Admin Shortcuts */}
        <div className="card bg-base-100 border border-base-300 shadow-sm p-6 rounded-3xl">
          <h3 className="font-black text-lg mb-6 italic uppercase">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
             <Link to="/dashboard/admin/services" className="btn btn-outline btn-sm justify-start gap-3 lowercase font-medium">
               <span className="text-primary font-black">01.</span> Manage All Services
             </Link>
             <button className="btn btn-outline btn-sm justify-start gap-3 lowercase font-medium opacity-50 cursor-not-allowed">
               <span className="text-primary font-black">02.</span> Download Revenue PDF
             </button>
             <button className="btn btn-outline btn-sm justify-start gap-3 lowercase font-medium opacity-50 cursor-not-allowed">
               <span className="text-primary font-black">03.</span> System Settings
             </button>
          </div>
          <div className="mt-10 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-[10px] font-black uppercase text-primary mb-2">Pro Tip</p>
            <p className="text-xs leading-relaxed opacity-70">
              Only orders marked as <span className="font-bold">"Delivered"</span> contribute to your total revenue metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffMain;