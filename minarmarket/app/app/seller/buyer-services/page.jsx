"use client"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { BuyerServiceCard } from "@/components/buyer-requirement-card"
import { useQuery } from "@tanstack/react-query"
import { getAllBuyerServiceRequirements } from "@/lib/api/buyer-service-requirement"
import { getUserDetails } from "@/lib/SessionManager"

export default function BuyerServicesPage() {
  const user = getUserDetails()
  
  const { data: requirements, isLoading, error } = useQuery({
    queryKey: ["buyer-service-requirements"],
    queryFn: getAllBuyerServiceRequirements,
    enabled: !!user?.userId,
  })

  console.log("Service requirements data:", requirements);
  
  // Filter out requirements created by the current user
  const filteredRequirements = requirements?.data?.filter(
    (requirement) => requirement.listerId !== user?.userId
  );

  return (
    <div className="flex min-h-screen flex-col px-4">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
        <SidebarNav />
        <main className="flex-1 px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Buyer Service Requirements</h1>
          </div>
          
          {isLoading && <div>Loading service requirements...</div>}
          {error && <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
            Error: {error.message}
          </div>}
          
          {!isLoading && !error && filteredRequirements?.length === 0 && (
            <div className="text-center py-10">
              <p>No service requirements found.</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequirements?.map((requirement) => (
              <BuyerServiceCard
                key={requirement._id}
                _id={requirement._id}
                title={requirement.title}
                images={requirement.images || []}
                rate={requirement.rate}
                category={requirement.category}
                pricingModel={requirement.pricingModel}
                status={requirement.status}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}