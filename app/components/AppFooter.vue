<!-- app/components/AppFooter.vue -->
<template>
  <footer>
    <div class="container">
      <div class="foot-grid">
        <div class="foot-brand">
          <div class="logo">Dolina Harmonii</div>
          <p>Miejsce naturalnych mocy.<br/>Kopaniec 47, 58-512 Stara Kamienica<br/>Magiczne Izery, Dolny Śląsk</p>
          <div style="display:flex;gap:12px;margin-top:20px">
            <span v-for="ic in ['compass', 'star', 'leaf']" :key="ic" class="foot-icon">
              <DhIcon :name="ic" :size="22" :stroke="1.4" />
            </span>
          </div>
        </div>
        <div>
          <h5>Miejsce</h5>
          <ul>
            <li><NuxtLink to="/#dolina">O Dolinie</NuxtLink></li>
            <li><NuxtLink to="/#noclegi">Noclegi</NuxtLink></li>
            <li><NuxtLink to="/noclegi/duzy-dom">Duży Dom</NuxtLink></li>
            <li><NuxtLink to="/noclegi/lesny-domek">Leśny Domek</NuxtLink></li>
            <li><NuxtLink to="/noclegi/studio-z-oranzeria">Studio z oranżerią</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h5>Praktyka</h5>
          <ul>
            <li><NuxtLink to="/warsztaty">Warsztaty</NuxtLink></li>
            <li><NuxtLink to="/#izery">Magiczne Izery</NuxtLink></li>
            <li><NuxtLink to="/#galeria">Galeria</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h5>Kontakt</h5>
          <ul>
            <li><a href="mailto:dolina@harmonii.pl">dolina@harmonii.pl</a></li>
            <li><a href="tel:+48757123456">+48 757 123 456</a></li>
            <li>pn–pt, 10:00–18:00</li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© {{ new Date().getFullYear() }} Dolina Harmonii · wszystkie prawa zastrzeżone</span>
        <span>strona w przygotowaniu</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--brand-deep);
  color: rgba(249,247,242,.75);
  padding: 80px 0 32px;
  font-size: 14px;
}
.foot-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 64px; }
h5 { color: var(--bg-primary); font-family: var(--sans); font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 20px; font-weight: 600; }
ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
ul a { color: rgba(249,247,242,0.45); }
ul a:hover { color: var(--cta-main); }
.foot-brand .logo { font-family: var(--serif); font-style: italic; font-size: 32px; color: var(--bg-primary); margin-bottom: 12px; }
.foot-bottom { display: flex; justify-content: space-between; padding-top: 32px; border-top: 1px solid rgba(249,247,242,.1); font-size: 12px; color: rgba(249,247,242,.5); font-family: var(--mono); letter-spacing: 0.08em; text-transform: uppercase; }
.foot-icon { width: 44px; height: 44px; border: 1px solid rgba(249,247,242,.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(249,247,242,.7); }

@media (max-width: 768px) {
  .foot-grid { grid-template-columns: 1fr 1fr; }
  .foot-bottom { flex-direction: column; gap: 16px; text-align: center; }
}
</style>
