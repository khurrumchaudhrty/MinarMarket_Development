
"use client"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ProductsTable } from "@/components/products-table"
import { ServicesTable } from "@/components/services-table"
import { RequirementsTable } from "@/components/requirements-table"
import { ServiceRequirementsTable } from "@/components/service-requirements-table.jsx"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { 
  getAllProductListings, 
  getAllServiceListings, 
  getAllProductRequirements, 
  getAllBuyerServices 
} from "@/lib/api/admin"

export default function AdminPage() {
  // Fetch seller product listings
  const { data: productListings, refetch: refetchProducts } = useQuery({
    queryKey: ['all-product-listings'],
    queryFn: getAllProductListings
  });

  // Fetch seller service listings
  const { data: serviceListings, refetch: refetchServices } = useQuery({
    queryKey: ['all-service-listings'],
    queryFn: getAllServiceListings
  });

  // Fetch buyer product requirements
  const { data: productRequirements, refetch: refetchRequirements } = useQuery({
    queryKey: ['all-product-requirements'],
    queryFn: getAllProductRequirements
  });

  // Fetch buyer service listings
  const { data: buyerServices, refetch: refetchBuyerServices } = useQuery({
    queryKey: ['all-buyer-services'],
    queryFn: getAllBuyerServices
  });

  return (
    <div className="flex min-h-screen flex-col px-4">
      <AdminHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
        <AdminSidebar />
        <main className="flex w-full flex-col gap-8">
          
          {/* Seller Product Listings */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Seller Product Listings</h2>
            <ProductsTable products={productListings?.data || []} refetch={refetchProducts} />
          </section>

          {/* Seller Service Listings */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Seller Service Listings</h2>
            <ServicesTable services={serviceListings?.data || []} refetch={refetchServices} />
          </section>

          {/* Buyer Product Requirements */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Buyer Product Requirements</h2>
            <RequirementsTable requirements={productRequirements?.data || []} refetch={refetchRequirements} />
          </section>

          {/* Buyer Service Listings */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Buyer Service Listings</h2>
            <ServiceRequirementsTable services={buyerServices?.data || []} refetch={refetchBuyerServices} />
          </section>

        </main>
      </div>
    </div>
  )
}
