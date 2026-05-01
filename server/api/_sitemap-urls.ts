export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const headers: Record<string, string> = {}
  if (config.directusToken) {
    headers.Authorization = `Bearer ${config.directusToken}`
  }

  try {
    const data = await $fetch<{ data: Array<{ slug: string }> }>(
      `${config.public.directusUrl}/items/workshops`,
      {
        headers,
        params: {
          fields: 'slug',
          'filter[status][_eq]': 'published',
        },
      },
    )
    return data.data.map(w => ({
      loc: `/warsztaty/${w.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
    }))
  } catch {
    return []
  }
})
