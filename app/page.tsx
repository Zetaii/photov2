"use client"

import { useState, useCallback, useEffect } from "react"
import { INITIAL_CATEGORIES } from "@/app/data/categories"
import Sidebar2 from "@/app/components/Sidebar2"
import Footer from "@/app/components/Footer"
import ImageCard from "@/app/components/ImageCard"
import SmoothScroll from "@/app/components/SmoothScroll"
import type { PhotoCategory } from "@/app/data/categories"

export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleHover = useCallback((id: string) => {
    setHoveredId(id)
  }, [])

  // Organize images into rows
  const rows = INITIAL_CATEGORIES.reduce<Array<PhotoCategory[]>>(
    (acc, _, index) => {
      if (index % 3 === 0) {
        acc.push(INITIAL_CATEGORIES.slice(index, index + 3))
      }
      return acc
    },
    []
  )

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-white">
        <Sidebar2 categories={INITIAL_CATEGORIES} />

        <main className="relative pt-24 pb-32">
          <div className="relative h-[2400px] mb-[100px] overflow-hidden">
            {rows.map((row: PhotoCategory[], rowIndex: number) =>
              row.map((category: PhotoCategory, index: number) => (
                <ImageCard
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  coverImage={category.coverImage}
                  hoveredId={hoveredId}
                  onHover={handleHover}
                  initialX={(windowWidth - 1200) / 2 + index * 450}
                  row={rowIndex}
                />
              ))
            )}
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
