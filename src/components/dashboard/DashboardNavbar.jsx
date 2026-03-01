import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const DashboardNavbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-base-200 px-4 h-16 sticky top-0 z-40">
      
      {/* Hamburger Menu (Mobile Only) */}
      <div className="flex-none lg:hidden">
        <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      
      {/* Page Title / Branding */}
      <div className="flex-1 px-2 lg:px-4">
        <h1 className="text-xl font-bold hidden sm:block">Control Panel</h1>
      </div>
      
      {/* User Actions */}
      <div className="flex gap-3 items-center">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold leading-none text-base-content">{user?.first_name || 'User'} {user?.last_name}</p>
          {/* <p className="text-[10px] uppercase tracking-widest text-primary font-black mt-1">
            {user?.is_staff ? 'Staff' : 'Customer'}
          </p> */}
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center bg-neutral text-neutral-content">
              {user?.profile_pic ? (
                <img src={user.profile_pic} alt="profile" className="object-cover" />
              ) : (
                <span className="text-lg font-bold uppercase">{user?.first_name?.charAt(0) || 'U'}</span>
              )}
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
            <li className="menu-title px-4 py-2 opacity-50 text-xs">Account</li>
            <li><Link to="/dashboard/profile">Profile Settings</Link></li>
            <div className="divider my-1"></div>
            <li><button onClick={logout} className="text-error font-bold">Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;