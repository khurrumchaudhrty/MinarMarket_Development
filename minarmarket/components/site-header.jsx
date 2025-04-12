"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { SearchBar } from "@/components/search-bar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [type, setType] = useState("buyer") // Default value
  const router = useRouter()
  const [token, setToken] = useState(null)

  // Initialize type from localStorage after component mounts
  useEffect(() => {
    setMounted(true)
    // Get localStorage values only after component is mounted on client
    if (typeof window !== "undefined") {
      const storedType = localStorage.getItem("type")
      if (storedType) {
        setType(storedType)
      }
      setToken(localStorage.getItem("token"))
    }
  }, [])

  // Update localStorage when type changes
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("type", type)
    }
  }, [type, mounted])

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className={`text-2xl font-bold ${token ? (type === "buyer" ? "text-[#872CE4]" : "text-[#F58014]") : "text-[#872CE4]"} tracking-tight mr-8`}>
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
              <SearchBar className="w-full" />
            </div>

            {/* Auth Buttons/User Controls based on auth state */}
            <div className="flex items-center gap-3 ml-auto">
              {token ? (
                <>
                  <Button
                    onClick={() => setType(type === "buyer" ? "seller" : "buyer")}
                    className={`hidden md:flex border-0 text-white ${
                      type === "buyer" ? "bg-[#872CE4] hover:bg-[#872CE4]/90" : "bg-[#F58014] hover:bg-[#F58014]/90"
                    } rounded-full`}
                  >
                    Switch to {type === "buyer" ? "Selling" : "Buying"}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-700 hover:text-[#872CE4] hover:bg-violet-50 rounded-full"
                      >
                        <UserCircle className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 bg-white border border-violet-100 text-gray-700 rounded-xl shadow-lg"
                    >
                      <DropdownMenuItem className="hover:bg-violet-50 hover:text-[#872CE4] rounded-lg my-1 cursor-pointer">
                        <Link href="/app/dashboard" className="w-full">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-violet-50 hover:text-[#872CE4] rounded-lg my-1 cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-violet-50 hover:text-[#872CE4] rounded-lg my-1 cursor-pointer">
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-violet-100" />
                      <DropdownMenuItem className="hover:bg-violet-50 hover:text-[#872CE4] rounded-lg my-1 cursor-pointer">
                        <Button
                          onClick={() => {
                            localStorage.removeItem("token")
                            setToken(null)
                            router.push("/signin")
                          }}
                          variant="ghost"
                          className="text-gray-700 hover:text-[#872CE4] p-0 w-full justify-start"
                        >
                          Sign Out
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="text-[#872CE4] hover:bg-[#872CE4]/5" asChild>
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button className="bg-[#872CE4] hover:bg-[#872CE4]/90 text-white" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
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
              <SearchBar className="w-full" />
            </div>

            {/* Auth Buttons/User Controls for Mobile */}
            {token ? (
              <div className="space-y-3">
                <Button
                  onClick={() => setType(type === "buyer" ? "seller" : "buyer")}
                  className={`w-full text-white ${
                    type === "buyer" ? "bg-[#872CE4] hover:bg-[#872CE4]/90" : "bg-[#F58014] hover:bg-[#F58014]/90"
                  } rounded-full`}
                >
                  Switch to {type === "buyer" ? "Selling" : "Buying"}
                </Button>
                <Link href="/app/dashboard" className="block">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    localStorage.removeItem("token")
                    setToken(null)
                    router.push("/signin")
                  }}
                  variant="ghost"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </header>
  )
}

