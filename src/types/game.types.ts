export interface GameGenre {
  id: string
  name: string
  image_background: string
}

export interface Game {
  id: number
  name: string
  background_image: string
  released: string
  description: string
  rating: number
  genres: GameGenre[]
}

