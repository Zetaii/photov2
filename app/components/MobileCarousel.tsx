"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PhotoCategory } from "../data/categories"

interface MobileCarouselProps {
  categories: PhotoCategory[]
}

const VIEWPORT_SIZE = 300

export function MobileCarousel({ categories }: MobileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const updateCarousel = (newDirection: number, newIndex: number) => {
    setDirection(newDirection)
    setCurrentIndex(newIndex)
  }

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipeThreshold = 5
    setIsDragging(false)

    if (Math.abs(offset.x) > swipeThreshold) {
      if (offset.x > 0) {
        const newIndex =
          currentIndex <= 0 ? categories.length - 1 : currentIndex - 1
        updateCarousel(-1, newIndex)
      } else {
        const newIndex =
          currentIndex >= categories.length - 1 ? 0 : currentIndex + 1
        updateCarousel(1, newIndex)
      }
    }
  }

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newIndex =
      currentIndex <= 0 ? categories.length - 1 : currentIndex - 1
    updateCarousel(-1, newIndex)
  }

  const handleNext = () => {
    const newIndex =
      currentIndex >= categories.length - 1 ? 0 : currentIndex + 1
    updateCarousel(1, newIndex)
  }

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % categories.length
    const preloadImage = () => {
      const img = document.createElement("img")
      img.src = categories[nextIndex].coverImage
    }
    preloadImage()
  }, [currentIndex, categories])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Title */}
      <motion.h2
        className="text-xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        key={currentIndex}
      >
        {categories[currentIndex].title}
      </motion.h2>

      {/* Viewport Container */}
      <div
        className={cn(
          "relative bg-black/50 rounded-2xl overflow-hidden",
          "border border-white/10 shadow-xl"
        )}
        style={{
          width: VIEWPORT_SIZE,
          height: VIEWPORT_SIZE,
          position: "relative",
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            initial={{
              x: direction * VIEWPORT_SIZE,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -direction * VIEWPORT_SIZE,
              opacity: 0,
            }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-x"
          >
            <div className="relative w-full h-full">
              <Link
                href={`/album/${categories[currentIndex].id}`}
                className={cn(
                  "block w-full h-full relative",
                  isDragging && "pointer-events-none"
                )}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={categories[currentIndex].coverImage}
                    alt={categories[currentIndex].title}
                    width={VIEWPORT_SIZE}
                    height={VIEWPORT_SIZE}
                    className="object-cover"
                    priority={currentIndex === 0}
                    loading={currentIndex === 0 ? "eager" : "lazy"}
                    quality={60}
                    sizes={`${VIEWPORT_SIZE}px`}
                    style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                </div>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-20",
            "p-2 rounded-full bg-black/50 border border-white/10",
            "text-white/70 hover:text-white transition-all duration-300",
            "backdrop-blur-sm hover:bg-black/70 hover:scale-110",
            "active:scale-95 pointer-events-auto"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-20",
            "p-2 rounded-full bg-black/50 border border-white/10",
            "text-white/70 hover:text-white transition-all duration-300",
            "backdrop-blur-sm hover:bg-black/70 hover:scale-110",
            "active:scale-95 pointer-events-auto"
          )}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 flex justify-center gap-2">
        {categories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              const newDirection = idx > currentIndex ? 1 : -1
              updateCarousel(newDirection, idx)
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"
            )}
          />
        ))}
      </div>
    </div>
  )
}
