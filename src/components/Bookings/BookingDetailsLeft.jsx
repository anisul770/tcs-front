import {
  CheckCircle2,
  XCircle,
  Clock,
  PackageCheck,
} from "lucide-react";

const BookingDetailsLeft = ({ order }) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Status Banner */}
      <div className={`p-6 rounded-2xl border flex items-center justify-between transition-colors duration-500 ${(order.status === "Ready To Go" || order.status === "Delivered") ? "bg-success/10 border-success/20 text-success" :
          order.status === "Canceled" ? "bg-base-300 border-base-400 text-base-content/50" :
            order.status === "Pending" ? "bg-warning/10 border-warning/20 text-warning" :
              "bg-error/10 border-error/20 text-error" // For "Not Paid"
        }`}>
        <div className="flex items-center gap-4">
          {(order.status === "Ready To Go" || order.status === "Delivered") ? <CheckCircle2 size={32} /> :
            order.status === "Canceled" ? <XCircle size={32} /> : <Clock size={32} />}
          <div>
            <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">Current Status</p>
            <p className="text-xl font-black italic uppercase">{order.status}</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-bold uppercase opacity-60">Created On</p>
          <p className="font-bold text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-base-200 bg-base-200/30 flex items-center gap-2 font-black italic uppercase text-xs">
          <PackageCheck size={16} className="text-primary" /> Booked Services
        </div>
        <div className="p-0">
          <table className="table w-full">
            <thead className="text-[10px] uppercase opacity-50">
              <tr>
                <th>Service</th>
                <th className="text-center">Qty</th>
                <th className="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b border-base-200 last:border-0">
                  <td>
                    <div className="font-bold text-base-content">{item.service.name}</div>
                    <div className="text-[10px] font-medium opacity-50 uppercase">{item.service.category.name}</div>
                  </td>
                  <td className="text-center font-bold">x{item.quantity}</td>
                  <td className="text-right font-black italic text-primary">
                    €{parseFloat(item.total_price).toFixed(2)}
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

export default BookingDetailsLeft;