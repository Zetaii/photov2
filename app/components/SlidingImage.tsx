import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { calculateNewPosition } from "@/lib/animations"

interface SlidingImageProps {
  id: string
  title: string
  coverImage: string
  initialX: number
  initialY: number
  direction: { x: number; y: number }
  windowWidth: number
  isTopLayer: boolean
  onHover: (id: string) => void
}

export const SlidingImage = ({
  id,
  title,
  coverImage,
  initialX,
  initialY,
  direction,
  windowWidth,
  isTopLayer,
  onHover,
}: SlidingImageProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const controls = useAnimation()

  useEffect(() => {
    let animationFrameId: number
    const animate = () => {
      setPosition((prev) => {
        const newPosition = calculateNewPosition(
          prev.x,
          direction.x,
          windowWidth
        )
        return {
          x: newPosition.x,
          y: prev.y,
        }
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [direction.x, windowWidth])

  return (
    <motion.div
      className="absolute w-[400px] aspect-[4/5]"
      style={{
        x: position.x,
        y: position.y,
        zIndex: isTopLayer ? 50 : 1,
      }}
      animate={controls}
      onMouseEnter={() => onHover(id)}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      <Link href={`/album/${id}`} className="block w-full h-full group">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-800">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="400px"
            className="object-cover transition-all duration-300 group-hover:scale-105"
            priority
            quality={80}
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
  )
}
