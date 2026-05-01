import type { Category, DirectusResponse, Pricing, Workshop } from '~~/types/directus'

interface ImageOptions {
  width?: number
  height?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
  quality?: number
}

export function useDirectus() {
  const config = useRuntimeConfig()
  const baseURL = config.public.directusUrl
  const token = config.directusToken

  const headers: Record<string, string> = {}
  if (token && import.meta.server) {
    headers.Authorization = `Bearer ${token}`
  }

  function get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    return $fetch<T>(`${baseURL}${endpoint}`, { params, headers })
  }

  function getWorkshops(params?: Record<string, unknown>) {
    return get<DirectusResponse<Workshop[]>>('/items/workshops', {
      fields: [
        '*',
        'category.id',
        'category.name',
        'category.slug',
        'category.icon',
        'instructors.instructors_id.id',
        'instructors.instructors_id.name',
        'instructors.instructors_id.photo',
      ].join(','),
      filter: { status: { _eq: 'published' } },
      sort: 'start_date',
      ...params,
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

  function getImageUrl(fileId: string, options: ImageOptions = {}) {
    const params = new URLSearchParams()
    if (options.width) params.set('width', String(options.width))
    if (options.height) params.set('height', String(options.height))
    params.set('format', options.format ?? 'webp')
    params.set('quality', String(options.quality ?? 80))

    const qs = params.toString()
    return `${baseURL}/assets/${fileId}${qs ? `?${qs}` : ''}`
  }

  return {
    getWorkshops,
    getWorkshop,
    getCategories,
    getPricing,
    getImageUrl,
  }
}
