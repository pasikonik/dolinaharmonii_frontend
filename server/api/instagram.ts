export default defineEventHandler(async () => {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    return { live: false, posts: [] }
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=6&access_token=${token}`,
    )
    const data = await res.json()

    if (data.error) {
      return { live: false, posts: [] }
    }

    const posts = (data.data as any[])
      .filter(p => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM' || p.thumbnail_url)
      .slice(0, 6)
      .map(p => ({
        id: p.id,
        img: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
        caption: p.caption?.slice(0, 140) ?? '',
        url: p.permalink,
      }))

    return { live: true, posts }
  }
  catch {
    return { live: false, posts: [] }
  }
})
