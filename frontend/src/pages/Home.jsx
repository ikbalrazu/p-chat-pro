import React,{useState} from 'react'
import Side from '../components/Side'
import Conversation from '../components/conversation/Conversation';
import { useAuthStore } from '../store/useAuthStore';
import UserProfile from '../components/profile/UserProfile';
import { useUserStore } from '../store/useUserStore';
import MobileFooter from '../components/MobileFooter';
import DesktopSidebar from '../components/DesktopSidebar';

const Home = () => {
    const {userProfileShow} = useUserStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Side/>
      {/* <DesktopSidebar/>
      <MobileFooter/> */}

      {/* Conversation List */}
       {userProfileShow ? <UserProfile/> : <Conversation/>}
        
      

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
              J
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800">Jane Doe</p>
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
        <div className="p-4 bg-white border-t border-gray-300 flex items-center">
          <button className="p-2 hover:bg-gray-200 rounded-full">+</button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 mx-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            ➤
          </button>
        </div>
      </div>

    </div>

//     <div className="flex h-screen bg-gray-100">
//     {/* Mobile Sidebar Overlay */}
//     {isSidebarOpen && (
//       <div
//         className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
//         onClick={() => setIsSidebarOpen(false)}
//       ></div>
//     )}
//     <aside
//       className={`fixed z-20 top-0 left-0 h-full w-64 bg-white border-r border-gray-300 transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } transition-transform md:relative md:translate-x-0 md:w-64`}
//     >
//       <div className="p-4 border-b border-gray-300 flex items-center justify-between">
//         <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
//         <button
//           className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         >
//           ✕
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <input
//           type="text"
//           placeholder="Search friends or groups"
//           className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
//         />
//       </div>

//       {/* Friends and Groups */}
//       <ul className="flex-1 overflow-y-auto">
//         {/* Individual Chat */}
//         <li className="p-4 flex items-center hover:bg-gray-200 cursor-pointer">
//           <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
//             J
//           </div>
//           <div className="ml-3">
//             <p className="font-medium text-gray-800">Jane Doe</p>
//             <p className="text-sm text-gray-500">Start the conversation!</p>
//           </div>
//         </li>

//         {/* Group Chat */}
//         <li className="p-4 flex items-center hover:bg-gray-200 cursor-pointer">
//           <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
//             G
//           </div>
//           <div className="ml-3">
//             <p className="font-medium text-gray-800">Study Group</p>
//             <p className="text-sm text-gray-500">"Don't forget to review..."</p>
//           </div>
//         </li>
//       </ul>
//     </aside>

//     {/* Chat Window */}
//     <div className="flex-1 flex flex-col">
//       {/* Header */}
//       <div className="p-4 bg-white border-b border-gray-300 flex items-center justify-between">
//         <div className="flex items-center">
//           <button
//             className="p-2 hover:bg-gray-200 rounded-full md:hidden"
//             onClick={() => setIsSidebarOpen(true)}
//           >
//             ☰
//           </button>
//           <div className="ml-3 flex items-center">
//             <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
//               J
//             </div>
//             <div className="ml-3">
//               <p className="font-medium text-gray-800">Jane Doe</p>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           <button className="p-2 hover:bg-gray-200 rounded-full">📞</button>
//           <button className="p-2 hover:bg-gray-200 rounded-full">🎥</button>
//           <button
//             className="relative p-2 hover:bg-gray-200 rounded-full"
//             onClick={toggleProfileMenu}
//           >
//             👤
//             {isProfileMenuOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
//                 <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
//                   View Profile
//                 </button>
//                 <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
//                   Settings
//                 </button>
//                 <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100">
//                   Logout
//                 </button>
//               </div>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 p-4 overflow-y-auto space-y-4">
//         <div className="flex items-start">
//           <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
//             J
//           </div>
//           <div className="ml-3 p-3 bg-gray-200 rounded-lg">
//             <p className="text-sm text-gray-800">Hi! How are you doing?</p>
//           </div>
//         </div>
//         <div className="flex items-end justify-end">
//           <div className="mr-3 p-3 bg-blue-500 text-white rounded-lg">
//             <p className="text-sm">I'm doing well, thank you! 😊</p>
//           </div>
//         </div>
//       </div>

//       {/* Message Input */}
//       <div className="p-4 bg-white border-t border-gray-300 flex items-center">
//         <button className="p-2 hover:bg-gray-200 rounded-full">+</button>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="flex-1 mx-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
//         />
//         <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
//           ➤
//         </button>
//       </div>
//     </div>
//   </div>
  )
}

export default Home