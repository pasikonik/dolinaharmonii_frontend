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
  gallery: string[]
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
  bio?: string
  photo?: string
  email?: string
  phone?: string
  website?: string
  instagram?: string
  facebook?: string
}