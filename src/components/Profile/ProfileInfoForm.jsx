
const ProfileInfoForm = ({ register, isEditing, errors }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold uppercase text-[10px] tracking-widest text-base-content/50">First Name</span>
          </label>
          <input
            type="text"
            {...register("first_name", { required: "First name is required" })}
            disabled={!isEditing}
            className={`input input-bordered w-full focus:input-primary disabled:bg-base-200 ${errors.first_name ? 'input-error' : ''}`}
          />
          {errors.first_name && <span className="text-error text-xs mt-1">{errors.first_name.message}</span>}
        </div>

        {/* Last Name */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold uppercase text-[10px] tracking-widest text-base-content/50">Last Name</span>
          </label>
          <input
            type="text"
            {...register("last_name", { required: "Last name is required" })}
            disabled={!isEditing}
            className={`input input-bordered w-full focus:input-primary disabled:bg-base-200 ${errors.last_name ? 'input-error' : ''}`}
          />
          {errors.last_name && <span className="text-error text-xs mt-1">{errors.last_name.message}</span>}
        </div>
      </div>

      {/* Email (Read-Only) */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold uppercase text-[10px] tracking-widest text-base-content/50">Email Address</span>
        </label>
        <input
          type="email"
          {...register("email")}
          disabled
          className="input input-bordered w-full bg-base-200 cursor-not-allowed opacity-70 font-medium"
        />
        <label className="label">
          <span className="label-text-alt text-primary italic font-medium text-[10px]">Contact support to change email address.</span>
        </label>
      </div>

      {/* phone_number */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold uppercase text-[10px] tracking-widest text-base-content/50">Phone Number</span>
        </label>
        <input
          type="number"
          {...register("phone_number")}
          disabled={!isEditing}
          className={`input input-bordered w-full focus:input-primary disabled:bg-base-200 ${errors.phone_number ? 'input-error' : ''}`}
        />
        {errors.phone_number && <span className="text-error text-xs mt-1">{errors.phone_number.message}</span>}
      </div>

      {/* bio */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold uppercase text-[10px] tracking-widest text-base-content/50">Bio</span>
        </label>
        <input
          type="text"
          {...register("bio")}
          disabled={!isEditing}
          className={`input input-bordered w-full focus:input-primary disabled:bg-base-200 ${errors.bio ? 'input-error' : ''}`}
        />
        {errors.bio && <span className="text-error text-xs mt-1">{errors.bio.message}</span>}
      </div>
      {/* facebook_link */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold uppercase text-[10px] tracking-widest text-base-content/50">FaceBook Link</span>
        </label>
        <input
          {...register("facebook_link", {
            required: false, // Explicitly not required
            pattern: {
              // This regex checks for a valid URL structure
              value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.[a-z]{2,}([/\w .-]*)*\/?$/,
              message: "Please enter a valid URL (e.g., https://facebook.com/yourname)"
            }
          })}
          disabled={!isEditing}
          placeholder="https://facebook.com/..."
          className={`input input-bordered w-full focus:input-primary disabled:bg-base-200 ${errors.facebook_link ? 'input-error' : ''}`}
        />
        {errors.facebook_link && <span className="text-error text-xs mt-1">{errors.facebook_link.message}</span>}
      </div>
    </>
  );
};

export default ProfileInfoForm;