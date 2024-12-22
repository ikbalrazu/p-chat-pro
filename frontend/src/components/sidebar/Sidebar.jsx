import React, {useState} from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import Avatar from '../Avatar';
import { useAuthStore } from '../../store/useAuthStore';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import Conversation from '../conversation/Conversation';
import { useUserStore } from '../../store/useUserStore';

const Sidebar = () => {
    const {authUser} = useAuthStore();
    const [editUserOpen,setEditUserOpen] = useState(false)
    const [openSearchUser,setOpenSearchUser] = useState(false)
    const {setUserProfileShow} = useUserStore();
    console.log(authUser);
  return (
    <div className="
    hidden 
    bg-white 
    dark:bg-gray-900 
    dark:text-white 
    border-r 
    border-gray-300
    md:w-20 
    md:flex
    lg:flex 
    md:flex-col
    lg:flex-col 
    items-center 
    py-4
    ">
      <NavLink 
        className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200`}
        onClick={() => setUserProfileShow(false)}
        title='Conversation'
        >
            <IoChatbubbleEllipses
            size={20}
            />
        </NavLink>

        <div title='Add Friend' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
            <FaUserPlus size={20}/>
            {/* <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Popup"
            >
            <p>This is a sample popup/modal using Tailwind CSS and React!</p>
            </Modal> */}
        </div>

        <div className="mt-auto mb-4">
          <NavLink 
          className={({isActive})=>`w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center`} 
          onClick={()=>setUserProfileShow(true)}
          >
                <Avatar
                    width={40}
                    height={40}
                    name={authUser?.fullName}
                    imageUrl={authUser?.profilePic}
                    userId={authUser?._id}
                />
            </NavLink>
        </div>

        <button title='Logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
        <span className='-ml-2'>
            <BiLogOut size={20}/>
        </span>
        </button>
      <ThemeToggle/>
    </div>
  )
}

export default Sidebar