"use client"

import { useScroll, useTransform, motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-20%" })
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])

  const cameraAnimation = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1], // custom ease
      },
    },
  }

  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const socialLinksAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const linkAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="mt-[100vh]">
      <motion.footer
        ref={ref}
        className="relative w-full h-screen flex items-center justify-center"
        style={{
          background: "rgb(0, 0, 0)",
        }}
      >
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
            y: backgroundY,
          }}
        />

        {/* Content Container */}
        <motion.div
          className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center"
          style={{ y: textY, opacity }}
        >
          {/* Main Content */}
          <div className="space-y-2">
            {/* Camera Icon */}
            <motion.div
              className={`relative mx-auto mb-4 
                ${isMobile ? "w-48 h-48 -mt-40" : "w-96 h-96 -mt-80"}`}
              variants={cameraAnimation}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Image
                src="/camera.png"
                alt="Camera"
                fill
                className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                priority
              />
            </motion.div>

            <div className={`space-y-5 ${isMobile ? "mt-8" : "mt-0"}`}>
              <motion.h2
                className={`font-bold text-white
                  ${isMobile ? "text-4xl" : "text-5xl"}`}
                variants={textAnimation}
                custom={0.4}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                Donny
              </motion.h2>

              <motion.p
                className={`text-white/80 max-w-2xl mx-auto
                  ${isMobile ? "text-lg px-4" : "text-xl"}`}
                variants={textAnimation}
                custom={0.6}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                Capturing moments, creating memories, and sharing stories
                through the lens.
              </motion.p>

              {/* Social Links */}
              <motion.div
                className={`flex justify-center
                  ${isMobile ? "gap-4 flex-wrap px-4" : "gap-8"}`}
                variants={socialLinksAnimation}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {["Instagram", "Twitter", "Contact"].map((link, index) => (
                  <motion.div key={link} variants={linkAnimation}>
                    <Link
                      href={
                        link === "Contact"
                          ? "mailto:your@email.com"
                          : `https://${link.toLowerCase()}.com`
                      }
                      className={`text-white/60 hover:text-white transition-colors
                        ${isMobile ? "text-base" : "text-lg"}`}
                      target="_blank"
                    >
                      {link}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Copyright */}
              <motion.p
                className={`text-white/40 pt-2
                  ${isMobile ? "text-sm" : "text-base"}`}
                variants={textAnimation}
                custom={1.2}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                © {new Date().getFullYear()} Donny. All rights reserved.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
      </motion.footer>
    </div>
  )
}
