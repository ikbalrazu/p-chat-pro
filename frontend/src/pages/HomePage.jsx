import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/sidebar/Sidebar';
import Chat from '../components/chat/Chat';
import Conversation from '../components/conversation/Conversation';
import UserProfile from '../components/UserProfile';
import { useUserStore } from '../store/useUserStore';
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {
  const location = useLocation();
  const {authUser} = useAuthStore();
  const {userProfileShow} = useUserStore();
  console.log(userProfileShow);
  const basePath = location.pathname === '/'
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      {userProfileShow ? <UserProfile/> : <Conversation/>}
      {/* <Conversation/> */}
      {/* <Chat/> */}
      <ChatContainer/>
    </div>
  )
}

export default HomePage