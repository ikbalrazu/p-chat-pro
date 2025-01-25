import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import { useChatStore } from '../../store/useChatStore';
import MessageInput from './MessageInput';
import { useUtilityStore } from '../../store/useUtilityStore';
import { useAuthStore } from '../../store/useAuthStore';
import ChatHeader from './ChatHeader';
import { formatMessageTime } from '../../lib/utils';
import TimeAgo from 'javascript-time-ago';
import en from "javascript-time-ago/locale/en.json";
import Avatar from '../Avatar';

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
  const chatContainerRef = useRef(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo('en-US')

  console.log(messages);

  useEffect(() => {
    getMessages(selectedUser._id);
    SubscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [getMessages, selectedUser._id, SubscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Scroll event to toggle the scroll-to-bottom button
  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const isAtBottom =
        chatContainer.scrollHeight - chatContainer.scrollTop <=
        chatContainer.clientHeight + 100; // 100px tolerance
      console.log(isAtBottom);  
      setShowScrollToBottom(!isAtBottom);
    }
  };

  // Scroll to the bottom
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
    className="
    // flex-1 
    flex 
    flex-col
    h-full
    relative
    ">
      {/* Chat Window */}
      {/* Header */}
      <ChatHeader />

      {/* Chat Messages */}
      <div
      ref={chatContainerRef}
      onScroll={handleScroll} 
      className="flex-1 p-4 overflow-y-auto relative"
      >
        {/* Add messages dynamically */}
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            
            
          >
            {/* profile picture */}
            {message.senderId !== authUser._id && (
              <div className="w-8 h-8 flex-shrink-0 mr-2 border rounded-full">
                {/* <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                /> */}
                <Avatar
                  width={32}
                  height={32}
                  fontSize={15}
                  name={selectedUser?.fullName}
                  imageUrl={selectedUser?.profilePic}
                  userId={authUser?._id}
                />
              </div>
            )}

            {/* chat bubble */}
            <div
              className={`max-w-[80%] flex flex-col mb-4 ${message.senderId === authUser._id ? "items-end" : "items-start"
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
                  className={`max-w-md md:max-w-2xl px-4 py-2 rounded-lg text-sm break-words ${message.senderId === authUser._id
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
                className={`text-xs mt-1 ${message.senderId === authUser._id ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                {timeAgo.format(new Date(message.createdAt), "twitter")}
              </time>
            </div>

          </div>
        ))}
      
      <div ref={messageEndRef}></div>
      </div>

      {/* Scroll-to-Bottom Button */}
      {showScrollToBottom && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-[80px] left-1/2 transform -translate-x-1/2 bg-gray-500 text-white p-3 rounded-full shadow-md hover:bg-gray-600 z-10"
          title="Scroll to last message"
        >
          <IoIosArrowDown size={20} />
        </button>
      )}

      {/* Message Input */}
      <MessageInput />

    </div>
  )
}

export default Chat