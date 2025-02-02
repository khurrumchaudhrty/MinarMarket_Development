"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { format } from "date-fns"

export function ProposalList({ userId }) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['receivedProposals'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proposals/received/${userId}`)
      const data = await res.json()
      return data.proposals // Ensure this matches your API response structure
    }
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({ proposalId, status }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proposals/${proposalId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['receivedProposals'])
    }
  })

  if (isLoading) return <div>Loading proposals...</div>
  if (error) return <div>Error loading proposals: {error.message}</div>
  if (!data || data.length === 0) return <div>No proposals found</div>






  return (
    <div className="space-y-4">
      {data?.map((proposal) => (
        <Card key={proposal._id} className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-medium">{proposal.sellerId.name}</h3>
              <p className="text-xs text-gray-500">{proposal.sellerId.email}</p>
            </div>
            <Badge variant={proposal.status === 'pending' ? 'outline' : 'secondary'}>
              {proposal.status}
            </Badge>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Requirement */}
            <div className="bg-gray-50 p-3 rounded border">
              <h4 className="text-sm font-medium text-primary mb-2">Requirement</h4>
              <p className="text-sm font-medium">{proposal.requirementId.title}</p>
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">{proposal.requirementId.description}</p>
              <div className="text-xs">
                <span className="font-medium">Price: Rs.{proposal.requirementId.price}</span>
                <span className="mx-2">•</span>
                <span>{proposal.requirementId.category}</span>
              </div>
            </div>

            {/* Product */}
            <div className="bg-gray-50 p-3 rounded border">
              <h4 className="text-sm font-medium text-primary mb-2">Offered Product</h4>
              <div className="flex gap-3">
                {proposal.sellerListingId.images?.[0] && (
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={proposal.sellerListingId.images[0].url}
                      alt={proposal.sellerListingId.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{proposal.sellerListingId.title}</p>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">{proposal.sellerListingId.description}</p>
                  <div className="text-xs">
                    <span className="font-medium">Price: Rs.{proposal.sellerListingId.price}</span>
                    <span className="mx-2">•</span>
                    <span>{proposal.sellerListingId.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {proposal.status === 'pending' && (
            <div className="flex justify-end gap-2 mt-4">
              <Button size="sm" variant="destructive" 
                onClick={() => updateStatusMutation.mutate({ proposalId: proposal._id, status: 'rejected' })}>
                Reject
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => updateStatusMutation.mutate({ proposalId: proposal._id, status: 'accepted' })}>
                Accept
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}