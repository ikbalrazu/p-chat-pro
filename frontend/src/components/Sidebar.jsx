import React, {useState} from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import Avatar from './Avatar';
import { useAuthStore } from '../store/useAuthStore';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const {authUser} = useAuthStore();
    const [editUserOpen,setEditUserOpen] = useState(false)
    const [openSearchUser,setOpenSearchUser] = useState(false)
    console.log(authUser);
  return (
    <div className='w-full h-full'>
    
    <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
    
    <NavLink className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200'>
        <IoChatbubbleEllipses
        size={20}
        />
    </NavLink>

    
    <div title='Add Friend' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
        <FaUserPlus size={20}/>
    </div>

    <button className='mx-auto' title={authUser?.fullName} onClick={()=>setEditUserOpen(true)}>
    avatar
    </button>

    <button title='Logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
    <span className='-ml-2'>
    <BiLogOut size={20}/>
    </span>
    </button>

    </div>

    {/* <div className='flex flex-col items-center'>
    <button className='mx-auto' title={authUser?.fullName} onClick={()=>setEditUserOpen(true)}>
    avatar
    </button>
    <button title='Logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
    <span className='-ml-2'>
    <BiLogOut size={20}/>
    </span>
    </button>
    </div> */}

    

        {/* <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
        <div>
        <NavLink className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-200"}`} title='chat'>
            <IoChatbubbleEllipses
                size={20}
            />
        </NavLink>

        <div title='add friend' onClick={()=>setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' >
            <FaUserPlus size={20}/>
            </div>
        </div>

        <div className='flex flex-col items-center'>
                    <button className='mx-auto' title={authUser?.name} onClick={()=>setEditUserOpen(true)}>
                        <Avatar
                            width={40}
                            height={40}
                            name={authUser?.name}
                            // imageUrl={user?.profile_pic}
                            userId={authUser?._id}
                        />
                    </button>
                    <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' onClick={handleLogout}>
                        <span className='-ml-2'>
                            <BiLogOut size={20}/>
                        </span>
                    </button>
                </div>

        </div> */}
    </div>
  )
}

export default Sidebar