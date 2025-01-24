            <SidebarNav />
            import { Header } from "@/components/header"
            import { SidebarNav } from "@/components/sidebar-nav"
            import { ProductCard } from "@/components/product-card"
            import { ScrollArea } from "@/components/ui/scroll-area"
            import { ProductList } from "@/components/product-list"
            
            const categories = Array.from({ length: 9 }).map((_, i) => ({
              id: `category-${i + 1}`,
              name: `Category ${i + 1}`,
              image: "https://placehold.co/600x600/png",
            }))
            
            const topSellingProducts = [
              {
                id: "1",
                title: "T-shirt with Tape Details",
                image: "https://placehold.co/600x400/png",
                price: 120,
                rating: 4.5,
                type: "Buyer" ,
              },
              {
                id: "2",
                title: "Fit Shirt",
                image: "https://placehold.co/600x400/png",
                price: 230,
                originalPrice: 260,
                rating: 3.5,
                type: "Seller" ,
              },
              {
                id: "3",
                title: "Fit Jeans",
                image: "https://placehold.co/600x400/png",
                price: 20,
                originalPrice: 260,
                rating: 3.5,
                type: "Seller" ,
              },
              {
                id: "3",
                title: "Fit Jeans",
                image: "https://placehold.co/600x400/png",
                price: 20,
                originalPrice: 260,
                rating: 3.5,
                type: "Buyer" ,
              },
              {
                id: "3",
                title: "Fit Jeans",
                image: "https://placehold.co/600x400/png",
                price: 20,
                originalPrice: 260,
                rating: 3.5,
                type: "Buyer" ,
              },
            ]
            
            export default function DashboardPage() {
              return (
                <div className="flex min-h-screen flex-col px-4">
                  <Header />
                  <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-4 md:py-6">
                    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                      
                      <ScrollArea className="pb-6 pr-6 ">
                        <h1 className="mb-2  pl-2 text-l font-semibold">Buyer Dashboard</h1>
                        <div className="pl-2">
                        <SidebarNav />
                        </div>
                      </ScrollArea>
                      
                    </aside>
                    <main className="flex-1 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold">My Products</h1>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">List Product</button>
                        </div>
                        <ProductList />
                        </main>
                  </div>
                </div>
              )
            }
            
            