import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import { useChatStore } from '../../store/useChatStore';
import MessageInput from './MessageInput';
import { useUtilityStore } from '../../store/useUtilityStore';

const Chat = () => {
  const {selectedUser} = useChatStore();
  const navigate = useUtilityStore((state) => state.navigate);
  // console.log(selectedUser);
  return (
    <div className="flex-1 flex flex-col">
        {/* Chat Window */}
        {/* Header */}
        <div className="p-2 bg-white border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center">
            <NavLink 
            onClick={() => navigate('profile')}
            className='md:hidden lg:hidden xl:hidden 2xl:hidden p-2 mr-1 hover:bg-slate-100'
            >
            <IoIosArrowBack size={20}/>
            </NavLink>

            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
            <img
            src={selectedUser.profilePic || "https://randomuser.me/api/portraits/men/1.jpg"}
            width="40"
            height="40"
            alt={selectedUser?.fullName}
            className='overflow-hidden rounded-full'
            />
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800">{selectedUser.fullName}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              📞
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              🎥
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              ⚙️
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Add messages dynamically */}
          <div className="flex items-start">
          <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
          j
          </div>
          <div className="ml-3 p-3 bg-gray-200 rounded-lg">
          <p className="text-sm text-gray-800">Hi! How are you doing?</p>
          </div>
          </div>
          <div className="flex items-end justify-end">
          <div className="mr-3 mt-2 p-3 bg-blue-500 text-white rounded-lg">
            <p className="text-sm">I'm doing well, thank you! 😊</p>
          </div>
        </div> 
        </div>

        {/* Message Input */}
        <MessageInput/>

      </div>
  )
}

export default Chat