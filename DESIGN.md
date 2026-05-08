# Dolina Harmonii — System Designu

Przewodnik po systemie designu projektu. Służy jako source of truth przy tworzeniu nowych widoków, komponentów i materiałów graficznych.

---

## Filozofia

Projekt łączy **estetykę natury** z **elegancją tradycji**. Charakter: ciepły, organiczny, spokojny. Nie minimalizm ani brutalizm — raczej **naturalne piękno z charakterem**.

Zasada 60-30-10:
- **60%** — kremowe tła (papier, ciepłe biele)
- **30%** — zieleń oliwna i brązy (struktura, nagłówki, nawigacja)
- **10%** — złoto (akcenty, CTA, detale)

---

## Kolory

### Tła
| Token | Hex | Użycie |
|---|---|---|
| `--bg-primary` | `#FDFBF7` | Główne tło strony (kremowy papier) |
| `--bg-section` | `#F5F1E6` | Sekcje `.cream` |
| `--bg-sage` | `#EFF1E7` | Sekcje `.sage` (delikatna szałwia) |
| `--bg-card` | `#FFFFFF` | Karty, pola formularzy |

### Brand — zieleń (30%)
| Token | Hex | Użycie |
|---|---|---|
| `--brand-primary` | `#556B2F` | Oliwkowa zieleń — przyciski, akcenty |
| `--brand-deep` | `#3A4B20` | Ciemna zieleń — hover, footer, nagłówki |
| `--brand-light` | `#8B9A67` | Jasna zieleń — tła chipów, ornamentów |

### Akcent — ziemia i brąz (30%)
| Token | Hex | Użycie |
|---|---|---|
| `--accent-earth` | `#6B4226` | Brązowy ziemisty — ikony, ornamenty |
| `--accent-earth-deep` | `#4A2D19` | Ciemny brąz — hover stanów brązowych |
| `--accent-sand` | `#BC987E` | Piasek — mocniejsze linie, bordery |

### Złoto / CTA (10%)
| Token | Hex | Użycie |
|---|---|---|
| `--cta-main` | `#D9AE56` | Złoto miodowe — główne przyciski CTA |
| `--cta-main-hover` | `#C39A45` | Hover złota |
| `--gold-muted` | `#B5893D` | Przyciemnione złoto na jasnych tłach |

### Tekst
| Token | Hex | Użycie |
|---|---|---|
| `--text-main` | `#3E3C32` | Główny tekst (ciepła czerń) |
| `--text-muted` | `#6B675A` | Tekst drugorzędny, opisy |

### Linie i bordery
| Token | Wartość | Użycie |
|---|---|---|
| `--line` | `#E5DECF` | Domyślne separatory i obramowania |
| `--line-strong` | `#BC987E` | Mocniejsze linie (= `--accent-sand`) |

### Kolory na ciemnym tle (sekcje brand-deep)
- Tekst główny: `#FAF8F2`
- Tekst muted: `rgba(250,248,242,0.65)`
- Linia: `rgba(250,248,242,0.15)`

---

## Typografia

### Fonty
```
--serif: 'Playfair Display', 'Lora', 'Cormorant Garamond', Georgia, serif
--sans:  'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
```

**Playfair Display** — nagłówki, cytaty, elementy dekoracyjne. Używany kursywą (`font-style: italic`) dla wyrazu.

**Montserrat** — interfejs, etykiety, przyciski, treść ciągła.

### Skala nagłówków
| Element | Rozmiar (fluid) | Weight | Styl |
|---|---|---|---|
| Hero `h1` / `.hero-tagline-main` | `clamp(36px, 4.2vw, 58px)` | 400 | serif, italic |
| `.hero-tagline-sub` | `clamp(18px, 2vw, 28px)` | 400 | serif, italic, 85% opacity |
| `h1` (strony wewnętrzne) | `clamp(48px, 6vw, 88px)` | 400 | serif, italic |
| `h2` | `clamp(34px, 4vw, 52px)` | 400 | serif, italic |
| `h3` | `clamp(24px, 2.4vw, 32px)` | 400 | serif, italic |
| `h4` | `20px` | 500 | sans |

### Tekst ciągły
- Rozmiar: `16px`
- Line-height: `1.65`
- Font: sans

### Eyebrow (etykieta sekcji)
```css
.eyebrow {
  font-family: var(--sans);
  font-size: 11px;           /* 12px na mobile */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--gold-muted);
}
```

---

## Spacing & Layout

### Kontener
```css
.container {
  max-width: 1240px;   /* --max-w */
  padding: 0 48px;     /* mobile: 0 24px */
}
```

### Sekcje
```css
section {
  padding: 120px 0;    /* .tight: 80px; mobile: 72px / 56px */
}
```

### Typowe przerwy w komponentach
| Kontekst | Gap |
|---|---|
| `.section-head` | `20px` |
| Przyciski CTA | `12px` |
| Hero tagline (main/sub) | `8px` |
| Ikona + tekst w inline | `8px` |
| Kolumny kart | `32-40px` |

---

## Border Radius

| Token | Wartość | Użycie |
|---|---|---|
| `--r-sm` | `10px` | Małe elementy (badge, tag) |
| `--r-md` | `22px` | Inputy, mniejsze karty |
| `--r-lg` | `36px` | Główne karty, sekcje wewnętrzne |
| `--r-xl` | `56px` | Duże bloki, hero media |
| `--r-pill` | `999px` | Przyciski, chipy, nawigacja |
| `--r-blob-1` | `64% 36% 58% 42% / 48% 60% 40% 52%` | Organiczne kształty dekoracyjne |
| `--r-blob-2` | `38% 62% 44% 56% / 60% 40% 60% 40%` | Wariant blob |
| `--r-blob-3` | `52% 48% 60% 40% / 55% 45% 55% 45%` | Wariant blob |

---

## Cienie

```css
--shadow-sm: 0 1px 2px rgba(85,107,47,.04), 0 2px 8px rgba(107,66,38,.06);
--shadow-md: 0 4px 14px rgba(85,107,47,.06), 0 14px 32px rgba(107,66,38,.10);
--shadow-lg: 0 8px 28px rgba(85,107,47,.08), 0 28px 70px rgba(107,66,38,.14);
```

Cienie mają dwie warstwy: zieloną i brązową — podkreślają ciepły, organiczny charakter.

---

## Komponenty

### Przyciski

Baza:
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 16px 28px;
  border-radius: var(--r-pill);
  transition: all .25s ease;
}
```

| Wariant | Tło | Tekst | Użycie |
|---|---|---|---|
| `.btn-primary` | `--brand-primary` (oliwka) | `--bg-primary` (krem) | Główna akcja |
| `.btn-gold` | `--cta-main` (złoto) | `--brand-deep` (ciemna zieleń) | Premium CTA |
| `.btn-secondary` | transparent | `--cta-main` | Drugorzędna akcja |
| `.btn-glass` | `rgba(253,251,247,0.15)` + blur | `#FDFBF7` | Na ciemnych/zdjęciowych tłach |

Hover wszystkich: `translateY(-1px)` + wzmocniony cień.

### Chipy / Tagi
```css
.chip {
  font-size: 12px;
  font-weight: 500;
  padding: 7px 14px;
  border-radius: var(--r-pill);
  background: rgba(139,154,103,0.18);
  color: var(--brand-deep);
  border: 1px solid rgba(139,154,103,0.3);
}
```

### Karty
```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);   /* 36px */
  box-shadow: var(--shadow-sm);
  transition: transform .35s ease, box-shadow .35s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
```

### Ornament / Dekoracja
```css
.ornament {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--accent-earth);
}
.ornament::before,
.ornament::after {
  content: '';
  width: 60px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}
```

### Nawigacja
- Pozycja: `fixed`, `top: 20px`, wyśrodkowana
- Kształt: pill (`border-radius: var(--r-pill)`)
- Tło: `rgba(253,251,247,0.92)` + `backdrop-filter: blur(14px)`
- Border: `1px solid rgba(188,152,126,0.35)` (accent-sand, 35%)
- Z-index: `50`
- Hamburger pojawia się przy `≤720px`

### Formularz
```css
input, textarea, select {
  font-size: 14px;
  padding: 14px;
  border: 1.5px solid var(--line);
  border-radius: var(--r-md);
  background: var(--bg-card);
}
input:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(85,107,47,.12);
}
```

---

## Sekcje i tła

### Warianty tła sekcji
| Klasa | Tło |
|---|---|
| (default) | `--bg-primary` (#FDFBF7) |
| `.cream` | `--bg-section` (#F5F1E6) |
| `.sage` | `--bg-sage` (#EFF1E7) |
| `.dark` / `.brand` | `--brand-deep` (#3A4B20) |

### Organiczne przejścia między sekcjami
Sekcje `.cream` i `.sage` używają pseudo-elementów `::before` / `::after` z `clip-path: ellipse(...)` (wysokość ~60px) do tworzenia płynnych, zakrzywionych przejść między tłami.

### Nagłówek sekcji
```html
<div class="section-head">
  <p class="eyebrow">Etykieta sekcji</p>
  <h2>Tytuł sekcji</h2>
  <p class="lede">Lead / opis (max-width: 580px, kolor muted)</p>
</div>
```

---

## Efekty specjalne

### Tekstura ziarna (grain)
Nakładka SVG z `feTurbulence` na całej stronie:
- `position: fixed`, `z-index: 1`
- `opacity: 0.4`, `mix-blend-mode: multiply`
- Tworzy organiczny efekt papieru / płótna

### Glassmorphism
Używany w nawigacji i mobilnym menu:
```css
backdrop-filter: blur(14px);
-webkit-backdrop-filter: blur(14px);
background: rgba(253,251,247,0.92);
```

### Reveal (scroll animation)
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .5s ease, transform .5s ease;
}
.reveal.in {
  opacity: 1;
  transform: translateY(0);
}
```
Wyłączone przy `prefers-reduced-motion: reduce`.

---

## Ikony (DhIcon)

Komponent `DhIcon` — własne SVG w stylu organicznym (odręczny "sketch"). Props: `name`, `size`, `stroke`.

Dostępne ikony:
`meditation` · `leaf` · `seed` · `craft` · `candle` · `herb` · `arrow` · `compass` · `star` · `bed` · `fireplace` · `kitchen` · `bath` · `tea` · `mountain` · `hands` · `list` · `grid` · `calendar`

---

## Breakpoints

| Breakpoint | Użycie |
|---|---|
| `≤1024px` | Tablet landscape — korekty gridów |
| `≤860px` | Tablet portrait — ukrycie nazwy marki w nav, layout 1-kolumnowy formularza |
| `≤768px` | Footer — 2 kolumny |
| `≤720px` | Mobile — hamburger, pełnoekranowe menu, redukcja paddingów |

---

## Dostępność

- Outline focus: `2px solid var(--brand-primary)`, `outline-offset: 2px` (przyciski: 3px)
- Hierarchia nagłówków: h1 → h5 (jeden h1 na stronę)
- Etykiety formularzy: `.sr-only` gdy brak widocznej etykiety
- ARIA: `aria-label`, `aria-required`, `aria-hidden`, `role="alert"` na błędach
- Animacje: wyłączone przy `prefers-reduced-motion: reduce`

---

## Internacjonalizacja

Projekt jest dwujęzyczny (PL/EN). Każdy tekst używa composable `useLang()`:

```js
t('Tekst po polsku', 'English text')
```

Przy tworzeniu nowych komponentów zawsze dodawaj wersję angielską.

---

## Stack techniczny

- **Framework:** Nuxt 3 (Vue 3)
- **Style:** Vanilla CSS (zmienne CSS, bez Tailwind)
- **Fonty:** Google Fonts (Playfair Display, Montserrat)
- **Ikony:** Własny komponent SVG `DhIcon`
- **CMS:** Directus (dane dynamiczne — ceny, warsztaty)
- **Obrazy:** Format AVIF, `aspect-ratio` + `object-fit: cover`
- **SEO:** Schema.org structured data (Hotel, LodgingBusiness)
