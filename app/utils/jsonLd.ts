// JSON for an inline <script type="application/ld+json">. Escapes "<" so CMS text like "</script>" cannot close the tag.
export const jsonLd = (data: unknown): string => JSON.stringify(data).replace(/</g, '\\u003c')
