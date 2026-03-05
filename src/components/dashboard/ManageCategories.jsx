import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Layers, Plus, Edit3, Trash2, AlertCircle,
  Loader2, Zap, ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";
import useCategories from "../../hooks/useCategories";
import authApiClient from "../../services/auth-api-client";

const ManageCategories = () => {
  const { categories: initialCategories, loading, refresh } = useCategories();

  // Local state for Optimistic Updates
  const [localCategories, setLocalCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Sync local state when hook data changes
  useEffect(() => {
    setLocalCategories(initialCategories);
  }, [initialCategories]);

  // --- OPTIMISTIC SUBMIT ---
  const onSubmit = async (data) => {
    setActionLoading(true);
    const previousState = [...localCategories]; // Backup for rollback

    try {
      if (selectedCategory) {
        // 1. Optimistic Update (Edit)
        const updatedList = localCategories.map(cat =>
          cat.id === selectedCategory.id ? { ...cat, ...data } : cat
        );
        setLocalCategories(updatedList);
        setIsModalOpen(false);

        // 2. Background Sync
        await authApiClient.patch(`/categories/${selectedCategory.id}/`, data);
        toast.success("Category refined successfully");
      } else {
        // Create Logic (Usually wait for ID from server, but we can refresh)
        await authApiClient.post('/categories/', data);
        toast.success("New category deployed");
        refresh(); // Re-fetch to get the real ID from DB
        setIsModalOpen(false);
      }
      reset();
    } catch (err) {
      // 3. Rollback on failure
      setLocalCategories(previousState);
      toast.error(err.response?.data?.message || "Sync failed. Rolling back.");
    } finally {
      setActionLoading(false);
    }
  };

  // --- OPTIMISTIC DELETE ---
  const handleDelete = async (id) => {
    if (!window.confirm("Purge this category from the DNA?")) return;

    const previousState = [...localCategories];

    // 1. Optimistic Update (Remove immediately)
    setLocalCategories(localCategories.filter(cat => cat.id !== id));

    try {
      // 2. Background Sync
      await authApiClient.delete(`/categories/${id}/`);
      toast.success("Category purged from records");
    } catch (err) {
      // 3. Rollback
      setLocalCategories(previousState);
      toast.error(err.response?.data?.message||"Deletion failed. Integrity preserved.");
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setValue("name", category.name);
    setValue("description", category.description);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedCategory(null);
    reset();
    setIsModalOpen(true);
  };

  if (loading && localCategories.length === 0) return (
    <div className="p-10 space-y-10 animate-pulse">
      <div className="h-24 bg-base-300 rounded-[2rem] opacity-50"></div>
      <div className="h-96 bg-base-300 rounded-[2.5rem] opacity-20"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-10 space-y-10 animate-in fade-in duration-700">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-black uppercase italic tracking-[0.3em] text-[10px] mb-2">
            <Zap size={12} fill="currentColor" /> Taxonomy Systems
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
            Service <span className="text-primary">Categories</span>
          </h1>
          <p className="text-base-content/50 mt-3 font-medium italic">High-performance structural management.</p>
        </div>

        <button onClick={openCreateModal} className="group btn btn-primary px-8 rounded-2xl font-black italic uppercase tracking-widest shadow-xl shadow-primary/20">
          Add Category <Plus size={18} className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* --- CATEGORY TABLE --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-sm overflow-hidden transition-all duration-500">
        <div className="overflow-x-auto">
          <table className="table table-lg">
            <thead>
              <tr className="border-b border-base-200 bg-base-200/30">
                <th className="text-[10px] font-black uppercase tracking-widest opacity-40 py-6 pl-10">Details</th>
                <th className="text-[10px] font-black uppercase tracking-widest opacity-40 py-6">Description</th>
                <th className="text-[10px] font-black uppercase tracking-widest opacity-40 py-6 text-right pr-10">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200/50">
              {localCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-base-200/30 transition-colors group animate-in slide-in-from-left-2 duration-300">
                  <td className="pl-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Layers size={20} />
                      </div>
                      <div>
                        <span className="font-black italic uppercase tracking-wider text-base-content block">{cat.name}</span>
                        <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">ID: #CAT-0{cat.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-md">
                    <p className="text-sm font-medium italic text-base-content/60 line-clamp-2">
                      {cat.description || "No description provided."}
                    </p>
                  </td>
                  <td className="text-right pr-10">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(cat)} className="btn btn-ghost btn-sm rounded-xl hover:text-primary transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="btn btn-ghost btn-sm rounded-xl hover:text-error transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CATEGORY MODAL --- */}
      <dialog className={`modal ${isModalOpen ? "modal-open" : ""} bg-base-300/80 backdrop-blur-md`}>
        <div className="modal-box max-w-xl bg-base-100 border border-base-200 p-0 rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative">

          <div className="px-10 pt-10 pb-6 border-b border-base-200 bg-base-200/50 shrink-0">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70 mb-2">Structure Refinement</p>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">
              {selectedCategory ? "Modify" : "Create"} <span className="text-primary">Category</span>
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-hidden">
            <div className="px-10 py-8 space-y-8 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <div className="form-control w-full">
                <label className="label py-0 pb-2"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60">Category Identity</span></label>
                <input
                  {...register("name", { required: "Identity is required" })}
                  type="text"
                  className={`input w-full bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary rounded-2xl h-14 px-5 font-bold text-lg transition-all ${errors.name ? 'border-error' : ''}`}
                />
              </div>

              <div className="form-control w-full">
                <label className="label py-0 pb-2"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60">Classification Scope</span></label>
                <textarea
                  {...register("description", { required: "Scope description is required" })}
                  className={`textarea w-full bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary rounded-2xl p-5 h-32 font-medium italic resize-none transition-all ${errors.description ? 'border-error' : ''}`}
                />
              </div>
            </div>

            <div className="px-10 py-6 border-t border-base-200 bg-base-100/95 flex items-center justify-between gap-4 shrink-0">
              <button type="button" className="btn btn-ghost rounded-2xl px-8 font-black uppercase tracking-widest text-[11px] text-base-content/50" onClick={() => setIsModalOpen(false)}>Abort</button>
              <button type="submit" disabled={actionLoading} className="btn btn-primary rounded-2xl px-12 font-black italic uppercase tracking-widest text-[12px] group">
                {actionLoading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>Commit Changes <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop"><button onClick={() => setIsModalOpen(false)}>close</button></form>
      </dialog>
    </div>
  );
};

export default ManageCategories;