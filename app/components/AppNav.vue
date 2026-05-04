<script setup lang="ts">
const open = ref(false)
const route = useRoute()
const { lang, setLang, t } = useLang()

watch(() => route.fullPath, () => { open.value = false })

function handleSetLang(l: 'pl' | 'en') {
  setLang(l)
  open.value = false
}
</script>

<template>
  <nav class="nav-pill" :class="{ 'is-open': open }">
    <NuxtLink class="brand" to="/" @click="open = false">
      <DhIcon name="seed" :size="24" :stroke="1.4" />
      <span class="brand-name">Dolina Harmonii</span>
    </NuxtLink>

    <ul class="nav-list">
      <li><NuxtLink to="/#dolina">{{ t('Dolina', 'Valley') }}</NuxtLink></li>
      <li><NuxtLink to="/warsztaty">{{ t('Warsztaty', 'Workshops') }}</NuxtLink></li>
      <li><NuxtLink to="/#noclegi">{{ t('Noclegi', 'Stay') }}</NuxtLink></li>
      <li><NuxtLink to="/#izery">Izery</NuxtLink></li>
      <li><NuxtLink to="/dojazd">{{ t('Dojazd', 'Getting here') }}</NuxtLink></li>
    </ul>

    <span class="lang-switch" aria-label="Language">
      <button :class="{ active: lang === 'pl' }" @click="handleSetLang('pl')">PL</button>
      <span class="sep">/</span>
      <button :class="{ active: lang === 'en' }" @click="handleSetLang('en')">EN</button>
    </span>

    <NuxtLink class="nav-cta" to="/#rezerwacja">{{ t('Kontakt', 'Contact') }}</NuxtLink>

    <button
      class="nav-toggle"
      :aria-expanded="open"
      aria-label="Menu"
      @click="open = !open"
    >
      <span /><span /><span />
    </button>
  </nav>
</template>

<style scoped>
.nav-pill {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 2px;
  background: rgba(253,251,247,0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(188,152,126,0.35);
  border-radius: var(--r-pill);
  padding: 5px 5px 5px 16px;
  box-shadow: var(--shadow-md);
  font-size: 12px;
  white-space: nowrap;
  max-width: calc(100vw - 48px);
}

/* Brand */
.brand {
  font-family: var(--serif);
  color: var(--brand-primary);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 7px;
  padding-right: 14px;
  margin-right: 2px;
  border-right: 1px solid var(--line);
  flex-shrink: 0;
  text-decoration: none;
}
.brand:hover { color: var(--brand-primary); }

/* Nav links */
.nav-list {
  display: flex;
  flex-wrap: nowrap;
  list-style: none;
  margin: 0;
  padding: 0 4px;
  gap: 0;
  flex-shrink: 0;
}
.nav-list li a {
  display: block;
  padding: 7px 10px;
  color: var(--brand-deep);
  font-family: var(--sans);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.01em;
  border-radius: var(--r-pill);
  transition: background .2s ease, color .2s ease;
  white-space: nowrap;
  text-decoration: none;
}
.nav-list li a:hover { background: rgba(139,154,103,0.18); color: var(--brand-deep); }

/* Language switcher */
.lang-switch {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1px;
  margin-left: 4px;
  padding-left: 10px;
  border-left: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  white-space: nowrap;
  flex-shrink: 0;
}
.lang-switch button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 6px;
  border-radius: var(--r-pill);
  color: var(--text-muted);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color .2s ease, background .2s ease;
}
.lang-switch button.active {
  color: var(--brand-deep);
  font-weight: 600;
}
.lang-switch button:hover { color: var(--brand-deep); }
.lang-switch .sep { color: var(--accent-sand); padding: 0 1px; }

/* CTA */
.nav-cta {
  background: var(--cta-main);
  color: var(--brand-deep);
  padding: 8px 16px;
  border-radius: var(--r-pill);
  border: none;
  font-family: var(--sans);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.04em;
  margin-left: 6px;
  flex-shrink: 0;
  text-decoration: none;
  transition: background .2s ease;
}
.nav-cta:hover { background: var(--cta-main-hover); color: var(--brand-deep); }

/* Mobile toggle */
.nav-toggle {
  display: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  flex-shrink: 0;
}
.nav-toggle span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: var(--brand-primary);
  border-radius: 1px;
  transition: transform .25s ease, opacity .25s ease;
}

/* ─── Responsive ───────────────────────────────────────────────── */
@media (max-width: 860px) {
  .brand-name { display: none; }
  .brand { padding-right: 10px; }
}

@media (max-width: 720px) {
  .nav-pill { padding: 5px 5px 5px 12px; gap: 0; }
  .nav-cta { display: none; }
  .nav-toggle { display: flex; }
  .nav-list {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 4px;
    padding: 12px;
    background: rgba(253,251,247,0.98);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(188,152,126,0.35);
    border-radius: var(--r-lg);
    box-shadow: var(--shadow-md);
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    transition: opacity .2s ease, transform .2s ease;
  }
  .is-open .nav-list {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  .nav-list li a { padding: 12px 14px; font-size: 14px; }

  .lang-switch {
    margin-left: 2px;
    padding-left: 8px;
  }

  .is-open .nav-toggle span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .is-open .nav-toggle span:nth-child(2) { opacity: 0; }
  .is-open .nav-toggle span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
}
</style>
