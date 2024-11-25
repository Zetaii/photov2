"use client"

import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ANIMATION_SETTINGS } from "../constants"
import { useState, memo, useEffect, useRef, useMemo } from "react"

interface ImageCardProps {
  id: string
  title: string
  coverImage: string
  initialPosition: { x: number; y: number }
  direction: { x: number; y: number }
  hoveredId: string | null
  onHover: (id: string) => void
}

const ImageCard = memo(function ImageCard({
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
  const [isMounted, setIsMounted] = useState(false)
  const controls = useAnimation()
  const positionRef = useRef(initialPosition)

  // Memoize buffer size
  const BUFFER_SIZE = useMemo(() => ANIMATION_SETTINGS.imageSize * 0.5, [])

  // Handle mounting
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isMounted) return

    let animationFrameId: number

    const animate = () => {
      let newX = positionRef.current.x + direction.x * ANIMATION_SETTINGS.speed

      // Handle wrap-around with buffer zones
      if (direction.x > 0) {
        // Moving right
        if (newX >= window.innerWidth + BUFFER_SIZE) {
          // When completely off screen to the right
          newX = -ANIMATION_SETTINGS.imageSize - BUFFER_SIZE
        }
      } else if (direction.x < 0) {
        // Moving left
        if (newX <= -ANIMATION_SETTINGS.imageSize - BUFFER_SIZE) {
          // When completely off screen to the left
          newX = window.innerWidth + BUFFER_SIZE
        }
      }

      positionRef.current = {
        x: newX,
        y: positionRef.current.y,
      }

      try {
        controls.set(positionRef.current)
      } catch (error) {
        // Silently handle any errors
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [controls, direction.x, isMounted, BUFFER_SIZE])

  if (!isMounted) return null

  return (
    <motion.div
      animate={controls}
      initial={initialPosition}
      style={{
        position: "absolute",
        width: ANIMATION_SETTINGS.imageSize,
        height: ANIMATION_SETTINGS.imageSize,
        willChange: "transform",
      }}
      onMouseEnter={() => onHover(id)}
    >
      <motion.div
        animate={{
          scale: isHovered ? ANIMATION_SETTINGS.hoverScale : 1,
          zIndex: isHovered ? 9999 : 1,
        }}
        transition={{
          scale: {
            duration: ANIMATION_SETTINGS.transitionDuration,
            ease: "easeOut",
          },
        }}
        className="relative w-full h-full"
      >
        <Link href={`/album/${id}`} className="block w-full h-full group">
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-800">
            <Image
              src={coverImage}
              alt={title}
              width={ANIMATION_SETTINGS.imageSize}
              height={ANIMATION_SETTINGS.imageSize}
              className={`object-cover w-full h-full transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={(event) => {
                const target = event.target as HTMLImageElement
                if (target.complete) {
                  setIsLoaded(true)
                }
              }}
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
            >
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
})

export default ImageCard
