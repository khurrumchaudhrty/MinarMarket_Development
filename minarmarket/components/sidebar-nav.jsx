"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, ShoppingBag, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function SidebarNav() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState(null)

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

  const toggleDropdown = (href) => {
    setOpenDropdown(openDropdown === href ? null : href)
  }

  return (
    <nav className="flex flex-col space-y-1">
      <Accordion type="single" collapsible>
        {routes.map((route) => (
          <AccordionItem key={route.href} value={route.href}>
            {route.subitems ? (
              <>
                <AccordionTrigger className={`flex items-center ${pathname === route.href ? "bg-secondary" : ""}`}>
                  <div className="flex items-center">
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4">
                    {route.subitems.map((subitem) => (
                      <Link 
                        key={subitem}
                        href={`${route.href}/${subitem.toLowerCase()}`}
                        className="block w-full pl-6 py-2 text-sm text-muted-foreground hover:bg-secondary"
                      >
                        {subitem}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </>
            ) : (
                
              <Link href={route.href} className={`flex items-center py-3 ${pathname === route.href ? "bg-secondary" : ""}`}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
              
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  )
}
