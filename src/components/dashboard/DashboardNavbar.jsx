import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { Menu, LogOut, User, Settings, Sparkles, ShieldCheck } from "lucide-react";

const DashboardNavbar = () => {
  const { user, logout } = useAuthContext();

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name}`
    : user?.email?.split('@')[0];

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 px-6 h-20 sticky top-0 z-40 transition-all">
      
      {/* --- MOBILE MENU TRIGGER --- */}
      <div className="flex-none lg:hidden">
        <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost hover:bg-primary/10 hover:text-primary transition-colors">
          <Menu size={24} />
        </label>
      </div>
      
      {/* --- DYNAMIC PAGE TITLE --- */}
      <div className="flex-1 px-4">
        <div className="flex items-center gap-3">
            {/* Tablet/Mobile Logo fallback if sidebar is hidden */}
            <div className="lg:hidden flex items-center gap-2">
                <div className="bg-primary p-1 rounded-md rotate-3">
                    <Sparkles className="text-white w-4 h-4" />
                </div>
            </div>
            <h1 className="text-sm font-black italic uppercase tracking-[0.3em] text-base-content/40 hidden sm:block">
                Systems <span className="text-primary/50">/</span> <span className="text-base-content">Control Panel</span>
            </h1>
        </div>
      </div>
      
      {/* --- USER PROFILE SECTION --- */}
      <div className="flex gap-4 items-center">
        
        {/* User Info Label */}
        <div className="text-right hidden md:block">
          <p className="text-[11px] font-black italic uppercase tracking-widest text-base-content leading-none">
            {displayName}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
             {user?.is_staff && <ShieldCheck size={10} className="text-primary" />}
             <p className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40">
                {user?.is_staff ? 'Authorized Staff' : 'Premium Client'}
             </p>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
            <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden bg-primary flex items-center justify-center text-primary-content transition-transform hover:scale-105 active:scale-95">
              {user?.profile_pic ? (
                <img src={user.profile_pic} alt="profile" className="object-cover" />
              ) : (
                <span className="text-lg font-black italic uppercase">
                    {user?.first_name?.charAt(0) || user?.email?.charAt(0)}
                </span>
              )}
            </div>
          </div>

          <ul tabIndex={0} className="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-[2rem] w-64 border border-base-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 bg-base-200/50 rounded-[1.5rem] mb-2 lg:hidden">
                <p className="text-[9px] font-black uppercase opacity-40 tracking-[0.2em] mb-1">User session</p>
                <p className="font-black italic uppercase text-xs truncate">{displayName}</p>
            </div>

            <li>
                <Link to="/dashboard/profile" className="py-3 font-bold opacity-70 hover:opacity-100 flex items-center gap-3">
                    <User size={16} className="text-primary" /> Profile Settings
                </Link>
            </li>
            {/* <li>
                <Link to="/dashboard/settings" className="py-3 font-bold opacity-70 hover:opacity-100 flex items-center gap-3">
                    <Settings size={16} className="text-primary" /> Preferences
                </Link>
            </li> */}
            
            <div className="divider my-1 opacity-10"></div>
            
            <li className="mb-2">
                <button 
                    onClick={logout} 
                    className="group flex items-center gap-3 py-3 text-error font-black italic uppercase tracking-widest text-[10px] hover:bg-error/10 transition-colors"
                >
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                    Logout Session
                </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;