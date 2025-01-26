import { AdminSidebar } from "@/components/admin-sidebar"
import { ProductsTable } from "@/components/products-table"
import { Button } from "@/components/ui/button"
import { AdminHeader } from "@/components/admin-header"

const products = [
  {
    id: "67339e126af2516719b52704",
    seller: "Aniqa Aqeel",
    dateListed: "11/12/2024",
    title: "OK",
    status: "Rejected",
  },
  {
    id: "67339e126af2516719b52707",
    seller: "Aniqa Aqeel",
    dateListed: "11/12/2024",
    title: "OK",
    status: "Approved",
  },
  {
    id: "67339e146af2516719b5270a",
    seller: "Aniqa Aqeel",
    dateListed: "11/12/2024",
    title: "OK",
    status: "Approved",
  },
  {
    id: "6733b277173eba60551a975d",
    seller: "Abdul Ahad Bin Ali",
    dateListed: "11/13/2024",
    title: "Jacket",
    status: "Approved",
  },
  {
    id: "6733d1353bdcf4fe8e018dea",
    seller: "Abdul Ahad Bin Ali",
    dateListed: "11/13/2024",
    title: "headphones",
    status: "Pending",
  },
  {
    id: "673b9fdd16d3da81cf31b94f",
    seller: "ahmed farooqui",
    dateListed: "11/19/2024",
    title: "Toyota Hilux",
    status: "Approved",
  },
] 

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col px-4">
      <AdminHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
        <AdminSidebar />
        <main className="flex w-full flex-col gap-8">
          <ProductsTable products={products} />
        </main>
      </div>
    </div>
  )
}

