"use client"

import { useState, useCallback, useEffect } from "react"
import { INITIAL_CATEGORIES, PhotoCategory } from "@/app/data/categories"
import { ANIMATION_SETTINGS } from "@/app/constants"
import Header from "@/app/components/Header"
import Sidebar2 from "@/app/components/Sidebar2"
import dynamic from "next/dynamic"
import Footer from "@/app/components/Footer"
import SmoothScroll from "@/app/components/SmoothScroll"

const MobileCarousel = dynamic(
  () =>
    import("@/app/components/MobileCarousel").then((mod) => mod.MobileCarousel),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse w-full h-[70vh] bg-white/5 rounded-2xl" />
    ),
  }
)

const ImageCard = dynamic(() => import("@/app/components/ImageCard"), {
  ssr: false,
})

export default function Home() {
  const [categories, setCategories] =
    useState<PhotoCategory[]>(INITIAL_CATEGORIES)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Handle window resize and device detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width)
      setIsMobile(width < 768) // Mobile breakpoint at 768px
    }
    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleHover = useCallback((id: string) => {
    setHoveredId(id)
  }, [])

  const calculateNewPosition = useCallback(
    (currentX: number, directionX: number) => {
      const { imageSize, speed } = ANIMATION_SETTINGS
      const buffer = imageSize * 0.5 // Add buffer for smoother wrapping

      let newX = currentX + directionX * speed

      // Smooth wrapping with buffer
      if (directionX > 0 && newX >= windowWidth + buffer) {
        newX = -imageSize - buffer
      } else if (directionX < 0 && newX <= -imageSize - buffer) {
        newX = windowWidth + buffer
      }

      return Math.round(newX * 100) / 100 // Round to 2 decimal places for smoother motion
    },
    [windowWidth]
  )

  useEffect(() => {
    if (!windowWidth) return

    let animationFrameId: number
    let lastUpdate = performance.now()
    const frameInterval = 1000 / 60 // Target 60fps

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastUpdate

      if (deltaTime >= frameInterval) {
        setCategories((prevCategories) =>
          prevCategories.map((category) => ({
            ...category,
            initialPosition: {
              x: calculateNewPosition(
                category.initialPosition.x,
                category.direction.x
              ),
              y: category.initialPosition.y,
            },
          }))
        )
        lastUpdate = currentTime - (deltaTime % frameInterval)
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [calculateNewPosition, windowWidth])

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-neutral-900">
        <Sidebar2 categories={categories} />
        <div
          className="relative flex flex-col min-h-screen"
          style={{ zIndex: 1 }}
        >
          {/* Main Content */}
          <div className="flex-1">
            {isMobile ? (
              <MobileCarousel categories={categories} />
            ) : (
              <div className="relative w-full px-4">
                <div className="relative w-full">
                  {categories.map((category: PhotoCategory) => (
                    <ImageCard
                      key={category.id}
                      {...category}
                      hoveredId={hoveredId}
                      onHover={handleHover}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  )
}
