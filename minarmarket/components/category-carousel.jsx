"use client"

import { useState, useEffect } from "react"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"
import { motion } from "framer-motion"

export function CategoryCarousel({ categories, onCategoryClick, primaryColor, secondaryColor }) {
  const [isMobile, setIsMobile] = useState(false)
  const [api, setApi] = useState(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const itemsPerView = isMobile ? 2 : 5

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
        dragFree: false, // Disable dragFree for better control
        spacing: 40,
        containScroll: false,
        skipSnaps: false, // Disable skipSnaps for better control
      }}
      className="w-full relative px-10"
    >
      <CarouselContent className="mx-0 py-1">
        {categories.length > 0 ? (
          // Repeat the categories to ensure circular looping
          [...categories, ...categories].map((category, index) => (
            <CarouselItem 
              key={`category-${index}`}
              className="flex-shrink-0 md:basis-1/7 mr-0"
              style={{ minWidth: isMobile ? '85px' : '105px', maxWidth: '105px' }}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center rounded-xl overflow-hidden cursor-pointer shadow-sm"
                  onClick={() => onCategoryClick(category.name)}
                  style={{
                    background:
                      index % 2 === 0
                        ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                        : `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
                    height: '90px',
                    width: '90px',
                  }}
                >
                  <div className="flex items-center justify-center w-16 h-16 text-5xl text-white">
                    {category.icon}
                  </div>
                </motion.div>
                <span className="text-xs text-gray-800 font-medium text-center mt-1">{category.name}</span>
              </div>
            </CarouselItem>
          ))
        ) : (
          // Placeholder item if no categories
          <CarouselItem className="flex-shrink-0">
            <div className="h-[90px] w-[90px] bg-gray-100 rounded-xl"></div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious 
        className="absolute left-0 top-1/3 bg-white hover:bg-white text-gray-800 border border-gray-200 shadow-md h-8 w-8 z-20"
        onClick={(e) => {
          e.stopPropagation();
          api?.scrollPrev();
        }}
      />
      <CarouselNext 
        className="absolute right-0 top-1/3 bg-white hover:bg-white text-gray-800 border border-gray-200 shadow-md h-8 w-8 z-20"
        onClick={(e) => {
          e.stopPropagation();
          api?.scrollNext();
        }}
      />
    </Carousel>
  )
}
