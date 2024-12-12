import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import SettingsPage from '../pages/SettingsPage';

const Navbar = () => {
    const {authUser} = useAuthStore();
  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80">
    <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                {/* <MessageSquare className="w-5 h-5 text-primary" /> */}
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
        </div>

        <div className="flex items-center gap-2">
        <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              {/* <SettingsPage className="w-4 h-4" /> */}
              <span className="hidden w-4 h-4 sm:inline">Settings</span>
    </Link>
    </div>

    </div>

    {/* <Outlet/> */}
    </header>
  )
}

export default Navbar