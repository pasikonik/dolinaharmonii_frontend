<script setup lang="ts">
const { t } = useLang()
const origin = useRequestURL().origin

useSeoMeta({
  title: 'Dojazd — Dolina Harmonii',
  description: 'Jak dotrzeć do Doliny Harmonii w Kopańcu. Dojazd samochodem i komunikacją publiczną, mapa, współrzędne GPS.',
  ogTitle: 'Dojazd — Dolina Harmonii',
  ogDescription: 'Jak dotrzeć do Doliny Harmonii w Kopańcu. Dojazd samochodem i komunikacją publiczną, mapa, współrzędne GPS.',
  ogUrl: `${origin}/dojazd`,
  ogImage: `${origin}/kopaniec.avif`,
})
</script>

<template>
  <div class="dojazd-page">

    <section class="dojazd-hero">
      <div class="container">
        <h1>{{ t('Jak do nas', 'How to') }} <em>{{ t('dotrzeć', 'reach us') }}</em>.</h1>
        <p class="addr">Kopaniec 69A · 58-512 Stara Kamienica · {{ t('Góry Izerskie', 'Izera Mountains') }}</p>
      </div>
    </section>

    <section class="dojazd-section">
      <div class="container">
        <div class="dojazd-grid">

          <div class="directions">
            <h2>{{ t('Dojazd', 'Getting here') }}</h2>
            <p>{{ t(
              'Samochodem najłatwiej od strony Jeleniej Góry w kierunku Szklarskiej Poręby — za tablicą Piechowice skręć w prawo, stamtąd 5 km.',
              'By car, head from Jelenia Góra towards Szklarska Poręba — turn right just past the Piechowice sign, then 5 km.'
            ) }}</p>
            <p>{{ t(
              'Pociągiem do stacji Piechowice (bezpośrednio z Wrocławia) lub Jelenia Góra, skąd busem Ro-Ko do Kopańca.',
              'By train to Piechowice station (direct from Wrocław) or Jelenia Góra, then Ro-Ko bus to Kopaniec.'
            ) }}</p>
            <div class="links">
              <a href="https://koleo.pl/rozklad-jazdy" target="_blank" rel="noopener">koleo.pl</a>
              <a href="http://ro-ko.pl/jelenia-gora-chromiec/" target="_blank" rel="noopener">ro-ko.pl</a>
            </div>
          </div>

          <div class="nav-card">
            <div class="nav-address">
              <div class="street">Kopaniec 69A</div>
              <div class="village">58-512 Stara Kamienica</div>
            </div>
            <a
              class="nav-btn"
              href="https://www.google.com/maps/dir/?api=1&destination=50.8827757,15.5621443"
              target="_blank"
              rel="noopener"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 11l19-9-9 19-2-8-8-2z"/>
              </svg>
              {{ t('Nawiguj — Google Maps', 'Navigate — Google Maps') }}
            </a>
          </div>

        </div>
      </div>
    </section>

    <div class="map-section">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2700.0!2d15.559569377085882!3d50.882775671678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f170!3m3!1m2!1s0x471645b096281c1f%3A0x3f1c5e255f4bb9f7!2sDolina%20Harmonii!5e0!3m2!1spl!2spl!4v1777922975447!5m2!1spl!2spl"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        :title="t('Dolina Harmonii na mapie', 'Dolina Harmonii on the map')"
      />
    </div>

  </div>
</template>

<style scoped>
.dojazd-hero {
  padding: 160px 0 64px;
  background: var(--brand-deep);
}
.dojazd-hero h1 {
  font-size: clamp(48px, 5.5vw, 80px);
  font-style: italic;
  font-weight: 500;
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: var(--bg-primary);
  margin: 0 0 20px;
}
.dojazd-hero h1 em { color: var(--cta-main); }
.dojazd-hero .addr {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(253,251,247,0.5);
  margin: 0;
}

.dojazd-section {
  padding: 80px 0;
  background: var(--bg-primary);
}
.dojazd-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 64px;
  align-items: start;
}

.directions h2 {
  font-size: 13px;
  font-family: var(--mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 400;
  margin: 0 0 20px;
}
.directions p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-main);
  margin: 0 0 16px;
}
.directions p:last-of-type { margin-bottom: 24px; }
.links {
  display: flex;
  gap: 16px;
}
.links a {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--brand-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--brand-light);
  transition: color .2s;
}
.links a:hover { color: var(--brand-deep); }

.nav-card {
  background: var(--bg-sage);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: 32px;
}
.nav-address {
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--line);
}
.nav-address .street {
  font-family: var(--serif);
  font-size: 28px;
  font-style: italic;
  color: var(--brand-primary);
  margin-bottom: 6px;
}
.nav-address .village {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: var(--r-pill);
  background: var(--brand-primary);
  color: var(--bg-primary);
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: background .2s;
  width: 100%;
  box-sizing: border-box;
}
.nav-btn:hover { background: var(--brand-deep); }

.map-section iframe {
  display: block;
  width: 100%;
  height: 440px;
  border: none;
  filter: saturate(0.85) contrast(1.05);
}

@media (max-width: 768px) {
  .dojazd-grid { grid-template-columns: 1fr; gap: 40px; }
  .map-section iframe { height: 300px; }
}
</style>
