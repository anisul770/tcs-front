const ProfileLeft = ({preview,user,handleProfilePic,uploadPhoto,isSaving}) => {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm p-8 text-center h-fit">
      <div className="avatar mb-4">
        <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 mx-auto bg-neutral text-neutral-content flex items-center justify-center overflow-hidden">
          {/* Use preview if it exists, otherwise use the saved user profile_pic */}
          {(preview || user?.profile_pic) ? (
            <img src={preview || user.profile_pic} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <span className="text-4xl font-black uppercase">
              {user?.first_name?.charAt(0) || user?.email?.charAt(0)}
            </span>
          )}
        </div>
      </div>
      <h2 className="text-xl font-bold">{user?.first_name} {user?.last_name}</h2>
      <p className="text-sm opacity-60 mb-6">{user?.email}</p>

      <div className="flex flex-col gap-2">
        {/* Hidden input for logic */}
        <input
          type="file"
          id="profile-upload"
          className="hidden"
          accept="image/*"
          onChange={handleProfilePic}
        />

        {/* Label styled exactly like your original button */}
        <label
          htmlFor="profile-upload"
          className="btn btn-outline btn-sm w-full cursor-pointer"
        >
          {preview ? "Change Selection" : "Change Photo"}
        </label>

        {/* Action button appears only when a new photo is selected */}
        {preview && (
          <button
            onClick={uploadPhoto}
            disabled={isSaving}
            className="btn btn-primary btn-sm w-full animate-in slide-in-from-top-1"
          >
            {isSaving ? <>
              <span className="loading loading-spinner loading-xs"></span>
              Saving photo...
            </> : 'Confirm Upload'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileLeft;