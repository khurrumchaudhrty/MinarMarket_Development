"use client";
import { ProductCard } from "@/components/product-card-list"
import { showMyProductListings, showMyRequirement } from "@/lib/api/product"
import { getUserDetails } from "@/lib/SessionManager";
import { useQuery } from "@tanstack/react-query";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    title: "Title",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    image: "",
  },
  {
    id: 2,
    title: "Title",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    image: "",
  },
  {
    id: 3,
    title: "Title",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    image: "",
  },
  {
    id: 4,
    title: "Title",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    image: "",
  },
  {
    id: 5,
    title: "Title",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    image: "",
  },
]

export function ProductList() {
  const userId=  getUserDetails().userId;
  const {data:products} = useQuery({
    queryKey: ["product"],
    queryFn: () => showMyProductListings(userId),
  })
  console.log(products)
  return (
    <div className="space-y-4">
      {products?.data.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}


export function RequirementList() {
  const userDetails = getUserDetails();
  const userId = userDetails?.userId;

  const {data:products, isError, error} = useQuery({
    queryKey: ["requirement", userId],
    queryFn: async () => await showMyRequirement(userId),
    enabled: !!userId,
  })

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="space-y-4">
      {products?.data?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

