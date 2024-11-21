"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { albums } from "../../data/albums"
import { motion } from "framer-motion"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const album = albums.find((a) => a.id === params.id.split("-")[0])

  if (!album) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Album not found</h1>
          <Link
            href="/"
            className="text-white/70 hover:text-white transition-colors"
          >
            ← Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={album.coverImage}
            alt={album.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end px-6 pb-12 pt-32 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-block mb-8 text-white/70 hover:text-white transition-colors
                backdrop-blur-sm bg-black/20 px-4 py-2 rounded-lg"
            >
              ← Back to Gallery
            </Link>
            <h1 className="text-6xl font-bold mb-4 text-white">
              {album.title}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              {album.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="px-6 py-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {album.images.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover transition-all duration-500 
                    group-hover:scale-110 group-hover:brightness-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  flex items-end p-6"
                >
                  <div
                    className="transform translate-y-4 group-hover:translate-y-0 
                    transition-transform duration-300"
                  >
                    <h3 className="text-xl font-medium text-white">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
