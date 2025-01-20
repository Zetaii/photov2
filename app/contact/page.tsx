"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-8 pb-32 px-6 relative">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            <a href="/">DONNY</a>
          </h1>
          <h2 className="text-xl font-bold text-black mb-8">
            <a href="/contact">CONTACT</a>
          </h2>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Email</h2>
            <a
              href="mailto:dotnny@email.com"
              className="text-black hover:text-black transition-colors text-lg"
            >
              dotnny@email.com
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Phone</h2>
            <a
              href="tel:+1234567890"
              className="text-black hover:text-black transition-colors text-lg"
            >
              +1 (234) 567-890
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Social</h2>
            <a
              href="https://instagram.com/dotnny"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-black transition-colors text-lg"
            >
              Instagram @dotnny
            </a>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-black text-sm">
          Copyright © DOTNNY, All Rights Reserved.
        </p>
      </div>
    </div>
  )
}
