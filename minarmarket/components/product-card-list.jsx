import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

export function ProductCard({_id, title, description, images, price, category, createdAt, status }) {
  const imageUrl = images?.[0]?.url || "https://placehold.co/600x400/png"

  return (
    <div className="flex gap-6 p-4 border rounded-lg">
      <div className="relative w-32 h-32 bg-muted rounded-md overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-lg font-bold">${price}</span>
        </div>
        <p className="text-muted-foreground mb-2">{description}</p>
        <div className="flex gap-2 text-sm text-muted-foreground mb-4">
          <span>{category}</span>
          <span>•</span>
          <span>Listed {formatDate(createdAt)}</span>
          <span>•</span>
          <span>{status}</span>
        </div>
          <Link  href={`/app/buyer/list-product?id=${_id}`}>
        <Button variant="secondary" size="sm">
          Edit
        </Button>
          </Link>
      </div>
    </div>
  )
}

