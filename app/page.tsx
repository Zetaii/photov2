"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { INITIAL_CATEGORIES } from "@/app/data/categories"
import Sidebar2 from "@/app/components/Sidebar2"
import Footer from "@/app/components/Footer"
import ImageCard from "@/app/components/ImageCard"
import SmoothScroll from "@/app/components/SmoothScroll"
import type { PhotoCategory } from "@/app/data/categories"
import { SlidingImage } from "@/app/components/SlidingImage"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [lastHoveredId, setLastHoveredId] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const initialRenderRef = useRef(true)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    handleResize()
    setIsLoaded(true)

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const calculateInitialX = (index: number, totalItems: number) => {
    const imageWidth = 400 // Width of each image
    const gap = 50 // Gap between images
    const totalWidth = (imageWidth + gap) * totalItems - gap
    const startX = (windowWidth - totalWidth) / 2
    return startX + index * (imageWidth + gap)
  }

  const handleHover = (id: string) => {
    setLastHoveredId(id)
  }

  if (!isLoaded) {
    return null // or a loading state
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-white">
        <Sidebar2 categories={INITIAL_CATEGORIES} />

        <main className="relative pt-24 pb-32">
          <div className="relative h-[2400px] mb-[100px] overflow-hidden">
            {INITIAL_CATEGORIES.map((category, index) => (
              <SlidingImage
                key={category.id}
                id={category.id}
                title={category.title}
                coverImage={category.coverImage}
                initialX={calculateInitialX(index % 3, 3)}
                initialY={Math.floor(index / 3) * 600}
                direction={{
                  x:
                    category.direction?.x ||
                    (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random()),
                  y: 0,
                }}
                windowWidth={windowWidth}
                isTopLayer={lastHoveredId === category.id}
                onHover={handleHover}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
