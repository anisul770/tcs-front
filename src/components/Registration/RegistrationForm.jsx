import { Eye, EyeOff } from 'lucide-react';

const RegistrationForm = ({register,errors,showPassword,setShowPassword,showConfirmPassword,setShowConfirmPassword,password}) => {
  return (
    <>
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
          className={`input input-bordered w-full focus:input-primary ${errors.email ? 'input-error' : ''}`}
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
    </>
  );
};

export default RegistrationForm;
