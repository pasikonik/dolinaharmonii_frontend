<script setup lang="ts">
const { t } = useLang()
</script>

<template>
  <footer>
    <div class="container">
      <div class="foot-grid">
        <div class="foot-brand">
          <div class="logo">Dolina Harmonii</div>
          <p>{{ t('Miejsce naturalnych mocy.', 'A place of natural power.') }}<br/>Kopaniec 69A, 58-512 Stara Kamienica<br/>{{ t('Magiczne Izery, Dolny Śląsk', 'Magical Izery, Lower Silesia') }}</p>
          <div class="foot-social">
            <a href="https://www.facebook.com/dolina.harmonii/" target="_blank" rel="noopener noreferrer" aria-label="Facebook Dolina Harmonii" class="foot-social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/dolina.harmonii/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Dolina Harmonii" class="foot-social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h5>{{ t('Miejsce', 'Place') }}</h5>
          <ul>
            <li><NuxtLink to="/#dolina">{{ t('O Dolinie', 'About the Valley') }}</NuxtLink></li>
            <li><NuxtLink to="/#noclegi">{{ t('Noclegi', 'Accommodation') }}</NuxtLink></li>
            <li><NuxtLink to="/noclegi/duzy-dom">{{ t('Duży Dom', 'The Big House') }}</NuxtLink></li>
            <li><NuxtLink to="/noclegi/lesny-domek">{{ t('Leśny Domek', 'Forest Cottage') }}</NuxtLink></li>
            <li><NuxtLink to="/noclegi/studio-z-oranzeria">{{ t('Studio z oranżerią', 'Studio with conservatory') }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h5>{{ t('Praktyka', 'Practice') }}</h5>
          <ul>
            <li><NuxtLink to="/warsztaty">{{ t('Warsztaty', 'Workshops') }}</NuxtLink></li>
            <li><NuxtLink to="/#izery">{{ t('Magiczne Izery', 'Magical Izery') }}</NuxtLink></li>
            <li><NuxtLink to="/#galeria">{{ t('Galeria', 'Gallery') }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h5>{{ t('Kontakt', 'Contact') }}</h5>
          <ul>
            <li><a href="mailto:dolina@harmonii.pl">dolina@harmonii.pl</a></li>
            <li><a href="tel:+48757123456">+48 757 123 456</a></li>
            <li>{{ t('pn–pt, 10:00–18:00', 'Mon–Fri, 10:00–18:00') }}</li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© {{ new Date().getFullYear() }} Dolina Harmonii · {{ t('wszystkie prawa zastrzeżone', 'all rights reserved') }}</span>
        <span>{{ t('strona w przygotowaniu', 'site in progress') }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--brand-deep);
  color: rgba(253,251,247,.75);
  padding: 80px 0 32px;
  font-size: 14px;
}
.foot-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 64px; }
h5 { color: var(--bg-primary); font-family: var(--sans); font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 20px; font-weight: 600; }
ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
ul a { color: rgba(253,251,247,0.75); }
ul a:hover { color: var(--cta-main); }
.foot-brand .logo { font-family: var(--serif); font-style: italic; font-size: 32px; color: var(--bg-primary); margin-bottom: 12px; }
.foot-bottom { display: flex; justify-content: space-between; padding-top: 32px; border-top: 1px solid rgba(253,251,247,.1); font-size: 12px; color: rgba(253,251,247,.5); font-family: var(--mono); letter-spacing: 0.08em; text-transform: uppercase; }
.foot-social { display: flex; gap: 10px; margin-top: 20px; }
.foot-social-link { width: 44px; height: 44px; border: 1px solid rgba(253,251,247,.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(253,251,247,.7); transition: background .2s, border-color .2s, color .2s; }
.foot-social-link:hover { background: rgba(253,251,247,.1); border-color: rgba(253,251,247,.45); color: var(--cta-main); }

@media (max-width: 768px) {
  .foot-grid { grid-template-columns: 1fr 1fr; }
  .foot-bottom { flex-direction: column; gap: 16px; text-align: center; }
}
</style>
