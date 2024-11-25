"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

export default function Footer() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])

  return (
    <motion.footer
      className="w-full bg-black/80 backdrop-blur-sm"
      style={{
        opacity,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "300px",
        zIndex: 40,
        contain: "layout paint",
        transform: "translateZ(0)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Preload text content */}
          <h2
            className="text-3xl font-bold text-white"
            style={{ contentVisibility: "auto" }}
          >
            Donny
          </h2>

          <p
            className="text-lg text-white/80 text-center max-w-2xl"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "0 50px", // Reserve space
            }}
          >
            Capturing moments, creating memories, and sharing stories through
            the lens.
          </p>

          <div className="flex justify-center gap-8">
            {["Instagram", "Twitter", "Contact"].map((link) => (
              <Link
                key={link}
                href={
                  link === "Contact"
                    ? "mailto:your@email.com"
                    : `https://${link.toLowerCase()}.com`
                }
                className="text-white/60 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </Link>
            ))}
          </div>

          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Donny. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
