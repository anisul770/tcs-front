import { Link, NavLink } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import {
  Home,
  LayoutDashboard,
  UserCircle,
  LayoutList,
  ShoppingCart,
  ClipboardList,
  Settings,
  Users,
  MessageSquare,
  ShieldCheck,
  Star,
  Calendar,
  Sparkles,
  Layers
} from "lucide-react";

const DashboardSidebar = () => {
  const { user } = useAuthContext();
  const isStaff = user?.is_staff;

  // --- Elite Active State Styling ---
  const navClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
      ? "bg-primary text-primary-content font-black italic shadow-lg shadow-primary/20 scale-[1.02]"
      : "text-base-content/60 hover:bg-base-200 hover:text-primary font-bold italic uppercase tracking-widest text-[11px]"
    }`;

  // Closes the drawer on mobile when a link is clicked
  const closeDrawer = () => {
    const drawer = document.getElementById('dashboard-drawer');
    if (drawer) drawer.checked = false;
  };

  return (
    <div className="w-72 h-screen sticky top-0 bg-base-100 border-r border-base-200 flex flex-col p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

      {/* --- BRAND LOGO --- */}
      <div className="px-2 py-6 mb-8 hidden lg:block">
        <Link to='/' className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-black italic uppercase tracking-tighter">
            TCS<span className="text-primary text-[10px] ml-1">®</span>
          </span>
        </Link>
      </div>

      {/* --- NAVIGATION LINKS --- */}
      <nav className="flex-1 space-y-2">

        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 px-4 mb-4">
          Main Menu
        </div>

        <NavLink to="/" end className={navClass} onClick={closeDrawer}>
          <Home size={20} strokeWidth={2.5} />
          <span className="uppercase tracking-widest text-[11px]">Home</span>
        </NavLink>

        <NavLink to="/dashboard" end className={navClass} onClick={closeDrawer}>
          <LayoutDashboard size={20} strokeWidth={2.5} />
          <span className="uppercase tracking-widest text-[11px]">Overview</span>
        </NavLink>

        <NavLink to="/dashboard/profile" className={navClass} onClick={closeDrawer}>
          <UserCircle size={20} strokeWidth={2.5} />
          <span className="uppercase tracking-widest text-[11px]">My Profile</span>
        </NavLink>

        <NavLink to="/dashboard/cart" className={navClass} onClick={closeDrawer}>
          <ShoppingCart size={20} strokeWidth={2.5} />
          <span className="uppercase tracking-widest text-[11px]">Cart</span>
        </NavLink>

        <NavLink to="/services" className={navClass} onClick={closeDrawer}>
          <LayoutList size={20} strokeWidth={2.5} />
          <span className="uppercase tracking-widest text-[11px]">Services</span>
        </NavLink>

        {/* --- CLIENT SECTION --- */}
        {!isStaff && (
          <>
            <div className="pt-8 pb-4">
              <div className="h-px bg-base-200 w-full mb-6"></div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-base-content/30 px-4">
                Bookings
              </div>
            </div>

            <NavLink to="/dashboard/bookings" className={navClass} onClick={closeDrawer}>
              <Calendar size={20} strokeWidth={2.5} />
              <span className="uppercase tracking-widest text-[11px]">My Bookings</span>
            </NavLink>

            <NavLink to="/dashboard/reviews" className={navClass} onClick={closeDrawer}>
              <Star size={20} strokeWidth={2.5} />
              <span className="uppercase tracking-widest text-[11px]">My Reviews</span>
            </NavLink>
          </>
        )}

        {/* --- STAFF SECTION --- */}
        {isStaff && (
          <>
            <div className="pt-8 pb-4">
              <div className="h-px bg-primary/10 w-full mb-6"></div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary px-4">
                <ShieldCheck size={14} /> Admin Tools
              </div>
            </div>

            <NavLink to="/dashboard/bookings" className={navClass} onClick={closeDrawer}>
              <ClipboardList size={20} strokeWidth={2.5} />
              <span className="uppercase tracking-widest text-[11px]">All Bookings</span>
            </NavLink>

            <NavLink to="/dashboard/admin/services" className={navClass} onClick={closeDrawer}>
              <Settings size={20} strokeWidth={2.5} />
              <span className="uppercase tracking-widest text-[11px]">Management</span>
            </NavLink>

            <NavLink to="/dashboard/admin/categories" className={navClass} onClick={closeDrawer}>
              <Layers size={20} strokeWidth={2.5} />
              <span className="uppercase tracking-widest text-[11px]">Manage Categories</span>
            </NavLink>

            <NavLink to="/dashboard/customers" className={navClass} onClick={closeDrawer}>
              <Users size={20} strokeWidth={2.5} />
              <span className="uppercase tracking-widest text-[11px]">Customers</span>
            </NavLink>

            <NavLink to="/dashboard/all-reviews" className={navClass} onClick={closeDrawer}>
              <MessageSquare size={20} strokeWidth={2.5} />
              <span className="uppercase tracking-widest text-[11px]">All Reviews</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* --- BOTTOM LOGO / FOOTER --- */}
      <div className="mt-auto pt-10 px-4">
        <p className="text-[9px] font-black uppercase italic tracking-[0.2em] opacity-20">
          TCS Transparent Cleaning Standard © 2026
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;