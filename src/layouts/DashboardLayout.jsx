import { Outlet } from "react-router";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Hidden checkbox that controls the drawer on mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area (Navbar + Outlet) */}
      <div className="drawer-content flex flex-col h-screen overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto bg-base-200 p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div> 
      
      {/* Sidebar Area */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;