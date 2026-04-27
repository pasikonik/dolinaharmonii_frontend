<!-- app/components/AppNav.vue -->
<script setup lang="ts">
// Navigation is fixed at the top, matching the landing page "pill" design
</script>

<template>
  <nav class="nav-pill">
    <NuxtLink class="brand" to="/">
      <DhIcon name="seed" :size="28" :stroke="1.4" />
      Dolina Harmonii
    </NuxtLink>
    <ul>
      <li><NuxtLink to="/#dolina">Dolina</NuxtLink></li>
      <li><NuxtLink to="/warsztaty">Warsztaty</NuxtLink></li>
      <li><NuxtLink to="/#noclegi">Noclegi</NuxtLink></li>
      <li><NuxtLink to="/#izery">Izery</NuxtLink></li>
      <li><NuxtLink to="/#galeria">Galeria</NuxtLink></li>
      <li><NuxtLink to="/#zespol">Zespół</NuxtLink></li>
    </ul>
    <NuxtLink class="nav-cta" to="/#rezerwacja">Zarezerwuj</NuxtLink>
  </nav>
</template>

<style scoped>
.nav-pill {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(249,247,242,0.92);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(141,161,146,0.3);
  border-radius: var(--r-pill);
  padding: 6px 6px 6px 20px;
  box-shadow: var(--shadow-md);
  font-size: 13px;
  white-space: nowrap;
  max-width: calc(100vw - 48px);
}
.brand {
  font-family: var(--serif);
  color: var(--brand-primary);
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 18px;
  margin-right: 4px;
  border-right: 1px solid var(--line);
  flex-shrink: 0;
  text-decoration: none;
}
ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0 4px;
}
li a {
  display: block;
  padding: 8px 12px;
  color: var(--brand-primary);
  font-weight: 500;
  font-size: 13px;
  border-radius: var(--r-pill);
  transition: background .2s, color .2s;
}
li a:hover { background: var(--bg-sage); color: var(--brand-primary); }

.nav-cta {
  background: transparent;
  color: var(--brand-primary);
  padding: 9px 18px;
  border-radius: var(--r-pill);
  border: 1px solid var(--accent-earth);
  font-weight: 500;
  font-size: 13px;
  margin-left: 8px;
  transition: background .2s, color .2s;
  flex-shrink: 0;
  text-decoration: none;
}
.nav-cta:hover {
  background: var(--accent-earth);
  color: var(--bg-primary);
  border-color: var(--accent-earth);
}
</style>
