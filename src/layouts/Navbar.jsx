import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";
import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(true);
  const { user, logout } = useAuthContext();
  const { cart, createOrGetCart } = useCartContext();

  useEffect(() => {
    createOrGetCart();
  }, [createOrGetCart]);

  useEffect(() => {
    const handleScroll = () => {
      const halfScreen = window.innerHeight;
      if (window.scrollY > halfScreen) setIsSticky(false);
      else setIsSticky(true);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar bg-base-100 shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${isSticky ? "translate-y-0" : "-translate-y-full"} px-4 md:px-12`}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Home</a></li>
            <li><a>Services</a></li>
            <li><a>About</a></li>
          </ul>
        </div>
        <Link to={'/'} className="text-2xl font-bold text-primary italic">TCS</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/services/"}>Services</Link></li>
          <li><Link to={'/dashboard/'}>Dashboard</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end mr-2">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              {/* Modern Lucide Icon */}
              <ShoppingBag size={20} className="text-base-content" />

              {/* Cleaner, Minimalist Badge */}
              {cart?.items?.length > 0 && (
                <span className="indicator-item badge badge-primary badge-xs font-bold border-none h-4 min-w-[16px] p-0 text-[10px]">
                  {cart.items.length}
                </span>
              )}
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow border border-base-200">
            <div className="card-body">
              <span className="font-bold text-lg">{cart?.items?.length || 0} Items</span>
              <span className="text-info font-bold uppercase text-[10px] tracking-widest">
                Subtotal: €{cart?.total_price || "0.00"}
              </span>
              <div className="card-actions">
                <Link to="/dashboard/cart" className="btn btn-primary btn-block btn-sm">View Cart</Link>
              </div>
            </div>
          </div>
        </div>
        {!user ? (
          <>
            <Link to="/login"><button className="btn btn-primary btn-outline btn-sm mr-2">Login</button></Link>
            <Link to="/register"><button className="btn btn-primary btn-sm">Register</button></Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                {/* Display first letter of first_name */}
                <span className="text-lg font-bold">
                  {user.first_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
              <li className="px-4 py-2 font-bold text-xs opacity-50 uppercase">
                Account: {user.first_name || 'User'}
              </li>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/bookings">My Bookings</Link></li>
              <div className="divider my-1"></div>
              <li>
                <button onClick={logout} className="text-error font-bold">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;