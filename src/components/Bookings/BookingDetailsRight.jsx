import {
  Calendar,
  XCircle,
  AlertCircle,
  Settings2,
  User
} from "lucide-react";

const BookingDetailsRight = ({ user, actionLoading, handleStatusChange, handleCancel, order, isCancelled, isCompleted }) => {
  return (
    <div className="space-y-6">
      {/* Admin Controls - Priority placement for staff */}
      {/* CUSTOMER DETAILS - Admin Only */}
      {user?.is_staff && (
        <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-base-200 bg-base-200/30 flex items-center gap-2">
            <User size={16} className="text-primary" />
            <span className="font-black italic uppercase text-[10px] tracking-widest">Customer Info</span>
          </div>
          <div className="p-6">
            <p className="text-[10px] font-black uppercase opacity-40 mb-1">Booked By</p>
            {/* Note: If your API returns a nested user object, use order.user.full_name 
          If it's just an ID, you might need to ensure your Serializer is 'depth = 1' 
          */}
            <p className="text-lg font-black italic text-base-content uppercase">
              {order.user_name || order.user?.username || `User ID: ${order.user}`}
            </p>

            {/* If your API provides contact info, these are great additions: */}
            {order.user_email && (
              <p className="text-xs font-medium opacity-60 mt-1 flex items-center gap-2">
                <Mail size={12} /> {order.user_email}
              </p>
            )}
          </div>
        </div>
      )}
      {user?.is_staff && (
        <div className="card bg-base-100 border-2 border-primary/20 shadow-sm p-6 space-y-4">
          <h4 className="font-black italic uppercase text-[10px] tracking-widest text-primary flex items-center gap-2">
            <Settings2 size={14} /> Admin Controls
          </h4>
          <div className="form-control w-full">
            <select
              disabled={actionLoading}
              onChange={(e) => handleStatusChange(e.target.value)}
              value={order.status}
              className="select select-bordered select-sm w-full font-bold text-xs"
            >
              <option value="Not Paid">Not Paid</option>
              <option value="Pending">Pending</option>
              <option value="Ready To Go">Ready To Go</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        </div>
      )}

      {/* Financial Summary */}
      <div className="card bg-base-100 border border-base-300 shadow-xl p-8">
        <h3 className="font-black italic uppercase text-xs mb-6 tracking-widest opacity-40">Financial Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="opacity-60">Subtotal</span>
            <span>€{parseFloat(order.total_price).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="opacity-60">Tax (Included)</span>
            <span>€0.00</span>
          </div>
          <div className="divider opacity-50"></div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase opacity-40 tracking-widest text-primary">Total Amount</span>
            <span className="text-4xl font-black italic text-base-content leading-none">
              €{parseFloat(order.total_price).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Booking Management (Reschedule/Cancel) */}
      {!user.is_staff && (
        <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-base-200 bg-base-200/30">
          <span className="font-black italic uppercase text-[10px] tracking-widest">Manage Booking</span>
        </div>
        <div className="p-6 space-y-4">
          <button
            disabled={isCancelled || isCompleted}
            className="btn btn-outline btn-primary btn-sm w-full gap-2 rounded-lg"
          >
            <Calendar size={14} /> Reschedule
          </button>

          {!isCancelled && !isCompleted ? (
            <button
              onClick={handleCancel}
              disabled={actionLoading}
              className="btn btn-ghost btn-sm w-full text-error hover:bg-error/10 gap-2 rounded-lg"
            >
              <XCircle size={14} /> Cancel Booking
            </button>
          ) : (
            <div className="bg-base-200 rounded-lg p-3 text-center">
              <span className="text-[10px] font-black uppercase opacity-40 italic">
                No further actions
              </span>
            </div>
          )}
        </div>
        <div className="p-4 bg-base-200/50 border-t border-base-200 flex items-start gap-2">
          <AlertCircle size={14} className="text-info shrink-0 mt-0.5" />
          <p className="text-[10px] leading-tight opacity-70">
            Rescheduling within 24h may incur a small convenience fee.
          </p>
        </div>
      </div>
      )}
    </div>
  );
};

export default BookingDetailsRight;