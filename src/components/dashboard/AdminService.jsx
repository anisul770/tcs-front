import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import authApiClient from "../../services/auth-api-client";

const AdminServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "", // Ensure this matches your Category ID/Object structure
    image: ""
  });

  const fetchServices = async () => {
    try {
      const res = await authApiClient.get("/services/");
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleOpenModal = (service = null) => {
    if (service) {
      setSelectedService(service);
      setFormData({
        name: service.name,
        price: service.price,
        description: service.description,
        category: service.category?.id || "",
        image: service.image || ""
      });
    } else {
      setSelectedService(null);
      setFormData({ name: "", price: "", description: "", category: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (selectedService) {
        await authApiClient.put(`/services/${selectedService.id}/`, formData);
        toast.success("Service updated");
      } else {
        await authApiClient.post("/services/", formData);
        toast.success("New service created");
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      toast.error("Error saving service");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service permanently?")) return;
    try {
      await authApiClient.delete(`/services/${id}/`);
      toast.success("Service removed");
      fetchServices();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-primary" /></div>;

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Manage <span className="text-primary">Services</span></h1>
          <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-1">Add or update your cleaning offerings</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/20">
          <Plus size={18} /> Add New Service
        </button>
      </div>

      {/* Service Table */}
      <div className="card bg-base-100 border border-base-200 shadow-sm overflow-hidden">
        <table className="table w-full">
          <thead className="bg-base-200/50">
            <tr className="text-[10px] font-black uppercase tracking-widest opacity-60">
              <th className="pl-8">Service</th>
              <th>Category</th>
              <th>Price</th>
              <th className="text-right pr-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((s) => (
              <tr key={s.id} className="hover:bg-base-200/20 transition-colors">
                <td className="pl-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-base-200 overflow-hidden border border-base-300 flex items-center justify-center">
                      {s.image ? <img src={s.image} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={16} className="opacity-20" />}
                    </div>
                    <span className="font-bold text-sm">{s.name}</span>
                  </div>
                </td>
                <td><span className="badge badge-ghost font-bold text-[10px] uppercase tracking-wider">{s.category?.name || "General"}</span></td>
                <td className="font-black italic text-primary">€{parseFloat(s.price).toFixed(2)}</td>
                <td className="text-right pr-8">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(s)} className="btn btn-ghost btn-sm btn-circle text-primary"><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(s.id)} className="btn btn-ghost btn-sm btn-circle text-error"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD/EDIT MODAL */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box max-w-2xl border border-base-300 p-8">
          <h3 className="text-2xl font-black italic uppercase text-primary mb-8">{selectedService ? "Edit Service" : "Add Service"}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="form-control col-span-2">
              <label className="label text-[10px] font-black uppercase opacity-50">Service Name</label>
              <input type="text" className="input input-bordered font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">Price (€)</label>
              <input type="number" step="0.01" className="input input-bordered font-bold text-primary" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
            </div>
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">Image URL</label>
              <input type="text" className="input input-bordered text-xs" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
            </div>
            <div className="form-control col-span-2">
              <label className="label text-[10px] font-black uppercase opacity-50">Description</label>
              <textarea className="textarea textarea-bordered h-32 font-medium" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
            </div>
            <div className="modal-action col-span-2">
              <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" disabled={actionLoading} className="btn btn-primary px-10 rounded-full">
                {actionLoading ? <Loader2 className="animate-spin" size={16} /> : "Save Service"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AdminServiceManager;