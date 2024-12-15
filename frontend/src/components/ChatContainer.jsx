import React from "react";

const ChatContainer = () => {
  return (
    <div className="flex-grow bg-gray-50 flex flex-col">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h2 className="font-bold">Chat with Alice</h2>
        <div className="flex space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <i className="fas fa-phone"></i>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <i className="fas fa-video"></i>
          </button>
        </div>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <p className="bg-green-200 p-3 rounded-lg mb-3">Hello!</p>
        <p className="bg-white p-3 rounded-lg shadow mb-3">Hi, how are you?</p>
      </div>
      <div className="p-4 bg-white flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow p-2 rounded-lg border"
        />
        <button className="ml-2 p-2 bg-green-500 text-white rounded-lg">
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
