# Dolina Harmonii — frontend

Strona ośrodka warsztatowego w Kopańcu (Góry Izerskie). Nuxt 4 + Vue 3, treść z Directusa.

## Stack

- **Nuxt 4** (Vue 3, Vite, TypeScript)
- **Directus** jako headless CMS (warsztaty, kategorie, prowadzący)
- **@nuxt/image** z providerem `directus`
- **@nuxt/icon**, **@nuxt/ui**

## Wymagania

- Node 20+
- pnpm

## Setup

```bash
cp .env.example .env       # i uzupełnij DIRECTUS_URL, DIRECTUS_TOKEN
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

## Struktura

```
app/
  components/        # AppNav, AppFooter, ContactForm, DhIcon
  composables/       # useDirectus, useScrollReveal
  layouts/           # default
  pages/
    index.vue
    warsztaty/
      index.vue      # lista + filtry
      [slug].vue     # szczegóły warsztatu (z Directusa)
    noclegi/
      duzy-dom.vue
  router.options.ts  # scroll behavior dla anchorów
  app.vue
types/directus.ts    # interfejsy Workshop, Category, Instructor
public/              # zdjęcia .avif
```

## Zmienne środowiskowe

| Zmienna          | Skąd            | Do czego                                                |
|------------------|-----------------|---------------------------------------------------------|
| `DIRECTUS_URL`   | publiczna       | bazowy URL Directusa (`runtimeConfig.public`)           |
| `DIRECTUS_TOKEN` | server-only     | token do API Directusa (jeśli pobieranie wymaga auth)   |

## Konwencje

- Aliasy: `~/` → `app/`, `~~/` → root projektu (typy w `types/` importujemy `~~/types/...`).
- Klasa `.reveal` w szablonach jest aktywowana przez `useScrollReveal()`.
- Linki anchorowe (`/#noclegi`) działają dzięki `router.options.ts`.
