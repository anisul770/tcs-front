import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import apiClient from '../../services/api-client';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const loadId = toast.loading("Sending reset link...");
    try {
      await apiClient.post('/auth/users/reset_password/', data);
      toast.success("Reset link sent! Please check your email.", { id: loadId });
    } catch (error) {
      toast.error(error.response?.data || "Email not found or server error.", { id: loadId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-8">
        <h2 className="text-2xl font-black italic uppercase text-primary">Reset Password</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your email and we'll send you a recovery link.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-bold text-xs uppercase">Email Address</span></label>
            <input
              type="email"
              placeholder="cleaner@example.com"
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              {...register("email", { required: "Email is required" })}
            />
          </div>
          <button disabled={isSubmitting} className="btn btn-primary w-full font-bold uppercase italic">
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-xs link link-hover opacity-70 font-bold uppercase">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;