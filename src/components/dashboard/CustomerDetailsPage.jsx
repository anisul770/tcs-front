import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar,
  ShoppingBag, Star, User as UserIcon, ShieldCheck,
  ExternalLink, Facebook, Info,
  ShieldAlert
} from 'lucide-react';
import toast from 'react-hot-toast';
import authApiClient from '../../services/auth-api-client';

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // <--- Access the passed state
  // Use the passed user data as the initial state so the page isn't empty!
  const [user, setUser] = useState(location.state?.userData || null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await authApiClient.get(`/auth/users/${id}/`);
        setUser(res.data);
      } catch (err) {
        toast.error(err.response?.data || "Could not load user details.");
        navigate('/admin/customers');
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [id, navigate]);

  const handlePromoteFromDetails = async () => {
    try {
      await authApiClient.post(`/auth/users/${user.id}/promote_admin/`);
      toast.success("User promoted successfully!");
      // Update local state so the UI reflects the change immediately
      setUser({ ...user, is_staff: true });
    } catch (err) {
      toast.error(err.response?.data || "Promotion failed.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ready To Go":
      case "Delivered":
        return <span className="badge badge-success badge-sm font-bold uppercase text-[10px] py-3 px-4 italic">Delivered</span>;
      case "Not Paid":
        return <span className="badge badge-error badge-sm font-bold uppercase text-[10px] py-3 px-4 italic">Not Paid</span>;
      case "Pending":
        return <span className="badge badge-warning badge-sm font-bold uppercase text-[10px] py-3 px-4 italic">Pending</span>;
      case "Canceled":
        return <span className="badge badge-ghost badge-sm font-bold uppercase text-[10px] py-3 px-4 italic opacity-50">Canceled</span>;
      default:
        return <span className="badge badge-ghost badge-sm font-bold uppercase text-[10px] py-3 px-4 italic">{status}</span>;
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <span className="loading loading-ring loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 md:px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm gap-2 mb-6 hover:bg-base-300"
        >
          <ArrowLeft size={18} /> Back to Customers
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Profile Card */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl overflow-hidden">
              <div className="h-24 bg-primary"></div>
              <div className="px-6 pb-6 text-center">
                <div className="avatar -mt-12 mb-4">
                  <div className="w-24 h-24 rounded-2xl ring ring-base-100 bg-base-300 shadow-lg">
                    {user.profile_pic ? (
                      <img src={user.profile_pic} alt={user.first_name} />
                    ) : (
                      <UserIcon className="w-full h-full p-6 text-base-content/20" />
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                  {user.first_name} {user.last_name}
                </h2>
                {user.is_staff && (
                  <div className="badge badge-primary gap-1 font-bold text-[10px] mt-1 uppercase">
                    <ShieldCheck size={12} /> Administrator
                  </div>
                )}
                {!user.is_staff && (
                  <button
                    onClick={handlePromoteFromDetails}
                    className="btn btn-success btn-xs btn-outline mt-4 w-full gap-2"
                  >
                    <ShieldAlert size={14} /> Promote to Admin
                  </button>
                )}

                <div className="divider opacity-50"></div>

                <div className="text-left space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={18} className="text-primary" />
                    <span className="font-medium truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={18} className="text-primary" />
                    <span className="font-medium">{user.phone_number || 'N/A'}</span>
                  </div>
                  {user.facebook_link && (
                    <a href={user.facebook_link} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-blue-600 hover:underline">
                      <Facebook size={18} /> Social Profile
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* About / Bio */}
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <Info size={16} className="text-primary" /> Customer Bio
              </h3>
              <p className="text-sm text-base-content/70 italic leading-relaxed">
                {user.bio || "This user hasn't provided a biography yet."}
              </p>
            </div>
          </div>

          {/* Right Column: Order History */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black italic uppercase tracking-tight text-primary">
                Booking <span className="text-base-content font-light">History</span>
              </h3>
              <div className="badge badge-outline font-bold">{user.order.length} Records</div>
            </div>

            {user.order.length === 0 ? (
              <div className="card bg-base-100 p-12 text-center shadow-lg border-2 border-dashed border-base-300">
                <ShoppingBag size={48} className="mx-auto opacity-10 mb-4" />
                <p className="text-base-content/40 font-bold uppercase tracking-widest text-xs">No bookings found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {user.order.map((order) => (
                  <div key={order.id} className="card bg-base-100 shadow-md border border-base-200 overflow-hidden hover:border-primary transition-all">
                    <div className="card-body p-0">
                      {/* Order Header */}
                      <div className="bg-base-200/50 px-6 py-3 flex flex-wrap justify-between items-center gap-2">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black uppercase opacity-50">Ref: #{order.id.slice(0, 8)}</span>
                          {getStatusBadge(order.status)}
                        </div>
                        <span className="text-sm font-bold text-primary">${order.total_price}</span>
                      </div>

                      {/* Order Items */}
                      <div className="p-6">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center border-b border-base-200 last:border-0 pb-3 last:pb-0 mb-3 last:mb-0">
                            <div>
                              <p className="font-black italic text-sm uppercase tracking-tight">{item.service.name}</p>
                              <p className="text-[10px] uppercase font-bold text-gray-400">{item.service.category.name}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-bold">Qty: {item.quantity}</p>
                              <p className="text-xs opacity-60">${item.price} each</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="px-6 pb-4 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                          <Calendar size={12} /> {new Date(order.created_at).toLocaleDateString()}
                        </div>
                        <button className="btn btn-ghost btn-xs text-primary gap-1">
                          View Invoice <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;