import Image from "next/image"
import { Button } from "@/components/ui/button"



export function ProductCard({ title, description, image }) {
  return (
    <div className="flex gap-6 p-4 border rounded-lg">
      <div className="relative w-32 h-32 bg-muted rounded-md overflow-hidden">
        <Image src="/placeholder.svg" alt={title} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="secondary" size="sm">
          Edit
        </Button>
      </div>
    </div>
  )
}

