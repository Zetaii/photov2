"use client"

import { ReactNode, useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import { usePathname } from "next/navigation"

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Assign lenis to window for global access
    ;(window as any).lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Reset scroll position on route change
    lenis.scrollTo(0, { immediate: true })

    return () => {
      lenis.destroy()
    }
  }, [pathname]) // Add pathname as dependency

  return <>{children}</>
}
