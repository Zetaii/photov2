"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { HiMenuAlt2 } from "react-icons/hi"
import { IoClose } from "react-icons/io5"
import { PhotoCategory } from "../data/categories"
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"
import Lenis from "lenis"

interface Sidebar2Props {
  categories: PhotoCategory[]
}

export default function Sidebar2({ categories }: Sidebar2Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<PhotoCategory | null>(
    null
  )
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const simpleBarRef = useRef<any>(null)

  useEffect(() => {
    if (!isOpen) return

    const mainLenis = (window as any).lenis
    if (mainLenis) {
      mainLenis.stop()
    }

    const handleWheel = (e: WheelEvent) => {
      if (!simpleBarRef.current) return

      const scrollElement = simpleBarRef.current.getScrollElement()
      if (!scrollElement) return

      const currentScroll = scrollElement.scrollTop
      const newScroll = currentScroll + e.deltaY

      scrollElement.scrollTo({
        top: newScroll,
        behavior: "smooth",
      })

      e.preventDefault()
    }

    const sidebarElement = sidebarRef.current
    if (sidebarElement) {
      sidebarElement.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (sidebarElement) {
        sidebarElement.removeEventListener("wheel", handleWheel)
      }
      if (mainLenis) {
        mainLenis.start()
      }
    }
  }, [isOpen])

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <>
      {/* Toggle Button and Title Container - Now outside the pointer-events-none container */}
      <div className="fixed top-6 left-6 flex items-center gap-4 z-[9999]">
        <div className="flex items-center gap-4 bg-black/95 p-2 rounded-xl backdrop-blur-md">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-xl bg-black/90 backdrop-blur-md border border-white/20
              text-white hover:text-white transition-all duration-300
              hover:bg-black/70 hover:scale-105 active:scale-95"
          >
            {isOpen ? (
              <IoClose className="w-5 h-5" />
            ) : (
              <HiMenuAlt2 className="w-5 h-5" />
            )}
          </button>
          <h1 className="text-2xl font-bold text-white pr-4">Donny</h1>
        </div>
      </div>

      {/* Sidebar Container */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
      >
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sidebar with Preview Container */}
        <div className="fixed top-0 left-0 flex h-full pointer-events-auto">
          {/* Main Sidebar */}
          <motion.div
            ref={sidebarRef}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={sidebarVariants}
            className="w-80 h-full bg-black/95 backdrop-blur-xl 
              border-r border-white/20 shadow-2xl overflow-hidden"
          >
            <SimpleBar
              className="h-full"
              autoHide={false}
              ref={simpleBarRef}
              scrollableNodeProps={{ className: "h-full" }}
            >
              <div className="pt-24 pb-8">
                <div className="px-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2 bg-white/10 p-3 rounded-xl">
                    Photo Albums
                  </h2>
                  <p className="text-white/80 text-sm">
                    Browse through the collection
                  </p>
                </div>

                <div className="px-4 space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="relative"
                      onMouseEnter={() => setHoveredCategory(category)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <Link
                        href={`/album/${category.id}`}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-xl transition-all duration-300
                          hover:bg-white/10
                          ${
                            pathname === `/album/${category.id}`
                              ? "bg-white/20 text-white"
                              : "text-white/90 hover:text-white"
                          }`}
                      >
                        <h3 className="font-medium truncate">
                          {category.title}
                        </h3>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </SimpleBar>
          </motion.div>

          {/* Preview Panel */}
          {isOpen && (
            <div className="relative h-full">
              <AnimatePresence>
                {hoveredCategory && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-80 top-0 h-full w-[400px] 
                      bg-black/80 backdrop-blur-sm"
                  >
                    <div
                      className="relative w-full h-full flex items-center 
                      justify-center p-8"
                    >
                      <div
                        className="w-full aspect-[4/3] relative rounded-2xl 
                        overflow-hidden border border-white/20 shadow-2xl"
                      >
                        <Image
                          src={hoveredCategory.coverImage}
                          alt={hoveredCategory.title}
                          fill
                          className="object-cover"
                          sizes="400px"
                          priority={false}
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t 
                          from-black/60 via-black/0 to-transparent"
                        >
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-lg font-medium text-white">
                              {hoveredCategory.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .simplebar-scrollbar::before {
          background-color: rgba(255, 255, 255, 0.3);
        }

        .simplebar-track.simplebar-vertical {
          width: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-right: 2px;
        }

        .simplebar-scrollbar.simplebar-visible:before {
          opacity: 0.5;
        }

        .simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
          border-radius: 4px;
        }
      `}</style>
    </>
  )
}