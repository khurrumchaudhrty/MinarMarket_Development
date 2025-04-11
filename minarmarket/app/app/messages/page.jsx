"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios"; // We will need axios for API calls
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MoreHorizontal } from "lucide-react";
import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import { getUserDetails } from "@/lib/SessionManager";

let socket;

export default function MessagingPage() {
  const [myId, setMyId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatConnection, setChatConnection] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(""); // Current logged-in user's id

  useEffect(() => {
    const initialize = async () => {
      const user = await getUserDetails();
      if (!user || !user.userId) return;

      setMyId(user.userId);

      // Connect to socket server
      socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000");

      socket.on("connect", () => {
        console.log("Connected to Socket.IO server", socket.id);
        setCurrentUserId(socket.id);
      });

      socket.on("receive_message", (data) => {
        // Handle receiving message
      });

      // Fetch chat connections
      fetchChatConnections(user.userId);
    };

    initialize();

    // Clean up socket when component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, []);


  const fetchChatConnections = async (userId) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/getChatConnections`,
        {
          myId: userId,
        }
      );
      setChatConnection(response.data.chatConnections);
    } catch (error) {
      console.error("Error fetching chat connections", error);
    }
  };

  const fetchMessages = async (receiverId) => {
    
    console.log(myId, receiverId);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat/fetchChatMessages`, 
        {
          userId1: myId,
          userId2: receiverId,
        },
      );
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };


  const handleSendMessage = () => {

    if (!message.trim() || !selectedUser || !myId) return;
    const payload = {
      senderId: myId,
      receiverId: selectedUser.id, // assuming selectedUser has an _id field
      message,
    };

    console.log("payload: ", payload);
    
    socket.emit("sendMessage", payload); // 🔥 this sends it to backend
    
    // Optionally: update local UI immediately (optimistic update)
    setMessages(prev => [...prev, { ...payload, timestamp: new Date() }]);
    setMessage(""); // clear input
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    // console.log("selelel", user);
    fetchMessages(user.id);
  };


  return (
    <div className="flex min-h-screen flex-col px-4">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
        <SidebarNav />

        <div className="flex h-screen bg-white">
          {/* Left sidebar with users */}
          <div className="w-full md:w-[300px] border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h1 className="text-xl font-semibold">Users</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-5 w-5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chatConnection.map((user, index) => (
                <div
                  key={user._id || index}
                  onClick={() => handleUserClick(user)}
                  className={`p-4 hover:bg-gray-100 cursor-pointer ${selectedUser?._id === user._id ? "bg-gray-200" : ""}`}
                >
                  {user.name}
                </div>
              ))}
            </div>
          </div>

          {/* Right side chat window */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 ${msg.senderId === currentUserId ? "text-right" : "text-left"
                    }`}
                >
                  <span className="inline-block bg-blue-100 px-3 py-2 rounded-lg">
                    {msg.message}
                  </span>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <div className="p-4 border-t flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
