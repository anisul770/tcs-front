import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";
import { ShoppingBag, User, Settings, LogOut, Calendar, Menu, Sparkles } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(true);
  const { user, logout } = useAuthContext();
  const { cart, createOrGetCart } = useCartContext();

  // Helper function to force-close any open DaisyUI dropdown
  const closeDropdown = () => {
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  useEffect(() => {
    createOrGetCart();
  }, [createOrGetCart]);

  useEffect(() => {
    const handleScroll = () => {
      const halfScreen = window.innerHeight / 2;
      if (window.scrollY > halfScreen) setIsSticky(false);
      else setIsSticky(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = ({ isActive }) =>
    `font-black italic uppercase tracking-widest text-[11px] transition-all hover:text-primary ${isActive ? 'text-primary' : 'text-base-content/70'}`;

  return (
    <div className={`navbar bg-base-100/90 backdrop-blur-md border-b border-base-200 fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isSticky ? "translate-y-0" : "-translate-y-full"} px-4 md:px-12 h-20`}>

      {/* --- START: Brand & Mobile Menu --- */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Menu size={24} />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-base-100 rounded-[1.5rem] w-64 border border-base-200">
            {/* Added onClick={closeDropdown} to mobile links */}
            <li><NavLink to="/" onClick={closeDropdown} className={navClass}>Home</NavLink></li>
            <li><NavLink to="/services" onClick={closeDropdown} className={navClass}>Services</NavLink></li>
            <li><NavLink to="/about" onClick={closeDropdown} className={navClass}>About</NavLink></li>
            <li><NavLink to="/contact" onClick={closeDropdown} className={navClass}>Contact Us</NavLink></li>
            {user && <li><NavLink to="/dashboard" onClick={closeDropdown} className={navClass}>Dashboard</NavLink></li>}
            
            <div className="divider opacity-10 md:hidden"></div>
            <div className="md:hidden">
              {!user ? (
                <div className="flex flex-col gap-2 p-2">
                  <li><Link to="/login" onClick={closeDropdown} className="font-black italic uppercase text-[11px]">Login</Link></li>
                  <li><Link to="/register" onClick={closeDropdown} className="btn btn-primary btn-sm rounded-xl font-black italic uppercase tracking-widest">Join</Link></li>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                   <p className="px-3 py-2 text-[10px] font-black uppercase opacity-40">Account</p>
                   <li><Link to="/dashboard/profile" onClick={closeDropdown} className="font-bold"><User size={14}/> Profile</Link></li>
                   <li><button onClick={() => { logout(); closeDropdown(); }} className="text-error font-bold"><LogOut size={14}/> Logout</button></li>
                </div>
              )}
            </div>
          </ul>
        </div>

        <Link to={'/'} className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-black italic uppercase tracking-tighter">
            TCS<span className="text-primary text-[10px] ml-1">®</span>
          </span>
        </Link>
      </div>

      {/* --- CENTER: Desktop Navigation --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-10">
          <li><NavLink to="/" className={navClass}>Home</NavLink></li>
          <li><NavLink to="/services" className={navClass}>Services</NavLink></li>
          <li><NavLink to="/about" className={navClass}>About</NavLink></li>
          <li><NavLink to="/contact" className={navClass}>Contact Us</NavLink></li>
          {user && <li><NavLink to="/dashboard" className={navClass}>Dashboard</NavLink></li>}
        </ul>
      </div>

      {/* --- END: Actions --- */}
      <div className="navbar-end gap-2">
        
        <ThemeToggle />

        {/* Cart Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary/10 transition-colors">
            <div className="indicator">
              <ShoppingBag size={22} strokeWidth={2.2} />
              {cart?.items?.length > 0 && (
                <span className="indicator-item badge badge-primary badge-xs font-black border-none h-4 min-w-[16px]">
                  {cart.items.length}
                </span>
              )}
            </div>
          </div>
          <div tabIndex={0} className="mt-4 z-[1] card card-compact dropdown-content w-64 bg-base-100 shadow-2xl rounded-[2rem] border border-base-200">
            <div className="card-body p-6">
              <h3 className="font-black italic uppercase text-xs tracking-widest text-primary">Your Booking</h3>
              <div className="flex justify-between items-end mt-2">
                <span className="text-2xl font-black tracking-tighter">{cart?.items?.length || 0} Items</span>
                <span className="text-sm font-bold opacity-40">€{cart?.total_price || "0.00"}</span>
              </div>
              <div className="card-actions mt-4">
                {/* Added onClick={closeDropdown} here */}
                <Link to="/dashboard/cart" onClick={closeDropdown} className="btn btn-primary btn-block rounded-xl font-black italic uppercase tracking-widest btn-sm">
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP/TABLET ONLY: Profile */}
        <div className="hidden md:flex items-center gap-2">
            {!user ? (
            <div className="flex items-center gap-2">
                <Link to="/login" className="text-[11px] font-black italic uppercase tracking-widest px-4 hover:text-primary transition-colors">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm rounded-xl px-6 font-black italic uppercase tracking-widest shadow-lg shadow-primary/20">
                Join
                </Link>
            </div>
            ) : (
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden bg-primary flex items-center justify-center text-primary-content">
                    {user.profile_pic ? (
                      <img src={user.profile_pic} alt="Profile" className="object-cover" />
                    ) : (
                      <span className="text-lg font-black italic">
                        {user.first_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <ul tabIndex={0} className="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-[2rem] w-64 border border-base-200 overflow-hidden">
                  <div className="px-5 py-4 bg-base-200/50 rounded-[1.5rem] mb-2">
                      <p className="text-[10px] font-black uppercase opacity-40 tracking-[0.2em] mb-1">Authenticated As</p>
                      <p className="font-black italic uppercase text-sm truncate">{user.first_name || 'Premium User'}</p>
                  </div>

                  {/* Added onClick={closeDropdown} to Profile links */}
                  <li><Link to="/dashboard/profile" onClick={closeDropdown} className="py-3 font-bold opacity-70 hover:opacity-100"><User size={16} /> My Profile</Link></li>
                  <li><Link to="/dashboard/bookings" onClick={closeDropdown} className="py-3 font-bold opacity-70 hover:opacity-100"><Calendar size={16} /> My Bookings</Link></li>

                  <div className="divider my-1 opacity-10"></div>

                  <li className="mb-2">
                      <button onClick={() => { logout(); closeDropdown(); }} className="text-error font-black italic uppercase tracking-widest text-xs py-3 hover:bg-error/10">
                        <LogOut size={16} /> Logout
                      </button>
                  </li>
                </ul>
            </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;