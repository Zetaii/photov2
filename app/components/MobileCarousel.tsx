"use client"

import * as React from "react"
import { PhotoCategory } from "@/app/data/categories"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileCarouselProps {
  categories: PhotoCategory[]
}

const VIEWPORT_SIZE = 300

export function MobileCarousel({ categories }: MobileCarouselProps) {
  const [[page, direction], setPage] = React.useState([0, 0])
  const [isDragging, setIsDragging] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const SWIPE_DISTANCE_THRESHOLD = 0
  const SWIPE_VELOCITY_THRESHOLD = 0

  const paginate = (newDirection: number) => {
    if (isAnimating) return

    const newPage = page + newDirection
    if (newPage < 0) {
      setPage([categories.length - 1, newDirection])
    } else if (newPage >= categories.length) {
      setPage([0, newDirection])
    } else {
      setPage([newPage, newDirection])
    }
  }

  const handleDragStart = () => {
    if (isAnimating) return
    setIsDragging(true)
  }

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    setIsDragging(false)

    if (isAnimating) return

    const shouldSwipe =
      Math.abs(offset.x) > SWIPE_DISTANCE_THRESHOLD ||
      Math.abs(velocity.x) > SWIPE_VELOCITY_THRESHOLD

    if (shouldSwipe) {
      setIsAnimating(true)
      if (offset.x > 0) {
        paginate(-1) // Swipe right to go back
      } else {
        paginate(1) // Swipe left to go forward
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Title */}
      <motion.h2
        className="text-xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        key={page}
      >
        {categories[page].title}
      </motion.h2>

      {/* Navigation Container */}
      <div className="relative flex items-center gap-4">
        {/* Left Button */}
        <button
          onClick={() => !isAnimating && paginate(-1)}
          disabled={isAnimating}
          className={cn(
            "flex-shrink-0 z-10",
            "p-2 rounded-full bg-black/50 border border-white/10",
            "text-white/70 hover:text-white transition-all duration-300",
            "backdrop-blur-sm hover:bg-black/70 hover:scale-110",
            "active:scale-95 disabled:opacity-50"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

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
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="wait"
            onExitComplete={() => setIsAnimating(false)}
          >
            <motion.div
              key={page}
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              dragMomentum={true}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              initial={{
                x: direction > 0 ? VIEWPORT_SIZE : -VIEWPORT_SIZE,
                opacity: 0,
              }}
              animate={{ x: 0, opacity: 1 }}
              exit={{
                x: direction < 0 ? VIEWPORT_SIZE : -VIEWPORT_SIZE,
                opacity: 0,
              }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <Link
                href={`/album/${categories[page].id}`}
                className={cn(
                  "block w-full h-full",
                  (isDragging || isAnimating) && "pointer-events-none"
                )}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={categories[page].coverImage}
                    alt={categories[page].title}
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
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Button */}
        <button
          onClick={() => !isAnimating && paginate(1)}
          disabled={isAnimating}
          className={cn(
            "flex-shrink-0 z-10",
            "p-2 rounded-full bg-black/50 border border-white/10",
            "text-white/70 hover:text-white transition-all duration-300",
            "backdrop-blur-sm hover:bg-black/70 hover:scale-110",
            "active:scale-95 disabled:opacity-50"
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
              if (isAnimating) return
              const newDirection = idx > page ? 1 : -1
              setPage([idx, newDirection])
            }}
            disabled={isAnimating}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              idx === page ? "w-8 bg-white" : "w-2 bg-white/30",
              "disabled:opacity-50"
            )}
          />
        ))}
      </div>
    </div>
  )
}
