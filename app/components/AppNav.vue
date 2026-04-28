<script setup lang="ts">
const open = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <nav class="nav-pill" :class="{ 'is-open': open }">
    <NuxtLink class="brand" to="/" @click="open = false">
      <DhIcon name="seed" :size="28" :stroke="1.4" />
      Dolina Harmonii
    </NuxtLink>
    <ul class="nav-list">
      <li><NuxtLink to="/#dolina">Dolina</NuxtLink></li>
      <li><NuxtLink to="/warsztaty">Warsztaty</NuxtLink></li>
      <li><NuxtLink to="/#noclegi">Noclegi</NuxtLink></li>
      <li><NuxtLink to="/#izery">Izery</NuxtLink></li>
      <li><NuxtLink to="/#galeria">Galeria</NuxtLink></li>
      <li><NuxtLink to="/#zespol">Zespół</NuxtLink></li>
    </ul>
    <NuxtLink class="nav-cta" to="/#rezerwacja">Zarezerwuj</NuxtLink>
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
.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0 4px;
}
.nav-list li a {
  display: block;
  padding: 8px 12px;
  color: var(--brand-primary);
  font-weight: 500;
  font-size: 13px;
  border-radius: var(--r-pill);
  transition: background .2s, color .2s;
}
.nav-list li a:hover { background: var(--bg-sage); color: var(--brand-primary); }

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

.nav-toggle {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
}
.nav-toggle span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: var(--brand-primary);
  border-radius: 1px;
  transition: transform .25s, opacity .25s;
}

@media (max-width: 900px) {
  .nav-pill {
    padding: 6px 6px 6px 16px;
    gap: 0;
  }
  .nav-cta { display: none; }
  .nav-toggle { display: flex; }
  .nav-list {
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 4px;
    padding: 16px;
    background: rgba(249,247,242,0.98);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(141,161,146,0.3);
    border-radius: var(--r-md);
    box-shadow: var(--shadow-md);
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    transition: opacity .2s, transform .2s;
  }
  .is-open .nav-list {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  .nav-list li a {
    padding: 12px 14px;
  }
  .is-open .nav-toggle span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .is-open .nav-toggle span:nth-child(2) { opacity: 0; }
  .is-open .nav-toggle span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
}
</style>
