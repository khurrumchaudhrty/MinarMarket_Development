
"use client"

import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, MoreHorizontal, Send, MessageSquare, ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { getUserDetails } from "@/lib/SessionManager"

// Simple Avatar components that don't rely on Radix UI
const Avatar = ({ className, children, ...props }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className || ""}`} {...props}>
    {children}
  </div>
)

const AvatarFallback = ({ className, children, ...props }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full ${className || ""}`} {...props}>
    {children}
  </div>
)

let socket

export default function MessagingPage() {
  const [myId, setMyId] = useState(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [chatConnection, setChatConnection] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentUserId, setCurrentUserId] = useState("") // Current logged-in user's id
  const messagesEndRef = useRef(null)

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const initialize = async () => {
      const user = await getUserDetails()
      if (!user || !user.userId) return

      setMyId(user.userId)

      // Connect to socket server
      socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000")

      socket.on("connect", () => {
        console.log("Connected to Socket.IO server", socket.id)
        setCurrentUserId(user.userId)

        socket.emit("join", user.userId)
      })

      // Fetch chat connections
      fetchChatConnections(user.userId)
    }

    initialize()

    return () => {
      if (socket) {
        socket.disconnect()
        console.log("Socket disconnected")
      }
    }
  }, [])

  useEffect(() => {
    if (!socket) return

    const handleReceiveMessage = (data) => {
      setMessages((prev) => {
        const updated = [...prev, data]

        // Same deduplication logic can go here if needed
        const unique = []
        const seen = new Set()
        for (const msg of updated) {
          const key = msg._id || `${msg.senderId}-${msg.receiverId}-${msg.message}-${msg.createdAt}`
          if (!seen.has(key)) {
            seen.add(key)
            unique.push(msg)
          }
        }

        return unique.sort((a, b) => new Date(a.timestamp || a.createdAt) - new Date(b.timestamp || b.createdAt))
      })
    }

    socket.on("receive_message", handleReceiveMessage)

    return () => {
      socket.off("receive_message", handleReceiveMessage)
    }
  }, [selectedUser])

  const fetchChatConnections = async (userId) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat/getChatConnections`, {
        myId: userId,
      })
      setChatConnection(response.data.chatConnections)
    } catch (error) {
      console.error("Error fetching chat connections", error)
    }
  }

  const fetchMessages = async (receiverId) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat/fetchChatMessages`, {
        userId1: myId,
        userId2: receiverId,
      })

      const fetchedMessages = response.data.messages || []

      // Combine existing real-time messages with fetched messages, and remove duplicates
      setMessages((prevMessages) => {
        const combined = [...prevMessages, ...fetchedMessages]

        // Remove duplicates based on _id or a unique combination
        const uniqueMessages = []
        const seen = new Set()

        for (const msg of combined) {
          const uniqueKey = msg._id || `${msg.senderId}-${msg.receiverId}-${msg.message}-${msg.createdAt}`
          if (!seen.has(uniqueKey)) {
            seen.add(uniqueKey)
            uniqueMessages.push(msg)
          }
        }

        return uniqueMessages.sort(
          (a, b) => new Date(a.timestamp || a.createdAt) - new Date(b.timestamp || b.createdAt),
        )
      })
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }

  const handleSendMessage = () => {
    if (!message.trim() || !selectedUser || !myId) return
    const payload = {
      senderId: myId,
      receiverId: selectedUser.id, // assuming selectedUser has an _id field
      message,
    }

    console.log("payload: ", payload)

    socket.emit("sendMessage", payload) // this sends it to backend

    setMessages((prev) => {
      const updated = [...prev, { ...payload, timestamp: new Date() }]
      return updated.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    })
    setMessage("") // clear input
  }

  const handleUserClick = async (user) => {
    await fetchMessages(user.id)
    setSelectedUser(user)
  }

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "?"
    return name.split(" ")[0][0].toUpperCase()
  }

  // Generate a consistent color based on name
  const getAvatarColor = (name) => {
    if (!name) return "bg-gray-400"

    const colors = [
      "bg-rose-500",
      "bg-pink-500",
      "bg-fuchsia-500",
      "bg-purple-500",
      "bg-violet-500",
      "bg-indigo-500",
      "bg-blue-500",
      "bg-sky-500",
      "bg-cyan-500",
      "bg-teal-500",
      "bg-emerald-500",
      "bg-green-500",
      "bg-lime-500",
      "bg-yellow-500",
      "bg-amber-500",
      "bg-orange-500",
      "bg-red-500",
    ]

    // Simple hash function to get consistent color
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* Fixed height header */}
      <div className="h-16">
        <Header />
      </div>

      {/* Main content area that takes remaining height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:block w-[220px] border-r border-gray-200">
          <SidebarNav />
        </div>

        {/* Chat container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar with users */}
          <div className="w-[280px] border-r border-gray-200 flex flex-col bg-gray-50">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm">
              <h1 className="text-xl font-semibold">Users</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                  <Plus className="h-5 w-5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chatConnection.map((user, index) => (
                <div
                  key={user._id || index}
                  onClick={() => handleUserClick(user)}
                  className={`p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3 transition-colors ${
                    selectedUser?.id === user.id ? "bg-gray-200" : ""
                  }`}
                >
                  <Avatar className={`h-10 w-10 ${getAvatarColor(user.name)}`}>
                    <AvatarFallback className="text-white font-medium">{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side chat window */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {selectedUser ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b border-gray-200 flex items-center gap-3 bg-white shadow-sm">
                  <Avatar className={`h-10 w-10 ${getAvatarColor(selectedUser.name)}`}>
                    <AvatarFallback className="text-white font-medium">{getInitials(selectedUser.name)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{selectedUser.name}</span>
                </div>

                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-4 flex ${msg.senderId === myId ? "justify-end" : "justify-start"}`}>
                      {msg.senderId !== myId && (
                        <Avatar className={`h-8 w-8 mr-2 mt-1 ${getAvatarColor(selectedUser.name)}`}>
                          <AvatarFallback className="text-white text-xs font-medium">
                            {getInitials(selectedUser.name)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-4 py-2 rounded-2xl max-w-xs shadow-sm ${
                          msg.senderId === myId
                            ? "bg-purple-500 text-white rounded-tr-none"
                            : "bg-white rounded-tl-none"
                        }`}
                      >
                        <div className="break-words">{msg.message}</div>
                        <div
                          className={`text-xs mt-1 text-right ${
                            msg.senderId === myId ? "text-purple-100" : "text-gray-500"
                          }`}
                        >
                          {msg.timestamp
                            ? new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* This empty div is used as a reference to scroll to the bottom */}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message input */}
                <div className="p-3 border-t flex gap-2 bg-white">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Type your message..."
                    className="rounded-full bg-gray-100 border-0 focus-visible:ring-purple-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="rounded-full bg-purple-500 hover:bg-purple-600 h-10 w-10 p-0 flex-shrink-0"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center p-8 max-w-md">
                  <div className="mx-auto bg-purple-100 h-24 w-24 rounded-full flex items-center justify-center mb-6">
                    <MessageSquare className="h-12 w-12 text-purple-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Start a conversation</h2>
                  <p className="text-gray-500 text-lg mb-6">Select a user from the list to begin chatting</p>
                  <div className="flex items-center justify-center">
                    <ArrowLeft className="h-5 w-5 text-purple-500 mr-2 animate-pulse" />
                    <span className="text-purple-500 font-medium">Choose a contact</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
