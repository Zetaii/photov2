"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { HiMenuAlt2 } from "react-icons/hi"
import { IoClose, IoChevronDown } from "react-icons/io5"
import { PhotoCategory } from "../data/categories"
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"

interface Sidebar2Props {
  categories: PhotoCategory[]
}

export default function Sidebar2({ categories }: Sidebar2Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<PhotoCategory | null>(
    null
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const simpleBarRef = useRef<any>(null)

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (!isOpen) return

    const lenis = (window as any).lenis
    if (lenis) {
      lenis.stop()
    }

    // Prevent main scroll
    document.body.style.overflow = "hidden"

    const preventScroll = (e: WheelEvent) => {
      const target = e.target as HTMLElement
      const isInsideSidebar = target.closest(".simplebar-content-wrapper")

      if (!isInsideSidebar) {
        e.preventDefault()
        return false
      }
    }

    window.addEventListener("wheel", preventScroll, { passive: false })

    return () => {
      window.removeEventListener("wheel", preventScroll)
      document.body.style.overflow = ""
      if (lenis) {
        lenis.start()
      }
    }
  }, [isOpen])

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()

    if (!simpleBarRef.current) return
    const scrollElement = simpleBarRef.current.getScrollElement()
    if (scrollElement) {
      scrollElement.scrollTop += e.deltaY
    }
  }

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
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9998 }}>
      {/* Toggle Button and Title Container */}
      <div className="fixed top-6 left-6 flex items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-4  p-2 rounded-xl backdrop-blur-md">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-xl bg-white/90 backdrop-blur-md border border-black/90
              text-black hover:text-black transition-all duration-300
              hover:bg-black/30 hover:scale-105 active:scale-95"
          >
            {isOpen ? (
              <IoClose className="w-5 h-5" />
            ) : (
              <HiMenuAlt2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Single Sidebar Container */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-full w-80 pointer-events-auto
          bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl"
      >
        <div className="h-full flex flex-col">
          <div className="pt-12 pb-4" onWheel={(e) => e.stopPropagation()}>
            <p className="text-black text-center text-2xl font-bold p-4">
              DONNY
            </p>
            <div className="px-6 mb-8">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between p-3 rounded-xl 
                  bg-white/10 text-black hover:bg-black/10 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold">Albums</h2>
                <IoChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <SimpleBar
                    ref={simpleBarRef}
                    style={{ maxHeight: "60vh" }}
                    autoHide={false}
                    onWheel={handleWheel}
                  >
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
                              hover:bg-black/10
                              ${
                                pathname === `/album/${category.id}`
                                  ? "bg-white/20 text-black"
                                  : "text-black/90 hover:text-black"
                              }`}
                          >
                            <h3 className="font-medium truncate">
                              {category.title}
                            </h3>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </SimpleBar>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
                transition={{ duration: 0.25 }}
                className="fixed left-80 top-0 h-full w-[400px] 
                  bg-black/20 backdrop-blur-sm"
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

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .simplebar-scrollbar::before {
          background-color: rgba(0, 0, 0, 0.5);
        }

        .simplebar-track.simplebar-vertical {
          width: 8px;
          background-color: rgba(0, 0, 0, 0.1);
          margin-right: 2px;
        }

        .simplebar-scrollbar.simplebar-visible:before {
          opacity: 0.8;
        }

        .simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
          border-radius: 4px;
        }

        /* Prevent scroll propagation */
        .simplebar-content-wrapper {
          overflow: hidden !important;
        }
      `}</style>
    </div>
  )
}
