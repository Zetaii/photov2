"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Footer() {
  return (
    <motion.footer
      className="w-full bg-white/10 border-t border-black/30 backdrop-blur-md"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        contain: "paint layout",
        transform: "translateZ(0)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex justify-center gap-8">
            {["Instagram", "@dotnny", "Contact"].map((link) => (
              <Link
                key={link}
                href={
                  link === "Contact"
                    ? "mailto:your@email.com"
                    : `https://${link.toLowerCase()}.com`
                }
                className="text-black/60 hover:text-black transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </Link>
            ))}
          </div>

          <p className="text-black/70 text-sm">
            © {new Date().getFullYear()} Donny. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
