import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import authApiClient from "../../services/auth-api-client";

const PasswordChangeForm = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();

  const newPassword = watch("new_password");

  const onSubmit = async (data) => {
    const payload = {
      current_password: data.current_password,
      new_password: data.new_password,
    };

    const loadId = toast.loading("Updating password...");
    try {
      await authApiClient.post('/auth/users/set_password/', payload);
      toast.success("Password updated successfully!", { id: loadId });
      reset(); 
      setIsChangingPassword(false);
      setShowPassword(false);
    } catch (error) {
      const errorMsg = error.response?.data?.current_password?.[0] 
        || error.response?.data?.new_password?.[0] 
        || "Failed to update password.";
      toast.error(errorMsg, { id: loadId });
    }
  };

  const handleCancel = () => {
    reset(); 
    setIsChangingPassword(false); 
    setShowPassword(false);
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm mt-8 animate-in fade-in duration-300">
      <div className="p-6 border-b border-base-200 flex justify-between items-center">
        <div>
          <h3 className="font-black text-lg">Security</h3>
          {!isChangingPassword && (
            <p className="text-sm opacity-60">Update your password to keep your account secure.</p>
          )}
        </div>
        
        {!isChangingPassword && (
          <button 
            onClick={() => setIsChangingPassword(true)} 
            className="btn btn-sm btn-outline font-bold italic"
          >
            Change Password
          </button>
        )}
      </div>

      {isChangingPassword && (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
          
          {/* Current Password */}
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Current Password</span></label>
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`input input-bordered w-full ${errors.current_password ? 'input-error' : ''}`}
              {...register("current_password", { required: "Current password is required" })} 
            />
            {errors.current_password && <span className="text-error text-xs mt-1">{errors.current_password.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* New Password */}
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">New Password</span></label>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className={`input input-bordered w-full ${errors.new_password ? 'input-error' : ''}`}
                {...register("new_password", { 
                  required: "New password is required",
                  minLength: { value: 8, message: "Must be at least 8 characters" }
                })} 
              />
              {errors.new_password && <span className="text-error text-xs mt-1">{errors.new_password.message}</span>}
            </div>

            {/* Confirm New Password */}
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">Confirm New Password</span></label>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className={`input input-bordered w-full ${errors.confirm_password ? 'input-error' : ''}`}
                {...register("confirm_password", { 
                  required: "Please confirm your new password",
                  validate: value => value === newPassword || "Passwords do not match"
                })} 
              />
              {errors.confirm_password && <span className="text-error text-xs mt-1">{errors.confirm_password.message}</span>}
            </div>
          </div>

          {/* BOTTOM BAR: Toggle and Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-base-200 mt-4">
            
            {/* The Beautiful Toggle Button */}
            <label className="label cursor-pointer justify-start gap-3">
              <input 
                type="checkbox" 
                className="toggle toggle-primary toggle-sm" 
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span className="label-text font-bold text-xs uppercase opacity-70">Show Passwords</span>
            </label>

            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={handleCancel}
                className="btn btn-ghost btn-sm"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-neutral btn-sm px-6 font-black uppercase italic tracking-tighter"
              >
                {isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : 'Update Password'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PasswordChangeForm;