"use client"

import { useState, useCallback, useEffect } from "react"
import { INITIAL_CATEGORIES } from "@/app/data/categories"
import Sidebar2 from "@/app/components/Sidebar2"
import Footer from "@/app/components/Footer"
import ImageCard from "@/app/components/ImageCard"

export default function Home() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleHover = useCallback((id: string) => {
    setHoveredId(id)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      <Sidebar2 categories={categories} />
      <div
        className="relative flex flex-col min-h-screen"
        style={{ zIndex: 1 }}
      >
        <div className="relative w-full px-4">
          <div className="relative w-full">
            {categories.map((category) => (
              <ImageCard
                key={category.id}
                {...category}
                hoveredId={hoveredId}
                onHover={handleHover}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
