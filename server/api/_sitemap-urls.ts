export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  try {
    const data = await $fetch<{ data: Array<{ slug: string }> }>(
      `${config.public.directusUrl}/items/workshops`,
      {
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
