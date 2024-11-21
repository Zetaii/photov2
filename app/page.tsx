"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"

interface PhotoCategory {
  id: string
  title: string
  coverImage: string
  initialPosition: { x: number; y: number }
  direction: { x: number; y: number }
  albumId: string
}

const ANIMATION_SETTINGS = {
  speed: 2.0,
  interval: 16,
  imageSize: 300,
}

// Separate the categories data
const INITIAL_CATEGORIES: PhotoCategory[] = [
  {
    id: "winter",
    title: "Winter",
    coverImage: "https://images.unsplash.com/photo-1418985991508-e47386d96a71",
    initialPosition: { x: 150, y: 40 },
    direction: { x: 0.3, y: 0 },
    albumId: "winter",
  },
  {
    id: "mountains",
    title: "Mountains",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    initialPosition: { x: 450, y: 50 },
    direction: { x: 0.8, y: 0 },
    albumId: "mountains",
  },
  {
    id: "underwater",
    title: "Underwater",
    coverImage: "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
    initialPosition: { x: 300, y: 75 },
    direction: { x: 0.8, y: 0 },
    albumId: "underwater",
  },
  {
    id: "winter-2",
    title: "Winter",
    coverImage: "https://images.unsplash.com/photo-1484081064812-86e90e107fa8",
    initialPosition: { x: 900, y: 80 },
    direction: { x: -0.6, y: 0 },
    albumId: "winter-2",
  },
  {
    id: "macro",
    title: "Macro",
    coverImage: "https://images.unsplash.com/photo-1550159930-40066082a4fc",
    initialPosition: { x: 750, y: 85 },
    direction: { x: 0.4, y: 0 },
    albumId: "macro",
  },
  {
    id: "abstract-mirror",
    title: "Abstract",
    coverImage: "https://images.unsplash.com/photo-1507908708918-778587c9e563",
    initialPosition: { x: 1350, y: 100 },
    direction: { x: -0.3, y: 0 },
    albumId: "abstract-mirror",
  },
  {
    id: "portraits",
    title: "Portraits",
    coverImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    initialPosition: { x: 400, y: 110 },
    direction: { x: -0.8, y: 0 },
    albumId: "portraits",
  },
  {
    id: "waterfall",
    title: "Waterfall",
    coverImage: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9",
    initialPosition: { x: 350, y: 125 },
    direction: { x: 0.8, y: 0 },
    albumId: "waterfall",
  },
  {
    id: "desert",
    title: "Desert",
    coverImage: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
    initialPosition: { x: 250, y: 160 },
    direction: { x: 0.7, y: 0 },
    albumId: "desert",
  },
  {
    id: "food",
    title: "Food",
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    initialPosition: { x: 400, y: 175 },
    direction: { x: -0.4, y: 0 },
    albumId: "food",
  },
  {
    id: "ocean",
    title: "Ocean",
    coverImage: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0",
    initialPosition: { x: 550, y: 175 },
    direction: { x: 0.6, y: 0 },
    albumId: "ocean",
  },
  {
    id: "cityscape",
    title: "Cityscape",
    coverImage: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb",
    initialPosition: { x: 950, y: 180 },
    direction: { x: -0.7, y: 0 },
    albumId: "cityscape",
  },
  {
    id: "flowers",
    title: "Flowers",
    coverImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
    initialPosition: { x: 650, y: 200 },
    direction: { x: 0.8, y: 0 },
    albumId: "flowers",
  },
  {
    id: "abstract",
    title: "Abstract",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab",
    initialPosition: { x: 50, y: 200 },
    direction: { x: 0.8, y: 0 },
    albumId: "abstract",
  },
  {
    id: "minimalist",
    title: "Minimalist",
    coverImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
    initialPosition: { x: 600, y: 225 },
    direction: { x: -0.5, y: 0 },
    albumId: "minimalist",
  },
  {
    id: "forest",
    title: "Forest",
    coverImage: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    initialPosition: { x: 250, y: 225 },
    direction: { x: 0.6, y: 0 },
    albumId: "forest",
  },
  {
    id: "nature",
    title: "Nature",
    coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    initialPosition: { x: 1000, y: 300 },
    direction: { x: -1.4, y: 0 },
    albumId: "nature",
  },
  {
    id: "nature-2",
    title: "Nature",
    coverImage:
      "https://images.unsplash.com/photo-1506057213367-028a17ec52e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    initialPosition: { x: 500, y: 450 },
    direction: { x: 1.2, y: 0 },
    albumId: "nature-2",
  },
  {
    id: "urban",
    title: "Urban",
    coverImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    initialPosition: { x: 200, y: 400 },
    direction: { x: 0.9, y: 0 },
    albumId: "urban",
  },
  {
    id: "wildlife",
    title: "Wildlife",
    coverImage: "https://images.unsplash.com/photo-1456926631375-92c8ce872def",
    initialPosition: { x: 50, y: 480 },
    direction: { x: 1.4, y: 0 },
    albumId: "wildlife",
  },
  {
    id: "street",
    title: "Street",
    coverImage: "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45",
    initialPosition: { x: 350, y: 515 },
    direction: { x: -1.1, y: 0 },
    albumId: "street",
  },
  {
    id: "portraits-2",
    title: "Portraits",
    coverImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    initialPosition: { x: 200, y: 250 },
    direction: { x: 1.4, y: 0 },
    albumId: "portraits-2",
  },
  {
    id: "urban-2",
    title: "Urban",
    coverImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    initialPosition: { x: 800, y: 550 },
    direction: { x: -1.3, y: 0 },
    albumId: "urban-2",
  },
  {
    id: "landscape",
    title: "Landscape",
    coverImage: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    initialPosition: { x: 350, y: 500 },
    direction: { x: -1.3, y: 0 },
    albumId: "landscape",
  },
  {
    id: "landscape-2",
    title: "Landscape",
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    initialPosition: { x: 850, y: 350 },
    direction: { x: 1.1, y: 0 },
    albumId: "landscape-2",
  },
  {
    id: "wildlife-2",
    title: "Wildlife",
    coverImage: "https://images.unsplash.com/photo-1549366021-9f761d450615",
    initialPosition: { x: 100, y: 425 },
    direction: { x: -1.7, y: 0 },
    albumId: "wildlife-2",
  },
  {
    id: "street-2",
    title: "Street",
    coverImage: "https://images.unsplash.com/photo-1519608425089-7f3bfa6f6bb8",
    initialPosition: { x: 100, y: 545 },
    direction: { x: -1.4, y: 0 },
    albumId: "street-2",
  },
  {
    id: "night-2",
    title: "Night",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    initialPosition: { x: 50, y: 325 },
    direction: { x: 0.7, y: 0 },
    albumId: "night-2",
  },
  {
    id: "minimalist-2",
    title: "Minimalist",
    coverImage: "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f",
    initialPosition: { x: 100, y: 475 },
    direction: { x: 1.6, y: 0 },
    albumId: "minimalist-2",
  },
  {
    id: "aerial-2",
    title: "Aerial",
    coverImage: "https://images.unsplash.com/photo-1473773508845-188df298d2d1",
    initialPosition: { x: 750, y: 365 },
    direction: { x: -1.6, y: 0 },
    albumId: "aerial-2",
  },
  {
    id: "macro-2",
    title: "Macro",
    coverImage: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa",
    initialPosition: { x: 150, y: 575 },
    direction: { x: -1.2, y: 0 },
    albumId: "macro-2",
  },
  {
    id: "food-2",
    title: "Food",
    coverImage: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
    initialPosition: { x: 800, y: 425 },
    direction: { x: 1.7, y: 0 },
    albumId: "food-2",
  },
  {
    id: "travel",
    title: "Travel",
    coverImage: "https://images.unsplash.com/photo-1500835556837-99ac94a94552",
    initialPosition: { x: 1200, y: 275 },
    direction: { x: -1.2, y: 0 },
    albumId: "travel",
  },
  {
    id: "travel-2",
    title: "Travel",
    coverImage: "https://images.unsplash.com/photo-1488085061387-422e29b40080",
    initialPosition: { x: 100, y: 535 },
    direction: { x: 1.5, y: 0 },
    albumId: "travel-2",
  },
  {
    id: "underwater-2",
    title: "Underwater",
    coverImage: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd",
    initialPosition: { x: 900, y: 325 },
    direction: { x: -0.4, y: 0 },
    albumId: "underwater-2",
  },
  {
    id: "mountains-2",
    title: "Mountains",
    coverImage: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99",
    initialPosition: { x: 950, y: 400 },
    direction: { x: 0.8, y: 0 },
    albumId: "mountains-2",
  },
  {
    id: "forest-2",
    title: "Forest",
    coverImage: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
    initialPosition: { x: 700, y: 475 },
    direction: { x: 0.5, y: 0 },
    albumId: "forest-2",
  },
  {
    id: "ocean-2",
    title: "Ocean",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    initialPosition: { x: 1050, y: 375 },
    direction: { x: -0.5, y: 0 },
    albumId: "ocean-2",
  },
  {
    id: "sunset",
    title: "Sunset",
    coverImage: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869",
    initialPosition: { x: 150, y: 275 },
    direction: { x: 1.3, y: 0 },
    albumId: "sunset",
  },
  {
    id: "sunset-2",
    title: "Sunset",
    coverImage: "https://images.unsplash.com/photo-1506815444479-bfdb1e96c566",
    initialPosition: { x: 850, y: 525 },
    direction: { x: 0.4, y: 0 },
    albumId: "sunset-2",
  },
  {
    id: "waterfall-2",
    title: "Waterfall",
    coverImage: "https://images.unsplash.com/photo-1494472155656-f34e81b17ddc",
    initialPosition: { x: 650, y: 450 },
    direction: { x: -0.4, y: 0 },
    albumId: "waterfall-2",
  },
  {
    id: "desert-2",
    title: "Desert",
    coverImage: "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee",
    initialPosition: { x: 850, y: 310 },
    direction: { x: -0.8, y: 0 },
    albumId: "desert-2",
  },
  {
    id: "autumn",
    title: "Autumn",
    coverImage: "https://images.unsplash.com/photo-1507783548227-544c3b8fc065",
    initialPosition: { x: 450, y: 240 },
    direction: { x: -1.5, y: 0 },
    albumId: "autumn",
  },
  {
    id: "autumn-2",
    title: "Autumn",
    coverImage: "https://images.unsplash.com/photo-1504788363733-507549153474",
    initialPosition: { x: 1050, y: 440 },
    direction: { x: 0.4, y: 0 },
    albumId: "autumn-2",
  },
  {
    id: "flowers-2",
    title: "Flowers",
    coverImage: "https://images.unsplash.com/photo-1496062031456-07b8f162a322",
    initialPosition: { x: 150, y: 490 },
    direction: { x: 0.3, y: 0 },
    albumId: "flowers-2",
  },
  {
    id: "cityscape-2",
    title: "Cityscape",
    coverImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    initialPosition: { x: 350, y: 460 },
    direction: { x: 0.7, y: 0 },
    albumId: "cityscape-2",
  },
  {
    id: "reflection",
    title: "Reflection",
    coverImage:
      "https://images.unsplash.com/photo-1477322524744-0eece9e79640?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    initialPosition: { x: 750, y: 290 },
    direction: { x: 0.5, y: 0 },
    albumId: "reflection",
  },
  {
    id: "reflection-2",
    title: "Reflection",
    coverImage: "https://images.unsplash.com/photo-1515705576963-95cad62945b6",
    initialPosition: { x: 50, y: 390 },
    direction: { x: -0.3, y: 0 },
    albumId: "reflection-2",
  },
]

// Update imageLoadingConfig to remove loading property
const imageLoadingConfig = {
  quality: 75,
  sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}

// Preload essential images
const preloadImages = (categories: PhotoCategory[]) => {
  const imagesToPreload = categories.slice(0, 8) // Preload first 8 images
  return imagesToPreload.map((category) => (
    <link
      key={category.id}
      rel="preload"
      as="image"
      href={category.coverImage}
    />
  ))
}

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })
  const [categories, setCategories] =
    useState<PhotoCategory[]>(INITIAL_CATEGORIES)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Window size handler
  const updateWindowSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  // Initialize window size
  useEffect(() => {
    setIsClient(true)
    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)
    return () => window.removeEventListener("resize", updateWindowSize)
  }, [updateWindowSize])

  // Modified position calculation with more reliable wrapping
  const calculateNewPosition = useCallback(
    (
      currentX: number,
      currentY: number,
      directionX: number,
      directionY: number
    ) => {
      const { imageSize, speed } = ANIMATION_SETTINGS
      const viewportWidth = windowSize.width || window.innerWidth

      let newX = currentX + directionX * speed
      const newY = currentY

      // Ensure wrapping works consistently
      if (directionX > 0 && newX >= viewportWidth) {
        newX = -imageSize
      } else if (directionX < 0 && newX <= -imageSize) {
        newX = viewportWidth
      }

      return {
        x: Math.round(newX),
        y: Math.round(newY),
      }
    },
    [windowSize.width]
  )

  // Modified animation loop using requestAnimationFrame for smoother animation
  useEffect(() => {
    if (!isClient) return

    let animationFrameId: number
    let lastUpdate = performance.now()

    const animate = (currentTime: number) => {
      if (currentTime - lastUpdate >= ANIMATION_SETTINGS.interval) {
        setCategories((prevCategories) =>
          prevCategories.map((category) => ({
            ...category,
            initialPosition: calculateNewPosition(
              category.initialPosition.x,
              category.initialPosition.y,
              category.direction.x,
              category.direction.y
            ),
          }))
        )
        lastUpdate = currentTime
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isClient, calculateNewPosition])

  if (!isClient) return null

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-black via-black/95 to-black">
      {/* Preload critical images */}
      <head>{preloadImages(INITIAL_CATEGORIES)}</head>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-[999] bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Donny
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Gallery Container */}
        <div className="relative w-full min-h-screen overflow-x-hidden px-4">
          <div className="relative w-full pt-10">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{
                  x: category.initialPosition.x,
                  y: category.initialPosition.y - 100,
                }}
                animate={{
                  x: category.initialPosition.x,
                  y: category.initialPosition.y - 100,
                }}
                transition={{ type: "tween", duration: 0, ease: "linear" }}
                className="absolute cursor-pointer will-change-transform"
                style={{
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  width: `${ANIMATION_SETTINGS.imageSize}px`,
                  height: `${ANIMATION_SETTINGS.imageSize}px`,
                  top: category.initialPosition.y - 100,
                  left: 0,
                  position: "absolute",
                  zIndex: hoveredId === category.id ? 1000 : 1,
                }}
                onMouseEnter={() => setHoveredId(category.id)}
              >
                <Link
                  href={`/album/${category.id}`}
                  className="block w-full h-full group"
                >
                  <div
                    className="relative w-full h-full transform transition-all duration-500 
                    group-hover:scale-[1.02] group-hover:-translate-y-1"
                  >
                    <Image
                      src={category.coverImage}
                      alt={category.title}
                      width={ANIMATION_SETTINGS.imageSize}
                      height={ANIMATION_SETTINGS.imageSize}
                      className="rounded-2xl object-cover shadow-lg group-hover:shadow-2xl 
                        brightness-90 group-hover:brightness-100 transition-all duration-500"
                      priority={index < 8} // Priority loading for first 8 images
                      {...imageLoadingConfig}
                      draggable={false}
                    />
                    {/* Hover Overlay */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-black/0 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      flex items-end p-6"
                    >
                      <div
                        className="transform translate-y-4 group-hover:translate-y-0 
                        transition-transform duration-300"
                      ></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="fixed inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </main>
    </div>
  )
}
