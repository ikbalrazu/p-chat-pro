import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';

const ChatHeader = () => {
    const {selectedUser} = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="p-2 bg-white border-b border-gray-300 flex items-center justify-between">
            <div className="flex items-center">
                <NavLink
                    onClick={() => navigate('profile')}
                    className='md:hidden lg:hidden xl:hidden 2xl:hidden p-2 mr-1 hover:bg-slate-100'
                >
                    <IoIosArrowBack size={20} />
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
                <div className="ml-3 flex flex-col">
                    <h3 className="font-medium text-gray-800">{selectedUser.fullName}</h3>
                    <p className='text-xs text-base-content/70'>
                    {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p>
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
    )
}

export default ChatHeader