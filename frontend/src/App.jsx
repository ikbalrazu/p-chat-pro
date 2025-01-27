import React, { useEffect } from 'react';
import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ForgotPassword from './components/forgotpassword/ForgotPassword';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, friendList, onlineUsers} = useAuthStore();
  
  console.log(isCheckingAuth);

  useEffect(()=>{
    // async function checkAuthUser() {
    //   await checkAuth();
    // }
    
    // console.log(authUser);
    // if(authUser){
    //   console.log("authenticated user");
    // }else{
    //   console.log("not authenticated user");
    // }
    // checkAuthUser();
    checkAuth(); 
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
      <Route path='/forgotpassword' element={!authUser ? <ForgotPassword/> : <Navigate to="/" />}/>
      {/* <Route path='/conversation' element={authUser ? <Conversation/> : <Navigate to="/login" />}/>
      <Route path='/settings' element={authUser ? <SettingsPage/> : <Navigate to="/login"/>}/>
      <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/> */}
      </Routes>

      

      <Toaster
      position="top-center"
      reverseOrder={false} 
      />
      {/* <Outlet/> */}
    </div>
  )
}

export default App