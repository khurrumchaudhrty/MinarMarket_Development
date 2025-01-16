import Image from "next/image"
import Link from "next/link"
import { Star } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"



export function ProductCard({
  id,
  title,
  image,
  price,
  originalPrice,
  rating,
  type
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Badge variant={type === "Buyer" ? "default" : "secondary"} className="absolute m-2">
          {type}
        </Badge>
        <div className="relative aspect-square">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-primary" : "fill-muted"}`}
            />
          ))}
          <span className="text-sm text-muted-foreground">{rating}/5</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">${price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

