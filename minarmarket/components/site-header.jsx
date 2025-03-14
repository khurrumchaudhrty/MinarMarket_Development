"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#872CE4] tracking-tight mr-8">
            MINAR MARKET
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-1">
            <nav className="flex items-center gap-4 lg:gap-6">
              <Link
                href="/products"
                className="text-sm font-medium text-gray-600 hover:text-[#872CE4] transition-colors"
              >
                Products
              </Link>
              <Link
                href="/services"
                className="text-sm font-medium text-gray-600 hover:text-[#872CE4] transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contactus"
                className="text-sm font-medium text-gray-600 hover:text-[#872CE4] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/aboutus"
                className="text-sm font-medium text-gray-600 hover:text-[#872CE4] transition-colors"
              >
                About Us
              </Link>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="relative hidden lg:block w-full max-w-md ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for products..."
                className="pl-10 border-gray-200 focus:border-[#872CE4] focus:ring-[#872CE4] w-full"
              />
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-auto">
              <Button variant="ghost" className="text-[#872CE4] hover:bg-[#872CE4]/5" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button className="bg-[#872CE4] hover:bg-[#872CE4]/90 text-white" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col gap-4 mb-6">
              <Link
                href="/products"
                className="text-sm font-medium text-gray-600 hover:text-[#872CE4]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/services"
                className="text-sm font-medium text-gray-600 hover:text-[#872CE4]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/contactus"
                className="text-sm font-medium text-gray-600 hover:text-[#872CE4]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/aboutus"
                className="text-sm font-medium text-gray-600 hover:text-[#872CE4]"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </nav>

            {/* Search Bar - Mobile */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search for products..." className="pl-10 border-gray-200 w-full" />
            </div>

            {/* Auth Buttons - Mobile */}
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className="text-[#872CE4] hover:bg-[#872CE4]/5 w-full"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button
                className="bg-[#872CE4] hover:bg-[#872CE4]/90 text-white w-full"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

