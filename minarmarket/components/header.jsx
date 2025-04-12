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
      className={`sticky top-0 z-50 w-full border-b ${
        type === "buyer" ? "border-violet-200" : "border-orange-200"
      } bg-white/80 backdrop-blur-sm`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-8">
          <button
            className="block md:hidden text-gray-700 hover:text-[#872CE4]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/app/dashboard" className="flex items-center gap-2 ml-4">
            <span className={`font-bold text-xl ${type === "buyer" ? "text-[#872CE4]" : "text-[#F58014]"}`}>
              MINAR MARKET
            </span>
          </Link>
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-[300px] lg:w-[500px] pl-10 bg-white border-violet-200 text-gray-800 placeholder:text-gray-400 focus:border-violet-300 focus:ring-violet-200"
            />
          </div>

          <Button
            onClick={() => setType(type === "buyer" ? "seller" : "buyer")}
            className={`hidden md:flex border-0 text-white ${
              type === "buyer" ? "bg-[#872CE4] hover:bg-[#872CE4]/90" : "bg-[#F58014] hover:bg-[#F58014]/90"
            } rounded-full`}
          >
            Switch to {type === "buyer" ? "Selling" : "Buying"}
          </Button>

          {token ? (
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
          ) : (
            <div className="flex gap-2">
              <Link href="/signin">
                <Button variant="ghost" className="text-gray-700 hover:text-[#872CE4] hover:bg-violet-50 rounded-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#872CE4] hover:bg-[#872CE4]/90 text-white rounded-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-violet-100 bg-white">
          <div className="container py-4 space-y-4">
            <MainNav />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10 bg-white border-violet-200 text-gray-800 placeholder:text-gray-400 focus:border-violet-300"
              />
            </div>
            <Button
              onClick={() => setType(type === "buyer" ? "seller" : "buyer")}
              className={`w-full text-white ${
                type === "buyer" ? "bg-[#872CE4] hover:bg-[#872CE4]/90" : "bg-[#F58014] hover:bg-[#F58014]/90"
              } rounded-full`}
            >
              Switch to {type === "buyer" ? "Selling" : "Buying"}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

