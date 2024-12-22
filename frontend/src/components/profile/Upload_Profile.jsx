import React, {useState} from 'react'
import { useAuthStore } from '../../store/useAuthStore';

const Upload_Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const {authUser} = useAuthStore();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // console.log(file);
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    
  };
  return (
    <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 group p-1">
          <img
            src={preview || authUser?.profilePic}
            alt="Profile"
            // className="w-32 h-32 rounded-full shadow-md mb-2"
            className="w-full h-full object-cover rounded-full border border-gray-300"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <label
            htmlFor="upload"
            className="text-white text-sm font-medium cursor-pointer"
          >
            Edit
          </label>
          </div>
          <input
        id="upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      
      </div>
      <h2 className="text-xl font-bold text-center my-1">{authUser?.fullName}</h2>
      </div>
  )
}

export default Upload_Profile