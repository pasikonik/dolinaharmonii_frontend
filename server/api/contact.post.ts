// Contact form → Resend. Delivers submissions from ContactForm.vue by email.
// Config (server-only) lives in runtimeConfig.resend — see nuxt.config.ts.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)

  // Bot filled the hidden field — pretend success, send nothing.
  if (typeof body?.company === 'string' && body.company.trim()) {
    return { ok: true }
  }

  // 5 messages per hour per visitor (counted before validation, so junk requests count too).
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (isRateLimited(ip, 5, 60 * 60 * 1000)) {
    throw createError({ statusCode: 429, statusMessage: 'rate', data: { ok: false, error: 'rate' } })
  }

  const input = parseContact(body)
  if (!input) {
    throw createError({ statusCode: 400, statusMessage: 'invalid', data: { ok: false, error: 'invalid' } })
  }
  const { name, email, topic, message } = input

  const { resend } = useRuntimeConfig(event)

  if (!resend.apiKey || !resend.from) {
    console.warn('[contact] Missing RESEND_API_KEY or RESEND_FROM — cannot send contact email.')
    throw createError({ statusCode: 500, statusMessage: 'config', data: { ok: false, error: 'config' } })
  }

  const topicLabel = TOPIC_LABELS[topic]!

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
