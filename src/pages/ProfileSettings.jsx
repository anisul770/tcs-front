import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ProfileInfoForm from "../components/Profile/ProfileInfoForm";

const ProfileSettings = () => {
  const { user, updateProfile } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  // const [successMsg, setSuccessMsg] = useState("");

  // 1. Initialize React Hook Form with default values from Context
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      facebook_link: user?.facebook_link || '',
      phone_number: user?.phone_number || '',
      // Add other fields from your Swagger here if needed (e.g., phone)
    }
  });

  // 2. Handle the Patch request
  const onSubmit = async (data) => {
    // payload is good, but let's use the result from updateProfile
    console.log(data);
    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      bio: data.bio,
      facebook_link: data.facebook_link,
      phone_number: data.phone_number,
    };

    const res = await updateProfile(payload);

    if (res?.success) {
      toast.success(res.message || 'Profile updated!');
      setIsEditing(false); // Close the edit mode on success
    } else {
      toast.error(res?.error || "Failed to update profile.");
    }
  };

  // 3. Reset form if user cancels editing
  const handleCancel = () => {
    reset(); // Reverts fields to defaultValues
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black italic text-base-content">Account Settings</h1>
        <p className="text-base-content/60">Manage your personal information and profile preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Avatar & Quick Info */}
        <div className="card bg-base-100 border border-base-300 shadow-sm p-8 text-center h-fit">
          <div className="avatar mb-4">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 mx-auto bg-neutral text-neutral-content flex items-center justify-center">
              {user?.profile_pic ? (
                <img src={user.profile_pic} alt="Profile" />
              ) : (
                <span className="text-4xl font-black uppercase">
                  {user?.first_name?.charAt(0) || user?.email?.charAt(0)}
                </span>
              )}
            </div>
          </div>
          <h2 className="text-xl font-bold">{user?.first_name} {user?.last_name}</h2>
          <p className="text-sm opacity-60 mb-6">{user?.email}</p>
          <button className="btn btn-outline btn-sm w-full">Change Photo</button>
        </div>

        {/* Right Column: Personal Information Form */}
        <div className="lg:col-span-2 card bg-base-100 border border-base-300 shadow-sm">
          <div className="p-6 border-b border-base-200 flex justify-between items-center">
            <h3 className="font-black text-lg">Personal Information</h3>
            <div>
              {isEditing ? (
                <button onClick={handleCancel} className="btn btn-sm btn-ghost mr-2">Cancel</button>
              ) : (
                <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-primary">Edit Profile</button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">

            <ProfileInfoForm register={register} isEditing={isEditing} errors={errors} />
            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary px-8 shadow-lg shadow-primary/20`}
                >
                  {isSubmitting ? <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </> : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;