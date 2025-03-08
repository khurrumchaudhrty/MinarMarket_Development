"use client"

import Link from "next/link"
import { Search, UserCircle, Menu } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useLocalStorage } from "@uidotdev/usehooks"
import { useState, useEffect } from "react"

export function Header() {
  const token = localStorage.getItem("token")
  const [type, setType] = useLocalStorage("type", "buyer")
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-sm transition-colors ${
        type === "buyer" ? "bg-[#1995AD] border-[#1995AD]/50" : "bg-[#A1D6E2] border-[#A1D6E2]/50"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-8">
          <button
            className="block md:hidden text-white/90 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/app/dashboard" className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded flex items-center justify-center backdrop-blur-sm ${
                type === "buyer" ? "bg-white/20" : "bg-white/20"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-white">MINAR MARKET</span>
          </Link>
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-[300px] lg:w-[500px] pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15"
            />
          </div>

          <Button
            onClick={() => setType(type === "buyer" ? "seller" : "buyer")}
            className="hidden md:flex border-0 bg-white/30 text-white hover:bg-white/40"
          >
            Switch to {type === "buyer" ? "Selling" : "Buying"}
          </Button>

          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`w-56 backdrop-blur-sm border-white/20 text-white ${
                  type === "buyer" ? "bg-[#1995AD]/95" : "bg-[#A1D6E2]/95"
                }`}
              >
                <DropdownMenuItem className="hover:bg-white/20">Profile</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/20">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem className="hover:bg-white/20">
                  <Button
                    onClick={() => {
                      localStorage.removeItem("token")
                      router.push("/signin")
                    }}
                    variant="ghost"
                    className="text-white hover:text-white p-0"
                  >
                    Sign Out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link href="/signin">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-white/30 hover:bg-white/40 text-white">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t border-white/20 ${
            type === "buyer" ? "bg-[#1995AD]/95" : "bg-[#A1D6E2]/95"
          } backdrop-blur-sm`}
        >
          <div className="container py-4 space-y-4">
            <MainNav />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15"
              />
            </div>
            <Button
              onClick={() => setType(type === "buyer" ? "seller" : "buyer")}
              className="w-full border-0 bg-white/30 text-white hover:bg-white/40"
            >
              Switch to {type === "buyer" ? "Selling" : "Buying"}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

