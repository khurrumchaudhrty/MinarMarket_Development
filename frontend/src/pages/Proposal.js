import React, { useState, useEffect } from 'react';
import BuyerSidebar from '../components/BuyerSidebar';
import SellerSidebar from '../components/SellerSidebar';
import { getUserDetails } from '../components/SessionManager';

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const userDetails = getUserDetails();
  const isSeller = userDetails?.role === 'seller';

  useEffect(() => {
    const fetchProposals = async () => {
      const endpoint = isSeller ? 'seller' : 'buyer';
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/proposals/${endpoint}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userDetails.userId })
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProposals(data.proposals);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchProposals();
  }, [isSeller, userDetails.userId]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isSeller ? <SellerSidebar /> : <BuyerSidebar />}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">My Proposals</h1>
        <div className="grid gap-4">
          {proposals.map((proposal) => (
            <div key={proposal._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {proposal.requirementId.title}
                </h2>
                <span className={`
                  px-2 py-1 rounded text-sm
                  ${proposal.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                    proposal.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}
                `}>
                  {proposal.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{proposal.description}</p>
              <div className="flex justify-between text-sm">
                <span>Price: PKR {proposal.price}</span>
                <span>
                  {isSeller ? 
                    `To: ${proposal.buyerId.name}` : 
                    `From: ${proposal.sellerId.name}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proposals;