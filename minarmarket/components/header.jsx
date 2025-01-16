import Link from "next/link"
import { Search } from 'lucide-react'

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 flex items-center justify-between px-4 gap-16 ">
        <Link href="/" className="font-bold text-xl text-primary">
          MINAR MARKET
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center space-x-6 ">
          <div className="relative ">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-[500px] pl-8"
            />
          </div>
          <Button variant="outline">Switch to Selling</Button>
        </div>
      </div>
    </header>
  )
}

