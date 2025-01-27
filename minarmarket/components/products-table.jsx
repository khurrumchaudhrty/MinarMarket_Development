"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ProductsTable({ products }) {
    const [selectedProducts, setSelectedProducts] = useState([])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Listing Requests</h1>
        <div className="space-x-2 mr-8">
          <Button variant="secondary">Approve</Button>
          <Button variant="secondary">Reject</Button>
          
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedProducts.length === products.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedProducts(products.map((product) => product.id))
                  } else {
                    setSelectedProducts([])
                  }
                }}
              />
            </TableHead>
            <TableHead>Listing ID</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Date Listed</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox 
                    
                />
              </TableCell>
              <TableCell className="font-medium text-blue-600">{product.id}</TableCell>
              <TableCell>{product.seller}</TableCell>
              <TableCell>{product.dateListed}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                    product.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : product.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : product.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {product.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

