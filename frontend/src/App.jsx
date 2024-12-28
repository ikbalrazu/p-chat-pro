import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Home from './pages/Home';
import FindFriends from './components/FindFriends';
import Conversation from './components/conversation/Conversation';
import { useUserStore } from './store/useUserStore';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, friendList} = useAuthStore();
  

  useEffect(()=>{
    checkAuth();
    console.log(authUser);
  },[checkAuth]);

  if (isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
    

  return (
    <div>

      {/* <Navbar/> */}

      <Routes>
      <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
      <Route path='/signup' element={!authUser ? <SignUp/> : <Navigate to="/" />}/>
      <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/" />}/>
      <Route path='/conversation' element={authUser ? <Conversation/> : <Navigate to="/login" />}/>
      <Route path='/settings' element={authUser ? <SettingsPage/> : <Navigate to="/login"/>}/>
      <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>

      

      <Toaster
      position="top-center"
      reverseOrder={false} 
      />
      <Outlet/>
    </div>
  )
}

export default App