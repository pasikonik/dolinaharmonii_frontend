// composables/useDirectus.ts
export function useDirectus() {
  const config = useRuntimeConfig()
  const baseURL = config.public.directusUrl

  // Główna funkcja fetch — wrapper na $fetch z bazowym URL
  async function get<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<T> {
    return $fetch<T>(`${baseURL}${endpoint}`, {
      params,
    })
  }

  // Warsztaty
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
      ].join(','),
      filter: {
        slug: { _eq: slug },
        status: { _eq: 'published' },
      },
      limit: 1,
    })
  }

  // Kategorie
  function getCategories() {
    return get<DirectusResponse<Category[]>>('/items/categories', {
      fields: '*',
      sort: 'name',
    })
  }

  // URL obrazka przez Directus Image API
  function getImageUrl(
    fileId: string,
    options: { width?: number; height?: number; format?: string; quality?: number } = {}
  ) {
    const params = new URLSearchParams()
    if (options.width) params.set('width', String(options.width))
    if (options.height) params.set('height', String(options.height))
    if (options.format) params.set('format', options.format || 'webp')
    if (options.quality) params.set('quality', String(options.quality || 80))

    return `${baseURL}/assets/${fileId}?${params.toString()}`
  }

  return {
    getWorkshops,
    getWorkshop,
    getCategories,
    getImageUrl,
  }
}