import type { Category, DirectusResponse, MainGalleryItem, Pricing, RoomAvailability, Workshop } from '~~/types/directus'

interface ImageOptions {
  width?: number
  height?: number
  format?: 'avif' | 'webp' | 'jpg' | 'png'
  quality?: number
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
}

export function useDirectus() {
  const config = useRuntimeConfig()
  const baseURL = config.public.directusUrl

  function get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    return $fetch<T>(`${baseURL}${endpoint}`, { params }) as Promise<T>
  }

  function getWorkshops(params?: Record<string, unknown>) {
    return get<DirectusResponse<Workshop[]>>('/items/workshops', {
      fields: [
        '*',
        'category.id',
        'category.name',
        'category.slug',
        'instructors.instructors_id.id',
        'instructors.instructors_id.name',
        'instructors.instructors_id.photo',
      ].join(','),
      filter: { status: { _eq: 'published' } },
      sort: 'start_date',
      ...params,
    })
  }

  function getRoomAvailability(params?: Record<string, unknown>) {
    return get<DirectusResponse<RoomAvailability[]>>('/items/room_availability', {
      fields: 'id,start_date,end_date,source,room',
      limit: -1,
      sort: 'start_date',
      ...params,
    })
  }

  function getRoomAvailabilityInRange(from: string, to: string) {
    return getRoomAvailability({
      filter: {
        _and: [
          { start_date: { _lte: to } },
          { end_date: { _gte: from } },
        ],
      },
    })
  }

  function getWorkshop(slug: string) {
    return get<DirectusResponse<Workshop[]>>('/items/workshops', {
      fields: [
        '*',
        'category.*',
        'instructors.instructors_id.*',
        'gallery.directus_files_id',
      ].join(','),
      filter: {
        slug: { _eq: slug },
        status: { _eq: 'published' },
      },
      limit: 1,
    })
  }

  function getCategories() {
    return get<DirectusResponse<Category[]>>('/items/categories', {
      fields: '*',
      sort: 'name',
    })
  }

  function getPricing() {
    return get<DirectusResponse<Pricing>>('/items/prices')
  }

  function getMainGallery() {
    return get<DirectusResponse<MainGalleryItem[]>>('/items/main_gallery', {
      fields: 'id,sort,image,title,category',
      sort: 'sort,id',
      limit: -1,
    })
  }

  function getImageUrl(fileId: string, options: ImageOptions = {}) {
    const params = new URLSearchParams()
    if (options.width) params.set('width', String(options.width))
    if (options.height) params.set('height', String(options.height))
    if (options.fit) params.set('fit', options.fit)
    params.set('format', options.format ?? 'avif')
    params.set('quality', String(options.quality ?? 75))
    params.set('withoutEnlargement', 'true')

    return `${baseURL}/assets/${fileId}?${params.toString()}`
  }

  return {
    getWorkshops,
    getWorkshop,
    getCategories,
    getPricing,
    getImageUrl,
    getRoomAvailability,
    getRoomAvailabilityInRange,
    getMainGallery,
  }
}
