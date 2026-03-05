import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser, loading, errorMsg } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const result = await loginUser(data);
    if (result.success) {
      navigate('/dashboard');
    } else {
      toast.error(errorMsg || "Backend server is offline. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 items-center shadow-2xl overflow-hidden">
        <div className="h-2 bg-primary w-full"></div>

        <div className="card-body p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-black italic text-primary uppercase tracking-tighter">
              TCS<span className="text-base-content font-light">.clean</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2 font-medium italic">Welcome back!</p>
          </div>

          {errorMsg && (
            <div className="alert alert-error mb-6 py-2 shadow-md">
              <span className="text-xs font-bold text-white">
                {errorMsg.data?.detail || "Invalid email or password."}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">

            {/* Email Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase text-gray-400">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="cleaner@example.com"
                className={`input input-bordered focus:input-primary ${errors.email ? 'input-error' : ''}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-error text-xs mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label py-1 flex justify-between">
                <span className="label-text font-bold text-xs uppercase text-gray-400">Password</span>
                <Link to="/forgot-password" size="sm" className="label-text-alt link link-primary font-bold no-underline hover:underline">
                  Forgot Password?
                </Link>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input input-bordered w-full focus:input-primary ${errors.password ? 'input-error' : ''} pr-10`}
                  {...register("password", {
                    required: "Password is required"
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-base-content/50 hover:text-primary transition-colors"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-xs mt-1 font-medium">{errors.password.message}</span>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary w-full rounded-xl font-bold uppercase tracking-wide`}
              >
                {loading ? <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Authenticating...
                </> : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="divider text-gray-400 text-[10px] uppercase font-bold w-full">New to our platform?</div>

          <div className="text-center">
            <Link to="/register" className="btn btn-outline btn-sm rounded-lg text-xs">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;