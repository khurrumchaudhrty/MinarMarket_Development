'use client'

import { getUserDetails } from "@/lib/SessionManager";

async function sendBuyerMessage(userId, productId) {
  if (!userId) {
    alert("Please log in to contact the seller.");
    return;
  }

  const payload = {
    id_of_buyer: userId,
    id_of_product: productId,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buyer-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Message sent to the seller successfully!");
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to contact the seller. Please try again.");
  }
}

export default function ContactSellerButton({ productId }) {
  return (
    <button
      onClick={() => {
        const user = getUserDetails();
        sendBuyerMessage(user?.userId, productId);
      }}
      className="w-full bg-black text-white py-3 rounded-md hover:bg-black/90 transition-colors"
    >
      Contact the Seller
    </button>
  );
}

