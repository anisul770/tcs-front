import { useEffect, useState } from 'react';
import { Users, Mail, Phone, ShieldCheck, User as UserIcon, Loader2, ShieldAlert, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import authApiClient from '../../services/auth-api-client';
import { Link } from 'react-router';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await authApiClient.get('/auth/users/');
      setCustomers(res.data);
    } catch (err) {
      toast.error(err.response?.data || "Access denied or server error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handlePromote = async (user) => {
    if (window.confirm(`Promote ${user.first_name} to the Administrative board?`)) {
      try {
        await authApiClient.post(`/auth/users/${user.id}/promote_admin/`);
        toast.success(`${user.first_name} is now an Admin!`);
        fetchCustomers(); // Refresh list
      } catch (err) {
        toast.error(err.response?.data?.detail || "Failed to promote user.");
      }
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-base-200">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Synchronizing Database</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-10 bg-base-200 min-h-screen space-y-8 animate-in fade-in duration-700">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-[0.3em] text-[10px] mb-2">
            <Users size={12} fill="currentColor" /> Internal Registry
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
            Customer <span className="text-primary">Database</span>
          </h1>
        </div>

        <div className="stats bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
          <div className="stat px-8 py-4">
            <div className="stat-title text-[10px] font-black uppercase tracking-widest opacity-50">Total Accounts</div>
            <div className="stat-value text-3xl font-black italic">{customers.length}</div>
          </div>
        </div>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl overflow-hidden">
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="table w-full min-w-[1000px]"> {/* Increased min-width slightly for buttons */}
            <thead className="bg-base-200/50">
              <tr className="border-b border-base-200">
                <th className="py-6 pl-10 text-[10px] font-black uppercase tracking-widest opacity-40">Identity</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Communication</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Classification</th>
                <th className="py-6 text-[10px] font-black uppercase tracking-widest opacity-40">Engagement</th>
                <th className="py-6 pr-10 text-right text-[10px] font-black uppercase tracking-widest opacity-40">Operations</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-base-200/50">
              {customers.map((user) => (
                <tr key={user.id} className="hover:bg-base-200/30 transition-colors">
                  {/* Profile & Name */}
                  <td className="pl-10">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-base-200">
                          {user.profile_pic ? (
                            <img src={user.profile_pic} alt={user.first_name} />
                          ) : (
                            <div className="flex items-center justify-center h-full text-base-content/20 bg-base-300">
                              <UserIcon size={20} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-black italic uppercase text-sm tracking-wide">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-[10px] font-bold opacity-30 uppercase tracking-tighter">UID: #{user.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-primary italic">
                        <Mail size={12} /> {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-medium opacity-50">
                        <Phone size={12} /> {user.phone_number || 'N/A'}
                      </div>
                    </div>
                  </td>

                  {/* Role Status */}
                  <td>
                    {user.is_staff ? (
                      <div className="badge badge-primary rounded-lg gap-1.5 font-black text-[9px] h-6 px-3 italic">
                        <ShieldCheck size={10} strokeWidth={3} /> ADMIN
                      </div>
                    ) : (
                      <div className="badge border-base-300 bg-transparent rounded-lg font-black text-[9px] h-6 px-3 opacity-40 italic">
                        CUSTOMER
                      </div>
                    )}
                  </td>

                  {/* Orders Peek */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="radial-progress text-primary/40 text-[10px] font-black"
                        style={{ "--value": user.order?.length > 0 ? 100 : 0, "--size": "2.8rem", "--thickness": "4px" }}>
                        {user.order?.length || 0}
                      </div>
                      <div className="text-xs">
                        <p className="font-black italic uppercase text-[9px] opacity-40">Volume</p>
                        <p className="font-bold text-primary">
                          {user.order?.length > 0
                            ? `€${user.order.reduce((acc, curr) => acc + (curr.total_price || 0), 0).toLocaleString()}`
                            : '€0.00'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Actions - ALWAYS VISIBLE */}
                  <td className="pr-10">
                    <div className="flex justify-end items-center gap-2">
                      <Link
                        to={`details/${user.id}`}
                        state={{ userData: user }}
                        className="btn btn-sm bg-base-200 border-transparent hover:bg-primary hover:text-white rounded-xl font-black italic uppercase text-[9px] tracking-widest transition-all duration-300 shadow-sm"
                      >
                        Profile
                      </Link>

                      {!user.is_staff ? (
                        <button
                          onClick={() => handlePromote(user)}
                          className="btn btn-sm bg-success/10 border-transparent text-success hover:bg-success hover:text-white rounded-xl font-black italic uppercase text-[9px] tracking-widest transition-all duration-300 shadow-sm"
                        >
                          Promote
                        </button>
                      ) : (
                        <button
                          disabled
                          className="btn btn-sm bg-base-200/50 border-transparent text-base-content/20 rounded-xl font-black italic uppercase text-[9px] tracking-widest cursor-not-allowed"
                        >
                          Staff
                        </button>
                      )}

                      <button className="btn btn-sm bg-error/10 border-transparent text-error hover:bg-error hover:text-white rounded-xl font-black italic uppercase text-[9px] tracking-widest transition-all duration-300 shadow-sm">
                        Suspend
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;