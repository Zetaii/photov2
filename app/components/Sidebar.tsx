"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PhotoCategory } from "../data/categories"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

interface SidebarProps {
  categories: PhotoCategory[]
}

export default function Sidebar({ categories }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

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
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999, position: "absolute" }}
    >
      {/* Toggle Button and Title Container */}
      <div className="absolute top-6 left-6 flex items-center gap-4 pointer-events-auto w-80 px-4">
        <div className="flex items-center gap-4 bg-black/95 p-2 rounded-xl backdrop-blur-md">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-3 rounded-xl
              bg-black/90 backdrop-blur-md border border-white/20
              text-white hover:text-white transition-all duration-300
              hover:bg-black/70 hover:scale-105 active:scale-95`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-2xl font-bold text-white pr-4">Donny</h1>
        </div>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
        className="absolute top-0 left-0 h-full w-80 pointer-events-auto
          backdrop-blur-xl border-r border-white/20 shadow-2xl"
      >
        <div className="h-full overflow-y-auto pt-24 pb-8">
          {/* Header */}
          <div className="px-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Photo Albums</h2>
            <p className="text-white/80 text-sm">
              Browse through the collection
            </p>
          </div>

          {/* Categories List */}
          <div className="px-4 space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/album/${category.id}`}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300
                  group hover:bg-white/10
                  ${
                    pathname === `/album/${category.id}`
                      ? "bg-white/20 text-white"
                      : "text-white/90 hover:text-white"
                  }`}
              >
                {/* Category Thumbnail */}
                <div
                  className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0
                  border border-white/20 group-hover:border-white/30 transition-all duration-300"
                >
                  <Image
                    src={category.coverImage}
                    alt={category.title}
                    width={56}
                    height={56}
                    sizes="56px"
                    className="object-cover transition-all duration-300
                      group-hover:scale-110 group-hover:brightness-110"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>

                {/* Category Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
