# Dolina Harmonii — frontend

Strona ośrodka warsztatowego w Kopańcu (Góry Izerskie). Nuxt 4 + Vue 3, treść z Directusa.

## Stack

- **Nuxt 4** (Vue 3, Vite, TypeScript)
- **Directus** jako headless CMS (warsztaty, kategorie, prowadzący)
- **@nuxtjs/sitemap**, **Resend** (formularz kontaktowy)
- **Vitest** (testy)

## Wymagania

- Node 20+
- pnpm

## Setup

```bash
cp .env.example .env       # i uzupełnij DIRECTUS_URL oraz RESEND_*
pnpm install
pnpm dev                    # http://localhost:3000
```

## Skrypty

| Komenda           | Co robi                                    |
|-------------------|--------------------------------------------|
| `pnpm dev`        | dev serwer z HMR                           |
| `pnpm build`      | build produkcyjny (.output)                |
| `pnpm generate`   | static export                              |
| `pnpm preview`    | podgląd produkcyjnego buildu               |
| `pnpm typecheck`  | sprawdzenie typów (`nuxt typecheck`)       |
| `pnpm test`       | testy (Vitest)                             |

## Struktura

```
app/
  components/        # AppNav, AppFooter, ContactForm, DhIcon
  composables/       # useDirectus, useLang, useScrollReveal
  utils/             # dates (kalendarz, czas trwania), jsonLd
server/
  api/               # contact.post (Resend), _sitemap-urls
  utils/             # walidacja formularza, rate limit
tests/               # vitest
  layouts/           # default
  pages/
    index.vue
    warsztaty/
      index.vue      # lista + filtry
      [slug].vue     # szczegóły warsztatu (z Directusa)
    noclegi/           # duzy-dom, lesny-domek, studio-z-oranzeria
  router.options.ts  # scroll behavior dla anchorów
  app.vue
types/directus.ts    # interfejsy Workshop, Category, Instructor
public/              # zdjęcia .avif
```

## Design System

Projekt korzysta z systemu designu opisanego w `app/assets/css/main.css`. Oparty jest o zmienne CSS (CSS variables), co ułatwia zarządzanie spójnością wizualną.

### Kolory (Tokens)

- **Tło:** `--bg-primary` (główne), `--bg-section` (kremowe), `--bg-sage` (szałwiowe), `--bg-card` (białe kart)
- **Tekst:** `--text-main` (główny), `--text-muted` (wyciszony)
- **Marka i Akcenty:** `--brand-primary`, `--brand-deep` (ciemne zielenie), `--accent-earth` (ziemisty, linki)
- **CTA:** `--cta-main` (żółty/złoty), `--cta-main-hover`

### Typografia

- **Serif (Nagłówki):** Lora (`--serif`) — nagłówki `h1` - `h5`
- **Sans (Tekst):** Inter (`--sans`) — tekst główny, elementy UI

### Użyteczne klasy (Utilities)

- `.container` — kontener strony (`max-width: 1240px`)
- `.eyebrow` — wyróżniony mały tekst nad nagłówkami
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-glass` — style przycisków
- `.chip` — etykiety / tagi
- `section.cream`, `section.sage`, `section.tight` — modyfikatory dla sekcji
- `.section-head` — nagłówek sekcji z opisem

## Zmienne środowiskowe

| Zmienna          | Skąd            | Do czego                                                |
|------------------|-----------------|---------------------------------------------------------|
| `DIRECTUS_URL`   | publiczna       | bazowy URL Directusa (`runtimeConfig.public`)           |
| `RESEND_API_KEY` | server-only     | klucz Resend do wysyłki formularza kontaktowego         |
| `RESEND_FROM`    | server-only     | nadawca (domena zweryfikowana w Resend)                 |
| `RESEND_TO`      | server-only     | adres, na który trafiają wiadomości                     |

`DIRECTUS_URL` jest wymagany przy `pnpm build` (build się nie uda bez niego). Zmienne `RESEND_*` są wczytywane przy buildzie;
w runtime można je nadpisać przez `NUXT_RESEND_API_KEY`, `NUXT_RESEND_FROM`, `NUXT_RESEND_TO`.

## Konwencje

- Aliasy: `~/` → `app/`, `~~/` → root projektu (typy w `types/` importujemy `~~/types/...`).
- Klasa `.reveal` w szablonach jest aktywowana przez `useScrollReveal()`.
- Linki anchorowe (`/#noclegi`) działają dzięki `router.options.ts`.

## Deploy

Push do `main` uruchamia GitHub Actions: testy, typecheck i build, a potem SSH na serwer. Serwer buduje do `.output-new`,
podmienia `.output` i robi `pm2 reload` (bez przestoju). Zalecane: w nginx dodać `limit_req` dla `/api/contact`
(aplikacja ma też własny limit 5 wiadomości / godzinę / IP, liczony osobno w każdym procesie pm2).
