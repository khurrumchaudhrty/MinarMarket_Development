"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, ShoppingBag, FileText } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function SidebarNav() {
  const pathname = usePathname()

  const routes = [
    {
      label: "My Listings",
      icon: ShoppingBag,
      href: "/listings",
      subitems: ["Products", "Services"],
    },
    {
      label: "Proposals",
      icon: FileText,
      href: "/proposals",
      subitems: ["Sent", "Received"],
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <nav className="flex flex-col space-y-1">
      {routes.map((route) => (
        <div key={route.href}>
          <Button
            variant={pathname === route.href ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Link>
          </Button>
          {route.subitems?.map((subitem) => (
            <Button
              key={subitem}
              variant="ghost"
              className="w-full justify-start pl-9 text-sm text-muted-foreground"
              asChild
            >
              <Link href={`${route.href}/${subitem.toLowerCase()}`}>
                {subitem}
              </Link>
            </Button>
          ))}
        </div>
      ))}
    </nav>
  )
}

