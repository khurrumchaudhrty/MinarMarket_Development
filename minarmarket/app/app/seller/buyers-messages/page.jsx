"use client";

import { Header } from '@/components/header';
import { SidebarNav } from '@/components/sidebar-nav';
import { useState, useEffect } from "react";

export default function MessageChat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            { id: 1, product: "MacBook Pro", name: "John Doe", email: "john@example.com" },
            { id: 2, product: "iPhone 15", name: "Jane Smith", email: "jane@example.com" },
            { id: 3, product: "Samsung TV", name: "Alice Brown", email: "alice@example.com" },
            { id: 4, product: "Sony PlayStation 5", name: "Bob Martin", email: "bob@example.com" },
            { id: 5, product: "Nike Shoes", name: "Charlie Adams", email: "charlie@example.com" },
            { id: 6, product: "Dell Monitor", name: "Emma Wilson", email: "emma@example.com" },
        ]);
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
                                    Contact Seller
                                </button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
