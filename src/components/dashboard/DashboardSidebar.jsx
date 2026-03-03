import { Link, NavLink } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { LayoutList, ShoppingCart } from "lucide-react";


const DashboardSidebar = () => {
  const { user } = useAuthContext();
  const isStaff = user?.is_staff;

  // Active state styling for links
  const navClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive 
        ? "bg-primary text-primary-content font-bold shadow-md" 
        : "text-base-content hover:bg-base-200 hover:text-primary font-medium"
    }`;

  // Closes the drawer on mobile when a link is clicked
  const closeDrawer = () => {
    document.getElementById('dashboard-drawer').checked = false;
  };

  return (
    <div className="w-72 min-h-full bg-base-100 border-r border-base-200 flex flex-col p-4">
      {/* Brand Logo */}
      <div className="px-4 py-4 mb-6 hidden lg:block">
        <h2 className="text-2xl font-black italic text-primary tracking-tight">
          <Link to='/'>TCS<span className="text-base-content font-light">.clean</span></Link>
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        <NavLink to="/dashboard" end className={navClass} onClick={closeDrawer}>
          <span>📊</span> Overview
        </NavLink>
        <NavLink to="/dashboard/profile" className={navClass} onClick={closeDrawer}>
          <span>⚙️</span> My Profile
        </NavLink>
        <NavLink to="/dashboard/cart" className={navClass} onClick={closeDrawer}>
          <span><ShoppingCart size={20} strokeWidth={2.5} /></span> Cart
        </NavLink>
        <NavLink to="/shop" className={navClass} onClick={closeDrawer}>
          <span><LayoutList size={20} strokeWidth={2.5} /></span> Services  
        </NavLink>

        {/* Client Links */}
        {!isStaff && (
          <>
            <div className="divider text-xs text-gray-400 font-bold uppercase my-6 px-4">Services</div>
            <NavLink to="/dashboard/bookings" className={navClass} onClick={closeDrawer}>
              <span>📅</span> My Bookings
            </NavLink>
            <NavLink to="/dashboard/reviews" className={navClass} onClick={closeDrawer}>
              <span>⭐</span> My Reviews
            </NavLink>
          </>
        )}

        {/* Staff Links */}
        {isStaff && (
          <>
            <div className="divider text-xs text-primary font-bold uppercase my-6 px-4">Admin Controls</div>
            <NavLink to="/dashboard/bookings" className={navClass} onClick={closeDrawer}>
              <span>📋</span> All Bookings
            </NavLink>
            <NavLink to="/dashboard/manage-services" className={navClass} onClick={closeDrawer}>
              <span>🛠️</span> Manage Services
            </NavLink>
            <NavLink to="/dashboard/customers" className={navClass} onClick={closeDrawer}>
              <span>👥</span> Customers
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default DashboardSidebar;