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

useScrollReveal({ rootMargin: '0px 0px -60px 0px' })
</script>

<template>
  <div class="dojazd-page">

    <!-- ── HERO ── -->
    <section class="dojazd-hero">
      <div class="container">
        <div class="inner">
          <span class="eyebrow">{{ t('Kopaniec · Góry Izerskie', 'Kopaniec · Izera Mountains') }}</span>
          <h1>{{ t('Jak do nas', 'How to') }} <em>{{ t('dotrzeć', 'reach us') }}</em>.</h1>
          <div class="dojazd-hero-sub">
            <span class="addr">Kopaniec 69A · 58-512 Stara Kamienica</span>
            <span class="coord"> · {{ t('Góry Izerskie', 'Izera Mountains') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── MAIN CONTENT ── -->
    <section class="dojazd-section">
      <div class="container">
        <div class="dojazd-grid">

          <!-- COLUMN 1 — How to get here -->
          <div class="dojazd-col reveal">
            <div class="dojazd-col-head">
              <span class="dojazd-col-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="2"/>
                  <path d="M16 8h4l3 3v5h-7V8z"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </span>
              <h2>{{ t('Jak do nas dotrzeć?', 'How to get here?') }}</h2>
            </div>
            <div class="body">
              <p>{{ t(
                'Dolina Harmonii położona jest 1,5 km od wsi Kopaniec. Można do nas dojechać zarówno samochodem, jak i komunikacją publiczną.',
                'Dolina Harmonii is located 1.5 km from the village of Kopaniec. You can reach us by car as well as by public transport.'
              ) }}</p>
              <p>{{ t(
                'Jeśli podróżujesz autem, najłatwiej będzie jadąc od strony Jeleniej Góry w kierunku Szklarskiej Poręby — na pierwszym skrzyżowaniu, tuż za zieloną tablicą Piechowice (dawny Piastów), skręcisz w prawo. Stamtąd masz do nas tylko 5 km.',
                'If you\'re travelling by car, the easiest route is from Jelenia Góra towards Szklarska Poręba — at the first junction, just past the green sign for Piechowice (formerly Piastów), turn right. From there it\'s only 5 km to us.'
              ) }}</p>
              <p>{{ t(
                'Najbliższa stacja kolejowa to Piechowice — dojedziesz do nas pociągiem prosto z Wrocławia. Więcej połączeń kolejowych znajdziesz do stacji Jelenia Góra. Stamtąd możesz wsiąść w lokalnego busa, który dojeżdża do wsi Kopaniec.',
                'The nearest railway station is Piechowice — you can reach us by train directly from Wrocław. More rail connections are available to Jelenia Góra. From there you can take a local bus that serves the village of Kopaniec.'
              ) }}</p>
            </div>
          </div>

          <!-- COLUMN 2 — Transport connections -->
          <div class="dojazd-col reveal" style="transition-delay: 60ms">
            <div class="dojazd-col-head">
              <span class="dojazd-col-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
                </svg>
              </span>
              <h2>{{ t('Szukaj połączeń', 'Find connections') }}</h2>
            </div>
            <div class="body">

              <div class="conn-group">
                <div class="route">
                  <strong>{{ t('Z Wrocławia', 'From Wrocław') }}</strong>
                  {{ t('do', 'to') }}
                  <strong>Piechowic</strong>
                  <span class="route-note">{{ t('(6 km do Doliny — stacja kolejowa Piechowice)', '(6 km to the Valley — Piechowice railway station)') }}</span>
                </div>
                <div class="conn-line">
                  {{ t('pociągiem:', 'by train:') }}
                  <a href="https://koleo.pl/rozklad-jazdy" target="_blank" rel="noopener">koleo.pl/rozklad-jazdy</a>
                </div>
              </div>

              <div class="conn-group">
                <div class="route">
                  <strong>{{ t('Z Wrocławia', 'From Wrocław') }}</strong>
                  {{ t('do', 'to') }}
                  <strong>{{ t('Jeleniej Góry', 'Jelenia Góra') }}</strong>
                </div>
                <div class="conn-line">
                  {{ t('pociągiem:', 'by train:') }}
                  <a href="https://koleo.pl/rozklad-jazdy" target="_blank" rel="noopener">koleo.pl/rozklad-jazdy</a>
                </div>
                <div class="conn-line">
                  {{ t('autobusem:', 'by bus:') }}
                  <a href="https://pks.jgora.pl/" target="_blank" rel="noopener">pks.jgora.pl</a>
                </div>
                <div class="conn-line">
                  <a href="https://www.flixbus.pl/" target="_blank" rel="noopener">flixbus.pl</a>
                </div>
              </div>


              <div class="conn-group">
                <div class="route">
                  <strong>{{ t('Ze Zgorzelca', 'From Zgorzelec') }}</strong>
                  {{ t('do', 'to') }}
                  <strong>{{ t('Starej Kamienicy', 'Stara Kamienica') }}</strong>
                </div>
                <div class="conn-line">
                  {{ t('pociągiem:', 'by train:') }}
                  <a href="https://koleo.pl/rozklad-jazdy" target="_blank" rel="noopener">koleo.pl/rozklad-jazdy</a>
                </div>
              </div>

              <div class="conn-group">
                <div class="route">
                  <strong>{{ t('Ze Starej Kamienicy', 'From Stara Kamienica') }}</strong>
                  {{ t('do', 'to') }}
                  <strong>Kopańca</strong>
                </div>
                <div class="conn-line">
                  {{ t('busem Ro-Ko:', 'Ro-Ko bus:') }}
                  <a href="http://ro-ko.pl/jelenia-gora-chromiec/" target="_blank" rel="noopener">ro-ko.pl/jelenia-gora-chromiec</a>
                </div>
              </div>

            </div>
          </div>

          <!-- COLUMN 3 — Navigation -->
          <div class="dojazd-col reveal" style="transition-delay: 120ms">
            <div class="dojazd-col-head">
              <span class="dojazd-col-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="2" x2="12" y2="4"/>
                  <line x1="12" y1="20" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="4" y2="12"/>
                  <line x1="20" y1="12" x2="22" y2="12"/>
                  <circle cx="12" cy="12" r="2"/>
                  <line x1="12" y1="7" x2="12" y2="10"/>
                  <line x1="17" y1="12" x2="14" y2="12"/>
                  <line x1="12" y1="14" x2="12" y2="17"/>
                  <line x1="10" y1="12" x2="7" y2="12"/>
                </svg>
              </span>
              <h2>{{ t('Nawigacja', 'Navigation') }}</h2>
            </div>
            <div class="body">
              <div class="nav-address">
                <div class="street">Kopaniec 69A</div>
                <div class="village">58-512 Stara Kamienica · Dolny Śląsk</div>
              </div>

              <div class="coord-row">
                <span class="label">{{ t('Szerokość', 'Latitude') }}</span>
                <span class="value">50.88259° N</span>
              </div>
              <div class="coord-row">
                <span class="label">{{ t('Długość', 'Longitude') }}</span>
                <span class="value">15.56163° E</span>
              </div>
              <div class="coord-row">
                <span class="label">{{ t('Wysokość', 'Altitude') }}</span>
                <span class="value">720 m {{ t('n.p.m.', 'a.s.l.') }}</span>
              </div>

              <div class="nav-btns">
                <a class="nav-btn primary"
                   href="https://www.google.com/maps/dir/?api=1&destination=50.8827757,15.5621443"
                   target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                  </svg>
                  {{ t('Nawiguj — Google Maps', 'Navigate — Google Maps') }}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ── MAP ── -->
    <div class="map-section">
      <div class="map-overlay-badge">
        <em>Dolina Harmonii</em> · Kopaniec 69A
      </div>
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
/* ── HERO ── */
.dojazd-hero {
  padding: 140px 0 64px;
  background: var(--brand-deep);
  position: relative;
  overflow: hidden;
}
.dojazd-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 80% at 100% 110%, rgba(85,107,47,0.3) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 0% 0%, rgba(85,107,47,0.2) 0%, transparent 55%);
  pointer-events: none;
}
.dojazd-hero .inner { position: relative; z-index: 1; }
.dojazd-hero .eyebrow { color: var(--cta-main); }
.dojazd-hero h1 {
  font-size: clamp(48px, 5.5vw, 80px);
  font-style: italic;
  font-weight: 500;
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: var(--bg-primary);
  margin: 16px 0 0;
}
.dojazd-hero h1 em { color: var(--cta-main); font-style: italic; }

.dojazd-hero-sub {
  display: flex;
  gap: 48px;
  align-items: center;
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid rgba(253,251,247,0.15);
  flex-wrap: wrap;
}
.dojazd-hero-sub .coord {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(253,251,247,0.55);
}
.dojazd-hero-sub .coord strong { color: var(--bg-primary); font-weight: 500; }
.dojazd-hero-sub .addr {
  font-family: var(--serif);
  font-style: italic;
  font-size: 20px;
  color: rgba(253,251,247,0.85);
}

/* ── MAIN CONTENT ── */
.dojazd-section {
  padding: 96px 0 80px;
  background: var(--bg-primary);
}

.dojazd-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr 0.85fr;
  gap: 48px;
  align-items: start;
}

/* ── COLUMN CARD ── */
.dojazd-col {
  background: var(--bg-sage);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: 40px 36px;
  height: 100%;
  box-sizing: border-box;
}
.dojazd-col-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
}
.dojazd-col-icon {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--brand-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cta-main);
}
.dojazd-col h2 {
  font-size: 22px;
  font-style: italic;
  font-weight: 500;
  line-height: 1.2;
  color: var(--brand-primary);
  margin: 0;
}

/* ── BODY TEXT ── */
.body p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-main);
  margin: 0 0 18px;
}
.body p:last-child { margin-bottom: 0; }
.body strong { color: var(--brand-primary); font-weight: 600; }

/* ── CONNECTIONS (middle column) ── */
.conn-group {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--line);
}
.conn-group:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
.route {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-main);
  margin-bottom: 8px;
}
.route strong { color: var(--brand-primary); }
.route-note {
  color: var(--text-muted);
  font-size: 13px;
}
.conn-line {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 4px;
}
.conn-line::before {
  content: '—';
  color: var(--brand-light);
  flex-shrink: 0;
}
.conn-line a {
  color: var(--brand-primary);
  text-decoration: underline;
  text-decoration-color: var(--brand-light);
  text-underline-offset: 3px;
  word-break: break-all;
  transition: color .2s ease;
}
.conn-line a:hover { color: var(--brand-deep); }

/* ── NAVIGATION (right column) ── */
.nav-address {
  background: var(--brand-deep);
  border-radius: var(--r-md);
  padding: 24px 28px;
  margin-bottom: 24px;
  color: var(--bg-primary);
}
.nav-address .street {
  font-family: var(--serif);
  font-size: 22px;
  font-style: italic;
  margin-bottom: 4px;
}
.nav-address .village {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(253,251,247,0.6);
}

.coord-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}
.coord-row:last-of-type { border-bottom: none; }
.coord-row .label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.coord-row .value {
  font-family: var(--serif);
  font-size: 18px;
  color: var(--brand-primary);
}

.nav-btns {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 28px;
}
.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: var(--r-pill);
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: all .2s ease;
  border: 1.5px solid transparent;
}
.nav-btn.primary {
  background: var(--brand-primary);
  color: var(--bg-primary);
}
.nav-btn.primary:hover { background: var(--brand-deep); }
.nav-btn.outline {
  background: transparent;
  color: var(--brand-primary);
  border-color: var(--brand-primary);
}
.nav-btn.outline:hover {
  background: var(--brand-primary);
  color: var(--bg-primary);
}

/* ── TIP BOX ── */
.tip-box {
  margin-top: 28px;
  background: oklch(92% 0.04 130);
  border: 1px solid var(--brand-light);
  border-radius: var(--r-md);
  padding: 20px 22px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.tip-icon {
  color: var(--brand-primary);
  flex-shrink: 0;
  margin-top: 2px;
}
.tip-box p {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-main);
  margin: 0;
}
.tip-box strong { color: var(--brand-primary); }

/* ── MAP ── */
.map-section {
  position: relative;
}
.map-section iframe {
  display: block;
  width: 100%;
  height: 440px;
  border: none;
  filter: saturate(0.85) contrast(1.05);
}
.map-overlay-badge {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--brand-deep);
  color: var(--bg-primary);
  padding: 10px 22px;
  border-radius: var(--r-pill);
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  box-shadow: var(--shadow-md);
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
}
.map-overlay-badge em { color: var(--cta-main); font-style: normal; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .dojazd-grid { grid-template-columns: 1fr 1fr; }
  .dojazd-col:last-child { grid-column: 1 / -1; }
}
@media (max-width: 640px) {
  .dojazd-grid { grid-template-columns: 1fr; }
  .dojazd-col:last-child { grid-column: auto; }
  .map-section iframe { height: 300px; }
  .dojazd-hero-sub { gap: 24px; }
  .dojazd-col { padding: 28px 24px; }
}
</style>
