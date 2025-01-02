import React, { useEffect, useRef } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import { useChatStore } from '../../store/useChatStore';
import MessageInput from './MessageInput';
import { useUtilityStore } from '../../store/useUtilityStore';
import { useAuthStore } from '../../store/useAuthStore';
import ChatHeader from './ChatHeader';
import { formatMessageTime } from '../../lib/utils';
import TimeAgo from 'javascript-time-ago';
import en from "javascript-time-ago/locale/en.json";

const makeTextClickable = (text) => {
  const urlRegex = /(\bhttps?:\/\/[^\s]+)/gi;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#171563] hover:underline">${url}</a>`;
  });
};

const Chat = () => {
  const { selectedUser, getMessages, SubscribeToMessages, messages, unsubscribeFromMessages } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const navigate = useUtilityStore((state) => state.navigate);
  const messageEndRef = useRef(null);
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo('en-US')

  console.log(messages);

  useEffect(() => {
    getMessages(selectedUser._id);
    SubscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [getMessages,selectedUser._id,SubscribeToMessages, unsubscribeFromMessages]);

  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  },[messages]);
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
            ref = {messageEndRef}
          >
            {/* profile picture */}
            {message.senderId !== authUser._id && (
              <div className="w-10 h-10 flex-shrink-0 mr-2">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            )}

            {/* chat bubble */}
            <div
              className={`max-w-[80%] flex flex-col mb-4 ${
                message.senderId === authUser._id ? "items-end" : "items-start"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="max-w-full rounded-md mb-0.5"
                />
              )}
              {message.text && (
                <p
                  className={`max-w-md md:max-w-2xl px-4 py-2 rounded-lg text-sm break-words ${
                    message.senderId === authUser._id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: makeTextClickable(message.text),
                  }}
                >
                  {/* {message.text} */}
                </p>
              )}

              <time
                className={`text-xs mt-1 ${
                  message.senderId === authUser._id ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {timeAgo.format(new Date(message.createdAt), "twitter")}
              </time>
            </div>

            {/* <div className='flex items-start'>
            <div className="size-8 rounded-full border">
              <img
                className='rounded-full'
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
            </div> */}

            
            
            {/* <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div> */}

            {/* <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {timeAgo.format(new Date(message.createdAt),"twitter")}
              </time>
            </div> */}
            
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