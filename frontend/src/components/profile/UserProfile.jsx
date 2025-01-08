import React, { useState } from "react";
import Upload_Profile from "./Upload_Profile";
import { useAuthStore } from "../../store/useAuthStore";

const UserProfile = () => {
  const {authUser, updateProfileInfo, isUpdatingProfileInfo} = useAuthStore();

  const [profile, setProfile] = useState({
    fullName: authUser.fullName,
    bio:authUser.bio,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async() => {
    console.log("Updated Profile:", profile);
    await updateProfileInfo(profile);

    setIsEditing(false);
  };

  return (
    <div className="hidden md:block h-screen w-80 bg-white dark:bg-gray-800  border-r border-gray-300 lg:flex lg:flex-col">
        {/* Profile Picture */}
        <Upload_Profile/>
        <p className="text-center text-sm mb-3">{authUser.email}</p>
        {/* User Details */}
        <div 
        className="flex flex-col gap-3 text-sm px-6"
        >
          <div>
            <label className="block text-gray-700">FullName</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded">{profile.fullName}</p>
            )}
          </div>

          <div className="h-sm">
            <label className="block text-gray-700">Bio</label>
            {isEditing ? (
              <textarea
                type="text"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded h-[40px]">{profile.bio}</p>
            )}
          </div>
          {/* Edit/Save Buttons */}
        <div className="flex justify-end mt-2">
          {isEditing ? (
            <button
              disabled={isUpdatingProfileInfo}
              onClick={handleSave}
              // className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              className={`bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 ${isUpdatingProfileInfo ? "cursor-not-allowed" : ""}`}
            >
              {isUpdatingProfileInfo ? "Saving.." : "Save"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
        </div>
        
    </div>
  );
};

export default UserProfile;
