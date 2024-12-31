import React, { useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import { useChatStore } from '../../store/useChatStore';
import MessageInput from './MessageInput';
import { useUtilityStore } from '../../store/useUtilityStore';
import { useAuthStore } from '../../store/useAuthStore';
import ChatHeader from './ChatHeader';
import { formatMessageTime } from '../../lib/utils';

const Chat = () => {
  const { selectedUser, getMessages, SubscribeToMessages, messages } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const navigate = useUtilityStore((state) => state.navigate);
  // console.log(selectedUser);

  useEffect(() => {
    getMessages(selectedUser._id);
    SubscribeToMessages();
  }, []);
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Window */}
      {/* Header */}
      <ChatHeader />

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Add messages dynamically */}
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
          >
            <div className='flex items-start'>
            <div className="size-10 rounded-full border">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
            
          </div>
        ))}
        {/* <div className="flex items-start">
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
        </div>  */}
      </div>

      {/* Message Input */}
      <MessageInput />

    </div>
  )
}

export default Chat