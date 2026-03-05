import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, Loader2, CheckCircle, XCircle, ChevronDown, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import authApiClient from "../../services/auth-api-client";
import apiClient from "../../services/api-client";
import { Link } from "react-router";

const AdminServiceManager = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Initializing React Hook Form
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [serviceRes, catRes] = await Promise.all([
        apiClient.get("/services/"),
        apiClient.get("/categories/")
      ]);
      setServices(serviceRes.data.results || []);
      setCategories(catRes.data.results || catRes.data || []);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Database synchronization failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (data) => {
    setActionLoading(true);
    const previousState = [...services];
    const payload = {
      ...data,
      price: parseFloat(data.price),
      category_id: parseInt(data.category)
    };

    try {
      if (selectedService) {
        const updatedCategory = categories.find(c => c.id === payload.category_id);
        const updatedList = services.map(s =>
          s.id === selectedService.id ? { ...s, ...payload, category: updatedCategory } : s
        );
        setServices(updatedList);
        setIsModalOpen(false);
        await authApiClient.patch(`/services/${selectedService.id}/`, payload);
        toast.success("Service refined successfully");
      } else {
        const res = await authApiClient.post("/services/", payload);
        setServices(prev => [res.data, ...prev]);
        toast.success("New service deployed");
        setIsModalOpen(false);
      }
      reset();
    } catch (err) {
      setServices(previousState);
      toast.error(err?.response?.data?.detail || "Sync failed. Integrity preserved.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Purge this service from the registry?")) return;
    const previousState = [...services];
    setServices(prev => prev.filter(s => s.id !== id));
    try {
      await authApiClient.delete(`/services/${id}/`);
      toast.success("Service purged");
    } catch (err) {
      setServices(previousState);
      toast.error(err.response?.data?.detail || "Critical error during deletion.");
    }
  };

  const handleOpenModal = (service = null) => {
    setSelectedService(service);
    if (service) {
      const matchedCategory = categories.find(cat => cat.name === service.category?.name);
      reset({
        name: service.name,
        price: service.price,
        description: service.description,
        category: matchedCategory ? matchedCategory.id : "",
        is_active: service.is_active
      });
    } else {
      reset({ name: "", price: "", description: "", category: "", is_active: true });
    }
    setIsModalOpen(true);
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Decrypting Inventory...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto animate-in fade-in duration-700 pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
            Service <span className="text-primary">Inventory</span>
          </h1>
          <p className="text-xs font-bold opacity-40 uppercase tracking-[0.3em] mt-2 italic">Master Control System</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary rounded-2xl px-8 shadow-xl shadow-primary/20 font-black italic uppercase tracking-widest text-xs group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Deploy Service
        </button>
      </div>

      {/* Table */}
      <div className="bg-base-100 border border-base-200 shadow-2xl overflow-hidden rounded-[2.5rem]">
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[800px]">
            <thead className="bg-base-200/50">
              <tr className="text-[10px] font-black uppercase tracking-widest opacity-40">
                <th className="pl-10 py-6">Identity</th>
                <th>Classification</th>
                <th>Status</th>
                <th>Investment</th>
                <th className="text-right pr-10">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200/50">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-base-200/30 transition-colors group animate-in slide-in-from-left-2 duration-300">
                  <td className="pl-10 py-5">
                    <Link to={`/services/${s.id}`} className="block">
                      <span className="font-black italic uppercase text-sm tracking-wide block group-hover:text-primary transition-colors">{s.name}</span>
                      <span className="text-[10px] font-medium opacity-40 truncate max-w-[250px] block italic">{s.description}</span>
                    </Link>
                  </td>
                  <td>
                    <span className="badge border-base-300 bg-transparent font-black text-[9px] uppercase py-3 px-3 italic opacity-60">
                      {s.category?.name || "Unclassified"}
                    </span>
                  </td>
                  <td>
                    {s.is_active ?
                      <span className="text-success flex items-center gap-1.5 text-[9px] font-black uppercase italic tracking-wider">
                        <CheckCircle size={12} strokeWidth={3} /> Online
                      </span> :
                      <span className="text-error flex items-center gap-1.5 text-[9px] font-black uppercase italic tracking-wider">
                        <XCircle size={12} strokeWidth={3} /> Offline
                      </span>
                    }
                  </td>
                  <td className="font-black italic text-primary text-lg tracking-tighter">€{parseFloat(s.price).toFixed(2)}</td>
                  <td className="text-right pr-10">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(s)} className="btn btn-ghost btn-sm rounded-xl text-info hover:bg-info/10">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="btn btn-ghost btn-sm rounded-xl text-error hover:bg-error/10">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal with useForm Errors */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""} bg-base-300/80 backdrop-blur-md`}>
        <div className="modal-box max-w-2xl bg-base-100 border border-base-200 p-0 rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

          <div className="px-10 pt-10 pb-6 border-b border-base-200 bg-base-200/50">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70 mb-2">Service Catalog Admin</p>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">
              {selectedService ? "Modify" : "Create"} <span className="text-primary">Service</span>
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-hidden h-full">
            <div className="px-10 py-8 flex-1 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">

                {/* Name Field */}
                <div className="form-control md:col-span-2 relative">
                  <label className="label py-0 pb-2"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60">Service Designation</span></label>
                  <input
                    {...register("name", { required: "Designation is mandatory" })}
                    className={`input w-full bg-base-200/50 border-transparent focus:border-primary rounded-2xl h-14 font-bold text-lg ${errors.name ? 'border-error bg-error/5' : ''}`}
                  />
                  {errors.name && (
                    <span className="absolute -bottom-6 left-0 text-error text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Price Field */}
                <div className="form-control relative">
                  <label className="label py-0 pb-2"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60">Investment (€)</span></label>
                  <input
                    {...register("price", { required: "Price is required", min: { value: 0.01, message: "Min investment €0.01" } })}
                    type="number" step="0.01"
                    className={`input w-full bg-base-200/50 border-transparent focus:border-primary rounded-2xl h-14 font-black italic text-xl text-primary ${errors.price ? 'border-error bg-error/5' : ''}`}
                  />
                  {errors.price && (
                    <span className="absolute -bottom-6 left-0 text-error text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.price.message}
                    </span>
                  )}
                </div>

                {/* Category Field */}
                <div className="form-control relative">
                  <label className="label py-0 pb-2"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60">Classification</span></label>
                  <select
                    {...register("category", { required: "Select a classification" })}
                    className={`select w-full bg-base-200/50 border-transparent focus:border-primary rounded-2xl h-14 font-bold ${errors.category ? 'border-error bg-error/5' : ''}`}
                  >
                    <option value="" disabled hidden>Select Category</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                  {errors.category && (
                    <span className="absolute -bottom-6 left-0 text-error text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.category.message}
                    </span>
                  )}
                </div>

                {/* Description Field */}
                <div className="form-control md:col-span-2 relative">
                  <label className="label py-0 pb-2"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60">Scope of Work</span></label>
                  <textarea
                    {...register("description", { required: "Scope definition required" })}
                    className={`textarea w-full bg-base-200/50 border-transparent focus:border-primary rounded-2xl p-5 h-32 font-medium italic resize-none ${errors.description ? 'border-error bg-error/5' : ''}`}
                  />
                  {errors.description && (
                    <span className="absolute -bottom-6 left-0 text-error text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.description.message}
                    </span>
                  )}
                </div>

                {/* Status Toggle */}
                <div className="form-control md:col-span-2 bg-base-200/30 border border-base-200 rounded-2xl p-5 flex flex-row items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-base-content">Catalog Visibility</p>
                    <p className="text-xs font-medium italic text-base-content/50">Instant availability toggle.</p>
                  </div>
                  <input {...register("is_active")} type="checkbox" className="toggle toggle-primary toggle-lg shadow-sm" />
                </div>
              </div>
            </div>

            <div className="px-10 py-6 border-t border-base-200 bg-base-100 flex items-center justify-between gap-4">
              <button type="button" className="btn btn-ghost rounded-2xl px-8 font-black uppercase tracking-widest text-[11px] text-base-content/50" onClick={() => setIsModalOpen(false)}>Abort</button>
              <button type="submit" disabled={actionLoading} className="btn btn-primary rounded-2xl px-12 font-black italic uppercase tracking-widest text-[12px]">
                {actionLoading ? <Loader2 className="animate-spin" size={20} /> : "Commit Changes"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AdminServiceManager;