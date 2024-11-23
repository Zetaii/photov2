"use client"

import React, { useState } from "react"
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

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipeThreshold = 5
    setIsDragging(false)

    if (Math.abs(offset.x) > swipeThreshold) {
      if (offset.x > 0) {
        // Swiping right (previous)
        if (currentIndex > 0) {
          setDirection(-1)
          setCurrentIndex(currentIndex - 1)
        } else {
          setDirection(-1)
          setCurrentIndex(categories.length - 1)
        }
      } else {
        // Swiping left (next)
        if (currentIndex < categories.length - 1) {
          setDirection(1)
          setCurrentIndex(currentIndex + 1)
        } else {
          setDirection(1)
          setCurrentIndex(0)
        }
      }
    }
  }

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDirection(-1)
    setCurrentIndex((prev) => (prev <= 0 ? categories.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev >= categories.length - 1 ? 0 : prev + 1))
  }

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
            initial={{ x: direction > 0 ? VIEWPORT_SIZE : -VIEWPORT_SIZE }}
            animate={{ x: 0 }}
            exit={{ x: direction < 0 ? VIEWPORT_SIZE : -VIEWPORT_SIZE }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-x"
          >
            <div className="relative w-full h-full">
              <Link
                href={`/album/${categories[currentIndex].id}`}
                className={cn(
                  "block w-full h-full",
                  isDragging && "pointer-events-none"
                )}
                onClick={(e) => isDragging && e.preventDefault()}
              >
                <Image
                  src={categories[currentIndex].coverImage}
                  alt={categories[currentIndex].title}
                  width={VIEWPORT_SIZE}
                  height={VIEWPORT_SIZE}
                  className="object-cover"
                  priority
                  quality={90}
                  style={{
                    width: VIEWPORT_SIZE,
                    height: VIEWPORT_SIZE,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
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
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
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
