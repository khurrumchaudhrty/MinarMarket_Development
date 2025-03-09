"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { updateServiceListingsStatus } from "@/lib/api/admin"

export function ServicesTable({ services, refetch }) {
  const [selectedServices, setSelectedServices] = useState([])

  const { mutate: updateStatus, isLoading } = useMutation({
    mutationFn: ({ ids, status }) => updateServiceListingsStatus(ids, status),
    onSuccess: () => {
      refetch()
      setSelectedServices([])
    },
    onError: (error) => {
      console.error('Failed to update status:', error)
    }
  })

  const handleStatusUpdate = (newStatus) => {
    
    if (selectedServices.length === 0) return
    updateStatus({ ids: selectedServices, status: newStatus })
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Service Listing Requests</h1>
        <div className="space-x-2 mr-8">
          <Button 
            variant="secondary" 
            onClick={() => handleStatusUpdate('Approved')}
            disabled={selectedServices.length === 0 || isLoading}
          >
            Approve
          </Button>
          <Button 
            variant="secondary"
            onClick={() => handleStatusUpdate('Rejected')}
            disabled={selectedServices.length === 0 || isLoading}
          >
            Reject
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedServices.length === services.length && services.length > 0}
                indeterminate={selectedServices.length > 0 && selectedServices.length < services.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedServices(services.map(service => service._id))
                  } else {
                    setSelectedServices([])
                  }
                }}
              />
            </TableHead>
            <TableHead>Listing ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Pricing Model</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Date Listed</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service._id}>
              <TableCell>
                <Checkbox 
                  checked={selectedServices.includes(service._id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedServices([...selectedServices, service._id])
                    } else {
                      setSelectedServices(selectedServices.filter(id => id !== service._id))
                    }
                  }}
                />
              </TableCell>
              <TableCell className="font-medium text-blue-600">{service._id}</TableCell>
              <TableCell>{service.title}</TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell>${service.rate}</TableCell>
              <TableCell>{service.pricingModel}</TableCell>
              <TableCell>{service.city}</TableCell>
              <TableCell>{service.listerId?.name || "N/A"}</TableCell>
              <TableCell>{new Date(service.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                    service.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : service.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {service.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
