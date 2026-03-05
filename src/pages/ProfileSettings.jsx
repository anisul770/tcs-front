import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ProfileInfoForm from "../components/Profile/ProfileInfoForm";
import ProfileLeft from "../components/Profile/ProfileLeft";
import PasswordChangeForm from "../components/Profile/PasswordChangeForm"; 

const ProfileSettings = () => {
  const { user, updateProfile } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      facebook_link: user?.facebook_link || '',
      phone_number: user?.phone_number || '',
    }
  });

  const onSubmit = async (data) => {
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
      setIsEditing(false);
    } else {
      toast.error(res?.error || "Failed to update profile.");
    }
  };

  const handleProfilePic = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('profile_pic', selectedFile);
    setImage(formData);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const uploadPhoto = async () => {
    if (!image) return;
    setIsSaving(true);
    const loadId = toast.loading("Saving photo...");
    const res = await updateProfile(image);

    if (res?.success) {
      toast.success("Profile updated!", { id: loadId });
      setPreview(null);
      setImage(null);
    } else {
      toast.error(res?.error || "Upload failed", { id: loadId });
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black italic text-base-content">Account Settings</h1>
        <p className="text-base-content/60">Manage your personal information and profile preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <ProfileLeft preview={preview} user={user} handleProfilePic={handleProfilePic} uploadPhoto={uploadPhoto} isSaving={isSaving}/>

        {/* Right Column (Wrapped to stack cards) */}
        <div className="lg:col-span-2">
          
          {/* Personal Information Form */}
          <div className="card bg-base-100 border border-base-300 shadow-sm">
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
              {isEditing && (
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary px-8 shadow-lg shadow-primary/20`}
                  >
                    {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Password Change Form Added Here! */}
          <PasswordChangeForm />
          
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;