import { ANIMATION_SETTINGS } from "@/app/constants/index"

export const calculateNewPosition = (
  currentX: number,
  directionX: number,
  windowWidth: number
) => {
  const buffer = ANIMATION_SETTINGS.imageSize * 0.02
  const speed =
    ANIMATION_SETTINGS.minSpeed +
    Math.random() * (ANIMATION_SETTINGS.maxSpeed - ANIMATION_SETTINGS.minSpeed)
  let newX = currentX + directionX * speed

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
