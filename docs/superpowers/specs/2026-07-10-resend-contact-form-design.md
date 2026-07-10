# Contact form → Resend integration

**Date:** 2026-07-10
**Status:** Approved (design)

## Goal

Wire the site's contact form up to Resend so submissions are delivered by
email to **dolinaharmonii@gmail.com**. API keys will be added later by the
owner; the code must be complete and functional the moment a key is present.

## Scope

- **In scope:** the single real form, `app/components/ContactForm.vue`
  (homepage `#rezerwacja` anchor). Fields: `name`, `email`, `topic` (select),
  `message`.
- **Out of scope:** the many `mailto:` CTAs elsewhere in the app ("Napisz do
  nas", "Zapytaj o termin", instructor contact, etc.) stay as plain `mailto:`
  links. The `harmoniakultury@gmail.com` link on the fundacja page is
  untouched.

## Approach

Chosen: **Nitro server route + Resend REST API via `fetch`** (no new npm
dependency). This mirrors the existing `server/api/instagram.ts` pattern
(raw `fetch` + environment variable) and keeps the dependency footprint at
zero. The Resend send is a single JSON `POST`.

Rejected: the official `resend` npm SDK (adds a dependency to wrap one HTTP
call) and a dedicated Nuxt email module (overkill).

## Data flow

```
ContactForm.vue  --POST /api/contact-->  server/api/contact.post.ts
                                              |
                                              |-- validate payload
                                              |-- honeypot check
                                              |-- POST https://api.resend.com/emails
                                              v
                                         Resend  --->  dolinaharmonii@gmail.com
                                                        (reply_to = guest email)
      <--- { ok: true } | 400 | 500 ---
```

## Components

### 1. Server endpoint — `server/api/contact.post.ts` (new)

Nitro handler (`defineEventHandler`) accepting `POST` only.

**Request body (JSON):**

| Field     | Type   | Notes                                             |
|-----------|--------|---------------------------------------------------|
| `name`    | string | required, 1–200 chars                             |
| `email`   | string | required, must match a basic email regex          |
| `topic`   | string | required, one of the form's select values         |
| `message` | string | required, 1–5000 chars                            |
| `company` | string | **honeypot** — must be empty; hidden from humans   |

**Behaviour:**

1. Read and trim the body.
2. **Honeypot:** if `company` is non-empty, return `{ ok: true }` and send
   nothing (silently drop the bot).
3. **Validation:** enforce required fields, email format, and length caps. On
   failure return HTTP `400` with `{ ok: false, error: 'invalid' }`.
4. **Config:** read `resend.apiKey`, `resend.from`, `resend.to` from
   `useRuntimeConfig(event)`. If `apiKey` or `from` is empty, log a clear
   server-side warning and return HTTP `500` (`{ ok: false, error: 'config' }`).
5. **Send:** `POST https://api.resend.com/emails` with header
   `Authorization: Bearer <apiKey>` and JSON body:
   - `from`: `resend.from`
   - `to`: `resend.to` (default `dolinaharmonii@gmail.com`)
   - `reply_to`: the guest's `email`
   - `subject`: `Nowa wiadomość z formularza — <topic label>`
   - `text` and `html`: name, email, topic (mapped to a human-readable PL
     label), and message. `html` escapes user input.
6. On a non-2xx Resend response, log the status/body and return `500`. On
   success return `{ ok: true }`.

Topic value→label map (PL) lives in the handler:
`indywidualny → Pobyt indywidualny`, `grupowy → Pobyt grupowy`,
`duzy-dom → Duży Dom`, `lesny-domek → Leśny Domek`, `studio → Studio z oranżerią`,
`inne → Inne`. Unknown values fall back to the raw value.

### 2. Config — `nuxt.config.ts`

Add a private (server-only) `runtimeConfig.resend` block:

```ts
runtimeConfig: {
  resend: {
    apiKey: process.env.RESEND_API_KEY ?? '',
    from:   process.env.RESEND_FROM ?? '',                 // set later, needs a verified domain
    to:     process.env.RESEND_TO ?? 'dolinaharmonii@gmail.com',
  },
  public: {
    directusUrl,
  },
},
```

These keys are **not** under `public`, so they never reach the browser.

### 3. Env docs — `.env.example`

Append, with comments:

```
# Resend (contact form email)
RESEND_API_KEY=
RESEND_FROM=          # e.g. formularz@twojadomena.pl — must be a Resend-verified domain
RESEND_TO=dolinaharmonii@gmail.com
```

### 4. Client — `app/components/ContactForm.vue`

- Replace the fake `setTimeout` stub in `handleSubmit` with a real call:
  `await $fetch('/api/contact', { method: 'POST', body: form.value })`.
- On resolve → `status = 'sent'` and reset the form fields.
- On reject → `status = 'error'` (the bilingual error UI already exists and
  was previously unreachable).
- Add a visually-hidden **honeypot** input bound to a new `company` field
  (e.g. off-screen, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden`).
- No visual redesign; existing labels, placeholders, and states are kept.

## Error handling

| Condition                         | Server response          | User sees            |
|-----------------------------------|--------------------------|----------------------|
| Valid submit, Resend OK           | `200 { ok: true }`       | Success card         |
| Honeypot filled                   | `200 { ok: true }`       | Success card (no email sent) |
| Missing/invalid fields            | `400 { ok:false }`       | Error alert          |
| Missing API key / from address    | `500 { ok:false }`       | Error alert          |
| Resend API error / network fail   | `500 { ok:false }`       | Error alert          |

## Testing

- **No-key path (self-verifiable now):** with `RESEND_API_KEY` unset, a submit
  returns `500` and the form displays its error state — proves the full
  client→endpoint→config wiring without sending anything.
- **Validation:** a request missing a field or with a bad email returns `400`.
- **Honeypot:** a request with `company` filled returns `200` and sends nothing.
- **Real send (needs owner's key):** once `RESEND_API_KEY` and a verified
  `RESEND_FROM` are set, a submit lands in dolinaharmonii@gmail.com with
  `reply_to` set to the guest so a plain "reply" reaches them.

## Notes / follow-ups

- Resend cannot send "from" the guest's Gmail address; that's why `from` is a
  verified-domain address and the guest's address goes in `reply_to`.
- If spam ever gets through the honeypot, a rate limit or captcha can be added
  later — out of scope now.
