"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ANIMATION_SETTINGS } from "../constants"
import { useState } from "react"
import { shimmer, toBase64 } from "../utils/image"

interface ImageCardProps {
  id: string
  title: string
  coverImage: string
  initialPosition: { x: number; y: number }
  direction: { x: number; y: number }
  hoveredId: string | null
  onHover: (id: string) => void
}

export default function ImageCard({
  id,
  title,
  coverImage,
  initialPosition,
  direction,
  hoveredId,
  onHover,
}: ImageCardProps) {
  const isHovered = hoveredId === id
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      initial={{ x: initialPosition.x, y: initialPosition.y }}
      animate={{
        x: initialPosition.x,
        y: initialPosition.y,
        scale: isHovered ? ANIMATION_SETTINGS.hoverScale : 1,
        zIndex: isHovered ? 9999 : 1,
      }}
      transition={{
        duration: 0,
        scale: {
          duration: ANIMATION_SETTINGS.transitionDuration,
          ease: "easeOut",
        },
      }}
      style={{
        position: "absolute",
        width: `${ANIMATION_SETTINGS.imageSize}px`,
        height: `${ANIMATION_SETTINGS.imageSize}px`,
      }}
      onMouseEnter={() => onHover(id)}
    >
      <Link href={`/album/${id}`} className="block w-full h-full group">
        <div className="relative w-full h-full transform transition-all duration-300">
          <Image
            src={coverImage}
            alt={title}
            width={ANIMATION_SETTINGS.imageSize}
            height={ANIMATION_SETTINGS.imageSize}
            className={`rounded-2xl object-cover transition-opacity duration-300
              ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoadingComplete={() => setIsLoaded(true)}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(
                ANIMATION_SETTINGS.imageSize,
                ANIMATION_SETTINGS.imageSize
              )
            )}`}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-white/5 rounded-2xl animate-pulse" />
          )}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-black/0 
            opacity-0 transition-opacity duration-300
            flex items-end p-6"
          ></div>
        </div>
      </Link>
    </motion.div>
  )
}
