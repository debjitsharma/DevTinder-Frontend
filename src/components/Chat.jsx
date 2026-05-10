import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";

export const Chat = () => {
  const { targetUserId } = useParams();           // from URL: /chat/:targetUserId
  const loggedInUser = useSelector((store) => store.user);
  const loggedInUserId=loggedInUser?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(()=>{
    const socket= createSocketConnection();
    socket.emit("joinChat",{loggedInUserId,targetUserId})
    return ()=> socket.disconnect();
  },[loggedInUserId, targetUserId])

  // TODO: Later you can fetch real chat history here
  // useEffect(() => {
  //   const fetchMessages = async () => { ... };
  //   fetchMessages();
  // }, [targetUserId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    // Optimistic UI (shows instantly)
    const optimisticMessage = {
      _id: Date.now().toString(),
      senderId: loggedInUser?._id,
      text: newMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage("");

    // TODO: Call your backend when you add the chat API
    // try {
    //   await axios.post(`${BASE_URL}/chat/send/${targetUserId}`, 
    //     { text: newMessage }, 
    //     { withCredentials: true }
    //   );
    // } catch (err) {
    //   console.error("Failed to send message", err);
    // }
  };

  return (
    <div className="h-screen bg-[#0d1117] flex flex-col text-white">
      {/* HEADER - matches your Navbar style */}
      <div className="bg-[#161b22] border-b border-[#30363d] px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link
          to="/connections"
          className="text-[#8b949e] hover:text-white text-2xl transition-colors"
        >
          ←
        </Link>

        {/* Other user's avatar + name */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#39d353]/30">
              <img
                src="https://picsum.photos/id/64/200/200"   
                alt="User"
                className="w-full h-full object-cover"/>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Alex Chen</h2>   {/* replace with dynamic name */}
            <p className="text-[#39d353] text-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-[#39d353] rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        <div className="flex-1"></div>

        <button className="text-[#8b949e] hover:text-white text-3xl leading-none transition-colors">
          ⋮
        </button>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0d1117]">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-[#161b22] rounded-3xl flex items-center justify-center text-5xl mb-6">
              💬
            </div>
            <p className="text-[#8b949e] text-lg">No messages yet</p>
            <p className="text-[#8b949e]">Say hi to start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.senderId === loggedInUser?._id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-5 py-3 rounded-3xl ${
                  msg.senderId === loggedInUser?._id
                    ? "bg-[#39d353] text-[#0d1117] rounded-tr-none"
                    : "bg-[#21262d] text-white rounded-tl-none"
                }`}
              >
                <p className="text-[15px] leading-relaxed">{msg.text}</p>
                <p className="text-[10px] mt-1 opacity-70 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BAR */}
      <div className="bg-[#161b22] border-t border-[#30363d] p-4">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-[#21262d] border border-[#30363d] focus:border-[#39d353] 
                       rounded-3xl px-6 py-4 text-white placeholder-[#8b949e] outline-none 
                       transition-all text-[15px]"
          />

          <button
            onClick={sendMessage}
            className="w-14 h-14 bg-[#39d353] hover:bg-[#2ea44f] active:scale-95 
                       transition-all text-[#0d1117] rounded-3xl flex items-center 
                       justify-center text-3xl shadow-md"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
};