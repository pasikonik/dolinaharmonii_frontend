// types/directus.ts

// Standardowa odpowiedź Directusa
export interface DirectusResponse<T> {
  data: T
}

export interface Workshop {
  id: string
  status: 'published' | 'draft' | 'archived'
  title: string
  slug: string
  start_date: string
  end_date: string
  price: number
  capacity: number
  spots_taken: number
  short_description: string
  description: string
  cover_image: string // UUID pliku
  gallery: Array<string | { directus_files_id: string }>
  meta_title?: string
  meta_description?: string
  category: Category | string // string gdy nie ma fields expansion
  instructors: { instructors_id: Instructor }[] // junction table
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
}

export interface Instructor {
  id: string
  name: string
  slug: string
  role?: string
  bio?: string
  photo?: string
  email?: string
  phone?: string
  website?: string
  instagram?: string
  facebook?: string
}

// Singleton — kolekcja "prices" w Directus
export interface Pricing {
  id: number
  // Duży Dom — pokoje (cena od X zł / pokój / noc)
  forest_room: number    // Pokój Leśny (2-os.)
  sun_room: number       // Pokój Słoneczny (3-os.)
  flower_room: number    // Pokój Kwiecisty (2/3-os.)
  ethnic_room: number    // Pokój Etniczny (2-os.)
  magic_room: number     // Pokój Magiczny (5/6-os.)
  // Osobne obiekty
  forest_house: number   // Leśny Domek
  studio_room: number    // Studio z oranżerią
}

export const DEFAULT_PRICING: Pricing = {
  id: 1,
  forest_room: 320,
  sun_room: 380,
  flower_room: 360,
  ethnic_room: 340,
  magic_room: 580,
  forest_house: 580,
  studio_room: 480,
}