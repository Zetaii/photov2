export interface PhotoCategory {
  id: string
  title: string
  coverImage: string
  initialPosition: { x: number; y: number }
  direction: { x: number; y: number }
}

export const INITIAL_CATEGORIES: PhotoCategory[] = [
  {
    id: "winter",
    title: "Winter",
    coverImage: "https://images.unsplash.com/photo-1418985991508-e47386d96a71",
    initialPosition: { x: 150, y: 0 },
    direction: { x: 0.3, y: 0 },
  },
  {
    id: "portraits",
    title: "Portraits",
    coverImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    initialPosition: { x: 400, y: 110 },
    direction: { x: -0.4, y: 0 },
  },
  {
    id: "abstract",
    title: "Abstract",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab",
    initialPosition: { x: 50, y: 200 },
    direction: { x: 0.8, y: 0 },
  },
  {
    id: "nature",
    title: "Nature",
    coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    initialPosition: { x: 200, y: 400 },
    direction: { x: 1.2, y: 0 },
  },
  {
    id: "urban",
    title: "Urban",
    coverImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    initialPosition: { x: 200, y: -40 },
    direction: { x: 0.9, y: 0 },
  },
  {
    id: "landscape",
    title: "Landscape",
    coverImage: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    initialPosition: { x: 350, y: 500 },
    direction: { x: -1.3, y: 0 },
  },
  {
    id: "wildlife",
    title: "Wildlife",
    coverImage: "https://images.unsplash.com/photo-1456926631375-92c8ce872def",
    initialPosition: { x: 500, y: 175 },
    direction: { x: 1.4, y: 0 },
  },
  {
    id: "street",
    title: "Street",
    coverImage: "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45",
    initialPosition: { x: 900, y: 425 },
    direction: { x: 1.3, y: 0 },
  },
  {
    id: "night",
    title: "Night",
    coverImage:
      "https://images.unsplash.com/photo-1507400492013-162706c8c05e?q=80",
    initialPosition: { x: 950, y: 425 },
    direction: { x: -1.5, y: 0 },
  },
  {
    id: "minimalist",
    title: "Minimalist",
    coverImage:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80",
    initialPosition: { x: 600, y: 225 },
    direction: { x: -1.1, y: 0 },
  },
  {
    id: "aerial",
    title: "Aerial",
    coverImage:
      "https://images.unsplash.com/photo-1488747279002-c8523379faaa?q=80",
    initialPosition: { x: 1250, y: 125 },
    direction: { x: 1.0, y: 0 },
  },
  {
    id: "macro",
    title: "Macro",
    coverImage:
      "https://images.unsplash.com/photo-1550159930-40066082a4fc?q=80",
    initialPosition: { x: 750, y: 25 },
    direction: { x: 0.9, y: 0 },
  },
  {
    id: "food",
    title: "Food",
    coverImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80",
    initialPosition: { x: 400, y: 175 },
    direction: { x: -1.2, y: 0 },
  },
  {
    id: "travel",
    title: "Travel",
    coverImage:
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80",
    initialPosition: { x: 900, y: 275 },
    direction: { x: -0.8, y: 0 },
  },
  {
    id: "underwater",
    title: "Underwater",
    coverImage:
      "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80",
    initialPosition: { x: 300, y: 75 },
    direction: { x: 1.3, y: 0 },
  },
  {
    id: "ocean",
    title: "Ocean",
    coverImage:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80",
    initialPosition: { x: 250, y: 175 },
    direction: { x: 1.6, y: 0 },
  },
]
