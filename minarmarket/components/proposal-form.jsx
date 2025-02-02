"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useSearchParams } from "next/navigation"

// Simulated API call to fetch products

const fetchProducts = async () => {
  // In a real application, this would be an API call
  return [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
  ]
}

// Simulated API call to submit proposal
const submitProposal = async (proposalData) => {
  // In a real application, this would be an API call
  console.log("Submitting proposal:", proposalData)
  return { success: true, message: "Proposal submitted successfully" }
}

export function ProposalForm() {
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const searchParams = useSearchParams()
  const productId =  searchParams.get("id")
  const queryClient = useQueryClient()

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  })


  const mutation = useMutation({
    mutationFn: submitProposal,
    onSuccess: () => {
      setPrice("")
      setDescription("")
      setSelectedProduct(null)
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({
      productId: selectedProduct,
      price,
      description
    })
  }

  return (
    <div className="w-full max-w-md p-4">
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="products">
            <AccordionTrigger>Offer against product</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {products.map((product) => (
                  <li key={product.id}>
                    <Button
                      variant={selectedProduct?.id === product.id ? "default" : "outline"}
                      onClick={() => setSelectedProduct(product)}
                      className="w-full justify-start"
                    >
                      {product.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button type="submit" className="w-full" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Submitting..." : "Submit Proposal"}
        </Button>
      </form>
      {mutation.isError && <div className="mt-4 text-red-600">An error occurred: {mutation.error.message}</div>}
      {mutation.isSuccess && <div className="mt-4 text-green-600">{mutation.data.message}</div>}
    </div>
  )
}

