"use client"

import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";



export function ProductGrid() {
    const { data: topSellingProducts } = useQuery({
        queryKey: ["top-selling-products"],
        queryFn: async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/product-listings", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json()
            return data.data
        },
        initialData: [],
    });

    return (
        <section className="container py-8">
            <h2 className="mb-8 text-2xl font-bold">TOP SELLING</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {topSellingProducts?.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
}