export const ANIMATION_SETTINGS = {
  speed: 0.5,
  interval: 1000 / 60,
  imageSize: 400,
  transitionDuration: 0.3,
  hoverScale: 1.05,
  bufferZone: 150,
  minSpeed: 0.4,
  maxSpeed: 0.5,
}

export const getRandomDirection = () => {
  return Math.random() > 0.5 ? 1 : -1
}

export const getRandomSpeed = () => {
  return (
    ANIMATION_SETTINGS.minSpeed +
    Math.random() * (ANIMATION_SETTINGS.maxSpeed - ANIMATION_SETTINGS.minSpeed)
  )
}
