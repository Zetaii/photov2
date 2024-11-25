import { useMemo } from "react"
import { ANIMATION_SETTINGS } from "@/app/constants"

export const calculateNewPosition = (
  currentX: number,
  directionX: number,
  windowWidth: number
) => {
  const buffer = ANIMATION_SETTINGS.imageSize * 0.5
  let newX = currentX + directionX * ANIMATION_SETTINGS.speed

  if (directionX > 0 && newX >= windowWidth + buffer) {
    newX = -ANIMATION_SETTINGS.imageSize - buffer
  } else if (directionX < 0 && newX <= -ANIMATION_SETTINGS.imageSize - buffer) {
    newX = windowWidth + buffer
  }

  return {
    x: Math.round(newX * 100) / 100,
    y: currentX,
  }
}

export const getInitialVisibleCards = (
  categories: any[],
  windowWidth: number
) => {
  return categories
    .filter(
      (category) =>
        category.initialPosition.x >= -ANIMATION_SETTINGS.imageSize &&
        category.initialPosition.x <= windowWidth
    )
    .slice(0, 3)
    .map((c) => c.id)
}
