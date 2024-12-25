import React from 'react'

const ProfilePage = () => {
  return (
    <div className="hidden md:block w-80 bg-white border-r border-gray-300 flex flex-col">
    <div className="p-4 border-b border-gray-300 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
        +
        </button>
    </div>
    <ul className="flex-1 overflow-y-auto">
    <li className="p-4 flex items-center hover:bg-gray-200 cursor-pointer">
      <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
        J
      </div>
      <div className="ml-3">
        <p className="font-medium text-gray-800">Jane Doe</p>
        <p className="text-sm text-gray-500">Start the conversation!</p>
      </div>
    </li>
  </ul>
  </div>
  )
}

export default ProfilePage