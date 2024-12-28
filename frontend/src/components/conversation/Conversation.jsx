import React, {useEffect, useState} from 'react'
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserStore } from '../../store/useUserStore';

const Conversation = () => {
  const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
  const {getMyFriends, myFriends} = useUserStore();

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filter friends based on search term
  const filteredUsers = myFriends.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(()=>{
    getMyFriends();
  },[getMyFriends]);

  return (
    <>
    <div className="p-4 flex flex-col items-center justify-between">
        <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-1">Conversations</h2>
        <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 h-1 text-sm rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2"
        />
      </div>
    </div>
    
    <div className="h-[86%] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
    {filteredUsers.length > 0 ? (
      <div 
      className="flex-1"
      key={filteredUsers._id}
      >
        {filteredUsers.map((user)=>(
          <button 
          key={user._id}
          onClick={()=>setSelectedUser(user)}
          className="
            w-full p-4 flex items-center hover:bg-gray-200 cursor-pointer
            "
            // ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
          
          >
          <div 
          // className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center"
          className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center"
          >
          <img
            src={user.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"}
            width="40"
            height="40"
            alt={user?.fullName}
            className='overflow-hidden rounded-full'
          />
          </div>
          <div className="ml-3">
          <p className="font-medium text-gray-800 dark:text-white">{user.fullName}</p>
          <p className="text-sm text-gray-500">Start the conversation!</p>
          </div>
          </button>
          // <li 
          // className="p-4 flex items-center hover:bg-gray-200 cursor-pointer"
          // >
          // <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
          // <img
          //     src="https://randomuser.me/api/portraits/men/1.jpg"
          //     width="40"
          //     height="40"
          //     alt="iqbal"
          //     className='overflow-hidden rounded-full'
          // />
          // </div>
          // <div className="ml-3">
          //   <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
          //   <p className="text-sm text-gray-500">Start the conversation!</p>
          // </div>
          // </li>
        ))}
      </div>
    ): (
      <p className="text-gray-500 text-center">No friends found.</p>
    )}
    </div>
    <div>
    </div>
    </>
  )
}

export default Conversation