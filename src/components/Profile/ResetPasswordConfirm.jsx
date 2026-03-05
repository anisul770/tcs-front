import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import apiClient from '../../services/api-client';
import { Eye, EyeOff } from 'lucide-react';

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  
  // Independent states for each field
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const newPassword = watch("new_password");

  const onSubmit = async (data) => {
    const payload = {
      uid: uid,
      token: token,
      new_password: data.new_password
    };

    const loadId = toast.loading("Saving new password...");
    try {
      await apiClient.post('/auth/users/reset_password_confirm/', payload);
      toast.success("Password reset successful! You can now login.", { id: loadId });
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data || "Link expired or invalid token.", { id: loadId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-8">
        <h2 className="text-2xl font-black italic uppercase text-primary mb-2">Create New Password</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your new credentials below.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* New Password Field */}
          <div className="form-control">
            <label className="label"><span className="label-text font-bold text-xs uppercase">New Password</span></label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                {...register("new_password", { required: "Required", minLength: 8 })}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-base-content/50 hover:text-primary transition-colors"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-control">
            <label className="label"><span className="label-text font-bold text-xs uppercase">Confirm Password</span></label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                {...register("confirm_password", {
                  required: "Please confirm password",
                  validate: v => v === newPassword || "Passwords do not match"
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-base-content/50 hover:text-primary transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirm_password && <span className="text-error text-xs mt-1">{errors.confirm_password.message}</span>}
          </div>

          <button disabled={isSubmitting} className="btn btn-primary w-full font-bold uppercase italic mt-4">
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;