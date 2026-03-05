import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import { UserPlus, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import RegistrationForm from "../components/Registration/RegistrationForm";

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
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 mt-16">
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
            <RegistrationForm register={register} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} password={password} />

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