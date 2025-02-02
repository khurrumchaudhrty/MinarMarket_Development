
"use client";

import { SidebarNav } from '@/components/sidebar-nav';
import { useState, useEffect } from "react";
import { Header } from '@/components/header';
import { getUserDetails } from "@/lib/SessionManager"; // Fetch logged-in user info

export default function MessageChat() {
    const [messages, setMessages] = useState([]);
    const [sellerId, setSellerId] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const user = await getUserDetails(); // Get logged-in seller details
                if (!user || !user.userId) return;
                
                setSellerId(user.id);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message-from-buyers/${user.userId}`);
                if (!response.ok) throw new Error("Failed to fetch messages");

                const data = await response.json();
                setMessages(data.messages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="flex min-h-screen flex-col px-4">
            {/* Header */}
            <Header />

            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
                {/* Sidebar */}
                <SidebarNav />

                {/* Main Content */}
                <main>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center text-center">
                                <h2 className="text-lg font-semibold">{msg.product}</h2>
                                <p className="text-gray-700">{msg.name}</p>
                                <p className="text-gray-500 text-sm">{msg.email}</p>
                                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                                    Contact Buyer
                                </button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
