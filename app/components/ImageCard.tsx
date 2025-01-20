"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { memo, useRef } from "react"

interface ImageCardProps {
  id: string
  title: string
  coverImage: string
  hoveredId: string | null
  onHover: (id: string) => void
  initialX: number
  row: number
}

const ImageCard = memo(function ImageCard({
  id,
  title,
  coverImage,
  hoveredId,
  onHover,
  initialX,
  row,
}: ImageCardProps) {
  const isHovered = hoveredId === id
  const ref = useRef(null)
  const isInView = useInView(ref, {
    margin: "100px 0px",
    once: true,
    amount: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      className="absolute w-[400px] aspect-[4/5]"
      style={{
        top: `${row * 600}px`,
        zIndex: isHovered ? 10 : 1,
      }}
      initial={{ x: initialX, opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0, x: initialX }}
      onMouseEnter={() => onHover(id)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/album/${id}`} className="block w-full h-full group">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-800">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="400px"
            className="object-cover transition-all duration-300 group-hover:scale-105"
            priority={row === 0}
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
})

export default ImageCard
