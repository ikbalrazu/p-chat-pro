import React, { useState } from "react";
import Upload_Profile from "./Upload_Profile";
import { useAuthStore } from "../../store/useAuthStore";

const UserProfile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const {authUser, updateProfileInfo} = useAuthStore();

  const [profile, setProfile] = useState({
    fullName: authUser.fullName,
    email: authUser.email,
    // phone: "+1-123-456-7890",
    bio:authUser.bio,
    // picture: "https://randomuser.me/api/portraits/men/1.jpg",
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
        {/* <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl h-screen"> */}
        {/* Profile Picture */}
        <Upload_Profile/>

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

          <div>
            <label className="block text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded">{profile.email}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-gray-700">Phone</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded">{profile.phone}</p>
            )}
          </div> */}

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
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Save
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
        
        
        {/* </div> */}
    </div>
  );
};

export default UserProfile;
