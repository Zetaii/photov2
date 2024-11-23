"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { PhotoCategory } from "../data/categories"
import { shimmer, toBase64 } from "../utils/image"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"

interface MobileGalleryProps {
  categories: PhotoCategory[]
}

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
}

export default function MobileGallery({ categories }: MobileGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length)
  }

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    )
  }

  const handleSwipe = (event: any, info: any) => {
    if (info.offset.x < -50) {
      handleNext()
    } else if (info.offset.x > 50) {
      handlePrev()
    }
  }

  return (
    <div className="pt-24 px-8 pb-12">
      <div className="max-w-sm mx-auto">
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Main Image Container */}
          <motion.div
            className="relative aspect-[3/2] rounded-2xl bg-white/5
              border border-white/10"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleSwipe}
          >
            <Image
              src={categories[currentIndex].coverImage}
              alt={categories[currentIndex].title}
              fill
              className="object-cover"
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-bold text-white">
                  {categories[currentIndex].title}
                </h2>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <button
                onClick={handlePrev}
                className="pointer-events-auto w-10 h-10 flex items-center justify-center
                  bg-black/50 backdrop-blur-sm rounded-full
                  text-white/70 hover:text-white transition-all duration-300
                  border border-white/10 hover:border-white/20
                  transform hover:scale-110 active:scale-95"
              >
                <IoChevronBack className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto w-10 h-10 flex items-center justify-center
                  bg-black/50 backdrop-blur-sm rounded-full
                  text-white/70 hover:text-white transition-all duration-300
                  border border-white/10 hover:border-white/20
                  transform hover:scale-110 active:scale-95"
              >
                <IoChevronForward className="w-6 h-6" />
              </button>
            </div>

            {/* Link Wrapper */}
            <Link
              href={`/album/${categories[currentIndex].id}`}
              className="absolute inset-0 z-10"
            />
          </motion.div>

          {/* Progress Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 
                  ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"}`}
              />
            ))}
          </div>

          {/* Swipe Instruction */}
          <p className="mt-4 text-center text-sm text-white/60">
            Swipe or use arrows to explore
          </p>
        </div>
      </div>
    </div>
  )
}
