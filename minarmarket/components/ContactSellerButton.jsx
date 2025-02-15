
// "use client";

// import { useEffect, useState } from "react";
// import { getUserDetails } from "@/lib/SessionManager";

// async function checkIfMessageExists(userId, productId) {
//   if (!userId) return false;

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/buyer-messages/check?id_of_buyer=${userId}&id_of_product=${productId}`
//     );

//     const result = await response.json();
//     return result.exists; // Returns true if message exists, false otherwise
//   } catch (error) {
//     console.error("Error checking message:", error);
//     return false;
//   }
// }

// async function sendBuyerMessage(userId, productId, setMessageExists) {
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
//       setMessageExists(true); // Update state to show the message instead of button
//     } else {
//       alert(`Error: ${result.message}`);
//     }
//   } catch (error) {
//     console.error("Error sending message:", error);
//     alert("Failed to contact the seller. Please try again.");
//   }
// }

// export default function ContactSellerButton({ productId }) {
//   const [messageExists, setMessageExists] = useState(false);
//   const [isChecking, setIsChecking] = useState(true); // Add a loading state
//   const user = getUserDetails();

//   useEffect(() => {
//     if (user?.userId) {
//       checkIfMessageExists(user.userId, productId).then((exists) => {
//         setMessageExists(exists);
//         setIsChecking(false); // Mark check as complete
//       });
//     } else {
//       setIsChecking(false); // No user logged in, stop checking
//     }
//   }, [user, productId]);

//   if (isChecking) {
//     return null; // Prevent the flicker issue by showing nothing while loading
//   }

//   return messageExists ? (
//     <p className="text-green-600 font-semibold">The query has been sent to the seller.</p>
//   ) : (
//     <button
//       onClick={() => sendBuyerMessage(user?.userId, productId, setMessageExists)}
//       className="w-full bg-black text-white py-3 rounded-md hover:bg-black/90 transition-colors"
//     >
//       Contact the Seller
//     </button>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { getUserDetails } from "@/lib/SessionManager";

async function checkIfMessageExists(userId, productId) {
  if (!userId) return false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/buyer-messages/check?id_of_buyer=${userId}&id_of_product=${productId}`
    );

    const result = await response.json();
    return result.exists; // Returns true if message exists, false otherwise
  } catch (error) {
    console.error("Error checking message:", error);
    return false;
  }
}

async function sendBuyerMessage(userId, productId, setMessageExists) {
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
      setMessageExists(true); // Update state to show the message instead of button
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to contact the seller. Please try again.");
  }
}

// Report Button Component
function ReportButton({ reporterId, productId, onClose }) {
  const [type, setType] = useState("Product");
  const [complaintType, setComplaintType] = useState("Harassment");
  const [description, setDescription] = useState("");

  async function handleReport() {
    if (!description.trim()) {
      alert("Please enter a complaint description.");
      return;
    }

    const payload = {
      reporterId,
      type,
      sentId: productId, // Sending productId as sentId
      complaintType,
      description,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/register-complaint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Complaint submitted successfully!");
        onClose();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Report Seller</h2>

        {/* Product or Service Selection */}
        <label className="block mb-2 font-medium">Product or Service?</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded-md">
          <option value="Product">Product</option>
          <option value="Service">Service</option>
        </select>

        {/* Complaint Type Selection */}
        <label className="block mt-4 mb-2 font-medium">Complaint Type</label>
        <select value={complaintType} onChange={(e) => setComplaintType(e.target.value)} className="w-full p-2 border rounded-md">
          <option value="Harassment">Harassment</option>
          <option value="Fraud">Fraud</option>
          <option value="Spam">Spam</option>
          <option value="Other">Other</option>
        </select>

        {/* Complaint Description */}
        <label className="block mt-4 mb-2 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Describe the issue..."
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
          <button onClick={handleReport} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}

// Contact Seller Button Component
export default function ContactSellerButton({ productId }) {
  const [messageExists, setMessageExists] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // Add a loading state
  const [showReportPopup, setShowReportPopup] = useState(false);
  const user = getUserDetails();

  useEffect(() => {
    if (user?.userId) {
      checkIfMessageExists(user.userId, productId).then((exists) => {
        setMessageExists(exists);
        setIsChecking(false); // Mark check as complete
      });
    } else {
      setIsChecking(false); // No user logged in, stop checking
    }
  }, [user, productId]);

  if (isChecking) {
    return null; // Prevent the flicker issue by showing nothing while loading
  }

  return (
    <div>
      {messageExists ? (
        <div>
          <p className="text-green-600 font-semibold">The query has been sent to the seller.</p>
          <button
            onClick={() => setShowReportPopup(true)}
            className="mt-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Report Seller
          </button>
        </div>
      ) : (
        <button
          onClick={() => sendBuyerMessage(user?.userId, productId, setMessageExists)}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-black/90 transition-colors"
        >
          Contact the Seller
        </button>
      )}

      {/* Render the Report Popup if showReportPopup is true */}
      {showReportPopup && (
        <ReportButton
          reporterId={user?.userId}
          productId={productId}
          onClose={() => setShowReportPopup(false)}
        />
      )}
    </div>
  );
}
