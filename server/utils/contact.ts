export const TOPIC_LABELS: Record<string, string> = {
  'indywidualny': 'Pobyt indywidualny',
  'grupowy': 'Wynajem dla grupy / warsztat',
  'duzy-dom': 'Duży Dom',
  'lesny-domek': 'Leśny Domek',
  'studio': 'Studio z oranżerią',
  'inne': 'Inne',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface ContactInput {
  name: string
  email: string
  topic: string
  message: string
}

// Returns the cleaned input, or null when anything is missing, too long or the topic is unknown.
export function parseContact(body: Record<string, unknown> | null | undefined): ContactInput | null {
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  const name = str(body?.name)
  const email = str(body?.email)
  const topic = str(body?.topic)
  const message = str(body?.message)

  const valid =
    name.length >= 1 && name.length <= 200 &&
    EMAIL_RE.test(email) && email.length <= 320 &&
    Object.hasOwn(TOPIC_LABELS, topic) &&
    message.length >= 1 && message.length <= 5000

  return valid ? { name, email, topic, message } : null
}
