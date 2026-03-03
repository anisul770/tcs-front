import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import { UserPlus, Mail, CheckCircle2, ArrowRight } from "lucide-react";

const Register = () => {
  const { registerUser, errorMsg } = useAuthContext();

  // State to toggle the "Check your email" view
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 1. Initialize form and extract 'watch'
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  // 2. Watch the password field to compare it against confirm_password
  const password = watch("password", "");

  const onSubmit = async (data) => {
    // We don't need manual password checking here anymore since React Hook Form handles it!
    const res = await registerUser(data);

    if (res?.success) {
      setRegisteredEmail(data.email);
      setIsRegistered(true); // Switch to the success screen
    } else {
      toast.error(errorMsg || "Registration failed.");
    }
  };

  // --- SUCCESS STATE (Check your email) ---
  if (isRegistered) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 animate-in zoom-in duration-300">
          <div className="card-body p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 text-success mb-6">
              <Mail size={40} />
            </div>
            <h1 className="text-2xl font-black italic">Confirm your email</h1>
            <p className="text-sm opacity-70 mt-2">
              We've sent a verification link to <br />
              <span className="font-bold text-base-content">{registeredEmail}</span>
            </p>
            <div className="bg-base-200 rounded-xl p-4 my-6 text-xs text-left flex gap-3">
              <CheckCircle2 size={16} className="text-success shrink-0" />
              <p>Please click the link in the email to activate your account. If you don't see it, check your spam folder.</p>
            </div>
            <Link to="/login" className="btn btn-primary btn-block">
              Back to Login <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- FORM STATE (Original Design) ---
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
              <UserPlus size={28} />
            </div>
            <h1 className="text-3xl font-black italic">Join Us</h1>
            <p className="text-sm opacity-60">Create your account to start booking.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text font-bold uppercase text-[10px] mb-1 opacity-50">First Name</label>
                <input
                  {...register("first_name", { required: "Required" })}
                  className={`input input-bordered focus:input-primary ${errors.first_name ? 'input-error' : ''}`}
                />
              </div>
              <div className="form-control">
                <label className="label-text font-bold uppercase text-[10px] mb-1 opacity-50">Last Name</label>
                <input
                  {...register("last_name", { required: "Required" })}
                  className={`input input-bordered focus:input-primary ${errors.last_name ? 'input-error' : ''}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label-text font-bold uppercase text-[10px] mb-1 opacity-50">Email Address</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                })}
                className={`input input-bordered focus:input-primary ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="text-[10px] text-error mt-1">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label-text font-bold uppercase text-[10px] mb-1 opacity-50">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // <--- Toggles the input type
                  {...register("password", {
                    required: "Password required",
                    minLength: { value: 6, message: "Min 6 characters" }
                  })}
                  className={`input input-bordered focus:input-primary w-full pr-12 ${errors.password ? 'input-error' : ''}`}
                />

                {/* The Toggle Button */}
                <button
                  type="button" // Important so it doesn't submit the form
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-base-content/40 hover:text-primary transition-colors duration-200 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-[10px] text-error mt-1">{errors.password.message}</span>}
            </div>
            {/* Confirm Password with Watch Validation */}
            <div className="form-control">
              <label className="label-text font-bold uppercase text-[10px] mb-1 opacity-50">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirm_password", {
                    required: "Please confirm password",
                    validate: (value) => value === password || "Passwords do not match"
                  })}
                  className={`input input-bordered focus:input-primary w-full pr-12 ${errors.confirm_password ? 'input-error' : ''}`}
                />

                {/* The Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-base-content/40 hover:text-primary transition-colors duration-200 focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirm_password && <span className="text-[10px] text-error mt-1">{errors.confirm_password.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-block shadow-lg shadow-primary/20 mt-4"
            >
              {isSubmitting ? <span className="loading loading-spinner"></span> : "Create Account"}
            </button>
          </form>

          <div className="divider text-[10px] uppercase font-bold opacity-30">Already have an account?</div>

          <Link to="/login" className="btn btn-ghost btn-block btn-sm opacity-70">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;