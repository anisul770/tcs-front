import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, Loader2, FolderOpen, CheckCircle, XCircle, ChevronDown, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import authApiClient from "../../services/auth-api-client";
import apiClient from "../../services/api-client";
import { Link } from "react-router";

const AdminServiceManager = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Initializing React Hook Form with errors
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [serviceRes, catRes] = await Promise.all([
        apiClient.get("/services/"),
        apiClient.get("/categories/")
      ]);
      setServices(serviceRes.data.results || []);
      setNextUrl(serviceRes.data.next);
      setCategories(catRes.data.results || catRes.data || []);
    } catch (err) {
      toast.error(err?.response?.data || "Failed to sync with database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLoadMore = async () => {
    if (!nextUrl) return;
    setActionLoading(true);
    try {
      const res = await apiClient.get(nextUrl);
      setServices(prev => [...prev, ...res.data.results]);
      setNextUrl(res.data.next);
    } catch (err) {
      toast.error(err?.response?.data || "Could not load more services");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    setSelectedService(service);

    if (service) {
      // 1. Find the ID from our 'categories' list that matches the name in the service
      const matchedCategory = categories.find(
        (cat) => cat.name === service.category?.name
      );

      // 2. Reset the form using the ID so the dropdown can "see" the match
      reset({
        name: service.name,
        price: service.price,
        description: service.description,
        // We pass the ID (e.g. 1) not the object. This makes the dropdown show the name!
        category: matchedCategory ? matchedCategory.id : "",
        is_active: service.is_active
      });
    } else {
      reset({ name: "", price: "", description: "", category: "", is_active: true });
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    setActionLoading(true);
    const payload = { ...data, price: parseFloat(data.price), category: parseInt(data.category) };

    try {
      if (selectedService) {
        await authApiClient.patch(`/services/${selectedService.id}/`, payload);
        toast.success("Updated successfully");
      } else {
        await authApiClient.post("/services/", payload);
        toast.success("Created successfully");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data || "Submission failed. Check backend constraints.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm permanent deletion?")) return;
    try {
      await authApiClient.delete(`/services/${id}/`);
      toast.success("Removed");
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      toast.error(err?.response?.data || "Delete failed");
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Syncing Services...</p>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">

      {/* Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Service <span className="text-primary">Inventory</span>
          </h1>
          <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-1">Admin Control Center</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30">
          <Plus size={18} /> New Service
        </button>
      </div>

      {/* Services Table */}
      <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden rounded-3xl">
        <table className="table w-full">
          <thead className="bg-base-200/50">
            <tr className="text-[10px] font-black uppercase tracking-widest opacity-60">
              <th className="pl-8 py-4">Service</th>
              <th>Category</th>
              <th>Status</th>
              <th>Price</th>
              <th className="text-right pr-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-base-200/40 transition-colors group">
                <td className="pl-8 py-4">
                  <Link to={`/services/${s.id}`}>
                    <div>
                      <span className="font-bold text-sm block">{s.name}</span>
                      <span className="text-[10px] opacity-40 truncate max-w-[200px] inline-block">{s.description}</span>
                    </div>
                  </Link>
                </td>
                <td>
                  <span className="badge badge-ghost font-bold text-[10px] uppercase py-3 px-3">
                    {s.category?.name || "General"}
                  </span>
                </td>
                <td>
                  {s.is_active ?
                    <span className="text-success flex items-center gap-1 text-[10px] font-bold uppercase"><CheckCircle size={12} /> Active</span> :
                    <span className="text-error flex items-center gap-1 text-[10px] font-bold uppercase"><XCircle size={12} /> Hidden</span>
                  }
                </td>
                <td className="font-black italic text-primary text-lg">€{parseFloat(s.price).toFixed(2)}</td>
                <td className="text-right pr-8">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(s)} className="btn btn-ghost btn-sm btn-circle text-info bg-info/10"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(s.id)} className="btn btn-ghost btn-sm btn-circle text-error bg-error/10"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {nextUrl && (
          <div className="p-6 bg-base-200/20 text-center border-t border-base-200">
            <button
              disabled={actionLoading}
              onClick={handleLoadMore}
              className="btn btn-ghost btn-sm gap-2 font-black uppercase italic tracking-widest opacity-60 hover:opacity-100"
            >
              {actionLoading ? <Loader2 className="animate-spin" size={14} /> : <ChevronDown size={14} />}
              Load More Services
            </button>
          </div>
        )}
      </div>

      {/* MODAL SECTION */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""} bg-base-300/80 backdrop-blur-md`}>
        {/* Added: flex flex-col and max-h-[90vh] to control the modal's maximum height */}
        <div className="modal-box max-w-2xl bg-base-100 border border-base-200 p-0 rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300 relative">

          {/* --- MODAL HEADER (Sticky Top) --- */}
          <div className="px-8 md:px-10 pt-10 pb-6 border-b border-base-200 bg-base-200/50 shrink-0">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70 mb-2">Service Catalog Admin</p>
            <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-none">
              {selectedService ? "Modify" : "Create"} <span className="text-primary">Service</span>
            </h3>
          </div>

          {/* --- FORM SECTION --- */}
          {/* Added: flex flex-col and overflow-hidden to the form itself */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-hidden h-full">

            {/* --- SCROLLABLE INPUTS AREA --- */}
            {/* Added: flex-1 overflow-y-auto and our hidden scrollbar classes */}
            <div className="px-8 md:px-10 py-8 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">

                {/* Name Field */}
                <div className="form-control md:col-span-2">
                  <label className="label py-0 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60">Service Designation</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("name", { required: "Service name is required" })}
                      type="text"
                      placeholder="e.g., Deep Residential Restoration"
                      className={`input w-full bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl h-14 px-5 font-bold text-lg transition-all ${errors.name ? 'border-error focus:border-error focus:ring-error/20 bg-error/5' : ''}`}
                    />
                    {errors.name && (
                      <div className="absolute -bottom-6 left-1 text-error text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.name.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Field */}
                <div className="form-control relative">
                  <label className="label py-0 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60">Investment (€)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black italic text-base-content/40">€</span>
                    <input
                      {...register("price", { required: "Price is required", min: { value: 1, message: "Price must be at least 1" } })}
                      type="number" step="0.01" placeholder="0.00"
                      className={`input w-full pl-9 bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl h-14 font-black italic text-xl text-primary transition-all ${errors.price ? 'border-error focus:border-error focus:ring-error/20 bg-error/5' : ''}`}
                    />
                    {errors.price && (
                      <div className="absolute -bottom-6 left-1 text-error text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.price.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Field */}
                <div className="form-control relative">
                  <label className="label py-0 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60">Classification</span>
                  </label>
                  <select
                    {...register("category", { required: "Please select a classification" })}
                    className={`select w-full bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl h-14 px-5 font-bold transition-all ${errors.category ? 'border-error focus:border-error focus:ring-error/20 bg-error/5' : ''}`}
                  >
                    <option value="" disabled hidden>Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="absolute -bottom-6 left-1 text-error text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.category.message}
                    </div>
                  )}
                </div>

                {/* Description Field */}
                <div className="form-control md:col-span-2 relative">
                  <label className="label py-0 pb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60">Scope of Work</span>
                  </label>
                  <textarea
                    {...register("description", { required: "Scope of work is required" })}
                    placeholder="Detail the exact specifications of this service..."
                    className={`textarea w-full bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl p-5 h-32 font-medium italic resize-none transition-all ${errors.description ? 'border-error focus:border-error focus:ring-error/20 bg-error/5' : ''}`}
                  />
                  {errors.description && (
                    <div className="absolute -bottom-6 left-1 text-error text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.description.message}
                    </div>
                  )}
                </div>

                {/* Status Field */}
                <div className="form-control md:col-span-2 bg-base-200/30 border border-base-200 rounded-2xl p-5 flex flex-row items-center justify-between group hover:bg-base-200/60 transition-colors">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-base-content">Catalog Visibility</p>
                    <p className="text-xs font-medium italic text-base-content/50 mt-1">Make this service immediately available for booking.</p>
                  </div>
                  <input
                    {...register("is_active")}
                    type="checkbox"
                    className="toggle toggle-primary toggle-lg shadow-sm"
                  />
                </div>

              </div>
            </div>

            {/* --- MODAL ACTIONS (Sticky Bottom) --- */}
            {/* Added: shrink-0 to prevent it from getting squished, and a blur effect so the scrolling looks seamless underneath it */}
            <div className="px-8 md:px-10 py-6 border-t border-base-200 bg-base-100/95 backdrop-blur shrink-0 flex items-center justify-between gap-4 z-10">
              <button
                type="button"
                className="btn btn-ghost rounded-2xl px-8 font-black uppercase tracking-widest text-[11px] text-base-content/50 hover:text-base-content"
                onClick={() => setIsModalOpen(false)}
              >
                Abort
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="btn btn-primary rounded-2xl px-12 shadow-xl shadow-primary/20 font-black italic uppercase tracking-widest text-[12px] group"
              >
                {actionLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>{selectedService ? "Commit Update" : "Deploy Service"} <span className="group-hover:translate-x-1 transition-transform inline-block ml-2">→</span></>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Closes modal on outside click */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setIsModalOpen(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AdminServiceManager;