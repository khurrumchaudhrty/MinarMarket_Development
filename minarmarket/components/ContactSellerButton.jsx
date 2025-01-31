// 'use client'

// import { getUserDetails } from "@/lib/SessionManager";

// async function sendBuyerMessage(userId, productId) {
//   if (!userId) {
//     alert("Please log in to contact the seller.");
//     return;
//   }

//   const payload = {
//     id_of_buyer: userId,
//     id_of_product: productId,
//   };

//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buyer-messages`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const result = await response.json();
//     if (response.ok) {
//       alert("Message sent to the seller successfully!");
//     } else {
//       alert(`Error: ${result.message}`);
//     }
//   } catch (error) {
//     console.error("Error sending message:", error);
//     alert("Failed to contact the seller. Please try again.");
//   }
// }

// export default function ContactSellerButton({ productId }) {
//   return (
//     <button
//       onClick={() => {
//         const user = getUserDetails();
//         sendBuyerMessage(user?.userId, productId);
//       }}
//       className="w-full bg-black text-white py-3 rounded-md hover:bg-black/90 transition-colors"
//     >
//       Contact the Seller
//     </button>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { getUserDetails } from "@/lib/SessionManager";

async function sendBuyerMessage(userId, productId, setSent) {
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
      setSent(true); // Update state to indicate the message has been sent
      localStorage.setItem(`messageSent_${productId}`, 'true'); // Save to local storage
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to contact the seller. Please try again.");
  }
}

export default function ContactSellerButton({ productId }) {
  const [sent, setSent] = useState(false); // State to track if the message has been sent

  // Check local storage on mount to see if the message was already sent
  useEffect(() => {
    const messageSent = localStorage.getItem(`messageSent_${productId}`);
    if (messageSent === 'true') {
      setSent(true); // Set state to true if the message was already sent
    }
  }, [productId]);

  const handleClick = () => {
    const user = getUserDetails();
    sendBuyerMessage(user?.userId, productId, setSent);
  };

  return (
    <button
      onClick={sent ? null : handleClick} // Disable click if message is sent
      className={`w-full py-3 rounded-md transition-colors ${sent ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-black/90'}`}
      disabled={sent} // Disable the button if message is sent
    >
      {sent ? "Sent" : "Contact the Seller"}
    </button>
  );
}
