import { useMemo } from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Memoize expensive calculations
export const useCalculatePosition = (
  currentX: number,
  directionX: number,
  windowWidth: number,
  imageSize: number
) => {
  return useMemo(() => {
    const buffer = imageSize * 0.5
    let newX = currentX + directionX * 0.5 // Speed constant

    if (directionX > 0 && newX >= windowWidth + buffer) {
      newX = -imageSize - buffer
    } else if (directionX < 0 && newX <= -imageSize - buffer) {
      newX = windowWidth + buffer
    }

    return Math.round(newX * 100) / 100
  }, [currentX, directionX, windowWidth, imageSize])
}

// Other optimized utility functions
export const memoizedUtils = {
  calculateNewPosition: (x: number, dx: number) =>
    Math.round((x + dx) * 100) / 100,
  // Add other utility functions here
}
