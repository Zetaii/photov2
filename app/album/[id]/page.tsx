"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { albums } from "../../data/albums"
import { motion } from "framer-motion"
import { IoArrowBack, IoImages } from "react-icons/io5"

export default function AlbumPage({ params }: { params: { id: string } }) {
  const album = albums.find((a) => a.id === params.id.split("-")[0])

  if (!album) {
    return (
      <div className="min-h-screen bg-white text-white flex items-center justify-center">
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

  // Group images into pairs
  const imagePairs = album.images.reduce<Array<typeof album.images>>(
    (result, item, index) => {
      if (index % 2 === 0) {
        result.push(album.images.slice(index, index + 2))
      }
      return result
    },
    []
  )

  return (
    <div className="min-h-screen bg-white to-zinc-950">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white 
                transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/5
                border border-transparent hover:border-white/10"
            >
              <IoArrowBack className="w-5 h-5" />
              <span>Gallery</span>
            </Link>
            <h1
              className="text-2xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-white to-white/70"
            >
              {album.title}
            </h1>
            <div className="w-[100px]" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Album Info */}
          <motion.div
            className="mb-16 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center gap-12">
              {/* Cover Image */}

              {/* Album Details */}
              <div className="flex flex-col items-center space-y-6 max-w-2xl">
                <div className="flex items-center gap-4 mb-2"></div>
              </div>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            className="space-y-8 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {imagePairs.map((pair, pairIndex) => (
              <div key={pairIndex} className="flex gap-8 mt-2 justify-center">
                {pair.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="w-[400px] group relative aspect-[3/2] rounded-2xl overflow-hidden
                      shadow-lg hover:shadow-2xl transition-all duration-500
                        hover:border-white/20 bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 * (pairIndex * 2 + index + 1),
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={image.url}
                      alt={image.title}
                      width={800}
                      height={533}
                      className="object-cover w-full h-full transition-all duration-500 
                        group-hover:scale-110 mt-2 group-hover:brightness-110"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 
                      opacity-0 group-hover:opacity-100 transition-all duration-300
                      flex items-end p-6"
                    ></div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
