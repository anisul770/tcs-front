import { useEffect, useState } from 'react';
import { Users, Mail, Phone, ShieldCheck, User as UserIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import authApiClient from '../../services/auth-api-client';
import { Link } from 'react-router';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchCustomers();
  }, []);

  const handlePromote = async (user) => {
    const confirmPromote = window.confirm(`Are you sure you want to promote ${user.first_name} to Admin?`);

    if (confirmPromote) {
      try {
        // Calling your specific endpoint: POST /auth/users/{id}/promote_admin/
        await authApiClient.post(`/auth/users/${user.id}/promote_admin/`);
        toast.success(`${user.first_name} is now an Admin!`);

        // Refresh the list to show the new status
        const res = await authApiClient.get('/auth/users/');
        setCustomers(res.data);
      } catch (err) {
        toast.error(err.response?.data?.detail || "Failed to promote user.");
      }
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black italic text-primary uppercase tracking-tighter flex items-center gap-2">
            <Users size={32} /> Customer <span className="text-base-content font-light">Database</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium italic">Manage and view all registered users and their booking activity.</p>
        </div>
        <div className="stats shadow bg-base-100">
          <div className="stat py-2 px-6">
            <div className="stat-title text-[10px] font-bold uppercase">Total Users</div>
            <div className="stat-value text-primary text-2xl">{customers.length}</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-3xl shadow-xl border border-base-300">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-base-300/50">
            <tr className="text-xs uppercase font-black tracking-widest text-base-content/70">
              <th>Customer</th>
              <th>Contact Info</th>
              <th>Role</th>
              <th>Activity (Cart/Orders)</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((user) => (
              <tr key={user.id} className="hover:bg-primary/5 transition-colors">
                {/* Profile & Name */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 bg-base-300">
                        {user.profile_pic ? (
                          <img src={user.profile_pic} alt={user.first_name} />
                        ) : (
                          <div className="flex items-center justify-center h-full text-base-content/30">
                            <UserIcon size={24} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-base">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-xs opacity-50 font-mono">ID: #{user.id}</div>
                    </div>
                  </div>
                </td>

                {/* Contact Info */}
                <td>
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <Mail size={14} className="text-primary" /> {user.email}
                    </span>
                    <span className="flex items-center gap-1 text-sm opacity-70">
                      <Phone size={14} /> {user.phone_number || 'No Phone'}
                    </span>
                  </div>
                </td>

                {/* Role Status */}
                <td>
                  {user.is_staff ? (
                    <div className="badge badge-primary gap-1 font-bold text-[10px] py-3">
                      <ShieldCheck size={12} /> ADMIN
                    </div>
                  ) : (
                    <div className="badge badge-ghost font-bold text-[10px] py-3 opacity-60">
                      CUSTOMER
                    </div>
                  )}
                </td>

                {/* Orders Peek */}
                <td>
                  <div className="flex items-center gap-2">
                    <div className="radial-progress text-primary text-[10px] font-bold"
                      style={{ "--value": user.order.length > 0 ? 100 : 0, "--size": "2.5rem", "--thickness": "3px" }}>
                      {user.order.length}
                    </div>
                    <div className="text-xs">
                      <p className="font-bold uppercase text-[10px] opacity-50">Bookings</p>
                      <p className="font-medium">
                        {user.order.length > 0
                          ? `Total: $${user.order.reduce((acc, curr) => acc + curr.total_price, 0)}`
                          : 'No history'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <th className="text-right flex justify-end gap-2">
                  <Link to={`details/${user.id}`} state={{ userData: user }}><button className="btn btn-ghost btn-xs hover:text-primary transition-colors">Details</button></Link>
                  {/* NEW PROMOTE BUTTON: Only show if they aren't already staff */}
                  {!user.is_staff && (
                    <button
                      onClick={() => handlePromote(user)}
                      className="btn btn-ghost btn-xs text-success hover:bg-success/10 flex items-center gap-1"
                    >
                      <ShieldCheck size={14} /> Promote
                    </button>
                  )}
                  <button className="btn btn-ghost btn-xs text-error hover:bg-error/10">Restrict</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;