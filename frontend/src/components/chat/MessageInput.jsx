import React, {useState, useRef} from 'react';
import { Image, Send, X } from "lucide-react";
import toast from 'react-hot-toast';
import { useChatStore } from '../../store/useChatStore';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const [error, setError] = useState("");
    const {sendMessage} = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file");
          return;
        }
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
    
        try {
          await sendMessage({
            text: text.trim(),
            image: imagePreview,
          });
    
          // Clear form
          setText("");
          setImagePreview(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          // Reset textarea height
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height to default
          }
        } catch (error) {
          console.error("Failed to send message:", error.message);
        }
    };


  return (
    <div className="p-4 w-full bg-white border-t border-gray-300 flex items-center">
          {/* <button className="p-2 hover:bg-gray-200 rounded-full">+</button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 mx-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
          /> */}
          {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-400
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            <div className="flex-1 flex gap-2">
                {/* <input
                rows="1"
                type='text'
                // className='w-full input input-bordered rounded-lg input-sm sm:input-md'
                className='flex-1 mx-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500'
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                /> */}
                <textarea
                rows="1"
                maxLength="1000"
                className="flex-1 mx-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                  // e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
                  const maxHeight = 150;
                  if (e.target.scrollHeight > maxHeight) {
                    e.target.style.height = `${maxHeight}px`; // Limit height to maxHeight
                    e.target.style.overflowY = "auto"; // Enable scrolling inside textarea
                  } else {
                    e.target.style.height = `${e.target.scrollHeight}px`; // Expand dynamically
                    e.target.style.overflowY = "hidden"; // Remove scrolling when not needed
                  }
                }}
                style={{
                  overflowY: "hidden", // Ensures scrollbars are hidden by default
                }}
                ref={(el) => (textareaRef.current = el)}
              />
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />

            <button
            type="button"
            className={`hidden sm:flex btn btn-circle items-center
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
            >
            <Image size={25} />
          </button>
            </div>
            <button 
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <Send size={22}/>
            </button>
        </form>  
    </div>
  )
}

export default MessageInput