import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

const ChatContainer = () => {
  const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();

  useEffect(()=>{
    getMessages(selectedUser?._id);
  },[selectedUser?._id, getMessages]);

  return (
    <div className="flex-grow bg-gray-50 flex flex-col">
      {/* chatheader */}
      {/* messages */}
      {/* message input */}
    </div>
  );
};

export default ChatContainer;
