import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CategoryIcon } from "@/components/category-icon"
import { ProductCard } from "@/components/product-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const productCategories = [
  { label: "Men's Fashion", href: "/category/mens", icon: "/placeholder.svg" },
  { label: "Women's Fashion", href: "/category/womens", icon: "/placeholder.svg" },
  // Add more categories...
]

const serviceCategories = [
  { label: "Alterations", href: "/services/alterations", icon: "/placeholder.svg" },
  { label: "Cleaning", href: "/services/cleaning", icon: "/placeholder.svg" },
  // Add more services...
]

const topSellingProducts = [
  {
    id: "1",
    title: "T-shirt with Tape Details",
    image: "",
    price: 120,
    rating: 4.5,
    type: "Buyer" ,
  },
  {
    id: "2",
    title: "Skinny Fit Jeans",
    image: "",
    price: 240,
    originalPrice: 260,
    rating: 3.5,
    type: "Seller" ,
  },
  // Add more products...
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col px-4">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative">
          <div className="container relative min-h-[600px] flex items-center">
            <Image
              src=""
              alt="Hero Image"
              fill
              className="object-cover absolute inset-0 -z-10"
              priority
            />
            <div className="flex flex-col items-start gap-4 max-w-2xl relative z-10 bg-white/80 p-8 rounded-lg">
              <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="text-muted-foreground">
                Browse through our diverse range of meticulously crafted garments, designed
                to bring out your individuality and cater to your sense of style.
              </p>
              <Button size="lg" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="container py-12">
          <h2 className="mb-8 text-2xl font-bold">Product Categories</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {productCategories.map((category) => (
              <CategoryIcon key={category.href} {...category} />
            ))}
          </div>
        </section>
        <section className="container py-12">
          <h2 className="mb-8 text-2xl font-bold">Service Categories</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {serviceCategories.map((category) => (
              <CategoryIcon key={category.href} {...category} />
            ))}
          </div>
        </section>
        <section className="container py-12">
          <h2 className="mb-8 text-2xl font-bold">TOP SELLING</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topSellingProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

