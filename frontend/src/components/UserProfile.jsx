import React, { useState } from "react";

const UserProfile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-123-456-7890",
    bio:"hi my name is iqbal. i am from bangladesh. hi my name is iqbal. i am from bangladesh",
    picture:
      "https://randomuser.me/api/portraits/men/1.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="hidden md:block w-80 bg-white border-r border-gray-300 flex flex-col">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl h-screen">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.picture}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md mb-4"
          />
          {/* {isEditing ? (
            <input
              type="text"
              name="picture"
              value={profile.picture}
              onChange={handleChange}
              className="border rounded p-2 w-full sm:w-1/2 text-center"
              placeholder="Profile Picture URL"
            />
          ) : null} */}
        </div>

        {/* User Details */}
        <div 
        // className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        className="flex flex-col gap-5"
        >
          <div>
            <label className="block text-gray-700">FullName</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded">{profile.name}</p>
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

          <div>
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
          </div>

          <div className="h-sm">
            <label className="block text-gray-700">Bio</label>
            {isEditing ? (
              <textarea
                type="text"
                name="phone"
                value={profile.bio}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded">{profile.bio}</p>
            )}
          </div>

        </div>

        {/* Edit/Save Buttons */}
        <div className="flex justify-end mt-6">
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
        </div>


      {/* <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-300 mb-4"></div>
        <button className="p-2 bg-green-500 text-white rounded-lg">
          Change Picture
        </button>
      </div>
      <form className="mt-8 space-y-4">
        <div>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <button className="w-full p-2 bg-green-500 text-white rounded-lg">
          Save Changes
        </button>
      </form> */}
    </div>
  );
};

export default UserProfile;
