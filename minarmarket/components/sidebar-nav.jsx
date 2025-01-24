"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, ShoppingBag, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLocalStorage } from "@uidotdev/usehooks"
import { ScrollArea } from "./ui/scroll-area"
function SidebarNavComponent() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState(null)

  const routes = [
    {
      label: "My Listings",
      icon: ShoppingBag,
      href: "/my-listings",
      subitems: {
        "Products": "/app/my-products",
        "Services": "/app/my-services",
      }
    },
    {
      label: "Proposals",
      icon: FileText,
      href: "/",
      subitems: {
        "Received": "/app/received-proposals",
        "Sent": "/app/sent-proposals",
      }
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
                    {/* {route.subitems.map((subitem) => (
                      <Link 
                        key={subitem}
                        href={`${route.href}/${subitem.toLowerCase().replace(" ", "-")}`}
                        className="block w-full pl-6 py-2 text-sm text-muted-foreground hover:bg-secondary"
                      >
                        {subitem}
                      </Link>
                    ))} */}
                    {Object.entries(route.subitems).map(([label, href]) => (
                      <Link
                        key={href}
                        href={href}
                        className="block w-full pl-6 py-2 text-sm text-muted-foreground hover:bg-secondary"
                      >
                        {label}
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
export function SidebarNav() {
  const [type,setType] = useLocalStorage("type", "buyer");
  return(
  <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">

    <ScrollArea className="pb-6 pr-6 ">
      <h1 className="mb-2  pl-2 text-l font-semibold">
        {type === "buyer" ? "Buyer " : "Seller "}
        Dashboard</h1>
      <div className="pl-2">
        <SidebarNavComponent />
      </div>
    </ScrollArea>


  </aside>)
}