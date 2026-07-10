// Contact form → Resend. Delivers submissions from ContactForm.vue by email.
// Config (server-only) lives in runtimeConfig.resend — see nuxt.config.ts.

interface ContactBody {
  name?: string
  email?: string
  topic?: string
  message?: string
  company?: string // honeypot — must stay empty
}

const TOPIC_LABELS: Record<string, string> = {
  'indywidualny': 'Pobyt indywidualny',
  'grupowy': 'Wynajem dla grupy / warsztat',
  'duzy-dom': 'Duży Dom',
  'lesny-domek': 'Leśny Domek',
  'studio': 'Studio z oranżerią',
  'inne': 'Inne',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)

  const name = (body?.name ?? '').trim()
  const email = (body?.email ?? '').trim()
  const topic = (body?.topic ?? '').trim()
  const message = (body?.message ?? '').trim()
  const honeypot = (body?.company ?? '').trim()

  // Bot filled the hidden field — pretend success, send nothing.
  if (honeypot) {
    return { ok: true }
  }

  // Validation
  const valid =
    name.length >= 1 && name.length <= 200 &&
    EMAIL_RE.test(email) && email.length <= 320 &&
    topic.length >= 1 && topic.length <= 100 &&
    message.length >= 1 && message.length <= 5000

  if (!valid) {
    throw createError({ statusCode: 400, statusMessage: 'invalid', data: { ok: false, error: 'invalid' } })
  }

  const { resend } = useRuntimeConfig(event)

  if (!resend.apiKey || !resend.from) {
    console.warn('[contact] Missing RESEND_API_KEY or RESEND_FROM — cannot send contact email.')
    throw createError({ statusCode: 500, statusMessage: 'config', data: { ok: false, error: 'config' } })
  }

  const topicLabel = TOPIC_LABELS[topic] ?? topic

  const text =
    `Nowa wiadomość z formularza kontaktowego\n\n` +
    `Imię i nazwisko: ${name}\n` +
    `E-mail: ${email}\n` +
    `Temat: ${topicLabel}\n\n` +
    `Wiadomość:\n${message}\n`

  const html =
    `<h2>Nowa wiadomość z formularza kontaktowego</h2>` +
    `<p><strong>Imię i nazwisko:</strong> ${escapeHtml(name)}</p>` +
    `<p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>` +
    `<p><strong>Temat:</strong> ${escapeHtml(topicLabel)}</p>` +
    `<p><strong>Wiadomość:</strong></p>` +
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resend.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resend.from,
        to: resend.to,
        reply_to: email,
        subject: `Nowa wiadomość z formularza — ${topicLabel}`,
        text,
        html,
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error(`[contact] Resend responded ${res.status}: ${detail}`)
      throw createError({ statusCode: 500, statusMessage: 'send', data: { ok: false, error: 'send' } })
    }

    return { ok: true }
  }
  catch (err: unknown) {
    // Re-throw H3 errors (e.g. the 500 above) untouched; wrap anything else (network failure).
    if (err && typeof err === 'object' && 'statusCode' in err) throw err
    console.error('[contact] Failed to reach Resend:', err)
    throw createError({ statusCode: 500, statusMessage: 'send', data: { ok: false, error: 'send' } })
  }
})
