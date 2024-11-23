"use client"
import Link from "next/link"

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md border-b border-white/5"
      style={{ zIndex: 50 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Empty header for now */}
      </div>
    </header>
  )
}
