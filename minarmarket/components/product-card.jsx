import Image from "next/image"
import Link from "next/link"
import { Star } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

import { AspectRatio } from "@/components/ui/aspect-ratio"

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
        <Badge  variant={type === "Product" ? "default" : "secondary"} className="absolute m-2 z-10">
          {type}
        </Badge>
        <div className="relative aspect-square ">
          <AspectRatio ratio={4/3} >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
          </AspectRatio>
          <h3 className="font-semibold  py-4 px-2">{title}</h3>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 px-4">
        
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
        <Link href={`/send-proposal/${id}`} className="w-full">
          <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
            Send Proposal
          </button>
        </Link>
      </CardFooter>
    </Card>
  )
}

