import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/sidebar/Sidebar';
import Chat from '../components/chat/Chat';
import Conversation from '../components/conversation/Conversation';
import UserProfile from '../components/profile/UserProfile';
import { useChatStore } from '../store/useChatStore';
import NotSelectedUser from '../components/conversation/NotSelectedUser';
import { useUtilityStore } from '../store/useUtilityStore';
import AddFriend from '../components/findfriend/AddFriend';

const HomePage = () => {
  const {checkAuth, authUser, onlineUsers} = useAuthStore();
  const {selectedUser} = useChatStore();
  const {currentPage} = useUtilityStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      <div className="hidden md:block h-screen w-80 bg-white dark:bg-gray-800  border-r border-gray-300 flex flex-col">
      {currentPage === 'conversation' && <Conversation />}
      {currentPage === 'profile' && <UserProfile />}
      {currentPage === 'addfriend' && <AddFriend />}
      </div>
      {/* <div className="block md:hidden w-full h-full">
      {currentPage === 'conversation' && <Conversation />}
      {currentPage === 'profile' && <UserProfile />}
      {currentPage === 'addfriend' && <AddFriend />}
      </div> */}
      {/* <Conversation/> */}
      {!selectedUser ? <NotSelectedUser/> : <Chat/>}
      {/* <ChatContainer/> */}
    </div>
  )
}

export default HomePage