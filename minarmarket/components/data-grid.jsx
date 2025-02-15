"use client"

import { useQuery } from "@tanstack/react-query";
import { ProductCard, ServiceCard } from "./product-card";



export function ProductGrid({userId}) {

    const { data: topSellingProducts } = useQuery({
        queryKey: ["top-selling-products", userId], // Ensure re-fetch when userId changes
        queryFn: async () => {
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-listings?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch top-selling products");
            }
    
            const data = await response.json();
            return data.data;
        },
        initialData: [],
    });
    const {data: topSellingServices} = useQuery({
        queryKey: ["top-selling-services"],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service-listings?userId=${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) {
                throw new Error("Failed to fetch top-selling services");
            }
            const data = await response.json()
            
            return data.data
        },
        initialData: [],
    });


    return (
        <section className="container py-8">
            <h2 className="mb-8 text-2xl font-bold">TOP SELLING PRODUCTS</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {topSellingProducts?.map((product) => (
                    <ProductCard key={product._id} {...product} />
                ))}
            
                
            </div>
            <h2 className="mb-8 mt-10 text-2xl font-bold">TOP SELLING SERVICES</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                
            
                {topSellingServices?.map((service) => (
                    <ServiceCard key={service._id} {...service} />
                ))}
            </div>
        </section>
    );
}