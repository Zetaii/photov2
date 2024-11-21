export interface PhotoCategory {
  id: string
  title: string
  coverImage: string
  initialPosition: { x: number; y: number }
  direction: { x: number; y: number }
  albumId: string // Added to link to album
}

export interface Album {
  id: string
  title: string
  description: string
  coverImage: string
  images: {
    id: string
    title: string
    url: string
  }[]
}
